<template>
    <div class="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">User Management</h2>
            <Button label="Add User" icon="pi pi-plus" class="p-button-primary px-4 py-2" @click="showAddUserDialog" />
        </div>

        <!-- Search & Actions -->
        <div class="flex justify-between items-center mb-4">
            <div class="relative w-full max-w-sm">
                <span class="absolute inset-y-0 left-3 flex items-center text-gray-500">
                    <i class="pi pi-search"></i>
                </span>
                <InputText v-model="search" placeholder="Search users..." class="w-full pl-10 p-2 border border-gray-300 rounded-lg dark:border-gray-600" />
            </div>
            <div class="flex gap-2">
                <Button label="Filter" icon="pi pi-filter" class="p-button-outlined px-4 py-2" />
                <Button label="Export" icon="pi pi-download" class="p-button-secondary px-4 py-2" />
            </div>
        </div>

        <!-- User Table -->
        <DataTable :value="filteredUsers" paginator :rows="10" class="shadow-md rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <Column field="name" header="User" class="text-left">
                <template #body="slotProps">
                    <div class="flex items-center gap-3 ml-4">
                        <Avatar :label="slotProps.data.name.charAt(0)" shape="circle" class="bg-blue-500 text-white" />
                        <span class="font-medium text-gray-900 dark:text-white">{{ slotProps.data.name }}</span>
                    </div>
                </template>
            </Column>
            <Column field="email" header="Email" class="text-left">
                <template #body="slotProps">
                    <span class="text-gray-700 dark:text-gray-300">{{ slotProps.data.email }}</span>
                </template>
            </Column>
            <Column field="department" header="Department" class="text-left">
                <template #body="slotProps">
                    <span class="text-gray-700 dark:text-gray-300">{{ slotProps.data.department }}</span>
                </template>
            </Column>
            <Column field="role" header="Role" class="text-left">
                <template #body="slotProps">
                    <Dropdown
                        v-model="slotProps.data.role"
                        :options="roles"
                        optionLabel="name"
                        placeholder="Select"
                        class="w-full"
                    />
                </template>
            </Column>
            <Column field="status" header="Status" class="text-left">
                <template #body="slotProps">
                    <Tag :value="slotProps.data.status" :severity="getStatusColor(slotProps.data.status)" class="px-3 py-1 text-sm font-semibold" />
                </template>
            </Column>
            <Column header="Actions" class="text-center">
                <template #body="slotProps">
                    <div class="flex justify-center gap-3">
                        <Button icon="pi pi-pencil" class="p-button-text p-button-rounded p-button-sm text-blue-500 hover:text-blue-700" @click="editUser(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-text p-button-rounded p-button-sm text-red-500 hover:text-red-700" @click="deleteUser(slotProps.data)" />
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script>
export default {
    data() {
        return {
            search: "",
            users: [
                { name: "John Doe", email: "john.doe@example.com", department: "Engineering", role: "Admin", status: "Active" },
                { name: "Jane Smith", email: "jane.smith@example.com", department: "Marketing", role: "Manager", status: "Active" },
            ],
            roles: [
                { name: "Admin" },
                { name: "Manager" },
                { name: "User" }
            ]
        };
    },
    computed: {
        filteredUsers() {
            return this.users.filter(user => user.name.toLowerCase().includes(this.search.toLowerCase()));
        }
    },
    methods: {
        getStatusColor(status) {
            return status === "Active" ? "success" : "danger";
        },
        editUser(user) {
            this.$toast.add({
                severity: "info",
                summary: "Edit User",
                detail: `Editing ${user.name}`,
                life: 3000
            });
        },
        deleteUser(user) {
            this.$toast.add({
                severity: "warn",
                summary: "Delete User",
                detail: `${user.name} removed`,
                life: 3000
            });
        }
    }
};
</script>
