// Pengurangan GraphQL API functions
const PenguranganAPI = {
    // Fetch all pengurangan with pagination
    async getAllPengurangan(page = 1, search = '', date = '') {
        const query = `
            query GetPengurangan($page: Int, $search: String, $date: String) {
                allPengurangan(page: $page, search: $search, date: $date) {
                    data {
                        id
                        staff_id
                        dt_payroll_id
                        keterangan
                        jumlah
                        tanggal
                        created_at
                        updated_at
                        staff {
                            id
                            nama
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
                    variables: { page, search, date }
                })
            });

            const result = await response.json();
            return result.data.allPengurangan;
        } catch (error) {
            console.error('Error fetching pengurangan:', error);
            throw error;
        }
    },

    // Fetch single pengurangan by ID
    async getPengurangan(id) {
        const query = `
            query GetPengurangan($id: ID!) {
                pengurangan(id: $id) {
                    id
                    staff_id
                    dt_payroll_id
                    keterangan
                    jumlah
                    tanggal
                    created_at
                    updated_at
                    staff {
                        id
                        nama
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
            return result.data.pengurangan;
        } catch (error) {
            console.error('Error fetching pengurangan:', error);
            throw error;
        }
    },

    // Create new pengurangan
    async createPengurangan(penguranganData) {
        const mutation = `
            mutation CreatePengurangan($input: CreatePenguranganInput!) {
                createPengurangan(input: $input) {
                    id
                    staff_id
                    dt_payroll_id
                    keterangan
                    jumlah
                    tanggal
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
                        input: penguranganData
                    }
                })
            });

            const result = await response.json();
            return result.data.createPengurangan;
        } catch (error) {
            console.error('Error creating pengurangan:', error);
            throw error;
        }
    },

    // Update pengurangan
    async updatePengurangan(id, penguranganData) {
        const mutation = `
            mutation UpdatePengurangan($id: ID!, $input: UpdatePenguranganInput!) {
                updatePengurangan(id: $id, input: $input) {
                    id
                    staff_id
                    dt_payroll_id
                    keterangan
                    jumlah
                    tanggal
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
                        input: penguranganData
                    }
                })
            });

            const result = await response.json();
            return result.data.updatePengurangan;
        } catch (error) {
            console.error('Error updating pengurangan:', error);
            throw error;
        }
    },

    // Delete pengurangan
    async deletePengurangan(id) {
        const mutation = `
            mutation DeletePengurangan($id: ID!) {
                deletePengurangan(id: $id) {
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
            return result.data.deletePengurangan;
        } catch (error) {
            console.error('Error deleting pengurangan:', error);
            throw error;
        }
    },

    // Restore pengurangan
    async restorePengurangan(id) {
        const mutation = `
            mutation RestorePengurangan($id: ID!) {
                restorePengurangan(id: $id) {
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
            return result.data.restorePengurangan;
        } catch (error) {
            console.error('Error restoring pengurangan:', error);
            throw error;
        }
    }
};

// Utility functions
function formatCurrency(amount) {
    if (!amount) return 'Rp 0';
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format(amount);
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
function renderPenguranganTable(penguranganList) {
    const tbody = document.getElementById('deductionsTableBody');
    tbody.innerHTML = '';

    if (penguranganList.length === 0) {
        document.getElementById('emptyState').classList.remove('hidden');
        return;
    }

    document.getElementById('emptyState').classList.add('hidden');

    penguranganList.forEach(pengurangan => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${pengurangan.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${pengurangan.staff?.nama || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${pengurangan.detailPayroll?.periode || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(pengurangan.tanggal)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(pengurangan.jumlah)}</td>
            <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title="${pengurangan.keterangan}">${pengurangan.keterangan}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                    <a href="/pengurangan/${pengurangan.id}" class="text-blue-600 hover:text-blue-900">View</a>
                    <a href="/pengurangan/${pengurangan.id}/edit" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    <button onclick="deletePengurangan(${pengurangan.id})" class="text-red-600 hover:text-red-900">Delete</button>
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
        paginationHTML += `<button onclick="loadPengurangan(${paginatorInfo.currentPage - 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">Previous</button>`;
    }

    // Page numbers
    for (let i = Math.max(1, paginatorInfo.currentPage - 2); i <= Math.min(paginatorInfo.lastPage, paginatorInfo.currentPage + 2); i++) {
        const activeClass = i === paginatorInfo.currentPage ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
        paginationHTML += `<button onclick="loadPengurangan(${i})" class="relative inline-flex items-center px-4 py-2 text-sm font-medium ${activeClass} border">${i}</button>`;
    }

    // Next button
    if (paginatorInfo.currentPage < paginatorInfo.lastPage) {
        paginationHTML += `<button onclick="loadPengurangan(${paginatorInfo.currentPage + 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">Next</button>`;
    }

    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
    container.appendChild(pagination);
}

async function deletePengurangan(id) {
    if (!confirm('Are you sure you want to delete this deduction?')) {
        return;
    }

    try {
        await PenguranganAPI.deletePengurangan(id);
        showNotification('Deduction deleted successfully!', 'success');
        loadPengurangan(); // Reload the list
    } catch (error) {
        console.error('Error deleting deduction:', error);
        showNotification('Failed to delete deduction.', 'error');
    }
}
