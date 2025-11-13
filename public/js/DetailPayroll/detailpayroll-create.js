// DetailPayroll Create Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('createDetailPayrollForm');
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
        const mutation = `mutation CreateDetailPayroll($input: CreateDetailPayrollInput!) { createDetailPayroll(input: $input) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        payroll_id: parseInt(fd.get('payroll_id')),
                        staff_id: parseInt(fd.get('staff_id')),
                        lembur: parseFloat(fd.get('lembur')) || 0,
                        bonus: parseFloat(fd.get('bonus')) || 0,
                        pengurangan: parseFloat(fd.get('pengurangan')) || 0,
                        total_gaji: parseFloat(fd.get('total_gaji')) || 0,
                        tanggal: fd.get('tanggal'),
                        keterangan: fd.get('keterangan')
                    }
                }
            })
        });
        if (await r.json().then(x => x.data)) window.location.href = '/detailpayroll';
    });
});
