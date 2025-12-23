import type { Actions } from './$types';
import { auth } from '$lib/auth';
import { APIError } from 'better-auth/api';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();

		const firstName = formData.get('firstname') as string;
		const lastName = formData.get('lastname') as string;
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;

		const fullName = `${firstName} ${lastName}`;

		try {
			const response = await auth.api.signUpEmail({
				body: {
					name: fullName,
					email,
					password
				},
				asResponse: true
			});

			switch (response.status) {
				case 422:
					return fail(422, {
						errorMessage: 'User already exists'
					});
				case 400:
					return fail(400, { errorMessage: 'Invalid email format or request.' });
			}

			const rawSetCookie = response.headers.get('set-cookie');
			if (!rawSetCookie) {
				console.warn('No Set-Cookie header received from signup response.');
			}

			const setCookieHeaders = rawSetCookie ? rawSetCookie.split(/,(?=\s*[^=]+=[^;]+)/) : [];

			for (const cookieHeader of setCookieHeaders) {
				const [nameValue, ...attributes] = cookieHeader.trim().split(';');
				const [name, value] = nameValue.split('=');

				if (name && value) {
					const cookieOptions: any = {
						path: '/',
						httpOnly: true,
						secure: process.env.NODE_ENV === 'production',
						sameSite: 'lax'
					};

					for (const attr of attributes) {
						const [key, val] = attr.trim().split('=');
						const lowerKey = key.toLowerCase();

						switch (lowerKey) {
							case 'path':
								cookieOptions.path = val || '/';
								break;
							case 'domain':
								cookieOptions.domain = val;
								break;
							case 'max-age':
								cookieOptions.maxAge = parseInt(val);
								break;
							case 'expires':
								cookieOptions.expires = new Date(val);
								break;
							case 'httponly':
								cookieOptions.httpOnly = true;
								break;
							case 'secure':
								cookieOptions.secure = true;
								break;
							case 'samesite':
								cookieOptions.sameSite = val as 'strict' | 'lax' | 'none';
								break;
						}
					}

					cookies.set(name.trim(), decodeURIComponent(value), cookieOptions);
				}
			}
		} catch (error) {
			console.error('Authentication error:', error);

			if (error instanceof APIError) {
				return fail(400, { errorMessage: error.message });
			}

			const message = error instanceof Error ? error.message : String(error);
			return fail(500, { errorMessage: `Authentication failed: ${message}` });
		}

		return redirect(302, '/');
	}
} satisfies Actions;
