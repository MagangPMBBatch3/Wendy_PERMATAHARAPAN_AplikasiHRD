// Tasks GraphQL API functions
const TasksAPI = {
    // Fetch all tasks with pagination
    async getAllTasks(page = 1, search = '', status = '', priority = '') {
        const query = `
            query GetTasks($page: Int, $search: String, $status: String, $priority: String) {
                allTasks(page: $page, search: $search, status: $status, priority: $priority) {
                    data {
                        id
                        creator_id
                        assignee_id
                        proyek_id
                        title
                        description
                        due_date
                        start_at
                        end_at
                        priority
                        status
                        attachment
                        created_at
                        updated_at
                        creator {
                            id
                            nama
                        }
                        assignee {
                            id
                            nama
                        }
                        proyek {
                            id
                            nama_proyek
                        }
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

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query,
                    variables: { page, search, status, priority }
                })
            });

            const result = await response.json();
            return result.data.allTasks;
        } catch (error) {
            console.error('Error fetching tasks:', error);
            throw error;
        }
    },

    // Fetch single task by ID
    async getTask(id) {
        const query = `
            query GetTask($id: ID!) {
                tasks(id: $id) {
                    id
                    creator_id
                    assignee_id
                    proyek_id
                    title
                    description
                    due_date
                    start_at
                    end_at
                    priority
                    status
                    attachment
                    created_at
                    updated_at
                    creator {
                        id
                        nama
                    }
                    assignee {
                        id
                        nama
                    }
                    proyek {
                        id
                        nama_proyek
                    }
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.tasks;
        } catch (error) {
            console.error('Error fetching task:', error);
            throw error;
        }
    },

    // Create new task
    async createTask(taskData) {
        const mutation = `
            mutation CreateTask($input: CreateTasksInput!) {
                createTasks(input: $input) {
                    id
                    creator_id
                    assignee_id
                    proyek_id
                    title
                    description
                    due_date
                    start_at
                    end_at
                    priority
                    status
                    attachment
                    created_at
                    updated_at
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        input: taskData
                    }
                })
            });

            const result = await response.json();
            return result.data.createTasks;
        } catch (error) {
            console.error('Error creating task:', error);
            throw error;
        }
    },

    // Update task
    async updateTask(id, taskData) {
        const mutation = `
            mutation UpdateTask($id: ID!, $input: UpdateTasksInput!) {
                updateTasks(id: $id, input: $input) {
                    id
                    creator_id
                    assignee_id
                    proyek_id
                    title
                    description
                    due_date
                    start_at
                    end_at
                    priority
                    status
                    attachment
                    updated_at
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        id,
                        input: taskData
                    }
                })
            });

            const result = await response.json();
            return result.data.updateTasks;
        } catch (error) {
            console.error('Error updating task:', error);
            throw error;
        }
    },

    // Delete task
    async deleteTask(id) {
        const mutation = `
            mutation DeleteTask($id: ID!) {
                deleteTasks(id: $id) {
                    id
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.deleteTasks;
        } catch (error) {
            console.error('Error deleting task:', error);
            throw error;
        }
    },

    // Restore task
    async restoreTask(id) {
        const mutation = `
            mutation RestoreTask($id: ID!) {
                restoreTasks(id: $id) {
                    id
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.restoreTasks;
        } catch (error) {
            console.error('Error restoring task:', error);
            throw error;
        }
    }
};

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function formatDateTime(dateTimeString) {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatTaskStatus(status) {
    const statusClasses = {
        'todo': 'bg-gray-100 text-gray-800',
        'in_progress': 'bg-blue-100 text-blue-800',
        'review': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-green-100 text-green-800'
    };

    const statusText = status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClasses[status] || 'bg-gray-100 text-gray-800'}">${statusText}</span>`;
}

