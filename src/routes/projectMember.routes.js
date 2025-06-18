const express = require('express');
const router = express.Router({ mergeParams: true });
const authenticateToken = require('../middlewares/auth');
const {
  addMember,
  removeMember,
  listMembers,
} = require('../controllers/projectMember.controller');

router.use(authenticateToken);

router.post('/', addMember);           // POST /api/projects/:projectId/members
router.delete('/:userId', removeMember); // DELETE /api/projects/:projectId/members/:userId
router.get('/', listMembers);          // GET /api/projects/:projectId/members

module.exports = router;
