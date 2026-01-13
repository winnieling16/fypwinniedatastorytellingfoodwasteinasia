        // Module 2 Specific Observer Helper
        function initModule2Observers(section) {
            if (!section) return;
            const fadeSection = section.querySelector(".fade_text_TLPPM");
            if (fadeSection) {
                const obs = new IntersectionObserver(entries => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("visible");
                            obs.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.3 });
                obs.observe(fadeSection);
            }
        }
   document.getElementById("loadModule3").addEventListener("click", function () {
    console.log("Button clicked!");
});


