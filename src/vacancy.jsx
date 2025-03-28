import React, { useState, useEffect } from "react";
import Footer from "./footer";
import Comments from "./Comments";
import ButtonSection from "./Button";

const jobs = [
  {
    id: 1,
    title: "Service and Cashier",
    company: "Restaurant",
    location: "Kohima",
    salary: "Negotiable",
    description: "*1 Cashier (Candidates with prior experience preferred) *1 Waitress(Female) *Accommodation and 3 daily meals will be provided. *Weekly Incentive",
    datePosted: "18-03-2025",
    contact: "+919863420131",
    salaryValue: 0 
  },
  {
    id: 2,
    title: "Vacany for Female",
    company: "FAST TECH EDUCATIONAL FOUNDATION",
    location: "Half Nagarjan, Dimapur",
    salary: "Negotiable",
    description: "Requirements: *Should have basic knowledge of word, Excel, and Photoshop *Good communication skills *Qualification: Graduation *Click the apply button and send your resume",
    datePosted: "18-03-2025",
    contact: "+919366171349",
    salaryValue: 0 
  },
  {
    id: 3,
    title: "Graphic Designer",
    company: "IACT",
    location: "Dimapur",
    salary: "Negotiable",
    description: "Requirement: *Graphic Design *Office Assistant-Good Typing Speed",
    datePosted: "13-03-2025",
    contact: "+918787492436",
    salaryValue: 0 
  },
  {
    id: 4,
    title: "Sales Head, Salesperson & Technician (only males)",
    company: "K & V Enterprises Kohima",
    location: "Kohima",
    salary: "₹6,000 - ₹9,000",
    description: "*Sales Head: Graduate with computer knowledge(₹6000-₹9000/month) *Salesperson: Class 10 plus(₹4000-₹8000/month) *Technician(only males): Class 8 plus(₹4000 during probation) *Text/Whatsapp your details to the given contact (No calls)",
    datePosted: "13-03-2025",
    contact: "+918732868413",
    salaryValue: 9000
  },
  {
    id: 5,
    title: "CSAT FACULTY (For NPSC & NSSB)",
    company: "",
    location: "Duncan Basti, Dimapur",
    salary: "Negotiable",
    description: "REQUIREMENTS: *Good communication and interactive teaching methods. *Strong problem-solving and logical reasoning skills. *Experience in teaching CSAT for NPSE, UPSC, or other government exams is preferred (Not Mandatory)",
    datePosted: "13-03-2025",
    contact: "+917483293649",
    salaryValue: 0
  },
  {
    id: 6,
    title: "Delivery Person",
    company: "KI. DIENT",
    location: "Kohima",
    salary: "₹5000",
    description: "Salary increment based on performance review",
    datePosted: "13-03-2025",
    contact: "+917005833376",
    salaryValue: 5000
  },
  {
    id: 7,
    title: "Customer Relationship Executive. 2 Nos - Female",
    company: "NISSAN",
    location: "Purana Bazar opp SBI, Dimapur",
    salary: "Negotiable",
    description: "Eligibility: *Graduate with computer knowledge. *Excellent communication skill. *Click the apply button and send your resume",
    datePosted: "13-03-2025",
    contact: "+919862776815",
    salaryValue: 0
  }
];

const Vacancy = () => {
  const [filter, setFilter] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [isSticky, setIsSticky] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    const handleScroll = () => {
      const jobSection = document.getElementById("job-section");
      if (jobSection) {
        setIsSticky(window.scrollY + window.innerHeight < jobSection.offsetTop + jobSection.clientHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = () => {
    setFilteredJobs(
      jobs.filter((job) =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (location ? job.location.includes(location) : true) &&
        (salary
          ? (salary === "<10000" && job.salaryValue > 0 && job.salaryValue < 10000) ||
            (salary === "<15000" && job.salaryValue > 0 && job.salaryValue < 15000) ||
            (salary === "Negotiable" && job.salaryValue == 0 ) ||
            (salary === ">20000" && job.salaryValue > 20000)
          : true)
      )
    );
  };

  const handleApply = (jobTitle, contactNumber) => {
    const message = encodeURIComponent(`Hello, I am interested in applying for the ${jobTitle} position.`);
    window.location.href = `https://wa.me/${contactNumber}?text=${message}`;
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black/100 text-white font-[Poppins]">
      <ButtonSection/>
      <div className="p-8 flex flex-col md:flex-row">
        {/* Filter Section (Sticky Until Content Ends) */}
        <div className={`w-full md:w-1/4 bg-gray-800 p-6 rounded-lg mb-6 md:mb-0 md:mr-8 shadow-lg ${isSticky ? 'md:sticky md:top-20' : ''}`}>
          <h2 className="text-xl font-semibold text-cyan-400 mb-4">Filters</h2>
          <div className="flex space-x-2 mb-4">
            <input
              type="text"
              placeholder="Search Jobs..."
              className="p-2 w-full text-white rounded-md outline-none border border-white focus:border-cyan-400"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-all"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
          <select
            className="p-2 w-full text-black rounded-md outline-none mb-4 border border-black focus:border-cyan-400 bg-amber-50"
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            <option value="Dimapur">Dimapur</option>
            <option value="Kohima">Kohima</option>
            <option value="others">Others</option>
          </select>
          <select
            className="p-2 w-full text-black rounded-md outline-none border border-black focus:border-cyan-400 bg-amber-50"
            onChange={(e) => setSalary(e.target.value)}
          >
            <option value="">Select Salary Range</option>
            <option value="Negotiable">Negotiable</option>
            <option value="<10000">₹10,000 Below</option>
            <option value="<15000">₹15,000 Below</option>
            <option value=">20000">₹20,000 Above</option>
          </select>
          <div className="mt-6 text-center text-sm text-gray-300">
    We help you generate a resume for free.{" "}
    <a href="http://resume-generator-sungkum.vercel.app" className="text-cyan-400 underline">Click here</a>
  </div>
        </div>

        {/* Job Listings */}
        <div id="job-section" className="w-full md:w-3/4 space-y-6">
          <h1 className="text-3xl font-bold text-cyan-400 mb-6 text-center md:text-left">Job Openings</h1>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="p-6 bg-gray-800 rounded-lg shadow-lg hover:bg-gray-700 transition-all">
                <h2 className="text-xl font-semibold text-cyan-400">{job.title}</h2>
                <p className="text-gray-300">Company: {job.company}</p>
                <p className="text-gray-300">Location: {job.location}</p>
                <p className="text-green-400 font-semibold">Salary: {job.salary}</p>
                <p className="text-gray-400 mt-2">{job.description}</p>
                <p className="text-gray-500 text-sm mt-2">Posted on: {job.datePosted}</p>
                <button
                  className="mt-4 px-4 py-2 bg-cyan-500 text-white rounded-md hover:bg-cyan-600 transition-all"
                  onClick={() => handleApply(job.title, job.contact)}
                >
                  Apply Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No jobs found.</p>
          )}
        </div>
      </div>
      <Comments />
      <Footer />
    </div>
  );
};

export default Vacancy;
