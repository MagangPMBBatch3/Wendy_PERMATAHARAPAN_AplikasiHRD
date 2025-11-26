const API_URL = '/graphql';

function closeAddModal() {
    document.getElementById('modalAdd').classList.add('hidden');
    document.getElementById('addName').value = '';
    document.getElementById('addEmail').value = '';
    document.getElementById('addPassword').value = '';
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
            loadDataPaginate(1);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        alert('Gagal membuat user: ' + error.message);
    }
}