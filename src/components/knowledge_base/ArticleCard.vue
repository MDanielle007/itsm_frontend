<template>
	<div>
		<div
			class="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800 mb-4 cursor-pointer"
		>
			<h3 class="font-semibold">{{ title }}</h3>
			<p class="text-sm text-gray-600 dark:text-gray-400">{{ description }}</p>
			<p class="text-xs text-gray-500 mt-1">
				<span v-if="views">
					<i class="pi pi-eye" style="font-size: 0.65rem;"/>
				</span>
				<span v-else>
					<i class="pi pi-clock" style="font-size: 0.65rem;"/>
				</span>
				{{ views || updated }}
			</p>
		</div>
	</div>
</template>
<script>
export default {
	props: ['title', 'views', 'updated', 'description'],
}
</script>
<style></style>
