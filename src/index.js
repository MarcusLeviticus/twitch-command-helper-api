const express = require('express');
const cors = require('cors');
const { createClip } = require('./utils/clip');
const { shareToDiscord } = require('./utils/discord');
const { getCurrentlySubbed, getBitsLeaderboard } = require('./utils/twitch');

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());

// !so !shoutout
app.get('/shoutout/:name/:game', (req, res) => {
  const { name, game } = req.params;

  const randomShoutout = ($name) => {
    const so = [
      `HOW IS YOU MADAFA- I mean ${$name}? HungryPaimon`,
      `How is you ${$name}? HungryPaimon`,
      `${$name} is here!!! Welcome!!!`
    ];

    return so[Math.floor(Math.random() * so.length)];
  };

  if (game.trim() === '<no game>') res.send(randomShoutout(name));
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
          console.log('Discord share successful');
          res.send(`${clipURL} also shared to discord! Refine edit the clip at ${clipURL}/edit`);
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

// View all currently subbed users (max 100)
app.get('/subs/:id', async (req, res) => {
  const subs = await getCurrentlySubbed(req.params.id);

  res.send(subs);
});

// View cheerer leaderboard users (max 100)
app.get('/cheers', async (req, res) => {
  const cheerers = await getBitsLeaderboard();

  res.send(cheerers);
});

app.get('*', (req, res) => {
  res.send('Something went wrong! You sure you typed the command correctly? D:');
});

app.listen(PORT, () => console.log(`> Ready on port ${PORT}`));
