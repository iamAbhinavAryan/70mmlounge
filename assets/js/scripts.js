"use strict";



/**
 * PRELOAD
 *
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  if (preloader) preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

const serviceCards = document.querySelectorAll(".service-card");
const serviceImageLinks = document.querySelectorAll(".service-card > a.has-before");

serviceImageLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
  });
});

if (serviceCards.length && window.matchMedia("(max-width: 767px)").matches) {
  let lastScrollY = window.scrollY;
  let shineFrame = null;

  const shineVisibleServiceCards = function () {
    const scrollDirection = window.scrollY >= lastScrollY ? 1 : -1;
    lastScrollY = window.scrollY;

    serviceCards.forEach(function (serviceCard) {
      const bounds = serviceCard.getBoundingClientRect();
      if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
        serviceCard.classList.remove("mobile-shine");
        void serviceCard.offsetWidth;
        serviceCard.classList.add("mobile-shine");
      }
    });

    if (scrollDirection) window.clearTimeout(shineFrame);
    shineFrame = window.setTimeout(function () {
      serviceCards.forEach(function (serviceCard) {
        serviceCard.classList.remove("mobile-shine");
      });
    }, 750);
  };

  window.addEventListener("scroll", shineVisibleServiceCards, { passive: true });
}

const touchRippleTargets = document.querySelectorAll([
  'a',
  'button',
  'input',
  'textarea',
  'select',
  '.btn',
  '.feature-card',
  '.service-card',
  '.navbar-link',
  '.footer-link',
  '.contact-link',
  '.hero-btn',
  '.hero-call-btn',
  '.hero-whatsapp-btn',
  '.hero-chat-suggestion',
  '.menu-search-btn'
].join(', '));

const createTouchRipple = function (event) {
  if (!window.matchMedia('(pointer: coarse)').matches && event.pointerType !== 'touch') return;

  if ('vibrate' in navigator && window.matchMedia('(pointer: coarse)').matches) {
    navigator.vibrate(10);
  }

  const target = event.currentTarget;
  if (!target || typeof target.getBoundingClientRect !== 'function') return;

  const rect = target.getBoundingClientRect();
  const ripple = document.createElement('span');
  const size = Math.max(rect.width, rect.height);

  ripple.className = 'touch-ripple';
  ripple.style.width = `${size}px`;
  ripple.style.height = `${size}px`;
  ripple.style.left = `${event.clientX - rect.left - size / 2}px`;
  ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

  target.appendChild(ripple);
  ripple.addEventListener('animationend', function () {
    ripple.remove();
  }, { once: true });
};

touchRippleTargets.forEach(function (target) {
  target.addEventListener('pointerdown', createTouchRipple, { passive: true });
});


/**
 * HERO CHAT
 */

const chatTrigger = document.querySelector("[data-chat-trigger]");
const chatPanel = document.querySelector("[data-chat-panel]");
const chatClose = document.querySelector("[data-chat-close]");
const chatForm = document.querySelector("[data-chat-form]");
const chatMessages = document.querySelector(".hero-chat-messages");
const whatsappNumber = "918987477773";

const chatContact = {
  phone: "+91 8987477773",
  email: "70mmlounge8bokaro@gmail.com",
  address: "70mm Lounge, Dumarjor, Chas, Bokaro, 827013",
  map: "https://www.google.com/maps/search/?api=1&query=70mm%20Lounge%2C%20Dumarjor%2C%20Chas%2C%20Bokaro%2C%20827013",
  hours: "Daily, 3:00 pm to 10:00 pm"
};

const chatCategories = {
  veg: ["veg", "vegetarian", "main course veg", "paneer", "mushroom", "dal"],
  nonVeg: ["non veg", "non-veg", "chicken", "egg", "murg", "fish", "prawn"],
  chinese: ["chinese", "manchurian", "spring roll", "honey chilli", "fried rice", "chopsuey"],
  noodles: ["noodle", "noodles", "hakka", "schezwan hakka"],
  starters: ["starter", "starters", "appetizer", "appetizers", "snack", "pakoda", "fries"],
  tandoor: ["tandoor", "tikka", "kebab", "tandoori", "chaap"],
  biryani: ["biryani"],
  rice: ["indian rice", "rice", "pulao", "jeera rice"],
  breads: ["bread", "roti", "naan", "kulcha"],
  drinks: ["beverage", "beverages", "drink", "drinks", "mocktail", "cooler", "soda", "coffee"],
  milkshakes: ["milkshake", "milkshakes", "shake"],
  sides: ["papad", "salad", "raita"],
  desserts: ["dessert", "desserts", "sweet", "sweets", "gulab jamun", "ice cream"]
};

const chatCategoryNames = {
  veg: "Main Course Veg",
  nonVeg: "Main Course Non-Veg",
  chinese: "Chinese",
  noodles: "Noodles",
  starters: "Starters & Appetizers",
  tandoor: "Tandoor, Tikka & Kebabs",
  biryani: "Biryani",
  rice: "Indian Rice & Pulao",
  breads: "Indian Breads",
  drinks: "Beverages, Mocktails & Coolers",
  milkshakes: "Milkshakes",
  sides: "Salad, Raita & Papad",
  desserts: "Desserts"
};

const chatDishAliases = {
  "paneer kadhai": "Paneer Kadai",
  "sahi paneer": "Shahi Paneer",
  "peas pulao": "Pee Pulao",
  "cheese balls": "Chesse Ball",
  "virgin mojito": "Virgin Mojito",
  "butter chicken": "Chicken Butter Masala",
  "chicken biryani": "Chicken Biryani",
  "chicken tikka": "Chicken Tikka Masala"
};

