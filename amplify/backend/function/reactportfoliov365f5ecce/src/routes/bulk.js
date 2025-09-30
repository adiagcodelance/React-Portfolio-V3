const express = require('express');
const { Experience, Project, Certification, sequelize } = require('../models');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// Export all data as JSON
router.get('/export', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const [experiences, projects, certifications] = await Promise.all([
      Experience.findAll({ order: [['order', 'ASC'], ['createdAt', 'DESC']] }),
      Project.findAll({ order: [['order', 'ASC'], ['createdAt', 'DESC']] }),
      Certification.findAll({ order: [['order', 'ASC'], ['createdAt', 'DESC']] }),
    ]);

    const exportData = {
      exportDate: new Date().toISOString(),
      version: '1.0',
      data: {
        experiences,
        projects,
        certifications,
      },
      counts: {
        experiences: experiences.length,
        projects: projects.length,
        certifications: certifications.length,
      }
    };

    // Set headers for file download
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename="portfolio-export-${new Date().toISOString().split('T')[0]}.json"`);
    
    res.json(exportData);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({ error: 'Export failed' });
  }
});

// Import data from JSON (replaces existing data)
router.post('/import', authenticateToken, requireAdmin, async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { data, replaceExisting = false } = req.body;

    if (!data || !data.experiences || !data.projects || !data.certifications) {
      return res.status(400).json({ error: 'Invalid import data format' });
    }

    let importStats = {
      experiences: { created: 0, skipped: 0, errors: 0 },
      projects: { created: 0, skipped: 0, errors: 0 },
      certifications: { created: 0, skipped: 0, errors: 0 },
    };

    // If replacing existing data, clear all tables
    if (replaceExisting) {
      await Experience.destroy({ where: {}, transaction });
      await Project.destroy({ where: {}, transaction });
      await Certification.destroy({ where: {}, transaction });
    }

    // Import experiences
    for (const exp of data.experiences) {
      try {
        const { id, createdAt, updatedAt, ...expData } = exp; // Remove auto-generated fields
        await Experience.create(expData, { transaction });
        importStats.experiences.created++;
      } catch (error) {
        console.error('Experience import error:', error);
        importStats.experiences.errors++;
      }
    }

    // Import projects
    for (const proj of data.projects) {
      try {
        const { id, createdAt, updatedAt, ...projData } = proj;
        await Project.create(projData, { transaction });
        importStats.projects.created++;
      } catch (error) {
        console.error('Project import error:', error);
        importStats.projects.errors++;
      }
    }

    // Import certifications
    for (const cert of data.certifications) {
      try {
        const { id, createdAt, updatedAt, ...certData } = cert;
        await Certification.create(certData, { transaction });
        importStats.certifications.created++;
      } catch (error) {
        console.error('Certification import error:', error);
        importStats.certifications.errors++;
      }
    }

    await transaction.commit();

    res.json({
      message: 'Import completed',
      stats: importStats,
      totalItems: importStats.experiences.created + importStats.projects.created + importStats.certifications.created,
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Import error:', error);
    res.status(500).json({ error: 'Import failed: ' + error.message });
  }
});

// Clear all data (with confirmation)
router.post('/clear', authenticateToken, requireAdmin, async (req, res) => {
  const { confirm } = req.body;
  
  if (confirm !== 'DELETE_ALL_DATA') {
    return res.status(400).json({ 
      error: 'Confirmation required. Send { "confirm": "DELETE_ALL_DATA" } to proceed.' 
    });
  }

  const transaction = await sequelize.transaction();

  try {
    const deletedCounts = {
      experiences: await Experience.count({ transaction }),
      projects: await Project.count({ transaction }),
      certifications: await Certification.count({ transaction }),
    };

    await Experience.destroy({ where: {}, transaction });
    await Project.destroy({ where: {}, transaction });
    await Certification.destroy({ where: {}, transaction });

    await transaction.commit();

    res.json({
      message: 'All portfolio data cleared successfully',
      deletedCounts,
    });

  } catch (error) {
    await transaction.rollback();
    console.error('Clear data error:', error);
    res.status(500).json({ error: 'Failed to clear data' });
  }
});

module.exports = router;