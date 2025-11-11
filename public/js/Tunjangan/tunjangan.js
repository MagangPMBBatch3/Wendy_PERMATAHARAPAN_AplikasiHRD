// Tunjangan GraphQL API functions
const TunjanganAPI = {
    // Fetch all tunjangan with pagination
    async getAllTunjangan(page = 1, search = '', type = '', month = '') {
        const query = `
            query GetTunjangan($page: Int, $search: String, $type: String, $month: String) {
                allTunjangan(page: $page, search: $search, type: $type, month: $month) {
                    data {
                        id
                        staff_id
                        dt_payroll_id
                        tipe
                        keterangan
                        jumlah
                        tanggal
                        bulan
                        tahun
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
                    variables: { page, search, type, month }
                })
            });

            const result = await response.json();
            return result.data.allTunjangan;
        } catch (error) {
            console.error('Error fetching tunjangan:', error);
            throw error;
        }
    },

    // Fetch single tunjangan by ID
    async getTunjangan(id) {
        const query = `
            query GetTunjangan($id: ID!) {
                tunjangan(id: $id) {
                    id
                    staff_id
                    dt_payroll_id
                    tipe
                    keterangan
                    jumlah
                    tanggal
                    bulan
                    tahun
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
            return result.data.tunjangan;
        } catch (error) {
            console.error('Error fetching tunjangan:', error);
            throw error;
        }
    },

    // Create new tunjangan
    async createTunjangan(tunjanganData) {
        const mutation = `
            mutation CreateTunjangan($input: CreateTunjanganInput!) {
                createTunjangan(input: $input) {
                    id
                    staff_id
                    dt_payroll_id
                    tipe
                    keterangan
                    jumlah
                    tanggal
                    bulan
                    tahun
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
                        input: tunjanganData
                    }
                })
            });

            const result = await response.json();
            return result.data.createTunjangan;
        } catch (error) {
            console.error('Error creating tunjangan:', error);
            throw error;
        }
    },

    // Update tunjangan
    async updateTunjangan(id, tunjanganData) {
        const mutation = `
            mutation UpdateTunjangan($id: ID!, $input: UpdateTunjanganInput!) {
                updateTunjangan(id: $id, input: $input) {
                    id
                    staff_id
                    dt_payroll_id
                    tipe
                    keterangan
                    jumlah
                    tanggal
                    bulan
                    tahun
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
                        input: tunjanganData
                    }
                })
            });

            const result = await response.json();
            return result.data.updateTunjangan;
        } catch (error) {
            console.error('Error updating tunjangan:', error);
            throw error;
        }
    },

    // Delete tunjangan
    async deleteTunjangan(id) {
        const mutation = `
            mutation DeleteTunjangan($id: ID!) {
                deleteTunjangan(id: $id) {
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
            return result.data.deleteTunjangan;
        } catch (error) {
            console.error('Error deleting tunjangan:', error);
            throw error;
        }
    },

    // Restore tunjangan
    async restoreTunjangan(id) {
        const mutation = `
            mutation RestoreTunjangan($id: ID!) {
                restoreTunjangan(id: $id) {
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
            return result.data.restoreTunjangan;
        } catch (error) {
            console.error('Error restoring tunjangan:', error);
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

function formatAllowanceType(type) {
    const types = {
        'transport': 'Transport Allowance',
        'makan': 'Meal Allowance',
        'lembur': 'Overtime Allowance',
        'lainnya': 'Other Allowance'
    };
    return types[type] || type;
}

function formatMonthYear(bulan, tahun) {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[bulan - 1]} ${tahun}`;
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
function renderTunjanganTable(tunjanganList) {
    const tbody = document.getElementById('allowancesTableBody');
    tbody.innerHTML = '';

    if (tunjanganList.length === 0) {
        document.getElementById('emptyState').classList.remove('hidden');
        return;
    }

    document.getElementById('emptyState').classList.add('hidden');

    tunjanganList.forEach(tunjangan => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${tunjangan.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${tunjangan.staff?.nama || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatAllowanceType(tunjangan.tipe)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatMonthYear(tunjangan.bulan, tunjangan.tahun)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatCurrency(tunjangan.jumlah)}</td>
            <td class="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title="${tunjangan.keterangan}">${tunjangan.keterangan}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                    <a href="/tunjangan/${tunjangan.id}" class="text-blue-600 hover:text-blue-900">View</a>
                    <a href="/tunjangan/${tunjangan.id}/edit" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    <button onclick="deleteTunjangan(${tunjangan.id})" class="text-red-600 hover:text-red-900">Delete</button>
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
        paginationHTML += `<button onclick="loadTunjangan(${paginatorInfo.currentPage - 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">Previous</button>`;
    }

    // Page numbers
    for (let i = Math.max(1, paginatorInfo.currentPage - 2); i <= Math.min(paginatorInfo.lastPage, paginatorInfo.currentPage + 2); i++) {
        const activeClass = i === paginatorInfo.currentPage ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
        paginationHTML += `<button onclick="loadTunjangan(${i})" class="relative inline-flex items-center px-4 py-2 text-sm font-medium ${activeClass} border">${i}</button>`;
    }

    // Next button
    if (paginatorInfo.currentPage < paginatorInfo.lastPage) {
        paginationHTML += `<button onclick="loadTunjangan(${paginatorInfo.currentPage + 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">Next</button>`;
    }

    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
    container.appendChild(pagination);
}

async function deleteTunjangan(id) {
    if (!confirm('Are you sure you want to delete this allowance?')) {
        return;
    }

    try {
        await TunjanganAPI.deleteTunjangan(id);
        showNotification('Allowance deleted successfully!', 'success');
        loadTunjangan(); // Reload the list
    } catch (error) {
        console.error('Error deleting allowance:', error);
        showNotification('Failed to delete allowance.', 'error');
    }
}
