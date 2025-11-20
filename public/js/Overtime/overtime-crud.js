/**
 * Overtime CRUD Manager
 */

class OvertimeCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Overtime',
            queryName: 'allOvertimes',
            createMutation: 'createOvertime',
            updateMutation: 'updateOvertime',
            deleteMutation: 'deleteOvertime',
            fields: `
                id
                staff_id
                date
                hours
                rate
                staff { id user { name } }
            `,
            relatedFields: {}
        });
        this.staffs = [];
        this.loadStaffs();
    }

    async loadStaffs() {
        try {
            const query = `query { allStaffs { data { id user { name } } } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ query })
            });
            const result = await response.json();
            this.staffs = result.data.allStaffs.data;
            this.populateStaffSelect();
        } catch (error) { console.error('Error loading staff:', error); }
    }

    populateStaffSelect() {
        const select = document.getElementById('staff_id');
        if (!select) return;
        select.innerHTML = '<option value="">Select Staff</option>';
        this.staffs.forEach(staff => {
            const option = document.createElement('option');
            option.value = staff.id;
            option.textContent = staff.user?.name || 'Unknown';
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
                <td class="px-6 py-4 text-sm text-gray-700">${item.staff?.user?.name || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.date || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">${item.hours || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-700">Rp ${parseInt(item.rate).toLocaleString('id-ID')}</td>
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
                    createOvertime(input: {
                        staff_id: ${data.staff_id}
                        date: "${data.date}"
                        hours: ${data.hours}
                        rate: ${data.rate}
                    }) { id }
                }
            `;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ query: mutation })
            });
            const result = await response.json();
            if (result.errors) {
                this.showNotification('Failed to create overtime', 'error');
            } else {
                this.showNotification('Overtime created successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(1);
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error creating overtime', 'error');
        }
    }

    async update(data) {
        try {
            const mutation = `
                mutation {
                    updateOvertime(id: ${this.currentId}, input: {
                        staff_id: ${data.staff_id}
                        date: "${data.date}"
                        hours: ${data.hours}
                        rate: ${data.rate}
                    }) { id }
                }
            `;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ query: mutation })
            });
            const result = await response.json();
            if (result.errors) {
                this.showNotification('Failed to update overtime', 'error');
            } else {
                this.showNotification('Overtime updated successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(this.currentPage);
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error updating overtime', 'error');
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.crud = new OvertimeCRUD();
    crud.load(1);
});
