// DetailPayroll Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editDetailPayrollForm');
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

    const query = `query GetDetailPayroll($id: ID!) { detailPayroll(id: $id) { id payroll_id staff_id lembur bonus pengurangan total_gaji tanggal keterangan } }`;
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query, variables: { id } })
    });
    const result = await response.json();
    const dp = result.data?.detailPayroll;
    if (dp) {
        document.getElementById('payroll_id').value = dp.payroll_id;
        document.getElementById('staff_id').value = dp.staff_id;
        document.getElementById('lembur').value = dp.lembur;
        document.getElementById('bonus').value = dp.bonus;
        document.getElementById('pengurangan').value = dp.pengurangan;
        document.getElementById('total_gaji').value = dp.total_gaji;
        document.getElementById('tanggal').value = dp.tanggal;
        document.getElementById('keterangan').value = dp.keterangan;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `mutation UpdateDetailPayroll($input: UpdateDetailPayrollInput!) { updateDetailPayroll(input: $input) { id } }`;
        const r = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        id, payroll_id: parseInt(fd.get('payroll_id')), staff_id: parseInt(fd.get('staff_id')),
                        lembur: parseFloat(fd.get('lembur')) || 0, bonus: parseFloat(fd.get('bonus')) || 0,
                        pengurangan: parseFloat(fd.get('pengurangan')) || 0, total_gaji: parseFloat(fd.get('total_gaji')) || 0,
                        tanggal: fd.get('tanggal'), keterangan: fd.get('keterangan')
                    }
                }
            })
        });
        if (await r.json().then(x => x.data)) window.location.href = '/detailpayroll';
    });
});
