/**
 * Level CRUD Manager
 */

class LevelCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Level',
            queryName: 'allLevels',
            createMutation: 'createLevel',
            updateMutation: 'updateLevel',
            deleteMutation: 'deleteLevel',
            fields: `
                id
                name
                description
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
                    createLevel(input: {
                        name: "${data.name}"
                        description: "${data.description || ''}"
                    }) {
                        id
                        name
                        description
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
                this.showNotification('Failed to create level', 'error');
            } else {
                this.showNotification('Level created successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(1);
            }
        } catch (error) {
            console.error('Error creating level:', error);
            this.showNotification('Error creating level', 'error');
        }
    }

    async update(data) {
        try {
            const mutation = `
                mutation {
                    updateLevel(id: ${this.currentId}, input: {
                        name: "${data.name}"
                        description: "${data.description || ''}"
                    }) {
                        id
                        name
                        description
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
                this.showNotification('Failed to update level', 'error');
            } else {
                this.showNotification('Level updated successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(this.currentPage);
            }
        } catch (error) {
            console.error('Error updating level:', error);
            this.showNotification('Error updating level', 'error');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    window.crud = new LevelCRUD();
    crud.load(1);
});
