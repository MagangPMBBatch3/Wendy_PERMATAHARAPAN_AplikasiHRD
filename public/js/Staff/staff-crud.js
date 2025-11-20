/**
 * Staff CRUD Manager
 * Extends CRUDManager for Staff entity
 */

class StaffCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Staff',
            queryName: 'allStaff',
            createMutation: 'createStaff',
            updateMutation: 'updateStaff',
            deleteMutation: 'deleteStaff',
            fields: `
                id
                user_id
                level_id
                hire_date
                salary
                points
                user { id name }
                level { id name }
            `,
            relatedFields: {
                user: 'user { id name }',
                level: 'level { id name }'
            }
        });

        this.users = [];
        this.levels = [];
        this.loadSelectOptions();
    }

    async loadSelectOptions() {
        try {
            await this.loadUsers();
            await this.loadLevels();
        } catch (error) {
            console.error('Error loading options:', error);
        }
    }

    async loadUsers() {
        try {
            const query = `query { allUsers { data { id name } } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query })
            });

            const result = await response.json();
            this.users = result.data.allUsers.data;
            this.populateUserSelect();
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    async loadLevels() {
        try {
            const query = `query { allLevels { data { id name } } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query })
            });

            const result = await response.json();
            this.levels = result.data.allLevels.data;
            this.populateLevelSelect();
        } catch (error) {
            console.error('Error loading levels:', error);
        }
    }

    populateUserSelect() {
        const select = document.getElementById('user_id');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select User</option>';
        this.users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            select.appendChild(option);
        });
    }

    populateLevelSelect() {
        const select = document.getElementById('level_id');
        if (!select) return;
        
        select.innerHTML = '<option value="">Select Level</option>';
        this.levels.forEach(level => {
            const option = document.createElement('option');
            option.value = level.id;
            option.textContent = level.name;
            select.appendChild(option);
        });
    }

    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${item.id}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.user?.name || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.level?.name || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.hire_date || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">Rp ${parseInt(item.salary).toLocaleString('id-ID')}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.points || '-'}</td>
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
                    createStaff(input: {
                        user_id: ${data.user_id}
                        level_id: ${data.level_id}
                        hire_date: "${data.hire_date}"
                        salary: ${data.salary}
                        points: ${data.points || 0}
                    }) {
                        id
                        user_id
                        level_id
                        hire_date
                        salary
                        points
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
                this.showNotification('Failed to create staff', 'error');
            } else {
                this.showNotification('Staff created successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(1);
            }
        } catch (error) {
            console.error('Error creating staff:', error);
            this.showNotification('Error creating staff', 'error');
        }
    }

    async update(data) {
        try {
            const mutation = `
                mutation {
                    updateStaff(id: ${this.currentId}, input: {
                        user_id: ${data.user_id}
                        level_id: ${data.level_id}
                        hire_date: "${data.hire_date}"
                        salary: ${data.salary}
                        points: ${data.points || 0}
                    }) {
                        id
                        user_id
                        level_id
                        hire_date
                        salary
                        points
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
                this.showNotification('Failed to update staff', 'error');
            } else {
                this.showNotification('Staff updated successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(this.currentPage);
            }
        } catch (error) {
            console.error('Error updating staff:', error);
            this.showNotification('Error updating staff', 'error');
        }
    }
}

// Initialize and load data
document.addEventListener('DOMContentLoaded', function() {
    window.crud = new StaffCRUD();
    crud.load(1);
});
