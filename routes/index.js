var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', async ({ wit, body }, res) => {
  const { msg } = body;
  try {
    const response = await wit.message(msg);

    const { text, intents, entities } = response;

    if (Array.isArray(intents) && intents.length) {
      const flatIntents = intents.map(({ name }) => name);

      if (flatIntents.includes('get-support')) {
        return res.status(200).json({
          intent: 'get-support',
          entitie: entities['supportType:supportType'][0],
        });
      }
    }

    return res.status(200).json({ message: 'El intent no se reconoce' });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
