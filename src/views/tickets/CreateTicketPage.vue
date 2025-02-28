<template>
	<div class="text-slate-800 dark:text-slate-100 flex gap-6 justify-center ">
		<div class="w-[700px] px-14">
			<h2 class="font-bold text-2xl">Create Ticket</h2>
			<form @submit.prevent="onFormSubmit">
				<div class="flex flex-col gap-4 mt-4 w-full">
					<div>
						<label for="ticket_type" class="block font-medium">Ticket Type</label>
						<div class="flex flex-wrap gap-4">
							<div class="flex items-center gap-2">
								<RadioButton
									v-model="formData.type"
									inputId="Incident"
									name="ticket_type"
									value="incident"
								/>
								<label for="Incident">Incident</label>
							</div>
							<div class="flex items-center gap-2">
								<RadioButton
									v-model="formData.type"
									inputId="Service"
									name="ticket_type"
									value="service"
								/>
								<label for="Service">Service</label>
							</div>
						</div>
					</div>

					<div>
						<label for="ticket_subject" class="block font-medium">Subject</label>
						<InputText type="text" v-model="formData.subject" fluid />
					</div>
					<div>
						<label for="category" class="block font-medium">Category</label>
						<Select
							showClear
							v-model="formData.category"
							:options="categories"
							optionLabel="name"
							optionValue="code"
							placeholder="Select a Category"
							fluid
						/>
					</div>
					<div v-if="formData.category">
						<label for="subCategory" class="block font-medium">Sub Category</label>
						<Select
							filter
							showClear
							v-model="formData.subCategory"
							:options="subCategories"
							optionLabel="name"
							optionValue="code"
							placeholder="Select a Category"
							fluid
						/>
					</div>
					<div v-if="formData.subCategory && formData.category">
						<label for="subLevel3Category" class="block font-medium"
							>Sub Level 3 Category</label
						>
						<Select
							filter
							showClear
							v-model="formData.subLevel3Category"
							:options="subLevel3Categories"
							optionLabel="name"
							optionValue="code"
							placeholder="Select a Category"
							fluid
						/>
					</div>
					<div>
						<label for="ticket_subject" class="block font-medium">Description</label>
						<Textarea v-model="formData.description" rows="3" cols="30" fluid />
					</div>
					<div>
						<label for="ticket_subject" class="block font-medium">Attachments</label>
						<FileUpload
							name="demo[]"
							url="/api/upload"
							@upload="onAdvancedUpload($event)"
							:multiple="true"
							accept="image/*"
							:maxFileSize="10000000"
						>
							<template #empty>
								<span>Drag and drop files to here to upload.</span>
							</template>
						</FileUpload>
					</div>
					<div class="flex justify-end gap-2">
						<Button severity="secondary" @click="clearInput" label="Clear" />
						<Button type="submit" label="Submit" />
					</div>
				</div>
			</form>
		</div>

		<div class="h-full w-96 rounded-lg p-5 bg-white dark:bg-slate-800 drop-shadow-lg">
			<h3 class="font-semibold mb-4">Knowledge Base Suggestion</h3>
			<div v-for="(item, index) in knowledgeBaseSuggestion" :key="index">
				<div class="flex flex-col p-4 rounded-md gap-2 border mb-4 dark:bg-slate-700 dark:border-slate-500">
					<h6 class="font-semibold">
						<i class="pi pi-lightbulb" style="font-size: 1rem"></i>
						{{ item.title }}
					</h6>
					<p class="m-0 text-sm text-slate-700 dark:text-slate-300">
						{{ item.description }}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			ingredient: '',
			formData: {
				type: '',
				subject: '',
				category: '',
				subCategory: '',
				subLevel3Category: '',
				description: '',
			},
			knowledgeBaseSuggestion: [
				{
					title: 'Network Connectivity Issues',
					description: 'Common solution for network connectivity issues',
				},
				{
					title: 'Network Connectivity Issues',
					description: 'Common solution for network connectivity issues',
				},
				{
					title: 'Network Connectivity Issues',
					description: 'Common solution for network connectivity issues',
				},
			],
			categories: [
				{
					code: 'Network',
					name: 'Network',
					subCategories: [
						{
							code: 'Connectivity Issues',
							name: 'Connectivity Issues',
							subLevel3: [
								{ code: 'WiFi Not Working', name: 'WiFi Not Working' },
								{ code: 'Slow Internet', name: 'Slow Internet' },
								{ code: 'No Connection', name: 'No Connection' },
							],
						},
						{
							code: 'VPN Issues',
							name: 'VPN Issues',
							subLevel3: [
								{ code: 'Cannot Connect to VPN', name: 'Cannot Connect to VPN' },
								{ code: 'VPN Slow', name: 'VPN Slow' },
								{
									code: 'VPN Authentication Error',
									name: 'VPN Authentication Error',
								},
							],
						},
					],
				},
				{
					code: 'Software',
					name: 'Software',
					subCategories: [
						{
							code: 'Installation Issues',
							name: 'Installation Issues',
							subLevel3: [
								{ code: 'Adobe Installation', name: 'Adobe Installation' },
								{ code: 'Microsoft Office Setup', name: 'Microsoft Office Setup' },
								{ code: 'Antivirus Installation', name: 'Antivirus Installation' },
							],
						},
						{
							code: 'Application Errors',
							name: 'Application Errors',
							subLevel3: [
								{ code: 'Crash on Startup', name: 'Crash on Startup' },
								{ code: 'License Expired', name: 'License Expired' },
								{ code: 'Slow Performance', name: 'Slow Performance' },
							],
						},
					],
				},
				{
					code: 'Hardware',
					name: 'Hardware',
					subCategories: [
						{
							code: 'Printer Issues',
							name: 'Printer Issues',
							subLevel3: [
								{ code: 'Not Printing', name: 'Not Printing' },
								{ code: 'Paper Jam', name: 'Paper Jam' },
								{ code: 'Low Ink', name: 'Low Ink' },
							],
						},
						{
							code: 'Computer Issues',
							name: 'Computer Issues',
							subLevel3: [
								{ code: 'Blue Screen', name: 'Blue Screen' },
								{ code: 'Overheating', name: 'Overheating' },
								{ code: 'Not Booting', name: 'Not Booting' },
							],
						},
					],
				},
				{
					code: 'Email',
					name: 'Email',
					subCategories: [
						{
							code: 'Email Delivery Issues',
							name: 'Email Delivery Issues',
							subLevel3: [
								{ code: 'Not Receiving Emails', name: 'Not Receiving Emails' },
								{ code: 'Cannot Send Emails', name: 'Cannot Send Emails' },
								{ code: 'Spam Issues', name: 'Spam Issues' },
							],
						},
						{
							code: 'Configuration Problems',
							name: 'Configuration Problems',
							subLevel3: [
								{ code: 'Wrong SMTP Settings', name: 'Wrong SMTP Settings' },
								{ code: 'IMAP/POP3 Issue', name: 'IMAP/POP3 Issue' },
								{ code: 'Signature Not Loading', name: 'Signature Not Loading' },
							],
						},
					],
				},
			],
		}
	},
	computed: {
		subCategories() {
			return (
				this.categories.find((c) => c.code === this.formData.category)?.subCategories || []
			)
		},
		subLevel3Categories() {
			return (
				this.subCategories.find((c) => c.code === this.formData.subCategory)?.subLevel3 ||
				[]
			)
		},
	},
	methods: {
		onFormSubmit() {
			console.log('Form submitted')
			this.$toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Ticket submitted',
				life: 3000,
			})
		},
		onAdvancedUpload() {
			this.$toast.add({
				severity: 'info',
				summary: 'Success',
				detail: 'File Uploaded',
				life: 3000,
			})
		},
		clearInput() {
			this.formData = {
				type: '',
				subject: '',
				category: '',
				subCategory: '',
				subLevel3Category: '',
				description: '',
			}
		},
	},
	watch: {
		// Reset subCategory and subLevel3Category when category changes
		'formData.category'(newVal) {
			this.formData.subCategory = '' // Reset subCategory
			this.formData.subLevel3Category = '' // Reset subLevel3Category
		},

		// Reset subLevel3Category when subCategory changes
		'formData.subCategory'(newVal) {
			this.formData.subLevel3Category = '' // Reset subLevel3Category
		},
	},
}
</script>
<style></style>
