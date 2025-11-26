const API_URL = '/graphql';

let currentPage = 1;
let perPage = 10;
let totalPage = 1;
let searchValue = '';

async function fetchStaffs() {
  const query = `
    query {
      staffs {
        id
        nama
      }
    }
  `;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const result = await response.json();
  return result.data.staffs;
}

async function fetchDetailPayrolls() {
  const query = `
    query {
      detailPayrolls {
        id
        periode
      }
    }
  `;
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  const result = await response.json();
  return result.data.detailPayrolls;
}

async function fetchData() {
  const query = `
    query ($page: Int, $limit: Int, $search: String) {
      pengurangans(page: $page, limit: $limit, search: $search) {
        data {
          id
          staff {
            nama
          }
          dt_payroll {
            periode
          }
          tanggal
          jumlah
          keterangan
        }
        paginatorInfo {
          currentPage
          lastPage
        }
      }
    }
  `;
  const variables = {
    page: currentPage,
    limit: perPage,
    search: searchValue
  };
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  const result = await response.json();
  return result.data.pengurangans;
}

function openAddModal() {
  document.getElementById('modalAdd').classList.remove('hidden');
  loadStaffOptions('add_staff_id');
  loadDetailPayrollOptions('add_dt_payroll_id');
  clearAddForm();
}

function closeAddModal() {
  document.getElementById('modalAdd').classList.add('hidden');
}

function openEditModal() {
  document.getElementById('modalEdit').classList.remove('hidden');
}

function closeEditModal() {
  document.getElementById('modalEdit').classList.add('hidden');
}

function clearAddForm() {
  document.getElementById('formAdd').reset();
}

async function loadStaffOptions(selectId) {
  const staffs = await fetchStaffs();
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">Select staff</option>';
  staffs.forEach(staff => {
    const option = document.createElement('option');
    option.value = staff.id;
    option.textContent = staff.nama;
    select.appendChild(option);
  });
}

async function loadDetailPayrollOptions(selectId) {
  const detailPayrolls = await fetchDetailPayrolls();
  const select = document.getElementById(selectId);
  select.innerHTML = '<option value="">Select payroll period</option>';
  detailPayrolls.forEach(dp => {
    const option = document.createElement('option');
    option.value = dp.id;
    option.textContent = dp.periode;
    select.appendChild(option);
  });
}

function renderTable(data) {
  const tbody = document.getElementById('dataTableBody');
  tbody.innerHTML = '';

  if(data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="text-center py-8 text-gray-500">No records found</td></tr>';
    return;
  }

  data.forEach(item => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td class="px-6 py-4 whitespace-nowrap">${item.id}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.staff ? item.staff.nama : ''}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.dt_payroll ? item.dt_payroll.periode : ''}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.tanggal}</td>
      <td class="px-6 py-4 whitespace-nowrap">Rp ${item.jumlah.toFixed(2)}</td>
      <td class="px-6 py-4 whitespace-nowrap">${item.keterangan}</td>
      <td class="px-6 py-4 whitespace-nowrap space-x-2">
        <button onclick="editRecord(${item.id})" class="text-blue-600 hover:underline">Edit</button>
        <button onclick="deleteRecord(${item.id})" class="text-red-600 hover:underline">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

async function loadData() {
  try {
    const result = await fetchData();
    renderTable(result.data);
    currentPage = result.paginatorInfo.currentPage;
    totalPage = result.paginatorInfo.lastPage;
    updatePaginationRange();
  } catch (error) {
    console.error('Error loading data:', error);
  }
}

