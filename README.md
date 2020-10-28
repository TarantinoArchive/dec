# DEC
Developer-Easy CMS

![GitHub package.json version](https://img.shields.io/github/package-json/v/GianlucaTarantino/DEC?style=flat-square) ![GitHub](https://img.shields.io/github/license/GianlucaTarantino/DEC?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/min/decms?style=flat-square) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/decms?style=flat-square) ![GitHub All Releases](https://img.shields.io/github/downloads/GianlucaTarantino/DEC/total?style=flat-square)
- [Description](#very-lightweight-and-simple)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Support](#support)
- [License](#license)

## Very lightweight and simple
If you are a web developer and you want a simple CMS, with no frills and with just what you need, DEC is for you!
Write your pages layout using the EJS syntax, one of the simplest HTML templating engines, and everything will just work!
**You have to be a bit experienced in web development**

## Features
- Lightweight, few and small dependencies
- Simple usage (if you are a developer!)
- Based on Express and EJS
- Totally open source (contribute!)

## Installation

You can use NPM to install DEC
```bash
# Install locally, for one project
npm install decms
# Install globally, system wide
npm install -g decms
```

## Usage
DEC is very simple. You simply run a command, modify the EJS template et voilá! Learn EJS with their [official documentation](https://ejs.co/).

To create a new DEC Project, just make a new directory, init a new NPM project, install the decms package and run the following command
```bash
dec new 12345 # 12345 is the password to POST new article to the CMS.
```

The index.ejs file in the root folder of the project will be the root (/) of the site. The article.ejs file will be the template for each article.

In each EJS page will be passed the full articles array, a data object with all the informations about the request and the response and a customData object, that will be equal to the customData.json file, if it exists in the root of the project.

To serve the site use the following command
```bash
dec serve
```
**(To serve on a custom port, add a new Environmental Variable in .env, called PORT, and assing to it the number of the port)**

Each article URL will be like this: "example.com/article/{article-index}". Article index will be the index of the article in the articles array. To add new articles, make a POST request at this URL: "example.com/post/article", with as body a JSON with the following structure:

```json
{
    "title": "Title of the article",
    "author": "Author of the article",
    "image": "Main image of the article, if it exists",
    "tags": "Tags of the article",
    "body": "Body of the article",
    "password": "Password to POST to the database"
}
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change. There is already a template for pull requests and issues.

## Support
For any problem regarding DEC, you can always open an issue! If you want to contact me, feel free to write me at gianlutara@gmail.com

# License

[MIT](https://github.com/GianlucaTarantino/DEC/blob/main/LICENSE)
