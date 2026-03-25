const express = require('express');
const router = express.Router();

const {
  createPortfolio,
  getPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolio.controller');
const { requireAuth } = require('../middleware/auth');
const { validatePortfolio } = require('../middleware/validate');
const { createPortfolioLimiter } = require('../middleware/rateLimit');

router.post  ('/',      requireAuth, createPortfolioLimiter, validatePortfolio, createPortfolio);
router.get   ('/:code', getPortfolio);
router.put   ('/:code', requireAuth, validatePortfolio, updatePortfolio);
router.delete('/:code', requireAuth, deletePortfolio);

module.exports = router;
