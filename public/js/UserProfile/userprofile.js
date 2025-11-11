// UserProfile GraphQL API functions
const UserProfileAPI = {
    // Fetch all user profiles with pagination
    async getAllProfiles(page = 1, search = '', status = '') {
        const query = `
            query GetUserProfiles($page: Int, $search: String, $status: String) {
                allUserProfile(page: $page, search: $search, status: $status) {
                    data {
                        id
                        user_id
                        staff_id
                        nama_lengkap
                        nrp
                        alamat
                        foto
                        created_at
                        updated_at
                        user {
                            id
                            name
                            email
                        }
                        staff {
                            id
                            nama
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

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query,
                    variables: { page, search, status }
                })
            });

            const result = await response.json();
            return result.data.allUserProfile;
        } catch (error) {
            console.error('Error fetching profiles:', error);
            throw error;
        }
    },

    // Fetch single profile by ID
    async getProfile(id) {
        const query = `
            query GetUserProfile($id: ID!) {
                userProfile(id: $id) {
                    id
                    user_id
                    staff_id
                    nama_lengkap
                    nrp
                    alamat
                    foto
                    created_at
                    updated_at
                    user {
                        id
                        name
                        email
                    }
                    staff {
                        id
                        nama
                    }
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.userProfile;
        } catch (error) {
            console.error('Error fetching profile:', error);
            throw error;
        }
    },

    // Create new profile
    async createProfile(profileData) {
        const mutation = `
            mutation CreateUserProfile($input: CreateUserProfileInput!) {
                createUserProfile(input: $input) {
                    id
                    user_id
                    staff_id
                    nama_lengkap
                    nrp
                    alamat
                    foto
                    created_at
                    updated_at
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        input: profileData
                    }
                })
            });

            const result = await response.json();
            return result.data.createUserProfile;
        } catch (error) {
            console.error('Error creating profile:', error);
            throw error;
        }
    },

    // Update profile
    async updateProfile(id, profileData) {
        const mutation = `
            mutation UpdateUserProfile($id: ID!, $input: UpdateUserProfileInput!) {
                updateUserProfile(id: $id, input: $input) {
                    id
                    user_id
                    staff_id
                    nama_lengkap
                    nrp
                    alamat
                    foto
                    updated_at
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: {
                        id,
                        input: profileData
                    }
                })
            });

            const result = await response.json();
            return result.data.updateUserProfile;
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    },

    // Delete profile
    async deleteProfile(id) {
        const mutation = `
            mutation DeleteUserProfile($id: ID!) {
                deleteUserProfile(id: $id) {
                    id
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.deleteUserProfile;
        } catch (error) {
            console.error('Error deleting profile:', error);
            throw error;
        }
    },

    // Restore profile
    async restoreProfile(id) {
        const mutation = `
            mutation RestoreUserProfile($id: ID!) {
                restoreUserProfile(id: $id) {
                    id
                }
            }
        `;

        try {
            const response = await fetch('/graphql', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
                },
                body: JSON.stringify({
                    query: mutation,
                    variables: { id }
                })
            });

            const result = await response.json();
            return result.data.restoreUserProfile;
        } catch (error) {
            console.error('Error restoring profile:', error);
            throw error;
        }
    }
};

// Utility functions
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md text-white z-50 ${
        type === 'success' ? 'bg-green-500' :
        type === 'error' ? 'bg-red-500' :
        'bg-blue-500'
    }`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showLoading(element) {
    element.innerHTML = `
        <div class="flex justify-center items-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span class="ml-2 text-gray-600">Loading...</span>
        </div>
    `;
}

function hideLoading(element) {
    element.innerHTML = '';
}
