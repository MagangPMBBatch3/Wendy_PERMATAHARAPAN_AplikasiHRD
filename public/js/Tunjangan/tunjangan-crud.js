/** Tunjangan CRUD */
class TunjanganCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Tunjangan',
            queryName: 'allTunjangans',
            createMutation: 'createTunjangan',
            updateMutation: 'updateTunjangan',
            deleteMutation: 'deleteTunjangan',
            fields: `id staff_id type amount start_date end_date staff { id user { name } }`,
            relatedFields: {}
        });
        this.loadStaffs();
    }
    async loadStaffs() {
        try {
            const query = `query { allStaffs { data { id user { name } } } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query }) });
            const result = await response.json();
            const select = document.getElementById('staff_id');
            if (select) {
                select.innerHTML = '<option value="">Select Staff</option>';
                result.data.allStaffs.data.forEach(staff => {
                    const option = document.createElement('option');
                    option.value = staff.id;
                    option.textContent = staff.user?.name || 'Unknown';
                    select.appendChild(option);
                });
            }
        } catch (error) { console.error('Error:', error); }
    }
    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm">${item.id}</td>
                <td class="px-6 py-4 text-sm">${item.staff?.user?.name || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.type || '-'}</td>
                <td class="px-6 py-4 text-sm">Rp ${parseInt(item.amount).toLocaleString()}</td>
                <td class="px-6 py-4 text-sm">${item.start_date || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.end_date || '-'}</td>
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
            const mutation = `mutation { createTunjangan(input: { staff_id: ${data.staff_id}, type: "${data.type}", amount: ${data.amount}, start_date: "${data.start_date}", end_date: "${data.end_date}" }) { id } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query: mutation }) });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed', 'error');
            else { this.showNotification('Created successfully', 'success'); document.getElementById('formModal').classList.add('hidden'); this.load(1); }
        } catch (error) { this.showNotification('Error', 'error'); }
    }
    async update(data) {
        try {
            const mutation = `mutation { updateTunjangan(id: ${this.currentId}, input: { staff_id: ${data.staff_id}, type: "${data.type}", amount: ${data.amount}, start_date: "${data.start_date}", end_date: "${data.end_date}" }) { id } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query: mutation }) });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed', 'error');
            else { this.showNotification('Updated successfully', 'success'); document.getElementById('formModal').classList.add('hidden'); this.load(this.currentPage); }
        } catch (error) { this.showNotification('Error', 'error'); }
    }
}
document.addEventListener('DOMContentLoaded', function() { window.crud = new TunjanganCRUD(); crud.load(1); });
