// PenguranganTelat (Late Deductions) - Index/List Page
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('pengurangantelat-container');
    if (!container) return;

    // build initial markup
    container.innerHTML = `
        <div class="mb-4 flex justify-between items-center">
            <div>
                <input id="searchInput" type="text" placeholder="Search..." class="border rounded px-3 py-2" />
                <button id="searchBtn" class="ml-2 bg-blue-500 text-white px-3 py-2 rounded">Search</button>
            </div>
            <div id="paginationInfo" class="text-sm text-gray-600"></div>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Staff</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Keterangan</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody id="penguranganTelatTableBody" class="bg-white divide-y divide-gray-200">
                    <tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">Loading...</td></tr>
                </tbody>
            </table>
        </div>
        <div class="mt-4 flex justify-between items-center">
            <div>
                <button id="prevPageBtn" class="bg-gray-200 px-3 py-1 rounded">Prev</button>
                <button id="nextPageBtn" class="bg-gray-200 px-3 py-1 rounded ml-2">Next</button>
            </div>
            <div id="currentPage" class="text-sm text-gray-700">Page 1</div>
        </div>
    `;

    const tableBody = document.getElementById('penguranganTelatTableBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');

    let currentPage = 1;
    let totalPages = 1;

    // initial load
    loadPenguranganTelatData(currentPage);

    if (searchBtn) searchBtn.addEventListener('click', () => { currentPage = 1; loadPenguranganTelatData(currentPage); });
    if (prevPageBtn) prevPageBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; loadPenguranganTelatData(currentPage); } });
    if (nextPageBtn) nextPageBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; loadPenguranganTelatData(currentPage); } });

    // expose a named loader expected by the Blade file
    window.loadPenguranganTelatData = async function(page = 1) {
        try {
            tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">Loading...</td></tr>`;
            const search = searchInput ? searchInput.value : '';
            // use existing API helper if available
            if (typeof PenguranganTelatAPI !== 'undefined' && PenguranganTelatAPI.getAllPenguranganTelat) {
                const data = await PenguranganTelatAPI.getAllPenguranganTelat(page, search);
                const items = data?.data || [];
                totalPages = data?.paginatorInfo?.lastPage || 1;
                currentPage = data?.paginatorInfo?.currentPage || page;

                if (items.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">No records found.</td></tr>`;
                } else {
                    tableBody.innerHTML = '';
                    items.forEach(it => {
                        tableBody.innerHTML += `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-6 py-4 text-sm">${it.id}</td>
                                <td class="px-6 py-4 text-sm">${it.staff?.user?.name || '-'}</td>
                                <td class="px-6 py-4 text-sm">${formatCurrency(it.jumlah)}</td>
                                <td class="px-6 py-4 text-sm">${it.tanggal ? new Date(it.tanggal).toLocaleDateString() : '-'}</td>
                                <td class="px-6 py-4 text-sm">${it.keterangan || '-'}</td>
                                <td class="px-6 py-4 text-sm">
                                    <a href="/pengurangantelat/${it.id}/edit" class="text-green-600 mr-2">Edit</a>
                                    <button class="text-red-600" onclick="deletePenguranganTelat(${it.id})">Delete</button>
                                </td>
                            </tr>
                        `;
                    });
                }

                if (currentPageSpan) currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
            } else {
                // fallback: try to fetch via GraphQL directly
                const query = `query GetPenguranganTelat($page: Int, $search: String) { allPenguranganTelat(page: $page, search: $search) { data { id staff { id user { name } } jumlah tanggal keterangan } paginatorInfo { currentPage lastPage } } }`;
                const resp = await fetch('/graphql', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                    body: JSON.stringify({ query, variables: { page, search } })
                });
                const result = await resp.json();
                const data = result.data?.allPenguranganTelat;
                const items = data?.data || [];
                totalPages = data?.paginatorInfo?.lastPage || 1;
                currentPage = data?.paginatorInfo?.currentPage || page;
                if (items.length === 0) {
                    tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-gray-500">No records found.</td></tr>`;
                } else {
                    tableBody.innerHTML = '';
                    items.forEach(it => {
                        tableBody.innerHTML += `
                            <tr class="border-b hover:bg-gray-50">
                                <td class="px-6 py-4 text-sm">${it.id}</td>
                                <td class="px-6 py-4 text-sm">${it.staff?.user?.name || '-'}</td>
                                <td class="px-6 py-4 text-sm">${formatCurrency(it.jumlah)}</td>
                                <td class="px-6 py-4 text-sm">${it.tanggal ? new Date(it.tanggal).toLocaleDateString() : '-'}</td>
                                <td class="px-6 py-4 text-sm">${it.keterangan || '-'}</td>
                                <td class="px-6 py-4 text-sm">
                                    <a href="/pengurangantelat/${it.id}/edit" class="text-green-600 mr-2">Edit</a>
                                    <button class="text-red-600" onclick="deletePenguranganTelat(${it.id})">Delete</button>
                                </td>
                            </tr>
                        `;
                    });
                }

                if (currentPageSpan) currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
            }
        } catch (error) {
            console.error('Error loading pengurangan telat:', error);
            tableBody.innerHTML = `<tr><td colspan="6" class="px-6 py-8 text-center text-red-500">Error loading data.</td></tr>`;
        }
    };
});

async function deletePenguranganTelat(id) {
    if (!confirm('Are you sure you want to delete this entry?')) return;
    try {
        if (typeof PenguranganTelatAPI !== 'undefined' && PenguranganTelatAPI.deletePenguranganTelat) {
            await PenguranganTelatAPI.deletePenguranganTelat(id);
            showNotification('Deleted successfully', 'success');
            setTimeout(() => location.reload(), 600);
            return;
        }

        const mutation = `mutation DeletePenguranganTelat($id: ID!) { deletePenguranganTelat(id: $id) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({ query: mutation, variables: { id } })
        });
        const res = await r.json();
        if (res.data) {
            showNotification('Deleted successfully', 'success');
            setTimeout(() => location.reload(), 600);
        }
    } catch (error) {
        console.error('Delete error:', error);
        showNotification('Failed to delete', 'error');
    }
}

function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value || 0);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
