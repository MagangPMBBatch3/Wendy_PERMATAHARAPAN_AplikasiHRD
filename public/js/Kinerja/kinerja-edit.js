// Kinerja Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editKinerjaForm');
    const id = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];
    const staffSelect = document.getElementById('staff_id');
    const proyekSelect = document.getElementById('proyek_id');

    // Load staff & proyek
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

    // Load data
    const query = `query GetKinerja($id: ID!) { kinerja(id: $id) { id staff_id proyek_id points description date } }`;
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query, variables: { id } })
    });
    const result = await response.json();
    const kinerja = result.data?.kinerja;
    if (kinerja) {
        document.getElementById('staff_id').value = kinerja.staff_id;
        document.getElementById('proyek_id').value = kinerja.proyek_id;
        document.getElementById('points').value = kinerja.points;
        document.getElementById('description').value = kinerja.description;
        document.getElementById('date').value = kinerja.date;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `mutation UpdateKinerja($input: UpdateKinerjaInput!) { updateKinerja(input: $input) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: { input: { id, staff_id: parseInt(fd.get('staff_id')), proyek_id: parseInt(fd.get('proyek_id')), points: parseInt(fd.get('points')), description: fd.get('description'), date: fd.get('date') } }
            })
        });
        if (await r.json().then(x => x.data)) window.location.href = '/kinerja';
    });
});
