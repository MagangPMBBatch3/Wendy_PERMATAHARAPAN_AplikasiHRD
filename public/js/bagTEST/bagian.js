const variables = { first: parseInt(perPage), page: searchValue };

const res = await fetch(API_URL, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query, variables })
});
const data = await res.json();

const tbody = document.getElementById("dataBagian");
tbody.innerHTML = "";

const result = data.data.allBagianPaginate;
const items = result.data;
const pageInfo = result.pageInfo;

if (!items || items.length === 0) {
    tbody.innerHTML =
        '<tr><td colspan="3" class="text-center p-2">Data tidak ditemukan</td></tr>';
    document.getElementById("pageInfo").innerText = "Tidak ada";
    return;
}

if (!items || items.length === 0) {
  tbody.innerHTML = `
    <tr><td colspan="3" class="text-center p-2">Data tidak ditemukan</td></tr>
  `;
  document.getElementById("pageInfo").innerText = "Tidak ada data";
  return;
}

// Render baris tabel
items.forEach((item, index) => {
  tbody.innerHTML += `
    <tr>
      <td class="p-2">${item.id}</td>
      <td class="p-2">${item.nama}</td>
      <td class="p-2 text-end">
        <button class="btn btn-sm btn-warning" onclick="openEditModal('${item.id}', '${item.nama}')">Edit</button>
        <button class="btn btn-sm btn-danger" onclick="hapusBagian('${item.id}')">Hapus</button>
      </td>
    </tr>
  `;
});

// Update info halaman
document.getElementById("pageInfo").innerText = `Halaman ${pageInfo.currentPage} dari ${pageInfo.total}`;

// Update tombol prev/next
document.getElementById("prevBtn").disabled = !pageInfo.hasPreviousPage;
document.getElementById("nextBtn").disabled = !pageInfo.hasMorePages;

// Pencarian
function searchBagian() {
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
async function hapusBagian(id) {
    if (!confirm("Yakin ingin menghapus data ini?")) return;

    const mutation = `
        mutation($id: ID!) {
            deleteBagian(id: $id)
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