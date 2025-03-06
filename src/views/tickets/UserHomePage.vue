<template>
	<div>
		<div class="h-[450px] flex flex-col items-center justify-center px-4">
			<h1 class="text-3xl font-semibold mb-6">How can we help?</h1>

			<!-- Search Bar -->
			<div class="w-full max-w-lg mb-8">
				<div class="relative">
					<input
						type="text"
						placeholder="Search for help..."
						class="w-full p-3 pl-10 rounded-full bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
					/>
					<span class="absolute left-3 top-3 text-gray-400">🔍</span>
				</div>
			</div>

			<!-- Cards Section -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
				<!-- Tickets Card -->
				<div
					class="bg-white text-black dark:bg-gray-800 dark:text-gray-50 p-6 rounded-lg shadow-lg text-center"
				>
					<span class="text-3xl cursor-pointer">🖥️</span>
					<h2 class="text-xl font-semibold mt-2">Tickets</h2>
					<p class="text-gray-600 dark:text-gray-400 mt-1">
						View and manage your support requests.
					</p>
					<router-link :to="{ name: 'user-ticket-management' }">
						<button
							class="mt-4 bg-gray-900 text-white px-4 py-2 rounded flex items-center mx-auto"
						>
							MORE ➜
						</button>
					</router-link>
				</div>

				<!-- Need Help Card -->
				<div
					class="bg-white text-black dark:bg-gray-800 dark:text-gray-50 p-6 rounded-lg shadow-lg text-center"
				>
					<span class="text-3xl cursor-pointer">⚙️</span>
					<h2 class="text-xl font-semibold mt-2">Need Help?</h2>
					<p class="text-gray-600 dark:text-gray-400 mt-1">
						Create a new support request here.
					</p>
					<router-link :to="{ name: 'user-create-ticket' }">
						<button
							class="mt-4 bg-gray-900 text-white px-4 py-2 rounded flex items-center mx-auto"
						>
							MORE ➜
						</button>
					</router-link>
				</div>

				<!-- Knowledge Base Card -->
				<div
					class="bg-white text-black dark:bg-gray-800 dark:text-gray-50 p-6 rounded-lg shadow-lg text-center"
				>
					<span class="text-3xl cursor-pointer">📖</span>
					<h2 class="text-xl font-semibold mt-2">Knowledge Base</h2>
					<p class="text-gray-600 dark:text-gray-400 mt-1">
						FAQs, self-help guides, and troubleshooting articles.
					</p>
					<router-link :to="{ name: 'knowledge-base' }">
						<button
							class="mt-4 bg-gray-900 text-white px-4 py-2 rounded flex items-center mx-auto"
						>
							MORE ➜
						</button>
					</router-link>
				</div>
			</div>
		</div>

		<!-- Footer -->
		<footer
			class="mt-12 py-4 text-center text-gray-600 dark:text-gray-300 border-t border-gray-700 w-full"
		>
			<p>&copy; 2025 ITSM Portal. All rights reserved.</p>
			<div class="flex justify-center space-x-4 mt-2">
				<a href="#" class="dark:hover:text-white hover:text-gray-800">Terms</a>
				<a href="#" class="dark:hover:text-white hover:text-gray-800">Privacy</a>
				<a href="#" class="dark:hover:text-white hover:text-gray-800">Contact</a>
			</div>
		</footer>
	</div>
</template>
<script>
export default {}
</script>
<style></style>
