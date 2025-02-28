<template>
	<div class="space-y-6">
		<TicketMetricsCards />
		<UserTicketDataTable />
	</div>
</template>

<script>
import UserTicketDataTable from '@/components/tickets/UserTicketDataTable.vue'
import TicketMetricsCards from '@/components/tickets/TicketMetricsCards.vue'

export default {
	components: {
		UserTicketDataTable,
		TicketMetricsCards,
	},
}
</script>

<style></style>
