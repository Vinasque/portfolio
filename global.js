/* console.log("IT'S ALIVE")

var x = 0;

x = x + 3;


function $$ (selector, context = document) {
    return Array.from(context.querySelectorAll(selector));
}

let navLinks = $$("nav a");

let currentLink = navLinks.find(
    a => a.host === location.host && a.pathname === location.pathname
);

currentLink.classList.add("current"); */

const ARE_WE_HOME = document.documentElement.classList.contains("home");

let pages = [
    {url: "", title: "Home"},
    {url: "projects/", title: "Projects"},
    {url: "contact/", title: "Contact"},
    {url: "cv/", title: "CV"},
    {url: "https://github.com/Vinasque", title: "Github"},
];

let nav = document.createElement("nav");
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;

    if (!ARE_WE_HOME && !url.startsWith("http")) {
        url = "../" + url;
    }

    let a = document.createElement("a");
    a.href = url;
    a.textContent = title;

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add("current");
    }

    if (a.host != location.host) {
        console.log(a.host, location.host);
        a.setAttribute("target", "_blank");
    }

    nav.append(a);
}

document.body.insertAdjacentHTML("afterbegin", `
    <label class="color-scheme">
        Theme:
        <select id="theme-selector">
            <option value="light">Light</option>
            <option value="dark">Dark</option>
        </select>
    </label>
`);

let select = document.querySelector("select");
let container = document.querySelector(".container");

function applyTheme(theme) {
    document.documentElement.style.setProperty("color-scheme", theme);
    localStorage.colorScheme = theme;

    if (theme === "dark") {
        container.style.background = "black";
    } else {
        container.style.background = "white";
    }
}

if (localStorage.colorScheme) {
    applyTheme(localStorage.colorScheme);
    select.value = localStorage.colorScheme;
}

select.addEventListener("input", function (event) {
    applyTheme(event.target.value);
});