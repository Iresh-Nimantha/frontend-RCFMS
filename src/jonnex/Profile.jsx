import React, { useEffect, useState } from "react";

// Function to extract userId from JWT token
const extractUserIdFromToken = (token) => {
  try {
    // JWT tokens have three parts separated by dots
    // The middle part is the payload, which we need to decode
    const payload = token.split(".")[1];
    // The payload is base64 encoded, so we need to decode it
    const decodedPayload = JSON.parse(atob(payload));
    // Return the _id from the payload
    return decodedPayload._id;
  } catch (error) {
    console.error("Error extracting userId from token:", error);
    return null;
  }
};

// Custom hook for fetching job vacancies
const useJobVacancies = (token) => {
  const [jobVacancies, setJobVacancies] = useState([]);

  useEffect(() => {
    const fetchJobVacancies = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/jobVacancy/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch job vacancies");
        const data = await response.json();
        setJobVacancies(data);
      } catch (error) {
        console.error("Error fetching job vacancies:", error.message);
      }
    };

    fetchJobVacancies();
  }, [token]);

  return [jobVacancies, setJobVacancies];
};

// Reusable Input Component
const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div>
    <label htmlFor={name} className="block text-gray-700 font-medium">
      {label}
    </label>
    {type === "textarea" ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border rounded-md w-full"
        placeholder={placeholder}
        rows={4}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="mt-1 p-2 border rounded-md w-full"
        placeholder={placeholder}
      />
    )}
  </div>
);

