<template>
	<div class="flex flex-col md:flex-row gap-4">
		<!-- Main Article Section -->
		<div
			class="p-6 border rounded-lg shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800 flex-1"
		>
			<!-- Title & Meta -->
			<h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
				{{ article.title }}
			</h2>
			<div class="text-sm text-gray-500 flex items-center mt-2">
				<span>Updated: {{ article.updatedDate }}</span>
				<span class="mx-2">•</span>
				<span>By {{ article.author }}</span>
				<span
					class="ml-2 text-xs px-2 py-1 rounded-full text-green-700 bg-green-100"
					v-if="article.status"
				>
					{{ article.status }}
				</span>
			</div>
			<!-- Image -->
			<Image src="/images/article-image.png" alt="Image" />

			<!-- Description -->
			<p class="text-gray-600 text-base mt-4">{{ article.description }}</p>

			<!-- Steps List -->
			<div class="mt-6">
				<h3 class="font-medium text-gray-800 dark:text-gray-300">
					Steps to Reset Password:
				</h3>
				<ul class="list-decimal list-inside text-gray-700 dark:text-gray-400 mt-2">
					<li v-for="(step, index) in article.steps" :key="index">{{ step }}</li>
				</ul>
			</div>

			<Divider />

			<h3 class="font-medium text-gray-800 dark:text-gray-300">Was this article helpful?</h3>
			<!-- Feedback Section -->
			<div class="mt-3 flex gap-4">
				<Button icon="pi pi-thumbs-up" label="Yes" outlined />
				<Button icon="pi pi-thumbs-down" label="No" outlined />
				<Button icon="pi pi-share-alt" label="Share" outlined />
			</div>

			<div></div>
		</div>

		<!-- Sidebar Section -->
		<div class="w-full md:w-80 space-y-4">
			<!-- Article Metrics -->
			<div
				class="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800"
			>
				<h3 class="font-semibold mb-3">Article Metrics</h3>
				<div class="flex justify-between items-center text-slate-600 mb-2">
					<div class="flex gap-2 items-center">
						<i class="pi pi-thumbs-up" style="font-size: 1rem"></i>
						<span>Helpful</span>
					</div>
					<div class="text-green-500 font-bold">89%</div>
				</div>
				<ProgressBar
					:value="89"
					pt:value:class="bg-green-500"
					:showValue="false"
				></ProgressBar>
				<div class="flex justify-between mt-2 text-sm text-slate-600 gap-5">
					<div><span class="font-semibold">245</span> users found this helpful</div>
					<div><span class="font-semibold">30</span> not helpful</div>
				</div>
			</div>

			<!-- Similar Articles -->
			<div
				class="p-4 border rounded-lg shadow-sm bg-white dark:bg-slate-900 dark:border-slate-800"
			>
				<h3 class="font-semibold mb-4">Similar Articles</h3>
				<div v-for="(item, index) in knowledgeBaseSuggestion" :key="index">
					<SuggestedArticleCard
						class="mb-2"
						:title="item.title"
						:description="item.description"
						:views="item.views"
						:likes="item.likes"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import SuggestedArticleCard from '@/components/knowledge_base/SuggestedArticleCard.vue'
import { ref } from 'vue'

const knowledgeBaseSuggestion = ref([
	{
		title: 'How to Reset Your Password',
		description:
			'Step-by-step guide on resetting your password using the "Forgot Password" option.',
		views: '3.2k views',
		likes: '92%',
	},
	{
		title: 'Reset Password Without Access to Email',
		description:
			'Learn alternative ways to reset your password if you cannot access your registered email.',
		views: '1.8k views',
		likes: '87%',
	},
	{
		title: 'Troubleshooting Password Reset Issues',
		description: 'Common problems when resetting passwords and how to resolve them quickly.',
		views: '2.1k views',
		likes: '90%',
	},
])

const article = ref({
	title: 'How to Reset Your Password',
	updatedDate: 'Jan 15, 2025',
	author: 'John Smith',
	status: 'Approved',
	steps: [
		'Navigate to the login page',
		'Click on Forgot Password',
		'Enter your email address',
		'Check your email for reset instructions',
	],
})
</script>

<style>
/* Improved spacing and alignment */
</style>