function updatePaginationRange() {
  document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPage}`;
  document.getElementById('prevPageBtn').disabled = currentPage === 1;
  document.getElementById('nextPageBtn').disabled = currentPage === totalPage;
}

document.getElementById('searchBtn').addEventListener('click', () => {
  searchValue = document.getElementById('searchInput').value;
  currentPage = 1;
  loadData();
});

document.getElementById('prevPageBtn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadData();
  }
});

document.getElementById('nextPageBtn').addEventListener('click', () => {
  if (currentPage < totalPage) {
    currentPage++;
    loadData();
  }
});

async function submitAddForm(event) {
  event.preventDefault();
  const data = {
    staff_id: document.getElementById('add_staff_id').value,
    dt_payroll_id: document.getElementById('add_dt_payroll_id').value,
    tanggal: document.getElementById('add_tanggal').value,
    jumlah: parseFloat(document.getElementById('add_jumlah').value),
    keterangan: document.getElementById('add_keterangan').value,
  };

  const mutation = `
    mutation($input: CreatePenguranganInput!) {
      createPengurangan(input: $input) {
        id
      }
    }
  `;
  const variables = { input: data };
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables })
    });
    const result = await response.json();
    if (result.errors) {
      alert('Failed to create deduction.');
    } else {
      alert('Deduction created successfully.');
      closeAddModal();
      loadData();
    }
  } catch (error) {
    console.error('Create error:', error);
  }
}

async function editRecord(id) {
  // Fetch single record data
  const query = `
    query($id:Int!) {
      pengurangan(id:$id) {
        id
        staff_id
        dt_payroll_id
        tanggal
        jumlah
        keterangan
      }
    }
  `;
  const variables = { id };
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });
    const result = await response.json();
    if (result.data.pengurangan) {
      // populate edit modal form
      document.getElementById('edit_id').value = result.data.pengurangan.id;
      document.getElementById('edit_staff_id').value = result.data.pengurangan.staff_id;
      document.getElementById('edit_dt_payroll_id').value = result.data.pengurangan.dt_payroll_id;
      document.getElementById('edit_tanggal').value = result.data.pengurangan.tanggal;
      document.getElementById('edit_jumlah').value = result.data.pengurangan.jumlah;
      document.getElementById('edit_keterangan').value = result.data.pengurangan.keterangan;
      openEditModal();
      // load options for select inputs if needed
      loadStaffOptions('edit_staff_id');
      loadDetailPayrollOptions('edit_dt_payroll_id');
    } else {
      alert('Record not found');
    }
  } catch (error) {
    console.error('Error fetching record:', error);
  }
}

async function submitEditForm(event) {
  event.preventDefault();
  const data = {
    id: parseInt(document.getElementById('edit_id').value),
    staff_id: document.getElementById('edit_staff_id').value,
    dt_payroll_id: document.getElementById('edit_dt_payroll_id').value,
    tanggal: document.getElementById('edit_tanggal').value,
    jumlah: parseFloat(document.getElementById('edit_jumlah').value),
    keterangan: document.getElementById('edit_keterangan').value,
  };

  const mutation = `
    mutation($id: Int!, $input: UpdatePenguranganInput!) {
      updatePengurangan(id: $id, input: $input) {
        id
      }
    }
  `;

  const variables = { id: data.id, input: data };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables })
    });
    const result = await response.json();
    if (result.errors) {
      alert('Failed to update deduction.');
    } else {
      alert('Deduction updated successfully.');
      closeEditModal();
      loadData();
    }
  } catch (error) {
    console.error('Update error:', error);
  }
}

async function deleteRecord(id) {
  if(!confirm('Are you sure you want to delete this deduction?')) return;

  const mutation = `
    mutation($id: Int!) {
      deletePengurangan(id: $id)
    }
  `;

  const variables = { id };

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables })
    });
    const result = await response.json();
    if (result.errors) {
      alert('Failed to delete deduction.');
    } else {
      alert('Deduction deleted successfully.');
      loadData();
    }
  } catch (error) {
    console.error('Delete error:', error);
  }
}

document.getElementById('formAdd').addEventListener('submit', submitAddForm);
document.getElementById('formEdit').addEventListener('submit', submitEditForm);

window.onload = function () {
  loadData();
};
