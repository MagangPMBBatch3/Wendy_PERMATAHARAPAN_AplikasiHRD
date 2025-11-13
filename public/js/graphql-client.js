// GraphQL Client utility for all API calls
class GraphQLClient {
    constructor(endpoint = '/graphql') {
        this.endpoint = endpoint;
    }

    getCsrfToken() {
        return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
    }

    async request(query, variables = {}) {
        try {
            const response = await fetch(this.endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': this.getCsrfToken()
                },
                body: JSON.stringify({ query, variables })
            });

            const result = await response.json();
            
            if (result.errors) {
                const errorMsg = result.errors.map(e => e.message).join(', ');
                throw new Error(errorMsg);
            }

            return result.data;
        } catch (error) {
            console.error('GraphQL Error:', error);
            throw error;
        }
    }

    async query(queryStr, variables = {}) {
        return this.request(queryStr, variables);
    }

    async mutation(mutationStr, variables = {}) {
        return this.request(mutationStr, variables);
    }
}

const gql = new GraphQLClient();
