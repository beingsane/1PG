const bot = require('../../bot');
const express = require('express');
const { validateGuild } = require('../middleware');
const guilds = require('../../data/guilds');

const router = express.Router();

router.get('/dashboard', (req, res) => res.render('dashboard/index'));

router.get('/servers/:id', validateGuild, async (req, res) => {
  const id = req.params.id;

  const guild = bot.guilds.cache.get(id);
  const parentChannels = guild.channels.cache
    .array()
    .filter(c => c.type === 'category')
    .map(c => ({
      name: c.name,
      id: c.id,
      channels: guild.channels.cache
        .filter(c2 => c2.type === 'text' && c2.parentID === c.id)
        .array()
    }));

  res.render('dashboard/show', {
    guild: bot.guilds.cache.get(id),
    savedGuild: await guilds.get(id),
    parentChannels,
    module: req.query.module
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