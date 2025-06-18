const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createProject = async (req, res) => {
  const { title, description } = req.body;
  const ownerId = req.user.userId;

  if (!title) return res.status(400).json({ error: `Title is required` });

  try {
    const project = await prisma.project.create({
      data: {
        title,
        description,
        ownerId,
      },
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: `Failed to create project` });
  }
};

const getProjects = async (req, res) => {
  const ownerId = req.user.userId;
  try {
    const projects = await prisma.findMany({
      where: { ownerId },
      orderBy: { createdAt: "desc" },
    });

    res.json(projects);
  } catch (err) {}
};

const getProjectById = async (req, res) => {
  const ownerId = req.user.userId;
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  try {
    const project = await prisma.project.findFirst({
      where: { id, ownerId },
    });
    if (!project) return res.status({ error: `Project not found` });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch project` });
  }
};

const updateProject = async (req, res) => {
  const ownerId = req.user.userId;
  const id = parseInt(req.params.id);
  const { title, description } = req.body;

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!project || project.ownerId !== ownerId) {
      return res
        .status(404)
        .json({ error: `Project not found or not authorized` });
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: { title, description },
    });

    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: `Failed to update project` });
  }
};

const deleteProject = async (req, res) => {
  const ownerId = req.user.userId;
  const id = parseInt(req.params.id);

  try {
    const project = await prisma.project.findUnique({ where: { id } });

    if (!project || project.ownerId !== ownerId) {
      return res
        .status(404)
        .json({ error: `Product not found or not authorized` });
    }

    await prisma.project.delete({ where: { id } });
    res.json({ message: `Project Deleted` });
  } catch (err) {
    res.status({ error: `Failed to delete project` });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
