// Pengumuman List, Create, Edit (all-in-one simplified)
const PengumumanApp = {
    async loadList(page = 1, search = '') {
        const tableBody = document.getElementById('pengumumanTableBody');
        if (!tableBody) return;

        try {
            const query = `
                query GetAllPengumuman($page: Int, $search: String) {
                    allPengumuman(page: $page, search: $search) {
                        data { id title content date created_at }
                        paginatorInfo { currentPage lastPage }
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query, variables: { page, search } })
            });

            const result = await response.json();
            const data = result.data?.allPengumuman;

            if (data?.data?.length > 0) {
                tableBody.innerHTML = '';
                data.data.forEach(p => {
                    tableBody.innerHTML += `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm font-medium">${p.id}</td>
                            <td class="px-6 py-4 text-sm">${p.title}</td>
                            <td class="px-6 py-4 text-sm">${p.content?.substring(0, 50)}...</td>
                            <td class="px-6 py-4 text-sm">${new Date(p.date).toLocaleDateString()}</td>
                            <td class="px-6 py-4 text-sm space-x-2">
                                <a href="/pengumuman/${p.id}/edit" class="text-green-600">Edit</a>
                                <button class="text-red-600" onclick="deletePengumuman(${p.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                document.getElementById('currentPage').textContent = `${data.paginatorInfo.currentPage}/${data.paginatorInfo.lastPage}`;
            }
        } catch (error) {
            console.error('Error:', error);
        }
    },

    async save(formId, isCreate = true) {
        const form = document.getElementById(formId);
        if (!form) return;

        try {
            const formData = new FormData(form);
            const id = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];
            
            const pengumumanData = {
                ...(id && { id }),
                title: formData.get('title'),
                content: formData.get('content'),
                date: formData.get('date')
            };

            const mutation = isCreate ? `
                mutation CreatePengumuman($input: CreatePengumumanInput!) {
                    createPengumuman(input: $input) { id title }
                }
            ` : `
                mutation UpdatePengumuman($input: UpdatePengumumanInput!) {
                    updatePengumuman(input: $input) { id title }
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
                    variables: { input: pengumumanData }
                })
            });

            const result = await response.json();
            if (result.data) {
                alert('Saved successfully!');
                window.location.href = '/pengumuman';
            }
        } catch (error) {
            alert('Error saving.');
        }
    }
};

async function deletePengumuman(id) {
    if (confirm('Are you sure?')) {
        try {
            const mutation = `mutation DeletePengumuman($id: ID!) { deletePengumuman(id: $id) { id } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query: mutation, variables: { id } })
            });
            if (await response.json().then(r => r.data)) {
                alert('Deleted!');
                location.reload();
            }
        } catch (error) {
            alert('Error deleting.');
        }
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    await PengumumanApp.loadList();
});

// expose a loader used by Blade onload
window.loadPengumumanData = function(page = 1) { return PengumumanApp.loadList(page); };
