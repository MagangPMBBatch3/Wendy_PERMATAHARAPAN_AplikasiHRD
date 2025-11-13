// Payroll Create Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('createPayrollForm');
    const staffSelect = document.getElementById('staff_id');

    const q = `query { allStaff { data { id user { id name } salary } } }`;
    const r = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query: q })
    });
    (await r.json()).data?.allStaff?.data?.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = `${s.user?.name} (${s.salary})`;
        staffSelect.appendChild(opt);
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `mutation CreatePayroll($input: CreatePayrollInput!) { createPayroll(input: $input) { id } }`;
        const r2 = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        staff_id: parseInt(fd.get('staff_id')),
                        month: parseInt(fd.get('month')),
                        year: parseInt(fd.get('year')),
                        base_salary: parseFloat(fd.get('base_salary')),
                        bonuses: parseFloat(fd.get('bonuses')) || 0,
                        deductions: parseFloat(fd.get('deductions')) || 0,
                        total: parseFloat(fd.get('total')) || 0
                    }
                }
            })
        });
        if (await r2.json().then(x => x.data)) window.location.href = '/payroll';
    });
});
