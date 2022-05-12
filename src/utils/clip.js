const axios = require('axios');

const createClip = async (code, channel) => {
  try {
    const { data: clipURL } = await axios({
      method: 'get',
      url: `https://api.thefyrewire.com/twitch/clips/create/${code}?channel=${channel}`
    });

    return clipURL;
  } catch (err) {
    console.error('createClip ERROR');
    throw new Error(err);
  }
};

const shareToDiscord = async (clip, webhook, clipper) => {
  try {
    return axios({
      method: 'post',
      url: webhook,
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({ content: `New clip by ${clipper}: ${clip}` })
    });
  } catch (err) {
    console.error('shareToDiscord ERROR');
    throw new Error(err);
  }
};

exports.createClip = createClip;
exports.shareToDiscord = shareToDiscord;
