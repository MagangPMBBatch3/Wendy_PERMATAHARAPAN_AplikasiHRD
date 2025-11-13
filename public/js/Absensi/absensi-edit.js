// Absensi Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editAbsensiForm');
    const id = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];

    // Load staff options
    const q1 = `query GetAllStaff { allStaff { data { id user { id name } } } }`;
    const r1 = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({ query: q1 })
    });
    const d1 = await r1.json();
    const staffSelect = document.getElementById('staff_id');
    d1.data?.allStaff?.data?.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.user?.name;
        staffSelect.appendChild(opt);
    });

    // Load absensi data
    const query = `query GetAbsensi($id: ID!) { absensi(id: $id) { id staff_id date login_time logout_time status } }`;
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
        },
        body: JSON.stringify({ query, variables: { id } })
    });
    const result = await response.json();
    const absensi = result.data?.absensi;
    if (absensi) {
        document.getElementById('staff_id').value = absensi.staff_id;
        document.getElementById('date').value = absensi.date;
        document.getElementById('login_time').value = absensi.login_time;
        document.getElementById('logout_time').value = absensi.logout_time;
        document.getElementById('status').value = absensi.status;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `
            mutation UpdateAbsensi($input: UpdateAbsensiInput!) {
                updateAbsensi(input: $input) { id }
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
                        id,
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
