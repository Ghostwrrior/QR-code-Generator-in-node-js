import inquirer from 'inquirer';
import qr from 'qr-image';
import { createWriteStream, writeFileSync } from 'fs';

// Function to generate QR code and save URL to a text file
function generateQRCodeAndSaveURL(text) {
  // Generate and save QR code
  const qrCode = qr.image(text, { type: 'png' });
  qrCode.pipe(createWriteStream('qr-code.png'));
  console.log('QR code generated and saved as qr-code.png');

  // Save URL to a text file
  writeFileSync('input-url.txt', text, 'utf8');
  console.log('URL saved to input-url.txt');
}

// Prompt user for input
inquirer
  .prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter the text or URL to generate a QR code:'
    }
  ])
  .then((answers) => {
    generateQRCodeAndSaveURL(answers.text);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
