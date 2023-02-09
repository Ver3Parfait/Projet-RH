
const sharp = require('sharp');

sharp(inputBuffer)
  .resize(320, 240)
  .toFile('output.webp');