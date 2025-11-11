// Pengurangan Edit Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editDeductionForm');
    const submitBtn = document.getElementById('submitBtn');
    const staffSelect = document.getElementById('staff_id');
    const payrollSelect = document.getElementById('dt_payroll_id');

    // Get deduction ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const deductionId = window.location.pathname.split('/').pop();

    // Load deduction data and populate form
    loadDeductionData(deductionId);
    loadStaff();
    loadPayrollPeriods();

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
            Updating...
        `;

        try {
            const formData = new FormData(form);
            const penguranganData = {
                staff_id: parseInt(formData.get('staff_id')) || undefined,
                dt_payroll_id: parseInt(formData.get('dt_payroll_id')) || undefined,
                keterangan: formData.get('keterangan') || undefined,
                jumlah: parseFloat(formData.get('jumlah')) || undefined,
                tanggal: formData.get('tanggal') || undefined
            };

            // Remove undefined values
            Object.keys(penguranganData).forEach(key => {
                if (penguranganData[key] === undefined || penguranganData[key] === '') {
                    delete penguranganData[key];
                }
            });

            const result = await PenguranganAPI.updatePengurangan(deductionId, penguranganData);

            showNotification('Deduction updated successfully!', 'success');

            // Redirect to show page after short delay
            setTimeout(() => {
                window.location.href = `/pengurangan/${deductionId}`;
            }, 1500);

        } catch (error) {
            console.error('Error updating deduction:', error);
            showNotification('Failed to update deduction. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Update Deduction
            `;
        }
    });

    // Load deduction data
    async function loadDeductionData(id) {
        try {
            const deduction = await PenguranganAPI.getPengurangan(id);

            if (deduction) {
                // Populate form fields
                document.getElementById('staff_id').value = deduction.staff_id;
                document.getElementById('dt_payroll_id').value = deduction.dt_payroll_id;
                document.getElementById('tanggal').value = deduction.tanggal;
                document.getElementById('jumlah').value = deduction.jumlah;
                document.getElementById('keterangan').value = deduction.keterangan || '';
            } else {
                showNotification('Deduction not found.', 'error');
                window.location.href = '/pengurangan';
            }
        } catch (error) {
            console.error('Error loading deduction:', error);
            showNotification('Failed to load deduction data.', 'error');
        }
    }

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

    // Form validation
    function validateForm() {
        const tanggal = document.getElementById('tanggal').value;
        const jumlah = document.getElementById('jumlah').value;
        const keterangan = document.getElementById('keterangan').value.trim();

        if (!tanggal) {
            showNotification('Please select a date.', 'error');
            return false;
        }

        if (!jumlah || parseFloat(jumlah) <= 0) {
            showNotification('Please enter a valid amount greater than 0.', 'error');
            return false;
        }

        if (!keterangan) {
            showNotification('Description is required.', 'error');
            return false;
        }

        return true;
    }
});
