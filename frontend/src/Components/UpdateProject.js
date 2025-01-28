import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const techOption = [
  "Asp.Net",
  "PHP",
  "Java",
  "ReactJs",
  "ReactNative",
  "AngularJs",
  "NodeJs",
  "PWA",
  "Flutter",
  "VueJs",
  "VanillaJs",
  "SQLServer",
  "MySQL",
  "MongoDB",
  "HTML",
  "CSS",
  "JavaScript/jQuery",
];

const CreateProject = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    projectDescription: "",
    skillSet: [],
    membersNumber: "",
    isActive: true, // Default value
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("http://localhost:8080/Project/getSingleProject", { id })
      .then((response) => {
        setFormData(response.data.sendProjectData);
      })
      .catch((error) => {
        console.error("Error fetching project:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  

  const handleSkillChange = (e) => {
    const skill = e.target.value;
    if (skill && !formData.skillSet.includes(skill)) {
      setFormData({ ...formData, skillSet: [...formData.skillSet, skill] });
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skillSet: formData.skillSet.filter((s) => s !== skill),
    });
  };

  const validateForm = () => {
    const {
      projectName,
      projectDescription,
      skillSet,
      membersNumber,
    } = formData;

    if (!projectName) {
      toast.error("Project Name is required.");
      return false;
    }

    if (!projectDescription) {
      toast.error("Project Description is required.");
      return false;
    }

    if (skillSet.length === 0) {
      toast.error("At least one skill is required.");
      return false;
    }

    if (!membersNumber) {
      toast.error("Number of members is required.");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await axios.post(
          `http://localhost:8080/Project/updateProject/${id}`,
          { updateProjectDetails: formData }
        );
        toast.success("Project saved successfully!");
        navigate("/");
      } catch (error) {
        console.error("Error saving project:", error);
        toast.error("Failed to save project. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      projectName: "",
      projectDescription: "",
      skillSet: [],
      membersNumber: "",
      isActive: true,
    });
  };

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h2 className="text-center">Update Project</h2>
        </div>
        <div className="card-body">
          <form>
            <div className="mb-3">
              <label htmlFor="projectName" className="form-label">
                Project Name
              </label>
              <input
                type="text"
                name="projectName"
                id="projectName"
                value={formData.projectName}
                onChange={handleChange}
                placeholder="Enter project name"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="projectDescription" className="form-label">
                Project Description
              </label>
              <textarea
                name="projectDescription"
                id="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                placeholder="Enter project description"
                className="form-control"
                rows="3"
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="skillSet" className="form-label">
                Select Technology
              </label>
              <select
                name="skillSet"
                id="skillSet"
                onChange={handleSkillChange}
                className="form-select"
              >
                <option value="">Choose...</option>
                {techOption.map((val, index) => (
                  <option key={index} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                {formData.skillSet.length > 0 && (
                  <ul className="list-group">
                    {formData.skillSet.map((skill, index) => (
                      <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        {skill}
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => removeSkill(skill)}
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="membersNumber" className="form-label">
                Total Members
              </label>
              <input
                type="number"
                name="membersNumber"
                id="membersNumber"
                value={formData.membersNumber}
                onChange={handleChange}
                placeholder="Enter total members"
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Is Active?</label>
              <div>
                <div className="form-check">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  <label htmlFor="isActive" className="form-check-label">
                    Active
                  </label>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-success"
              >
                Save
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
