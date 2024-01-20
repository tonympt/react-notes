import { useMutation } from 'react-query';
// validation queries
import {z} from 'zod';
import { signInRequestSchema } from '@/zod-schema/auth';
import { signInResponseSchema } from '@/zod-schema/auth';

import { useNavigate } from 'react-router-dom';
type SignUpRequestBody = z.infer<typeof signInRequestSchema>;

// api url
const apiUrl: string = import.meta.env.VITE_API_URL;
import { useToast } from '@/components/ui/shadcn-ui/toast/use-toast';

export const loginInUserQuery = async (body: SignUpRequestBody) => {  
	const res = await fetch(`${apiUrl}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const responseData = await res.json();
	if (res.ok) {
		return signInResponseSchema.parse(responseData);
	} else {
		throw new Error(responseData.message || 'Sign-In failed');
	}
};

export const loginInUser = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	return useMutation(loginInUserQuery, {
		onSuccess: (data) => {
			localStorage.setItem('authToken', data.authToken);
			navigate('/notes');
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: error.message,
				});
			}
		},
	});
};