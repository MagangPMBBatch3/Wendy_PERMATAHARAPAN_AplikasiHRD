function openEditModal(id, nama) {
    document.getElementById('editBagianId').value = id;
    document.getElementById('namaBagian').value = nama;
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateBagian() {
    const id = document.getElementById('editBagianId').value;
    const newNama = document.getElementById('namaBagian').value;
    if (!newNama) return alert("Nama tidak boleh kosong");

    const mutation = `
    mutation {
        updateBagian(input: { id: ${id}, nama: "${newNama}" }) {
            id
            nama
        }
    }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    closeEditModal();
    loadData();
}