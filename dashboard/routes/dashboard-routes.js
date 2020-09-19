const bot = require('../../bot');
const express = require('express');
const { validateGuild } = require('../middleware');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild, (req, res) => res.render('dashboard/show', {
  guild: bot.guilds.cache.get(req.params.id)
}));

module.exports = router;