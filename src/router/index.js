import { createRouter, createWebHistory } from 'vue-router'
import AuthenticatedUserLayout from '@/layouts/authenticated/AuthenticatedUserLayout.vue'
import UserTicketManagement from '@/views/tickets/UserTicketManagement.vue'
import CreateTicketPage from '@/views/tickets/CreateTicketPage.vue'
import UserHomePage from '@/views/tickets/UserHomePage.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css' // Import styles
import LoginPage from '@/views/auth/LoginPage.vue'
import KnowledgeBasePage from '@/views/knowledge_based/KnowledgeBasePage.vue'
import TicketDetails from '@/views/tickets/TicketDetails.vue' // Import the new ticket details page
import UserManagement from '@/components/UserManagement.vue'

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
				{
					path: 'UserManagement',
					name: 'UserManagement',
					component: UserManagement,
				},
				// New route for viewing ticket details
				{
					path: 'tickets/:ticketId',
					name: 'ticket-details',
					component: TicketDetails,
					props: true, // Pass ticketId as a prop to the component
				},
			],
		},
	],
})

// Start NProgress loading bar before route change
router.beforeEach((to, from, next) => {
	NProgress.start()
	next()
})

// Stop NProgress loading bar after route change
router.afterEach(() => {
	NProgress.done()
})

export default router
