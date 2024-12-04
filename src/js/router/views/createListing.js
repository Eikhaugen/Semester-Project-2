import { setLogoutListener } from '../../ui/auth/logout';
import { authGuard } from "../../utils/authGuard";
import { toggleMenu } from '../../ui/toggleMenu';

const navbarToggle = document.getElementById("navbar-toggle");
const navMenu = document.getElementById("nav-menu");

toggleMenu(navbarToggle, navMenu);

authGuard();

document.addEventListener('DOMContentLoaded', () => {
    setLogoutListener();
});