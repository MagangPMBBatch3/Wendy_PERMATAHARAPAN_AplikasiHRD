/**
 * Absensi CRUD Manager
 */
class AbsensiCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Absensi',
            queryName: 'allAbsensis',
            createMutation: 'createAbsensi',
            updateMutation: 'updateAbsensi',
            deleteMutation: 'deleteAbsensi',
            fields: `id staff_id date status notes staff { id user { name } }`,
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
            const select = document.getElementById('staff_id');
            if (select) {
                select.innerHTML = '<option value="">Select Staff</option>';
                this.staffs.forEach(staff => {
                    const option = document.createElement('option');
                    option.value = staff.id;
                    option.textContent = staff.user?.name || 'Unknown';
                    select.appendChild(option);
                });
            }
        } catch (error) { console.error('Error loading staff:', error); }
    }

    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium text-gray-900">${item.id}</td>
                <td class="px-6 py-4 text-sm">${item.staff?.user?.name || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.date || '-'}</td>
                <td class="px-6 py-4 text-sm"><span class="bg-blue-100 px-2 py-1 rounded">${item.status || '-'}</span></td>
                <td class="px-6 py-4 text-sm">${item.notes || '-'}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                    <button onclick="crud.edit(${item.id})" class="text-green-600">Edit</button>
                    <button onclick="crud.delete(${item.id})" class="text-red-600">Delete</button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }

    async create(data) {
        try {
            const mutation = `mutation { createAbsensi(input: { staff_id: ${data.staff_id}, date: "${data.date}", status: "${data.status}", notes: "${data.notes || ''}" }) { id } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ query: mutation })
            });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed to create absensi', 'error');
            else {
                this.showNotification('Absensi created successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(1);
            }
        } catch (error) { console.error('Error:', error); this.showNotification('Error creating absensi', 'error'); }
    }

    async update(data) {
        try {
            const mutation = `mutation { updateAbsensi(id: ${this.currentId}, input: { staff_id: ${data.staff_id}, date: "${data.date}", status: "${data.status}", notes: "${data.notes || ''}" }) { id } }`;
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
                body: JSON.stringify({ query: mutation })
            });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed to update absensi', 'error');
            else {
                this.showNotification('Absensi updated successfully', 'success');
                document.getElementById('formModal').classList.add('hidden');
                this.load(this.currentPage);
            }
        } catch (error) { console.error('Error:', error); this.showNotification('Error updating absensi', 'error'); }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    window.crud = new AbsensiCRUD();
    crud.load(1);
});
