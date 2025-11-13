// Proyek List Page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('proyekTableBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const currentPageSpan = document.getElementById('currentPage');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    let currentPage = 1;
    let totalPages = 1;

    loadProyek(currentPage);

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            currentPage = 1;
            loadProyek(currentPage);
        });
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                loadProyek(currentPage);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                loadProyek(currentPage);
            }
        });
    }

    async function loadProyek(page = 1) {
        try {
            showLoading(tableBody);
            const search = searchInput ? searchInput.value : '';

            const query = `
                query GetAllProyek($page: Int, $search: String) {
                    allProyek(page: $page, search: $search) {
                        data {
                            id
                            name
                            description
                            start_date
                            end_date
                            status
                            created_at
                        }
                        paginatorInfo {
                            currentPage
                            lastPage
                        }
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
            const proyekData = result.data.allProyek;

            if (proyekData?.data?.length > 0) {
                totalPages = proyekData.paginatorInfo.lastPage;
                currentPage = proyekData.paginatorInfo.currentPage;
                displayProyek(proyekData.data);
                updatePagination();
            } else {
                tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">No projects found.</td></tr>';
            }
        } catch (error) {
            console.error('Error loading projects:', error);
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-red-500">Error loading projects.</td></tr>';
        }
    }

    function displayProyek(projects) {
        tableBody.innerHTML = '';
        projects.forEach(p => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${p.id}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${p.name}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${p.description || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatDate(p.start_date)}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatDate(p.end_date)}</td>
                <td class="px-6 py-4 text-sm"><span class="px-3 py-1 rounded-full text-xs font-semibold ${p.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">${p.status}</span></td>
                <td class="px-6 py-4 text-sm space-x-2">
                    <a href="/proyek/${p.id}/edit" class="text-green-600 hover:text-green-800">Edit</a>
                    <button class="text-red-600 hover:text-red-800" onclick="deleteProyek(${p.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function updatePagination() {
        if (currentPageSpan) currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        if (prevPageBtn) prevPageBtn.disabled = currentPage <= 1;
        if (nextPageBtn) nextPageBtn.disabled = currentPage >= totalPages;
    }

    // expose loader expected by Blade
    window.loadProyekData = function(page = 1) { return (typeof loadProyek === 'function') ? loadProyek(page) : null; };
});

async function deleteProyek(id) {
    if (confirm('Are you sure?')) {
        try {
            const mutation = `mutation DeleteProyek($id: ID!) { deleteProyek(id: $id) { id } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query: mutation, variables: { id } })
            });
            const result = await response.json();
            if (result.data) {
                showNotification('Deleted successfully!', 'success');
                setTimeout(() => location.reload(), 1000);
            }
        } catch (error) {
            showNotification('Failed to delete.', 'error');
        }
    }
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function showLoading(element) {
    element.innerHTML = '<tr><td colspan="7" class="px-6 py-8 text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div></td></tr>';
}
