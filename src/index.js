#!/usr/bin/env node

const { convertImageToXdrx } = require('./convert');
const { viewXdrxFile } = require('./view');

const [,, command, ...args] = process.argv;

switch (command) {
    case 'convert':
        if (args.length !== 2) {
            console.error('Usage: xdrx convert <input_file> <output_file>');
            process.exit(1);
        }
        const [inputFile, outputFile = 'output'] = args;
        convertImageToXdrx(inputFile, outputFile);
        break;

    case 'view':
        if (args.length !== 1) {
            console.error('Usage: xdrx view <xdrx_file>');
            process.exit(1);
        }
        const [xdrxFile] = args;
        viewXdrxFile(xdrxFile);
        break;

    default:
        console.error('Unknown command. Use "convert" or "view".');
        process.exit(1);
}
