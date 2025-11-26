const API_URL = '/graphql';
let currentPage = 1;
let perPage = 10;
let searchValue = '';
let staffOptions = [];
let proyekOptions = [];

async function loadDataPaginate(page = 1) {
    currentPage = page;
    searchValue = document.getElementById('searchInput').value || '';

    const variables = { first: parseInt(perPage), page: currentPage, search: searchValue };

    const query = `
        query($first: Int, $page: Int, $search: String) {
            allKinerjaPaginate(first: $first, page: $page, search: $search) {
                data {
                    id
                    points
                    description
                    date
                    staff { user { name } }
                    proyek { name }
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

    const tbody = document.getElementById("dataKinerja");
    tbody.innerHTML = "";

    const result = data.data.allKinerjaPaginate;
    const items = result.data;
    const pageInfo = result.pageInfo;

    if (!items || items.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center p-2">Data tidak ditemukan</td></tr>';
        document.getElementById("pageInfo").innerText = "Tidak ada";
        return;
    }

    // Render baris tabel
    items.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td class="p-2">${item.id}</td>
                <td class="p-2">${item.staff?.user?.name || '-'}</td>
                <td class="p-2">${item.proyek?.name || '-'}</td>
                <td class="p-2">${item.points}</td>
                <td class="p-2">${item.description || '-'}</td>
                <td class="p-2">${formatDate(item.date)}</td>
                <td class="p-2 text-end">
                    <button class="btn btn-sm btn-warning" onclick="openEditModal('${item.id}', '${item.points}', '${item.description || ''}', '${item.date}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="hapusKinerja('${item.id}')">Hapus</button>
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
function searchKinerja() {
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
async function hapusKinerja(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const mutation = `
        mutation($id: ID!) {
            deleteKinerja(id: $id)
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
document.addEventListener("DOMContentLoaded", async () => {
    await loadOptions();
    loadDataPaginate();
});

// Load options for selects
async function loadOptions() {
    // Load staff
    const queryStaff = `query { allStaff { data { id user { name } } } }`;
    const resStaff = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: queryStaff }) });
    const dataStaff = await resStaff.json();
    staffOptions = dataStaff.data.allStaff.data;

    // Load proyek
    const queryProyek = `query { allProyek { data { id name } } }`;
    const resProyek = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ query: queryProyek }) });
    const dataProyek = await resProyek.json();
    proyekOptions = dataProyek.data.allProyek.data;
}

// Modal Add
function openAddModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
    // Populate staff select
    const staffSelect = document.getElementById('addStaffId');
    staffSelect.innerHTML = '<option value="">Pilih Staff</option>';
    staffOptions.forEach(s => {
        staffSelect.innerHTML += `<option value="${s.id}">${s.user.name}</option>`;
    });
    // Populate proyek select
    const proyekSelect = document.getElementById('addProyekId');
    proyekSelect.innerHTML = '<option value="">Pilih Proyek</option>';
    proyekOptions.forEach(p => {
        proyekSelect.innerHTML += `<option value="${p.id}">${p.name}</option>`;
    });
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addStaffId').value = '';
    document.getElementById('addProyekId').value = '';
    document.getElementById('addPoints').value = '';
    document.getElementById('addDescription').value = '';
    document.getElementById('addDate').value = '';
}

async function createKinerja() {
    const staff_id = document.getElementById('addStaffId').value;
    const proyek_id = document.getElementById('addProyekId').value;
    const points = document.getElementById('addPoints').value;
    const description = document.getElementById('addDescription').value;
    const date = document.getElementById('addDate').value;
    if (!staff_id || !proyek_id || !points || !date) return alert("All fields are required");

    const mutation = `
        mutation($input: CreateKinerjaInput!) {
            createKinerja(input: $input) { id }
        }
    `;
    const variables = {
        input: {
            staff_id: parseInt(staff_id),
            proyek_id: parseInt(proyek_id),
            points: parseInt(points),
            description,
            date
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
function openEditModal(id, points, description, date) {
    document.getElementById('editKinerjaId').value = id;
    document.getElementById('editPoints').value = points;
    document.getElementById('editDescription').value = description;
    document.getElementById('editDate').value = date;
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateKinerja() {
    const id = document.getElementById('editKinerjaId').value;
    const points = document.getElementById('editPoints').value;
    const description = document.getElementById('editDescription').value;
    const date = document.getElementById('editDate').value;
    if (!points || !date) return alert("Points and Date are required");

    const mutation = `
        mutation($input: UpdateKinerjaInput!) {
            updateKinerja(input: $input) { id }
        }
    `;
    const variables = {
        input: {
            id: parseInt(id),
            points: parseInt(points),
            description,
            date
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
