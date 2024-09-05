
# `xdrx`

> **NOTE FROM DEV:** This is the only occasion ever where I will use electron, in my opinion electron is hot trash because it takes up lots of memory, but for occasions like this, it is very useful.

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
xdrx convert path/to/input-image.png output-file.xdrx
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

## License

`xdrx` is licensed under the [ISC License](LICENSE).

## Contact

For questions or issues, open an issue on the [GitHub repo](https://github.com/linuxfandudeguy/xdrx).
