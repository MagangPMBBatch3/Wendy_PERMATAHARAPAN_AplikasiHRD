// Tasks API with full CRUD operations
const TasksAPI = {
    async getAllTasks(page = 1, search = '', status = '', priority = '') {
        const query = `
            query GetTasks($page: Int, $search: String, $status: String, $priority: String) {
                allTasks(page: $page, search: $search, status: $status, priority: $priority) {
                    data {
                        id
                        creator_id
                        assignee_id
                        proyek_id
                        title
                        description
                        due_date
                        start_at
                        end_at
                        priority
                        status
                        attachment
                        created_at
                        updated_at
                        creator {
                            id
                            user { nama }
                        }
                        assignee {
                            id
                            user { nama }
                        }
                        proyek {
                            id
                            name
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
        const data = await gql.query(query, { page, search, status, priority });
        return data.allTasks;
    },

    async getTask(id) {
        const query = `
            query GetTask($id: ID!) {
                tasks(id: $id) {
                    id
                    creator_id
                    assignee_id
                    proyek_id
                    title
                    description
                    due_date
                    start_at
                    end_at
                    priority
                    status
                    attachment
                    created_at
                    updated_at
                    creator {
                        id
                        user { nama }
                    }
                    assignee {
                        id
                        user { nama }
                    }
                    proyek {
                        id
                        name
                    }
                }
            }
        `;
        const data = await gql.query(query, { id });
        return data.tasks;
    },

    async createTask(input) {
        const mutation = `
            mutation CreateTask($input: CreateTasksInput!) {
                createTasks(input: $input) {
                    id
                    title
                    status
                    created_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { input });
        return data.createTasks;
    },

    async updateTask(id, input) {
        const mutation = `
            mutation UpdateTask($id: ID!, $input: UpdateTasksInput!) {
                updateTasks(id: $id, input: $input) {
                    id
                    title
                    status
                    updated_at
                }
            }
        `;
        const data = await gql.mutation(mutation, { id, input });
        return data.updateTasks;
    },

    async deleteTask(id) {
        const mutation = `
            mutation DeleteTask($id: ID!) {
                deleteTasks(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.deleteTasks;
    },

    async restoreTask(id) {
        const mutation = `
            mutation RestoreTask($id: ID!) {
                restoreTasks(id: $id) {
                    id
                    title
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.restoreTasks;
    },

    async forceDeleteTask(id) {
        const mutation = `
            mutation ForceDeleteTask($id: ID!) {
                forceDeleteTasks(id: $id) {
                    id
                }
            }
        `;
        const data = await gql.mutation(mutation, { id });
        return data.forceDeleteTasks;
    }
};
