const express = require('express');
const { shareToDiscord, createClip } = require('./utils/clip');

const app = express();

const PORT = process.env.PORT || 8080;

// !so !shoutout
app.get('/shoutout/:name/:game', (req, res) => {
  const { name, game } = req.params;

  if (game.trim() === '<no game>') res.send(`HOW IS YOU MADAFA- I mean ${name}? HungryPaimon`);
  else res.send(`Checkout ${name} at https://twitch.tv/${name} Last seen playing ${game} on stream! HungryPaimon`);
});

// !clip
app.get('/clip/:code/:channel/:dcServer/:dcChannel/:clipper', async (req, res) => {
  const { code, channel, dcServer, dcChannel, clipper } = req.params;
  const webhook = `https://discord.com/api/webhooks/${dcServer}/${dcChannel}`;

  try {
    const clipURL = await createClip(code, channel);

    if (clipURL.match(/^http/gm)) { // If it's a link, share it to discord
      shareToDiscord(clipURL, webhook, clipper)
        .then(() => {
          console.log('Discord share successfull');
          res.send(`${clipURL} also shared to discord!`);
        })
        .catch(err => {
          console.error('shareToDiscord thenable Something went wrong');
          res.send('Discord share failed');
          throw new Error(err);
        });
    } else { // If not, only share the message
      res.send(`${clipURL} Try it again!`);
    }
  } catch (err) {
    console.error('app.get FAILED');
    res.send(`Failed to share to discord server D:`);
    throw new Error(err);
  }
});

app.get('*', (req, res) => {
  res.send('Something went wrong! You sure you typed the command correctly? D:');
});

app.listen(PORT, () => console.log(`> Ready on port ${PORT}`));
