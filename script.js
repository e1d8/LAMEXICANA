"use strict";

const sectionsContainer = document.querySelector("#menu-sections");
const navigationList = document.querySelector("#navigation-list");
const menuButton = document.querySelector("#menu-button");
const menuOverlay = document.querySelector("#menu-overlay");
let elementToRestoreFocus = null;

function isRecord(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function validateMenu(data) {
  if (!isRecord(data) || !Array.isArray(data.sections)) {
    throw new Error("La carta debe contener un array de secciones.");
  }

  const allergens = Object.create(null);
  if (isRecord(data.allergens)) {
    Object.entries(data.allergens).forEach(([key, definition]) => {
      if (!isRecord(definition) || !isNonEmptyString(definition.label)
        || typeof definition.icon !== "string"
        || !/^assets\/allergens\/[a-zA-Z0-9_-]+\.(svg|png|webp)$/.test(definition.icon)) return;

      allergens[key] = { label: definition.label.trim(), icon: definition.icon };
    });
  }

  // Reserve both section and heading IDs to keep navigation unambiguous.
  const usedIds = new Set([...document.querySelectorAll("[id]")].map((element) => element.id));
  const sections = [];

  data.sections.forEach((section) => {
    if (!isRecord(section) || typeof section.id !== "string"
      || !/^[a-z][a-z0-9-]*$/.test(section.id)
      || usedIds.has(section.id) || usedIds.has(`${section.id}-title`)
      || !isNonEmptyString(section.name) || !Array.isArray(section.items)) return;

    const items = [];
    section.items.forEach((item) => {
      if (!isRecord(item) || !isNonEmptyString(item.name)
        || (item.description !== undefined && typeof item.description !== "string")
        || (item.price !== undefined && (typeof item.price !== "string"
          || !/^\d+(?:[.,]\d{1,2})?\s*€$/.test(item.price.trim())))
        || (item.allergens !== undefined && (!Array.isArray(item.allergens)
          || !item.allergens.every((key) => typeof key === "string" && Object.hasOwn(allergens, key))))) return;

      const validItem = { name: item.name.trim() };
      if (item.description !== undefined) validItem.description = item.description.trim();
      if (item.price !== undefined) validItem.price = item.price.trim();
      if (item.allergens !== undefined) validItem.allergens = [...new Set(item.allergens)];
      items.push(validItem);
    });

    if (!items.length) return;
    usedIds.add(section.id);
    usedIds.add(`${section.id}-title`);
    sections.push({ id: section.id, name: section.name.trim(), items });
  });

  return { allergens, sections };
}

function createAllergen(key, allergens) {
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

function createMenuItem(item, allergens) {
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
      const allergen = createAllergen(key, allergens);
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

function renderMenu(menuSections, allergens) {
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
    section.items.forEach((item) => list.append(createMenuItem(item, allergens)));
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
  if (menuButton.disabled) return;
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

function addStructuredData(menuSections) {
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
              price: item.price.replace("€", "").trim().replace(",", "."),
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

function showMenuMessage(message) {
  const paragraph = document.createElement("p");
  paragraph.className = "menu-message";
  paragraph.textContent = message;
  sectionsContainer.replaceChildren(paragraph);
}

async function loadMenu() {
  menuButton.disabled = true;
  sectionsContainer.setAttribute("aria-busy", "true");
  showMenuMessage("Cargando la carta…");

  try {
    const response = await fetch("menu.json", { cache: "no-store" });
    if (!response.ok) throw new Error(`No se pudo cargar la carta (${response.status}).`);

    const menu = validateMenu(await response.json());
    if (!menu.sections.length) {
      showMenuMessage("La carta no está disponible en este momento.");
      return;
    }

    renderMenu(menu.sections, menu.allergens);
    addStructuredData(menu.sections);
    menuButton.disabled = false;
  } catch (error) {
    showMenuMessage("No se ha podido cargar la carta. Recarga la página para volver a intentarlo.");
    console.error("Error al cargar la carta:", error);
  } finally {
    sectionsContainer.setAttribute("aria-busy", "false");
  }
}

loadMenu();
