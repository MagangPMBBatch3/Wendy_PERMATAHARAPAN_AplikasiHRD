// Level List Page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('levelTableBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const currentPageSpan = document.getElementById('currentPage');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    let currentPage = 1;
    let totalPages = 1;

    loadLevel(currentPage);

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            currentPage = 1;
            loadLevel(currentPage);
        });
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                loadLevel(currentPage);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                loadLevel(currentPage);
            }
        });
    }

    async function loadLevel(page = 1) {
        try {
            showLoading(tableBody);
            const search = searchInput ? searchInput.value : '';

            const query = `
                query GetAllLevel($page: Int, $search: String) {
                    allLevel(page: $page, search: $search) {
                        data {
                            id
                            name
                            description
                            created_at
                            updated_at
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
                body: JSON.stringify({
                    query,
                    variables: { page, search }
                })
            });

            const result = await response.json();
            const levelData = result.data.allLevel;

            if (levelData && levelData.data && levelData.data.length > 0) {
                totalPages = levelData.paginatorInfo.lastPage;
                currentPage = levelData.paginatorInfo.currentPage;
                displayLevel(levelData.data);
                updatePagination();
            } else {
                tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-gray-500">No levels found.</td></tr>';
            }
        } catch (error) {
            console.error('Error loading level:', error);
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center py-8 text-red-500">Error loading levels.</td></tr>';
        }
    }

    function displayLevel(levels) {
        tableBody.innerHTML = '';
        levels.forEach(l => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${l.id}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${l.name}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${l.description || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatDate(l.created_at)}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                    <a href="/level/${l.id}/edit" class="text-green-600 hover:text-green-800">Edit</a>
                    <button class="text-red-600 hover:text-red-800" onclick="deleteLevel(${l.id})">Delete</button>
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
    window.loadLevelData = function(page = 1) { return (typeof loadLevel === 'function') ? loadLevel(page) : null; };
});

async function deleteLevel(id) {
    if (confirm('Are you sure?')) {
        try {
            const mutation = `mutation DeleteLevel($id: ID!) { deleteLevel(id: $id) { id } }`;
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
    element.innerHTML = '<tr><td colspan="5" class="px-6 py-8 text-center"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div></td></tr>';
}
