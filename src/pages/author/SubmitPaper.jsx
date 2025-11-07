import { useState, useRef } from "react";
// import DashboardLayout from "../../components/DashboardLayout";
import { X, Plus, Trash2, UploadCloud, FileText } from "lucide-react";
import api from "../../api/axios";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";

const SubmitPaper = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [file, setFile] = useState(null);
  // Start with 3 co-author inputs as requested
  const [coAuthors, setCoAuthors] = useState([
    { name: "" },
    { name: "" },
    { name: "" },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // --- Co-Author Logic ---
  const handleCoAuthorChange = (index, value) => {
    const newCoAuthors = [...coAuthors];
    newCoAuthors[index].name = value;
    setCoAuthors(newCoAuthors);
  };

  const addCoAuthor = () => {
    // Add new co-author input, up to a max of 6
    if (coAuthors.length < 6) {
      setCoAuthors([...coAuthors, { name: "" }]);
    }
  };

  const removeCoAuthor = (index) => {
    const newCoAuthors = coAuthors.filter((_, i) => i !== index);
    setCoAuthors(newCoAuthors);
  };

  // --- File Handling Logic ---
  const validateFile = (file) => {
    if (file && file.type === "application/pdf") {
      setFile(file);
      setError(null); // Clear previous file errors
      return true;
    } else {
      setError("Invalid file type. Please upload a PDF.");
      return false;
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      validateFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // Reset the file input
    }
  };

  // --- Form Submission Logic ---
  const resetForm = () => {
    setTitle("");
    setAbstract("");
    setKeywords("");
    setFile(null);
    setCoAuthors([{ name: "" }, { name: "" }, { name: "" }]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // --- Validation ---
    if (!title || !abstract || !keywords || !file) {
      setError("Please fill in all required fields and upload a PDF file.");
      return;
    }
    // --- File size check (20MB max) ---
    const MAX_SIZE_MB = 20;
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      setError(`File too large! Maximum allowed size is ${MAX_SIZE_MB} MB.`);
      return;
    }

    setLoading(true);

    // --- Create FormData ---
    // This is required by your API spec
    const formData = new FormData();
    formData.append("title", title);
    formData.append("abstract", abstract);
    formData.append("keywords", keywords);
    formData.append("paper", file);

    // Filter out empty co-author names, format as [{"name": "..."}],
    // and stringify the array as required by your API.
    const validCoAuthors = coAuthors
      .map((a) => a.name.trim()) // Get names and trim whitespace
      .filter((name) => name !== "") // Filter out empty strings
      .map((name) => ({ name })); // Format into objects

    formData.append("coAuthors", JSON.stringify(validCoAuthors));

    try {
      // Make the API call
      const res = await api.post("/author/papers/submit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      setSuccess("Paper submitted successfully!");
      resetForm();
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Paper submission failed.");
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbActions = (
    <Link
      to="/author/dashboard/papers"
      className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#521028] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      <FileText className="w-4 h-4 me-1.5" />
      Submitted Papers
    </Link>
  );

  return (
    <>
      <Breadcrumbs actions={breadcrumbActions} />
      <h1 className="text-2xl font-bold text-[#521028] mb-6 flex justify-center">
        Submit Your Paper
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 sm:p-8 space-y-6 max-w-3xl mx-auto"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
            placeholder="Enter paper title"
            required
          />
        </div>

        {/* Abstract */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Abstract
          </label>
          <textarea
            name="abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
            rows="5"
            placeholder="Write abstract here"
            required
          ></textarea>
        </div>

        {/* Keywords */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Keywords
          </label>
          <input
            type="text"
            name="keywords"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
            placeholder="e.g., AI, ML, Data Science"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Comma-separated keywords.
          </p>
        </div>

        {/* Co-Authors (Dynamic) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Authors Names (up to 6)
          </label>
          <div className="space-y-2">
            {coAuthors.map((author, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={author.name}
                  onChange={(e) => handleCoAuthorChange(index, e.target.value)}
                  className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                  placeholder={`Author ${index + 1} full name`}
                />
                <button
                  type="button"
                  onClick={() => removeCoAuthor(index)}
                  className="p-2 text-red-600 rounded-md hover:bg-red-100"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addCoAuthor}
            disabled={coAuthors.length >= 6}
            className="mt-2 flex items-center space-x-1 text-sm font-semibold text-[#521028] hover:text-[#6b1b3a] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
            <span>Add Another Author</span>
          </button>
        </div>

        {/* File Upload (Drag and Drop) */}
        <div>
          <label className="block text-sm font-semibold text-gray-700">
            Upload PDF
          </label>
          {!file ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={`mt-1 flex justify-center w-full px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer
                ${isDragging ? "border-[#521028] bg-gray-50" : ""}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <span className="font-semibold text-[#521028]">
                    Click to upload
                  </span>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    name="file"
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">PDF only (max 10MB)</p>
              </div>
            </div>
          ) : (
            // Show selected file
            <div className="mt-2 flex items-center justify-between p-3 bg-gray-100 border border-gray-300 rounded-md">
              <div className="flex items-center space-x-2">
                <FileText className="h-5 w-5 text-[#521028]" />
                <span className="text-sm font-medium text-gray-800 truncate max-w-[150px] sm:max-w-[200px] md:max-w-[300px]">
                  {file.name}
                </span>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 text-red-600 rounded-full hover:bg-red-100"
              >
                <X size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        {error && (
          <p className="text-red-600 text-sm text-center font-medium">
            {error}
          </p>
        )}
        {success && (
          <p className="text-green-600 text-sm text-center font-medium">
            {success}
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-3 mt-4 bg-[#521028] text-white font-semibold rounded-md hover:bg-[#6b1b3a] transition-colors disabled:opacity-70"
        >
          {loading ? (
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            "Submit Paper"
          )}
        </button>
      </form>
    </>
  );
};

export default SubmitPaper;
