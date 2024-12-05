export function renderProfile(profileData, container) {
    container.innerHTML = `
            <div id="profile-banner" style="background-image: url('${profileData.banner?.url || 'https://via.placeholder.com/1200x300'}');"></div>
            <div id="profile-content">
                <div id="profile-avatar">
                    <img src="${profileData.avatar?.url || 'https://via.placeholder.com/150'}" alt="${profileData.avatar?.alt || 'Profile Avatar'}" />
                </div>
                <div id="profile-username">
                    <h2>${profileData.name || 'Username'}</h2>
                </div>
                <div id="profile-credits">
                    <p>Credits: <span>${profileData.credits || 0}</span></p>
                </div>
            </div>
    `;
}
