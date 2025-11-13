// User List Page (index)
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('user-container');
    if (!container) return;

    container.innerHTML = `
        <div class="text-right mb-4">
            <input id="searchInput" class="border px-2 py-1" placeholder="Search..." />
            <button id="searchBtn" class="ml-2 bg-blue-500 text-white px-3 py-1 rounded">Search</button>
        </div>
        <div class="overflow-x-auto">
            <table class="min-w-full">
                <thead class="bg-gray-50"><tr>
                    <th class="px-6 py-3">ID</th>
                    <th class="px-6 py-3">Name</th>
                    <th class="px-6 py-3">Email</th>
                    <th class="px-6 py-3">Actions</th>
                </tr></thead>
                <tbody id="userTableBody" class="bg-white"></tbody>
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

    const tableBody = document.getElementById('userTableBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const currentPageSpan = document.getElementById('currentPage');

    let currentPage = 1, totalPages = 1;

    if (searchBtn) searchBtn.addEventListener('click', () => { currentPage = 1; loadUserData(currentPage); });
    if (prevPageBtn) prevPageBtn.addEventListener('click', () => { if (currentPage > 1) { currentPage--; loadUserData(currentPage); } });
    if (nextPageBtn) nextPageBtn.addEventListener('click', () => { if (currentPage < totalPages) { currentPage++; loadUserData(currentPage); } });

    async function loadUsers(page = 1) {
        try {
            tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500">Loading...</td></tr>`;
            const query = `query GetAllUsers($page: Int) { allUser(page: $page) { data { id name email created_at } paginatorInfo { currentPage lastPage } } }`;
            const resp = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query, variables: { page } }) });
            const json = await resp.json();
            const data = json.data?.allUser;
            const items = data?.data || [];
            totalPages = data?.paginatorInfo?.lastPage || 1;
            currentPage = data?.paginatorInfo?.currentPage || page;
            if (items.length === 0) {
                tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-gray-500">No users found.</td></tr>`;
            } else {
                tableBody.innerHTML = '';
                items.forEach(u => {
                    tableBody.innerHTML += `<tr class="border-b hover:bg-gray-50"><td class="px-6 py-4">${u.id}</td><td class="px-6 py-4">${u.name}</td><td class="px-6 py-4">${u.email}</td><td class="px-6 py-4"><a href="/user/${u.id}/edit" class="text-green-600">Edit</a></td></tr>`;
                });
            }
            if (currentPageSpan) currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        } catch (error) { console.error('Error loading users', error); tableBody.innerHTML = `<tr><td colspan="4" class="px-6 py-8 text-center text-red-500">Error loading users.</td></tr>`; }
    }

    // expose loader for Blade
    window.loadUserData = function(page = 1) { return loadUsers(page); };

    // initial
    loadUserData(currentPage);
});
