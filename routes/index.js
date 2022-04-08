const { Router } = require('express');
const needle = require('needle');
const apicache = require('apicache');

// Environment variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

// Init cache
let cache = apicache.middleware;

const router = Router();

router.get('/', cache('2 minutes'), async (req, res) => {
  const params = new URLSearchParams({
    [API_KEY_NAME]: API_KEY_VALUE,
    ...req.query,
  });

  try {
    const apiResponse = await needle('get', `${API_BASE_URL}?${params}`);
    const data = apiResponse.body;

    // Log if not in production
    process.env.NODE_ENV !== 'production' &&
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);

    res.json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
