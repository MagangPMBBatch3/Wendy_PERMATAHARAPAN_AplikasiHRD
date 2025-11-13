// Pengumuman Create Page
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('createPengumumanForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await PengumumanApp.save('createPengumumanForm', true);
        });
    }
});
