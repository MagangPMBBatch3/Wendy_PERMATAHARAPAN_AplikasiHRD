// Proyek Create Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createProyekForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating...';

        try {
            const formData = new FormData(form);
            const proyekData = {
                name: formData.get('name'),
                description: formData.get('description') || null,
                start_date: formData.get('start_date'),
                end_date: formData.get('end_date'),
                status: formData.get('status') || 'active'
            };

            const mutation = `
                mutation CreateProyek($input: CreateProyekInput!) {
                    createProyek(input: $input) {
                        id
                        name
                        status
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
                    variables: { input: proyekData }
                })
            });

            const result = await response.json();
            if (result.data) {
                showNotification('Project created successfully!', 'success');
                setTimeout(() => window.location.href = '/proyek', 1500);
            }
        } catch (error) {
            showNotification('Failed to create project.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create Project';
        }
    });
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