const chatDishCatalog = {
  "Soups": ["cream of tomato", "veg manchow", "veg sweet corn", "chicken hot and sour", "chicken manchow", "chicken clear soup"],
  "Tandoor & Tikka": ["paneer tikka", "paneer achari tikka", "paneer afghani tikka", "paneer malai tikka", "chicken tikka", "chicken achari tikka", "chicken afghani tikka", "chicken malai tikka", "tandoori veg platter", "tandoori chicken", "tandoori prawn", "fish tikka", "fish achari tikka"],
  "Appetizers & Snacks": ["paneer pakoda", "onion chhita pakoda", "chicken pakoda", "peanut masala", "cheese balls", "french fries", "peri peri fries", "cheese naan bomb"],
  "Kebabs": ["harabhara kebab", "veg shami kebab", "veg seekh kebab", "paneer seekh kebab", "chicken seekh kebab", "chicken haryali kebab", "chicken boti kebab", "chicken afghani kebab", "tangri kebab", "chicken banjara kebab", "fish fingers"],
  "Soya Chaap": ["malai chaap", "achari chaap", "afghani chaap", "chatpata chaap", "punjabi chaap"],
  "Chinese Veg": ["paneer chilli dry", "paneer chilli gravy", "paneer honey chilli", "paneer 65", "paneer salt and pepper", "paneer fried rice", "veg fried rice", "schezwan fried rice", "chilli garlic fried rice", "mix fried rice", "baby corn crispy", "baby corn chilli", "mushroom chilli", "mushroom honey chilli", "mushroom salt and pepper", "szechwan paneer", "veg manchurian", "corn salt and pepper", "veg lollipop", "honey chilli potato", "veg spring roll"],
  "Chinese Non-Veg": ["chicken chilli dry", "chicken chilli bl", "chicken 65", "chicken salt and pepper", "chicken hot garlic", "chicken honey chilli", "chicken lollipop", "chicken fried rice", "lemon chicken", "szechwan chicken", "chicken spring roll", "chicken schezwan fried rice", "chicken chilli garlic fried rice", "chicken mix fried rice"],
  "Noodles": ["veg hakka noodle", "paneer hakka noodle", "baby corn hakka noodle", "mix hakka noodle", "mushroom hakka noodle", "veg szechwan hakka noodle", "veg american chopsuey", "chilli garlic hakka noodle", "chicken hakka noodle", "mix hakka noodle non veg"],
  "Main Course Veg": ["paneer butter masala", "paneer do pyaza", "paneer kadhai", "paneer handi", "paneer tikka butter masala", "paneer afghani tikka masala", "shahi paneer", "palak paneer", "matar paneer", "malai kofta", "veg kofta", "mix veg", "mushroom masala", "mushroom paneer masala", "mushroom butter masala", "mushroom do pyaza", "mushroom irani"],
  "Main Course Non-Veg": ["egg masala", "chicken do pyaza", "chicken butter masala", "chicken kadhai", "chicken irani", "chicken korma", "chicken masala", "chicken tikka masala", "chicken afghani tikka masala", "desi chicken", "murg mussalam", "chicken kassa", "chicken dehati", "chicken handi"],
  "Biryani, Rice & Dal": ["veg biryani", "chicken biryani", "hyderabadi chicken biryani", "plain rice", "jeera rice", "veg pulao", "paneer pulao", "peas pulao", "kashmiri pulao", "dal fry", "dal tadka", "dal makhani", "dal panchratan"],
  "Indian Breads": ["tandoori roti", "tandoori butter roti", "plain naan", "butter naan", "garlic naan", "cheese naan", "plain kulcha", "masala kulcha", "paneer kulcha", "amritsar kulcha"],
  "Mocktails & Coolers": ["virgin mojito", "virgin kiwi cooler", "mumbai maharani", "indian summer", "adam eve", "patyala the maharaja", "sweet sixteen", "apple eye", "fruit punch", "mango boom", "cinderella", "virgin pinacolada", "lipstick on the collar", "first impression", "vanilla ice cream with orange syrup", "shirley temple"],
  "Beverages & Milkshakes": ["coffee", "cold coffee", "coffee with ice cream", "masala cold drink", "redbull", "monster", "soda", "vanilla shake", "mango shake", "kesar pista shake", "oreo shake", "brownie shake", "kitkat shake", "chocolate shake"],
  "Sides & Desserts": ["dry papad", "fry papad", "masala papad", "green salad", "onion salad", "fruit salad", "veg raita", "onion raita", "boondi raita", "pineapple raita", "gulab jamun", "ice cream", "ice cream with gulab jamun"]
};

const appendChatTextWithLinks = function (message, text) {
  const contactPattern = /\+91 8987477773|70mmlounge8bokaro@gmail\.com|70mm Lounge, Dumarjor, Chas, Bokaro, 827013/g;
  let lastIndex = 0;
  let match;

  while ((match = contactPattern.exec(text)) !== null) {
    message.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));

    const link = document.createElement("a");
    link.textContent = match[0];
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    if (match[0].includes("@")) {
      link.href = `mailto:${match[0]}`;
      link.removeAttribute("target");
      link.removeAttribute("rel");
    } else if (match[0].startsWith("+91")) {
      link.href = `tel:${match[0].replace(/\D/g, "")}`;
      link.removeAttribute("target");
      link.removeAttribute("rel");
    } else {
      link.href = chatContact.map;
    }

    message.appendChild(link);
    lastIndex = match.index + match[0].length;
  }

  message.appendChild(document.createTextNode(text.slice(lastIndex)));
};

