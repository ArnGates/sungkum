import React, { useState, useEffect } from "react";
import supabase from "./supabaseClient";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          const { data: profileData } = await supabase
            .from("profiles")
            .select("username, email, provider")
            .eq("id", session.user.id)
            .single();
          if (profileData) setProfile(profileData);
        }

        const { data: commentsData } = await supabase
          .from("comments")
          .select(`
            id, text, created_at, user_id, user_name,
            profiles:user_id (username, email, provider)
          `)
          .order("created_at", { ascending: false });

        const formattedComments = commentsData.map(comment => ({
          ...comment,
          displayName: comment.profiles?.provider === "google"
            ? comment.profiles.email
            : comment.profiles?.username || comment.user_name || "Anonymous"
        }));

        setComments(formattedComments);
      } catch (err) {
        setError("Failed to load comments. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || !user || !profile) {
      alert("Please log in and enter a comment.");
      return;
    }

    const displayName = profile.provider === "google" ? profile.email : profile.username;

    const { error } = await supabase.from("comments").insert([{
      text: commentText,
      user_id: user.id,
      user_name: displayName,
      created_at: new Date().toISOString()
    }]);

    if (!error) {
      setComments([{ 
        id: Date.now(), 
        text: commentText, 
        created_at: new Date().toISOString(), 
        user_id: user.id, 
        displayName 
      }, ...comments]);
      setCommentText("");
    } else {
      alert("Failed to add comment.");
    }
  };

  const deleteComment = async (id) => {
    await supabase.from("comments").delete().eq("id", id).eq("user_id", user.id);
    setComments(comments.filter(comment => comment.id !== id));
  };

  const startEditing = (comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const saveEditedComment = async (id) => {
    if (!editingText.trim()) {
      alert("Comment cannot be empty.");
      return;
    }

    const { error } = await supabase
      .from("comments")
      .update({ text: editingText })
      .eq("id", id)
      .eq("user_id", user.id);

    if (!error) {
      setComments(comments.map(comment =>
        comment.id === id ? { ...comment, text: editingText } : comment
      ));
      setEditingCommentId(null);
      setEditingText("");
    }
  };

  if (loading) return <p className="text-gray-400 text-center">Loading comments...</p>;

  return (
    <div className="w-full flex flex-col items-center mt-6 px-2 sm:px-4">
      <h2 className="text-lg sm:text-2xl font-semibold text-gray-300 mb-3 sm:mb-4">Leave a Comment</h2>

      {error && <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base">{error}</p>}

      {!user ? (
        <p className="text-red-500 mb-3 sm:mb-4 text-sm sm:text-base">You must be logged in to comment.</p>
      ) : (
        <form 
          onSubmit={addComment} 
          className="bg-gray-800 p-3 sm:p-6 rounded-lg shadow-md w-full max-w-md text-gray-200"
        >
          <textarea
            placeholder="Write your comment..."
            className="w-full p-2 sm:p-3 mb-2 sm:mb-3 rounded-md bg-gray-700 text-gray-300 placeholder-gray-400 outline-none border border-gray-600 focus:border-cyan-400 text-sm sm:text-base"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
          <button 
            type="submit" 
            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-2 sm:py-3 rounded-md text-sm sm:text-base transition-all"
          >
            Submit
          </button>
        </form>
      )}

      <div className="w-full max-w-md mt-4 sm:mt-6 space-y-3 sm:space-y-4">
        {comments.length > 0 && <h3 className="text-md sm:text-lg font-semibold text-gray-300">Comments:</h3>}
        
        {comments.map((comment) => (
          <div key={comment.id} className="bg-gray-700 p-3 sm:p-4 rounded-md shadow-md text-gray-200 text-sm sm:text-base">
            <div className="flex items-center justify-between mb-1">
              <p className="text-cyan-400 font-semibold">{comment.displayName}</p>
              <span className="text-xs text-gray-400">
                {new Date(comment.created_at).toLocaleString()}
              </span>
            </div>

            {editingCommentId === comment.id ? (
              <>
                <textarea
                  className="w-full p-2 rounded-md bg-gray-600 text-gray-200 text-sm"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <div className="flex justify-end gap-2 mt-2">
                  <button
                    className="px-2 sm:px-3 py-1 bg-green-500 rounded-md hover:bg-green-600 text-xs sm:text-sm"
                    onClick={() => saveEditedComment(comment.id)}
                  >
                    Save
                  </button>
                  <button
                    className="px-2 sm:px-3 py-1 bg-gray-500 rounded-md hover:bg-gray-600 text-xs sm:text-sm"
                    onClick={() => setEditingCommentId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <p className="text-gray-300">{comment.text}</p>
            )}

            {user && user.id === comment.user_id && (
              <div className="mt-2 flex space-x-2">
                <button
                  className="px-2 py-1 text-xs sm:text-sm bg-yellow-500 rounded-md hover:bg-yellow-600"
                  onClick={() => startEditing(comment)}
                >
                  Edit
                </button>
                <button
                  className="px-2 py-1 text-xs sm:text-sm bg-red-500 rounded-md hover:bg-red-600"
                  onClick={() => deleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
