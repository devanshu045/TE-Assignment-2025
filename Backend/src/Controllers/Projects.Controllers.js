import projectDetails from "../Models/projectDetails.js";
import mongoose from "mongoose";

// Create a new project
const createProject = async (req, res) => {
  try {
    const { newProject } = req.body;
    if (
      !newProject ||
      !newProject.projectName ||
      !newProject.projectDescription ||
      !newProject.skillSet ||
      !newProject.membersNumber 
    ) {
      return res.status(400).send({ message: "Please enter all details" });
    }

    const project = await projectDetails.create(newProject);

    return res.status(201).send({ message: "Project saved", project });
  } catch (error) {
    console.error("createProject error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Delete a project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send({ message: "Invalid or missing ID" });
    }

    const deletedProject = await projectDetails.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).send({ message: "Project not found" });
    }

    return res.status(200).send({ message: "Project deleted", deletedProject });
  } catch (error) {
    console.error("deleteProject error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Update a project
const updateProject = async (req, res) => {
  try {
    const {id} = req.params
    const { updateProjectDetails} = req.body;
    if (!id) {
      return res.status(400).send({ message: "Invalid or missing ID" });
    }

    if (
      !updateProjectDetails ||
      !updateProjectDetails.projectName ||
      !updateProjectDetails.projectDescription ||
      !updateProjectDetails.skillSet ||
      !updateProjectDetails.membersNumber
    ) {
      return res.status(400).send({ message: "Please enter all details" });
    }

    const updatedProject = await projectDetails.findByIdAndUpdate(
      {_id:id},
      updateProjectDetails,
      {new: true},
    );

    if (!updatedProject) {
      return res.status(404).send({ message: "Project not found" });
    }

    return res
      .status(200)
      .send({ message: "Project updated", updatedProject });
  } catch (error) {
    console.error("updateProject error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

// Get all projects
const getProjects = async (req, res) => {
  try {
    const projects = await projectDetails.find();
    if (!projects || projects.length === 0) {
      return res.status(404).send({ message: "No projects found" });
    }

    return res.status(200).send({ message: "All projects", projects });
  } catch (error) {
    console.error("getProjects error:", error);
    return res.status(500).send({ message: "Server Error" });
  }
};

const getSingleProjects = async (req, res) => {
    try {
      const  {id}  = req.body;
  
      if (!id) {
        return res.status(400).send({ message: "Invalid or missing ID" });
      }
  
      const projectData = await projectDetails.findOne({ _id: id });
  
      if (!projectData) {
        return res.status(404).send({ message: "Project Not Found" });
      }
      const sendProjectData = {
        projectName: projectData.projectName,
        projectDescription: projectData.projectDescription,
        skillSet: projectData.skillSet,
        membersNumber: projectData.membersNumber,
        isActive: projectData.isActive
      }
      return res.status(200).send({ message: "Project fetched successfully", sendProjectData });
    } catch (error) {
      console.error("Error fetching project:", error);
      return res.status(500).send({ message: "Server Error", error: error.message });
    }
  };
  

export { getProjects, createProject, updateProject, deleteProject,getSingleProjects };
