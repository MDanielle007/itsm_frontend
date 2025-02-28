<template>
	<div class="min-h-screen flex">
		<!-- Left Side - Image -->
		<div class="hidden lg:block lg:w-1/2 relative">
			<img
				src="/images/login_bg.webp"
				alt="Login Background"
				class="absolute inset-0 h-full w-full object-cover object-left"
			/>
			<!-- Optional: Overlay text on the image -->
			<div
				class="absolute inset-0 bg-blue-900 bg-opacity-20 flex items-center justify-center"
			>
				<div class="text-white text-center p-8">
					<h1 class="text-4xl font-bold mb-4">Welcome Back</h1>
					<p class="text-xl">Your trusted platform for business management</p>
				</div>
			</div>
		</div>

		<!-- Right Side - Login Form -->
		<div
			class="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 sm:px-6 lg:px-8"
		>
			<div class="max-w-md w-full space-y-8">
				<!-- Company Branding -->
				<div class="text-center">
					<img
						class="mx-auto h-12 w-auto"
						src="/logo/mgen_2013_clear.png"
						alt="Company Logo"
					/>
					<h2
						class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100"
					>
						Sign in to Your Account
					</h2>
				</div>

				<!-- Error Alert -->
				<div
					v-if="error"
					class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
					role="alert"
				>
					<span class="block sm:inline">{{ error }}</span>
				</div>

				<!-- Login Form -->
				<form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
					<button
						type="button"
						@click="signInWithMicrosoft"
						class="w-full bg-gray-900 dark:bg-gray-100 dark:text-gray-900 text-white py-2 rounded-lg flex items-center justify-center"
					>
						<span class="mr-2"
							><svg
								width="32"
								height="32"
								viewBox="0 0 32 32"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path fill="#f24f21" d="M4 4h10.7v10.7H4z"></path>
								<path fill="#7fb900" d="M17.3 4H28v10.7H17.3z"></path>
								<path fill="#00a3ee" d="M4 17.3h10.7V28H4z"></path>
								<path fill="#ffb900" d="M17.3 17.3H28V28H17.3z"></path></svg
						></span>
						Sign in with Microsoft
					</button>
					<div class="flex items-center my-4">
						<hr class="flex-grow border-gray-300" />
						<span class="px-2 text-gray-500 dark:text-gray-300">or</span>
						<hr class="flex-grow border-gray-300" />
					</div>
					<div>
						<label class="block text-gray-700 dark:text-gray-400">Email address</label>
						<div class="relative flex items-center mt-1">
							<span class="absolute left-3 text-gray-500">📧</span>
							<input
								v-model="email"
								type="email"
								placeholder="name@company.com"
								class="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
							/>
						</div>
					</div>
					<div>
						<label class="block mt-4 text-gray-700 dark:text-gray-400">Password</label>
						<div class="relative flex items-center mt-1">
							<span class="absolute left-3 text-gray-500">🔒</span>
							<input
								v-model="password"
								type="password"
								placeholder="Enter your password"
								class="w-full pl-10 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
							/>
						</div>
					</div>
					<button
						type="submit"
						class="w-full mt-4 bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 py-2 rounded-lg"
					>
						Sign in
					</button>
				</form>

				<!-- Optional: Additional information -->
				<div class="text-center text-sm text-gray-600 dark:text-gray-300">
					<p>
						Having trouble signing in?
						<a href="#" class="text-blue-500">Contact Support</a>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const router = useRouter()
		const email = ref('')
		const password = ref('')
		const error = ref('')

		const signInWithMicrosoft = async () => {
			router.push({ name: 'home' })
		}

		const handleSubmit = () => {
			router.push({ name: 'home' })
		}

		return {
			email,
			password,
			error,
			signInWithMicrosoft,
			handleSubmit,
		}
	},
}
</script>
