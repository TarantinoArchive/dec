#!/usr/bin/env node

const fs = require('fs');
const ejs = require('ejs');
const express = require('express');
const crypto = require('crypto');
require('dotenv').config();
const bodyParser = require('body-parser');

const args = process.argv.slice(2);

if (args[0] === 'serve') {
  const port = process.env.PORT | 8090;
  if (!fs.existsSync('index.ejs')) {
    throw Error('File index.ejs does not exist in main directory');
  } else if (!fs.existsSync('articles.json')) {
    throw Error('File articles.json does not exist in main directory');
  }
  const app = express();
  app.use(express.static('files'));
  app.use(bodyParser.urlencoded({
    extended: true,
  }));
  app.use(bodyParser.json());
  const articles = JSON.parse(fs.readFileSync('articles.json', 'utf-8'));
  let customData = {};
  if (fs.existsSync('customData.json')) {
    customData = JSON.parse(fs.readFileSync('customData.json', 'utf-8'));
  }
  app.get('/', (req, res) => {
    res.send(ejs.render(fs.readFileSync('index.ejs', 'utf-8'), {articles: articles, data: {request: req, response: res}, customData: customData}));
  });
  app.get(`/article/:index`, (req, res) => {
    if (!(index in articles)) {
      if (fs.existsSync('404.ejs')) {
        res.send(ejs.render(fs.readFileSync('404.ejs', 'utf-8'), {data: {request: req, response: res}, customData: customData}));
      } else {
        res.send('404');
      }
      return;
    }
    res.send(ejs.renderFile(fs.readFileSync('article.ejs', 'utf-8'), {articles: articles, article: articles[index], data: {request: req, response: res}, customData: customData}));
  });
  app.post('/post/article', (req, res) => {
    if (crypto.createHash('sha256').update(req.body.password).digest('hex') === process.env.PASSWORDCMS) {
      const necessaryKeys = ['title', 'author', 'image', 'tags', 'body'];
      const bodyKeys = Object.keys(req.body);
      for (const key of necessaryKeys) {
        if (!bodyKeys.includes(key)) {
          res.status(500);
          res.send(`Key ${key} is missing in request`);
          return;
        }
      }
      articles.push({
        title: req.body.title,
        author: req.body.author,
        image: req.body.image,
        tags: req.body.tags,
        body: req.body.body,
      });
      fs.writeFileSync('articles.json', JSON.stringify(articles));
      res.status(200);
      res.send('Succesfully added article');
    } else {
      res.status(500);
      res.send(`Wrong password`);
    }
  });
  app.get('*', (req, res) => {
    res.status(404);
    if (fs.existsSync('404.ejs')) {
      res.send(ejs.render(fs.readFileSync('404.ejs', 'utf-8'), {data: {request: req, response: res}, customData: customData}));
    } else {
      res.send('404');
    }
  });
  app.listen(port, () => {
    console.log(`DEC is listening on port ${port}`);
  });
} else if (args[0] == 'new') {
  if (!args[1]) {
    throw Error('Password missing. Second argument should be password.');
  }
  fs.writeFile('./index.ejs', 'Hi! Modify index.ejs with the layout of your page', (err) => {
    if (err) throw err;
  });
  fs.writeFile('./article.ejs', 'Hi! Modify index.ejs with the layout of your articles', (err) => {
    if (err) throw err;
  });
  fs.writeFile('./articles.json', '[]', (err) => {
    if (err) throw err;
  });
  fs.writeFile('./.env', `PASSWORDCMS=${crypto.createHash('sha256').update(args[1]).digest('hex')}`, (err) => {
    if (err) throw err;
  });
  fs.mkdir('./files', () => {});
}
