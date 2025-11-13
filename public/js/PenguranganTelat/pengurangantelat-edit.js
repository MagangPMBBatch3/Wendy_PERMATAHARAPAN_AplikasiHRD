// PenguranganTelat Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editPenguranganTelatForm');
    const id = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];
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

    const query = `query GetPenguranganTelat($id: ID!) { penguranganTelat(id: $id) { id payroll_id staff_id nominal keterangan } }`;
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query, variables: { id } })
    });
    const result = await response.json();
    const pgt = result.data?.penguranganTelat;
    if (pgt) {
        document.getElementById('payroll_id').value = pgt.payroll_id;
        document.getElementById('staff_id').value = pgt.staff_id;
        document.getElementById('nominal').value = pgt.nominal;
        document.getElementById('keterangan').value = pgt.keterangan;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `mutation UpdatePenguranganTelat($input: UpdatePenguranganTelatInput!) { updatePenguranganTelat(input: $input) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        id, payroll_id: parseInt(fd.get('payroll_id')), staff_id: parseInt(fd.get('staff_id')),
                        nominal: parseFloat(fd.get('nominal')) || 0, keterangan: fd.get('keterangan')
                    }
                }
            })
        });
        if (await r.json().then(x => x.data)) window.location.href = '/pengurangantelat';
    });
});
