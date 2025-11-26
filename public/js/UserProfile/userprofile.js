const API_URL = '/graphql';
let currentPage = 1;
let perPage = 10;
let searchValue = '';

async function loadDataPaginate(page = 1) {
    currentPage = page;
    searchValue = document.getElementById('searchInput').value || '';

    const variables = { first: parseInt(perPage), page: currentPage, search: searchValue };

    const query = `
        query($first: Int, $page: Int, $search: String) {
            allUserProfilePaginate(first: $first, page: $page, search: $search) {
                data {
                    id
                    nama_lengkap
                    nrp
                    alamat
                    created_at
                    user { name }
                    staff { user { name } }
                }
                pageInfo {
                    currentPage
                    total
                    hasPreviousPage
                    hasMorePages
                }
            }
        }
    `;

    const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, variables })
    });
    const data = await res.json();

    const tbody = document.getElementById("dataUserProfile");
    tbody.innerHTML = "";

    const result = data.data.allUserProfilePaginate;
    const items = result.data;
    const pageInfo = result.pageInfo;

    if (!items || items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="text-center p-2">Data tidak ditemukan</td></tr>';
        document.getElementById("pageInfo").innerText = "Tidak ada";
        return;
    }

    // Render baris tabel
    items.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td class="p-2">${item.id}</td>
                <td class="p-2">${item.nama_lengkap}</td>
                <td class="p-2">${item.nrp || '-'}</td>
                <td class="p-2">${item.user?.name || '-'}</td>
                <td class="p-2">${item.staff?.user?.name || '-'}</td>
                <td class="p-2">${item.alamat || '-'}</td>
                <td class="p-2">${formatDate(item.created_at)}</td>
                <td class="p-2 text-end">
                    <button class="btn btn-sm btn-warning" onclick="openEditModal('${item.id}', '${item.nama_lengkap}', '${item.nrp || ''}', '${item.alamat || ''}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="hapusUserProfile('${item.id}')">Hapus</button>
                </td>
            </tr>
        `;
    });

    // Update info halaman
    document.getElementById("pageInfo").innerText = `Halaman ${pageInfo.currentPage} dari ${pageInfo.total}`;

    // Update tombol prev/next
    document.getElementById("prevBtn").disabled = !pageInfo.hasPreviousPage;
    document.getElementById("nextBtn").disabled = !pageInfo.hasMorePages;
}

// Pencarian
function searchUserProfile() {
    loadDataPaginate();
}

// Pagination tombol
function prevPage() {
    if (currentPage > 1) loadDataPaginate(currentPage - 1);
}

function nextPage() {
    loadDataPaginate(currentPage + 1);
}

// Hapus data
async function hapusUserProfile(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const mutation = `
        mutation($id: ID!) {
            deleteUserProfile(id: $id)
        }
    `;

    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables: { id } })
    });

    loadDataPaginate(currentPage);
}

// Load otomatis saat halaman dibuka
document.addEventListener("DOMContentLoaded", () => {
    loadDataPaginate();
});

// Utility function
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
