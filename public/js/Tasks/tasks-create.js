// Tasks Create Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createTaskForm');
    const submitBtn = document.getElementById('submitBtn');
    const creatorSelect = document.getElementById('creator_id');
    const assigneeSelect = document.getElementById('assignee_id');
    const projectSelect = document.getElementById('proyek_id');

    // Load staff and projects
    loadStaff();
    loadProjects();

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating...
        `;

        try {
            const formData = new FormData(form);
            const taskData = {
                creator_id: parseInt(formData.get('creator_id')) || null,
                assignee_id: parseInt(formData.get('assignee_id')),
                proyek_id: parseInt(formData.get('proyek_id')),
                title: formData.get('title'),
                description: formData.get('description'),
                due_date: formData.get('due_date') || null,
                start_at: formData.get('start_at') || null,
                end_at: formData.get('end_at') || null,
                priority: formData.get('priority'),
                status: formData.get('status')
            };

            // Handle attachment upload if present
            const attachmentFile = formData.get('attachment');
            if (attachmentFile && attachmentFile.size > 0) {
                taskData.attachment = await convertFileToBase64(attachmentFile);
            }

            const result = await TasksAPI.createTask(taskData);

            showNotification('Task created successfully!', 'success');

            // Redirect to index page after short delay
            setTimeout(() => {
                window.location.href = '/tasks';
            }, 1500);

        } catch (error) {
            console.error('Error creating task:', error);
            showNotification('Failed to create task. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Create Task
            `;
        }
    });

    // Load staff for dropdowns
    async function loadStaff() {
        try {
            // This would need a separate API call to get staff
            // For now, we'll add some dummy options
            const staff = [
                { id: 1, nama: 'Staff One' },
                { id: 2, nama: 'Staff Two' }
            ];

            staff.forEach(staffMember => {
                const option = document.createElement('option');
                option.value = staffMember.id;
                option.textContent = staffMember.nama;
                creatorSelect.appendChild(option.cloneNode(true));
                assigneeSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading staff:', error);
            showNotification('Failed to load staff.', 'error');
        }
    }

    // Load projects for dropdown
    async function loadProjects() {
        try {
            // This would need a separate API call to get projects
            // For now, we'll add some dummy options
            const projects = [
                { id: 1, nama_proyek: 'Project Alpha' },
                { id: 2, nama_proyek: 'Project Beta' }
            ];

            projects.forEach(project => {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = project.nama_proyek;
                projectSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading projects:', error);
            showNotification('Failed to load projects.', 'error');
        }
    }

    // Convert file to base64
    function convertFileToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    // Form validation
    function validateForm() {
        const assigneeId = document.getElementById('assignee_id').value;
        const projectId = document.getElementById('proyek_id').value;
        const title = document.getElementById('title').value.trim();
        const priority = document.getElementById('priority').value;
        const status = document.getElementById('status').value;
        const dueDate = document.getElementById('due_date').value;
        const startAt = document.getElementById('start_at').value;
        const endAt = document.getElementById('end_at').value;

        if (!assigneeId) {
            showNotification('Please select assignee.', 'error');
            return false;
        }

        if (!projectId) {
            showNotification('Please select project.', 'error');
            return false;
        }

        if (!title) {
            showNotification('Title is required.', 'error');
            return false;
        }

        if (!priority) {
            showNotification('Please select priority.', 'error');
            return false;
        }

        if (!status) {
            showNotification('Please select status.', 'error');
            return false;
        }

        if (dueDate && new Date(dueDate) < new Date().setHours(0, 0, 0, 0)) {
            showNotification('Due date cannot be in the past.', 'error');
            return false;
        }

        if (startAt && endAt && new Date(startAt) >= new Date(endAt)) {
            showNotification('End date/time must be after start date/time.', 'error');
            return false;
        }

        return true;
    }
});
