const axios = require('axios');

const getCurrentlySubbed = async (id) => {
  const { data: subs } = await axios({
    method: 'get',
    url: `https://api.twitch.tv/helix/subscriptions`,
    params: {
      broadcaster_id: id,
      first: 100
    },
    headers: {
      'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID
    }
  });

  return subs.data;
};

const getBitsLeaderboard = async () => {
  const { data: cheerers } = await axios({
    method: 'get',
    url: `https://api.twitch.tv/helix/bits/leaderboard`,
    params: {
      count: 100
    },
    headers: {
      'Authorization': `Bearer ${process.env.TWITCH_OAUTH_TOKEN}`,
      'Client-Id': process.env.TWITCH_CLIENT_ID
    }
  });

  return cheerers.data;
};

exports.getCurrentlySubbed = getCurrentlySubbed;
exports.getBitsLeaderboard = getBitsLeaderboard;