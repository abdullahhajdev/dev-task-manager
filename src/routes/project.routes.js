const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");
const projectMemberRoutes = require('./projectMember.routes');


router.post("/", authenticateToken, createProject);
router.get("/", authenticateToken, getProjects);
router.get("/:id", authenticateToken, getProjectById);
router.put("/:id", authenticateToken, updateProject);
router.delete("/:id", authenticateToken, deleteProject);


router.use('/:projectId/members', projectMemberRoutes);

module.exports = router;