const createChatMessage = function (text, sender) {
  if (!chatMessages) return;

  const message = document.createElement("div");
  message.className = `hero-chat-message ${sender}`;
  if (sender === "incoming" && typeof text === "object" && text.type === "blog") {
    appendChatTextWithLinks(message, text.text);

    const blogLink = document.createElement("a");
    blogLink.className = "hero-chat-booking-link";
    blogLink.href = "blog.html";
    blogLink.textContent = "Open Blog";
    message.appendChild(blogLink);
  } else if (sender === "incoming" && typeof text === "object" && text.type === "reservation") {
    appendChatTextWithLinks(message, text.text);
  } else if (sender === "incoming" && typeof text === "object") {
    appendChatTextWithLinks(message, text.text);

    const results = document.createElement("div");
    results.className = text.type === "categories" ? "hero-chat-category-results" : "hero-chat-food-results";

    text.items.forEach(function (item) {
      const resultLink = document.createElement("a");
      resultLink.className = text.type === "categories" ? "hero-chat-category-item" : "hero-chat-food-item";
      resultLink.href = text.type === "categories"
        ? `menu.html?category=${encodeURIComponent(item.value)}`
        : `menu.html?category=${encodeURIComponent(item.category)}#${item.id}`;

      if (text.type === "categories") {
        resultLink.textContent = item.label;
        results.appendChild(resultLink);
        return;
      }

      const dishName = document.createElement("span");
      dishName.className = "hero-chat-food-name";
      dishName.textContent = item.title;

      const dishPrice = document.createElement("span");
      dishPrice.className = "hero-chat-food-price";
      dishPrice.textContent = item.prices || "Price menu me check karein";

      resultLink.append(dishName, dishPrice);
      results.appendChild(resultLink);
    });

    message.appendChild(results);
  } else if (sender === "incoming") {
    appendChatTextWithLinks(message, text);
  } else {
    message.textContent = text;
  }

  if (sender === "incoming" && typeof text === "object" && text.type === "reservation") {
    const bookingLink = document.createElement("a");
    bookingLink.className = "hero-chat-booking-link";
    bookingLink.href = "index.html#reservation";
    bookingLink.textContent = "Book Table";
    message.appendChild(bookingLink);
  }

  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

const normalizeChatText = function (text) {
  return text.toLowerCase().replace(/[‐‑‒–—]/g, "-").replace(/\s+/g, " ").trim();
};

const makeDishId = function (title) {
  return `dish-${normalizeChatText(title).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}`;
};

const detectChatLanguage = function (text) {
  if (/[\u0900-\u097f]/.test(text)) return "hi";

  const hindiWords = /\b(kya|hai|hain|mujhe|aap|apko|batao|bataye|chahiye|kitna|kitni|kaise|kahan|kab|karna|karni|milta|milega|samay|khana|khane|pata|kripya)\b/;
  return hindiWords.test(normalizeChatText(text)) ? "hi" : "en";
};

const getMenuDish = function (query) {
  const normalizedQuery = normalizeChatText(query);
  const dishEntries = Object.entries(chatDishAliases);
  const aliasMatch = dishEntries.find(function ([alias]) {
    return normalizedQuery.includes(alias);
  });
  const requestedName = aliasMatch ? aliasMatch[1] : null;
  const menuCards = Array.from(document.querySelectorAll(".menu-item"));

  return menuCards.find(function (menuItem) {
    const title = normalizeChatText(menuItem.querySelector(".card-title")?.textContent || "");
    return (requestedName && title === normalizeChatText(requestedName)) ||
      (title && normalizedQuery.includes(title));
  }) || null;
};

const chatCategoryFilters = {
  veg: ["main-course-veg"],
  nonVeg: ["main-course-non-veg"],
  chinese: ["chinese-veg", "chinese-non-veg"],
  noodles: ["noodles"],
  starters: ["starter", "appetizers"],
  tandoor: ["tandoor-tikka", "kebab"],
  biryani: ["biryani"],
  rice: ["indian-rice"],
  breads: ["indian-breads"],
  drinks: ["drinks", "mocktails", "beverages"],
  milkshakes: ["milkshakes"],
  sides: ["dal-papad", "salad-raita"],
  desserts: ["dessert"]
};

const chatMenuCategories = [
  { label: "Starter", value: "starter" },
  { label: "Appetizers", value: "appetizers" },
  { label: "Soups", value: "soup" },
  { label: "Tandoor & Tikka", value: "tandoor-tikka" },
  { label: "Kebabs", value: "kebab" },
  { label: "Chinese Veg", value: "chinese-veg" },
  { label: "Chinese Non-Veg", value: "chinese-non-veg" },
  { label: "Noodles", value: "noodles" },
  { label: "Main Course Veg", value: "main-course-veg" },
  { label: "Main Course Non-Veg", value: "main-course-non-veg" },
  { label: "Indian Rice", value: "indian-rice" },
  { label: "Biryani", value: "biryani" },
  { label: "Dal & Papad", value: "dal-papad" },
  { label: "Indian Breads", value: "indian-breads" },
  { label: "Salad & Raita", value: "salad-raita" },
  { label: "Mocktails", value: "mocktails" },
  { label: "Beverages", value: "beverages" },
  { label: "Milkshakes", value: "milkshakes" },
  { label: "Desserts", value: "dessert" }
];

const getEditDistance = function (first, second) {
  const rows = Array.from({ length: second.length + 1 }, function (_, index) { return index; });

  for (let row = 1; row <= first.length; row++) {
    let previous = rows[0];
    rows[0] = row;

    for (let column = 1; column <= second.length; column++) {
      const current = rows[column];
      rows[column] = first[row - 1] === second[column - 1]
        ? previous
        : Math.min(previous, rows[column - 1], current) + 1;
      previous = current;
    }
  }

  return rows[second.length];
};

const isSimilarKeyword = function (input, keyword) {
  if (input === keyword || input.includes(keyword) || keyword.includes(input)) return true;

  if (input.length < 4 || keyword.length < 4) return false;
  return getEditDistance(input, keyword) <= (Math.max(input.length, keyword.length) > 7 ? 2 : 1);
};

const getChatMenuItems = async function () {
  const items = new Map();
  const addItems = function (root) {
    root.querySelectorAll(".menu-item[data-category]").forEach(function (menuItem) {
      const title = menuItem.querySelector(".card-title")?.textContent.trim();
      if (!title) return;

      const dishId = makeDishId(title);
      menuItem.id = dishId;

      const prices = Array.from(menuItem.querySelectorAll(".price-option"))
        .map(function (price) { return price.textContent.replace(/\s+/g, " ").trim(); })
        .filter(Boolean)
        .join(" | ");

      items.set(normalizeChatText(title), {
        title: title,
        category: menuItem.dataset.category,
        prices: prices,
        id: dishId
      });
    });
  };

  addItems(document);

  if (window.location.pathname.endsWith("index.html") || window.location.pathname === "/") {
    try {
      const response = await fetch("menu.html");
      if (response.ok) addItems(new DOMParser().parseFromString(await response.text(), "text/html"));
    } catch (error) {
      // The homepage dishes remain available when menu.html cannot be fetched locally.
    }
  }

  return Array.from(items.values());
};

const getFoodIntent = function (query) {
  const words = normalizeChatText(query).split(/[^a-z0-9]+/).filter(Boolean);
  let bestMatch = null;

  Object.entries(chatCategories).forEach(function ([category, keywords]) {
    keywords.forEach(function (keyword) {
      words.forEach(function (word) {
        if (isSimilarKeyword(word, keyword.replace(/\s+/g, ""))) {
          bestMatch = bestMatch || { category: category, keyword: keyword };
        }
      });
    });
  });

  Object.entries(chatDishCatalog).forEach(function ([category, dishes]) {
    dishes.forEach(function (dish) {
      const dishWords = dish.split(" ");
      if (dishWords.some(function (dishWord) {
        return words.some(function (word) { return isSimilarKeyword(word, dishWord); });
      })) {
        bestMatch = bestMatch || { category: category, keyword: dish };
      }
    });
  });

  return bestMatch;
};

const isMenuQuery = function (query) {
  const words = normalizeChatText(query).split(/[^a-z0-9]+/).filter(Boolean);
  const menuTypos = ["mnu", "mnus", "menue", "menues"];
  return words.some(function (word) {
    return menuTypos.includes(word) || isSimilarKeyword(word, "menu") || isSimilarKeyword(word, "menus");
  });
};

const getMenuReply = function (language) {
  return {
    type: "categories",
    text: language === "hi" ? "Menu ki category select karein:" : "Choose a menu category:",
    items: chatMenuCategories
  };
};

const getFoodReply = async function (query, language) {
  const intent = getFoodIntent(query);
  if (!intent) return null;

  const menuItems = await getChatMenuItems();
  const normalizedQuery = normalizeChatText(query);
  const matchingItems = menuItems.filter(function (item) {
    const normalizedTitle = normalizeChatText(item.title);
    const filters = chatCategoryFilters[intent.category] || [];
    const categoryMatch = filters.includes(item.category);
    const keywordMatch = normalizedTitle.includes(normalizeChatText(intent.keyword)) ||
      normalizedQuery.split(/[^a-z0-9]+/).some(function (word) {
        return word.length >= 4 && normalizedTitle.split(/[^a-z0-9]+/).some(function (titleWord) {
          return isSimilarKeyword(word, titleWord);
        });
      });

    return keywordMatch || categoryMatch;
  }).slice(0, 5);

  if (!matchingItems.length) return null;

  return {
    text: language === "hi"
      ? `${intent.keyword} se related dishes:`
      : `Dishes related to ${intent.keyword}:`,
    items: matchingItems
  };
};

const getCatalogDish = function (query) {
  const normalizedQuery = normalizeChatText(query);

  for (const [category, dishes] of Object.entries(chatDishCatalog)) {
    const dish = dishes.find(function (dishName) {
      return normalizedQuery.includes(dishName);
    });

    if (dish) return { name: dish, category: category };
  }

  return null;
};

const getDishReply = function (dish, language) {
  const title = dish.querySelector(".card-title")?.textContent.trim();
  const description = dish.querySelector(".card-text")?.textContent.trim();
  const prices = Array.from(dish.querySelectorAll(".price-option"))
    .map(function (price) { return price.textContent.replace(/\s+/g, " ").trim(); })
    .filter(Boolean)
    .join(" | ");

  if (language === "hi") {
    return `${title} hamare menu me available hai.\n${description || "Is dish ki jankari menu me di gayi hai."}${prices ? `\nPrice: ${prices}` : ""}`;
  }

  return `${title} is available on our menu.\n${description || "Please check the menu for dish details."}${prices ? `\nPrice: ${prices}` : ""}`;
};

const getCategoryReply = function (query, language) {
  const categoryKey = Object.keys(chatCategories).find(function (key) {
    return chatCategories[key].some(function (keyword) {
      return query.includes(keyword);
    });
  });

  if (!categoryKey) return null;

  const categoryName = chatCategoryNames[categoryKey];
  if (language === "hi") {
    return `${categoryName} category me hamare menu me kai options available hain. Pura menu dekhne ke liye Menu section open karein aur category select karein.`;
  }

  return `Our menu has several options in ${categoryName}. Open the Menu section and select the category to see all dishes.`;
};

const getAutoReply = async function (text) {
  const normalized = normalizeChatText(text);
  const language = detectChatLanguage(text);
  const isContactQuery = /\b(contacts?|phone|mobile|call|number|address|location|locate|located|map|direction|directions|where|email|whatsapp|timing|time|hours|opening|closing|samay|kahan|pata)\b/.test(normalized);
  const isReservationQuery = /\b(reservation|reserve|booking|book a table|table booking|table reserve|party booking|birthday celebration|seat available|pre-book|booking inquiry|couple table|family booking|book|table|seat|party|birthday)\b/.test(normalized);
  const isBlogQuery = /\b(blog|blogs|blogging|article|articles|read blog|view blog)\b/.test(normalized);
  const isGreeting = /\b(hello|hi|hey|namaste|नमस्ते|हैलो)\b/.test(normalized);

  if (isReservationQuery) {
    if (language === "hi") {
      return {
        type: "reservation",
        text: `Table booking ke liye apna naam, date, time aur total guests batayein. Aap ${chatContact.phone} par call bhi kar sakte hain.`
      };
    }
    return {
      type: "reservation",
      text: `For a table booking, please share your name, date, time and total guests. You can also call us at ${chatContact.phone}.`
    };
  }

  if (isContactQuery) {
    if (language === "hi") {
      return `Aap humse ${chatContact.phone} par call kar sakte hain.\nEmail: ${chatContact.email}\nAddress: ${chatContact.address}\nTiming: ${chatContact.hours}`;
    }
    return `You can call us at ${chatContact.phone}.\nEmail: ${chatContact.email}\nAddress: ${chatContact.address}\nTiming: ${chatContact.hours}`;
  }

  if (isBlogQuery) {
    return {
      type: "blog",
      text: language === "hi"
        ? "Hamare latest blogs aur updates dekhne ke liye Blog page open karein."
        : "Open our Blog page to read the latest blogs and updates."
    };
  }

  if (isMenuQuery(text)) return getMenuReply(language);

  const dish = getMenuDish(text);
  const catalogDish = getCatalogDish(text);

  if (dish) return getDishReply(dish, language);

  const foodReply = await getFoodReply(text, language);
  if (foodReply) return foodReply;

  if (catalogDish) {
    if (language === "hi") {
      return `${catalogDish.name} hamare ${catalogDish.category} section me listed hai. Exact price aur description dekhne ke liye Menu section open karein.`;
    }
    return `${catalogDish.name} is listed in our ${catalogDish.category} section. Open the Menu section for its exact price and description.`;
  }

  if (normalized.includes("menu") || normalized.includes("food") || normalized.includes("dish") || normalized.includes("khana")) {
    if (language === "hi") return "Aap menu section me category select karke dishes dekh sakte hain. Kisi specific dish ka naam bhejiye, main uski jankari bata dunga.";
    return "Open the Menu section and select a category to browse dishes. Send me a dish name and I will share its details.";
  }

  const categoryReply = getCategoryReply(normalized, language);
  if (categoryReply) return categoryReply;

  if (isGreeting) {
    if (language === "hi") return "Namaste! Main menu, dishes, contact details aur table booking me aapki madad kar sakta hoon.";
    return "Hi! I can help with our menu, dishes, contact details and table bookings.";
  }

  if (language === "hi") return "Main menu, dish, contact ya reservation se judi jankari de sakta hoon. Kripya apna sawal thoda detail me bhejiye.";
  return "I can help with menu, dish details, contact information or reservations. Please tell me what you would like to know.";
};

if (chatTrigger && chatPanel) {
  const setChatState = function (isOpen) {
    chatPanel.classList.toggle("active", isOpen);
    chatPanel.setAttribute("aria-hidden", String(!isOpen));
    chatTrigger.setAttribute("aria-expanded", String(isOpen));
    chatTrigger.setAttribute("aria-label", isOpen ? "Close chat" : "Open chat");
  };

  chatTrigger.addEventListener("click", function (event) {
    event.preventDefault();
    setChatState(!chatPanel.classList.contains("active"));
  });

  if (chatClose) chatClose.addEventListener("click", function () { setChatState(false); });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && chatPanel.classList.contains("active")) {
      setChatState(false);
      chatTrigger.focus();
    }
  });

  document.addEventListener("click", function (event) {
    if (!chatPanel.classList.contains("active")) return;
    if (!chatPanel.contains(event.target) && !chatTrigger.contains(event.target)) setChatState(false);
  });

  const sendChatMessage = function (message) {
    const trimmedMessage = String(message || "").trim();

    if (!trimmedMessage) return;

    createChatMessage(trimmedMessage, "user");
    if (chatForm && chatForm.elements.message) chatForm.reset();

    window.setTimeout(async function () {
      try {
        createChatMessage(await getAutoReply(trimmedMessage), "incoming");
      } catch (error) {
        createChatMessage("Sorry, abhi reply load nahi ho pa raha. Please dobara try karein.", "incoming");
        console.error("Chat reply failed:", error);
      }
    }, 900);
  };

  if (chatForm) {
    chatForm.addEventListener("submit", function (event) {
      event.preventDefault();
      sendChatMessage(chatForm.elements.message.value);
    });
  }

  document.querySelectorAll("[data-chat-suggestion]").forEach(function (button) {
    button.addEventListener("click", function () {
      sendChatMessage(button.dataset.chatSuggestion || button.textContent);
    });
  });
}


