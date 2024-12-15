export function renderProfile(profileData, container) {
  container.innerHTML = "";

  // Banner
  const banner = document.createElement("div");
  banner.id = "profile-banner";
  banner.className = "w-full h-40 bg-cover bg-center rounded-lg";
  banner.style.backgroundImage = `url('${profileData.banner?.url || "https://via.placeholder.com/1200x300"}')`;

  // Profile Wrapper
  const profileWrapper = document.createElement("div");
  profileWrapper.className = "relative mt-6";

  // Avatar
  const avatar = document.createElement("div");
  avatar.id = "profile-avatar";
  avatar.className = "w-24 h-24 rounded-full bg-gray-300 border-4 border-white absolute -top-12 left-4 shadow-md";

  const avatarImg = document.createElement("img");
  avatarImg.src = profileData.avatar?.url || "https://via.placeholder.com/150";
  avatarImg.alt = profileData.avatar?.alt || "Profile Avatar";
  avatarImg.className = "w-full h-full rounded-full object-cover";

  avatar.appendChild(avatarImg);

  // Profile Content Container
  const contentContainer = document.createElement("div");
  contentContainer.className = "ml-32";

  // Profile Header
  const header = document.createElement("div");
  header.className = "flex justify-between items-center";

  // Username
  const usernameDiv = document.createElement("div");
  usernameDiv.id = "profile-username";

  const username = document.createElement("h2");
  username.textContent = profileData.name || "Username";
  username.className = "text-2xl md:text-3xl font-semibold text-gray-900";

  usernameDiv.appendChild(username);

  // Credits
  const creditsDiv = document.createElement("div");
  const creditsSpan = document.createElement("span");
  creditsSpan.textContent = `Your credits: ${profileData.credits}`;
  creditsSpan.className = "text-sm md:text-base text-gray-700";

  creditsDiv.appendChild(creditsSpan);

  // Edit Profile Button
  const editButton = document.createElement("button");
  editButton.id = "edit-profile-btn";
  editButton.className = "px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center text-sm md:text-base";
  editButton.setAttribute("aria-label", "Edit Profile");
  editButton.setAttribute("title", "Edit Profile");

  const gearIcon = document.createElement("i");
  gearIcon.className = "fa-solid fa-gear block lg:hidden";
  gearIcon.setAttribute("aria-hidden", "true");

  const buttonText = document.createElement("span");
  buttonText.textContent = "Edit Profile";
  buttonText.className = "hidden lg:inline";

  editButton.appendChild(gearIcon);
  editButton.appendChild(buttonText);

  // Append elements to header
  header.appendChild(usernameDiv);
  header.appendChild(creditsDiv);
  header.appendChild(editButton);

  // Profile Bio
  const bio = document.createElement("p");
  bio.id = "profile-bio";
  bio.textContent = profileData.bio || "";
  bio.className = "mt-2 text-gray-700 text-sm md:text-base";

  // Assemble the content container
  contentContainer.appendChild(header);
  contentContainer.appendChild(bio);

  // Append all elements to the profile wrapper
  profileWrapper.appendChild(avatar);
  profileWrapper.appendChild(contentContainer);

  // Append banner and profile wrapper to the container
  container.appendChild(banner);
  container.appendChild(profileWrapper);
}
