// Level Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editLevelForm');
    const submitBtn = document.getElementById('submitBtn');
    const levelId = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];

    await loadLevelData(levelId);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Updating...';

        try {
            const formData = new FormData(form);
            const levelData = {
                id: levelId,
                name: formData.get('name'),
                description: formData.get('description') || null
            };

            const mutation = `
                mutation UpdateLevel($input: UpdateLevelInput!) {
                    updateLevel(input: $input) {
                        id
                        name
                        description
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
                    variables: { input: levelData }
                })
            });

            const result = await response.json();
            if (result.data) {
                showNotification('Level updated successfully!', 'success');
                setTimeout(() => window.location.href = '/level', 1500);
            }
        } catch (error) {
            showNotification('Failed to update level.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Update Level';
        }
    });

    async function loadLevelData(id) {
        try {
            const query = `
                query GetLevel($id: ID!) {
                    level(id: $id) {
                        id
                        name
                        description
                    }
                }
            `;

            const response = await fetch(window.API_URL || '/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query, variables: { id } })
            });

            const result = await response.json();
            const level = result.data?.level;

            if (level) {
                document.getElementById('name').value = level.name;
                document.getElementById('description').value = level.description || '';
            }
        } catch (error) {
            showNotification('Failed to load level data.', 'error');
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
