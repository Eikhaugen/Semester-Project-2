export function renderProfile(profileData, container) {
    container.innerHTML = "";

    const profileContainer = document.createElement("div");
    profileContainer.id = "profile-container";

    const profileBanner = document.createElement("div");
    profileBanner.id = "profile-banner";
    profileBanner.style.backgroundImage = `url(${profileData.banner?.url || "https://via.placeholder.com/1200x300"})`;
    profileContainer.appendChild(profileBanner);

    const profileContent = document.createElement("div");
    profileContent.id = "profile-content";

    const profileAvatar = document.createElement("div");
    profileAvatar.id = "profile-avatar";
    const avatarImg = document.createElement("img");
    avatarImg.src = profileData.avatar?.url || "https://via.placeholder.com/150";
    avatarImg.alt = profileData.avatar?.alt || "Profile Avatar";
    profileAvatar.appendChild(avatarImg);
    profileContent.appendChild(profileAvatar);

    const profileUsername = document.createElement("div");
    profileUsername.id = "profile-username";
    const usernameHeading = document.createElement("h2");
    usernameHeading.textContent = profileData.name || "Username";
    profileUsername.appendChild(usernameHeading);
    profileContent.appendChild(profileUsername);

    const profileCredits = document.createElement("div");
    profileCredits.id = "profile-credits";
    const creditsText = document.createElement("p");
    creditsText.innerHTML = `Credits: <span>${profileData.credits || 0}</span>`;
    profileCredits.appendChild(creditsText);
    profileContent.appendChild(profileCredits);

    const editProfileBtnContainer = document.createElement("div");
    editProfileBtnContainer.id = "edit-profile-btn-container";
    const editProfileBtn = document.createElement("button");
    editProfileBtn.id = "edit-profile-btn";
    editProfileBtn.textContent = "Edit Profile";
    editProfileBtnContainer.appendChild(editProfileBtn);
    profileContent.appendChild(editProfileBtnContainer);

    profileContainer.appendChild(profileContent);

    container.appendChild(profileContainer);
}
