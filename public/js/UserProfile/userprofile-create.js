// UserProfile Create Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createProfileForm');
    const submitBtn = document.getElementById('submitBtn');
    const userSelect = document.getElementById('user_id');
    const staffSelect = document.getElementById('staff_id');

    // Load users and staff options
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
            Creating...
        `;

        try {
            const formData = new FormData(form);
            const profileData = {
                user_id: parseInt(formData.get('user_id')),
                staff_id: parseInt(formData.get('staff_id')),
                nama_lengkap: formData.get('nama_lengkap'),
                nrp: formData.get('nrp') || null,
                alamat: formData.get('alamat') || null,
                foto: formData.get('foto') ? await fileToBase64(formData.get('foto')) : null
            };

            const result = await UserProfileAPI.createUserProfile(profileData);

            showNotification('Profile created successfully!', 'success');

            // Redirect to index page after short delay
            setTimeout(() => {
                window.location.href = '/userprofile';
            }, 1500);

        } catch (error) {
            console.error('Error creating profile:', error);
            showNotification('Failed to create profile. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Create Profile
            `;
        }
    });

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
            // Fetch staff data from API
            const response = await fetch('/api/staff');
            if (!response.ok) throw new Error('Network response was not ok');
            const staff = await response.json();

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
        const userId = document.getElementById('user_id').value;
        const staffId = document.getElementById('staff_id').value;
        const namaLengkap = document.getElementById('nama_lengkap').value.trim();

        if (!userId) {
            showNotification('Please select a user.', 'error');
            return false;
        }

        if (!staffId) {
            showNotification('Please select staff.', 'error');
            return false;
        }

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
