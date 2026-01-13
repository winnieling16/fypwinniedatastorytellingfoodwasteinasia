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

// document.addEventListener("DOMContentLoaded", function() {
    
//     /* --- PART 1: FADE TEXT ON SCROLL (Fixed) --- */
//     const textContainer = document.querySelector('.text-container');
    
//     if(textContainer) {
//         window.addEventListener('scroll', () => {
//             // I removed 'sceneProgress' because it was undefined and crashing the script.
//             // We calculate progress based on scroll position relative to window height.
//             let scrollPosition = window.scrollY;
//             let windowHeight = window.innerHeight;
            
//             // Simple logic: As you scroll down 500px, opacity goes from 1 to 0
//             let opacity = 1 - (scrollPosition / 500);
            
//             // Ensure opacity stays between 0 and 1
//             if (opacity < 0) opacity = 0;
//             if (opacity > 1) opacity = 1;

//             textContainer.style.opacity = opacity;
//             textContainer.style.transform = `translateY(${20 * (1 - opacity)}px)`;
//         });
//     }



// document.addEventListener("DOMContentLoaded", () => {
//     // Wait for module 2 to be injected into DOM
//     const observer = new MutationObserver(() => {
//         const btn = document.getElementById("btnModule3");
//         if (btn) {
//             console.log("👍 Module 3 button found, activating click event");

//             btn.addEventListener("click", () => {
//                 console.log("➡️ Redirecting to module_3.html...");
//                 window.location.href = "module_3.html";
//             });

//             observer.disconnect(); // stop observing once found
//         }
//     });

//     observer.observe(document.body, { childList: true, subtree: true });



//     /* --- PART 2: THE SCROLL TRIGGER FOR HIDDEN CONTENT --- */
    
//     // 1. Select the elements
//     const triggerElement = document.getElementById('triggerPoint');
//     const contentToReveal = document.getElementById('newContentSection');

//     // Debug check: Check your Console (F12) to see if these appear
//     if (!triggerElement) console.error("Could not find element with id 'triggerPoint'");
//     if (!contentToReveal) console.error("Could not find element with id 'newContentSection'");

//     if (triggerElement && contentToReveal) {
//         // 2. Create the Observer
//         const observer = new IntersectionObserver((entries) => {
//             entries.forEach(entry => {
//                 // If the trigger text is in the viewport
//                 if (entry.isIntersecting) {
//                     console.log("Trigger activated!"); // Visual proof in console
                    
//                     // Add the class that makes the content visible
//                     contentToReveal.classList.add('visible');
                    
//                     // Stop observing once triggered (so it doesn't fade out again)
//                     observer.unobserve(entry.target);
//                 }
//             });
//         }, {
//             root: null,
//             threshold: 0.1 // CHANGED: Trigger as soon as 10% of the arrow is visible (easier to trigger)
//         });

//         // 3. Start watching
//         observer.observe(triggerElement);
//     }
// });

// function loadNextSection2() {
//     if (sectionLoaded) return;
//     sectionLoaded = true;
//     console.log("Fetching Module 2...");

//     const nextSection2 = document.getElementById('nextSection2');
    
//     // REMOVE: nextSection2.scrollIntoView({ behavior: 'smooth', block: 'start' });

//     // Execute the core logic immediately (no need to wait for a scroll that no longer happens)
//     (async () => {
//         const currentScrollY = window.scrollY; // Capture scroll position just before injection

//         try {
//             const response = await fetch('module_3_pg.html');
//             if (!response.ok) throw new Error("Network response was not ok");
//             const html = await response.text();

//             // 1. Inject HTML and set up initial state
//             nextSection2.innerHTML = html;
//             nextSection2.style.opacity = 0;
//             nextSection2.style.transition = 'opacity 1s ease-out';

//             // 2. Initialize dynamic elements
//             initModule2Observers(nextSection2);
//             initModule2Charts();
//             initModule2GSAP();

//             // 3. Wait for content/iframes to settle, then refresh layout-dependent logic
//             await waitForContentToSettle(nextSection2, 3000);

//             requestAnimationFrame(() => {
//                 if (window.ScrollTrigger) {
//                     ScrollTrigger.refresh();
//                 }
                
//                 // 4. RESTORE SCROLL (now optional, but keeps page position stability)
//                 // window.scrollTo({ top: currentScrollY, behavior: 'auto' });

//                 // 5. Scroll to the START of the new section (Module 2 content)
//                 nextSection2.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
//                 // 6. Fade in the new section
//                 nextSection2.style.opacity = 1;
//                 console.log("Module 2 HTML injected, scrolled, and faded in.");
//             });
//         } catch (err) {
//             console.error('Failed to load next section:', err);
//             sectionLoaded = false;
//         }
//     })(); // Execute the async function immediately
// }

