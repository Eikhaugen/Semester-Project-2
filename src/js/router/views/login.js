import { onLogin } from "../../ui/auth/login";

const form = document.getElementById("login-form")

form.addEventListener("submit", onLogin);