function openEditModal(id, lembur, bonus, pengurangan, total_gaji, tanggal, keterangan) {
    document.getElementById('editDetailPayrollId').value = id;
    document.getElementById('editLembur').value = lembur;
    document.getElementById('editBonus').value = bonus;
    document.getElementById('editPengurangan').value = pengurangan;
    document.getElementById('editTotalGaji').value = total_gaji;
    document.getElementById('editTanggal').value = tanggal;
    document.getElementById('editKeterangan').value = keterangan || '';
    document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('modalEdit').classList.add('hidden');
}

async function updateDetailPayroll() {
    const id = document.getElementById('editDetailPayrollId').value;
    const lembur = document.getElementById('editLembur').value;
    const bonus = document.getElementById('editBonus').value;
    const pengurangan = document.getElementById('editPengurangan').value;
    const total_gaji = document.getElementById('editTotalGaji').value;
    const tanggal = document.getElementById('editTanggal').value;
    const keterangan = document.getElementById('editKeterangan').value;
    if (!tanggal) return alert("Tanggal is required");

    const mutation = `
        mutation {
            updateDetailPayroll(input: { id: ${id}, lembur: ${lembur}, bonus: ${bonus}, pengurangan: ${pengurangan}, total_gaji: ${total_gaji}, tanggal: "${tanggal}", keterangan: "${keterangan}" }) {
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
    loadDataPaginate(currentPage);
}
