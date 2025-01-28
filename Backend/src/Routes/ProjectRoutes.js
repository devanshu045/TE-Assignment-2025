import { Router } from "express";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getSingleProjects
} from "../Controllers/Projects.Controllers.js";
const route = Router();

route.post("/createProject",createProject);
route.delete("/deleteProject/:id",deleteProject);
route.post("/updateProject/:id",updateProject);
route.get("/getProjects",getProjects);
route.post("/getSingleProject",getSingleProjects)

export default route;
