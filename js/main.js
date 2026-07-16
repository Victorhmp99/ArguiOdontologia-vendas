(function () {
  var WHATSAPP_NUMBER = "5561993860609";
  var WHATSAPP_MESSAGE = "Olá! Vi o site da Argui Odontologia e gostaria de agendar uma avaliação.";
  var waLink = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

  document.querySelectorAll("[data-whatsapp]").forEach(function (el) {
    el.setAttribute("href", waLink);
    el.setAttribute("target", "_blank");
    el.setAttribute("rel", "noopener");
  });

  var toggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      nav.classList.toggle("is-open");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { nav.classList.remove("is-open"); });
    });
  }

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector("[data-carousel-track]");
    var slides = Array.prototype.slice.call(track.children);
    var prevBtn = carousel.querySelector("[data-carousel-prev]");
    var nextBtn = carousel.querySelector("[data-carousel-next]");
    var dotsWrap = carousel.querySelector("[data-carousel-dots]");
    if (!track || !slides.length) return;

    var dots = slides.map(function (_, i) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.setAttribute("aria-label", "Ir para foto " + (i + 1));
      if (i === 0) dot.classList.add("is-active");
      dot.addEventListener("click", function () { scrollToSlide(i); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function scrollToSlide(i) {
      slides[i].scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }

    function activeIndex() {
      var trackLeft = track.getBoundingClientRect().left;
      var closest = 0;
      var closestDist = Infinity;
      slides.forEach(function (slide, i) {
        var dist = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        if (dist < closestDist) { closestDist = dist; closest = i; }
      });
      return closest;
    }

    function updateDots() {
      var i = activeIndex();
      dots.forEach(function (dot, idx) { dot.classList.toggle("is-active", idx === i); });
    }

    var tick;
    track.addEventListener("scroll", function () {
      clearTimeout(tick);
      tick = setTimeout(updateDots, 100);
    });

    if (prevBtn) prevBtn.addEventListener("click", function () {
      scrollToSlide(Math.max(0, activeIndex() - 1));
    });
    if (nextBtn) nextBtn.addEventListener("click", function () {
      scrollToSlide(Math.min(slides.length - 1, activeIndex() + 1));
    });
  });
})();
