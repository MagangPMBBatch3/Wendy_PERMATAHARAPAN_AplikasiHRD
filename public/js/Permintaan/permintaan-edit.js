// Permintaan Edit Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('editRequestForm');
    const submitBtn = document.getElementById('submitBtn');
    const staffSelect = document.getElementById('staff_id');
    const typeSelect = document.getElementById('tipe');
    const timeRangeContainer = document.getElementById('timeRangeContainer');

    // Get request ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const requestId = window.location.pathname.split('/').pop();

    // Load request data and populate form
    loadRequestData(requestId);
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
            Updating...
        `;

        try {
            const formData = new FormData(form);
            const permintaanData = {
                staff_id: parseInt(formData.get('staff_id')) || undefined,
                tipe: formData.get('tipe') || undefined,
                keterangan: formData.get('keterangan') || undefined,
                tanggal: formData.get('tanggal') || undefined,
                waktu_mulai: formData.get('waktu_mulai') || undefined,
                waktu_selesai: formData.get('waktu_selesai') || undefined
            };

            // Remove undefined values
            Object.keys(permintaanData).forEach(key => {
                if (permintaanData[key] === undefined || permintaanData[key] === '') {
                    delete permintaanData[key];
                }
            });

            const result = await PermintaanAPI.updatePermintaan(requestId, permintaanData);

            showNotification('Request updated successfully!', 'success');

            // Redirect to show page after short delay
            setTimeout(() => {
                window.location.href = `/permintaan/${requestId}`;
            }, 1500);

        } catch (error) {
            console.error('Error updating request:', error);
            showNotification('Failed to update request. Please try again.', 'error');

            submitBtn.disabled = false;
            submitBtn.innerHTML = `
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Update Request
            `;
        }
    });

    // Load request data
    async function loadRequestData(id) {
        try {
            const request = await PermintaanAPI.getPermintaan(id);

            if (request) {
                // Populate form fields
                document.getElementById('staff_id').value = request.staff_id;
                document.getElementById('tipe').value = request.tipe;
                document.getElementById('tanggal').value = request.tanggal;
                document.getElementById('keterangan').value = request.keterangan || '';

                // Handle time fields
                if (request.waktu_mulai) {
                    document.getElementById('waktu_mulai').value = request.waktu_mulai.substring(0, 5); // HH:MM format
                }
                if (request.waktu_selesai) {
                    document.getElementById('waktu_selesai').value = request.waktu_selesai.substring(0, 5); // HH:MM format
                }

                // Show/hide time fields based on type
                if (request.tipe === 'izin' || request.tipe === 'lembur') {
                    timeRangeContainer.classList.remove('hidden');
                }
            } else {
                showNotification('Request not found.', 'error');
                window.location.href = '/permintaan';
            }
        } catch (error) {
            console.error('Error loading request:', error);
            showNotification('Failed to load request data.', 'error');
        }
    }

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
        const tipe = document.getElementById('tipe').value;
        const tanggal = document.getElementById('tanggal').value;
        const keterangan = document.getElementById('keterangan').value.trim();

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
