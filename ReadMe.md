# JP Framework

> Un framework minimalista para crear interfaces web utilizando el DOM nativo con una sintaxis sencilla, legible y sin Virtual DOM.

---

# Filosofía

JP nace con una idea muy simple:

- Sin Virtual DOM.
- Sin JSX.
- Sin Hooks.
- Sin estado obligatorio.
- Sin componentes especiales.
- Solo JavaScript y el DOM.

Todo elemento creado por JP es un **HTMLElement** normal, por lo que puede utilizarse con cualquier API del navegador[cite: 3].

---

# Crear elementos

La función principal del framework es `put()`[cite: 3].

```js
const caja = put({
    tag: "div"
});
```

---

## Sintaxis

```js
put({
    tag,
    content,
    parent,
    attributes,
    functionality,
    developer,
    weight
});
```

---

# Parámetros de `put()`

## tag
Etiqueta HTML que se creará (ej. `"button"`, `"div"`, `"input"`)[cite: 3].

```js
put({
    tag: "button"
});
```

---

## content
Contenido del elemento[cite: 3]. Puede ser un string, un número, otro nodo HTML o un array de nodos[cite: 3].

```js
content: "Hola"
```

```js
content: 25
```

```js
content: otroElemento
```

```js
content: [hijo1, hijo2, hijo3]
```

---

## parent
Elemento contenedor donde será insertado automáticamente (por defecto es `document.body`)[cite: 3].

```js
put({
    parent: document.body
});
```

---

## attributes
Atributos HTML expresados en un objeto[cite: 3].

```js
put({
    tag: "input",
    attributes: {
        type: "text",
        placeholder: "Nombre"
    }
});
```

---

## functionality
Eventos del elemento (`addEventListener`)[cite: 3].

```js
put({
    tag: "button",
    functionality: {
        click() {
            console.log("Hola");
        }
    }
});
```

---

## developer
Booleano que determina si el texto se inserta mediante `innerHTML` (`true`) o de forma segura mediante `textContent` (`false`, por defecto)[cite: 3].

```js
put({
    tag: "p",
    content: "<span>Texto HTML</span>",
    developer: true
});
```

---

## weight
Asigna automáticamente la propiedad de proporción `flex` CSS al elemento (ej. `"1f"` aplica `flex: 1 1 0%`)[cite: 3].

```js
put({
    tag: "div",
    weight: "1f"
});
```

---

# Valor devuelto

Todas las funciones de creación devuelven un `HTMLElement` real[cite: 3].

```js
const boton = button();

console.log(boton instanceof HTMLElement);
```

Resultado:

```
true
```

---

# Helpers Básicos

Para evitar escribir siempre la propiedad `tag`, existen funciones *helper* para cada etiqueta HTML[cite: 3].

En lugar de:

```js
put({
    tag: "button",
    content: "Enviar"
});
```

se puede escribir:

```js
button({
    content: "Enviar"
});
```

Todos los helpers aceptan exactamente los mismos parámetros opcionales que `put()` (excepto `tag`)[cite: 3].

---

## Catálogo de Helpers e Interfaz

### Formularios y Control
- `button({ content, parent, attributes, functionality, developer, weight })`[cite: 3]
- `input({ content, parent, attributes, functionality, developer, weight })`[cite: 3]
- `textarea({ content, parent, attributes, functionality, developer, weight })`[cite: 3]
- `label({ text, forAttr, content, parent, attributes, functionality, developer, weight })`[cite: 3]
- `form({ content, parent, attributes, functionality, developer, weight })`[cite: 3]
- `select({ options, content, parent, attributes, functionality, developer, weight })` *(acepta un array `options` con objetos `{ value, text }` o strings)*[cite: 3]
- `option({ value, text, parent, attributes, functionality, developer, weight })`[cite: 3]
- `checkbox({ checked, parent, attributes, functionality, weight })`[cite: 3]
- `radio({ name, value, checked, parent, attributes, functionality, weight })`[cite: 3]

