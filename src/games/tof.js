const express = require('express');

const router = express.Router();

router.get('/:character/:user', (req, res) => {
  const character = req.params.character.toLowerCase();
  const user = req.params.user;

  switch (character) {
    case 'presets':
      res.send('!tof [CHARACTER NAME] available characters are Ganyu, Yoimiya, Kuki, beidou, Yelan, Lumine, Noelle, Dehya, Xinyan & Collei');
      break;
    case 'ganyu':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557316611291648000/photo/1`);
      break;
    case 'yoimiya':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557319062065393664/photo/1 ID is 2335030`);
      break;
    case 'kuki':
    case 'shinobu':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557328392957337601/photo/1`);
      break;
    case 'beidou':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557397965798805504/photo/1`);
      break;
    case 'yelan':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557403698443489280/photo/1`);
      break;
    case 'lumine':
    case 'hotaru':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557408955659595776/photo/1`);
      break;
    case 'noelle':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557415117977186305/photo/1`);
      break;
    case 'dehya':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557426577360957440/photo/1`);
      break;
    case 'xinyan':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557444188173893632/photo/1`);
      break;
    case 'collei':
      res.send(`@${user} preset here ➡ https://twitter.com/Marviuz/status/1557462403948085248/photo/1`);
      break;
    default:
      res.send('I made some decent Genshin Character presets for ToF! Type "!tof presets" if you\'re interested!');
  }
});

module.exports = router;