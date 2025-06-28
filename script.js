document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const agendaItems = document.querySelectorAll(".agenda-item");
  const backButtons = document.querySelectorAll(".back-to-agenda");
  let currentSlide = 0;
  let touchStartX = 0;
  let touchEndX = 0;

  // Initialize the first slide
  showSlide(currentSlide);

  // Navigation dots functionality
  dots.forEach((dot) => {
    dot.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      const slideIndex = Array.from(slides).findIndex(
        (slide) => slide.id === target
      );
      if (slideIndex !== -1) {
        currentSlide = slideIndex;
        showSlide(currentSlide);
      }
    });
  });

  // Next button
  nextBtn.addEventListener("click", function () {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  });

  // Previous button
  prevBtn.addEventListener("click", function () {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  });

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    } else if (e.key === "ArrowLeft") {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    } else if (e.key === "Escape") {
      // Go back to agenda from any slide
      const agendaIndex = Array.from(slides).findIndex(
        (slide) => slide.id === "agenda"
      );
      if (agendaIndex !== -1) {
        currentSlide = agendaIndex;
        showSlide(currentSlide);
      }
    }
  });

  // Touch events for mobile swipe
  document.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    // Minimum swipe distance
    if (Math.abs(diff) < 50) return;

    if (diff > 0) {
      // Swipe left - next slide
      currentSlide = (currentSlide + 1) % slides.length;
    } else {
      // Swipe right - previous slide
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    }
    showSlide(currentSlide);
  }

  // Agenda items click
  agendaItems.forEach((item) => {
    item.addEventListener("click", function () {
      const target = this.getAttribute("data-target");
      const slideIndex = Array.from(slides).findIndex(
        (slide) => slide.id === target
      );
      if (slideIndex !== -1) {
        currentSlide = slideIndex;
        showSlide(currentSlide);
      }
    });
  });

  // Back to agenda buttons
  backButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const agendaIndex = Array.from(slides).findIndex(
        (slide) => slide.id === "agenda"
      );
      if (agendaIndex !== -1) {
        currentSlide = agendaIndex;
        showSlide(currentSlide);
      }
    });
  });

  // Show specific slide
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    // Remove active class from all dots
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });

    // Show current slide
    slides[index].classList.add("active");

    // Activate corresponding dot
    const slideId = slides[index].id;
    const correspondingDot = Array.from(dots).find(
      (dot) => dot.getAttribute("data-target") === slideId
    );
    if (correspondingDot) {
      correspondingDot.classList.add("active");
    }

    // Update current slide index
    currentSlide = index;

    // Scroll to top of slide
    slides[index].scrollTop = 0;
  }
});
