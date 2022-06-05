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

exports.createClip = createClip;