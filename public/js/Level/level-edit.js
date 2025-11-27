function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

function openEditModal(id, nama, deskripsi = '') {
    document.getElementById('editId').value = id;
    document.getElementById('editNama').value = nama;
    document.getElementById('editDeskripsi').value = deskripsi || '';
    document.getElementById('modalEdit').classList.remove('hidden');
}

async function updateLevel() {
    const id = document.getElementById('editId').value;
    const nama = document.getElementById('editNama').value.trim();
    const deskripsi = document.getElementById('editDeskripsi').value.trim();

    if (!id || !nama) {
        alert("ID dan Nama Level harus diisi");
        return;
    }

    const mutation = `
        mutation($id: ID!, $input: UpdateLevelInput!) {
            updateLevel(id: $id, input: $input) {
                id
                nama
            }
        }
    `;

    const variables = { id, input: { nama, deskripsi } };

    try {
        const res = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation, variables })
        });

        const json = await res.json();
        
        if (json.errors) throw new Error(json.errors[0]?.message || 'Unknown error');
        if (json.data?.updateLevel) {
            alert('Level berhasil diubah!');
            closeEditModal();
            loadDataPaginate(currentPage);
        }
    } catch (error) {
        alert('Gagal mengubah level: ' + error.message);
    }
}