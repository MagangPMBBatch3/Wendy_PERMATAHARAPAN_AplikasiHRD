// Permintaan API with full CRUD operations
const PermintaanAPI = {
    async getAllPermintaan(page = 1, search = '', status = '') {
        const query = `
            query GetPermintaan($page: Int, $search: String, $status: String) {
                allPermintaan(page: $page, search: $search, status: $status) {
                    data {
                        id
                        staff_id
                        tipe
                        keterangan
                        tanggal
                        waktu_mulai
                        waktu_selesai
                        created_at
                        updated_at
                        staff {
                            id
                            user { nama }
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
        return data.allPermintaan;
    },

    async getPermintaan(id) {
        const query = `
            query GetPermintaan($id: ID!) {
                permintaan(id: $id) {
                    id
                    staff_id
                    tipe
                    keterangan
                    tanggal
                    waktu_mulai
                    waktu_selesai
                    created_at
                    updated_at
                    staff {
                        id
                        user { nama }
                    }
                }
            }
        `;
        const data = await gql.query(query, { id });
        return data.permintaan;
    },

    async createPermintaan(input) {
        const mutation = `
            mutation CreatePermintaan($input: CreatePermintaanInput!) {
                createPermintaan(input: $input) {
                    id
                    tipe
                    created_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { input });
        return data.createPermintaan;
    },

    async updatePermintaan(id, input) {
        const mutation = `
            mutation UpdatePermintaan($id: ID!, $input: UpdatePermintaanInput!) {
                updatePermintaan(id: $id, input: $input) {
                    id
                    tipe
                    updated_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { id, input });
        return data.updatePermintaan;
    },

    async deletePermintaan(id) {
        const mutation = `
            mutation DeletePermintaan($id: ID!) {
                deletePermintaan(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.deletePermintaan;
    },

    async restorePermintaan(id) {
        const mutation = `
            mutation RestorePermintaan($id: ID!) {
                restorePermintaan(id: $id) {
                    id
                    tipe
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.restorePermintaan;
    },

    async forceDeletePermintaan(id) {
        const mutation = `
            mutation ForceDeletePermintaan($id: ID!) {
                forceDeletePermintaan(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.forceDeletePermintaan;
    }
};
