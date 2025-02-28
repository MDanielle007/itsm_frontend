<template>
	<div class="max-w-5xl mx-auto p-4">
		<h1 class="text-2xl font-semibold text-center mb-6">How can we help you today?</h1>
		<div class="relative mb-8">
			<IconField>
				<InputIcon>
					<i class="pi pi-search" />
				</InputIcon>
				<InputText v-model="searchArticle" placeholder="Search for articles..." fluid />
			</IconField>
		</div>

		<section class="mb-10">
			<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
				<div v-for="(category, index) in categoriesArticle" :key="index">
					<CategoryCard
						:icon="category.icon"
						:title="category.title"
						:description="category.description"
					/>
				</div>
			</div>
		</section>

		<section class="grid grid-cols-1 md:grid-cols-2 gap-8">
			<div>
				<div class="flex justify-between items-top">
					<h2 class="text-xl font-semibold mb-4">Most Viewed Articles</h2>
					<a href="#" class="text-sm mt-2 text-primary">See more</a>
				</div>
				<div v-for="(article, index) in mostViewedArticle" :key="index">
					<ArticleCard :title="article.title" :views="article.views" :description="article.description" />
				</div>
			</div>

			<div>
				<div class="flex justify-between items-top">
					<h2 class="text-xl font-semibold mb-4">Recently Updated</h2>
					<a href="#" class="text-sm mt-2 text-primary">See more</a>
				</div>
				<ArticleCard
					title="2025 Security Updates"
					updated="Updated 2 hours ago"
					description="Latest security patches and improvements."
				/>
				<ArticleCard
					title="Hardware Compatibility Guide"
					updated="Updated 1 day ago"
					description="Updated compatibility list for latest devices."
				/>
			</div>
		</section>
	</div>
</template>

<script>
import ArticleCard from '@/components/knowledge_base/ArticleCard.vue'
import CategoryCard from '@/components/knowledge_base/CategoryCard.vue'

export default {
	components: {
		ArticleCard,
		CategoryCard,
	},
	data() {
		return {
			searchArticle: '',
			categoriesArticle: [
				{
					icon: '💻',
					title: 'Software',
					description: 'Installation guides, troubleshooting, and updates',
				},
				{
					icon: '🖥️',
					title: 'Hardware',
					description: 'Device setup, maintenance, and repairs',
				},
				{
					icon: '🌐',
					title: 'Network',
					description: 'Connectivity, configuration, and security',
				},
				{
					icon: '🛡️',
					title: 'Security',
					description: 'Best practices, protocols, and protection',
				},
			],
			mostViewedArticle: [
				{
					title: 'Getting Started with Cloud Storage',
					views: '2.5k views',
					description:
						'Learn the basics of cloud storage and how to set up your account.',
				},
				{
					title: 'Network Security Best Practices',
					views: '1.8k views',
					description: 'Essential security measures for your network.',
				},
			],
		}
	},
}
</script>
<style></style>
