"use strict";

const allergens = {
  lacteo: { label: "Lácteos", icon: "assets/allergens/lacteo.svg" },
  huevos: { label: "Huevos", icon: "assets/allergens/huevos.svg" },
  gluten: { label: "Gluten", icon: "assets/allergens/gluten.svg" },
  cacahuetes: { label: "Cacahuetes", icon: "assets/allergens/cacahuetes.svg" },
  sesamo: { label: "Sésamo", icon: "assets/allergens/sesamo.svg" },
  altramuces: { label: "Altramuces", icon: "assets/allergens/altramuces.svg" },
  frutosConCascara: { label: "Frutos con cáscara", icon: "assets/allergens/frutos-con-cascara.svg" }
};

const menuSections = [
  {
    id: "bebidas",
    name: "Bebidas",
    items: [
      { name: "Jarritos", price: "3.20€" },
      { name: "Modelo rubia", price: "3.20€" },
      { name: "Agua pequeña", price: "1.80€" },
      { name: "Agua grande", price: "2.80€" },
      { name: "Agua con gas", price: "2.40€" },
      { name: "Coca cola/Coca cola zero", price: "2.20€" },
      { name: "Fanta naranja/limón", price: "2.20€" },
      { name: "Mahou", price: "2.50€" },
      { name: "Mahou 0'0", price: "2.60€" },
      { name: "Radler", price: "2.60€" },
      { name: "Alhambra", price: "3.20€" },
      { name: "Salitos", price: "3.00€" },
      { name: "Copa de vino", description: "Consultar vinos", price: "2.80€" },
      { name: "Botella de vino", description: "Consultar vinos/precios" },
      { name: "Aquarius", price: "2.20€" },
      { name: "Modelo negra", price: "3.60€" },
      { name: "Pacífico", price: "3.20€" },
      { name: "Corona", price: "3.20€" },
      { name: "Agua de tamarindo", price: "3.20€" },
      { name: "Agua de jamaica", price: "3.20€" },
      { name: "Horchata mexicana", description: "Bebida a base de arroz", price: "3.20€" }
    ]
  },
  {
    id: "entrantes",
    name: "Entrantes",
    items: [
      { name: "Guacamole", description: "Guacamole casero, acompañado de pico de gallo y totopos", price: "9.50€", allergens: ["lacteo"] },
      { name: "Frijoles charros", description: "Frijoles con chorizo, panceta, cebolla y cilantro.", price: "6.50€" },
      { name: "Nachos grandes", description: "Totopos con queso gratinado, frijoles, nata, pico de gallo, guacamole y jalapeños.(Suplemento salsas +1€)", price: "12.00€", allergens: ["lacteo"] },
      { name: "Nachos pequeños", description: "Totopos con queso gratinado, frijoles, nata, pico de gallo, guacamole y jalapeños. (Suplemento de salsas +1€)", price: "10.00€", allergens: ["lacteo"] },
      { name: "Papas \"La Mexicana\"", description: "Patatas fritas aderezadas con salsa casera de mayonesa y chipotle.", price: "6.50€", allergens: ["huevos", "gluten"] },
      { name: "Chilaquiles", description: "Totopos bañados en salsa verde (picante), con pollo, queso gratinado, nata, cebolla y cilantro.", price: "12.50€", allergens: ["lacteo"] },
      { name: "Arrachera", description: "Corte de vacuno (Entraña) acompañado de patatas fritas, frijoles y tortillas.", price: "22.00€", allergens: ["lacteo", "gluten"] },
      { name: "Jalapeños", description: "Jalapeños rebozado relleno de queso crema.", price: "7.00€" },
      { name: "Tequeños", price: "7.00€", allergens: ["huevos", "lacteo", "gluten"] }
    ]
  },
  {
    id: "para-compartir",
    name: "Para compartir",
    items: [
      { name: "Gringa (Pibil, Tinga, Choripapa o Pastor)", description: "2 tortillas de harina, rellenas de carne al pastor, queso, cebolla, piña y cilantro.", price: "12.50€", allergens: ["lacteo", "gluten"] },
      { name: "Gringa especial ( Lengua, Carnitas, Bistec o Mole)", description: "2 tortillas de harina rellenas de ternera y queso, acompañada de guacamole.", price: "14.50€", allergens: ["lacteo", "gluten"] },
      { name: "Sincronizada", description: "2 tortillas de harina rellenas de queso y jamón York, bañadas en salsa verde (picante) y nata.", price: "7.50€", allergens: ["gluten", "lacteo"] }
    ]
  },
  {
    id: "tacos-quesadillas",
    name: "Tacos/Quesadillas",
    items: [
      { name: "Cochinita pibil", description: "Carne de cerdo mechada adobada en achiote y cebolla morada encurtida.", price: "3.00€" },
      { name: "Pastor", description: "Carne de cerdo marinada, cebolla, piña y cilantro.", price: "3.00€" },
      { name: "Tinga", description: "Carne mechada de pollo, guisada en chipotle y cebolla.", price: "3.00€" },
      { name: "Choripapa", description: "Chorizo, patata y cebolla.", price: "2.80€" },
      { name: "Mole poblano", description: "Carne mechada de pollo, guisada con mole poblano. (Picante leve)", price: "4.00€", allergens: ["cacahuetes", "sesamo", "altramuces"] },
      { name: "Bistec", description: "Ternera con guacamole.", price: "4.00€" },
      { name: "Lengua", description: "Lengua de vaca guisada, cebolla y cilantro.", price: "4.00€" },
      { name: "Carnitas", description: "Carne de cerdo mechada marinada en salsa verde, cebolla y cilantro.", price: "4.00€" },
      { name: "Quesadilla (Pibil, tinga, pastor o chori)", price: "4.00€", allergens: ["lacteo", "gluten"] },
      { name: "Quesadilla (Bistec, Mole, Carnitas o Lengua)", price: "4.80€", allergens: ["lacteo", "gluten"] },
      { name: "Flautas de papa", description: "Tortilla crujiente rellena de patata con nata, guacamole y queso feta.", price: "7.00€", allergens: ["lacteo"] },
      { name: "Flautas de pollo", description: "Tortilla crujiente rellena de pollo guisado, nata, guacamole y queso feta.", price: "7.80€", allergens: ["lacteo"] },
      { name: "Quesadilla chicharrón", description: "(Torrezno)", price: "4.40€" },
      { name: "Quesabirria", description: "Quesadilla en tortilla de maíz, con birria y su propio consomé", price: "4.80€" }
    ]
  },
  {
    id: "menu-ninos",
    name: "Menú niños",
    items: [
      { name: "Nuggets", description: "Nuggets con patatas fritas y bebida (agua, zumo o coca cola/fanta).", price: "7.50€" },
      { name: "Quesadillas", description: "Quesadillas de jamón York y queso, patatas fritas y bebida (agua, zumo o coca cola/fanta).", price: "7.50€" }
    ]
  },
  {
    id: "postres",
    name: "Postres",
    items: [
      { name: "Mostachón", description: "Bizcocho de nuez con crema de queso y fruta de temporada.", price: "6.00€", allergens: ["cacahuetes", "gluten", "frutosConCascara", "lacteo", "huevos"] },
      { name: "Brownie", price: "5.50€", allergens: ["gluten", "frutosConCascara", "lacteo", "huevos", "cacahuetes"] },
      { name: "Pastel de elote", description: "Bizcocho de elote (maíz dulce) con dulce de leche y nata.", price: "6.00€", allergens: ["gluten", "lacteo", "huevos"] },
      { name: "Coulant", price: "5.00€", allergens: ["gluten", "frutosConCascara", "lacteo", "huevos", "cacahuetes"] },
      { name: "Fresas con nata", price: "5.50€", allergens: ["lacteo"] },
      { name: "Fruta", description: "Piña/melocotón en almíbar con nata.", price: "3.50€", allergens: ["lacteo"] },
      { name: "3 leches", description: "Bizcocho casero bañado en 3 tipos de leche", price: "6.00€" }
    ]
  },
  {
    id: "cafes-infusiones",
    name: "Cafés / Infusiones",
    items: [
      { name: "Café solo", price: "1.20€" },
      { name: "Café americano", price: "1.60€" },
      { name: "Cortado", price: "1.50€" },
      { name: "Café bombón", price: "1.70€" },
      { name: "Café con leche", price: "1.70€" },
      { name: "Carajillo", price: "2.70€" },
      { name: "Infusiones", price: "1.40€" },
      { name: "Suplemento hielo", price: "0.20€" },
      { name: "Suplemento tocado", price: "0.50€" }
    ]
  },
  {
    id: "cocteles-licores",
    name: "Cócteles / Licores",
    items: [
      { name: "Michelada cerveza nacional", description: "Cerveza combinada con salsa inglesa, salsa Maggi y Clamato.", price: "5.50€" },
      { name: "Margarita", description: "Granizado de limón, triple seco y tequila.", price: "7.00€" },
      { name: "Tequila sunrise", description: "Zumo de naranja, granadina y tequila.", price: "7.00€" },
      { name: "Mojito", price: "7.00€" },
      { name: "Piña colada", description: "Ron, piña, coco y canela.", price: "7.00€" },
      { name: "Bloody Mary", description: "Zumo de tomate, vodka, salsa inglesa, sal y pimienta.", price: "7.00€" },
      { name: "Combinados de ron/whisky/ginebra", price: "7.00€" },
      { name: "Copas de licor", price: "3.50€" },
      { name: "Chupitos", price: "2.00€" },
      { name: "Tequilas premium", description: "Consultar tequilas", price: "6.00€" },
      { name: "Caballito de tequila", price: "3.50€" },
      { name: "Michelada cerveza mexicana", description: "Con cerveza mexicana", price: "6.00€" },
      { name: "Chelada", price: "4.50€" }
    ]
  }
];

