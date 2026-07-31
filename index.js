// Base
export const body = document.querySelector('body');

export function put({
                        tag = "",
                        content = null,
                        parent = document.body,
                        attributes = {},
                        functionality = {},
                        developer = false,
                        weight = "",
                    } = {}) {
    const newElement = document.createElement(tag);
    return mod({
        element: newElement,
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight,
    });
}

export function mod({
                        element,
                        content = null,
                        parent = null,
                        attributes = {},
                        functionality = {},
                        developer = false,
                        weight = "",
                    } = {}) {
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    if (weight !== "") {
        const flexValue = typeof weight === 'string' ? weight.replace('f', '').trim() : weight;
        element.style.flex = `${flexValue} ${flexValue} 0%`;
    }

    if (content) {
        if (Array.isArray(content)) {
            content.forEach(child => {
                if (child) element.appendChild(child);
            });
        } else if (content instanceof HTMLElement) {
            element.appendChild(content);
        } else {
            if (developer === true) {
                element.innerHTML = content;
            } else {
                element.textContent = content;
            }
        }
    }

    for (const [key, value] of Object.entries(functionality)) {
        if (typeof value === 'function') {
            element.addEventListener(key, value);
        }
    }

    if (parent != null) {
        parent.appendChild(element);
    }

    return element;
}

export function del({ element } = {}) {
    element.remove();
}

export function clear({ element } = {}) {
    element.innerHTML = '';
    return element;
}

export function style({ element, styles = {} } = {}) {
    Object.assign(element.style, styles);
    return element;
}

export function createState({ initialValue, updateFunction } = {}) {
    const box = { value: initialValue };

    return new Proxy(box, {
        set(target, property, newValue) {
            if (property === 'value') {
                target[property] = newValue;
                if (typeof updateFunction === 'function') {
                    updateFunction(newValue);
                }
            }
            return true;
        }
    });
}

export function columnContainer({ parent = document.body } = {}) {
    const container = put({ tag: "div", parent });
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.width = '100%';
    container.style.height = '100%';
    return container;
}

export function rowContainer({ parent = document.body } = {}) {
    const container = put({ tag: "div", parent });
    container.style.display = 'flex';
    container.style.flexDirection = 'row';
    container.style.width = '100%';
    container.style.height = '100%';
    return container;
}

