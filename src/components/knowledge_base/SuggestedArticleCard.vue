<template>
	<div class="border rounded-lg shadow-sm p-4 w-full max-w-md bg-white">
		<h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
		<p class="text-gray-600 text-sm mt-1">{{ truncatedDescription }}</p>
		<div class="flex items-center text-gray-500 text-sm mt-2">
			<span class="flex items-center mr-4">
				<i class="pi pi-eye mr-1" style="font-size: 0.65rem" />
				{{ views }}
			</span>
			<span class="flex items-center">
				<i class="pi pi-thumbs-up mr-1" style="font-size: 1rem"></i>
				{{ likes }}
			</span>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
	title: String,
	description: String,
	views: String,
	likes: String,
})

const truncatedDescription = computed(() => {
	return props.description.length > 50
		? props.description.substring(0, 50) + '...'
		: props.description
})
</script>
