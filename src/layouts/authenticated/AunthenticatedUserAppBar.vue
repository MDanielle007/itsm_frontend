<template>
	<div
		class="fixed top-0 left-0 right-0 z-50 w-screen h-14 bg-blue-800 text-white flex justify-between items-center px-4 gap-4 drop-shadow-sm"
	>
		<div class="flex gap-2 justify-center items-center">
			<i
				class="pi pi-bars hover:cursor-pointer"
				style="font-size: 2rem"
				@click="toggleSideBar"
			>
			</i>
			<Image src="/logo/itsm_logo.svg" alt="Image" width="120" />
		</div>
		<div class="flex gap-2 items-center">
			<ThemeSwitcher />
			<Avatar
				label="V"
				class="mr-2"
				size="medium"
				style="background-color: #ece9fc; color: #2a1261"
				shape="circle"
			/>
		</div>
	</div>
</template>
<script>
import ThemeSwitcher from '@/components/ThemeSwitcher.vue'
import { useLayoutStore } from '@/stores/layoutStore'
import usePageStore from '@/stores/pageStore'
import { mapActions, mapState } from 'pinia'

export default {
	components: {
		ThemeSwitcher,
	},
	computed: {
		...mapState(usePageStore, ['appBarTitle']),
	},
	methods: {
		...mapActions(useLayoutStore, ['toggleSideBar']),
	},
}
</script>
<style></style>
