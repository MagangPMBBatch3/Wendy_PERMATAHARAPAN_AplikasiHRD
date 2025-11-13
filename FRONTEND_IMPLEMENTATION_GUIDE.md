# Frontend Views Implementation Guide

## Architecture Overview
All frontend views use direct GraphQL queries and mutations embedded in vanilla JavaScript files. No separate API wrapper files - everything is inline for simplicity and direct backend integration.

## Standard File Structure

### List Page Pattern (`[entity].js`)

```javascript
document.addEventListener('DOMContentLoaded', function() {
    // 1. Get DOM elements
    const tableBody = document.getElementById('[entity]TableBody');
    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');
    const currentPageSpan = document.getElementById('currentPage');
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    // 2. Initialize state
    let currentPage = 1;
    let totalPages = 1;

    // 3. Load initial data
    load[Entity](currentPage);

    // 4. Event listeners for pagination and search
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            currentPage = 1;
            load[Entity](currentPage);
        });
    }

    // 5. Main load function with GraphQL query
    async function load[Entity](page = 1) {
        try {
            showLoading(tableBody);
            const search = searchInput ? searchInput.value : '';

            const query = `
                query GetAll[Entity]($page: Int, $search: String) {
                    all[Entity](page: $page, search: $search) {
                        data {
                            id
                            field1
                            field2
                            // ... all fields
                        }
                        paginatorInfo {
                            currentPage
                            lastPage
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
                body: JSON.stringify({
                    query,
                    variables: { page, search }
                })
            });

            const result = await response.json();
            const data = result.data.all[Entity];

            if (data && data.data && data.data.length > 0) {
                totalPages = data.paginatorInfo.lastPage;
                currentPage = data.paginatorInfo.currentPage;
                display[Entity](data.data);
                updatePagination();
            } else {
                tableBody.innerHTML = '<tr><td colspan="..." class="text-center py-8 text-gray-500">No records found.</td></tr>';
            }
        } catch (error) {
            console.error('Error loading data:', error);
            tableBody.innerHTML = '<tr><td colspan="..." class="text-center py-8 text-red-500">Error loading data.</td></tr>';
        }
    }

    // 6. Display function
    function display[Entity](records) {
        tableBody.innerHTML = '';
        records.forEach(record => {
            const row = document.createElement('tr');
            row.className = 'border-b hover:bg-gray-50';
            row.innerHTML = `
                <td class="px-6 py-4 text-sm font-medium">${record.id}</td>
                <td class="px-6 py-4 text-sm">${record.field1}</td>
                <!-- more fields -->
                <td class="px-6 py-4 text-sm space-x-2">
                    <a href="/[entity]/${record.id}/edit" class="text-green-600">Edit</a>
                    <button class="text-red-600" onclick="delete[Entity](${record.id})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 7. Update pagination
    function updatePagination() {
        if (currentPageSpan) {
            currentPageSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        }
        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage <= 1;
        }
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage >= totalPages;
        }
    }
});

// 8. Delete function
async function delete[Entity](id) {
    if (confirm('Are you sure you want to delete this record?')) {
        try {
            const mutation = `
                mutation Delete[Entity]($id: ID!) {
                    delete[Entity](id: $id) {
                        id
                        deleted_at
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { id }
                })
            });

            const result = await response.json();
            if (result.data) {
                showNotification('Record deleted successfully!', 'success');
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
        } catch (error) {
            showNotification('Failed to delete record.', 'error');
        }
    }
}

// 9. Helper functions
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}

