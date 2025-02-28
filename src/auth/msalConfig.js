export const msalConfig = {
	auth: {
		clientId: 'YOUR_CLIENT_ID',
		authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
		redirectUri: 'YOUR_REDIRECT_URI',
	},
	cache: {
		cacheLocation: 'sessionStorage',
		storeAuthStateInCookie: false,
	},
}
