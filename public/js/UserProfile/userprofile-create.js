const API_URL = '/graphql';

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    // Reset form
    document.getElementById('addUserId').value = '';
    document.getElementById('addStaffId').value = '';
    document.getElementById('addNamaLengkap').value = '';
    document.getElementById('addNrp').value = '';
    document.getElementById('addAlamat').value = '';
}

async function createUserProfile() {
    const user_id = document.getElementById('addUserId').value.trim();
    const staff_id = document.getElementById('addStaffId').value.trim();
    const nama_lengkap = document.getElementById('addNamaLengkap').value.trim();
    const nrp = document.getElementById('addNrp').value.trim();
    const alamat = document.getElementById('addAlamat').value.trim();

    // ✅ Enforce required fields (match your GraphQL schema)
    if (!nama_lengkap) {
        alert("Nama Lengkap harus diisi");
        document.getElementById('addNamaLengkap').focus();
        return;
    }
    if (!user_id) {
        alert("User harus dipilih");
        document.getElementById('addUserId').focus();
        return;
    }
    if (!staff_id) {
        alert("Staff harus dipilih");
        document.getElementById('addStaffId').focus();
        return;
    }

    const mutation = `
        mutation($input: CreateUserProfileInput!) {
            createUserProfile(input: $input) {
                id
                nama_lengkap
                nrp
            }
        }
    `;

    // ✅ Send as integers (GraphQL ID! expects non-null)
    const variables = {
        input: {
            user_id: parseInt(user_id),   // ← no null fallback
            staff_id: parseInt(staff_id), // ← no null fallback
            nama_lengkap,
            nrp: nrp || null,
            alamat: alamat || null
        }
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation, variables })
        });

        const json = await res.json();
        
        if (json.errors) {
            throw new Error(json.errors[0]?.message || 'Unknown error');
        }

        if (json.data?.createUserProfile) {
            alert('✅ User Profile berhasil dibuat!');
            closeAddModal();
            // Reload current page (or trigger refresh)
            if (typeof loadDataPaginate === 'function') {
                loadDataPaginate(1);
            } else {
                location.reload();
            }
        }
    } catch (error) {
        console.error('Error:', error);
        alert('❌ Gagal membuat user profile: ' + error.message);
    }
}