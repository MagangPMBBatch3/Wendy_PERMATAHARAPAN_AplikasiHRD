/**
 * Generic CRUD Handler Template
 * Copy this and customize entityName, queryName, mutations, and fields
 */

class GenericCRUD extends CRUDManager {
    constructor(config) {
        super(config);
        this.customFields = config.customFields || {}; // entity-specific fields
        this.initializeCustom();
    }

    initializeCustom() {
        // Override in subclasses
    }

    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            
            let rowHTML = `<td class="px-6 py-4 text-sm font-medium text-gray-900">${item.id}</td>`;
            
            // Add custom fields
            Object.keys(this.customFields).forEach(field => {
                const value = this.getNestedValue(item, field);
                rowHTML += `<td class="px-6 py-4 text-sm text-gray-700">${value || '-'}</td>`;
            });
            
            // Add actions
            rowHTML += `
                <td class="px-6 py-4 text-sm space-x-2">
                    <button onclick="crud.edit(${item.id})" class="text-green-600 hover:text-green-800 font-medium">Edit</button>
                    <button onclick="crud.delete(${item.id})" class="text-red-600 hover:text-red-800 font-medium">Delete</button>
                </td>
            `;
            
            row.innerHTML = rowHTML;
            this.tableBody.appendChild(row);
        });
    }

    getNestedValue(obj, path) {
        return path.split('.').reduce((current, prop) => current?.[prop], obj);
    }
}

// Initialize globally
document.addEventListener('DOMContentLoaded', function() {
    // Set window.crud in subclass constructor
    window.crud.load(1);
});
