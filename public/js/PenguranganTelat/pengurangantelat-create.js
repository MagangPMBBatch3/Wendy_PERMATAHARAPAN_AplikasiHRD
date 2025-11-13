// PenguranganTelat Create Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('createPenguranganTelatForm');
    const payrollSelect = document.getElementById('payroll_id');
    const staffSelect = document.getElementById('staff_id');

    const q1 = `query { allPayroll { data { id staff_id } } }`;
    const r1 = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query: q1 })
    });
    (await r1.json()).data?.allPayroll?.data?.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = `Payroll ${p.id}`;
        payrollSelect.appendChild(opt);
    });

    const q2 = `query { allStaff { data { id user { id name } } } }`;
    const r2 = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query: q2 })
    });
    (await r2.json()).data?.allStaff?.data?.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.user?.name;
        staffSelect.appendChild(opt);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `mutation CreatePenguranganTelat($input: CreatePenguranganTelatInput!) { createPenguranganTelat(input: $input) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        payroll_id: parseInt(fd.get('payroll_id')),
                        staff_id: parseInt(fd.get('staff_id')),
                        nominal: parseFloat(fd.get('nominal')) || 0,
                        keterangan: fd.get('keterangan')
                    }
                }
            })
        });
        if (await r.json().then(x => x.data)) window.location.href = '/pengurangantelat';
    });
});
