const API_URL = '/graphql';
let currentPage = 1;
let perPage = 10;
let searchValue = '';

async function loadDataPaginate(page = 1) {
    currentPage = page;
    perPage = document.getElementById('perPage').value || 10;
    searchValue = document.getElementById('searchInput').value || '';

    const variables = { first: parseInt(perPage), page: currentPage, search: searchValue };

    const query = `
        query($first: Int, $page: Int, $search: String) {
            allLevelPaginate(first: $first, page: $page, search: $search) {
                data {
                    id
                    name
                    description
                    created_at
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

    const tbody = document.getElementById("dataLevel");
    tbody.innerHTML = "";

    const result = data.data.allLevelPaginate;
    const items = result.data;
    const pageInfo = result.pageInfo;

    if (!items || items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center p-2">Data tidak ditemukan</td></tr>';
        document.getElementById("pageInfo").innerText = "Tidak ada";
        return;
    }

    // Render baris tabel
    items.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td class="p-2">${item.id}</td>
                <td class="p-2">${item.name}</td>
                <td class="p-2">${item.description || '-'}</td>
                <td class="p-2">${formatDate(item.created_at)}</td>
                <td class="p-2 text-end">
                    <button class="btn btn-sm btn-warning" onclick="openEditModal('${item.id}', '${item.name}', '${item.description || ''}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="hapusLevel('${item.id}')">Hapus</button>
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
function searchLevel() {
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
async function hapusLevel(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const mutation = `
        mutation($id: ID!) {
            deleteLevel(id: $id)
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

// Modal Add
function openAddModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addName').value = '';
    document.getElementById('addDescription').value = '';
}

async function createLevel() {
    const name = document.getElementById('addName').value;
    const description = document.getElementById('addDescription').value;
    if (!name) return alert("Name is required");

    const mutation = `
        mutation($input: CreateLevelInput!) {
            createLevel(input: $input) { id }
        }
    `;
    const variables = {
        input: {
            name,
            description
        }
    };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables })
    });
    closeAddModal();
    loadDataPaginate(currentPage);
}

// Modal Edit
function openEditModal(id, name, description) {
    document.getElementById('editLevelId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editDescription').value = description;
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateLevel() {
    const id = document.getElementById('editLevelId').value;
    const name = document.getElementById('editName').value;
    const description = document.getElementById('editDescription').value;
    if (!name) return alert("Name is required");

    const mutation = `
        mutation($input: UpdateLevelInput!) {
            updateLevel(input: $input) { id }
        }
    `;
    const variables = {
        input: {
            id: parseInt(id),
            name,
            description
        }
    };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: mutation, variables })
    });
    closeEditModal();
    loadDataPaginate(currentPage);
}

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
