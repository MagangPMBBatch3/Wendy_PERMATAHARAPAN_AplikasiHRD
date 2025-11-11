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
