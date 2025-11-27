function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addNama').value = '';
    document.getElementById('addDeskripsi').value = '';
}

async function createLevel() {
    const nama = document.getElementById('addNama').value.trim();
    const deskripsi = document.getElementById('addDeskripsi').value.trim();

    if (!nama) {
        alert("Nama Level harus diisi");
        return;
    }

    const mutation = `
        mutation($input: CreateLevelInput!) {
            createLevel(input: $input) {
                id
                nama
            }
        }
    `;

    const variables = { input: { nama, deskripsi } };

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
        if (json.data?.createLevel) {
            alert('Level berhasil dibuat!');
            closeAddModal();
            loadDataPaginate(1);
        }
    } catch (error) {
        alert('Gagal membuat level: ' + error.message);
    }
}