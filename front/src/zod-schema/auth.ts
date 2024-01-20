import { z } from 'zod';

export const signUpRequestSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string(),
	password: z.string(),
	confirmPassword: z.string()
});

export const signUpResponseSchema = z.object({
	message: z.string(),
	authToken: z.string()
});

export const signInRequestSchema = z.object({
	email: z.string(),
	password: z.string(),
});

export const signInResponseSchema = z.object({
	authToken: z.string()
});

const passwordStrengthValidator = z.string().refine((password) => {
	const minLength = 8;
	const minLowercase = 1;
	const minUppercase = 1;
	const minNumbers = 1;
	const minSymbols = 1;
	const lowercaseReg = /[a-z]/g;
	const uppercaseReg = /[A-Z]/g;
	const numbersReg = /[0-9]/g;
	const symbolsReg = /[^a-zA-Z0-9]/g;
	return (
		password.length >= minLength &&
        (password.match(lowercaseReg) || []).length >= minLowercase &&
        (password.match(uppercaseReg) || []).length >= minUppercase &&
        (password.match(numbersReg) || []).length >= minNumbers &&
        (password.match(symbolsReg) || []).length >= minSymbols
	);
}, { message: 'Password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, one number, and one symbol.' });

export const SignUpSchema = z.object({
	firstName: z.string().min(1, {
		message: 'Firstname is required',
	}),
	lastName: z.string().min(1, {
		message: 'Lastname is required',
	}),
	email: z.string()
		.min(1, {message: 'Email is required'})
		.email({message: 'Invalid email'}),
	password: passwordStrengthValidator,
	confirmPassword: passwordStrengthValidator,
}).refine(data => data.password === data.confirmPassword, {
	message: 'Passwords must match',
	path:['confirmPassword']
});

export const SignInSchema = z.object({
	email: z.string()
		.min(1, {message: 'Email is required'})
		.email({message: 'Invalid email'}),
	password: passwordStrengthValidator,
});



