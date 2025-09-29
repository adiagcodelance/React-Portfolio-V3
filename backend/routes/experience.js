const express = require('express');
const { body, validationResult } = require('express-validator');
const { Experience } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET all experiences (public)
router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.findAll({
      where: { isActive: true },
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    res.json(experiences);
  } catch (error) {
    console.error('Get experiences error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single experience (public)
router.get('/:id', async (req, res) => {
  try {
    const experience = await Experience.findOne({
      where: { id: req.params.id, isActive: true },
    });
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }
    
    res.json(experience);
  } catch (error) {
    console.error('Get experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all experiences (admin - includes inactive)
router.get('/admin/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const experiences = await Experience.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    res.json(experiences);
  } catch (error) {
    console.error('Get all experiences error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE experience (admin only)
router.post('/', [
  body('company').notEmpty().withMessage('Company is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('dates').notEmpty().withMessage('Dates are required'),
], authenticateToken, requireAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const experience = await Experience.create(req.body);
    res.status(201).json(experience);
  } catch (error) {
    console.error('Create experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE experience (admin only)
router.put('/:id', [
  body('company').notEmpty().withMessage('Company is required'),
  body('title').notEmpty().withMessage('Title is required'),
  body('dates').notEmpty().withMessage('Dates are required'),
], authenticateToken, requireAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [updated] = await Experience.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updated === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    const experience = await Experience.findByPk(req.params.id);
    res.json(experience);
  } catch (error) {
    console.error('Update experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE experience (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await Experience.destroy({
      where: { id: req.params.id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    res.json({ message: 'Experience deleted successfully' });
  } catch (error) {
    console.error('Delete experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TOGGLE experience active status (admin only)
router.patch('/:id/toggle', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.id);
    
    if (!experience) {
      return res.status(404).json({ error: 'Experience not found' });
    }

    experience.isActive = !experience.isActive;
    await experience.save();

    res.json(experience);
  } catch (error) {
    console.error('Toggle experience error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;