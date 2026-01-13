
  window.addEventListener("DOMContentLoaded", function() {
    const paragraphs = document.querySelectorAll(".p_text");
    paragraphs.forEach((p, i) => {
      setTimeout(() => {
        p.classList.add("fade-in");
      }, i * 500); // stagger fade-in if multiple
    });
  });


