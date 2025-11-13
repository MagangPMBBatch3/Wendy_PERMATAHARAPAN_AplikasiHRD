// UserProfile Edit Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editProfileForm');
    const submitBtn = document.getElementById('submitBtn');
    const userSelect = document.getElementById('user_id');
    const staffSelect = document.getElementById('staff_id');
    const currentPhotoContainer = document.getElementById('currentPhotoContainer');

    // Get profile ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = window.location.pathname.split('/').pop();

    // Load profile data and populate form
    loadProfileData(profileId);
    loadUsers();
    loadStaff();

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating...
        `;

        try {
            const formData = new FormData(form);
            const profileData = {
                user_id: parseInt(formData.get('user_id')) || undefined,
                staff_id: parseInt(formData.get('staff_id')) || undefined,
                nama_lengkap: formData.get('nama_lengkap') || undefined,
                nrp: formData.get('nrp') || undefined,
                alamat: formData.get('alamat') || undefined,
                foto: formData.get('foto') ? await fileToBase64(formData.get('foto')) : undefined
            };

            // Remove undefined values
            Object.keys(profileData).forEach(key => {
                if (profileData[key] === undefined) {
                    delete profileData[key];
                }
            });

            const result = await UserProfileAPI.updateUserProfile(profileId, profileData);

            showNotification('Profile updated successfully!', 'success');

            // Redirect to show page after short delay
            setTimeout(() => {
                window.location.href = `/userprofile/${profileId}`;
            }, 1500);

        } catch (error) {
            console.error('Error updating profile:', error);
            showNotification('Failed to update profile. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Update Profile
            `;
        }
    });

    // Load profile data
    async function loadProfileData(id) {
        try {
            const profile = await UserProfileAPI.getUserProfile(id);

            if (profile) {
                // Populate form fields
                document.getElementById('user_id').value = profile.user_id;
                document.getElementById('staff_id').value = profile.staff_id;
                document.getElementById('nama_lengkap').value = profile.nama_lengkap || '';
                document.getElementById('nrp').value = profile.nrp || '';
                document.getElementById('alamat').value = profile.alamat || '';

                // Display current photo if exists
                if (profile.foto) {
                    currentPhotoContainer.innerHTML = `
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">Current Photo</label>
                            <img src="${profile.foto}" alt="Current profile photo" class="w-32 h-32 object-cover rounded-lg border border-gray-300">
                        </div>
                    `;
                }
            } else {
                showNotification('Profile not found.', 'error');
                window.location.href = '/userprofile';
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            showNotification('Failed to load profile data.', 'error');
        }
    }

    // Load users for dropdown
    async function loadUsers() {
        try {
            // This would need a separate API call to get users
            // For now, we'll add some dummy options
            const users = [
                { id: 1, name: 'John Doe', email: 'john@example.com' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
            ];

            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = `${user.name} (${user.email})`;
                userSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading users:', error);
            showNotification('Failed to load users.', 'error');
        }
    }

    // Load staff for dropdown
    async function loadStaff() {
        try {
            // This would need a separate API call to get staff
            // For now, we'll add some dummy options
            const staff = [
                { id: 1, nama: 'Staff One' },
                { id: 2, nama: 'Staff Two' }
            ];

            staff.forEach(staffMember => {
                const option = document.createElement('option');
                option.value = staffMember.id;
                option.textContent = staffMember.nama;
                staffSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading staff:', error);
            showNotification('Failed to load staff.', 'error');
        }
    }

    // Form validation
    function validateForm() {
        const namaLengkap = document.getElementById('nama_lengkap').value.trim();

        if (!namaLengkap) {
            showNotification('Full name is required.', 'error');
            return false;
        }

        return true;
    }

    // Convert file to base64
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }
});
