const API_URL = '/graphql';

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
    console.log('updateUserProfile called');
    
    const id = document.getElementById('editUserProfileId').value;
    const nama_lengkap = document.getElementById('editNamaLengkap').value.trim();
    const nrp = document.getElementById('editNrp').value.trim();
    const alamat = document.getElementById('editAlamat').value.trim();

    console.log('Form values:', { id, nama_lengkap, nrp, alamat });

    if (!id || !nama_lengkap) {
        alert("ID dan Nama Lengkap harus diisi");
        return;
    }

    const input = {
        nama_lengkap,
        nrp,
        alamat
    };

    const mutation = `
        mutation($id: ID!, $input: UpdateUserProfileInput!) {
            updateUserProfile(id: $id, input: $input) {
                id
                nama_lengkap
                nrp
                alamat
            }
        }
    `;

    const variables = { id, input };

    try {
        console.log('Sending GraphQL mutation...');
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation, variables })
        });

        console.log('Response status:', res.status);

        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

        const json = await res.json();
        console.log('Response JSON:', json);

        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            alert('Error: ' + (json.errors[0]?.message || 'Unknown error'));
            return;
        }

        if (json.data && json.data.updateUserProfile) {
            alert('User Profile berhasil diubah!');
            closeEditModal();
            loadData(); // If using pagination: loadDataPaginate(currentPage);
        }
    } catch (error) {
        console.error('Error updating user profile:', error);
        alert('Gagal mengubah user profile: ' + error.message);
    }
}
