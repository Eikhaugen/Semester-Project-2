import { onRegister } from "../../ui/auth/register";
console.log("Register page")

const form = document.getElementById("signup-form")

form.addEventListener("submit", onRegister);