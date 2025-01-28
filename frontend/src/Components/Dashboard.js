import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [searchBox, setSearchBox] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/Project/getProjects"
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.log("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleEdit = (id) => {
    navigate(`/update/${id}`);
  };

  const handleCreateProject = () => {
    navigate("/create");
  };

  const handleDelete = async (id) => {
    let toastId;

    const showConfirmToast = () => {
      toastId = toast.info(
        <div>
          <p>Are you sure you want to proceed?</p>
          <div>
            <button
              onClick={handleConfirm}
              className="bg-green-500 text-black px-4 py-2 rounded mr-2"
            >
              Confirm
            </button>
            <button
              onClick={handleCancel}
              className="bg-red-500 text-black px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>,
        {
          autoClose: false, // Prevent auto-close so the user can interact with the buttons
          closeOnClick: false,
          hideProgressBar: true,
          draggable: false,
        }
      );
    };

    const handleConfirm = async () => {
      try {
        await axios.delete(`http://localhost:8080/Project/deleteProject/${id}`);
        setProjects((prevProjects) =>
          prevProjects.filter((project) => project._id !== id)
        );
        toast.success("You confirmed the action!");
        toast.dismiss(toastId); // Dismiss the toast
      } catch (error) {
        console.log("Error deleting project:", error);
        toast.dismiss(toastId); // Dismiss the toast in case of error
      }
    };

    const handleCancel = () => {
      toast.error("Action cancelled.");
      toast.dismiss(toastId); // Dismiss the toast when cancelled
    };

    showConfirmToast();
  };

  const filteredProjects = projects.filter(
    (project) =>
      project.projectName.toLowerCase().includes(searchBox.toLowerCase()) ||
      project.projectDescription.toLowerCase().includes(searchBox.toLowerCase())
  );

  return (
    <div>
<h1 className="text-center">Projects</h1>

      <div className="d-flex flex-wrap align-items-center gap-3 mb-4">
        <button className="btn btn-primary" onClick={handleCreateProject}>
          Add New Project
        </button>
        <input
          type="text"
          className="form-control flex-grow-1 w-25"
          placeholder="Search by name and description"
          value={searchBox}
          onChange={(e) => setSearchBox(e.target.value)}
        />
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Project Description</th>
              <th>Skill Set</th>
              <th>No of Members</th>
              <th>Is Active</th>
              <th>Created Date</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.map((val, index) => (
              <tr key={index}>
                <td>{val.projectName}</td>
                <td>{val.projectDescription}</td>
                <td>{val.skillSet.join(", ")}</td>
                <td>{val.membersNumber}</td>
                <td>{val.isActive ? "yes" : "No"}</td>
                <td>{new Date(val.createdAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-warning"
                    onClick={() => handleEdit(val._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(val._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
