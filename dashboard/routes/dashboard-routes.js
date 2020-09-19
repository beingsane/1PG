const bot = require('../../bot');
const express = require('express');
const { validateGuild } = require('../middleware');
const guilds = require('../../data/guilds');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild, async (req, res) => {
  const id = req.params.id;
  const guild = bot.guilds.cache.get(id);

  res.render('dashboard/show', {
    guild,
    savedGuild: await guilds.get(id),
    module: req.query.module,
    textChannels: guild.channels.cache
      .array()
      .filter(c => c.type === 'text')
      .sort((a, b) => a.name > b.name ? 1 : -1)
  });
});

router.put('/servers/:id/:module', validateGuild, async (req, res) => {
  const { id, module } = req.params;

  const savedGuild = await guilds.get(id);
  savedGuild[module] = req.body;
  await savedGuild.save();
  
  res.redirect(`/servers/${id}?module=${module}`);
});

module.exports = router;