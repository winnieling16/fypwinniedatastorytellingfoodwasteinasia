document.getElementById("nextToTimeline").addEventListener("click", () => {
  document.getElementById("timeline_section").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("nextToModule1").addEventListener("click", () => {
  document.getElementById("module1").scrollIntoView({ behavior: "smooth" });
});

// Example: dataset filter interaction (placeholder)
document.getElementById("countryFilter").addEventListener("change", () => {
  const country = document.getElementById("countryFilter").value;
  console.log("Filter by country:", country);
});
document.getElementById("yearFilter").addEventListener("change", () => {
  const year = document.getElementById("yearFilter").value;
  console.log("Filter by year:", year);
});
