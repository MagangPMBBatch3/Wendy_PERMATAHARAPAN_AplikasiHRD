// Tunjangan Edit Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editAllowanceForm');
    const submitBtn = document.getElementById('submitBtn');
    const staffSelect = document.getElementById('staff_id');
    const payrollSelect = document.getElementById('dt_payroll_id');
    const tanggalInput = document.getElementById('tanggal');
    const bulanSelect = document.getElementById('bulan');
    const tahunInput = document.getElementById('tahun');

    // Get allowance ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const allowanceId = window.location.pathname.split('/').pop();

    // Load allowance data and populate form
    loadAllowanceData(allowanceId);
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
            Updating...
        `;

        try {
            const formData = new FormData(form);
            const tunjanganData = {
                staff_id: parseInt(formData.get('staff_id')) || undefined,
                dt_payroll_id: parseInt(formData.get('dt_payroll_id')) || undefined,
                tipe: formData.get('tipe') || undefined,
                keterangan: formData.get('keterangan') || undefined,
                jumlah: parseFloat(formData.get('jumlah')) || undefined,
                tanggal: formData.get('tanggal') || undefined,
                bulan: parseInt(formData.get('bulan')) || undefined,
                tahun: parseInt(formData.get('tahun')) || undefined
            };

            // Remove undefined values
            Object.keys(tunjanganData).forEach(key => {
                if (tunjanganData[key] === undefined || tunjanganData[key] === '') {
                    delete tunjanganData[key];
                }
            });

            const result = await TunjanganAPI.updateTunjangan(allowanceId, tunjanganData);

            showNotification('Allowance updated successfully!', 'success');

            // Redirect to show page after short delay
            setTimeout(() => {
                window.location.href = `/tunjangan/${allowanceId}`;
            }, 1500);

        } catch (error) {
            console.error('Error updating allowance:', error);
            showNotification('Failed to update allowance. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Update Allowance
            `;
        }
    });

    // Load allowance data
    async function loadAllowanceData(id) {
        try {
            const allowance = await TunjanganAPI.getTunjangan(id);

            if (allowance) {
                // Populate form fields
                document.getElementById('staff_id').value = allowance.staff_id;
                document.getElementById('dt_payroll_id').value = allowance.dt_payroll_id;
                document.getElementById('tipe').value = allowance.tipe;
                document.getElementById('tanggal').value = allowance.tanggal;
                document.getElementById('bulan').value = allowance.bulan;
                document.getElementById('tahun').value = allowance.tahun;
                document.getElementById('jumlah').value = allowance.jumlah;
                document.getElementById('keterangan').value = allowance.keterangan || '';
            } else {
                showNotification('Allowance not found.', 'error');
                window.location.href = '/tunjangan';
            }
        } catch (error) {
            console.error('Error loading allowance:', error);
            showNotification('Failed to load allowance data.', 'error');
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
        const tipe = document.getElementById('tipe').value;
        const tanggal = document.getElementById('tanggal').value;
        const bulan = document.getElementById('bulan').value;
        const tahun = document.getElementById('tahun').value;
        const jumlah = document.getElementById('jumlah').value;
        const keterangan = document.getElementById('keterangan').value.trim();

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
