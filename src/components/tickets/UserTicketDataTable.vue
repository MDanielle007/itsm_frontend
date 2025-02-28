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
			<Column field="ticket_id" filterField="ticket_id" header="Ticket ID">
				<template #body="{ data }">
					<strong class="font-semibold">{{ data.ticket_id }}</strong>
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
					ticket_status: 'closed',
					ticket_created_at: '2025-02-27 08:30:00',
					ticket_updated_at: '2025-02-27 14:45:00',
					ticket_description: 'Unable to connect to the company WiFi since morning.',
				},
				{
					id: 2,
					ticket_id: 'TKT-SRV-USR456-20250227-0002',
					ticket_subject: 'Software Installation Request',
					ticket_category: 'Software',
					ticket_status: 'open',
					ticket_created_at: '2025-02-27 09:15:00',
					ticket_updated_at: '2025-02-27 09:15:00',
					ticket_description: 'Request to install Adobe Photoshop on workstation.',
				},
				{
					id: 3,
					ticket_id: 'TKT-INC-USR789-20250226-0003',
					ticket_subject: 'Email Not Receiving',
					ticket_category: 'Email',
					ticket_status: 'in progress',
					ticket_created_at: '2025-02-26 11:00:00',
					ticket_updated_at: '2025-02-27 10:00:00',
					ticket_description:
						'Emails are not arriving in the inbox, but sending works fine.',
				},
				{
					id: 4,
					ticket_id: 'TKT-SRV-USR234-20250225-0004',
					ticket_subject: 'New Employee Account Setup',
					ticket_category: 'Account Management',
					ticket_status: 'resolved',
					ticket_created_at: '2025-02-25 08:00:00',
					ticket_updated_at: '2025-02-26 16:30:00',
					ticket_description:
						'Request to create a new company email and VPN access for a new hire.',
				},
				{
					id: 5,
					ticket_id: 'TKT-INC-USR567-20250224-0005',
					ticket_subject: 'Printer Not Working',
					ticket_category: 'Hardware',
					ticket_status: 'closed',
					ticket_created_at: '2025-02-24 14:45:00',
					ticket_updated_at: '2025-02-25 10:30:00',
					ticket_description:
						'Office printer is not responding. Power and network connections checked.',
				},
				{
					id: 6,
					ticket_id: 'TKT-SRV-USR890-20250223-0006',
					ticket_subject: 'VPN Access Request',
					ticket_category: 'Network',
					ticket_status: 'in progress',
					ticket_created_at: '2025-02-23 12:20:00',
					ticket_updated_at: '2025-02-23 12:20:00',
					ticket_description: 'Request for VPN access for remote work.',
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
			statuses: ['open', 'in progress', 'resolved', 'closed'],
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
		formatDate,
		formatCellDate(date) {
			return formatDate(date)
		},
		getSeverity(status) {
			switch (status) {
				case 'open':
					return 'danger'

				case 'closed':
					return 'success'

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
