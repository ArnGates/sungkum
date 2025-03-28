import { useState, useEffect } from "react";
import supabase from "./supabaseClient"; 
import { User, Mail, Calendar, X } from "lucide-react"; // Icons


const ImageUploader = () => {
  const [image, setImage] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // For preview
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");

  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error.message);
        return;
      }
      if (session?.user) {
        setUser(session.user);
        setUserEmail(session.user.email || "");
        setUserName(session.user.user_metadata?.full_name || "Anonymous");
      }
    };

    fetchSession();
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from("uploaded_images")
      .select("*")
      .order("upload_date", { ascending: false });

    if (error) {
      console.error("Error fetching images:", error);
    } else {
      setUploadedImages(data);
    }
  };

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image first.");
      return;
    }

    if (!user) {
      alert("You must be logged in to upload images.");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!data.secure_url) {
        alert("Failed to upload image.");
        return;
      }

      const uploadDate = new Date().toISOString();

      const { error } = await supabase.from("uploaded_images").insert([
        { 
          url: data.secure_url, 
          user_id: user.id, 
          user_email: userEmail, 
          user_name: userName,
          upload_date: uploadDate 
        }
      ]);

      if (error) {
        console.error("Supabase Insert Error:", error);
        alert(`Failed to save image URL to database: ${error.message}`);
      } else {
        alert("Image uploaded successfully!");
        fetchImages();
      }
    } catch (error) {
      console.error("Unexpected Error:", error);
      alert("An unexpected error occurred.");
    }
  };

  const deleteImage = async (id) => {
    const { error } = await supabase.from("uploaded_images").delete().eq("id", id);
    if (!error) {
      setUploadedImages((prev) => prev.filter((img) => img.id !== id));
    } else {
      alert("Failed to delete image.");
    }
  };

  return (
    
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        
        <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center">Upload Your Business Image</h1>

        {user ? (
          <div className="mb-6 flex items-center justify-center gap-3 bg-gray-700 p-3 rounded-lg">
            <User className="text-cyan-500" size={24} />
            <div>
              <span className="text-lg">{userName}</span>
              <p className="text-sm text-gray-400">{userEmail}</p>
            </div>
          </div>
        ) : (
          <div className="mb-6 text-center text-red-500">You must be logged in to upload images.</div>
        )}

        {user && (
          <div className="flex flex-col items-center space-y-4">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
            />
            <button
              onClick={uploadImage}
              className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition-all"
            >
              Upload Image
            </button>
          </div>
        )}
      </div>

      {/* Display Uploaded Images */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {uploadedImages.map((img) => (
          <div key={img.id} className="bg-gray-800 p-4 rounded-lg shadow-lg relative transition-all hover:scale-105">
            
            {/* User Info */}
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-cyan-500" />
              <span className="font-semibold">{img.user_name}</span>
            </div>

            {/* Image */}
            <img
              src={img.url}
              alt="Uploaded"
              className="w-full h-48 object-cover rounded-md shadow-md cursor-pointer hover:opacity-80 transition-all"
              onClick={() => setSelectedImage(img.url)}
            />

            {/* Image Meta Info */}
            <div className="mt-2 text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-500" />
                {img.user_email}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Calendar size={16} className="text-yellow-400" />
                {new Date(img.upload_date).toLocaleString()}
              </div>
            </div>

            {/* Delete Button (Only for the owner) */}
            {user?.email === img.user_email && (
              <button
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 text-xs rounded-md"
                onClick={() => deleteImage(img.id)}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Full-Screen Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <img src={selectedImage} alt="Full Size" className="max-w-full max-h-full rounded-lg" />
          <button
            className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-lg"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
