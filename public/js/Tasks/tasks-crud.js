/**
 * Tasks CRUD Manager
 */

class TasksCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Tasks',
            queryName: 'allTasks',
            createMutation: 'createTasks',
            updateMutation: 'updateTasks',
            deleteMutation: 'deleteTasks',
            fields: `
                id
                title
                description
                project_id
                status
                priority
                due_date
                proyek { id name }
            `,
            relatedFields: {}
        });
        this.proyeks = [];
        this.loadProyeks();
    }

    async loadProyeks() {
        try {
            const query = `query { allProyeks { data { id name } } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query })
            });
            const result = await response.json();
            this.proyeks = result.data.allProyeks.data;
            this.populateProjectSelect();
        } catch (error) {
            console.error('Error loading proyeks:', error);
        }
    }

    populateProjectSelect() {
        const select = document.getElementById('project_id');
        if (!select) return;
        select.innerHTML = '<option value="">Select Project</option>';
        this.proyeks.forEach(proyek => {
            const option = document.createElement('option');
            option.value = proyek.id;
            option.textContent = proyek.name;
            select.appendChild(option);
        });
    }

    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            
            const statusColor = item.status === 'completed' ? 'green' : item.status === 'in_progress' ? 'blue' : 'gray';
            const priorityColor = item.priority === 'high' ? 'red' : item.priority === 'medium' ? 'yellow' : 'blue';
            
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${item.id}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.title || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.proyek?.name || '-'}</td>
                <td class="px-6 py-4 text-sm"><span class="bg-${statusColor}-100 text-${statusColor}-800 px-2 py-1 rounded">${item.status || '-'}</span></td>
                <td class="px-6 py-4 text-sm"><span class="bg-${priorityColor}-100 text-${priorityColor}-800 px-2 py-1 rounded">${item.priority || '-'}</span></td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.due_date || '-'}</td>
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
                    createTasks(input: {
                        title: "${data.title}"
                        description: "${data.description || ''}"
                        project_id: ${data.project_id}
                        status: "${data.status}"
                        priority: "${data.priority}"
                        due_date: "${data.due_date || ''}"
                    }) {
                        id
                        title
                        status
                        priority
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
                this.showNotification('Failed to create task', 'error');
            } else {
                this.showNotification('Task created successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(1);
            }
        } catch (error) {
            console.error('Error creating task:', error);
            this.showNotification('Error creating task', 'error');
        }
    }

    async update(data) {
        try {
            const mutation = `
                mutation {
                    updateTasks(id: ${this.currentId}, input: {
                        title: "${data.title}"
                        description: "${data.description || ''}"
                        project_id: ${data.project_id}
                        status: "${data.status}"
                        priority: "${data.priority}"
                        due_date: "${data.due_date || ''}"
                    }) {
                        id
                        title
                        status
                        priority
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
                this.showNotification('Failed to update task', 'error');
            } else {
                this.showNotification('Task updated successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(this.currentPage);
            }
        } catch (error) {
            console.error('Error updating task:', error);
            this.showNotification('Error updating task', 'error');
        }
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    window.crud = new TasksCRUD();
    crud.load(1);
});
