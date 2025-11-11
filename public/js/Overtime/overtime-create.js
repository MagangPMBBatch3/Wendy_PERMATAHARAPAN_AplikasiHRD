// Overtime Create Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createOvertimeForm');
    const submitBtn = document.getElementById('submitBtn');
    const staffSelect = document.getElementById('staff_id');
    const projectSelect = document.getElementById('proyek_id');
    const payrollSelect = document.getElementById('dt_payroll_id');
    const tanggalInput = document.getElementById('tanggal');
    const waktuMulaiInput = document.getElementById('waktu_mulai');
    const waktuSelesaiInput = document.getElementById('waktu_selesai');
    const durasiJamInput = document.getElementById('durasi_jam');

    // Load staff, projects and payroll options
    loadStaff();
    loadProjects();
    loadPayrollPeriods();

    // Auto-calculate duration when start/end times change
    function calculateDuration() {
        const startTime = new Date(waktuMulaiInput.value);
        const endTime = new Date(waktuSelesaiInput.value);

        if (startTime && endTime && endTime > startTime) {
            const diffMs = endTime - startTime;
            const diffHours = diffMs / (1000 * 60 * 60);
            durasiJamInput.value = diffHours.toFixed(2);
        }
    }

    waktuMulaiInput.addEventListener('change', calculateDuration);
    waktuSelesaiInput.addEventListener('change', calculateDuration);

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
            const overtimeData = {
                staff_id: parseInt(formData.get('staff_id')),
                proyek_id: parseInt(formData.get('proyek_id')),
                dt_payroll_id: parseInt(formData.get('dt_payroll_id')),
                keterangan: formData.get('keterangan'),
                tanggal: formData.get('tanggal'),
                waktu_mulai: formData.get('waktu_mulai'),
                waktu_selesai: formData.get('waktu_selesai'),
                durasi_jam: parseFloat(formData.get('durasi_jam')),
                status: formData.get('status')
            };

            // Handle photo upload if present
            const fotoFile = formData.get('foto');
            if (fotoFile && fotoFile.size > 0) {
                // Convert file to base64 or handle upload
                overtimeData.foto = await convertFileToBase64(fotoFile);
            }

            const result = await OvertimeAPI.createOvertime(overtimeData);

            showNotification('Overtime record created successfully!', 'success');

            // Redirect to index page after short delay
            setTimeout(() => {
                window.location.href = '/overtime';
            }, 1500);

        } catch (error) {
            console.error('Error creating overtime:', error);
            showNotification('Failed to create overtime record. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Create Overtime
            `;
        }
    });

    // Load staff for dropdown
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
                staffSelect.appendChild(option);
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

    // Load payroll periods for dropdown
    async function loadPayrollPeriods() {
        try {
            // This would need a separate API call to get payroll periods
            // For now, we'll add some dummy options
            const payrolls = [
                { id: 1, periode: 'October 2024' },
                { id: 2, periode: 'September 2024' }
            ];

            payrolls.forEach(payroll => {
                const option = document.createElement('option');
                option.value = payroll.id;
                option.textContent = payroll.periode;
                payrollSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading payroll periods:', error);
            showNotification('Failed to load payroll periods.', 'error');
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
        const staffId = document.getElementById('staff_id').value;
        const projectId = document.getElementById('proyek_id').value;
        const payrollId = document.getElementById('dt_payroll_id').value;
        const tanggal = document.getElementById('tanggal').value;
        const waktuMulai = document.getElementById('waktu_mulai').value;
        const waktuSelesai = document.getElementById('waktu_selesai').value;
        const durasiJam = document.getElementById('durasi_jam').value;
        const status = document.getElementById('status').value;
        const keterangan = document.getElementById('keterangan').value.trim();

        if (!staffId) {
            showNotification('Please select staff.', 'error');
            return false;
        }

        if (!projectId) {
            showNotification('Please select project.', 'error');
            return false;
        }

        if (!payrollId) {
            showNotification('Please select payroll period.', 'error');
            return false;
        }

        if (!tanggal) {
            showNotification('Please select a date.', 'error');
            return false;
        }

        if (!waktuMulai) {
            showNotification('Please select start time.', 'error');
            return false;
        }

        if (!waktuSelesai) {
            showNotification('Please select end time.', 'error');
            return false;
        }

        if (new Date(waktuMulai) >= new Date(waktuSelesai)) {
            showNotification('End time must be after start time.', 'error');
            return false;
        }

        if (!durasiJam || parseFloat(durasiJam) <= 0) {
            showNotification('Please enter a valid duration greater than 0.', 'error');
            return false;
        }

        if (!status) {
            showNotification('Please select status.', 'error');
            return false;
        }

        if (!keterangan) {
            showNotification('Description is required.', 'error');
            return false;
        }

        return true;
    }
});
