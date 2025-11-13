// Absensi List Page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('absensiTableBody');
    let currentPage = 1, totalPages = 1;
    loadAbsensi(currentPage);

    if (document.getElementById('searchBtn')) {
        document.getElementById('searchBtn').addEventListener('click', () => {
            currentPage = 1;
            loadAbsensi(currentPage);
        });
    }

    if (document.getElementById('prevPageBtn')) {
        document.getElementById('prevPageBtn').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                loadAbsensi(currentPage);
            }
        });
    }

    if (document.getElementById('nextPageBtn')) {
        document.getElementById('nextPageBtn').addEventListener('click', () => {
            if (currentPage < totalPages) {
                currentPage++;
                loadAbsensi(currentPage);
            }
        });
    }

    async function loadAbsensi(page = 1) {
        try {
            const search = document.getElementById('searchInput')?.value || '';
            const query = `
                query GetAllAbsensi($page: Int, $search: String) {
                    allAbsensi(page: $page, search: $search) {
                        data {
                            id
                            staff_id
                            login_time
                            logout_time
                            date
                            status
                            created_at
                            staff { id user { id name } }
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
                body: JSON.stringify({ query, variables: { page, search } })
            });

            const result = await response.json();
            const data = result.data?.allAbsensi;

            if (data?.data?.length > 0) {
                totalPages = data.paginatorInfo.lastPage;
                currentPage = data.paginatorInfo.currentPage;
                tableBody.innerHTML = '';

                data.data.forEach(a => {
                    tableBody.innerHTML += `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm">${a.id}</td>
                            <td class="px-6 py-4 text-sm">${a.staff?.user?.name || '-'}</td>
                            <td class="px-6 py-4 text-sm">${new Date(a.date).toLocaleDateString()}</td>
                            <td class="px-6 py-4 text-sm">${a.login_time ? new Date(a.login_time).toLocaleTimeString() : '-'}</td>
                            <td class="px-6 py-4 text-sm">${a.logout_time ? new Date(a.logout_time).toLocaleTimeString() : '-'}</td>
                            <td class="px-6 py-4 text-sm"><span class="px-2 py-1 rounded text-xs ${a.status === 'present' ? 'bg-green-100' : 'bg-red-100'}">${a.status}</span></td>
                            <td class="px-6 py-4 text-sm space-x-2">
                                <a href="/absensi/${a.id}/edit" class="text-green-600">Edit</a>
                                <button class="text-red-600" onclick="deleteAbsensi(${a.id})">Delete</button>
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

// expose loader for Blade
window.loadAbsensiData = function(page = 1) { return (typeof loadAbsensi === 'function') ? loadAbsensi(page) : null; };

async function deleteAbsensi(id) {
    if (confirm('Are you sure?')) {
        try {
            const mutation = `mutation DeleteAbsensi($id: ID!) { deleteAbsensi(id: $id) { id } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query: mutation, variables: { id } })
            });
            if (await response.json().then(r => r.data)) {
                location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}
