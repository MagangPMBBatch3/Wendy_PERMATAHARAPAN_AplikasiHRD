// Pengurangan API with full CRUD operations
const PenguranganAPI = {
    async getAllPengurangan(page = 1, search = '') {
        const query = `
            query GetPengurangan($page: Int, $search: String) {
                allPengurangan(page: $page, search: $search) {
                    data {
                        id
                        staff_id
                        payroll_id
                        tipe
                        keterangan
                        jumlah
                        tanggal
                        bulan
                        tahun
                        created_at
                        updated_at
                        staff {
                            id
                            user { nama }
                        }
                        payroll {
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
        const data = await gql.query(query, { page, search });
        return data.allPengurangan;
    },

    async getPengurangan(id) {
        const query = `
            query GetPengurangan($id: ID!) {
                pengurangan(id: $id) {
                    id
                    staff_id
                    payroll_id
                    tipe
                    keterangan
                    jumlah
                    tanggal
                    bulan
                    tahun
                    created_at
                    updated_at
                    staff {
                        id
                        user { nama }
                    }
                    payroll {
                        id
                    }
                }
            }
        `;
        const data = await gql.query(query, { id });
        return data.pengurangan;
    },

    async createPengurangan(input) {
        const mutation = `
            mutation CreatePengurangan($input: CreatePenguranganInput!) {
                createPengurangan(input: $input) {
                    id
                    tipe
                    jumlah
                    created_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { input });
        return data.createPengurangan;
    },

    async updatePengurangan(id, input) {
        const mutation = `
            mutation UpdatePengurangan($id: ID!, $input: UpdatePenguranganInput!) {
                updatePengurangan(id: $id, input: $input) {
                    id
                    tipe
                    jumlah
                    updated_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { id, input });
        return data.updatePengurangan;
    },

    async deletePengurangan(id) {
        const mutation = `
            mutation DeletePengurangan($id: ID!) {
                deletePengurangan(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.deletePengurangan;
    },

    async restorePengurangan(id) {
        const mutation = `
            mutation RestorePengurangan($id: ID!) {
                restorePengurangan(id: $id) {
                    id
                    tipe
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.restorePengurangan;
    },

    async forceDeletePengurangan(id) {
        const mutation = `
            mutation ForceDeletePengurangan($id: ID!) {
                forceDeletePengurangan(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.forceDeletePengurangan;
    }
};