### Contenedores y Estructura Semántica
- `div()`, `span()`, `section()`, `article()`, `header()`, `footer()`, `main()`, `nav()`, `aside()`[cite: 3]
- `columnContainer({ parent })` *(Contenedor flex vertical a 100% de ancho/alto)*[cite: 3]
- `rowContainer({ parent })` *(Contenedor flex horizontal a 100% de ancho/alto)*[cite: 3]

### Tipografía
- `h1()`, `h2()`, `h3()`, `h4()`, `h5()`, `h6()` *(aceptan `text` o `content`)*[cite: 3]
- `p({ text, content, parent, ... })`[cite: 3]
- `a({ href, text, content, target, parent, ... })` *(alias: `link`)*[cite: 3]
- `strong({ text, content, ... })`[cite: 3]
- `em({ text, content, ... })`[cite: 3]
- `code({ codeText, content, ... })`[cite: 3]
- `blockquote({ text, cite, content, ... })`[cite: 3]

### Listas
- `li({ content, parent, ... })`[cite: 3]
- `ul({ items, content, parent, ... })` *(acepta un array `items` de strings o elementos `li`)*[cite: 3]
- `ol({ items, content, parent, ... })`[cite: 3]

### Tablas
- `table({ headers, rows, content, parent, ... })` *(genera automáticamente `thead` y `tbody` pasando arrays)*[cite: 3]
- `thead()`, `tbody()`, `tr()`, `th()`, `td()`[cite: 3]

### Multimedia
- `img({ src, alt, parent, attributes, ... })`[cite: 3]
- `svg({ pathData, viewBox, width, height, parent, ... })`[cite: 3]
- `icon({ name, svgData, parent, ... })`[cite: 3]
- `avatar({ src, name, size, parent, ... })` *(genera avatar circular con imagen o iniciales fallback)*[cite: 3]

---

# Operaciones del DOM (`mod`, `del`, `clear`, `style`, `createState`)

## Modificar elementos (`mod`)

Para modificar un elemento existente se utiliza `mod()`[cite: 3].

```js
mod({
    element: caja,
    content: "Nuevo texto"
});
```

Sintaxis:

```js
mod({
    element,
    content,
    parent,
    attributes,
    functionality,
    developer,
    weight
});
```

Solo es necesario indicar las propiedades que se quieren modificar[cite: 3].

---

## Eliminar elementos (`del`)

Permite eliminar un nodo del DOM[cite: 3].

```js
del({ element: caja });
```

---

## Limpiar contenido (`clear`)

Vacía el contenido interno de un elemento[cite: 3].

```js
clear({ element: caja });
```

---

## Aplicar estilos (`style`)

Aplica un objeto de estilos en línea mediante formato JS (*camelCase*)[cite: 3].

```js
style({
    element: caja,
    styles: {
        backgroundColor: "red",
        fontSize: "16px"
    }
});
```

---

## Gestión de Estado (`createState`)

Crea un objeto de estado reactivo mediante Proxies[cite: 3]. Al alterar `.value`, se ejecuta automáticamente `updateFunction`[cite: 3].

```js
const contador = createState({
    initialValue: 0,
    updateFunction: (nuevoValor) => {
        mod({ element: miTexto, content: `Valor: ${nuevoValor}` });
    }
});

contador.value++; // Ejecuta la función de actualización automáticamente
```

---

# Layouts y Estructura Espacial

- `flex({ direction, gap, align, justify, wrap, content, parent })`[cite: 3]
- `grid({ columns, gap, content, parent })`[cite: 3]
- `row({ gap, content, parent })`[cite: 3]
- `col({ span, content, parent })`[cite: 3]
- `stack({ gap, align, content, parent })`[cite: 3]
- `spacer({ size, parent })`[cite: 3]
- `container({ maxWidth, content, parent })`[cite: 3]
- `divider({ orientation, color, thickness, parent })`[cite: 3]

---

# Componentes de UI Avanzados