/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);

document.querySelectorAll(".navbar-link").forEach(function (navbarLink) {
  navbarLink.addEventListener("click", function () {
    navbar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("nav-active");
  });
});

const nav = document.getElementById("mobileNav");
const indicator = document.getElementById("activeIndicator");
const navItems = document.querySelectorAll(".nav-item");

if (nav && indicator) {
  indicator.style.display = "none";
}

if (navItems.length) {
  navItems.forEach(function (item) {
    item.classList.remove("active");
    item.removeAttribute("aria-current");
  });
}


/**
 * MENU CATEGORY FILTER
 */

const categorySelect = document.querySelector("#category");
const categoryTrigger = document.querySelector("#category-trigger");
const customSelect = document.querySelector("[data-custom-select]");
const customOptions = Array.from(document.querySelectorAll(".custom-option"));
const menuItems = document.querySelectorAll(".menu-item[data-category]");
const menuSearch = document.querySelector("[data-menu-search]");
const menuSearchBtn = document.querySelector("[data-menu-search-btn]");
const menuSearchForm = document.querySelector("[data-menu-search-form]");
const menuSearchInput = document.querySelector("[data-menu-search-input]");

menuItems.forEach(function (menuItem) {
  const title = menuItem.querySelector(".card-title")?.textContent.trim();
  if (title) menuItem.id = makeDishId(title);
});

