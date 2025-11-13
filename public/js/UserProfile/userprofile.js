// UserProfile List Page - Load and display profiles
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('profilesTableBody') || document.getElementById('profileTableBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const currentPageSpan = document.getElementById('currentPage');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    let currentPage = 1;
    let totalPages = 1;

    // Load initial data
    loadProfiles(currentPage);

    // Search functionality
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            currentPage = 1;
            loadProfiles(currentPage);
        });
    }

    // Pagination
    if (prevPageBtn) {
        prevPageBtn.addEventListener('click', function() {
            if (currentPage > 1) {
                currentPage--;
                loadProfiles(currentPage);
            }
        });
    }

    if (nextPageBtn) {
        nextPageBtn.addEventListener('click', function() {
            if (currentPage < totalPages) {
                currentPage++;
                loadProfiles(currentPage);
            }
        });
    }

    async function loadProfiles(page = 1) {
        try {
            showLoading(tableBody);
            const search = searchInput ? searchInput.value : '';

            const query = `
                query GetAllUserProfiles($page: Int, $search: String) {
                    allUserProfile(page: $page, search: $search) {
                        data {
                            id
                            user_id
                            staff_id
                            nama_lengkap
                            nrp
                            alamat
                            created_at
                            user { id name }
                            staff { id user { id name } }
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
            const data = result.data?.allUserProfile;

            if (data && data.data && data.data.length > 0) {
                totalPages = data.paginatorInfo.lastPage;
                currentPage = data.paginatorInfo.currentPage;
                displayProfiles(data.data);
                updatePagination();
            } else {
                tableBody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-gray-500">No profiles found.</td></tr>';
            }
        } catch (error) {
            console.error('Error loading profiles:', error);
            showNotification('Failed to load profiles.', 'error');
            tableBody.innerHTML = '<tr><td colspan="8" class="text-center py-8 text-red-500">Error loading profiles.</td></tr>';
        }
    }

    function displayProfiles(profiles) {
        tableBody.innerHTML = '';
        profiles.forEach(profile => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${profile.id}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${profile.nama_lengkap}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${profile.nrp || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${profile.user?.name || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${profile.staff?.user?.nama || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${profile.alamat || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${formatDate(profile.created_at)}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                    <a href="/userprofile/${profile.id}" class="text-blue-600 hover:text-blue-800 font-medium">View</a>
                    <a href="/userprofile/${profile.id}/edit" class="text-green-600 hover:text-green-800 font-medium">Edit</a>
                    <button class="text-red-600 hover:text-red-800 font-medium" onclick="deleteProfile(${profile.id})">Delete</button>
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

    // expose global loader
    window.loadUserProfileData = function(page = 1) {
        return loadProfiles(page);
    };
});

// Delete profile with confirmation
async function deleteProfile(id) {
    if (confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
        try {
            const mutation = `
                mutation DeleteUserProfile($id: ID!) {
                    deleteUserProfile(id: $id) { id }
                }
            `;
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
                showNotification('Profile deleted successfully!', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            } else {
                throw new Error('Delete failed');
            }
        } catch (error) {
            console.error('Error deleting profile:', error);
            showNotification('Failed to delete profile.', 'error');
        }
    }
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
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
