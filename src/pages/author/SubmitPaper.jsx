import { useState, useRef } from "react";
import {
  X,
  Plus,
  Trash2,
  UploadCloud,
  FileText,
  User,
  Mail,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../../api/axios";
import Breadcrumbs from "../../components/Breadcrumbs";
import { Link } from "react-router-dom";

const SALUTATION_OPTIONS = ["Mr", "Ms", "Mrs", "Dr", "Prof", "Mx"];

const SubmitPaper = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [keywords, setKeywords] = useState("");
  const [topicArea, setTopicArea] = useState("");
  const [file, setFile] = useState(null);

  const [authors, setAuthors] = useState([
    {
      salutation: "Mr",
      name: "",
      email: "",
      institute: "",
      isCorresponding: false,
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  // --- Helper: Calculate current keyword count ---
  const getKeywordCount = (text) => {
    if (!text) return 0;
    // Split by comma, remove whitespace, and filter out empty entries
    return text.split(",").filter((k) => k.trim() !== "").length;
  };

  // --- Author Logic ---
  const handleAuthorChange = (index, field, value) => {
    const newAuthors = [...authors];
    newAuthors[index][field] = value;
    setAuthors(newAuthors);
  };

  const addAuthor = () => {
    if (authors.length < 6) {
      setAuthors([
        ...authors,
        {
          salutation: "Mr",
          name: "",
          email: "",
          institute: "",
          isCorresponding: false,
        },
      ]);
    }
  };

  const removeAuthor = (index) => {
    if (authors.length <= 1) {
      setError("You must have at least one author.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    const newAuthors = authors.filter((_, i) => i !== index);
    setAuthors(newAuthors);
  };

  // --- File Handling Logic ---
  const validateFile = (file) => {
    if (file && file.type === "application/pdf") {
      setFile(file);
      setError(null);
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
      fileInputRef.current.value = null;
    }
  };

  // --- Form Submission Logic ---
  const resetForm = () => {
    setTitle("");
    setAbstract("");
    setKeywords("");
    setTopicArea("");
    setFile(null);
    setAuthors([
      {
        salutation: "Mr",
        name: "",
        email: "",
        institute: "",
        isCorresponding: false,
      },
    ]);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // --- Validation ---
    if (!title || !abstract || !keywords || !topicArea || !file) {
      setError("Please fill in all required fields and upload a PDF file.");
      return;
    }

    // --- KEYWORD FIX IS HERE ---
    // 1. Split by comma
    // 2. Trim whitespace around words
    // 3. Remove empty strings (in case user types "AI, , ML")
    const keywordList = keywords
      .split(",")
      .map((k) => k.trim())
      .filter((k) => k !== "");

    if (keywordList.length > 5) {
      setError(
        `You have entered ${keywordList.length} keywords. Maximum allowed is 5.`
      );
      return;
    }

    if (keywordList.length === 0) {
      setError("Please enter at least one keyword.");
      return;
    }

    // --- Validate all author fields ---
    for (const author of authors) {
      if (!author.name || !author.email || !author.institute) {
        setError(
          `Please fill in all fields (Name, Email, Institute) for all authors.`
        );
        return;
      }
    }

    if (!authors.some((a) => a.isCorresponding)) {
      setError("Please select at least one corresponding author.");
      return;
    }

    const MAX_SIZE_MB = 20;
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > MAX_SIZE_MB) {
      setError(`File too large! Maximum allowed size is ${MAX_SIZE_MB} MB.`);
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("abstract", abstract);

    // Send the cleaned, comma-separated string to the backend
    formData.append("keywords", keywordList.join(", "));

    formData.append("topicArea", topicArea);
    formData.append("paper", file);

    const validAuthors = authors.filter((a) => a.name.trim() !== "");
    formData.append("authors", JSON.stringify(validAuthors));

    try {
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
      setError(
        err.response?.data || "Paper submission failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const breadcrumbActions = (
    <Link
      to="/author/dashboard/papers"
      className="flex items-center text-sm font-semibold text-gray-700 hover:text-[#2c9a40] px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
    >
      <FileText className="w-4 h-4 me-1.5" />
      Submitted Papers
    </Link>
  );

  const currentKeywordCount = getKeywordCount(keywords);

  return (
    <>
      <Breadcrumbs actions={breadcrumbActions} />
      <div className="p-2 md:p-6">
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
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
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
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
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
              className={`w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 
                ${
                  currentKeywordCount > 5
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-[#521028]"
                }`}
              placeholder="e.g., AI, ML, Data Science"
              required
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">
                Separate keywords with commas.
              </p>
              {/* Visual Counter */}
              <p
                className={`text-xs font-medium ${
                  currentKeywordCount > 5 ? "text-red-600" : "text-gray-500"
                }`}
              >
                {currentKeywordCount}/5 keywords
              </p>
            </div>
          </div>

          {/* Topic Area */}
          <div>
            <label className="block text-sm font-semibold text-gray-700">
              Topic Area
            </label>
            <input
              type="text"
              name="topicArea"
              value={topicArea}
              onChange={(e) => setTopicArea(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
              placeholder="e.g., Natural Language Processing"
              required
            />
          </div>

          {/* Authors (Dynamic) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Authors (up to 6)
            </label>
            <div className="space-y-4">
              {authors.map((author, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 space-y-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => removeAuthor(index)}
                    className="absolute top-2 right-2 p-1 text-red-600 rounded-full hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={authors.length <= 1}
                  >
                    <Trash2 size={18} />
                  </button>

                  <p className="font-semibold text-gray-800">
                    Author {index + 1}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Salutation */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Salutation
                      </label>
                      <select
                        value={author.salutation}
                        onChange={(e) =>
                          handleAuthorChange(
                            index,
                            "salutation",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028] bg-white"
                      >
                        {SALUTATION_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <User className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                          type="text"
                          value={author.name}
                          onChange={(e) =>
                            handleAuthorChange(index, "name", e.target.value)
                          }
                          className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                          placeholder="Full name"
                          required
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                          type="email"
                          value={author.email}
                          onChange={(e) =>
                            handleAuthorChange(index, "email", e.target.value)
                          }
                          className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                          placeholder="author@example.com"
                          required
                        />
                      </div>
                    </div>

                    {/* Institute */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Institute / Affiliation
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                          <BookOpen className="h-5 w-5 text-gray-400" />
                        </span>
                        <input
                          type="text"
                          value={author.institute}
                          onChange={(e) =>
                            handleAuthorChange(
                              index,
                              "institute",
                              e.target.value
                            )
                          }
                          className="w-full pl-10 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#521028]"
                          placeholder="Example University"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Corresponding Author Checkbox */}
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id={`corresponding-${index}`}
                      checked={author.isCorresponding}
                      onChange={(e) =>
                        handleAuthorChange(
                          index,
                          "isCorresponding",
                          e.target.checked
                        )
                      }
                      className="h-4 w-4 text-[#447E36] border-gray-300 rounded focus:ring-[#521028]"
                    />
                    <label
                      htmlFor={`corresponding-${index}`}
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Corresponding Author
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={addAuthor}
              disabled={authors.length >= 6}
              className="mt-3 flex items-center space-x-1 text-sm font-semibold text-[#447E36] hover:text-[#2c9a40] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus size={16} />
              <span>Add Another Author</span>
            </button>
          </div>

          {/* File Upload */}
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
                  <p className="text-xs text-gray-500">PDF only (max 20MB)</p>
                </div>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between p-3 bg-gray-100 border border-gray-300 rounded-md">
                <div className="flex items-center space-x-2 overflow-hidden">
                  <FileText className="h-5 w-5 text-[#521028] shrink-0" />
                  <span className="text-sm font-medium text-gray-800 truncate">
                    {file.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1 text-red-600 rounded-full hover:bg-red-1Go cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Notifications */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-800 text-sm p-3 rounded-md flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              <span>{error}</span>
            </div>
          )}
          {success && (
            <div className="bg-green-50 border border-green-300 text-green-800 text-sm p-3 rounded-md flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              <span>{success}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center cursor-pointer py-3 mt-4 btn-green text-white font-semibold rounded-md transition-colors disabled:opacity-70"
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "Submit Paper"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default SubmitPaper;