const sectionsContainer = document.querySelector("#menu-sections");
const navigationList = document.querySelector("#navigation-list");
const menuButton = document.querySelector("#menu-button");
const menuOverlay = document.querySelector("#menu-overlay");
let elementToRestoreFocus = null;

function createAllergen(key) {
  const definition = allergens[key];
  if (!definition) return null;

  const wrapper = document.createElement("span");
  wrapper.className = "allergen";
  wrapper.dataset.label = definition.label;
  wrapper.tabIndex = 0;
  wrapper.setAttribute("aria-label", `Alérgeno: ${definition.label}`);

  const image = document.createElement("img");
  image.src = definition.icon;
  image.alt = "";
  image.width = 26;
  image.height = 27;
  image.loading = "lazy";
  wrapper.append(image);
  return wrapper;
}

function createMenuItem(item) {
  const listItem = document.createElement("li");
  listItem.className = "menu-item";

  const article = document.createElement("article");
  article.className = "item-card";

  const firstLine = document.createElement("div");
  firstLine.className = "item-first-line";

  const name = document.createElement("h3");
  name.className = "item-name";
  name.textContent = item.name;
  firstLine.append(name);

  if (item.price) {
    const line = document.createElement("hr");
    line.className = "line-to-price";
    line.setAttribute("aria-hidden", "true");

    const price = document.createElement("span");
    price.className = "item-price";
    price.textContent = item.price;
    firstLine.append(line, price);
  }

  article.append(firstLine);

  if (item.description) {
    const description = document.createElement("p");
    description.className = "item-description";
    description.textContent = item.description;
    article.append(description);
  }

  if (item.allergens?.length) {
    const allergenList = document.createElement("div");
    allergenList.className = "allergens-container";
    allergenList.setAttribute("aria-label", "Alérgenos");
    item.allergens.forEach((key) => {
      const allergen = createAllergen(key);
      if (allergen) allergenList.append(allergen);
    });
    article.append(allergenList);
  }

  const spacer = document.createElement("div");
  spacer.className = "item-spacer";
  spacer.setAttribute("aria-hidden", "true");
  article.append(spacer);
  listItem.append(article);
  return listItem;
}

