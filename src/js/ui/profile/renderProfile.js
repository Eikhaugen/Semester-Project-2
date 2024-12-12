export function renderProfile(profileData, container) {
    container.innerHTML = `
        <div id="profile-banner" class="w-full h-40 bg-cover bg-center rounded-lg" 
             style="background-image: url('${profileData.banner?.url || 'https://via.placeholder.com/1200x300'}');">
        </div>
        <div class="relative mt-6">
            <div id="profile-avatar" class="w-24 h-24 rounded-full bg-gray-300 border-4 border-white absolute -top-12 left-4 shadow-md">
                <img 
                    src="${profileData.avatar?.url || 'https://via.placeholder.com/150'}" 
                    alt="${profileData.avatar?.alt || 'Profile Avatar'}" 
                    class="w-full h-full rounded-full object-cover"
                />
            </div>

          <div class="ml-32">
            <div class="flex justify-between items-center">
              <div id="profile-username">
                <h2 class="text-2xl font-semibold text-gray-900">${profileData.name || 'Username'}</h2>
              </div>
                <button 
                id="edit-profile-btn" 
                class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center justify-center"
                aria-label="Edit Profile"
                title="Edit Profile"
                >
                <i class="fa-solid fa-gear block lg:hidden" aria-hidden="true"></i>
                <span class="hidden lg:inline">Edit Profile</span>
                </button>

            </div>
            <p id="profile-bio" class="mt-2 text-gray-700">
              ${profileData.bio || ''}
            </p>
          </div>
        </div>
    `;
  }
  