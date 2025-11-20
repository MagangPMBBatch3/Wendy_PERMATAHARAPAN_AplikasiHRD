/** DetailPayroll CRUD */
class DetailPayrollCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'DetailPayroll',
            queryName: 'allDetailPayrolls',
            createMutation: 'createDetailPayroll',
            updateMutation: 'updateDetailPayroll',
            deleteMutation: 'deleteDetailPayroll',
            fields: `id payroll_id description amount payroll { id period }`,
            relatedFields: {}
        });
        this.loadPayrolls();
    }
    async loadPayrolls() {
        try {
            const query = `query { allPayrolls { data { id period } } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query }) });
            const result = await response.json();
            const select = document.getElementById('payroll_id');
            if (select) {
                select.innerHTML = '<option value="">Select Payroll</option>';
                result.data.allPayrolls.data.forEach(pr => {
                    const option = document.createElement('option');
                    option.value = pr.id;
                    option.textContent = pr.period || 'Unknown';
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
                <td class="px-6 py-4 text-sm">${item.payroll?.period || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.description || '-'}</td>
                <td class="px-6 py-4 text-sm">Rp ${parseInt(item.amount).toLocaleString()}</td>
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
            const mutation = `mutation { createDetailPayroll(input: { payroll_id: ${data.payroll_id}, description: "${data.description}", amount: ${data.amount} }) { id } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query: mutation }) });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed', 'error');
            else { this.showNotification('Created successfully', 'success'); document.getElementById('formModal').classList.add('hidden'); this.load(1); }
        } catch (error) { this.showNotification('Error', 'error'); }
    }
    async update(data) {
        try {
            const mutation = `mutation { updateDetailPayroll(id: ${this.currentId}, input: { payroll_id: ${data.payroll_id}, description: "${data.description}", amount: ${data.amount} }) { id } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query: mutation }) });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed', 'error');
            else { this.showNotification('Updated successfully', 'success'); document.getElementById('formModal').classList.add('hidden'); this.load(this.currentPage); }
        } catch (error) { this.showNotification('Error', 'error'); }
    }
}
document.addEventListener('DOMContentLoaded', function() { window.crud = new DetailPayrollCRUD(); crud.load(1); });