function renderMenu() {
  const sectionsFragment = document.createDocumentFragment();
  const navigationFragment = document.createDocumentFragment();

  menuSections.forEach((section) => {
    const sectionElement = document.createElement("section");
    sectionElement.className = "menu-section";
    sectionElement.id = section.id;

    const header = document.createElement("header");
    header.className = "section-header";
    const heading = document.createElement("h2");
    heading.id = `${section.id}-title`;
    heading.textContent = section.name;
    header.append(heading);

    const list = document.createElement("ul");
    list.className = "item-list";
    list.setAttribute("aria-labelledby", heading.id);
    section.items.forEach((item) => list.append(createMenuItem(item)));
    sectionElement.append(header, list);
    sectionsFragment.append(sectionElement);

    const navigationItem = document.createElement("li");
    const navigationButton = document.createElement("button");
    navigationButton.className = "navigation-link";
    navigationButton.type = "button";
    navigationButton.dataset.target = section.id;
    navigationButton.textContent = section.name;
    navigationItem.append(navigationButton);
    navigationFragment.append(navigationItem);
  });

  sectionsContainer.replaceChildren(sectionsFragment);
  navigationList.replaceChildren(navigationFragment);
}

function openNavigation() {
  elementToRestoreFocus = document.activeElement;
  menuOverlay.hidden = false;
  document.body.classList.add("menu-open");
  menuButton.setAttribute("aria-expanded", "true");
  navigationList.querySelector("button")?.focus();
}

