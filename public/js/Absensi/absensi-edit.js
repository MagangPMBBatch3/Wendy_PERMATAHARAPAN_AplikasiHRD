function openEditModal(id, date, login_time, logout_time, status) {
    document.getElementById('editAbsensiId').value = id;
    document.getElementById('editDate').value = date;
    document.getElementById('editLoginTime').value = login_time;
    document.getElementById('editLogoutTime').value = logout_time;
    document.getElementById('editStatus').value = status;
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateAbsensi() {
    const id = document.getElementById('editAbsensiId').value;
    const date = document.getElementById('editDate').value;
    const login_time = document.getElementById('editLoginTime').value;
    const logout_time = document.getElementById('editLogoutTime').value;
    const status = document.getElementById('editStatus').value;
    if (!date || !status) return alert("Date and Status are required");

    const mutation = `
        mutation {
            updateAbsensi(input: { id: ${id}, date: "${date}", login_time: "${login_time}", logout_time: "${logout_time}", status: "${status}" }) {
                id
            }
        }
    `;
    await fetch('/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
    });
    closeEditModal();
    loadData();
}
