/**
 * Initializes the toggle menu event listener.
 * Toggles the visibility of spans and adjusts the width of the nav menu.
 */
export function initToggleMenu() {
    const toggleMenuBtn = document.getElementById("toggleMenuBtn");
    const navMenu = document.getElementById("nav-menu");
    const menuSpans = navMenu.querySelectorAll("span");
    const sortingContainer = document.getElementById("sortingContainer")
  
    if (!toggleMenuBtn || !navMenu) {
      console.error("Toggle Menu Initialization failed: Elements not found.");
      return;
    }
  
    toggleMenuBtn.addEventListener("click", () => {
      // Toggle visibility of the spans
      menuSpans.forEach((span) => {
        span.classList.toggle("hidden");
        span.classList.toggle("block");
      });
  
      // Toggle the width classes on the nav menu
      navMenu.classList.toggle("w-8");
      navMenu.classList.toggle("w-fit");

      sortingContainer.classList.toggle("hidden")
      sortingContainer.classList.toggle("flex")
    });
  }
  