function showLoading(element) {
    element.innerHTML = `
        <tr>
            <td colspan="..." class="px-6 py-8 text-center">
                <div class="flex justify-center items-center">
                    <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                </div>
            </td>
        </tr>
    `;
}
```

### Create Form Pattern (`[entity]-create.js`)

```javascript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('create[Entity]Form');
    const submitBtn = document.getElementById('submitBtn');
    const selectField1 = document.getElementById('field1_id');

    // Load related data for dropdowns
    loadRelatedData();

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Creating...';

        try {
            const formData = new FormData(form);
            const recordData = {
                field1_id: parseInt(formData.get('field1_id')),
                field2: formData.get('field2'),
                field3: parseFloat(formData.get('field3')) || 0
            };

            const mutation = `
                mutation Create[Entity]($input: Create[Entity]Input!) {
                    create[Entity](input: $input) {
                        id
                        field1
                        field2
                        created_at
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { input: recordData }
                })
            });

            const result = await response.json();

            if (result.data) {
                showNotification('[Entity] created successfully!', 'success');
                setTimeout(() => {
                    window.location.href = '/[entity]';
                }, 1500);
            } else {
                showNotification('Error creating [entity].', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Create [Entity]';
            }
        } catch (error) {
            console.error('Error creating record:', error);
            showNotification('Failed to create [entity].', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Create [Entity]';
        }
    });

    async function loadRelatedData() {
        try {
            const query = `
                query GetAllRelated {
                    allRelated {
                        data {
                            id
                            name
                            email
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
            const records = result.data?.allRelated?.data || [];

            records.forEach(record => {
                const option = document.createElement('option');
                option.value = record.id;
                option.textContent = `${record.name} (${record.email})`;
                selectField1.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading related data:', error);
        }
    }

    function validateForm() {
        const field1 = document.getElementById('field1_id').value;
        const field2 = document.getElementById('field2').value;

        if (!field1 || !field2) {
            showNotification('Please fill all required fields.', 'error');
            return false;
        }
        return true;
    }
});

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
}
```

### Edit Form Pattern (`[entity]-edit.js`)

```javascript
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('edit[Entity]Form');
    const submitBtn = document.getElementById('submitBtn');
    const selectField1 = document.getElementById('field1_id');

    // Get ID from URL
    const [Entity]Id = new URLSearchParams(window.location.search).get('id') || 
                       window.location.pathname.split('/')[2];

    await loadRelatedData();
    await load[Entity]Data([Entity]Id);

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Updating...';

        try {
            const formData = new FormData(form);
            const recordData = {
                id: [Entity]Id,
                field1_id: parseInt(formData.get('field1_id')),
                field2: formData.get('field2'),
                field3: parseFloat(formData.get('field3')) || 0
            };

            const mutation = `
                mutation Update[Entity]($input: Update[Entity]Input!) {
                    update[Entity](input: $input) {
                        id
                        field1
                        field2
                        updated_at
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { input: recordData }
                })
            });

            const result = await response.json();

            if (result.data) {
                showNotification('[Entity] updated successfully!', 'success');
                setTimeout(() => {
                    window.location.href = '/[entity]';
                }, 1500);
            } else {
                showNotification('Error updating [entity].', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Update [Entity]';
            }
        } catch (error) {
            console.error('Error updating record:', error);
            showNotification('Failed to update [entity].', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Update [Entity]';
        }
    });

    async function load[Entity]Data(id) {
        try {
            const query = `
                query Get[Entity]($id: ID!) {
                    [entity](id: $id) {
                        id
                        field1_id
                        field2
                        field3
                        relatedData { id name }
                    }
                }
            `;

            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
                },
                body: JSON.stringify({ query, variables: { id } })
            });

            const result = await response.json();
            const record = result.data?.[entity];

            if (record) {
                document.getElementById('field1_id').value = record.field1_id;
                document.getElementById('field2').value = record.field2;
                document.getElementById('field3').value = record.field3;
            }
        } catch (error) {
            console.error('Error loading record:', error);
            showNotification('Failed to load record data.', 'error');
        }
    }

    async function loadRelatedData() {
        // Similar to create form
    }
});

function showNotification(message, type = 'success') {
    // Same as create form
}
```

## Common Utilities

### Currency Formatting
```javascript
function formatCurrency(value) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(value || 0);
}
```

### Date Formatting
```javascript
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
```

### DateTime Formatting
```javascript
function formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
```

## HTML Template Structure

Each view should have a corresponding HTML template with:

### List Page Template
```html
<div class="p-6">
    <div class="flex justify-between mb-6">
        <h1 class="text-3xl font-bold">[Entity] List</h1>
        <a href="/[entity]/create" class="bg-blue-600 text-white px-4 py-2 rounded">Create New</a>
    </div>

    <div class="mb-6 flex gap-2">
        <input type="text" id="searchInput" placeholder="Search..." class="border px-4 py-2 rounded flex-1">
        <button id="searchBtn" class="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
    </div>

    <div class="overflow-x-auto">
        <table class="w-full border-collapse">
            <thead>
                <tr class="bg-gray-100">
                    <th class="border px-6 py-3 text-left">ID</th>
                    <th class="border px-6 py-3 text-left">Field 1</th>
                    <th class="border px-6 py-3 text-left">Field 2</th>
                    <th class="border px-6 py-3 text-left">Actions</th>
                </tr>
            </thead>
            <tbody id="[entity]TableBody">
                <!-- Dynamically populated -->
            </tbody>
        </table>
    </div>

    <div class="mt-6 flex justify-between items-center">
        <button id="prevPageBtn" class="bg-gray-600 text-white px-4 py-2 rounded">Previous</button>
        <span id="currentPage">Page 1 of 1</span>
        <button id="nextPageBtn" class="bg-gray-600 text-white px-4 py-2 rounded">Next</button>
    </div>
</div>

<script src="/js/[Entity]/[entity].js"></script>
```

### Create/Edit Form Template
```html
<div class="p-6 max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-6">Create/Edit [Entity]</h1>

    <form id="create[Entity]Form" class="space-y-4">
        <div>
            <label class="block font-semibold mb-2">Field 1</label>
            <select id="field1_id" name="field1_id" class="w-full border px-4 py-2 rounded">
                <option value="">Select...</option>
            </select>
        </div>

        <div>
            <label class="block font-semibold mb-2">Field 2</label>
            <input type="text" id="field2" name="field2" class="w-full border px-4 py-2 rounded" required>
        </div>

        <button type="submit" id="submitBtn" class="bg-blue-600 text-white px-6 py-2 rounded">Create</button>
    </form>
</div>

<script src="/js/[Entity]/[entity]-create.js"></script>
```

## Key Points

1. **Fetch API**: All requests use native `fetch()` with GraphQL POST
2. **CSRF Protection**: All mutations include `X-CSRF-TOKEN` header
3. **Error Handling**: Try-catch blocks with user-friendly error messages
4. **Notifications**: Toast-like notifications for user feedback
5. **Validation**: Client-side validation before submission
6. **Loading States**: Visual feedback during data loading
7. **Pagination**: Supported through GraphQL `paginatorInfo`
8. **Search**: Implemented in query variables for backend filtering
9. **Locale**: Indonesian for currency, English for dates
10. **No Frameworks**: Pure vanilla JavaScript - no jQuery, React, Vue
