// Tunjangan Create Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createAllowanceForm');
    const submitBtn = document.getElementById('submitBtn');
    const staffSelect = document.getElementById('staff_id');
    const payrollSelect = document.getElementById('dt_payroll_id');
    const tanggalInput = document.getElementById('tanggal');
    const bulanSelect = document.getElementById('bulan');
    const tahunInput = document.getElementById('tahun');

    // Load staff and payroll options
    loadStaff();
    loadPayrollPeriods();

    // Auto-fill month and year when date is selected
    tanggalInput.addEventListener('change', function() {
        const selectedDate = new Date(this.value);
        if (selectedDate) {
            bulanSelect.value = selectedDate.getMonth() + 1;
            tahunInput.value = selectedDate.getFullYear();
        }
    });

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
            const tunjanganData = {
                staff_id: parseInt(formData.get('staff_id')),
                dt_payroll_id: parseInt(formData.get('dt_payroll_id')),
                tipe: formData.get('tipe'),
                keterangan: formData.get('keterangan'),
                jumlah: parseFloat(formData.get('jumlah')),
                tanggal: formData.get('tanggal'),
                bulan: parseInt(formData.get('bulan')),
                tahun: parseInt(formData.get('tahun'))
            };

            const result = await TunjanganAPI.createTunjangan(tunjanganData);

            showNotification('Allowance created successfully!', 'success');

            // Redirect to index page after short delay
            setTimeout(() => {
                window.location.href = '/tunjangan';
            }, 1500);

        } catch (error) {
            console.error('Error creating allowance:', error);
            showNotification('Failed to create allowance. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Create Allowance
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
        const staffId = document.getElementById('staff_id').value;
        const payrollId = document.getElementById('dt_payroll_id').value;
        const tipe = document.getElementById('tipe').value;
        const tanggal = document.getElementById('tanggal').value;
        const bulan = document.getElementById('bulan').value;
        const tahun = document.getElementById('tahun').value;
        const jumlah = document.getElementById('jumlah').value;
        const keterangan = document.getElementById('keterangan').value.trim();

        if (!staffId) {
            showNotification('Please select staff.', 'error');
            return false;
        }

        if (!payrollId) {
            showNotification('Please select payroll period.', 'error');
            return false;
        }

        if (!tipe) {
            showNotification('Please select allowance type.', 'error');
            return false;
        }

        if (!tanggal) {
            showNotification('Please select a date.', 'error');
            return false;
        }

        if (!bulan) {
            showNotification('Please select a month.', 'error');
            return false;
        }

        if (!tahun) {
            showNotification('Please enter a year.', 'error');
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
