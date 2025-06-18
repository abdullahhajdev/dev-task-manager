const { PrismaClient, ProjectRole } = require('@prisma/client');
const prisma = new PrismaClient();

// Add member to project (only project owner allowed)
const addMember = async (req, res) => {
  const { projectId } = req.params;
  const { userId, role } = req.body;
  const requesterId = req.user.userId;

  try {
    const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (project.ownerId !== requesterId) {
      return res.status(403).json({ error: 'Only project owner can add members' });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const existingMember = await prisma.projectMember.findUnique({
      where: { projectId_userId: { projectId: Number(projectId), userId } },
    });
    if (existingMember) {
      return res.status(400).json({ error: 'User is already a member' });
    }

    const member = await prisma.projectMember.create({
      data: {
        projectId: Number(projectId),
        userId,
        role: role && Object.values(ProjectRole).includes(role) ? role : ProjectRole.MEMBER,
      },
    });

    res.status(201).json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add member' });
  }
};

// Remove member from project (only owner)
const removeMember = async (req, res) => {
  const { projectId, userId } = req.params;
  const requesterId = req.user.userId;

  try {
    const project = await prisma.project.findUnique({ where: { id: Number(projectId) } });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (project.ownerId !== requesterId) {
      return res.status(403).json({ error: 'Only project owner can remove members' });
    }

    if (Number(userId) === requesterId) {
      return res.status(400).json({ error: 'Owner cannot remove themselves' });
    }

    await prisma.projectMember.delete({
      where: {
        projectId_userId: { projectId: Number(projectId), userId: Number(userId) },
      },
    });

    res.json({ message: 'Member removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove member' });
  }
};

// List all members of a project (owner or members)
const listMembers = async (req, res) => {
  const { projectId } = req.params;
  const requesterId = req.user.userId;

  try {
    const project = await prisma.project.findUnique({
      where: { id: Number(projectId) },
      include: { projectMemberships: true },
    });
    if (!project) return res.status(404).json({ error: 'Project not found' });

    const isMember = project.projectMemberships.some(m => m.userId === requesterId);
    if (!isMember && project.ownerId !== requesterId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const members = await prisma.projectMember.findMany({
      where: { projectId: Number(projectId) },
      include: {
        user: { select: { id: true, name: true, email: true } },
      },
    });

    res.json(members);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to list members' });
  }
};

module.exports = { addMember, removeMember, listMembers };
