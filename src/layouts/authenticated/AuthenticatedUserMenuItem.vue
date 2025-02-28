<template>
	<ul class="list-none p-0 m-0">
		<li v-for="(menuItem, index) in menuItems" :key="index">
			<!-- Primary Menu Links -->
			<router-link
				v-if="!menuItem.children"
				:to="menuItem.route"
				class="no-underline flex items-center cursor-pointer p-3 rounded-r-md text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
				activeClass="text-primary border-l-2 border-primary dark:text-blue-400 dark:border-l-2 dark:border-blue-400"
				exactActiveClass="text-primary border-l-2 border-primary dark:text-blue-400 dark:border-l-2 dark:border-blue-400"
			>
				<i :class="menuItem.icon + ' mr-3'"></i>
				<span class="font-semibold">{{ menuItem.label }}</span>
			</router-link>

			<!-- Expandable Menus -->
			<div v-else>
				<a
					@click="toggleMenu(index)"
					class="flex items-center cursor-pointer p-3 rounded-r-md text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-900 transition-colors"
				>
					<i :class="menuItem.icon + ' mr-3'"></i>
					<span class="font-semibold">{{ menuItem.label }}</span>
					<i
						class="pi pi-chevron-down ml-auto transition-transform"
						:class="{ 'rotate-180': openMenus.includes(index) }"
					></i>
				</a>

				<!-- Submenus with Slide Transition -->
				<transition
					name="slide-down"
					@before-enter="beforeEnter"
					@enter="enter"
					@leave="leave"
				>
					<ul
						v-show="openMenus.includes(index)"
						class="list-none py-1 pl-4 m-0 overflow-hidden"
					>
						<li v-for="(child, childIndex) in menuItem.children" :key="childIndex">
							<router-link
								:to="child.route"
								class="no-underline flex items-center cursor-pointer py-2 px-3 rounded-r-md text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
								activeClass="text-primary border-l-2 border-primary font-semibold dark:text-blue-400 dark:border-l-2 dark:border-blue-400"
								exactActiveClass="text-primary border-l-2 border-primary font-semibold dark:text-blue-400 dark:border-l-2 dark:border-blue-400"
							>
								<span>{{ child.label }}</span>
							</router-link>
						</li>
					</ul>
				</transition>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		menuItems: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			openMenus: [],
		}
	},
	methods: {
		toggleMenu(index) {
			if (this.openMenus.includes(index)) {
				this.openMenus = this.openMenus.filter((i) => i !== index)
			} else {
				this.openMenus.push(index)
			}
		},
		beforeEnter(el) {
			el.style.height = '0px'
		},
		enter(el) {
			el.style.height = el.scrollHeight + 'px'
			el.style.transition = 'height 0.3s ease-in-out'
		},
		leave(el) {
			el.style.height = el.scrollHeight + 'px'
			el.offsetHeight // Trigger reflow
			el.style.height = '0px'
			el.style.transition = 'height 0.3s ease-in-out'
		},
	},
}
</script>

<style>
/* Slide Down Transition */
.slide-down-enter-active,
.slide-down-leave-active {
	transition: height 0.3s ease-in-out;
}
.slide-down-enter-from,
.slide-down-leave-to {
	height: 0;
}
</style>
