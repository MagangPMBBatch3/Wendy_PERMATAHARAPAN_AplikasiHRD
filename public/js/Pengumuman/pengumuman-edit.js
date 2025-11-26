// Pengumuman Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editPengumumanForm');
    const id = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];

    if (form) {
        const query = `query GetPengumuman($id: ID!) { pengumuman(id: $id) { id title content date } }`;
        const response = await fetch(window.API_URL || '/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query, variables: { id } })
        });
        const result = await response.json();
        const pengumuman = result.data?.pengumuman;
        if (pengumuman) {
            document.getElementById('title').value = pengumuman.title;
            document.getElementById('content').value = pengumuman.content;
            document.getElementById('date').value = pengumuman.date;
        }

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await PengumumanApp.save('editPengumumanForm', false);
        });
    }
});
