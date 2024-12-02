export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./views/home.js");
        break;
      case "/auth/login/":
        await import("./views/login.js");
        break;
      case "/auth/register/":
        await import("./views/register.js");
        break;
      case "/listing/":
        await import("./views/listing.js");
        break;
      case "/create/":
        await import("./views/createListing.js");
        break;
      case "/profile/":
        await import("./views/profile.js");
        break;
      default:
        await import("./views/notFound.js");
    }
  }