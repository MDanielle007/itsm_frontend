<template>
	<div class="p-2 bg-white dark:bg-[#18181b] rounded-lg border dark:border-slate-800">
		<DataTable
			ref="dt"
			v-model:filters="filters"
			:value="formattedTickets"
			paginator
			:rows="10"
			dataKey="id"
			filterDisplay="menu"
			:loading="loading"
			:globalFilterFields="[
				'ticket_id',
				'ticket_subject',
				'ticket_category',
				'ticket_status',
				'ticket_created_at',
			]"
		>
			<template #header>
				<div class="flex justify-between items-center">
					<div class="flex gap-2 items-center">
						<h2 class="font-bold text-xl">My Tickets</h2>
					</div>

					<div>
						<IconField>
							<InputIcon>
								<i class="pi pi-search" />
							</InputIcon>
							<InputText
								v-model="filters['global'].value"
								placeholder="Keyword Search"
							/>
						</IconField>
					</div>
					<div class="flex gap-1">
						<router-link :to="{ name: 'user-create-ticket' }">
							<Button label="New Ticket" icon="pi pi-plus" />
						</router-link>

						<Button
							label="Export"
							icon="pi pi-upload"
							severity="secondary"
							@click="exportCSV($event)"
						/>
					</div>
				</div>
			</template>
			<template #empty> No tickets found. </template>
			<template #loading> Loading tickets data. Please wait. </template>

			<!-- Clickable Ticket ID Column -->
			<Column field="ticket_id" filterField="ticket_id" header="Ticket ID">
				<template #body="{ data }">
					<router-link
						:to="{ name: 'ticket-details', params: { ticketId: data.ticket_id } }"
						class="text-blue-500 hover:underline font-semibold"
					>
						{{ data.ticket_id }}
					</router-link>
				</template>
				<template #filter="{ filterModel, filterCallback }">
					<InputText
						v-model="filterModel.value"
						type="text"
						@input="filterCallback()"
						size="small"
						placeholder="Search by Ticket ID"
					/>
				</template>
				<template #filterclear="{ filterCallback }">
					<Button
						type="button"
						icon="pi pi-times"
						@click="filterCallback()"
						severity="secondary"
						label="Clear"
					></Button>
				</template>
				<template #filterapply="{ filterCallback }">
					<Button
						label="Apply"
						type="button"
						icon="pi pi-check"
						@click="filterCallback()"
						severity="success"
					></Button>
				</template>
			</Column>

			<Column field="ticket_subject" filterField="ticket_subject" header="Subject">
				<template #body="{ data }">
					{{ data.ticket_subject }}
				</template>
				<template #filter="{ filterModel, filterCallback }">
					<InputText
						v-model="filterModel.value"
						type="text"
						@input="filterCallback()"
						size="small"
						placeholder="Search by Subject"
					/>
				</template>
				<template #filterclear="{ filterCallback }">
					<Button
						type="button"
						icon="pi pi-times"
						@click="filterCallback()"
						severity="secondary"
						label="Clear"
					></Button>
				</template>
				<template #filterapply="{ filterCallback }">
					<Button
						label="Apply"
						type="button"
						icon="pi pi-check"
						@click="filterCallback()"
						severity="success"
					></Button>
				</template>
			</Column>

			<Column field="ticket_category" filterField="ticket_category" header="Category">
				<template #body="{ data }">
					{{ data.ticket_category }}
				</template>
				<template #filter="{ filterModel, filterCallback }">
					<InputText
						v-model="filterModel.value"
						type="text"
						@input="filterCallback()"
						size="small"
						placeholder="Search by Category"
					/>
				</template>
				<template #filterclear="{ filterCallback }">
					<Button
						type="button"
						icon="pi pi-times"
						@click="filterCallback()"
						severity="secondary"
						label="Clear"
					></Button>
				</template>
				<template #filterapply="{ filterCallback }">
					<Button
						label="Apply"
						type="button"
						icon="pi pi-check"
						@click="filterCallback()"
						severity="success"
					></Button>
				</template>
			</Column>

			<Column field="ticket_status" filterField="ticket_status" header="Status">
				<template #body="{ data }">
					<Tag :value="data.ticket_status" :severity="getSeverity(data.ticket_status)" />
				</template>
				<template #filter="{ filterModel }">
					<Select
						v-model="filterModel.value"
						:options="statuses"
						placeholder="Select One"
						showClear
					>
						<template #option="slotProps">
							<Tag
								:value="slotProps.option"
								:severity="getSeverity(slotProps.option)"
							/>
						</template>
					</Select>
				</template>
				<template #filterclear="{ filterCallback }">
					<Button
						type="button"
						icon="pi pi-times"
						@click="filterCallback()"
						severity="secondary"
						label="Clear"
					></Button>
				</template>
				<template #filterapply="{ filterCallback }">
					<Button
						label="Apply"
						type="button"
						icon="pi pi-check"
						@click="filterCallback()"
						severity="success"
					></Button>
				</template>
			</Column>

			<Column header="Created at" filterField="ticket_created_at" dataType="date">
				<template #body="{ data }">
					{{ data.formatted_created_at }}
				</template>
				<template #filter="{ filterModel }">
					<DatePicker
						showIcon
						v-model="filterModel.value"
						dateFormat="mm/dd/yy"
						placeholder="mm/dd/yyyy"
					/>
				</template>
				<template #filterclear="{ filterCallback }">
					<Button
						type="button"
						icon="pi pi-times"
						@click="filterCallback()"
						severity="secondary"
						label="Clear"
					></Button>
				</template>
				<template #filterapply="{ filterCallback }">
					<Button
						label="Apply"
						type="button"
						icon="pi pi-check"
						@click="filterCallback()"
						severity="success"
					></Button>
				</template>
			</Column>
		</DataTable>
	</div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from '@primevue/core/api'
import { formatDate } from '@/utils/formatUtils'

export default {
	data() {
		return {
			tickets: [
				{
					id: 1,
					ticket_id: 'TKT-INC-USR123-20250227-0001',
					ticket_subject: 'Network Issue',
					ticket_category: 'Network',
					ticket_status: 'Closed',
					ticket_created_at: '2025-02-27 08:30:00',
				},
				{
					id: 2,
					ticket_id: 'TKT-SRV-USR456-20250227-0002',
					ticket_subject: 'Software Installation Request',
					ticket_category: 'Software',
					ticket_status: 'Open',
					ticket_created_at: '2025-02-27 09:15:00',
				},
			],
			filters: {
				global: { value: null, matchMode: FilterMatchMode.CONTAINS },
				ticket_id: {
					operator: FilterOperator.AND,
					constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
				},
				ticket_subject: {
					operator: FilterOperator.AND,
					constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
				},
				ticket_category: {
					operator: FilterOperator.AND,
					constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }],
				},
				ticket_status: {
					operator: FilterOperator.OR,
					constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }],
				},
				ticket_created_at: {
					operator: FilterOperator.AND,
					constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
				},
			},
			statuses: ['Open', 'in progress', 'resolved', 'Closed'],
			loading: false,
		}
	},
	computed: {
		formattedTickets() {
			return this.tickets.map((ticket) => ({
				...ticket,
				formatted_created_at: formatDate(ticket.ticket_created_at, 'short'),
			}))
		},
	},
	methods: {
		getSeverity(status) {
			switch (status) {
				case 'Open':
					return 'success'
				case 'Closed':
					return 'danger'
				case 'in progress':
					return 'info'
				case 'resolved':
					return 'warn'
			}
		},
		exportCSV() {
			this.$refs.dt.exportCSV()
		},
	},
}
</script>
