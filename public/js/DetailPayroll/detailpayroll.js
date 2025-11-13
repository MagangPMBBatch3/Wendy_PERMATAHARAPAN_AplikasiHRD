// DetailPayroll List Page
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('detailPayrollTableBody');
    let currentPage = 1, totalPages = 1;
    loadDetailPayroll(currentPage);

    ['searchBtn', 'prevPageBtn', 'nextPageBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function() {
                if (id === 'searchBtn') { currentPage = 1; loadDetailPayroll(currentPage); }
                else if (id === 'prevPageBtn' && currentPage > 1) { currentPage--; loadDetailPayroll(currentPage); }
                else if (id === 'nextPageBtn' && currentPage < totalPages) { currentPage++; loadDetailPayroll(currentPage); }
            });
        }
    });

    async function loadDetailPayroll(page = 1) {
        try {
            const query = `
                query GetAllDetailPayroll($page: Int) {
                    allDetailPayroll(page: $page) {
                        data { id payroll_id staff_id lembur bonus pengurangan total_gaji tanggal keterangan created_at staff { id user { id name } } }
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
            const data = result.data?.allDetailPayroll;

            if (data?.data?.length > 0) {
                totalPages = data.paginatorInfo.lastPage;
                currentPage = data.paginatorInfo.currentPage;
                tableBody.innerHTML = '';
                data.data.forEach(dp => {
                    tableBody.innerHTML += `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm">${dp.id}</td>
                            <td class="px-6 py-4 text-sm">${dp.staff?.user?.name || '-'}</td>
                            <td class="px-6 py-4 text-sm">${formatCurrency(dp.lembur)}</td>
                            <td class="px-6 py-4 text-sm">${formatCurrency(dp.bonus)}</td>
                            <td class="px-6 py-4 text-sm">${formatCurrency(dp.pengurangan)}</td>
                            <td class="px-6 py-4 text-sm font-bold">${formatCurrency(dp.total_gaji)}</td>
                            <td class="px-6 py-4 text-sm">${new Date(dp.tanggal).toLocaleDateString()}</td>
                            <td class="px-6 py-4 text-sm space-x-2">
                                <a href="/detailpayroll/${dp.id}/edit" class="text-green-600">Edit</a>
                                <button class="text-red-600" onclick="deleteDetailPayroll(${dp.id})">Delete</button>
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

    // expose loader expected by Blade
    window.loadDetailPayrollData = function(page = 1) {
        return loadDetailPayroll(page);
    };
});

async function deleteDetailPayroll(id) {
    if (confirm('Are you sure?')) {
        const mutation = `mutation DeleteDetailPayroll($id: ID!) { deleteDetailPayroll(id: $id) { id } }`;
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