// Helpers
export function button({
                           content = "",
                           parent = document.body,
                           attributes = {},
                           functionality = {},
                           developer = false,
                           weight = "",
                       } = {}) {
    return put({
        tag: "button",
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function input({
                          content = "",
                          parent = document.body,
                          attributes = {},
                          functionality = {},
                          developer = false,
                          weight = "",
                      } = {}) {
    return put({
        tag: "input",
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function textarea({
                             content = "",
                             parent = document.body,
                             attributes = {},
                             functionality = {},
                             developer = false,
                             weight = ""
                         } = {}) {
    return put({
        tag: "textarea",
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function label({
                          text = "",
                          forAttr = "",
                          content = null,
                          parent = document.body,
                          attributes = {},
                          functionality = {},
                          developer = false,
                          weight = ""
                      } = {}) {
    const myAttributes = { ...attributes };
    if (forAttr) myAttributes.for = forAttr;

    return put({
        tag: "label",
        content: content || text,
        parent,
        attributes: myAttributes,
        functionality,
        developer,
        weight
    });
}

export function form({
                         content = [],
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         developer = false,
                         weight = ""
                     } = {}) {
    return put({
        tag: "form",
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function option({
                           value = "",
                           text = "",
                           parent = null,
                           attributes = {},
                           functionality = {},
                           developer = false,
                           weight = ""
                       } = {}) {
    const myAttributes = { value, ...attributes };

    return put({
        tag: "option",
        content: text || value,
        parent,
        attributes: myAttributes,
        functionality,
        developer,
        weight
    });
}

export function select({
                           options = [],
                           content = null,
                           parent = document.body,
                           attributes = {},
                           functionality = {},
                           developer = false,
                           weight = ""
                       } = {}) {
    const sel = put({
        tag: "select",
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });

    if (Array.isArray(options) && options.length > 0) {
        options.forEach(opt => {
            if (typeof opt === 'object' && opt !== null) {
                option({
                    value: opt.value ?? opt.val ?? "",
                    text: opt.text ?? opt.label ?? opt.value ?? "",
                    parent: sel,
                    attributes: opt.attributes || {}
                });
            } else {
                option({
                    value: String(opt),
                    text: String(opt),
                    parent: sel
                });
            }
        });
    }

    return sel;
}

export function checkbox({
                             checked = false,
                             parent = document.body,
                             attributes = {},
                             functionality = {},
                             weight = ""
                         } = {}) {
    const myAttributes = { type: "checkbox", ...attributes };
    if (checked) myAttributes.checked = "true";

    return put({
        tag: "input",
        parent,
        attributes: myAttributes,
        functionality,
        weight
    });
}

export function radio({
                          name = "",
                          value = "",
                          checked = false,
                          parent = document.body,
                          attributes = {},
                          functionality = {},
                          weight = ""
                      } = {}) {
    const myAttributes = { type: "radio", ...attributes };
    if (name) myAttributes.name = name;
    if (value) myAttributes.value = value;
    if (checked) myAttributes.checked = "true";

    return put({
        tag: "input",
        parent,
        attributes: myAttributes,
        functionality,
        weight
    });
}

// ==========================================
// 1. STRUCTURE AND CONTAINERS
// ==========================================

export function div({
                        content = "",
                        parent = document.body,
                        attributes = {},
                        functionality = {},
                        developer = false,
                        weight = ""
                    } = {}) {
    return put({ tag: "div", content, parent, attributes, functionality, developer, weight });
}

export function span({
                         content = "",
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         developer = false,
                         weight = ""
                     } = {}) {
    return put({ tag: "span", content, parent, attributes, functionality, developer, weight });
}

export function section({
                            content = "",
                            parent = document.body,
                            attributes = {},
                            functionality = {},
                            developer = false,
                            weight = ""
                        } = {}) {
    return put({ tag: "section", content, parent, attributes, functionality, developer, weight });
}

export function article({
                            content = "",
                            parent = document.body,
                            attributes = {},
                            functionality = {},
                            developer = false,
                            weight = ""
                        } = {}) {
    return put({ tag: "article", content, parent, attributes, functionality, developer, weight });
}

export function header({
                           content = "",
                           parent = document.body,
                           attributes = {},
                           functionality = {},
                           developer = false,
                           weight = ""
                       } = {}) {
    return put({ tag: "header", content, parent, attributes, functionality, developer, weight });
}

export function footer({
                           content = "",
                           parent = document.body,
                           attributes = {},
                           functionality = {},
                           developer = false,
                           weight = ""
                       } = {}) {
    return put({ tag: "footer", content, parent, attributes, functionality, developer, weight });
}

export function main({
                         content = "",
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         developer = false,
                         weight = ""
                     } = {}) {
    return put({ tag: "main", content, parent, attributes, functionality, developer, weight });
}

export function nav({
                        content = "",
                        parent = document.body,
                        attributes = {},
                        functionality = {},
                        developer = false,
                        weight = ""
                    } = {}) {
    return put({ tag: "nav", content, parent, attributes, functionality, developer, weight });
}

export function aside({
                          content = "",
                          parent = document.body,
                          attributes = {},
                          functionality = {},
                          developer = false,
                          weight = ""
                      } = {}) {
    return put({ tag: "aside", content, parent, attributes, functionality, developer, weight });
}

// ==========================================
// 2. TYPOGRAPHY AND TEXT
// ==========================================

function createHeading(level) {
    return function ({
                         text = "",
                         content = null,
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         developer = false,
                         weight = ""
                     } = {}) {
        return put({
            tag: `h${level}`,
            content: content || text,
            parent,
            attributes,
            functionality,
            developer,
            weight
        });
    };
}

export const h1 = createHeading(1);
export const h2 = createHeading(2);
export const h3 = createHeading(3);
export const h4 = createHeading(4);
export const h5 = createHeading(5);
export const h6 = createHeading(6);

export function p({
                      text = "",
                      content = null,
                      parent = document.body,
                      attributes = {},
                      functionality = {},
                      developer = false,
                      weight = ""
                  } = {}) {
    return put({
        tag: "p",
        content: content || text,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function a({
                      href = "#",
                      text = "",
                      content = null,
                      target = "_self",
                      parent = document.body,
                      attributes = {},
                      functionality = {},
                      developer = false,
                      weight = ""
                  } = {}) {
    const myAttributes = { href, target, ...attributes };

    return put({
        tag: "a",
        content: content || text || href,
        parent,
        attributes: myAttributes,
        functionality,
        developer,
        weight
    });
}

export const link = a;

export function strong({
                           text = "",
                           content = null,
                           parent = document.body,
                           attributes = {},
                           functionality = {},
                           developer = false,
                           weight = ""
                       } = {}) {
    return put({
        tag: "strong",
        content: content || text,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function em({
                       text = "",
                       content = null,
                       parent = document.body,
                       attributes = {},
                       functionality = {},
                       developer = false,
                       weight = ""
                   } = {}) {
    return put({
        tag: "em",
        content: content || text,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function code({
                         codeText = "",
                         content = null,
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         developer = false,
                         weight = ""
                     } = {}) {
    return put({
        tag: "code",
        content: content || codeText,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

export function blockquote({
                               text = "",
                               cite = "",
                               content = null,
                               parent = document.body,
                               attributes = {},
                               functionality = {},
                               developer = false,
                               weight = ""
                           } = {}) {
    const myAttributes = { ...attributes };
    if (cite) myAttributes.cite = cite;

    return put({
        tag: "blockquote",
        content: content || text,
        parent,
        attributes: myAttributes,
        functionality,
        developer,
        weight
    });
}

// ==========================================
// 1. LISTS AND ITEMS
// ==========================================

export function li({
                       content = "",
                       parent = null,
                       attributes = {},
                       functionality = {},
                       developer = false,
                       weight = ""
                   } = {}) {
    return put({
        tag: "li",
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight
    });
}

function createList(tag) {
    return function ({
                         items = [],
                         content = null,
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         developer = false,
                         weight = ""
                     } = {}) {
        const list = put({
            tag,
            content,
            parent,
            attributes,
            functionality,
            developer,
            weight
        });

        if (Array.isArray(items) && items.length > 0) {
            items.forEach(item => {
                if (item instanceof HTMLElement && item.tagName === 'LI') {
                    list.appendChild(item);
                } else if (typeof item === 'object' && item !== null && !(item instanceof HTMLElement)) {
                    li({ ...item, parent: list });
                } else {
                    li({ content: item, parent: list });
                }
            });
        }

        return list;
    };
}

export const ul = createList("ul");
export const ol = createList("ol");

// ==========================================
// 2. TABLES AND COMPONENTS
// ==========================================

export function th({ content = "", parent = null, attributes = {}, functionality = {}, developer = false, weight = "" } = {}) {
    return put({ tag: "th", content, parent, attributes, functionality, developer, weight });
}

export function td({ content = "", parent = null, attributes = {}, functionality = {}, developer = false, weight = "" } = {}) {
    return put({ tag: "td", content, parent, attributes, functionality, developer, weight });
}

export function tr({ content = [], parent = null, attributes = {}, functionality = {}, developer = false, weight = "" } = {}) {
    return put({ tag: "tr", content, parent, attributes, functionality, developer, weight });
}

export function thead({ content = null, parent = null, attributes = {}, functionality = {}, developer = false, weight = "" } = {}) {
    return put({ tag: "thead", content, parent, attributes, functionality, developer, weight });
}

export function tbody({ content = null, parent = null, attributes = {}, functionality = {}, developer = false, weight = "" } = {}) {
    return put({ tag: "tbody", content, parent, attributes, functionality, developer, weight });
}

export function table({
                          headers = [],
                          rows = [],
                          content = null,
                          parent = document.body,
                          attributes = {},
                          functionality = {},
                          developer = false,
                          weight = ""
                      } = {}) {
    const tableElement = put({ tag: "table", content, parent, attributes, functionality, developer, weight });

    if (Array.isArray(headers) && headers.length > 0) {
        const tHead = thead({ parent: tableElement });
        const headRow = tr({ parent: tHead });
        headers.forEach(headText => {
            th({ content: headText, parent: headRow });
        });
    }

    if (Array.isArray(rows) && rows.length > 0) {
        const tBody = tbody({ parent: tableElement });
        rows.forEach(rowData => {
            const bodyRow = tr({ parent: tBody });
            if (Array.isArray(rowData)) {
                rowData.forEach(cellData => {
                    td({ content: cellData, parent: bodyRow });
                });
            }
        });
    }

    return tableElement;
}

// ==========================================
// 3. MULTIMEDIA
// ==========================================

export function img({
                        src = "",
                        alt = "",
                        parent = document.body,
                        attributes = {},
                        functionality = {},
                        weight = ""
                    } = {}) {
    const myAttributes = { src, alt, ...attributes };
    return put({ tag: "img", parent, attributes: myAttributes, functionality, weight });
}

export function svg({
                        pathData = "",
                        viewBox = "0 0 24 24",
                        width = "24",
                        height = "24",
                        parent = document.body,
                        attributes = {},
                        functionality = {},
                        weight = ""
                    } = {}) {
    const svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElem.setAttribute("viewBox", viewBox);
    svgElem.setAttribute("width", width);
    svgElem.setAttribute("height", height);
    svgElem.setAttribute("fill", "currentColor");

    const paths = Array.isArray(pathData) ? pathData : [pathData];
    paths.forEach(d => {
        if (d) {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            svgElem.appendChild(path);
        }
    });

    return mod({
        element: svgElem,
        parent,
        attributes,
        functionality,
        weight
    });
}

export function icon({
                         name = "",
                         svgData = "",
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         weight = ""
                     } = {}) {
    if (svgData) {
        return svg({ pathData: svgData, parent, attributes, functionality, weight });
    }

    const existingClass = attributes.class ? `${attributes.class} ${name}` : name;
    return put({
        tag: "i",
        parent,
        attributes: { ...attributes, class: existingClass.trim() },
        functionality,
        weight
    });
}

export function avatar({
                           src = "",
                           name = "",
                           size = "40px",
                           parent = document.body,
                           attributes = {},
                           functionality = {},
                           weight = ""
                       } = {}) {
    const container = put({
        tag: "div",
        parent,
        weight,
        attributes: {
            ...attributes,
            style: `width: ${size}; height: ${size}; border-radius: 50%; overflow: hidden;
                    display: inline-flex; align-items: center; justify-content: center;
                    background-color: #6c757d; color: white; font-weight: bold;
                    font-size: calc(${size} / 2.2); user-select: none; ${attributes.style || ''}`
        },
        functionality
    });

    if (src) {
        const image = img({
            src,
            alt: name,
            parent: container,
            attributes: { style: "width: 100%; height: 100%; object-fit: cover;" }
        });

        image.addEventListener("error", () => {
            image.remove();
            renderInitials();
        });
    } else {
        renderInitials();
    }

    function renderInitials() {
        container.textContent = name
            ? name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
            : "?";
    }

    return container;
}

// ==========================================
// LAYOUTS AND SPATIAL STRUCTURE
// ==========================================

export function flex({
                         direction = "row",
                         gap = "10px",
                         align = "stretch",
                         justify = "flex-start",
                         wrap = "nowrap",
                         content = [],
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         weight = ""
                     } = {}) {
    const container = put({
        tag: "div",
        content,
        parent,
        attributes,
        functionality,
        weight
    });

    style({
        element: container,
        styles: {
            display: "flex",
            flexDirection: direction,
            gap,
            alignItems: align,
            justifyContent: justify,
            flexWrap: wrap
        }
    });

    return container;
}

export function grid({
                         columns = "repeat(auto-fit, minmax(250px, 1fr))",
                         gap = "15px",
                         content = [],
                         parent = document.body,
                         attributes = {},
                         functionality = {},
                         weight = ""
                     } = {}) {
    const templateCols = typeof columns === "number" ? `repeat(${columns}, 1fr)` : columns;

    const container = put({
        tag: "div",
        content,
        parent,
        attributes,
        functionality,
        weight
    });

    style({
        element: container,
        styles: {
            display: "grid",
            gridTemplateColumns: templateCols,
            gap
        }
    });

    return container;
}

export function row({
                        gap = "15px",
                        content = [],
                        parent = document.body,
                        attributes = {},
                        functionality = {},
                        weight = ""
                    } = {}) {
    return flex({
        direction: "row",
        gap,
        wrap: "wrap",
        content,
        parent,
        attributes,
        functionality,
        weight
    });
}

export function col({
                        span = "1f",
                        content = [],
                        parent = document.body,
                        attributes = {},
                        functionality = {},
                        developer = false
                    } = {}) {
    const colEl = put({
        tag: "div",
        content,
        parent,
        attributes,
        functionality,
        developer,
        weight: typeof span === "number" ? `${span}f` : span
    });

    style({
        element: colEl,
        styles: {
            boxSizing: "border-box"
        }
    });

    return colEl;
}

export function stack({
                          gap = "10px",
                          align = "stretch",
                          content = [],
                          parent = document.body,
                          attributes = {},
                          functionality = {},
                          weight = ""
                      } = {}) {
    return flex({
        direction: "column",
        gap,
        align,
        content,
        parent,
        attributes,
        functionality,
        weight
    });
}

export function spacer({
                           size = "15px",
                           parent = document.body,
                           attributes = {}
                       } = {}) {
    const el = put({
        tag: "div",
        parent,
        attributes
    });

    style({
        element: el,
        styles: {
            width: size,
            height: size,
            flexShrink: "0"
        }
    });

    return el;
}

export function container({
                              maxWidth = "1200px",
                              content = [],
                              parent = document.body,
                              attributes = {},
                              functionality = {},
                              weight = ""
                          } = {}) {
    const container = put({
        tag: "div",
        content,
        parent,
        attributes,
        functionality,
        weight
    });

    style({
        element: container,
        styles: {
            width: "100%",
            maxWidth,
            marginLeft: "auto",
            marginRight: "auto",
            paddingLeft: "15px",
            paddingRight: "15px",
            boxSizing: "border-box"
        }
    });

    return container;
}

export function divider({
                            orientation = "horizontal",
                            color = "#e0e0e0",
                            thickness = "1px",
                            parent = document.body,
                            attributes = {}
                        } = {}) {
    const isHoriz = orientation === "horizontal";
    const el = put({
        tag: "hr",
        parent,
        attributes
    });

    style({
        element: el,
        styles: {
            border: "none",
            backgroundColor: color,
            margin: "10px 0",
            width: isHoriz ? "100%" : thickness,
            height: isHoriz ? thickness : "100%",
            alignSelf: "stretch"
        }
    });

    return el;
}

// ==========================================
// NOTIFICATIONS AND FEEDBACK
// ==========================================

let toastContainer = null;

export function toast({
                          message = "",
                          duration = 3000,
                          type = "info",
                          position = "top-right"
                      } = {}) {
    if (!toastContainer) {
        toastContainer = put({
            tag: "div",
            parent: document.body
        });

        const isTop = position.includes("top");
        const isLeft = position.includes("left");

        style({
            element: toastContainer,
            styles: {
                position: "fixed",
                top: isTop ? "20px" : "auto",
                bottom: isTop ? "auto" : "20px",
                left: isLeft ? "20px" : "auto",
                right: isLeft ? "auto" : "20px",
                zIndex: "9999",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                pointerEvents: "none"
            }
        });
    }

    const colors = {
        info: { bg: "#2196F3", text: "#FFF" },
        success: { bg: "#4CAF50", text: "#FFF" },
        error: { bg: "#F44336", text: "#FFF" },
        warning: { bg: "#FF9800", text: "#FFF" }
    };

    const config = colors[type] || colors.info;

    const notification = put({
        tag: "div",
        content: message,
        parent: toastContainer
    });

    style({
        element: notification,
        styles: {
            backgroundColor: config.bg,
            color: config.text,
            padding: "12px 20px",
            borderRadius: "6px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            fontSize: "14px",
            fontFamily: "sans-serif",
            opacity: "0",
            transform: "translateY(-10px)",
            transition: "all 0.3s ease",
            pointerEvents: "auto"
        }
    });

    requestAnimationFrame(() => {
        style({
            element: notification,
            styles: {
                opacity: "1",
                transform: "translateY(0)"
            }
        });
    });

    setTimeout(() => {
        style({
            element: notification,
            styles: {
                opacity: "0",
                transform: "translateY(-10px)"
            }
        });
        setTimeout(() => del({ element: notification }), 300);
    }, duration);

    return notification;
}

export function badge({
                          text = "",
                          variant = "primary",
                          parent = document.body,
                          attributes = {},
                          functionality = {},
                          weight = ""
                      } = {}) {
    const colors = {
        primary: { bg: "#007bff", color: "#fff" },
        secondary: { bg: "#6c757d", color: "#fff" },
        success: { bg: "#28a745", color: "#fff" },
        danger: { bg: "#dc3545", color: "#fff" }
    };

    const styleToApply = colors[variant] || colors.primary;

    const el = put({
        tag: "span",
        content: text,
        parent,
        attributes,
        functionality,
        weight
    });

    style({
        element: el,
        styles: {
            display: "inline-block",
            padding: "0.25em 0.6em",
            fontSize: "75%",
            fontWeight: "700",
            lineHeight: "1",
            textAlign: "center",
            whiteSpace: "nowrap",
            verticalAlign: "baseline",
            borderRadius: "10px",
            backgroundColor: styleToApply.bg,
            color: styleToApply.color
        }
    });

    return el;
}

export function spinner({
                            size = "24px",
                            color = "#007bff",
                            parent = document.body,
                            attributes = {},
                            weight = ""
                        } = {}) {
    const el = put({
        tag: "div",
        parent,
        attributes,
        weight
    });

    style({
        element: el,
        styles: {
            width: size,
            height: size,
            border: `3px solid rgba(0,0,0,0.1)`,
            borderTopColor: color,
            borderRadius: "50%",
            animation: "library-spin 0.8s linear infinite",
            display: "inline-block"
        }
    });

    if (!document.getElementById("library-spin-style")) {
        const styleSheet = put({
            tag: "style",
            parent: document.head,
            attributes: { id: "library-spin-style" }
        });
        styleSheet.textContent = `@keyframes library-spin { to { transform: rotate(360deg); } }`;
    }

    return el;
}

export const loader = spinner;

export function progress({
                             value = 0,
                             max = 100,
                             parent = document.body,
                             attributes = {},
                             functionality = {},
                             weight = ""
                         } = {}) {
    const myAttributes = { value, max, ...attributes };

    const el = put({
        tag: "progress",
        parent,
        attributes: myAttributes,
        functionality,
        weight
    });

    style({
        element: el,
        styles: {
            width: "100%",
            height: "12px"
        }
    });

    return el;
}

// ==========================================
// NAVIGATION AND COMPLEX COMPONENTS
// ==========================================

export function card({
                         header = null,
                         body = null,
                         footer = null,
                         parent = document.body,
                         attributes = {},
                         weight = ""
                     } = {}) {
    const cardContainer = put({ tag: "div", parent, attributes, weight });

    style({
        element: cardContainer,
        styles: {
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            backgroundColor: "#fff",
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
        }
    });

    if (header) {
        const h = put({ tag: "div", content: header, parent: cardContainer });
        style({ element: h, styles: { padding: "15px", borderBottom: "1px solid #f0f0f0", fontWeight: "bold" } });
    }
    if (body) {
        const b = put({ tag: "div", content: body, parent: cardContainer });
        style({ element: b, styles: { padding: "15px" } });
    }
    if (footer) {
        const f = put({ tag: "div", content: footer, parent: cardContainer });
        style({ element: f, styles: { padding: "10px 15px", borderTop: "1px solid #f0f0f0", backgroundColor: "#fafafa" } });
    }

    return cardContainer;
}

export function navbar({
                           brand = "",
                           links = [],
                           actions = [],
                           parent = document.body
                       } = {}) {
    const navElem = put({ tag: "nav", parent });

    style({
        element: navElem,
        styles: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "#ffffff",
            borderBottom: "1px solid #eaeaea"
        }
    });

    put({ tag: "div", content: brand, parent: navElem });

    const linksContainer = put({ tag: "div", parent: navElem });
    style({ element: linksContainer, styles: { display: "flex", gap: "15px" } });

    links.forEach(l => {
        put({
            tag: "a",
            content: l.text,
            parent: linksContainer,
            attributes: { href: l.href || "#" },
            functionality: l.onClick ? { click: l.onClick } : {}
        });
    });

    if (actions.length > 0) {
        const actionsContainer = put({ tag: "div", content: actions, parent: navElem });
        style({ element: actionsContainer, styles: { display: "flex", gap: "10px" } });
    }

    return navElem;
}

export function sidebar({
                            items = [],
                            parent = document.body
                        } = {}) {
    const asideElem = put({ tag: "aside", parent });

    style({
        element: asideElem,
        styles: {
            width: "240px",
            height: "100vh",
            backgroundColor: "#1e293b",
            color: "#fff",
            padding: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "5px"
        }
    });

    items.forEach(item => {
        const btn = put({
            tag: "div",
            content: item.text,
            parent: asideElem,
            functionality: item.onClick ? { click: item.onClick } : {}
        });

        style({
            element: btn,
            styles: {
                padding: "10px",
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.2s"
            }
        });

        btn.addEventListener("mouseenter", () => style({ element: btn, styles: { backgroundColor: "#334155" } }));
        btn.addEventListener("mouseleave", () => style({ element: btn, styles: { backgroundColor: "transparent" } }));
    });

    return asideElem;
}

export function tabs({
                         tabList = [],
                         activeTab = 0,
                         parent = document.body
                     } = {}) {
    const container = put({ tag: "div", parent });
    const header = put({ tag: "div", parent: container });
    const body = put({ tag: "div", parent: container });

    style({ element: header, styles: { display: "flex", borderBottom: "2px solid #e2e8f0" } });
    style({ element: body, styles: { padding: "15px" } });

    let activeIndex = activeTab;

    const render = () => {
        clear({ element: header });
        clear({ element: body });

        tabList.forEach((tab, index) => {
            const isActive = index === activeIndex;
            const btn = put({
                tag: "button",
                content: tab.title,
                parent: header,
                functionality: {
                    click: () => {
                        activeIndex = index;
                        render();
                    }
                }
            });

            style({
                element: btn,
                styles: {
                    padding: "10px 20px",
                    border: "none",
                    background: "none",
                    borderBottom: isActive ? "2px solid #007bff" : "none",
                    fontWeight: isActive ? "bold" : "normal",
                    cursor: "pointer"
                }
            });

            if (isActive) {
                mod({ element: body, content: tab.content });
            }
        });
    };

    render();
    return container;
}

export function accordion({
                              sections = [],
                              parent = document.body
                          } = {}) {
    const container = put({ tag: "div", parent });

    sections.forEach(sec => {
        const item = put({ tag: "div", parent: container });
        style({ element: item, styles: { borderBottom: "1px solid #ccc" } });

        const header = put({
            tag: "div",
            content: sec.title,
            parent: item
        });
        style({ element: header, styles: { padding: "12px", cursor: "pointer", fontWeight: "bold", backgroundColor: "#f8f9fa" } });

        const body = put({
            tag: "div",
            content: sec.content,
            parent: item
        });
        style({ element: body, styles: { padding: "12px", display: "none" } });

        header.addEventListener("click", () => {
            const isVisible = body.style.display === "block";
            body.style.display = isVisible ? "none" : "block";
        });
    });

    return container;
}

export function dropdown({
                             trigger,
                             items = [],
                             parent = document.body
                         } = {}) {
    const container = put({ tag: "div", parent });
    style({ element: container, styles: { position: "relative", display: "inline-block" } });

    if (trigger instanceof HTMLElement) container.appendChild(trigger);

    const menu = put({ tag: "div", parent: container });
    style({
        element: menu,
        styles: {
            display: "none",
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            minWidth: "150px",
            zIndex: "100"
        }
    });

    items.forEach(it => {
        const option = put({
            tag: "div",
            content: it.text,
            parent: menu,
            functionality: {
                click: () => {
                    if (it.onClick) it.onClick();
                    menu.style.display = "none";
                }
            }
        });
        style({ element: option, styles: { padding: "8px 12px", cursor: "pointer" } });
    });

    if (trigger instanceof HTMLElement) {
        trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        });
    }

    document.addEventListener("click", () => {
        menu.style.display = "none";
    });

    return container;
}

export function pagination({
                               currentPage = 1,
                               totalPages = 1,
                               onChange,
                               parent = document.body
                           } = {}) {
    const container = put({ tag: "div", parent });
    style({ element: container, styles: { display: "flex", gap: "5px", alignItems: "center" } });

    for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage;
        put({
            tag: "button",
            content: String(i),
            parent: container,
            functionality: {
                click: () => {
                    if (typeof onChange === "function") onChange(i);
                }
            },
            attributes: {
                style: `padding: 5px 10px; cursor: pointer; border: 1px solid #ccc; background: ${isActive ? '#007bff' : '#fff'}; color: ${isActive ? '#fff' : '#000'}`
            }
        });
    }

    return container;
}

export function breadcrumb({
                               items = [],
                               parent = document.body
                           } = {}) {
    const navElem = put({ tag: "nav", parent });
    style({ element: navElem, styles: { display: "flex", gap: "8px", fontSize: "14px", color: "#666" } });

    items.forEach((item, index) => {
        if (index > 0) {
            put({ tag: "span", content: "/", parent: navElem });
        }

        if (item.href) {
            put({ tag: "a", content: item.text, parent: navElem, attributes: { href: item.href } });
        } else {
            put({ tag: "span", content: item.text, parent: navElem });
        }
    });

    return navElem;
}