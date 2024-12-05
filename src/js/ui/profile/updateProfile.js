import { updateProfile } from '../../api/profile/update';
import { getLoggedInUserID } from '../../utils/loggedInUserID';

export async function onUpdateProfile(event) {
    event.preventDefault();

    const avatarUrl = document.getElementById('avatar-url').value || null;
    const bannerUrl = document.getElementById('banner-url').value || null;

    try {
        const username = await getLoggedInUserID();
        const result = await updateProfile(avatarUrl, bannerUrl, username);

        if (result) {
            alert('Profile updated successfully');
            location.reload(); 
        }
    } catch (error) {
        console.error(error);
        alert(`Profile update failed: ${error.message}`);
    }
}

