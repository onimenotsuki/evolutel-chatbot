var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', async ({ wit, body }, res) => {
  const { msg } = body;
  try {
    const response = await wit.message(msg);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
