const API_URL = '/graphql';

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
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