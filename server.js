// server.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import express from "express";
import { promises as fs } from "fs";
import path from "path";
import showdown from "showdown";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { blogPage } from "./src/pages/blog.page.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuración de Firebase para la aplicación web
const firebaseConfig = {
  apiKey: "AIzaSyBAnYB2vLKq5ZyUbPBaJHJ7VDTKMrjjElI",
  authDomain: "osvalois-website.firebaseapp.com",
  projectId: "osvalois-website",
  storageBucket: "osvalois-website.appspot.com",
  messagingSenderId: "1027737846330",
  appId: "1:1027737846330:web:8c1870209c965e30106b03",
  measurementId: "G-5V7DKVF6D4"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);

const app = express();
const converter = new showdown.Converter();

app.use("/public", express.static("public"));

const getHtmlByFilename = async (filename) => {
  try {
    const md = await fs.readFile(path.join(__dirname, "posts", filename), "utf-8");
    return converter.makeHtml(md);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error);
    throw error; // Puedes manejar este error según tu lógica de manejo de errores en Express
  }
};

const navbarOptions = [
  { href: "/", text: "Blog" },
  { href: "/about", text: "About" },
  { href: "/contact", text: "Contact" },
];

const footerOptions = [
  { text: 'github', href: 'https://github.com/osvalois' },
  { text: 'dockerhub', href: 'https://hub.docker.com/u/osvalois' },
  { text: 'dev.to', href: 'https://dev.to/osvalois' }

];

app.get("/", async (request, response) => {
  const posts = await fs.readdir(path.join(__dirname, "posts"));

  response.send(
    blogPage(`    
    <meta charset="utf-8">
    <title>Blog - Oscar Valois</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/4.0.0/github-markdown.min.css" integrity="sha512-Oy18vBnbSJkXTndr2n6lDMO5NN31UljR8e/ICzVPrGpSud4Gkckb8yUpqhKuUNoE+o9gAb4O/rAxxw1ojyUVzg==" crossorigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="public/styles/dart.theme.css"></link>`,
      `<h1>Blog</h1>
      <ul>${posts
        .map(p => `<li><a href="/posts/${p.split(".")[0]}">${p}</a></li>`)
        .join("\n")}
      </ul>`,
      null,
      navbarOptions,
      footerOptions
    )
  );
});

app.get("/posts/:filename", async (request, response) => {
  const html = await getHtmlByFilename(`${request.params.filename}.md`);

  response.send(
    htmlBoilerplate(
      null,
      html,
      null,
      navbarOptions,
      footerOptions
    )
  );
});

// Configuración del puerto para escuchar
const PORT = process.env.PORT || 8090;
const listener = app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});