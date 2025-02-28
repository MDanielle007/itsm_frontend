<template>
	<div class="grid grid-cols-2 md:grid-cols-4 gap-3">
		<!-- Total Tickets -->
		<div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
			<div class="flex items-center gap-3">
				<div class="bg-blue-100 dark:bg-blue-900 p-2 rounded-lg">
					<i class="pi pi-ticket text-blue-600 dark:text-blue-300 text-xl"></i>
				</div>
				<div>
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Total</p>
					<p class="text-xl font-bold text-gray-800 dark:text-white">
						{{ totalTickets }}
					</p>
				</div>
			</div>
		</div>

		<!-- New Today -->
		<div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
			<div class="flex items-center gap-3">
				<div class="bg-green-100 dark:bg-green-900 p-2 rounded-lg">
					<i class="pi pi-plus-circle text-green-600 dark:text-green-300 text-xl"></i>
				</div>
				<div>
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">New</p>
					<p class="text-xl font-bold text-gray-800 dark:text-white">{{ newTickets }}</p>
				</div>
			</div>
		</div>

		<!-- Active -->
		<div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
			<div class="flex items-center gap-3">
				<div class="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-lg">
					<i class="pi pi-sync text-yellow-600 dark:text-yellow-300 text-xl"></i>
				</div>
				<div>
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Active</p>
					<p class="text-xl font-bold text-gray-800 dark:text-white">
						{{ activeTickets }}
					</p>
				</div>
			</div>
		</div>

		<!-- Pending -->
		<div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm">
			<div class="flex items-center gap-3">
				<div class="bg-orange-100 dark:bg-orange-900 p-2 rounded-lg">
					<i class="pi pi-clock text-orange-600 dark:text-orange-300 text-xl"></i>
				</div>
				<div>
					<p class="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
					<p class="text-xl font-bold text-gray-800 dark:text-white">
						{{ pendingTickets }}
					</p>
				</div>
			</div>
		</div>

		<!-- Categories -->
		<div class="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm col-span-2 md:col-span-4">
			<p class="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Categories</p>
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div v-for="(count, category) in ticketsByCategory" :key="category">
					<p class="text-xs text-gray-500 dark:text-gray-400">{{ category }}</p>
					<p class="text-lg font-semibold text-gray-800 dark:text-white">{{ count }}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			totalTickets: 0,
			newTickets: 0,
			pendingTickets: 0,
			activeTickets: 0,
			ticketsByCategory: {
				Network: 0,
				Software: 0,
				Hardware: 0,
				Security: 0,
			},
		}
	},
	methods: {
		async fetchTicketMetrics() {
			try {
				// Simulate API call - Replace with actual API call
				this.totalTickets = 150
				this.newTickets = 12
				this.pendingTickets = 45
				this.activeTickets = 67
				this.ticketsByCategory = {
					Network: 45,
					Software: 38,
					Hardware: 42,
					Security: 25,
				}
			} catch (error) {
				console.error('Error fetching ticket metrics:', error)
			}
		},
	},
	mounted() {
		this.fetchTicketMetrics()
	},
}
</script>