const syncCustomCategoryUI = function () {
  if (!categorySelect || !categoryTrigger) return;

  const selectedOption = categorySelect.options[categorySelect.selectedIndex];
  const selectedValue = categorySelect.value;
  const selectedLabel = selectedOption ? selectedOption.textContent.trim() : "All";

  const valueNode = categoryTrigger.querySelector(".custom-select-value");
  if (valueNode) valueNode.textContent = selectedLabel;

  customOptions.forEach(function (option) {
    const isSelected = option.dataset.value === selectedValue;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-selected", isSelected ? "true" : "false");
  });
};

const closeCustomCategoryMenu = function () {
  if (!customSelect) return;
  customSelect.classList.remove("is-open");
  if (categoryTrigger) categoryTrigger.setAttribute("aria-expanded", "false");
};

const applyMenuFilters = function () {
  const selectedCategory = categorySelect ? categorySelect.value : "all";
  const searchTerm = menuSearchInput ? menuSearchInput.value.trim().toLowerCase() : "";

  menuItems.forEach(function (menuItem) {
    const matchesCategory = selectedCategory === "all" || menuItem.dataset.category === selectedCategory;
    const matchesSearch = menuItem.textContent.toLowerCase().includes(searchTerm);
    menuItem.style.display = matchesCategory && matchesSearch ? "" : "none";
  });
};

if (categorySelect) {
  categorySelect.addEventListener("change", function () {
    syncCustomCategoryUI();
    applyMenuFilters();
  });

  if (categoryTrigger) {
    categoryTrigger.addEventListener("click", function (event) {
      event.stopPropagation();
      if (!customSelect) return;
      const isOpen = customSelect.classList.toggle("is-open");
      categoryTrigger.setAttribute("aria-expanded", String(isOpen));
    });
  }

  customOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      const nextValue = option.dataset.value;
      if (!nextValue || !categorySelect.querySelector(`option[value="${nextValue}"]`)) return;

      categorySelect.value = nextValue;
      syncCustomCategoryUI();
      applyMenuFilters();
      closeCustomCategoryMenu();
    });
  });

  document.addEventListener("click", function (event) {
    if (customSelect && !event.target.closest("[data-custom-select]")) {
      closeCustomCategoryMenu();
    }
  });

  syncCustomCategoryUI();

  const categoryFromUrl = new URLSearchParams(window.location.search).get("category");
  if (categoryFromUrl && categorySelect.querySelector(`option[value="${categoryFromUrl}"]`)) {
    categorySelect.value = categoryFromUrl;
    syncCustomCategoryUI();
    applyMenuFilters();

    if (!window.location.hash) {
      window.setTimeout(function () {
        const firstCategoryDish = Array.from(menuItems).find(function (menuItem) {
          return menuItem.style.display !== "none";
        });
        const menuSection = document.querySelector(".menu#menu");
        (firstCategoryDish || menuSection)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  const dishFromUrl = window.location.hash.slice(1);
  if (dishFromUrl) {
    window.setTimeout(function () {
      const targetDish = document.getElementById(dishFromUrl);
      if (targetDish && targetDish.style.display !== "none") {
        targetDish.scrollIntoView({ behavior: "smooth", block: "center" });
        targetDish.classList.add("chat-target-dish");
        window.setTimeout(function () { targetDish.classList.remove("chat-target-dish"); }, 2200);
      }
    }, 100);
  }
}

if (menuSearch && menuSearchBtn && menuSearchInput) {
  menuSearchBtn.addEventListener("click", function () {
    menuSearch.classList.toggle("is-open");

    if (menuSearch.classList.contains("is-open")) {
      menuSearchInput.focus();
    } else {
      menuSearchInput.value = "";
      applyMenuFilters();
    }
  });

  menuSearchInput.addEventListener("input", applyMenuFilters);

  if (menuSearchForm) {
    menuSearchForm.addEventListener("submit", function (event) {
      event.preventDefault();
    });
  }

  document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-menu-search]")) {
      menuSearch.classList.remove("is-open");
    }
  });
}


/**
 * WHATSAPP RESERVATION
 */

const featureCards = document.querySelectorAll('.feature-card');
const isTouchDevice = window.matchMedia('(hover: none), (pointer: coarse)').matches;

if (isTouchDevice && featureCards.length) {
  const featureObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, {
    threshold: 0.4
  });

  featureCards.forEach(function (card) {
    featureObserver.observe(card);
  });
}

const reservationForm = document.querySelector(".reservation-form .form-left");
const reservationSelects = document.querySelectorAll(".reservation-select");
const customDatePickers = document.querySelectorAll("[data-custom-date-picker]");

