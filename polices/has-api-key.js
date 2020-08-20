const dotenv = require('dotenv');

// Cargamos las variables de entorno
dotenv.config();

module.exports = ({ headers }, res, next) => {
  const apiKey = headers['x-api-key'];

  if (apiKey === process.env.API_KEY) {
    return next();
  }

  return res
    .status(401)
    .json({ message: 'No tienes acceso, solicítalo a un administrador' });
};
