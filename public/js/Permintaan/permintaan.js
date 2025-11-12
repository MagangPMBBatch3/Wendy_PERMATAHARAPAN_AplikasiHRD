// Permintaan GraphQL API functions
const PermintaanAPI = {
    // Fetch all permintaan with pagination
    async getAllPermintaan(page = 1, search = '', type = '') {
        const query = `
            query GetPermintaan($page: Int, $search: String, $type: String) {
                allPermintaan(page: $page, search: $search, type: $type) {
                    data {
                        id
                        staff_id
                        tipe
                        keterangan
                        tanggal
                        waktu_mulai
                        waktu_selesai
                        created_at
                        updated_at
                        staff {
                            id
                            nama
                        }
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

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query,
                    variables: { page, search, type }
                })
            });

            const result = await response.json();
            return result.data.allPermintaan;
        } catch (error) {
            console.error('Error fetching permintaan:', error);
            throw error;
        }
    },

    // Fetch all staff
    async getAllStaff() {
        const query = `
            query GetAllStaff {
                allStaff {
                    id
                    user {
                        name
                    }
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query
                })
            });

            const result = await response.json();
            return result.data.allStaff;
        } catch (error) {
            console.error('Error fetching staff:', error);
            throw error;
        }
    },

    // Fetch single permintaan by ID
    async getPermintaan(id) {
        const query = `
            query GetPermintaan($id: ID!) {
                permintaan(id: $id) {
                    id
                    staff_id
                    tipe
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    created_at
                    updated_at
                    staff {
                        id
                        nama
                    }
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.permintaan;
        } catch (error) {
            console.error('Error fetching permintaan:', error);
            throw error;
        }
    },

    // Create new permintaan
    async createPermintaan(permintaanData) {
        const mutation = `
            mutation CreatePermintaan($input: CreatePermintaanInput!) {
                createPermintaan(input: $input) {
                    id
                    staff_id
                    tipe
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    created_at
                    updated_at
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        input: permintaanData
                    }
                })
            });

            const result = await response.json();
            return result.data.createPermintaan;
        } catch (error) {
            console.error('Error creating permintaan:', error);
            throw error;
        }
    },

    // Update permintaan
    async updatePermintaan(id, permintaanData) {
        const mutation = `
            mutation UpdatePermintaan($id: ID!, $input: UpdatePermintaanInput!) {
                updatePermintaan(id: $id, input: $input) {
                    id
                    staff_id
                    tipe
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    updated_at
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        id,
                        input: permintaanData
                    }
                })
            });

            const result = await response.json();
            return result.data.updatePermintaan;
        } catch (error) {
            console.error('Error updating permintaan:', error);
            throw error;
        }
    },

    // Delete permintaan
    async deletePermintaan(id) {
        const mutation = `
            mutation DeletePermintaan($id: ID!) {
                deletePermintaan(id: $id) {
                    id
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.deletePermintaan;
        } catch (error) {
            console.error('Error deleting permintaan:', error);
            throw error;
        }
    },

    // Restore permintaan
    async restorePermintaan(id) {
        const mutation = `
            mutation RestorePermintaan($id: ID!) {
                restorePermintaan(id: $id) {
                    id
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.restorePermintaan;
        } catch (error) {
            console.error('Error restoring permintaan:', error);
            throw error;
        }
    }
};

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatTime(timeString) {
    if (!timeString) return '';
    const time = new Date(`1970-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
    });
}

