const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function convertImageToXdrx(inputFile, outputFile) {
    try {
        const image = sharp(inputFile);
        const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
        
        const { width, height, channels } = info;
        const hexColors = [];

        for (let y = 0; y < height; y++) {
            let row = '';
            for (let x = 0; x < width; x++) {
                const index = (y * width + x) * channels;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];
                row += `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')} `;
            }
            hexColors.push(row.trim());
        }

        if (!outputFile.endsWith('.xdrx')) {
            outputFile += '.xdrx';
        }

        fs.writeFileSync(outputFile, hexColors.join('\n'), 'utf8');
        console.log(`Image successfully converted to ${outputFile}`);
    } catch (error) {
        console.error(`Failed to convert image: ${error.message}`);
    }
}

module.exports = { convertImageToXdrx };
