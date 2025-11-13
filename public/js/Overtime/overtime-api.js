// Overtime API with full CRUD operations
const OvertimeAPI = {
    async getAllOvertime(page = 1, search = '', status = '') {
        const query = `
            query GetOvertime($page: Int, $search: String, $status: String) {
                allOvertime(page: $page, search: $search, status: $status) {
                    data {
                        id
                        staff_id
                        proyek_id
                        dt_payroll_id
                        keterangan
                        tanggal
                        waktu_mulai
                        waktu_selesai
                        durasi_jam
                        foto
                        status
                        created_at
                        updated_at
                        staff {
                            id
                            user { nama }
                        }
                        proyek {
                            id
                            name
                        }
                        detailPayroll {
                            id
                        }
                    }
                    paginatorInfo {
                        currentPage
                        lastPage
                        total
                        perPage
                    }
                }
            }
        `;
        const data = await gql.query(query, { page, search, status });
        return data.allOvertime;
    },

    async getOvertime(id) {
        const query = `
            query GetOvertime($id: ID!) {
                overtime(id: $id) {
                    id
                    staff_id
                    proyek_id
                    dt_payroll_id
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    durasi_jam
                    foto
                    status
                    created_at
                    updated_at
                    staff {
                        id
                        user { nama }
                    }
                    proyek {
                        id
                        name
                    }
                    detailPayroll {
                        id
                    }
                }
            }
        `;
        const data = await gql.query(query, { id });
        return data.overtime;
    },

    async createOvertime(input) {
        const mutation = `
            mutation CreateOvertime($input: CreateOvertimeInput!) {
                createOvertime(input: $input) {
                    id
                    keterangan
                    status
                    created_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { input });
        return data.createOvertime;
    },

    async updateOvertime(id, input) {
        const mutation = `
            mutation UpdateOvertime($id: ID!, $input: UpdateOvertimeInput!) {
                updateOvertime(id: $id, input: $input) {
                    id
                    keterangan
                    status
                    updated_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { id, input });
        return data.updateOvertime;
    },

    async deleteOvertime(id) {
        const mutation = `
            mutation DeleteOvertime($id: ID!) {
                deleteOvertime(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.deleteOvertime;
    },

    async restoreOvertime(id) {
        const mutation = `
            mutation RestoreOvertime($id: ID!) {
                restoreOvertime(id: $id) {
                    id
                    keterangan
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.restoreOvertime;
    },

    async forceDeleteOvertime(id) {
        const mutation = `
            mutation ForceDeleteOvertime($id: ID!) {
                forceDeleteOvertime(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.forceDeleteOvertime;
    }
};
