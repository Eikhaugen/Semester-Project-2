/**
 * Toggles Tailwind classes for a menu.
 * 
 * @param {HTMLElement} toggleButton - The button that triggers the menu toggle.
 * @param {HTMLElement} menu - The menu element to toggle.
 */
export function toggleMenu(toggleButton, menu) {
    if (!toggleButton || !menu) {
        console.error("toggleMenu: Missing toggleButton or menu element.");
        return;
    }

    toggleButton.addEventListener("click", () => {
        menu.classList.toggle("hidden");
        menu.classList.toggle("block");
    });
}
