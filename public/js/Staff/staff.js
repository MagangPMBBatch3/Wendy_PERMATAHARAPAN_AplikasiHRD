// Staff List Page - Load and display staff
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('staffTableBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const currentPageSpan = document.getElementById('currentPage');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    let currentPage = 1;
    let totalPages = 1;

    loadStaff(currentPage);

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            currentPage = 1;
            loadStaff(currentPage);
        });
    }

    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                loadStaff(currentPage);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                loadStaff(currentPage);
            }
        });
    }

    async function loadStaff(page = 1) {
        try {
            showLoading(tableBody);
            const search = searchInput ? searchInput.value : '';

            const query = `
                query GetAllStaff($page: Int, $search: String) {
                    allStaff(page: $page, search: $search) {
                        data {
                            id
                            user_id
                            level_id
                            hire_date
                            salary
                            points
                            created_at
                            user { id name }
                            level { id name }
                        }
                        paginatorInfo {
                            currentPage
                            lastPage
                            total
                            perPage
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
            const staffData = result.data.allStaff;

            if (staffData && staffData.data && staffData.data.length > 0) {
                totalPages = staffData.paginatorInfo.lastPage;
                currentPage = staffData.paginatorInfo.currentPage;
                displayStaff(staffData.data);
                updatePagination();
            } else {
                tableBody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-500">No staff found.</td></tr>';
            }
        } catch (error) {
            console.error('Error loading staff:', error);
            showNotification('Failed to load staff.', 'error');
            tableBody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-red-500">Error loading staff.</td></tr>';
        }
    }

    function displayStaff(staff) {
        tableBody.innerHTML = '';
        staff.forEach(s => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${s.id}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${s.user?.name || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${s.level?.name || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatDate(s.hire_date)}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatCurrency(s.salary)}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${s.points || 0}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatDate(s.created_at)}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                    <a href="/staff/${s.id}/edit" class="text-green-600 hover:text-green-800 font-medium">Edit</a>
                    <button class="text-red-600 hover:text-red-800 font-medium" onclick="deleteStaff(${s.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    function updatePagination() {
        if (currentPageSpan) {
            currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        }
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage <= 1;
        }
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage >= totalPages;
        }
    }
    // expose a global loader used by the Blade onload handlers
    window.loadStaffData = function(page = 1) {
        loadStaff(page);
    };
});

async function deleteStaff(id) {
    if (confirm('Are you sure you want to delete this staff member?')) {
        try {
            const mutation = `
                mutation DeleteStaff($id: ID!) {
                    deleteStaff(id: $id) {
                        id
                        deleted_at
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
                    variables: { id }
                })
            });

            const result = await response.json();
            if (result.data) {
                showNotification('Staff deleted successfully!', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        } catch (error) {
            console.error('Error deleting staff:', error);
            showNotification('Failed to delete staff.', 'error');
        }
    }
}

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value || 0);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function showLoading(element) {
    element.innerHTML = `
        <tr>
            <td colspan="8" class="px-6 py-8 text-center">
                <div class="flex justify-center items-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </td>
        </tr>
    `;
}
