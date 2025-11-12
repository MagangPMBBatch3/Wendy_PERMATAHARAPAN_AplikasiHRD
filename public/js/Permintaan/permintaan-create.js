// Permintaan Create Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createRequestForm');
    const submitBtn = document.getElementById('submitBtn');
    const staffSelect = document.getElementById('staff_id');
    const typeSelect = document.getElementById('tipe');
    const timeRangeContainer = document.getElementById('timeRangeContainer');

    // Load staff options
    loadStaff();

    // Handle type change to show/hide time fields
    typeSelect.addEventListener('change', function() {
        const selectedType = this.value;
        if (selectedType === 'izin' || selectedType === 'lembur') {
            timeRangeContainer.classList.remove('hidden');
        } else {
            timeRangeContainer.classList.add('hidden');
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
            const permintaanData = {
                staff_id: parseInt(formData.get('staff_id')),
                tipe: formData.get('tipe'),
                keterangan: formData.get('keterangan'),
                tanggal: formData.get('tanggal'),
                waktu_mulai: formData.get('waktu_mulai') || null,
                waktu_selesai: formData.get('waktu_selesai') || null
            };

            const result = await PermintaanAPI.createPermintaan(permintaanData);

            showNotification('Request created successfully!', 'success');

            // Redirect to index page after short delay
            setTimeout(() => {
                window.location.href = '/permintaan';
            }, 1500);

        } catch (error) {
            console.error('Error creating request:', error);
            showNotification('Failed to create request. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Submit Request
            `;
        }
    });

    // Load staff for dropdown
    async function loadStaff() {
        try {
            const staff = await PermintaanAPI.getAllStaff();

            staff.forEach(staffMember => {
                const option = document.createElement('option');
                option.value = staffMember.id;
                option.textContent = staffMember.user.name;
                staffSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error loading staff:', error);
            showNotification('Failed to load staff.', 'error');
        }
    }

    // Form validation
    function validateForm() {
        const staffId = document.getElementById('staff_id').value;
        const tipe = document.getElementById('tipe').value;
        const tanggal = document.getElementById('tanggal').value;
        const keterangan = document.getElementById('keterangan').value.trim();

        if (!staffId) {
            showNotification('Please select staff.', 'error');
            return false;
        }

        if (!tipe) {
            showNotification('Please select request type.', 'error');
            return false;
        }

        if (!tanggal) {
            showNotification('Please select a date.', 'error');
            return false;
        }

        if (!keterangan) {
            showNotification('Description is required.', 'error');
            return false;
        }

        // Validate time fields for izin and lembur
        if (tipe === 'izin' || tipe === 'lembur') {
            const waktuMulai = document.getElementById('waktu_mulai').value;
            const waktuSelesai = document.getElementById('waktu_selesai').value;

            if (!waktuMulai || !waktuSelesai) {
                showNotification('Start and end time are required for this request type.', 'error');
                return false;
            }

            if (waktuMulai >= waktuSelesai) {
                showNotification('End time must be after start time.', 'error');
                return false;
            }
        }

        return true;
    }
});
