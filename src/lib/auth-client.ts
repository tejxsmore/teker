import { createAuthClient } from 'better-auth/svelte';

export const { signIn, signOut, useSession, resetPassword } = createAuthClient({
	baseURL: import.meta.env.BETTER_AUTH_URL as string
});
