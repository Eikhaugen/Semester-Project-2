import { setLogoutListener } from '../../ui/auth/logout';
import { toggleMenu } from '../../ui/toggleMenu';

const navbarToggle = document.getElementById("navbar-toggle");
const navMenu = document.getElementById("nav-menu");

toggleMenu(navbarToggle, navMenu);


document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
});