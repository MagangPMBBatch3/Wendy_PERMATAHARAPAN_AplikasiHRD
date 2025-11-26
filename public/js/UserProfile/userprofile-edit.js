function openEditModal(id, nama_lengkap, nrp, alamat) {
    document.getElementById('editUserProfileId').value = id;
    document.getElementById('editNamaLengkap').value = nama_lengkap;
    document.getElementById('editNrp').value = nrp;
    document.getElementById('editAlamat').value = alamat;
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateUserProfile() {
    const id = document.getElementById('editUserProfileId').value;
    const nama_lengkap = document.getElementById('editNamaLengkap').value;
    const nrp = document.getElementById('editNrp').value;
    const alamat = document.getElementById('editAlamat').value;
    if (!nama_lengkap) return alert("Nama Lengkap tidak boleh kosong");

    const mutation = `
        mutation {
            updateUserProfile(input: { id: ${id}, nama_lengkap: "${nama_lengkap}", nrp: "${nrp}", alamat: "${alamat}" }) {
                id
                nama_lengkap
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
