/**
 * Universal CRUD Manager for all entities
 * Handles loading, creating, updating, and deleting records via GraphQL
 */

class CRUDManager {
    constructor(config) {
        this.entityName = config.entityName; // e.g., 'Staff', 'User', 'Tasks'
        this.queryName = config.queryName; // e.g., 'allStaff', 'allUsers'
        this.createMutation = config.createMutation; // mutation name for create
        this.updateMutation = config.updateMutation; // mutation name for update
        this.deleteMutation = config.deleteMutation; // mutation name for delete
        this.fields = config.fields; // fields to fetch
        this.relatedFields = config.relatedFields || {}; // for relationships
        this.tableBody = document.getElementById('dataTableBody');
        this.searchBtn = document.getElementById('searchBtn');
        this.searchInput = document.getElementById('searchInput');
        this.currentPageSpan = document.getElementById('currentPage');
        this.prevPageBtn = document.getElementById('prevPageBtn');
        this.nextPageBtn = document.getElementById('nextPageBtn');
        this.formModal = document.getElementById('formModal');
        this.crudForm = document.getElementById('crud-form');
        this.modalTitle = document.getElementById('modalTitle');
        
        this.currentPage = 1;
        this.totalPages = 1;
        this.currentId = null;
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        if (this.searchBtn) {
            this.searchBtn.addEventListener('click', () => this.search());
        }
        
        if (this.prevPageBtn) {
            this.prevPageBtn.addEventListener('click', () => this.previousPage());
        }
        
        if (this.nextPageBtn) {
            this.nextPageBtn.addEventListener('click', () => this.nextPage());
        }

        if (this.crudForm) {
            this.crudForm.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    async load(page = 1) {
        try {
            this.showLoading();
            const search = this.searchInput ? this.searchInput.value : '';

            const query = `
                query {
                    ${this.queryName}(page: ${page}, search: "${search}") {
                        data {
                            ${this.fields}
                            ${Object.values(this.relatedFields).join('\n')}
                        }
                        paginatorInfo {
                            currentPage
                            lastPage
                            total
                            perPage
                        }
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query })
            });

            const result = await response.json();
            
            if (result.errors) {
                console.error('GraphQL Error:', result.errors);
                this.tableBody.innerHTML = `<tr><td colspan="10" class="text-center py-8 text-red-500">Error loading data</td></tr>`;
                return;
            }

            const data = result.data[this.queryName];
            if (data && data.data && data.data.length > 0) {
                this.totalPages = data.paginatorInfo.lastPage;
                this.currentPage = data.paginatorInfo.currentPage;
                this.displayData(data.data);
                this.updatePagination();
            } else {
                this.tableBody.innerHTML = `<tr><td colspan="10" class="text-center py-8 text-gray-500">No data found</td></tr>`;
            }
        } catch (error) {
            console.error('Error loading data:', error);
            this.showNotification(`Failed to load ${this.entityName}`, 'error');
            this.tableBody.innerHTML = `<tr><td colspan="10" class="text-center py-8 text-red-500">Error loading data</td></tr>`;
        }
    }

    displayData(data) {
        this.tableBody.innerHTML = '';
        data.forEach(item => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            
            let rowHTML = `<td class="px-6 py-4 text-sm font-medium text-gray-900">${item.id}</td>`;
            
            // Add data fields
            const fieldList = this.fields.split('\n').map(f => f.trim()).filter(f => f && !f.includes('{'));
            fieldList.forEach(field => {
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

    showLoading() {
        this.tableBody.innerHTML = '<tr><td colspan="10" class="text-center py-8"><p class="text-gray-600">Loading...</p></td></tr>';
    }

    updatePagination() {
        if (this.currentPageSpan) {
            this.currentPageSpan.textContent = `Page ${this.currentPage} of ${this.totalPages}`;
        }
        if (this.prevPageBtn) {
            this.prevPageBtn.disabled = this.currentPage <= 1;
        }
        if (this.nextPageBtn) {
            this.nextPageBtn.disabled = this.currentPage >= this.totalPages;
        }
    }

    search() {
        this.currentPage = 1;
        this.load(1);
    }

    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.load(this.currentPage);
        }
    }

    previousPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.load(this.currentPage);
        }
    }

    openCreate() {
        this.currentId = null;
        this.modalTitle.textContent = `Add New ${this.entityName}`;
        this.crudForm.reset();
        this.formModal.classList.remove('hidden');
    }

    edit(id) {
        this.currentId = id;
        this.modalTitle.textContent = `Edit ${this.entityName}`;
        this.formModal.classList.remove('hidden');
        // Load existing data for edit
    }

    async delete(id) {
        if (!confirm(`Are you sure you want to delete this ${this.entityName}?`)) return;

        try {
            const mutation = `
                mutation {
                    ${this.deleteMutation}(id: ${id}) {
                        id
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
                this.showNotification(`Failed to delete ${this.entityName}`, 'error');
            } else {
                this.showNotification(`${this.entityName} deleted successfully`, 'success');
                this.load(this.currentPage);
            }
        } catch (error) {
            console.error('Error deleting:', error);
            this.showNotification(`Error deleting ${this.entityName}`, 'error');
        }
    }

    async handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.crudForm);
        const data = Object.fromEntries(formData);

        try {
            if (this.currentId) {
                await this.update(data);
            } else {
                await this.create(data);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            this.showNotification('Error saving data', 'error');
        }
    }

    async create(data) {
        // To be overridden in specific entity implementations
        this.showNotification('Create not implemented', 'error');
    }

    async update(data) {
        // To be overridden in specific entity implementations
        this.showNotification('Update not implemented', 'error');
    }

    showNotification(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white ${type === 'error' ? 'bg-red-600' : 'bg-green-600'} z-50`;
        alertDiv.textContent = message;
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 3000);
    }

    // Global accessor for window
    loadData(page = 1) {
        this.load(page);
    }
}

// Make CRUD manager globally accessible
let crud;
