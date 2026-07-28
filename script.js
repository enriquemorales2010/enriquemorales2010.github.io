(function () {
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var stored = localStorage.getItem("theme");
  if (stored) {
    root.setAttribute("data-theme", stored);
  }

  themeToggle.addEventListener("click", function () {
    var isDark = root.getAttribute("data-theme") === "dark";
    var next = isDark ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  var navToggle = document.getElementById("navToggle");
  var navLinks = document.getElementById("navLinks");
  navToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxClose = document.getElementById("lightboxClose");

  document.querySelectorAll(".gallery-card").forEach(function (card) {
    card.addEventListener("click", function () {
      var full = card.getAttribute("data-full");
      var alt = card.querySelector("img").getAttribute("alt");
      lightboxImg.setAttribute("src", full);
      lightboxImg.setAttribute("alt", alt);
      lightbox.hidden = false;
    });
  });

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.setAttribute("src", "");
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  var projectModal = document.getElementById("projectModal");
  var projectModalBody = document.getElementById("projectModalBody");
  var projectModalClose = document.getElementById("projectModalClose");

  document.querySelectorAll(".project-link").forEach(function (link) {
    link.addEventListener("click", function () {
      var templateId = link.getAttribute("data-project");
      var template = document.getElementById(templateId);
      if (!template) {
        return;
      }
      projectModalBody.innerHTML = "";
      projectModalBody.appendChild(template.content.cloneNode(true));
      projectModal.hidden = false;
    });
  });

  function closeProjectModal() {
    projectModal.hidden = true;
  }

  projectModalClose.addEventListener("click", closeProjectModal);
  projectModal.addEventListener("click", function (event) {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeLightbox();
      closeProjectModal();
    }
  });
})();
