// Proyek Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editProyekForm');
    const submitBtn = document.getElementById('submitBtn');
    const proyekId = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];

    await loadProyekData(proyekId);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Updating...';

        try {
            const formData = new FormData(form);
            const proyekData = {
                id: proyekId,
                name: formData.get('name'),
                description: formData.get('description') || null,
                start_date: formData.get('start_date'),
                end_date: formData.get('end_date'),
                status: formData.get('status') || 'active'
            };

            const mutation = `
                mutation UpdateProyek($input: UpdateProyekInput!) {
                    updateProyek(input: $input) {
                        id
                        name
                        status
                    }
                }
            `;

            const response = await fetch('/graphql', {
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
                showNotification('Project updated successfully!', 'success');
                setTimeout(() => window.location.href = '/proyek', 1500);
            }
        } catch (error) {
            showNotification('Failed to update project.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Update Project';
        }
    });

    async function loadProyekData(id) {
        try {
            const query = `
                query GetProyek($id: ID!) {
                    proyek(id: $id) {
                        id
                        name
                        description
                        start_date
                        end_date
                        status
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query, variables: { id } })
            });

            const result = await response.json();
            const proyek = result.data?.proyek;

            if (proyek) {
                document.getElementById('name').value = proyek.name;
                document.getElementById('description').value = proyek.description || '';
                document.getElementById('start_date').value = proyek.start_date;
                document.getElementById('end_date').value = proyek.end_date;
                document.getElementById('status').value = proyek.status;
            }
        } catch (error) {
            showNotification('Failed to load project data.', 'error');
        }
    }
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