function closeNavigation({ restoreFocus = true } = {}) {
  menuOverlay.hidden = true;
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
  if (restoreFocus && elementToRestoreFocus instanceof HTMLElement) {
    elementToRestoreFocus.focus();
  }
}

function navigateToSection(sectionId) {
  const section = document.getElementById(sectionId);
  closeNavigation({ restoreFocus: false });
  if (!section) return;

  const heading = section.querySelector("h2");
  requestAnimationFrame(() => {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => {
      heading.tabIndex = -1;
      heading.focus({ preventScroll: true });
    }, 450);
  });
}

function trapDialogFocus(event) {
  if (event.key !== "Tab" || menuOverlay.hidden) return;
  const focusable = [...menuOverlay.querySelectorAll("button:not([disabled])")];
  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

function addStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "La Mexicana",
    image: "assets/logo-la-mexicana.jpg",
    telephone: "+34605678555",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C/ Dolores Ibarruri, número 7"
    },
    servesCuisine: "Mexicana",
    hasMenu: {
      "@type": "Menu",
      inLanguage: "es",
      hasMenuSection: menuSections.map((section) => ({
        "@type": "MenuSection",
        name: section.name,
        hasMenuItem: section.items.map((item) => {
          const menuItem = {
            "@type": "MenuItem",
            name: item.name
          };
          if (item.description) menuItem.description = item.description;
          if (item.price) {
            menuItem.offers = {
              "@type": "Offer",
              price: item.price.replace("€", ""),
              priceCurrency: "EUR"
            };
          }
          return menuItem;
        })
      }))
    }
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(schema);
  document.head.append(script);
}

menuButton.addEventListener("click", openNavigation);
menuOverlay.addEventListener("click", (event) => {
  if (event.target === menuOverlay) closeNavigation();
});
navigationList.addEventListener("click", (event) => {
  const link = event.target.closest("[data-target]");
  if (link) navigateToSection(link.dataset.target);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !menuOverlay.hidden) closeNavigation();
  trapDialogFocus(event);
});

renderMenu();
addStructuredData();