function formatTaskPriority(priority) {
    const priorityClasses = {
        'low': 'bg-green-100 text-green-800',
        'medium': 'bg-yellow-100 text-yellow-800',
        'high': 'bg-orange-100 text-orange-800',
        'urgent': 'bg-red-100 text-red-800'
    };

    const priorityText = priority.charAt(0).toUpperCase() + priority.slice(1);
    return `<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${priorityClasses[priority] || 'bg-gray-100 text-gray-800'}">${priorityText}</span>`;
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showLoading(element) {
    element.innerHTML = `
        <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-2 text-gray-600">Loading...</span>
        </div>
    `;
}

function hideLoading(element) {
    element.innerHTML = '';
}

// Index page functions
function renderTasksTable(tasksList) {
    const tbody = document.getElementById('tasksTableBody');
    tbody.innerHTML = '';

    if (tasksList.length === 0) {
        document.getElementById('emptyState').classList.remove('hidden');
        return;
    }

    document.getElementById('emptyState').classList.add('hidden');

    tasksList.forEach(task => {
        const row = document.createElement('tr');
        row.className = 'hover:bg-gray-50';
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${task.id}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${task.title}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${task.assignee?.nama || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${task.proyek?.nama_proyek || 'N/A'}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${formatDate(task.due_date)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${formatTaskPriority(task.priority)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">${formatTaskStatus(task.status)}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                    <a href="/tasks/${task.id}" class="text-blue-600 hover:text-blue-900">View</a>
                    <a href="/tasks/${task.id}/edit" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                    <button onclick="deleteTask(${task.id})" class="text-red-600 hover:text-red-900">Delete</button>
                </div>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function renderPagination(paginatorInfo) {
    const container = document.getElementById('paginationContainer');
    container.innerHTML = '';

    if (paginatorInfo.lastPage <= 1) return;

    const pagination = document.createElement('div');
    pagination.className = 'flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6';

    let paginationHTML = '<div class="flex items-center space-x-2">';

    // Previous button
    if (paginatorInfo.currentPage > 1) {
        paginationHTML += `<button onclick="loadTasks(${paginatorInfo.currentPage - 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">Previous</button>`;
    }

    // Page numbers
    for (let i = Math.max(1, paginatorInfo.currentPage - 2); i <= Math.min(paginatorInfo.lastPage, paginatorInfo.currentPage + 2); i++) {
        const activeClass = i === paginatorInfo.currentPage ? 'bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50';
        paginationHTML += `<button onclick="loadTasks(${i})" class="relative inline-flex items-center px-4 py-2 text-sm font-medium ${activeClass} border">${i}</button>`;
    }

    // Next button
    if (paginatorInfo.currentPage < paginatorInfo.lastPage) {
        paginationHTML += `<button onclick="loadTasks(${paginatorInfo.currentPage + 1})" class="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">Next</button>`;
    }

    paginationHTML += '</div>';
    pagination.innerHTML = paginationHTML;
    container.appendChild(pagination);
}

async function deleteTask(id) {
    if (!confirm('Are you sure you want to delete this task?')) {
        return;
    }

    try {
        await TasksAPI.deleteTask(id);
        showNotification('Task deleted successfully!', 'success');
        loadTasks(); // Reload the list
    } catch (error) {
        console.error('Error deleting task:', error);
        showNotification('Failed to delete task.', 'error');
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTasks(1);
});

// expose loader for direct calls
window.loadTasksData = function(page = 1) {
    return loadTasks(page);
};

// Main loader function
async function loadTasks(page = 1) {
    try {
        const loadingState = document.getElementById('loadingState');
        if (loadingState) loadingState.style.display = 'flex';

        const result = await TasksAPI.getAllTasks(page);
        renderTasksTable(result.data);
        renderPagination(result.paginatorInfo);

        if (loadingState) loadingState.style.display = 'none';
    } catch (error) {
        console.error('Error loading tasks:', error);
        const loadingState = document.getElementById('loadingState');
        if (loadingState) loadingState.innerHTML = '<div class="text-red-500">Error loading tasks.</div>';
    }
}
