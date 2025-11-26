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
            allUserPaginate(first: $first, page: $page, search: $search) {
                data {
                    id
                    name
                    email
                    email_verified_at
                    created_at
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
            document.getElementById('dataUser').innerHTML = `<tr><td colspan="6" class="text-center p-2 text-red-500">Error: ${json.errors[0]?.message || 'Unknown error'}</td></tr>`;
            return;
        }

        const tbody = document.getElementById('dataUser');
        tbody.innerHTML = "";

        const result = json.data.allUserPaginate;
        const items = result.data;
        const paginatorInfo = result.paginatorInfo;

        if (!items || items.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="text-center p-2">Data tidak ditemukan</td></tr>';
            document.getElementById("pageInfo").innerText = "Tidak ada";
            return;
        }

        items.forEach((item, index) => {
            const rowNumber = (paginatorInfo.currentPage - 1) * paginatorInfo.perPage + index + 1;
            tbody.innerHTML += `
                <tr>
                    <td class="p-2 text-center">${rowNumber}</td>
                    <td class="p-2">${item.name}</td>
                    <td class="p-2">${item.email}</td>
                    <td class="p-2">${item.email_verified_at ? new Date(item.email_verified_at).toLocaleString() : '-'}</td>
                    <td class="p-2">${new Date(item.created_at).toLocaleDateString()}</td>
                    <td class="p-2 text-center">
                        <button class="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-2 transition-all duration-300 transform hover:scale-105" onclick="openEditModal('${item.id}', '${item.name}', '${item.email}', '${item.email_verified_at || ''}')">Edit</button>
                        <button class="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105" onclick="hapusUser('${item.id}')">Hapus</button>
                    </td>
                </tr>
            `;
        });

        // Update pagination info
        const totalPages = paginatorInfo.lastPage;
        document.getElementById("pageInfo").innerText = `Halaman ${paginatorInfo.currentPage} dari ${totalPages}`;

        // Update prev/next button states
        document.getElementById("prevBtn").disabled = paginatorInfo.currentPage <= 1;
        document.getElementById("nextBtn").disabled = paginatorInfo.currentPage >= paginatorInfo.lastPage;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('dataUser').innerHTML = `<tr><td colspan="6" class="text-center p-2 text-red-500">Error loading data</td></tr>`;
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

async function hapusUser(id) {
    if (!confirm("Yakin ingin menghapus user ini?")) return;

    const mutation = `
        mutation($id: ID!) {
            deleteUser(id: $id) {
                id
            }
        }
    `;

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({ query: mutation, variables: { id } })
        });

        loadDataPaginate(currentPage);
    } catch (error) {
        console.error('Error:', error);
        alert('Gagal menghapus user');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    loadDataPaginate();
});

function openAddModal() {
    document.getElementById('modalAdd').classList.remove('hidden');
}

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
}

function openEditModal(id, name, email, emailVerifiedAt) {
    document.getElementById('editUserId').value = id;
    document.getElementById('editName').value = name;
    document.getElementById('editEmail').value = email;
    if(emailVerifiedAt) {
        let dt = new Date(emailVerifiedAt);
        document.getElementById('editEmailVerifiedAt').value = dt.toISOString().slice(0,16);
    } else {
        document.getElementById('editEmailVerifiedAt').value = '';
    }
    document.getElementById('editPassword').value = '';
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function createUser() {
    console.log('createUser called');
    const name = document.getElementById('addName').value.trim();
    const email = document.getElementById('addEmail').value.trim();
    const password = document.getElementById('addPassword').value.trim();

    console.log('Form values:', { name, email, password });

    if (!name || !email || !password) {
        alert("Semua field harus diisi");
        return;
    }

    const mutation = `
        mutation($input: CreateUserInput!) {
            createUser(input: $input) {
                id
                name
                email
            }
        }
    `;

    const variables = {
        input: { name, email, password }
    };

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

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        console.log('Response JSON:', json);
        
        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            alert('Error: ' + (json.errors[0]?.message || 'Unknown error'));
            return;
        }

        if (json.data && json.data.createUser) {
            alert('User berhasil dibuat!');
            closeAddModal();
            document.getElementById('addName').value = '';
            document.getElementById('addEmail').value = '';
            document.getElementById('addPassword').value = '';
            loadDataPaginate(1);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Gagal membuat user: ' + error.message);
    }
}

async function updateUser() {
    console.log('updateUser called');
    const id = document.getElementById('editUserId').value;
    const name = document.getElementById('editName').value.trim();
    const email = document.getElementById('editEmail').value.trim();
    const password = document.getElementById('editPassword').value.trim();
    const emailVerifiedAt = document.getElementById('editEmailVerifiedAt').value 
        ? new Date(document.getElementById('editEmailVerifiedAt').value).toISOString() 
        : null;

    console.log('Form values:', { id, name, email, password, emailVerifiedAt });

    if (!id || !name || !email) {
        alert("ID, Name dan Email harus diisi");
        return;
    }

    const input = {
        name,
        email,
        email_verified_at: emailVerifiedAt
    };
    
    if (password) {
        input.password = password;
    }

    const mutation = `
        mutation($id: ID!, $input: UpdateUserInput!) {
            updateUser(id: $id, input: $input) {
                id
                name
                email
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

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const json = await res.json();
        console.log('Response JSON:', json);
        
        if (json.errors) {
            console.error('GraphQL Errors:', json.errors);
            alert('Error: ' + (json.errors[0]?.message || 'Unknown error'));
            return;
        }

        if (json.data && json.data.updateUser) {
            alert('User berhasil diubah!');
            closeEditModal();
            loadDataPaginate(currentPage);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        alert('Gagal mengubah user: ' + error.message);
    }
}