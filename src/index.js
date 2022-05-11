const express = require('express');
const { shareToDiscord, createClip } = require('./utils/clip');

const app = express();

const PORT = process.env.PORT || 8080;

// !so !shoutout
app.get('/shoutout/:name/:game', (req, res) => {
  const { name, game } = req.params;

  if (game.trim() === '<no game>') res.send(`HOW IS YOU MADAFA- I mean ${name}? HungryPaimon`);
  else res.send(`Checkout ${name} at https://twitch.tv/${name} Last seen playing ${game} last stream! HungryPaimon`);
});

// !clip
app.get('/clip/:code/:channel/:dcServer/:dcChannel/:clipper', async (req, res) => {
  const { code, channel, dcServer, dcChannel, clipper } = req.params;
  const webhook = `https://discord.com/api/webhooks/${dcServer}/${dcChannel}`;

  try {
    const clipURL = await createClip(code, channel);

    shareToDiscord(clipURL, webhook, clipper)
      .then(() => {
        console.log('Discord share successfull');
        res.send(`${clipData.url} also shared to discord!`);
      })
      .catch(err => {
        console.error('shareToDiscord thenable Something went wrong');
        res.send('Discord share failed');
        throw new Error(err);
      });
  } catch (err) {
    console.error('app.get FAILED');
    res.send(`failed to share to discord server D:`);
    throw new Error(err);
  }
});

app.listen(PORT, () => console.log(`> Ready on port ${PORT}`));
