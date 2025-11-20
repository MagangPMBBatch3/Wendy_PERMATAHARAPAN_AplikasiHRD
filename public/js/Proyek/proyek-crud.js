/**
 * Proyek CRUD Manager
 */

class ProyekCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Proyek',
            queryName: 'allProyeks',
            createMutation: 'createProyek',
            updateMutation: 'updateProyek',
            deleteMutation: 'deleteProyek',
            fields: `
                id
                name
                description
                start_date
                end_date
                status
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
                <td class="px-6 py-4 text-sm text-gray-700">${item.description || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.start_date || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.end_date || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700"><span class="bg-green-100 text-green-800 px-2 py-1 rounded">${item.status || 'pending'}</span></td>
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
                    createProyek(input: {
                        name: "${data.name}"
                        description: "${data.description || ''}"
                        start_date: "${data.start_date}"
                        end_date: "${data.end_date}"
                        status: "${data.status || 'pending'}"
                    }) {
                        id
                        name
                        description
                        start_date
                        end_date
                        status
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
                this.showNotification('Failed to create proyek', 'error');
            } else {
                this.showNotification('Proyek created successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(1);
            }
        } catch (error) {
            console.error('Error creating proyek:', error);
            this.showNotification('Error creating proyek', 'error');
        }
    }

    async update(data) {
        try {
            const mutation = `
                mutation {
                    updateProyek(id: ${this.currentId}, input: {
                        name: "${data.name}"
                        description: "${data.description || ''}"
                        start_date: "${data.start_date}"
                        end_date: "${data.end_date}"
                        status: "${data.status || 'pending'}"
                    }) {
                        id
                        name
                        description
                        start_date
                        end_date
                        status
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
                this.showNotification('Failed to update proyek', 'error');
            } else {
                this.showNotification('Proyek updated successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(this.currentPage);
            }
        } catch (error) {
            console.error('Error updating proyek:', error);
            this.showNotification('Error updating proyek', 'error');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    window.crud = new ProyekCRUD();
    crud.load(1);
});
