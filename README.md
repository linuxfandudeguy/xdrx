
# `xdrx`

> **NOTE FROM DEV:** This is the only occasion ever where I will use electron, in my opinion electron is hot trash because it takes up lots of memory, but for occasions like this, it is very useful. Also, this project was inspired by facedev's [bruh](https://github.com/face-hh/bruh/) image file type.

> if you don't want to run the command to make the images the yourself, then there is plenty of images you can use in the `examples` folder

## Overview

`xdrx` is a custom image file format where each pixel is represented by a hex color value, with each new line of pixels starting on a new line. It allows you to convert images to the `.xdrx` format and view them in a draggable window.

## Installation

Install `xdrx` globally using npm:

```bash
npm install -g xdrx
```

Or with Yarn:

```bash
yarn global add xdrx
```

Or with pnpm:

```bash
pnpm add -g xdrx
```

## Usage

### Converting an Image to `.xdrx` Format:

To convert an image to the `.xdrx` format, you must specify the input file first, followed by the desired output file name:

```bash
xdrx convert path/to/input-image.png output-file
```

This command will convert `input-image.png` to `output-file.xdrx`. Make sure to provide the correct path to the input image and specify the name of the output `.xdrx` file.

### Viewing an `.xdrx` File:

To view an `.xdrx` file, specify the file name directly:

```bash
xdrx view path/to/image.xdrx
```

This will open a new draggable window displaying the image from the `.xdrx` file.

## Contributing

To contribute:

1. Fork the repo.
2. Create a new branch.
3. Make your changes.
4. Push to your fork.
5. Create a Pull Request.

## Installing necessary files
To install all of the files normally you would run:

```bash
npm install -g xdrx@latest 
```
A file that is responsible for opening windows (`electron.js`) is for some reason is not installed with it.

To install it run this command:
```bash
cat <<EOF > electron.js
const { app, BrowserWindow } = require('electron');
const path = require('path');

// Create a new browser window
function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    });

    // Load the local server (localhost:3000)
    win.loadURL('http://localhost:3000');

    // Optional: Open DevTools for debugging
    // win.webContents.openDevTools();
}

// Initialize the Electron app
app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed (except on macOS)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
EOF
```
## License

`xdrx` is licensed under the [ISC License](LICENSE).

## Contact

For questions or issues, open an issue on the [GitHub repo](https://github.com/linuxfandudeguy/xdrx).
