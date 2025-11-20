/**
 * User CRUD Manager
 */

class UserCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'User',
            queryName: 'allUsers',
            createMutation: 'createUser',
            updateMutation: 'updateUser',
            deleteMutation: 'deleteUser',
            fields: `
                id
                name
                email
                role
            `,
            relatedFields: {}
        });
    }

    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${item.id}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.name || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.email || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700"><span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">${item.role || 'user'}</span></td>
                <td class="px-6 py-4 text-sm space-x-2">
                    <button onclick="crud.edit(${item.id})" class="text-green-600 hover:text-green-800 font-medium">Edit</button>
                    <button onclick="crud.delete(${item.id})" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
            `;
            
            this.tableBody.appendChild(row);
        });
    }

    async create(data) {
        try {
            const mutation = `
                mutation {
                    createUser(input: {
                        name: "${data.name}"
                        email: "${data.email}"
                        password: "${data.password}"
                        role: "${data.role}"
                    }) {
                        id
                        name
                        email
                        role
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query: mutation })
            });

            const result = await response.json();
            if (result.errors) {
                this.showNotification('Failed to create user', 'error');
            } else {
                this.showNotification('User created successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(1);
            }
        } catch (error) {
            console.error('Error creating user:', error);
            this.showNotification('Error creating user', 'error');
        }
    }

    async update(data) {
        try {
            const mutation = `
                mutation {
                    updateUser(id: ${this.currentId}, input: {
                        name: "${data.name}"
                        email: "${data.email}"
                        ${data.password ? `password: "${data.password}"` : ''}
                        role: "${data.role}"
                    }) {
                        id
                        name
                        email
                        role
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query: mutation })
            });

            const result = await response.json();
            if (result.errors) {
                this.showNotification('Failed to update user', 'error');
            } else {
                this.showNotification('User updated successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(this.currentPage);
            }
        } catch (error) {
            console.error('Error updating user:', error);
            this.showNotification('Error updating user', 'error');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    window.crud = new UserCRUD();
    crud.load(1);
});
