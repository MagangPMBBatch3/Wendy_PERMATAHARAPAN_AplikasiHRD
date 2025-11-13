// Tunjangan API with full CRUD operations
const TunjanganAPI = {
    async getAllTunjangan(page = 1, search = '') {
        const query = `
            query GetTunjangan($page: Int, $search: String) {
                allTunjangan(page: $page, search: $search) {
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
        return data.allTunjangan;
    },

    async getTunjangan(id) {
        const query = `
            query GetTunjangan($id: ID!) {
                tunjangan(id: $id) {
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
        return data.tunjangan;
    },

    async createTunjangan(input) {
        const mutation = `
            mutation CreateTunjangan($input: CreateTunjanganInput!) {
                createTunjangan(input: $input) {
                    id
                    tipe
                    jumlah
                    created_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { input });
        return data.createTunjangan;
    },

    async updateTunjangan(id, input) {
        const mutation = `
            mutation UpdateTunjangan($id: ID!, $input: UpdateTunjanganInput!) {
                updateTunjangan(id: $id, input: $input) {
                    id
                    tipe
                    jumlah
                    updated_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { id, input });
        return data.updateTunjangan;
    },

    async deleteTunjangan(id) {
        const mutation = `
            mutation DeleteTunjangan($id: ID!) {
                deleteTunjangan(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.deleteTunjangan;
    },

    async restoreTunjangan(id) {
        const mutation = `
            mutation RestoreTunjangan($id: ID!) {
                restoreTunjangan(id: $id) {
                    id
                    tipe
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.restoreTunjangan;
    },

    async forceDeleteTunjangan(id) {
        const mutation = `
            mutation ForceDeleteTunjangan($id: ID!) {
                forceDeleteTunjangan(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.forceDeleteTunjangan;
    }
};
