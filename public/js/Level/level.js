const API_URL = '/graphql';
let currentPage = 1;
let perPage = 10;
let searchValue = '';

// Load data with pagination & search
async function loadDataPaginate(page = 1) {
    currentPage = page;
    perPage = document.getElementById('perPage')?.value || 10;
    searchValue = document.getElementById('searchInput')?.value || '';

    const variables = { first: parseInt(perPage), page: currentPage, search: searchValue };

    const query = `
        query($first: Int, $page: Int, $search: String) {
            allLevelPaginate(first: $first, page: $page, search: $search) {
                data {
                    id
                    nama
                    deskripsi
                    created_at
                }
                paginatorInfo {
                    currentPage
                    total
                    perPage
                    lastPage
                }
            }
        }
    `;

    try {
        document.getElementById('dataLevel').innerHTML = `
            <tr>
                <td colspan="5" class="text-center p-8">
                    <div class="flex flex-col items-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                    </div>
                </td>
            </tr>
        `;

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query, variables })
        });

        const json = await res.json();

        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            document.getElementById('dataLevel').innerHTML = `
                <tr>
                    <td colspan="5" class="text-center p-4 text-red-400">
                        Error: ${json.errors[0]?.message || 'Unknown error'}
                    </td>
                </tr>
            `;
            return;
        }

        const tbody = document.getElementById('dataLevel');
        const result = json.data?.allLevelPaginate;
        const items = result?.data || [];
        const paginatorInfo = result?.paginatorInfo;

        if (items.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center p-8">
                        <div class="flex flex-col items-center">
                            <svg class="w-12 h-12 text-white/30 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 01-5.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.334 0-4.334-1.343-5.334-3.291m0 0A7.961 7.961 0 005 12c0-2.334 1.343-4.334 3.291-5.334m10.676 10.676L21 21" />
                            </svg>
                            <p class="text-lg font-medium text-white">Tidak ada data level</p>
                        </div>
                    </td>
                </tr>
            `;
            document.getElementById("pageInfo").innerText = "Tidak ada data";
            document.getElementById("prevBtn").disabled = true;
            document.getElementById("nextBtn").disabled = true;
            return;
        }

        // Render rows
        tbody.innerHTML = items.map((item, index) => {
            const rowNumber = (paginatorInfo.currentPage - 1) * paginatorInfo.perPage + index + 1;
            return `
                <tr class="border-b border-white/10 hover:bg-white/5 transition">
                    <td class="p-4 text-center font-mono">${rowNumber}</td>
                    <td class="p-4 font-medium">${escapeHtml(item.nama)}</td>
                    <td class="p-4 max-w-xs truncate">${escapeHtml(item.deskripsi || '-')}</td>
                    <td class="p-4 text-sm text-cyan-200">
                        ${new Date(item.created_at).toLocaleDateString('id-ID')}
                    </td>
                    <td class="p-4 text-center">
                        <div class="flex justify-center gap-2">
                            <button 
                                onclick="openEditModal('${item.id}', '${escapeHtml(item.nama)}', '${escapeHtml(item.deskripsi || '')}')"
                                class="w-9 h-9 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 hover:text-white transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </button>
                            <button 
                                onclick="hapusLevel('${item.id}')"
                                class="w-9 h-9 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 hover:text-white transition">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }).join('');

        // Update pagination info
        const totalPages = paginatorInfo.lastPage;
        document.getElementById("pageInfo").innerText = 
            `Halaman ${paginatorInfo.currentPage} dari ${totalPages} • Total ${paginatorInfo.total} data`;

        // Update button states
        document.getElementById("prevBtn").disabled = paginatorInfo.currentPage <= 1;
        document.getElementById("nextBtn").disabled = paginatorInfo.currentPage >= paginatorInfo.lastPage;

    } catch (error) {
        console.error('Error loading level data:', error);
        document.getElementById('dataLevel').innerHTML = `
            <tr>
                <td colspan="5" class="text-center p-4 text-red-400">
                    Gagal memuat data. Cek koneksi atau coba lagi.
                </td>
            </tr>
        `;
    }
}

// Search handler
function searchLevel() {
    loadDataPaginate(1);
}

// Pagination controls
function prevPage() {
    if (currentPage > 1) loadDataPaginate(currentPage - 1);
}

function nextPage() {
    loadDataPaginate(currentPage + 1);
}

// Delete handler
async function hapusLevel(id) {
    if (!confirm("Yakin ingin menghapus level ini?")) return;

    const mutation = `
        mutation($id: ID!) {
            deleteLevel(id: $id) {
                id
            }
        }
    `;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation, variables: { id } })
        });

        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0]?.message || 'Delete failed');

        alert('Level berhasil dihapus!');
        loadDataPaginate(currentPage);
    } catch (error) {
        alert('Gagal menghapus level: ' + error.message);
    }
}

// Helper: escape HTML to prevent XSS
function escapeHtml(text) {
    if (typeof text !== 'string') return '';
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "<")
        .replace(/>/g, ">")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    loadDataPaginate();
});