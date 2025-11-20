/** Pengumuman CRUD */
class PengumumanCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'Pengumuman',
            queryName: 'allPengumumans',
            createMutation: 'createPengumuman',
            updateMutation: 'updatePengumuman',
            deleteMutation: 'deletePengumuman',
            fields: `id title content author_id published_date author { id name }`,
            relatedFields: {}
        });
        this.loadUsers();
    }
    async loadUsers() {
        try {
            const query = `query { allUsers { data { id name } } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query }) });
            const result = await response.json();
            const select = document.getElementById('author_id');
            if (select) {
                select.innerHTML = '<option value="">Select Author</option>';
                result.data.allUsers.data.forEach(user => {
                    const option = document.createElement('option');
                    option.value = user.id;
                    option.textContent = user.name || 'Unknown';
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
                <td class="px-6 py-4 text-sm">${item.title || '-'}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${item.content?.substring(0, 50) || '-'}...</td>
                <td class="px-6 py-4 text-sm">${item.author?.name || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.published_date || '-'}</td>
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
            const mutation = `mutation { createPengumuman(input: { title: "${data.title}", content: "${data.content}", author_id: ${data.author_id}, published_date: "${data.published_date}" }) { id } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query: mutation }) });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed', 'error');
            else { this.showNotification('Created successfully', 'success'); document.getElementById('formModal').classList.add('hidden'); this.load(1); }
        } catch (error) { this.showNotification('Error', 'error'); }
    }
    async update(data) {
        try {
            const mutation = `mutation { updatePengumuman(id: ${this.currentId}, input: { title: "${data.title}", content: "${data.content}", author_id: ${data.author_id}, published_date: "${data.published_date}" }) { id } }`;
            const response = await fetch('/graphql', { method: 'POST', headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' }, body: JSON.stringify({ query: mutation }) });
            const result = await response.json();
            if (result.errors) this.showNotification('Failed', 'error');
            else { this.showNotification('Updated successfully', 'success'); document.getElementById('formModal').classList.add('hidden'); this.load(this.currentPage); }
        } catch (error) { this.showNotification('Error', 'error'); }
    }
}
document.addEventListener('DOMContentLoaded', function() { window.crud = new PengumumanCRUD(); crud.load(1); });
