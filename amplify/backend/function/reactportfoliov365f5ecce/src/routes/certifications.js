const express = require('express');
const { body, validationResult } = require('express-validator');
const { Certification } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET all certifications (public)
router.get('/', async (req, res) => {
  try {
    const certifications = await Certification.findAll({
      where: { isActive: true },
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    res.json(certifications);
  } catch (error) {
    console.error('Get certifications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET single certification (public)
router.get('/:id', async (req, res) => {
  try {
    const certification = await Certification.findOne({
      where: { id: req.params.id, isActive: true },
    });
    
    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }
    
    res.json(certification);
  } catch (error) {
    console.error('Get certification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET all certifications (admin - includes inactive)
router.get('/admin/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const certifications = await Certification.findAll({
      order: [['order', 'ASC'], ['createdAt', 'DESC']],
    });
    res.json(certifications);
  } catch (error) {
    console.error('Get all certifications error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// CREATE certification (admin only)
router.post('/', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
], authenticateToken, requireAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const certification = await Certification.create(req.body);
    res.status(201).json(certification);
  } catch (error) {
    console.error('Create certification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// UPDATE certification (admin only)
router.put('/:id', [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
], authenticateToken, requireAdmin, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const [updated] = await Certification.update(req.body, {
      where: { id: req.params.id },
      returning: true,
    });

    if (updated === 0) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    const certification = await Certification.findByPk(req.params.id);
    res.json(certification);
  } catch (error) {
    console.error('Update certification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE certification (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await Certification.destroy({
      where: { id: req.params.id },
    });

    if (deleted === 0) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.error('Delete certification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// TOGGLE certification active status (admin only)
router.patch('/:id/toggle', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const certification = await Certification.findByPk(req.params.id);
    
    if (!certification) {
      return res.status(404).json({ error: 'Certification not found' });
    }

    certification.isActive = !certification.isActive;
    await certification.save();

    res.json(certification);
  } catch (error) {
    console.error('Toggle certification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;