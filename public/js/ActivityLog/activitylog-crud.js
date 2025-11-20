/** ActivityLog CRUD - Read Only */
class ActivityLogCRUD extends CRUDManager {
    constructor() {
        super({
            entityName: 'ActivityLog',
            queryName: 'allActivityLogs',
            createMutation: 'createActivityLog',
            updateMutation: 'updateActivityLog',
            deleteMutation: 'deleteActivityLog',
            fields: `id user_id action description timestamp user { id name }`,
            relatedFields: {}
        });
    }
    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm">${item.id}</td>
                <td class="px-6 py-4 text-sm">${item.user?.name || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.action || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.description || '-'}</td>
                <td class="px-6 py-4 text-sm">${item.timestamp || '-'}</td>
                <td class="px-6 py-4 text-sm space-x-2">
                    <button onclick="crud.delete(${item.id})" class="text-red-600">Delete</button>
                </td>
            `;
            this.tableBody.appendChild(row);
        });
    }
    async create(data) { this.showNotification('Cannot create activity logs', 'error'); }
    async update(data) { this.showNotification('Cannot update activity logs', 'error'); }
    openCreate() { this.showNotification('Activity logs are auto-generated', 'error'); }
}
document.addEventListener('DOMContentLoaded', function() { window.crud = new ActivityLogCRUD(); crud.load(1); });