- `toast({ message, duration, type, position })` *(Notificaciones flotantes temporales)*[cite: 3]
- `badge({ text, variant, parent })`[cite: 3]
- `spinner({ size, color, parent })` *(alias: `loader`)*[cite: 3]
- `progress({ value, max, parent })`[cite: 3]
- `card({ header, body, footer, parent })`[cite: 3]
- `navbar({ brand, links, actions, parent })`[cite: 3]
- `sidebar({ items, parent })`[cite: 3]
- `tabs({ tabList, activeTab, parent })`[cite: 3]
- `accordion({ sections, parent })`[cite: 3]
- `dropdown({ trigger, items, parent })`[cite: 3]
- `pagination({ currentPage, totalPages, onChange, parent })`[cite: 3]
- `breadcrumb({ items, parent })`[cite: 3]

---

# Componentes

JP no tiene un sistema propio de componentes[cite: 3]. Los componentes son simplemente funciones de JavaScript[cite: 3].

## Ejemplo

```js
function Tarjeta() {
    const contenedor = div({
        parent: null,
        attributes: {
            style: "padding: 20px; border: 1px solid black;"
        }
    });

    h1({
        content: "Título",
        parent: contenedor
    });

    p({
        content: "Descripción",
        parent: contenedor
    });

    return contenedor;
}
```

Uso:

```js
const tarjeta = Tarjeta();

document.body.append(tarjeta);
```

---

# Componentes con parámetros

```js
function Tarjeta(nombre) {
    const contenedor = div({ parent: null });

    h2({
        content: nombre,
        parent: contenedor
    });

    return contenedor;
}
```

Uso:

```js
const usuario = Tarjeta("Juan");
```

---

# Componentes reutilizables

```js
function Boton(texto, accion) {
    return button({
        content: texto,
        functionality: {
            click: accion
        }
    });
}
```

Uso:

```js
const aceptar = Boton(
    "Aceptar",
    () => {
        console.log("Aceptar");
    }
);
```

---

# Componentes anidados

```js
function Header() {
    return div({
        content: [
            Logo(),
            Menu()
        ]
    });
}
```

---

# DOM nativo

Los componentes devuelven elementos HTML normales[cite: 3].

```js
const boton = Boton("Click", () => {});

boton.style.backgroundColor = "red";
boton.classList.add("activo");
boton.animate(/* ... */);
```

Todo sigue funcionando.

---

# Organización recomendada

```
src
│
├── App.jp
├── componentes
│     Boton.jp
│     Tarjeta.jp
│     Header.jp
│
├── paginas
│     Inicio.jp
│     Login.jp
│
└── estilos
```

---

# Filosofía de componentes

JP no añade ninguna sintaxis especial[cite: 3].

Esto:

```js
function Card() {
    // ...
    return contenedor;
}
```

es exactamente un componente[cite: 3].

No existen:
- Hooks
- JSX
- Templates
- Decoradores
- Clases especiales

Solo funciones normales de JavaScript[cite: 3].

---

# Ventajas

- Muy fácil de aprender[cite: 3].
- Todo es JavaScript[cite: 3].
- Todo es DOM real[cite: 3].
- Compatible con cualquier API del navegador[cite: 3].
- Sin Virtual DOM[cite: 3].
- Componentes extremadamente simples[cite: 3].
- Muy poco código interno.

---

# Ejemplo completo

```js
function Tarjeta(nombre, descripcion) {
    const tarjeta = div({
        parent: null,
        attributes: {
            style: "border: 1px solid gray; padding: 20px; border-radius: 10px; width: 300px;"
        }
    });

    h2({
        content: nombre,
        parent: tarjeta
    });

    p({
        content: descripcion,
        parent: tarjeta
    });

    button({
        content: "Aceptar",
        parent: tarjeta,
        functionality: {
            click() {
                console.log(nombre);
            }
        }
    });

    return tarjeta;
}

document.body.append(
    Tarjeta(
        "JP Framework",
        "Framework minimalista para JavaScript."
    )
);
```

---

# Resumen

JP no intenta reemplazar JavaScript. JP simplifica el acceso al DOM utilizando una API pequeña, consistente y fácil de leer, manteniendo siempre el uso de elementos HTML nativos y componentes basados únicamente en funciones de JavaScript.