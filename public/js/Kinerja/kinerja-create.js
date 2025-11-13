// Kinerja Create Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('createKinerjaForm');
    const staffSelect = document.getElementById('staff_id');
    const proyekSelect = document.getElementById('proyek_id');

    // Load staff
    const q1 = `query { allStaff { data { id user { id name } } } }`;
    const r1 = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query: q1 })
    });
    (await r1.json()).data?.allStaff?.data?.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.user?.name;
        staffSelect.appendChild(opt);
    });

    // Load proyek
    const q2 = `query { allProyek { data { id name } } }`;
    const r2 = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query: q2 })
    });
    (await r2.json()).data?.allProyek?.data?.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.name;
        proyekSelect.appendChild(opt);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `mutation CreateKinerja($input: CreateKinerjaInput!) { createKinerja(input: $input) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: { input: { staff_id: parseInt(fd.get('staff_id')), proyek_id: parseInt(fd.get('proyek_id')), points: parseInt(fd.get('points')), description: fd.get('description'), date: fd.get('date') } }
            })
        });
        if (await r.json().then(x => x.data)) window.location.href = '/kinerja';
    });
});
