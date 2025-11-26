// Staff Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editStaffForm');
    const submitBtn = document.getElementById('submitBtn');
    const userSelect = document.getElementById('user_id');
    const levelSelect = document.getElementById('level_id');

    const staffId = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];

    await loadUsers();
    await loadLevels();
    await loadStaffData(staffId);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Updating...';

        try {
            const formData = new FormData(form);
            const staffData = {
                id: staffId,
                user_id: parseInt(formData.get('user_id')),
                level_id: parseInt(formData.get('level_id')),
                hire_date: formData.get('hire_date'),
                salary: parseFloat(formData.get('salary')) || 0,
                points: parseInt(formData.get('points')) || 0
            };

            const mutation = `
                mutation UpdateStaff($input: UpdateStaffInput!) {
                    updateStaff(input: $input) {
                        id
                        user_id
                        level_id
                        hire_date
                        salary
                        points
                        updated_at
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
                showNotification('Staff updated successfully!', 'success');
                setTimeout(() => {
                    window.location.href = '/staff';
                }, 1500);
            } else {
                showNotification('Error updating staff.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Update Staff';
            }
        } catch (error) {
            console.error('Error updating staff:', error);
            showNotification('Failed to update staff. Please try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Update Staff';
        }
    });

    async function loadStaffData(id) {
        try {
            const query = `
                query GetStaff($id: ID!) {
                    staff(id: $id) {
                        id
                        user_id
                        level_id
                        hire_date
                        salary
                        points
                        user { id name }
                        level { id name }
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
                    query,
                    variables: { id }
                })
            });

            const result = await response.json();
            const staff = result.data?.staff;

            if (staff) {
                document.getElementById('user_id').value = staff.user_id;
                document.getElementById('level_id').value = staff.level_id;
                document.getElementById('hire_date').value = staff.hire_date;
                document.getElementById('salary').value = staff.salary;
                document.getElementById('points').value = staff.points;
            }
        } catch (error) {
            console.error('Error loading staff data:', error);
            showNotification('Failed to load staff data.', 'error');
        }
    }

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
