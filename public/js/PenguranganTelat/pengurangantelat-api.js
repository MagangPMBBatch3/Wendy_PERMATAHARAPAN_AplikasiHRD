// PenguranganTelat API with full CRUD operations
const PenguranganTelatAPI = {
    async getAllPenguranganTelat(page = 1, search = '') {
        const query = `
            query GetPenguranganTelat($page: Int, $search: String) {
                allPenguranganTelat(page: $page, search: $search) {
                    data {
                        id
                        staff_id
                        payroll_id
                        keterangan
                        jumlah
                        tanggal
                        waktu_datang
                        durasi_telat
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
        return data.allPenguranganTelat;
    },

    async getPenguranganTelat(id) {
        const query = `
            query GetPenguranganTelat($id: ID!) {
                penguranganTelat(id: $id) {
                    id
                    staff_id
                    payroll_id
                    keterangan
                    jumlah
                    tanggal
                    waktu_datang
                    durasi_telat
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
        return data.penguranganTelat;
    },

    async createPenguranganTelat(input) {
        const mutation = `
            mutation CreatePenguranganTelat($input: CreatePenguranganTelatInput!) {
                createPenguranganTelat(input: $input) {
                    id
                    jumlah
                    durasi_telat
                    created_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { input });
        return data.createPenguranganTelat;
    },

    async updatePenguranganTelat(id, input) {
        const mutation = `
            mutation UpdatePenguranganTelat($id: ID!, $input: UpdatePenguranganTelatInput!) {
                updatePenguranganTelat(id: $id, input: $input) {
                    id
                    jumlah
                    durasi_telat
                    updated_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { id, input });
        return data.updatePenguranganTelat;
    },

    async deletePenguranganTelat(id) {
        const mutation = `
            mutation DeletePenguranganTelat($id: ID!) {
                deletePenguranganTelat(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.deletePenguranganTelat;
    },

    async restorePenguranganTelat(id) {
        const mutation = `
            mutation RestorePenguranganTelat($id: ID!) {
                restorePenguranganTelat(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.restorePenguranganTelat;
    },

    async forceDeletePenguranganTelat(id) {
        const mutation = `
            mutation ForceDeletePenguranganTelat($id: ID!) {
                forceDeletePenguranganTelat(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.forceDeletePenguranganTelat;
    }
};
