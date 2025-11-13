// Absensi Create Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('createAbsensiForm');
    const staffSelect = document.getElementById('staff_id');

    // Load staff
    const query = `query GetAllStaff { allStaff { data { id user { id name } } } }`;
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({ query })
    });
    const result = await response.json();
    result.data?.allStaff?.data?.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.user?.name;
        staffSelect.appendChild(opt);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `
            mutation CreateAbsensi($input: CreateAbsensiInput!) {
                createAbsensi(input: $input) { id }
            }
        `;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
            },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        staff_id: parseInt(fd.get('staff_id')),
                        date: fd.get('date'),
                        login_time: fd.get('login_time'),
                        logout_time: fd.get('logout_time'),
                        status: fd.get('status')
                    }
                }
            })
        });
        if (await r.json().then(x => x.data)) {
            window.location.href = '/absensi';
        }
    });
});