// Main Profile Component
const Profile = () => {
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobType: "",
    location: "",
    salary: "",
    requiredSkills: "",
    jobDescription: "",
    companyName: "",
    industryType: "",
    companyWebsite: "",
    contactPerson: "",
    email: "",
    applicationDeadline: "",
    applyMethod: "",
  });
  const [editingJobId, setEditingJobId] = useState(null);
  const token = localStorage.getItem("authToken");
  const [jobVacancies, setJobVacancies] = useJobVacancies(token);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure jobType has a valid enum value
    if (!formData.jobType) {
      alert("Please select a valid job type");
      return;
    }

    // Check for other required fields
    const requiredFields = [
      "jobTitle",
      "jobType",
      "location",
      "salary",
      "requiredSkills",
      "jobDescription",
      "companyName",
      "industryType",
      "contactPerson",
      "email",
      "applicationDeadline",
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(", ")}`);
      return;
    }

    // Extract the userId from the JWT token
    const userId = extractUserIdFromToken(token);

    if (!userId) {
      alert("Authentication error. Please log in again.");
      return;
    }

    const newJobVacancy = {
      ...formData,
      requiredSkills: formData.requiredSkills.split(", "),
      userId: userId, // Use the extracted userId instead of the raw token
    };

    if (editingJobId) {
      await updateJobVacancy(editingJobId, newJobVacancy);
    } else {
      await createJobVacancy(newJobVacancy);
    }
  };

  const createJobVacancy = async (newJobVacancy) => {
    try {
      console.log(
        "Sending job vacancy data:",
        JSON.stringify(newJobVacancy, null, 2)
      );

      // Parse the token if it's stored as a JSON string
      let authToken;
      try {
        const jsonObject = JSON.parse(token);
        authToken = jsonObject.token;
      } catch (e) {
        // If parsing fails, assume the token is already a string
        authToken = token;
      }

      const response = await fetch("http://localhost:4000/api/jobVacancy", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJobVacancy),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Server error response:", errorData);
        throw new Error("Failed to create job vacancy");
      }

      const createdJobVacancy = await response.json();
      setJobVacancies((prev) => [...prev, createdJobVacancy]);
      resetForm();
    } catch (error) {
      console.error("Error creating job vacancy:", error.message);
    }
  };

  const updateJobVacancy = async (jobId, updatedData) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/jobVacancy/${jobId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) throw new Error("Failed to update job vacancy");
      const updatedJobVacancy = await response.json();
      setJobVacancies((prev) =>
        prev.map((job) => (job._id === jobId ? updatedJobVacancy : job))
      );
      resetForm();
    } catch (error) {
      console.error("Error updating job vacancy:", error.message);
    }
  };

  const deleteJobVacancy = async (jobId) => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/jobVacancy/${jobId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Failed to delete job vacancy");
      setJobVacancies((prev) => prev.filter((job) => job._id !== jobId));
    } catch (error) {
      console.error("Error deleting job vacancy:", error.message);
    }
  };

  const resetForm = () => {
    setEditingJobId(null);
    setFormData({
      jobTitle: "",
      jobType: "",
      location: "",
      salary: "",
      requiredSkills: "",
      jobDescription: "",
      companyName: "",
      industryType: "",
      companyWebsite: "",
      contactPerson: "",
      email: "",
      applicationDeadline: "",
      applyMethod: "",
    });
  };

  const handleEdit = (job) => {
    setEditingJobId(job._id);
    setFormData({
      jobTitle: job.jobTitle,
      jobType: job.jobType,
      location: job.location,
      salary: job.salary,
      requiredSkills: job.requiredSkills.join(", "),
      jobDescription: job.jobDescription,
      companyName: job.companyName,
      industryType: job.industryType,
      companyWebsite: job.companyWebsite || "",
      contactPerson: job.contactPerson,
      email: job.email,
      applicationDeadline: job.applicationDeadline
        ? new Date(job.applicationDeadline).toISOString().slice(0, 16)
        : "",
      applyMethod: job.applyMethod || "",
    });
  };

  return (
    <div className="flex flex-col items-center py-12">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl space-y-4 p-4 bg-white shadow-md rounded-md mb-6"
      >
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
          {editingJobId ? "Update Job Vacancy" : "Add New Job Vacancy"}
        </h2>

        <InputField
          label="Job Title"
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
        />

        <div>
          <label htmlFor="jobType" className="block text-gray-700 font-medium">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={formData.jobType}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Remote">Remote</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <InputField
          label="Location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

        <InputField
          label="Salary"
          type="text"
          name="salary"
          value={formData.salary}
          onChange={handleChange}
          placeholder="e.g., $50,000 - $70,000 or Negotiable"
        />

        <InputField
          label="Required Skills"
          type="text"
          name="requiredSkills"
          value={formData.requiredSkills}
          onChange={handleChange}
          placeholder="Comma-separated skills, e.g., JavaScript, React, Node.js"
        />

        <InputField
          label="Job Description"
          type="textarea"
          name="jobDescription"
          value={formData.jobDescription}
          onChange={handleChange}
          placeholder="Detailed description of the job role and responsibilities"
        />

        <InputField
          label="Company Name"
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
        />

        <InputField
          label="Industry Type"
          type="text"
          name="industryType"
          value={formData.industryType}
          onChange={handleChange}
          placeholder="e.g., Technology, Healthcare, Finance"
        />

        <InputField
          label="Company Website"
          type="url"
          name="companyWebsite"
          value={formData.companyWebsite}
          onChange={handleChange}
          placeholder="https://example.com"
        />

        <InputField
          label="Contact Person"
          type="text"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleChange}
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />

        <InputField
          label="Application Deadline"
          type="datetime-local"
          name="applicationDeadline"
          value={formData.applicationDeadline}
          onChange={handleChange}
        />

        <div>
          <label
            htmlFor="applyMethod"
            className="block text-gray-700 font-medium"
          >
            Application Method
          </label>
          <select
            id="applyMethod"
            name="applyMethod"
            value={formData.applyMethod}
            onChange={handleChange}
            className="mt-1 p-2 border rounded-md w-full"
          >
            <option value="">Select Application Method</option>
            <option value="Upload CV">Upload CV</option>
            <option value="Apply via Email">Apply via Email</option>
            <option value="External Link">External Link</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="mt-4 py-2 px-4 bg-blue-600 text-white font-semibold rounded-md flex-1"
          >
            {editingJobId ? "Update Job Vacancy" : "Add Job Vacancy"}
          </button>

          {editingJobId && (
            <button
              type="button"
              onClick={resetForm}
              className="mt-4 py-2 px-4 bg-gray-500 text-white font-semibold rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h2 className="text-2xl font-semibold text-indigo-600 mb-4 mt-8">
        Your Job Vacancies
      </h2>
      {jobVacancies.length > 0 ? (
        <div className="w-full max-w-2xl grid gap-4">
          {jobVacancies.map((job) => (
            <div
              key={job._id}
              className="p-4 border rounded-md shadow-md bg-white"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{job.jobTitle}</h3>
                  <p className="text-sm text-gray-600">
                    {job.companyName} • {job.location} • {job.jobType}
                  </p>
                </div>
                <div className="text-sm text-gray-600">
                  Posted: {new Date(job.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="mt-2">
                <p>
                  <strong>Salary:</strong> {job.salary}
                </p>
                <p>
                  <strong>Skills:</strong>{" "}
                  {Array.isArray(job?.requiredSkills)
                    ? job.requiredSkills.join(", ")
                    : "No skills specified"}
                </p>
                <p className="mt-2">
                  {job?.jobDescription
                    ? job.jobDescription.length > 150
                      ? job.jobDescription.substring(0, 150) + "..."
                      : job.jobDescription
                    : "No job description available"}
                </p>
              </div>

              <div className="flex justify-between items-center mt-4 pt-2 border-t">
                <div>
                  <p className="text-sm text-red-600">
                    <strong>Deadline:</strong>{" "}
                    {new Date(job.applicationDeadline).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="py-1 px-3 bg-green-600 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteJobVacancy(job._id)}
                    className="py-1 px-3 bg-red-600 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full max-w-2xl p-8 text-center bg-gray-100 rounded-md">
          <p className="text-gray-600">No job vacancies found</p>
          <p className="text-sm mt-2">
            Create your first job posting using the form above.
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
