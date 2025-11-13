// Kinerja List Page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('kinerjaTableBody');
    let currentPage = 1, totalPages = 1;
    loadKinerja(currentPage);

    ['searchBtn', 'prevPageBtn', 'nextPageBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function() {
                if (id === 'searchBtn') {
                    currentPage = 1;
                    loadKinerja(currentPage);
                } else if (id === 'prevPageBtn' && currentPage > 1) {
                    currentPage--;
                    loadKinerja(currentPage);
                } else if (id === 'nextPageBtn' && currentPage < totalPages) {
                    currentPage++;
                    loadKinerja(currentPage);
                }
            });
        }
    });

    async function loadKinerja(page = 1) {
        try {
            const query = `
                query GetAllKinerja($page: Int) {
                    allKinerja(page: $page) {
                        data {
                            id staff_id proyek_id points description date created_at
                            staff { id user { id name } }
                            proyek { id name }
                        }
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
                body: JSON.stringify({ query, variables: { page } })
            });

            const result = await response.json();
            const data = result.data?.allKinerja;

            if (data?.data?.length > 0) {
                totalPages = data.paginatorInfo.lastPage;
                currentPage = data.paginatorInfo.currentPage;
                tableBody.innerHTML = '';

                data.data.forEach(k => {
                    tableBody.innerHTML += `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm">${k.id}</td>
                            <td class="px-6 py-4 text-sm">${k.staff?.user?.name || '-'}</td>
                            <td class="px-6 py-4 text-sm">${k.proyek?.name || '-'}</td>
                            <td class="px-6 py-4 text-sm">${k.points}</td>
                            <td class="px-6 py-4 text-sm">${k.description || '-'}</td>
                            <td class="px-6 py-4 text-sm">${new Date(k.date).toLocaleDateString()}</td>
                            <td class="px-6 py-4 text-sm space-x-2">
                                <a href="/kinerja/${k.id}/edit" class="text-green-600">Edit</a>
                                <button class="text-red-600" onclick="deleteKinerja(${k.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                if (document.getElementById('currentPage')) {
                    document.getElementById('currentPage').textContent = `${currentPage}/${totalPages}`;
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
});

async function deleteKinerja(id) {
    if (confirm('Are you sure?')) {
        const mutation = `mutation DeleteKinerja($id: ID!) { deleteKinerja(id: $id) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation, variables: { id } })
        });
        if (await r.json().then(x => x.data)) {
            location.reload();
        }
    }
}

// expose loader for Blade
window.loadKinerjaData = function(page = 1) { return (typeof loadKinerja === 'function') ? loadKinerja(page) : null; };
