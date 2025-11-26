// ActivityLog List Page (Read-only)
document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('activityLogTableBody');
    let currentPage = 1, totalPages = 1;
    loadActivityLog(currentPage);

    ['prevPageBtn', 'nextPageBtn'].forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('click', function() {
                if (id === 'prevPageBtn' && currentPage > 1) { currentPage--; loadActivityLog(currentPage); }
                else if (id === 'nextPageBtn' && currentPage < totalPages) { currentPage++; loadActivityLog(currentPage); }
            });
        }
    });

    async function loadActivityLog(page = 1) {
        try {
            const query = `
                query GetAllActivityLog($page: Int) {
                    allActivityLog(page: $page) {
                        data { id user_id action description timestamp created_at user { id name } }
                        paginatorInfo { currentPage lastPage }
                    }
                }
            `;
            const response = await fetch(window.API_URL || '/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ query, variables: { page } })
            });
            const result = await response.json();
            const data = result.data?.allActivityLog;

            if (data?.data?.length > 0) {
                totalPages = data.paginatorInfo.lastPage;
                currentPage = data.paginatorInfo.currentPage;
                tableBody.innerHTML = '';
                data.data.forEach(log => {
                    tableBody.innerHTML += `
                        <tr class="border-b hover:bg-gray-50">
                            <td class="px-6 py-4 text-sm">${log.id}</td>
                            <td class="px-6 py-4 text-sm">${log.user?.name || '-'}</td>
                            <td class="px-6 py-4 text-sm"><span class="px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">${log.action}</span></td>
                            <td class="px-6 py-4 text-sm">${log.description || '-'}</td>
                            <td class="px-6 py-4 text-sm">${log.timestamp ? new Date(log.timestamp).toLocaleString() : '-'}</td>
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

// expose loader for Blade
window.loadActivityLogData = function(page = 1) { return (typeof loadActivityLog === 'function') ? loadActivityLog(page) : null; };
