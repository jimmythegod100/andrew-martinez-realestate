(function () {
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".site-nav");
  var toggle = document.querySelector(".nav-toggle");

  function onScroll() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 48);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  var searchForm = document.getElementById("hero-search");
  var grid = document.getElementById("properties-grid");
  var emptyMsg = document.getElementById("properties-empty");

  function filterProperties() {
    if (!grid) return;
    var location = (document.getElementById("search-location") || {}).value || "";
    var type = (document.getElementById("search-type") || {}).value || "";
    var budget = (document.getElementById("search-budget") || {}).value || "";
    var cards = grid.querySelectorAll(".property-card");
    var visible = 0;

    cards.forEach(function (card) {
      var locMatch =
        !location ||
        location === "central-valley" ||
        card.dataset.location === location;
      var match =
        locMatch &&
        (!type || card.dataset.type === type) &&
        (!budget || card.dataset.budget === budget);
      card.classList.toggle("is-hidden", !match);
      if (match) visible += 1;
    });

    if (emptyMsg) {
      emptyMsg.hidden = visible > 0;
    }
  }

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var properties = document.getElementById("properties");
      if (properties) {
        properties.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      filterProperties();
    });
  }
})();
