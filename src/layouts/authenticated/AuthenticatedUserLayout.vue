<template>
	<div class="flex relative bg-slate-100 dark:bg-slate-950 h-screen overflow-hidden">
		<AunthenticatedUserAppBar />
		<AuthenticatedUserSidebar />

		<!-- Main Content -->
		<main
			:class="[
				'flex-1 pt-16 pr-2 h-full w-full transition-all duration-300 ease-in-out',
				isSidebarVisible ? 'xl:pl-80' : 'xl:pl-0',
			]"
		>
			<ScrollPanel
				style="width: 100%; height: 650px"
				:dt="{
					bar: {
						background: '{blue.600}',
					},
				}"
			>
				<div class="p-2 sm:p-4 md:p-6">
					<router-view></router-view>
				</div>
			</ScrollPanel>
		</main>
	</div>
</template>

<script>
import { computed, onMounted, onUnmounted } from 'vue'
import AunthenticatedUserAppBar from './AunthenticatedUserAppBar.vue'
import AuthenticatedUserSidebar from './AuthenticatedUserSidebar.vue'
import { useLayoutStore } from '@/stores/layoutStore'

export default {
	components: {
		AunthenticatedUserAppBar,
		AuthenticatedUserSidebar,
	},
	setup() {
		const layoutStore = useLayoutStore()
		const isSidebarVisible = computed(() => layoutStore.sideBar)

		onMounted(() => {
			layoutStore.initResizeListener()
		})

		onUnmounted(() => {
			layoutStore.cleanupResizeListener()
		})

		return { isSidebarVisible }
	},
}
</script>
