<template>
	<div class="p-6 bg-gray-100 dark:bg-gray-900 min-h-screen">
		<Dialog v-model:visible="visible" modal header="Update Status" :style="{ width: '25rem' }">
			<div class="card flex justify-center mb-5">
				<Select
					v-model="selectedStatus"
					:options="statuses"
					optionLabel="name"
					placeholder="Select a status"
					fluid
				/>
			</div>

			<div class="flex justify-end gap-2">
				<Button
					type="button"
					label="Cancel"
					severity="secondary"
					@click="visible = false"
				></Button>
				<Button type="button" label="Save" @click="confirmUpdateStatus"></Button>
			</div>
		</Dialog>

		<div
			class="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-300 dark:border-gray-700"
		>
			<div class="flex items-center gap-3">
				<i class="pi pi-ticket text-2xl text-blue-600"></i>
				<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
					Ticket #{{ ticketId }}
				</h2>
			</div>
			<div class="flex gap-3">
				<Tag icon="pi pi-clock" severity="info" value="In Progress"></Tag>
				<button
					@click="confirmCloseTicket"
					class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500"
				>
					<i class="pi pi-times mr-2"></i> Close Ticket
				</button>
			</div>
		</div>

		<div class="grid grid-cols-3 gap-6 mt-6 items-start">
			<div class="col-span-2">
				<div
					class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-300 dark:border-gray-700"
				>
					<h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
						Ticket Information
					</h3>
					<div class="grid grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-300">
						<p><strong>Category:</strong> {{ ticket.category }}</p>
						<p>
							<strong>Priority:</strong>
							<span
								:class="getPriorityColor(ticket.priority)"
								class="px-2 py-1 rounded-md text-white ml-1"
							>
								{{ ticket.priority }}
							</span>
						</p>
						<p>
							<strong>Assigned Team:</strong> <i class="pi pi-users"></i>
							{{ ticket.assigned_team }}
						</p>
						<p>
							<strong>SLA Deadline:</strong> <i class="pi pi-clock"></i>
							{{ ticket.sla_deadline }}
						</p>
						<p>
							<strong>Ticket Type:</strong>
							<span class="px-2 py-1 ml-1 bg-gray-200 dark:bg-gray-700 rounded-md">
								{{ ticket.type }}</span
							>
						</p>
						<p class="col-span-2">
							<strong>Description:</strong> {{ ticket.description }}
						</p>
					</div>
				</div>

				<div
					class="mt-4 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-300 dark:border-gray-700 max-h-[450px] overflow-y-auto"
				>
					<h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
						Activity Timeline
					</h3>
					<Timeline :value="ticket.activity" align="alternate">
						<template #content="slotProps">
							<div
								class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-600 w-full"
							>
								<div class="flex items-center gap-3">
									<i
										:class="getActivityIcon(slotProps.item.title)"
										class="text-lg"
									></i>
									<div>
										<p class="text-xs text-gray-500">
											{{ slotProps.item.date }} at {{ slotProps.item.time }}
										</p>
										<p
											class="text-md font-semibold text-gray-900 dark:text-white"
										>
											{{ slotProps.item.title }}
										</p>
									</div>
								</div>
								<p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
									{{ slotProps.item.description }}
								</p>
							</div>
						</template>
					</Timeline>
				</div>
			</div>

			<div
				class="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 border border-gray-300 dark:border-gray-700"
			>
				<h3 class="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
					AI-Suggested Articles
				</h3>
				<div class="space-y-4 max-h-[400px] overflow-y-auto">
					<div
						v-for="(article, index) in suggestedArticles"
						:key="index"
						class="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg shadow-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition"
					>
						<a href="#" class="text-blue-500 hover:underline font-medium">{{
							article.title
						}}</a>
						<p class="text-xs text-gray-500">
							{{ article.description }} ({{ article.readTime }} min read)
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: ['ticketId'],
	data() {
		return {
			ticket: {
				category: 'Technical Support',
				priority: 'High',
				assigned_team: 'Network Operations',
				sla_deadline: '4 hours remaining',
				type: 'Incident',
				description:
					'User is experiencing network connectivity issues. The problem started this morning.',
				activity: [
					{
						date: '06/03/2025',
						time: '10:30 AM',
						title: 'Ticket Created',
						description: 'User reported an issue with network connectivity.',
					},
					{
						date: '06/03/2025',
						time: '11:00 AM',
						title: 'Assigned to Network Operations',
						description:
							'Ticket assigned to the Network Operations team for investigation.',
					},
					{
						date: '06/03/2025',
						time: '12:15 PM',
						title: 'Status changed to "In Progress"',
						description: 'A technician started troubleshooting the issue.',
					},
					{
						date: '06/03/2025',
						time: '02:45 PM',
						title: 'Internal Note Added',
						description:
							'Requested additional details from the user regarding the issue.',
					},
					{
						date: '06/03/2025',
						time: '04:00 PM',
						title: 'Issue Resolved',
						description: 'Network settings were updated and connectivity was restored.',
					},
				],
			},
			suggestedArticles: [
				{
					title: 'Network Troubleshooting Guide',
					description: 'Step-by-step guide for resolving common network issues...',
					readTime: 5,
				},
				{
					title: 'How to Optimize Network Performance',
					description: 'Tips for improving network speed and stability...',
					readTime: 6,
				},
				{
					title: 'Best Practices for Secure VPN Connections',
					description: 'Ensuring security while using VPN services...',
					readTime: 7,
				},
			],
			visible: false,
			selectedStatus: '',
			statuses: [
				{
					name: 'New',
					code: 'New',
				},
				{
					name: 'Open',
					code: 'Open',
				},
				{
					name: 'In Progress',
					code: 'In Progress',
				},
				{
					name: 'Pending',
					code: 'Pending',
				},
				{
					name: 'Resolved',
					code: 'Resolved',
				},
			],
		}
	},
	methods: {
		getPriorityColor(priority) {
			switch (priority.toLowerCase()) {
				case 'high':
					return 'bg-red-500'
				case 'medium':
					return 'bg-yellow-500'
				case 'low':
					return 'bg-green-500'
				default:
					return 'bg-gray-500'
			}
		},
		getActivityIcon(title) {
			if (title.includes('Created')) return 'pi pi-file text-blue-500'
			if (title.includes('Assigned')) return 'pi pi-user text-yellow-500'
			if (title.includes('In Progress')) return 'pi pi-cog text-orange-500'
			if (title.includes('Note')) return 'pi pi-comments text-green-500'
			if (title.includes('Resolved')) return 'pi pi-check-circle text-green-600'
			if (title.includes('Closed')) return 'pi pi-times-circle text-red-600'
			return 'pi pi-info-circle text-gray-500'
		},
		confirmCloseTicket() {
			this.$confirm.require({
				message: 'Are you sure you want to close this ticket?',
				header: 'Confirm Ticket Closure',
				icon: 'pi pi-info-circle',
				rejectLabel: 'Cancel',
				rejectProps: {
					label: 'Cancel',
					severity: 'secondary',
					outlined: true,
				},
				acceptProps: {
					label: 'Close Ticket',
					severity: 'danger',
				},
				accept: () => {
					this.$toast.add({
						severity: 'info',
						summary: 'Confirmed',
						detail: 'Ticket has been closed.',
						life: 3000,
					})
					setTimeout(() => {
						this.$router.push('/app/tickets')
					}, 1500)
				},
			})
		},
		confirmUpdateStatus() {
			this.$toast.add({
				severity: 'info',
				summary: 'Success',
				detail: 'Ticket Status Updated',
				life: 3000,
			})
			this.visible = false
		},
		updateTicketStatus() {
			console.log('Status updated')
			const now = new Date()
			this.ticket.activity.push({
				date: now.toLocaleDateString(),
				time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
				title: 'Status Updated',
				description: 'The ticket status was updated by the agent.',
			})
		},
	},
}
</script>
