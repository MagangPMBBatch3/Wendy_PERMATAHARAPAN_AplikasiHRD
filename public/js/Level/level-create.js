// Level Create Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createLevelForm');
    const submitBtn = document.getElementById('submitBtn');

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating...';

        try {
            const formData = new FormData(form);
            const levelData = {
                name: formData.get('name'),
                description: formData.get('description') || null
            };

            const mutation = `
                mutation CreateLevel($input: CreateLevelInput!) {
                    createLevel(input: $input) {
                        id
                        name
                        description
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
                    variables: { input: levelData }
                })
            });

            const result = await response.json();
            if (result.data) {
                showNotification('Level created successfully!', 'success');
                setTimeout(() => window.location.href = '/level', 1500);
            }
        } catch (error) {
            showNotification('Failed to create level.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create Level';
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
