console.log("INDEX JS LOADED");

const smallCardsColumn = document.querySelector(".small-cards-column");
const featuredSlot = document.querySelector(".nature-card-item.featured");
let currentIndex = 0;
let pinnedCard = null;

function getCards() {
    return Array.from(smallCardsColumn.querySelectorAll(".nature-card-item"));
}

function updateFeatured(index) {
    const cards = getCards();
    if (!cards[index]) return;

    const card = cards[index];
    const img = card.querySelector("img").src;
    const desc = card.querySelector(".nature-card-item-description p").innerHTML;

    featuredSlot.querySelector("img").src = img;
    featuredSlot.querySelector(".nature-card-item-description p").innerHTML = desc;
}

function initClicks() {
    const cards = getCards();
    cards.forEach((card, index) => {
        card.onclick = () => {
            currentIndex = index;
            pinnedCard = card;
            updateFeatured(currentIndex);
        };
    });
}

// Initial load
updateFeatured(currentIndex);
initClicks();

setInterval(() => {
    if (pinnedCard) {
        pinnedCard = null;
        return;
    }

    const cards = getCards();

    // Conveyor belt — pick from second card (index 1)
    currentIndex = (currentIndex + 1) % cards.length;

    featuredSlot.classList.add("fade");

    setTimeout(() => {
        updateFeatured(currentIndex);
        featuredSlot.classList.remove("fade");
    }, 500);

}, 7000);



document.addEventListener("DOMContentLoaded", () => {

  function setupViewMore(containerClass, itemClass, buttonClass, showText, hideText) {

    document.querySelectorAll(containerClass).forEach(card => {

      const items = card.querySelectorAll(itemClass);
      const btn = card.querySelector(buttonClass);

      if (!btn || items.length === 0) return;

      const itemsPerClick = 6;
      let visibleCount = itemsPerClick;

      // Initial state
      function updateVisibility() {

        items.forEach((item, i) => {
          item.classList.toggle("hidden", i >= visibleCount);
        });

        // Update button text
        if (visibleCount >= items.length) {
          btn.textContent = hideText;
        } else {
          btn.textContent = showText;
        }
      }

      updateVisibility();

      btn.addEventListener("click", () => {

        // If all items are visible, collapse back to first 6
        if (visibleCount >= items.length) {

          visibleCount = itemsPerClick;

        } else {

          // Show next 6 items
          visibleCount += itemsPerClick;

          // Prevent going beyond total items
          if (visibleCount > items.length) {
            visibleCount = items.length;
          }
        }

        updateVisibility();

      });

    });

  }

  // LANDSCAPES SECTION
  setupViewMore(
    ".fixed-nature-card-category",
    ".fixed-nature-card-item",
    ".view-button-landscapes",
    "More Sceneries",
    "Show Less"
  );

  // PROPERTY SECTION
  setupViewMore(
    ".fixed-nature-card-category",
    ".fixed-nature-card-item",
    ".view-button-domestic",
    "View More",
    "Show Less"
  );

});