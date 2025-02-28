<template>
	<div>
		<div class="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800 text-center cursor-pointer">
			<div class="text-3xl mb-2">{{ icon }}</div>
			<h3 class="font-semibold">{{ title }}</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		icon: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
	},
}
</script>
<style></style>
