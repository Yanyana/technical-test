const cors = require('cors');

const corsOptions = {
  origin:
    process.env.NODE_ENV === 'production' && !process.env.FORCE_DEV
      ? [
          'site_production',
          process.env.NOW_URL, // untuk mengijinkan site/alamat untuk mengakses
        ].filter(Boolean)
      : [/localhost/],
  credentials: true,
};

const Cors = cors(corsOptions)

module.exports = {
  Cors,
  corsOptions,
};