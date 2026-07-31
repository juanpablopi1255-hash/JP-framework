#!/usr/bin/env node
import fs from "fs";
import path from "path";

const rutaFramework = path.join(import.meta.dirname, "index.js");
const rutaApp = path.join(process.cwd(), "app.jp");

const coreFramework = fs.readFileSync(rutaFramework, "utf8");
const codigoUsuario = fs.readFileSync(rutaApp, "utf8");

const htmlCompiladoFinal = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Aplicación .JP</title>
</head>
<body>
    <script>
        ${coreFramework}
        ${codigoUsuario}
    </script>
</body>
</html>`;

fs.writeFileSync(path.join(process.cwd(), "index.html"), htmlCompiladoFinal);