customDatePickers.forEach(function (picker) {
  const trigger = picker.querySelector(".custom-date-trigger");
  const hiddenInput = picker.querySelector(".reservation-date-input");
  const monthNode = picker.querySelector("[data-date-month]");
  const daysNode = picker.querySelector("[data-date-days]");
  const panelNode = picker.querySelector(".custom-date-panel");
  const prevBtn = picker.querySelector('[data-date-nav="prev"]');
  const nextBtn = picker.querySelector('[data-date-nav="next"]');
  const valueNode = picker.querySelector(".custom-date-value");

  if (!trigger || !hiddenInput || !monthNode || !daysNode || !panelNode || !valueNode) return;

  let currentMonth = new Date();
  currentMonth.setDate(1);
  let swipeStartX = 0;
  let swipeStartY = 0;

  const goToPrevMonth = function () {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
    renderCalendar();
  };

  const goToNextMonth = function () {
    currentMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
    renderCalendar();
  };

  const formatDateValue = function (date) {
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(date);
  };

  const formatDisplayDate = function (date) {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(date);
  };

  const updateDateTrigger = function () {
    const selectedValue = hiddenInput.value;
    if (selectedValue) {
      trigger.classList.add("has-value");
      valueNode.textContent = formatDisplayDate(new Date(selectedValue + "T00:00:00"));
    } else {
      trigger.classList.remove("has-value");
      valueNode.textContent = "Date";
    }
  };

  const renderCalendar = function () {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();

    monthNode.textContent = new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric"
    }).format(currentMonth);

    const cells = [];

    for (let i = 0; i < startDay; i++) {
      const dayNumber = prevMonthLastDay - startDay + i + 1;
      cells.push({ value: dayNumber, muted: true, date: null });
    }

    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(year, month, day);
      const isSelected = hiddenInput.value && hiddenInput.value === formatDateValue(date);
      const isToday = formatDateValue(date) === formatDateValue(new Date());
      cells.push({
        value: day,
        muted: false,
        date,
        isSelected,
        isToday
      });
    }

    const totalCells = cells.length;
    while (cells.length < 42) {
      cells.push({ value: cells.length - totalCells + 1, muted: true, date: null });
    }

    daysNode.innerHTML = "";

    cells.forEach(function (cell) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "custom-date-day";

      if (cell.muted) button.classList.add("is-muted");
      if (cell.isToday) button.classList.add("is-today");
      if (cell.isSelected) button.classList.add("is-selected");

      button.textContent = String(cell.value);
      button.disabled = cell.muted;

      if (!cell.muted) {
        button.addEventListener("click", function () {
          const selectedDate = new Date(cell.date);
          hiddenInput.value = formatDateValue(selectedDate);
          picker.classList.remove("is-open");
          trigger.setAttribute("aria-expanded", "false");
          updateDateTrigger();
        });
      }

      daysNode.appendChild(button);
    });
  };

  trigger.addEventListener("click", function (event) {
    event.stopPropagation();
    const isOpen = picker.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });

  prevBtn.addEventListener("click", goToPrevMonth);
  nextBtn.addEventListener("click", goToNextMonth);

  panelNode.addEventListener("touchstart", function (event) {
    const touch = event.touches[0];
    swipeStartX = touch.clientX;
    swipeStartY = touch.clientY;
  }, { passive: true });

  panelNode.addEventListener("touchend", function (event) {
    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - swipeStartX;
    const deltaY = Math.abs(touch.clientY - swipeStartY);

    if (Math.abs(deltaX) > 42 && deltaY < 35) {
      if (deltaX < 0) {
        goToNextMonth();
      } else {
        goToPrevMonth();
      }
    }
  }, { passive: true });

  document.addEventListener("click", function (event) {
    if (!event.target.closest("[data-custom-date-picker]")) {
      picker.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  hiddenInput.addEventListener("input", updateDateTrigger);
  updateDateTrigger();
  renderCalendar();
});

reservationSelects.forEach(function (selectWrap) {
  const trigger = selectWrap.querySelector(".custom-select-trigger");
  const hiddenSelect = selectWrap.querySelector("select");
  const options = Array.from(selectWrap.querySelectorAll(".custom-option"));
  const valueNode = selectWrap.querySelector(".custom-select-value");

  if (!trigger || !hiddenSelect || !valueNode) return;

  const syncReservationSelect = function () {
    const selectedOption = hiddenSelect.options[hiddenSelect.selectedIndex];
    valueNode.textContent = selectedOption ? selectedOption.textContent.trim() : "Select";

    options.forEach(function (option) {
      const selected = option.dataset.value === hiddenSelect.value;
      option.classList.toggle("is-selected", selected);
      option.setAttribute("aria-selected", selected ? "true" : "false");
    });
  };

  trigger.addEventListener("click", function (event) {
    event.stopPropagation();
    const isOpen = selectWrap.classList.toggle("is-open");
    trigger.setAttribute("aria-expanded", String(isOpen));
  });

  options.forEach(function (option) {
    option.addEventListener("click", function () {
      hiddenSelect.value = option.dataset.value;
      syncReservationSelect();
      selectWrap.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", function (event) {
    if (!event.target.closest(".reservation-select")) {
      selectWrap.classList.remove("is-open");
      trigger.setAttribute("aria-expanded", "false");
    }
  });

  hiddenSelect.addEventListener("change", syncReservationSelect);
  syncReservationSelect();
});

if (reservationForm) {
  const reservationSubmitBtn = reservationForm.querySelector('button[type="submit"]');
  const reservationSuccessMsg = document.getElementById('reservationSuccessMsg');
  const reservationDefaultLabel = 'Book A Table';
  let reservationResetTimer = null;

  const updateReservationButtonLabel = function (label) {
    if (!reservationSubmitBtn) return;
    const buttonTextNodes = reservationSubmitBtn.querySelectorAll('.text');
    buttonTextNodes.forEach(function (textNode) {
      textNode.textContent = label;
    });
  };

  const syncReservationSubmitState = function () {
    if (!reservationSubmitBtn) return;

    if (reservationSubmitBtn.dataset.reservationState === 'success') {
      reservationSubmitBtn.disabled = false;
      reservationSubmitBtn.setAttribute("aria-disabled", "false");
      return;
    }

    const isValid = reservationForm.checkValidity();
    reservationSubmitBtn.disabled = !isValid;
    reservationSubmitBtn.setAttribute("aria-disabled", String(!isValid));
  };

  const showReservationSuccess = function () {
    if (!reservationSuccessMsg || !reservationSubmitBtn) return;

    const successLabel = 'Reservation sent';
    reservationSubmitBtn.dataset.reservationState = 'success';
    updateReservationButtonLabel(successLabel);
    reservationSubmitBtn.disabled = false;
    reservationSubmitBtn.setAttribute("aria-disabled", "false");

    reservationSuccessMsg.textContent = successLabel;
    reservationSuccessMsg.style.display = 'block';
    reservationSuccessMsg.style.color = '#2ecc71';

    if (reservationResetTimer) {
      window.clearTimeout(reservationResetTimer);
    }

    reservationResetTimer = window.setTimeout(function () {
      reservationSubmitBtn.dataset.reservationState = 'idle';
      updateReservationButtonLabel(reservationDefaultLabel);
      reservationSuccessMsg.style.display = 'none';
      reservationSuccessMsg.textContent = '';
      syncReservationSubmitState();
    }, 5000);
  };

  reservationForm.addEventListener("input", syncReservationSubmitState);
  reservationForm.addEventListener("change", syncReservationSubmitState);
  reservationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (!reservationForm.checkValidity()) {
      reservationForm.reportValidity();
      syncReservationSubmitState();
      return;
    }

    const formData = new FormData(reservationForm);
    const reservationMessage = [
      "*New Table Reservation*",
      "",
      `Name: ${formData.get("name") || "Not provided"}`,
      `Phone: ${formData.get("phone") || "Not provided"}`,
      `Persons: ${formData.get("person") || "Not provided"}`,
      `Date: ${formData.get("reservation-date") || "Not provided"}`,
      `Time: ${formData.get("time") || "Not provided"}`,
      `Message: ${formData.get("message") || "Not provided"}`
    ].join("\n");

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(reservationMessage)}`;
    const whatsappWindow = window.open("about:blank", "_blank");

    if (whatsappWindow) {
      whatsappWindow.location.href = whatsappUrl;
    }

    try {
      const emailResponse = await fetch(reservationForm.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });

      if (!emailResponse.ok) throw new Error("Email submission failed");

      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }

      reservationForm.reset();
      syncReservationSubmitState();
      showReservationSuccess();
    } catch (error) {
      if (whatsappWindow) whatsappWindow.close();
      window.alert("Reservation email could not be sent. Please try again.");
      syncReservationSubmitState();
    }
  });

  syncReservationSubmitState();
}



/**
 * MENU DESCRIPTION BUBBLES
 */

const dishDescriptions = document.querySelectorAll(".dish-description");
const menuCards = document.querySelectorAll(".menu-card");

const updateDishBubbleDirections = function () {
  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
  const viewportGap = 16;

  dishDescriptions.forEach(function (description) {
    const toggle = description.querySelector(".description-toggle");
    const bubble = description.querySelector(".description-bubble");

    if (!toggle || !bubble) return;

    const toggleRect = toggle.getBoundingClientRect();
    const descriptionRect = description.getBoundingClientRect();
    const bubbleHeight = bubble.offsetHeight || 220;
    const bubbleWidth = bubble.offsetWidth || Math.min(280, viewportWidth - (viewportGap * 2));
    const shouldOpenDown = toggleRect.bottom + bubbleHeight + 12 <= viewportHeight ||
      toggleRect.top <= bubbleHeight + 12;
    const desiredCenter = toggleRect.left + (toggleRect.width / 2);
    const minimumCenter = (bubbleWidth / 2) + viewportGap;
    const maximumCenter = viewportWidth - (bubbleWidth / 2) - viewportGap;
    const bubbleCenter = Math.max(minimumCenter, Math.min(maximumCenter, desiredCenter));

    description.dataset.bubbleDirection = shouldOpenDown ? "down" : "up";
    if (description.open) {
      const desiredTop = shouldOpenDown
        ? toggleRect.bottom + 12
        : toggleRect.top - bubbleHeight - 12;
      const bubbleTop = Math.max(viewportGap, Math.min(
        viewportHeight - bubbleHeight - viewportGap,
        desiredTop
      ));

      bubble.style.left = `${bubbleCenter}px`;
      bubble.style.top = `${bubbleTop}px`;
      bubble.style.bottom = "auto";
    } else {
      bubble.style.left = `${bubbleCenter - descriptionRect.left}px`;
    }
  });
};

const closeOpenDishDescriptions = function () {
  dishDescriptions.forEach(function (description) {
    description.removeAttribute("open");
  });
};

menuCards.forEach(function (menuCard) {
  const dishDescription = menuCard.querySelector(".dish-description");
  const dishImage = menuCard.querySelector(".card-banner");
  const dishName = menuCard.querySelector(".card-title");
  const descriptionBubble = dishDescription.querySelector(".description-bubble");
  const descriptionTitle = document.createElement("h4");

  descriptionTitle.className = "description-title";
  descriptionTitle.textContent = dishName.textContent.trim();
  descriptionBubble.prepend(descriptionTitle);

  const openDishDescription = function (event) {
    event.preventDefault();
    event.stopPropagation();
    updateDishBubbleDirections();
    dishDescriptions.forEach(function (otherDescription) {
      if (otherDescription !== dishDescription) otherDescription.removeAttribute("open");
    });
    dishDescription.open = true;
  };

  dishImage.addEventListener("click", openDishDescription);
  dishName.addEventListener("click", openDishDescription);
});

dishDescriptions.forEach(function (description) {
  description.addEventListener("toggle", function () {
    if (description.open) {
      dishDescriptions.forEach(function (otherDescription) {
        if (otherDescription !== description) otherDescription.removeAttribute("open");
      });
      window.requestAnimationFrame(updateDishBubbleDirections);
    }
  });
});

document.addEventListener("click", function (event) {
  if (!event.target.closest(".dish-description")) {
    closeOpenDishDescriptions();
  }
});

window.addEventListener("resize", updateDishBubbleDirections);
window.addEventListener("scroll", function () {
  closeOpenDishDescriptions();
  updateDishBubbleDirections();
}, { passive: true });
updateDishBubbleDirections();



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;
let savedScrollPos = 0;
let hasSavedScrollPos = false;

const hideHeader = function () {
  if (!header) return;

  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  galleryVideos.forEach(function (video, videoIndex) {
    if (!video.paused) {
      video.pause();
      if (galleryPlayButtons[videoIndex]) {
        galleryPlayButtons[videoIndex].hidden = false;
      }
    }
  });

  if (!header) return;

  if (window.scrollY >= 50) {
    header.classList.add("active");
    if (backTopBtn) {
      backTopBtn.classList.add("active");
      backTopBtn.classList.remove("return-state");
    }
    if (menuSearch) menuSearch.classList.add("active");
    hideHeader();
  } else if (hasSavedScrollPos) {
    header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.add("active", "return-state");
    if (menuSearch) menuSearch.classList.remove("active");
  } else {
    header.classList.remove("active");
    if (backTopBtn) backTopBtn.classList.remove("active", "return-state");
    if (menuSearch) menuSearch.classList.remove("active");
  }
});

if (backTopBtn) backTopBtn.addEventListener("click", function (event) {
  event.preventDefault();

  if (backTopBtn.classList.contains("return-state")) {
    hasSavedScrollPos = false;
    backTopBtn.classList.remove("active", "return-state");
    window.scrollTo({ top: savedScrollPos, behavior: "smooth" });
    return;
  }

  savedScrollPos = window.scrollY;
  hasSavedScrollPos = true;
  window.scrollTo({ top: 0, behavior: "smooth" });
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");
const galleryVideos = document.querySelectorAll("[data-gallery-video]");
const galleryPlayButtons = document.querySelectorAll("[data-gallery-play]");

const playGalleryVideo = function (video) {
  video.muted = false;
  video.defaultMuted = false;
  video.volume = 1;
  return video.play();
};

if (heroSlider && heroSliderItems.length) {
  let currentSlidePos = 0;
  let lastActiveSliderItem = heroSliderItems[0];

  const updateSliderPos = function () {
    galleryVideos.forEach(function (video) {
      video.pause();
      video.currentTime = 0;
    });
    galleryPlayButtons.forEach(function (button) {
      if (button) button.hidden = false;
    });
    lastActiveSliderItem.classList.remove("active");
    heroSliderItems[currentSlidePos].classList.add("active");
    lastActiveSliderItem = heroSliderItems[currentSlidePos];
  }

  const slideNext = function () {
    if (currentSlidePos >= heroSliderItems.length - 1) {
      currentSlidePos = 0;
    } else {
      currentSlidePos++;
    }

    updateSliderPos();
  }

  if (heroSliderNextBtn) heroSliderNextBtn.addEventListener("click", slideNext);

  const slidePrev = function () {
    if (currentSlidePos <= 0) {
      currentSlidePos = heroSliderItems.length - 1;
    } else {
      currentSlidePos--;
    }

    updateSliderPos();
  }

  if (heroSliderPrevBtn) heroSliderPrevBtn.addEventListener("click", slidePrev);

  let touchStartX = 0;
  let touchStartY = 0;

  heroSlider.addEventListener("touchstart", function (event) {
    if (event.touches.length !== 1) return;

    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
  }, { passive: true });

  heroSlider.addEventListener("touchend", function (event) {
    if (!touchStartX && !touchStartY) return;

    const touchEndX = event.changedTouches[0].clientX;
    const touchEndY = event.changedTouches[0].clientY;
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = touchEndY - touchStartY;
    const isHorizontalSwipe = Math.abs(horizontalDistance) > 50 &&
      Math.abs(horizontalDistance) > Math.abs(verticalDistance);

    if (isHorizontalSwipe) {
      event.preventDefault();
      if (horizontalDistance > 0) {
        slidePrev();
      } else {
        slideNext();
      }
    }

    touchStartX = 0;
    touchStartY = 0;
  }, { passive: false });
}

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  if (galleryVideos.length) return;

  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", function () {
  if (galleryVideos.length) {
    galleryVideos.forEach(function (video, videoIndex) {
      const playButton = galleryPlayButtons[videoIndex];

      video.addEventListener("ended", slideNext);
      video.addEventListener("click", function () {
        if (video.paused) {
          playGalleryVideo(video).catch(function () {});
          playButton.hidden = true;
        } else {
          video.pause();
          playButton.hidden = false;
        }
      });

      playButton.addEventListener("click", function (event) {
        event.stopPropagation();
        playGalleryVideo(video).catch(function () {});
        playButton.hidden = true;
      });
    });
  } else {
    autoSlide();
  }
});



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");
const aboutBanner = document.querySelector(".about-banner");
const isMobileDevice = window.matchMedia("(max-width: 767px)").matches;
let pointerX = 0;
let pointerY = 0;
let motionX = 0;
let motionY = 0;
let renderedX = 0;
let renderedY = 0;
let parallaxFrame = null;

const renderParallax = function () {
  parallaxFrame = null;

  renderedX += (pointerX + motionX - renderedX) * 0.18;
  renderedY += (pointerY + motionY - renderedY) * 0.18;

  parallaxItems.forEach(function (item) {
    const speed = Number(item.dataset.parallaxSpeed) || 1;
    item.style.transform = `translate3d(${renderedX * speed}px, ${renderedY * speed}px, 0px)`;
  });

  if (Math.abs(pointerX + motionX - renderedX) > 0.05 || Math.abs(pointerY + motionY - renderedY) > 0.05) {
    requestParallaxFrame();
  }
};

const requestParallaxFrame = function () {
  if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(renderParallax);
};

const updateAboutScrollParallax = function () {
  if (!aboutBanner) return;

  const bannerBounds = aboutBanner.getBoundingClientRect();
  const viewportCenter = window.innerHeight / 2;
  const distanceFromCenter = (bannerBounds.top + bannerBounds.height / 2 - viewportCenter) / window.innerHeight;
  pointerY = Math.max(-12, Math.min(12, distanceFromCenter * -18));
  requestParallaxFrame();
};

if (aboutBanner) {
  window.addEventListener("scroll", updateAboutScrollParallax, { passive: true });
  updateAboutScrollParallax();
}

if (!isMobileDevice) {
  window.addEventListener("mousemove", function (event) {
    pointerX = ((event.clientX / window.innerWidth) * 10 - 5) * -1;
    pointerY = ((event.clientY / window.innerHeight) * 10 - 5) * -1;
    requestParallaxFrame();
  });
} else if (aboutBanner) {
  window.addEventListener("deviceorientation", function (event) {
    motionX = Math.max(-4, Math.min(4, (event.gamma || 0) / 8));
    motionY = Math.max(-4, Math.min(4, ((event.beta || 0) - 45) / 12));
    requestParallaxFrame();
  }, { passive: true });

  let shakeTimeout = null;
  window.addEventListener("devicemotion", function (event) {
    const acceleration = event.accelerationIncludingGravity;
    if (!acceleration) return;

    const shakeStrength = Math.min(3, (Math.abs(acceleration.x || 0) + Math.abs(acceleration.y || 0)) / 8);
    if (shakeStrength < 1) return;

    motionX = (acceleration.x || 0) / 4;
    motionY = (acceleration.y || 0) / 4;
    requestParallaxFrame();
    window.clearTimeout(shakeTimeout);
    shakeTimeout = window.setTimeout(function () {
      motionX = 0;
      motionY = 0;
      requestParallaxFrame();
    }, 180);
  }, { passive: true });
}




/**
 * SUBSCRIBE FORM
 */

// Yahan apna Google Apps Script Web App URL paste karein
 const scriptURL = 'https://script.google.com/macros/s/AKfycbxcu-_dP1Ne2P5-8LgK_XsKOyBO-lOeMQs5ghLdsRuiQiLKGuaXfCDSaL3HCqZ_xdMGuw/exec';

  const form = document.getElementById('subscribeForm');
  const submitBtn = document.getElementById('submitBtn');
  const responseMsg = document.getElementById('responseMsg');

  const updateSubscribeButtonState = function (state) {
    if (!submitBtn) return;

    submitBtn.setAttribute('data-subscribe-state', state);
    submitBtn.disabled = state !== 'idle' && state !== 'success';

    if (state === 'idle') {
      submitBtn.disabled = !form || !form.checkValidity();
    }

    if (state === 'success') {
      submitBtn.disabled = true;
    }
  };

  const resetSubscribeStatus = function () {
    if (!submitBtn) return;
    updateSubscribeButtonState('idle');
    if (responseMsg) {
      responseMsg.style.display = 'none';
      responseMsg.innerText = '';
    }
  };

  const showSuccessState = function () {
    if (!submitBtn || !responseMsg) return;

    updateSubscribeButtonState('success');

    responseMsg.innerText = 'Thank you for subscribing.';
    responseMsg.style.color = '#2ecc71';
    responseMsg.style.display = 'block';

    setTimeout(function () {
      responseMsg.style.display = 'none';
      responseMsg.innerText = '';
      resetSubscribeStatus();
    }, 5000);
  };

  if (form && submitBtn && responseMsg) {
    const syncSubscribeButtonState = function () {
      updateSubscribeButtonState(form.checkValidity() ? 'idle' : 'idle');
      submitBtn.disabled = !form.checkValidity();
    };

    form.addEventListener('input', syncSubscribeButtonState);
    form.addEventListener('change', syncSubscribeButtonState);
    syncSubscribeButtonState();

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      updateSubscribeButtonState('loading');
      responseMsg.style.display = 'none';

      const formData = new URLSearchParams({
        name: form.querySelector('[name="name"]').value.trim(),
        phone: form.querySelector('[name="phone"]').value.trim(),
        email: form.querySelector('[name="email"]').value.trim()
      });

      fetch(scriptURL, { 
        method: 'POST', 
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        mode: 'no-cors'
      })
      .then(() => {
        form.reset();
        showSuccessState();
      })
      .catch(error => {
        responseMsg.innerText = 'Something went wrong. Please try again.';
        responseMsg.style.color = 'red';
        responseMsg.style.display = 'block';
        console.error('Error!', error);
        resetSubscribeStatus();
      });
    });
  }