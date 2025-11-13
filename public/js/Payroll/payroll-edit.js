// Payroll Edit Page
document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('editPayrollForm');
    const id = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/')[2];
    const staffSelect = document.getElementById('staff_id');

    const q = `query { allStaff { data { id user { id name } } } }`;
    const r = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query: q })
    });
    (await r.json()).data?.allStaff?.data?.forEach(s => {
        const opt = document.createElement('option');
        opt.value = s.id;
        opt.textContent = s.user?.name;
        staffSelect.appendChild(opt);
    });

    const query = `query GetPayroll($id: ID!) { payroll(id: $id) { id staff_id month year base_salary bonuses deductions total } }`;
    const response = await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
        body: JSON.stringify({ query, variables: { id } })
    });
    const result = await response.json();
    const payroll = result.data?.payroll;
    if (payroll) {
        document.getElementById('staff_id').value = payroll.staff_id;
        document.getElementById('month').value = payroll.month;
        document.getElementById('year').value = payroll.year;
        document.getElementById('base_salary').value = payroll.base_salary;
        document.getElementById('bonuses').value = payroll.bonuses;
        document.getElementById('deductions').value = payroll.deductions;
        document.getElementById('total').value = payroll.total;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const mutation = `mutation UpdatePayroll($input: UpdatePayrollInput!) { updatePayroll(input: $input) { id } }`;
        const r2 = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '' },
            body: JSON.stringify({
                query: mutation,
                variables: {
                    input: {
                        id, staff_id: parseInt(fd.get('staff_id')), month: parseInt(fd.get('month')), year: parseInt(fd.get('year')),
                        base_salary: parseFloat(fd.get('base_salary')), bonuses: parseFloat(fd.get('bonuses')) || 0,
                        deductions: parseFloat(fd.get('deductions')) || 0, total: parseFloat(fd.get('total')) || 0
                    }
                }
            })
        });
        if (await r2.json().then(x => x.data)) window.location.href = '/payroll';
    });
});
