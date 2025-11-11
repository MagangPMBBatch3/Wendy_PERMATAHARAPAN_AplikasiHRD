// Overtime GraphQL API functions
const OvertimeAPI = {
    // Fetch all overtime with pagination
    async getAllOvertime(page = 1, search = '', status = '') {
        const query = `
            query GetOvertime($page: Int, $search: String, $status: String) {
                allOvertime(page: $page, search: $search, status: $status) {
                    data {
                        id
                        staff_id
                        proyek_id
                        dt_payroll_id
                        keterangan
                        tanggal
                        waktu_mulai
                        waktu_selesai
                        durasi_jam
                        foto
                        status
                        created_at
                        updated_at
                        staff {
                            id
                            nama
                        }
                        proyek {
                            id
                            nama_proyek
                        }
                        detailPayroll {
                            id
                            periode
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
                    variables: { page, search, status }
                })
            });

            const result = await response.json();
            return result.data.allOvertime;
        } catch (error) {
            console.error('Error fetching overtime:', error);
            throw error;
        }
    },

    // Fetch single overtime by ID
    async getOvertime(id) {
        const query = `
            query GetOvertime($id: ID!) {
                overtime(id: $id) {
                    id
                    staff_id
                    proyek_id
                    dt_payroll_id
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    durasi_jam
                    foto
                    status
                    created_at
                    updated_at
                    staff {
                        id
                        nama
                    }
                    proyek {
                        id
                        nama_proyek
                    }
                    detailPayroll {
                        id
                        periode
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
            return result.data.overtime;
        } catch (error) {
            console.error('Error fetching overtime:', error);
            throw error;
        }
    },

    // Create new overtime
    async createOvertime(overtimeData) {
        const mutation = `
            mutation CreateOvertime($input: CreateOvertimeInput!) {
                createOvertime(input: $input) {
                    id
                    staff_id
                    proyek_id
                    dt_payroll_id
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    durasi_jam
                    foto
                    status
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
                        input: overtimeData
                    }
                })
            });

            const result = await response.json();
            return result.data.createOvertime;
        } catch (error) {
            console.error('Error creating overtime:', error);
            throw error;
        }
    },

    // Update overtime
    async updateOvertime(id, overtimeData) {
        const mutation = `
            mutation UpdateOvertime($id: ID!, $input: UpdateOvertimeInput!) {
                updateOvertime(id: $id, input: $input) {
                    id
                    staff_id
                    proyek_id
                    dt_payroll_id
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    durasi_jam
                    foto
                    status
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
                        input: overtimeData
                    }
                })
            });

            const result = await response.json();
            return result.data.updateOvertime;
        } catch (error) {
            console.error('Error updating overtime:', error);
            throw error;
        }
    },

    // Delete overtime
    async deleteOvertime(id) {
        const mutation = `
            mutation DeleteOvertime($id: ID!) {
                deleteOvertime(id: $id) {
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
            return result.data.deleteOvertime;
        } catch (error) {
            console.error('Error deleting overtime:', error);
            throw error;
        }
    },

    // Restore overtime
    async restoreOvertime(id) {
        const mutation = `
            mutation RestoreOvertime($id: ID!) {
                restoreOvertime(id: $id) {
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
            return result.data.restoreOvertime;
        } catch (error) {
            console.error('Error restoring overtime:', error);
            throw error;
        }
    }
};

// Utility functions
function formatDuration(hours) {
    if (!hours) return '0 hours';
    const wholeHours = Math.floor(hours);
    const minutes = Math.round((hours - wholeHours) * 60);
    if (minutes === 0) {
        return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''}`;
    }
    return `${wholeHours} hour${wholeHours !== 1 ? 's' : ''} ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

function formatDateTime(dateTimeString) {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatOvertimeStatus(status) {
    const statusClasses = {
        'pending': 'bg-yellow-100 text-yellow-800',
        'approved': 'bg-green-100 text-green-800',
        'rejected': 'bg-red-100 text-red-800'
    };

    const statusText = status.charAt(0).toUpperCase() + status.slice(1);
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}">${statusText}</span>`;
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

// Index page functions
function renderOvertimeTable(overtimeList) {
    const tbody = document.getElementById('overtimeTableBody');
    tbody.innerHTML = '';

    if (overtimeList.length === 0) {
        document.getElementById('emptyState').classList.remove('hidden');
        return;
    }

    document.getElementById('emptyState').classList.add('hidden');

    overtimeList.forEach(overtime => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${overtime.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${overtime.staff?.nama || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${overtime.proyek?.nama_proyek || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(overtime.tanggal)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDuration(overtime.durasi_jam)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${formatOvertimeStatus(overtime.status)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                    <a href="/overtime/${overtime.id}" class="text-blue-600 hover:text-blue-900">View</a>
                    <a href="/overtime/${overtime.id}/edit" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    <button onclick="deleteOvertime(${overtime.id})" class="text-red-600 hover:text-red-900">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderPagination(paginatorInfo) {
    const container = document.getElementById('paginationContainer');
    container.innerHTML = '';

    if (paginatorInfo.lastPage <= 1) return;

    const pagination = document.createElement('div');
    pagination.className = 'flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6';

    let paginationHTML = '<div class="flex items-center space-x-2">';

    // Previous button
    if (paginatorInfo.currentPage > 1) {
        paginationHTML += `<button onclick="loadOvertime(${paginatorInfo.currentPage - 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">Previous</button>`;
    }

    // Page numbers
    for (let i = Math.max(1, paginatorInfo.currentPage - 2); i <= Math.min(paginatorInfo.lastPage, paginatorInfo.currentPage + 2); i++) {
        const activeClass = i === paginatorInfo.currentPage ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
        paginationHTML += `<button onclick="loadOvertime(${i})" class="relative inline-flex items-center px-4 py-2 text-sm font-medium ${activeClass} border">${i}</button>`;
    }

    // Next button
    if (paginatorInfo.currentPage < paginatorInfo.lastPage) {
        paginationHTML += `<button onclick="loadOvertime(${paginatorInfo.currentPage + 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">Next</button>`;
    }

    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
    container.appendChild(pagination);
}

async function deleteOvertime(id) {
    if (!confirm('Are you sure you want to delete this overtime record?')) {
        return;
    }

    try {
        await OvertimeAPI.deleteOvertime(id);
        showNotification('Overtime record deleted successfully!', 'success');
        loadOvertime(); // Reload the list
    } catch (error) {
        console.error('Error deleting overtime:', error);
        showNotification('Failed to delete overtime record.', 'error');
    }
}
