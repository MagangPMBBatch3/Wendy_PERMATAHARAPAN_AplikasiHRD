// Payroll List Page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('payrollTableBody');
    let currentPage = 1, totalPages = 1;
    loadPayroll(currentPage);

    ['searchBtn', 'prevPageBtn', 'nextPageBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function() {
                if (id === 'searchBtn') { currentPage = 1; loadPayroll(currentPage); }
                else if (id === 'prevPageBtn' && currentPage > 1) { currentPage--; loadPayroll(currentPage); }
                else if (id === 'nextPageBtn' && currentPage < totalPages) { currentPage++; loadPayroll(currentPage); }
            });
        }
    });

    async function loadPayroll(page = 1) {
        try {
            const query = `
                query GetAllPayroll($page: Int) {
                    allPayroll(page: $page) {
                        data { id staff_id month year base_salary bonuses deductions total created_at staff { id user { id name } } }
                        paginatorInfo { currentPage lastPage }
                    }
                }
            `;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ query, variables: { page } })
            });
            const result = await response.json();
            const data = result.data?.allPayroll;

            if (data?.data?.length > 0) {
                totalPages = data.paginatorInfo.lastPage;
                currentPage = data.paginatorInfo.currentPage;
                tableBody.innerHTML = '';
                data.data.forEach(p => {
                    tableBody.innerHTML += `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm">${p.id}</td>
                            <td class="px-6 py-4 text-sm">${p.staff?.user?.name || '-'}</td>
                            <td class="px-6 py-4 text-sm">${p.month}/${p.year}</td>
                            <td class="px-6 py-4 text-sm">${formatCurrency(p.base_salary)}</td>
                            <td class="px-6 py-4 text-sm">${formatCurrency(p.bonuses)}</td>
                            <td class="px-6 py-4 text-sm">${formatCurrency(p.deductions)}</td>
                            <td class="px-6 py-4 text-sm font-bold">${formatCurrency(p.total)}</td>
                            <td class="px-6 py-4 text-sm space-x-2">
                                <a href="/payroll/${p.id}/edit" class="text-green-600">Edit</a>
                                <button class="text-red-600" onclick="deletePayroll(${p.id})">Delete</button>
                            </td>
                        </tr>
                    `;
                });
                if (document.getElementById('currentPage')) {
                    document.getElementById('currentPage').textContent = `${currentPage}/${totalPages}`;
                }
            }
        } catch (error) { console.error('Error:', error); }
    }
});

async function deletePayroll(id) {
    if (confirm('Are you sure?')) {
        const mutation = `mutation DeletePayroll($id: ID!) { deletePayroll(id: $id) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({ query: mutation, variables: { id } })
        });
        if (await r.json().then(x => x.data)) { location.reload(); }
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0);
}

// expose loader expected by Blade
window.loadPayrollData = function(page = 1) { return (typeof loadPayroll === 'function') ? loadPayroll(page) : null; };
