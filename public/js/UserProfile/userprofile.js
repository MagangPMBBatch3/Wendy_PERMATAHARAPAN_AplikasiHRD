const API_URL = '/graphql';
let currentPage = 1;
let perPage = 10;
let searchValue = '';

async function loadDataPaginate(page = 1) {
    currentPage = page;
    perPage = document.getElementById('perPage')?.value || 10;
    searchValue = document.getElementById('searchInput')?.value || '';

    const variables = { first: parseInt(perPage), page: currentPage, search: searchValue };

    const query = `
        query($first: Int, $page: Int, $search: String) {
            allUserProfilePaginate(first: $first, page: $page, search: $search) {
                data {
                    id
                    user_id
                    staff_id
                    nama_lengkap
                    nrp
                    alamat
                    foto
                }
                paginatorInfo {
                    currentPage
                    total
                    perPage
                    lastPage
                }
            }
        }
    `;

    try {
        document.getElementById('dataUser').innerHTML = `
            <tr>
                <td colspan="7" class="text-center p-8">
                    <div class="flex flex-col items-center">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
                    </div>
                </td>
            </tr>
        `;

        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query, variables })
        });
        const json = await res.json();

        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            document.getElementById('dataUser').innerHTML = `<tr><td colspan="7" class="text-center p-2 text-red-500">Error: ${json.errors[0]?.message || 'Unknown error'}</td></tr>`;
            return;
        }

        const tbody = document.getElementById('dataUser');
        tbody.innerHTML = "";

        const result = json.data.allUserProfilePaginate;
        const items = result.data;
        const paginatorInfo = result.paginatorInfo;

        if (!items || items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="7" class="text-center p-4 text-white/70">Data tidak ditemukan</td></tr>';
            document.getElementById("pageInfo").innerText = "Tidak ada data";
            document.getElementById("prevBtn").disabled = true;
            document.getElementById("nextBtn").disabled = true;
            return;
        }

        // Helper: escape HTML
        const escape = (str) => {
            if (typeof str !== 'string') return '-';
            return str
                .replace(/&/g, "&amp;")
                .replace(/</g, "<")
                .replace(/>/g, ">")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        };

        items.forEach((item, index) => {
            const rowNumber = (paginatorInfo.currentPage - 1) * paginatorInfo.perPage + index + 1;
            
            // Avatar rendering
            let avatarHtml;
            if (item.foto) {
                const safeFoto = escape(item.foto);
                const safeNama = escape(item.nama_lengkap);
                avatarHtml = `
                    <img src="${safeFoto}" 
                         alt="Foto ${safeNama}" 
                         class="w-8 h-8 rounded-full object-cover border-2 border-white shadow-sm bg-gray-200">
                `;
            } else {
                const initial = item.nama_lengkap?.charAt(0)?.toUpperCase() || '?';
                avatarHtml = `
                    <div class="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xs border-2 border-white shadow-sm">
                        ${escape(initial)}
                    </div>
                `;
            }

            tbody.innerHTML += `
                <tr class="border-b border-white/10 hover:bg-white/5 transition-colors">
                    <td class="p-3 text-center font-mono text-white/80">${rowNumber}</td>
                    <td class="p-3">${avatarHtml}</td>
                    <td class="p-3">
                        <div class="flex items-center gap-3">
                            <span class="font-medium text-white">${escape(item.nama_lengkap)}</span>
                        </div>
                    </td>
                    <td class="p-3 font-mono text-cyan-200">${escape(item.nrp)}</td>
                    <td class="p-3 text-white/90">${item.user_id || '-'}</td>
                    <td class="p-3 text-white/90">${item.staff_id || '-'}</td>
                    <td class="p-3 max-w-xs truncate text-white/90">${escape(item.alamat)}</td>
                    <td class="p-3 text-center">
                        <div class="flex justify-center gap-2">
                            <button 
                                class="bg-yellow-500/90 hover:bg-yellow-600 text-white px-3 py-1.5 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 flex items-center gap-1"
                                onclick="openEditModal('${item.id}', '${item.user_id}', '${item.staff_id}', '${escape(item.nama_lengkap).replace(/'/g, "\\'")}', '${escape(item.nrp).replace(/'/g, "\\'")}', '${escape(item.alamat).replace(/'/g, "\\'")}', '${item.foto ? escape(item.foto).replace(/'/g, "\\'") : ''}')">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                            </button>
                            <button 
                                class="bg-red-500/90 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm transition-all duration-200 transform hover:scale-105 flex items-center gap-1"
                                onclick="hapusUserProfile('${item.id}')">
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Hapus
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });

        // Update pagination
        const totalPages = paginatorInfo.lastPage;
        document.getElementById("pageInfo").innerText = 
            `Halaman ${paginatorInfo.currentPage} dari ${totalPages} • Total ${paginatorInfo.total} data`;

        document.getElementById("prevBtn").disabled = paginatorInfo.currentPage <= 1;
        document.getElementById("nextBtn").disabled = paginatorInfo.currentPage >= paginatorInfo.lastPage;
    } catch (error) {
        console.error('Error loading data:', error);
        document.getElementById('dataUser').innerHTML = `
            <tr>
                <td colspan="7" class="text-center p-4 text-red-400">
                    Gagal memuat data. Cek koneksi atau coba lagi.
                </td>
            </tr>
        `;
    }
}

function searchUser() {
    loadDataPaginate(1);
}

function prevPage() {
    if (currentPage > 1) loadDataPaginate(currentPage - 1);
}

function nextPage() {
    loadDataPaginate(currentPage + 1);
}

async function hapusUserProfile(id) {
    if (!confirm("Yakin ingin menghapus profil ini? Tindakan ini tidak bisa dibatalkan.")) return;

    const mutation = `
        mutation($id: ID!) {
            deleteUserProfile(id: $id) {
                id
            }
        }
    `;

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation, variables: { id } })
        });

        const json = await res.json();
        if (json.errors) throw new Error(json.errors[0]?.message || 'Delete failed');

        alert('✅ Profil berhasil dihapus!');
        loadDataPaginate(currentPage);
    } catch (error) {
        console.error('Delete error:', error);
        alert('❌ Gagal menghapus profil: ' + error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Initialize image previews if modals exist
    setupImagePreviews();
    loadDataPaginate();
});

// Modal control
function openAddModal() {
    resetAddForm();
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    resetAddForm();
}

function openEditModal(id, user_id, staff_id, nama_lengkap, nrp, alamat, foto = '') {
    document.getElementById('editId').value = id;
    document.getElementById('editUserId').value = user_id;
    document.getElementById('editStaffId').value = staff_id;
    document.getElementById('editNamaLengkap').value = nama_lengkap;
    document.getElementById('editNrp').value = nrp;
    document.getElementById('editAlamat').value = alamat;
    
    // Handle foto (new)
    const fotoPreview = document.getElementById('editFotoPreview');
    const fotoInput = document.getElementById('editFoto');
    if (fotoPreview) {
        fotoPreview.src = foto || '/images/placeholder-avatar.png';
    }
    if (fotoInput) {
        fotoInput.value = foto || '';
    }
    
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

// Image preview setup
function setupImagePreviews() {
    // Add modal
    const addFotoInput = document.getElementById('addFoto');
    const addPreview = document.getElementById('addFotoPreview');
    const addPreviewContainer = document.getElementById('addFotoPreviewContainer');
    
    if (addFotoInput && addPreview && addPreviewContainer) {
        addFotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    addPreview.src = e.target.result;
                    addPreviewContainer.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Edit modal
    const editFotoInput = document.getElementById('editFotoInput');
    const editPreview = document.getElementById('editFotoPreview');
    
    if (editFotoInput && editPreview) {
        editFotoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    editPreview.src = e.target.result;
                    document.getElementById('editFoto').value = e.target.result; // base64
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function resetAddForm() {
    const els = ['addUserId', 'addStaffId', 'addNamaLengkap', 'addNrp', 'addAlamat', 'addFoto'];
    els.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    // Hide preview
    const container = document.getElementById('addFotoPreviewContainer');
    if (container) container.classList.add('hidden');
}

// Create
async function createUserProfile() {
    const user_id = document.getElementById('addUserId')?.value.trim();
    const staff_id = document.getElementById('addStaffId')?.value.trim();
    const nama_lengkap = document.getElementById('addNamaLengkap')?.value.trim();
    const nrp = document.getElementById('addNrp')?.value.trim();
    const alamat = document.getElementById('addAlamat')?.value.trim();
    
    // Handle foto
    let foto = null;
    const fotoInput = document.getElementById('addFoto');
    if (fotoInput?.files?.[0]) {
        foto = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(fotoInput.files[0]);
        });
    }

    if (!nama_lengkap) {
        alert("⚠️ Nama Lengkap harus diisi");
        return;
    }

    const mutation = `
        mutation($input: CreateUserProfileInput!) {
            createUserProfile(input: $input) {
                id
                nama_lengkap
                nrp
                foto
            }
        }
    `;

    const variables = {
        input: {
            user_id: user_id || null,
            staff_id: staff_id || null,
            nama_lengkap,
            nrp: nrp || null,
            alamat: alamat || null,
            foto: foto || null
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
        
        if (json.errors) throw new Error(json.errors[0]?.message || 'Unknown error');
        if (json.data?.createUserProfile) {
            alert('✅ Profil berhasil dibuat!');
            closeAddModal();
            loadDataPaginate(1);
        }
    } catch (error) {
        console.error('Create error:', error);
        alert('❌ Gagal membuat profil: ' + error.message);
    }
}

// Update
async function updateUserProfile() {
    const id = document.getElementById('editId')?.value;
    const user_id = document.getElementById('editUserId')?.value.trim();
    const staff_id = document.getElementById('editStaffId')?.value.trim();
    const nama_lengkap = document.getElementById('editNamaLengkap')?.value.trim();
    const nrp = document.getElementById('editNrp')?.value.trim();
    const alamat = document.getElementById('editAlamat')?.value.trim();
    const foto = document.getElementById('editFoto')?.value || null;

    if (!id || !nama_lengkap) {
        alert("⚠️ ID dan Nama Lengkap harus diisi");
        return;
    }

    const mutation = `
        mutation($id: ID!, $input: UpdateUserProfileInput!) {
            updateUserProfile(id: $id, input: $input) {
                id
                nama_lengkap
                nrp
                foto
            }
        }
    `;

    const variables = {
        id,
        input: {
            user_id: user_id || null,
            staff_id: staff_id || null,
            nama_lengkap,
            nrp: nrp || null,
            alamat: alamat || null,
            foto
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
        
        if (json.errors) throw new Error(json.errors[0]?.message || 'Unknown error');
        if (json.data?.updateUserProfile) {
            alert('✅ Profil berhasil diubah!');
            closeEditModal();
            loadDataPaginate(currentPage);
        }
    } catch (error) {
        console.error('Update error:', error);
        alert('❌ Gagal mengubah profil: ' + error.message);
    }
}