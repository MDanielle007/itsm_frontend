import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedUserLayout from '@/layouts/authenticated/AuthenticatedUserLayout.vue'
import UserTicketManagement from '@/views/tickets/UserTicketManagement.vue'
import KnowledgeBasePage from '@/views/tickets/KnowledgeBasePage.vue'
import CreateTicketPage from '@/views/tickets/CreateTicketPage.vue'
import UserHomePage from '@/views/tickets/UserHomePage.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Import styles
import LoginPage from '@/views/auth/LoginPage.vue'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'login',
			component: LoginPage,
		},
		{
			path: '/app',
			component: AuthenticatedUserLayout,
			children: [
				{
					path: '',
					name: 'home',
					component: UserHomePage,
				},
				{
					path: 'tickets',
					name: 'user-ticket-management',
					component: UserTicketManagement,
				},
				{
					path: 'tickets/create',
					name: 'user-create-ticket',
					component: CreateTicketPage,
				},
				{
					path: 'knowledge',
					name: 'knowledge-base',
					component: KnowledgeBasePage,
				},
			],
		},
	],
})

router.beforeEach((to, from, next) => {
	NProgress.start() // Start loading bar
	next()
})

router.afterEach(() => {
	NProgress.done() // End loading bar
})

export default router
