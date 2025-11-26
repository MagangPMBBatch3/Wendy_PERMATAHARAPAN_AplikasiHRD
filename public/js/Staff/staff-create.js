// Staff Create Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createStaffForm');
    const submitBtn = document.getElementById('submitBtn');
    const userSelect = document.getElementById('user_id');
    const levelSelect = document.getElementById('level_id');

    loadUsers();
    loadLevels();

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
            const staffData = {
                user_id: parseInt(formData.get('user_id')),
                level_id: parseInt(formData.get('level_id')),
                hire_date: formData.get('hire_date'),
                salary: parseFloat(formData.get('salary')) || 0,
                points: parseInt(formData.get('points')) || 0
            };

            const mutation = `
                mutation CreateStaff($input: CreateStaffInput!) {
                    createStaff(input: $input) {
                        id
                        user_id
                        level_id
                        hire_date
                        salary
                        points
                        created_at
                    }
                }
            `;

            const response = await fetch(window.API_URL || '/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { input: staffData }
                })
            });

            const result = await response.json();

            if (result.data) {
                showNotification('Staff created successfully!', 'success');
                setTimeout(() => {
                    window.location.href = '/staff';
                }, 1500);
            } else {
                showNotification('Error creating staff.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Create Staff';
            }
        } catch (error) {
            console.error('Error creating staff:', error);
            showNotification('Failed to create staff. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create Staff';
        }
    });

    async function loadUsers() {
        try {
            const query = `
                query GetAllUsers {
                    allUser {
                        data {
                            id
                            name
                            email
                        }
                    }
                }
            `;

            const response = await fetch(window.API_URL || '/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query })
            });

            const result = await response.json();
            const users = result.data?.allUser?.data || [];

            users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = `${user.name} (${user.email})`;
                userSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    async function loadLevels() {
        try {
            const query = `
                query GetAllLevel {
                    allLevel {
                        data {
                            id
                            name
                        }
                    }
                }
            `;

            const response = await fetch(window.API_URL || '/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query })
            });

            const result = await response.json();
            const levels = result.data?.allLevel?.data || [];

            levels.forEach(level => {
                const option = document.createElement('option');
                option.value = level.id;
                option.textContent = level.name;
                levelSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading levels:', error);
        }
    }

    function validateForm() {
        const userId = document.getElementById('user_id').value;
        const levelId = document.getElementById('level_id').value;
        const hireDate = document.getElementById('hire_date').value;

        if (!userId || !levelId || !hireDate) {
            showNotification('Please fill all required fields.', 'error');
            return false;
        }
        return true;
    }
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