function getRequestTypeLabel(type) {
    const labels = {
        'cuti': 'Cuti (Leave)',
        'izin': 'Izin (Permission)',
        'lembur': 'Lembur (Overtime)'
    };
    return labels[type] || type;
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showLoading(element) {
    element.innerHTML = `
        <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-2 text-gray-600">Loading...</span>
        </div>
    `;
}

function hideLoading(element) {
    element.innerHTML = '';
}

// Index page logic
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the index page
    if (document.getElementById('requestsTableBody')) {
        let currentPage = 1;
        let currentSearch = '';
        let currentType = '';

        // Load initial data
        loadPermintaanData();

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        const typeFilter = document.getElementById('typeFilter');

        searchBtn.addEventListener('click', function() {
            currentSearch = searchInput.value.trim();
            currentType = typeFilter.value;
            currentPage = 1;
            loadPermintaanData();
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchBtn.click();
            }
        });

        typeFilter.addEventListener('change', function() {
            currentType = this.value;
            currentPage = 1;
            loadPermintaanData();
        });

        async function loadPermintaanData() {
            const tableBody = document.getElementById('requestsTableBody');
            const loadingState = document.getElementById('loadingState');
            const emptyState = document.getElementById('emptyState');
            const paginationContainer = document.getElementById('paginationContainer');

            showLoading(tableBody);
            loadingState.style.display = 'block';
            emptyState.classList.add('hidden');

            try {
                const result = await PermintaanAPI.getAllPermintaan(currentPage, currentSearch, currentType);

                loadingState.style.display = 'none';
                hideLoading(tableBody);

                if (result.data.length === 0) {
                    emptyState.classList.remove('hidden');
                    paginationContainer.innerHTML = '';
                    return;
                }

                // Populate table
                tableBody.innerHTML = result.data.map(request => `
                    <tr class="hover:bg-gray-50">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${request.id}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${request.staff ? request.staff.nama : 'N/A'}</td>
                        <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeClass(request.tipe)}">
                                ${getRequestTypeLabel(request.tipe)}
                            </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(request.tanggal)}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${request.waktu_mulai && request.waktu_selesai ? `${formatTime(request.waktu_mulai)} - ${formatTime(request.waktu_selesai)}` : 'N/A'}
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title="${request.keterangan}">${request.keterangan}</td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div class="flex space-x-2">
                                <a href="/permintaan/${request.id}" class="text-blue-600 hover:text-blue-900">View</a>
                                <a href="/permintaan/${request.id}/edit" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                                <button onclick="deletePermintaan(${request.id})" class="text-red-600 hover:text-red-900">Delete</button>
                            </div>
                        </td>
                    </tr>
                `).join('');

                // Generate pagination
                generatePagination(result.paginatorInfo);

            } catch (error) {
                console.error('Error loading permintaan data:', error);
                loadingState.style.display = 'none';
                hideLoading(tableBody);
                showNotification('Failed to load requests.', 'error');
            }
        }

        function generatePagination(paginatorInfo) {
            const paginationContainer = document.getElementById('paginationContainer');
            const { currentPage, lastPage, hasMorePages } = paginatorInfo;

            if (lastPage <= 1) {
                paginationContainer.innerHTML = '';
                return;
            }

            let paginationHtml = '<div class="flex justify-center"><nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">';

            // Previous button
            if (currentPage > 1) {
                paginationHtml += `<a href="#" onclick="changePage(${currentPage - 1})" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Previous</a>`;
            }

            // Page numbers
            for (let i = Math.max(1, currentPage - 2); i <= Math.min(lastPage, currentPage + 2); i++) {
                const isActive = i === currentPage;
                paginationHtml += `<a href="#" onclick="changePage(${i})" class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:bg-gray-50'}">${i}</a>`;
            }

            // Next button
            if (currentPage < lastPage) {
                paginationHtml += `<a href="#" onclick="changePage(${currentPage + 1})" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">Next</a>`;
            }

            paginationHtml += '</nav></div>';
            paginationContainer.innerHTML = paginationHtml;
        }

        window.changePage = function(page) {
            currentPage = page;
            loadPermintaanData();
        };

        window.deletePermintaan = async function(id) {
            if (!confirm('Are you sure you want to delete this request?')) {
                return;
            }

            try {
                await PermintaanAPI.deletePermintaan(id);
                showNotification('Request deleted successfully!', 'success');
                loadPermintaanData(); // Reload data
            } catch (error) {
                console.error('Error deleting request:', error);
                showNotification('Failed to delete request.', 'error');
            }
        };

        function getTypeBadgeClass(type) {
            const classes = {
                'cuti': 'bg-green-100 text-green-800',
                'izin': 'bg-yellow-100 text-yellow-800',
                'lembur': 'bg-blue-100 text-blue-800'
            };
            return classes[type] || 'bg-gray-100 text-gray-800';
        }
    }
});
