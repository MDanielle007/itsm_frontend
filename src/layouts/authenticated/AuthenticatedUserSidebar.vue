<template>
	<div
		:class="[
			'bg-white dark:bg-slate-800 fixed top-14 left-0 h-screen z-20 transition-transform duration-300 ease-in-out drop-shadow-lg lg:drop-shadow-none pt-4 px-6',
			isSidebarVisible ? 'translate-x-0' : '-translate-x-full',
		]"
		style="width: 20rem"
	>
		<div>
			<ScrollPanel
				style="width: 100%; height: 100%"
				:dt="{
					bar: {
						background: '{blue.600}',
					},
				}"
			>
				<div class="pr-3">
					<AuthenticatedUserMenuItem :menuItems="menuItems" />
				</div>
			</ScrollPanel>
		</div>
		<Divider></Divider>
		<AuthenticatedUserMenuItem :menuItems="userMenuItems" />
		<Button text class="text-700 mr-2 flex gap-2" pt:root:style="color: " @click="handleLogOut">
			<span class="text-slate-800 dark:text-white hover:text-red-600">
				<i class="pi pi-sign-out mr-3"></i>
				<span class="font-semibold">Log out</span>
			</span>
		</Button>
	</div>
	<div
		v-if="isSidebarVisible && isSmallScreen"
		class="fixed inset-0 bg-black bg-opacity-50 dark:opacity-80 z-10 transition-opacity"
		@click="closeSidebar"
	></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import AuthenticatedUserMenuItem from './AuthenticatedUserMenuItem.vue'
// import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '@/stores/layoutStore'

const router = useRouter()

// const authStore = useAuthStore()
const layoutStore = useLayoutStore()
const isSidebarVisible = computed(() => layoutStore.sideBar)

const isSmallScreen = computed(() => window.innerWidth < 1280)

if (window.innerWidth >= 1280) {
	layoutStore.sideBar = false
}

const updateScreenSize = () => {
	if (window.innerWidth >= 1280) {
		layoutStore.sideBar = true
	}
}

const handleLogOut = async () => {
	// await authStore.logout()
	router.push({ name: 'login' })
}

const closeSidebar = () => {
	layoutStore.sideBar = false
}

const menuItems = ref([
	{
		label: 'Home',
		route: { name: 'home' },
		icon: 'pi pi-home',
	},
	{
		label: 'Ticket',
		icon: 'pi pi-ticket',
		children: [
			{
				label: 'Dashboard',
				route: { name: 'user-ticket-management' },
			},
			{
				label: 'Create tickets',
				route: { name: 'user-create-ticket' },
			},
		],
	},
	{
		label: 'Knowledge Base',
		route: { name: 'knowledge-base' },
		icon: 'pi pi-home',
	},
])

const userMenuItems = ref([])

onMounted(() => {
	window.addEventListener('resize', updateScreenSize)
})

onUnmounted(() => {
	window.removeEventListener('resize', updateScreenSize)
})
</script>
