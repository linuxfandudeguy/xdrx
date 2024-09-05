const fs = require('fs');
const express = require('express');
const path = require('path');
const { exec } = require('child_process');

async function viewXdrxFile(xdrxFile) {
    const ora = (await import('ora')).default; // Dynamically import ora

    const app = express();

    // Start the loading spinner
    const spinner = ora('Starting Express server...').start();

    // Serve the xdrx file
    app.get('/', (req, res) => {
        fs.readFile(xdrxFile, 'utf8', (err, data) => {
            if (err) {
                spinner.fail('Failed to read the file.');
                console.error('Error reading the file:', err);

                // Send a React-like error overlay template
                return res.status(500).send(`
                    <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f6f6f6;
                                color: #333;
                                padding: 20px;
                            }
                            h1 {
                                color: #ff0000;
                            }
                            pre {
                                background-color: #eee;
                                padding: 10px;
                                border-radius: 5px;
                                overflow-x: auto;
                            }
                            .error-box {
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 10px;
                                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                            }
                        </style>
                    </head>
                    <body>
                        <div class="error-box">
                            <h1>Error: ${err.message}</h1>
                            <p>Something went wrong while reading the file:</p>
                            <pre>${err.stack}</pre>
                            <p><strong>File:</strong> ${xdrxFile}</p>
                        </div>
                    </body>
                    </html>
                `);
            }

            const lines = data.split('\n');
            const width = lines[0].split(' ').length;
            const height = lines.length;

            res.setHeader('Content-Type', 'image/png');

            // Create an image buffer
            const { createCanvas } = require('canvas');
            const canvas = createCanvas(width, height);
            const ctx = canvas.getContext('2d');

            lines.forEach((line, y) => {
                line.split(' ').forEach((hex, x) => {
                    const color = hex.startsWith('#') ? hex.slice(1) : hex;
                    const r = parseInt(color.slice(0, 2), 16);
                    const g = parseInt(color.slice(2, 4), 16);
                    const b = parseInt(color.slice(4, 6), 16);
                    ctx.fillStyle = `rgb(${r},${g},${b})`;
                    ctx.fillRect(x, y, 1, 1);
                });
            });

            // Stream the PNG image to the client
            canvas.createPNGStream().pipe(res);
        });
    });

    const port = 3000;

    // Start the Express server
    const server = app.listen(port, () => {
        spinner.succeed(`Server running at http://localhost:${port}/`);

        // Launch the Electron window after the server is ready
        exec('npx electron electron.js', (err, stdout, stderr) => {
            if (err) {
                console.error(`Error starting Electron: ${stderr}`);
                return;
            }
            console.log(stdout);
        });
    });
}

module.exports = { viewXdrxFile };
