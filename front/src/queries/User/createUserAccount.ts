import { useMutation } from 'react-query';
// validation queries
import {z} from 'zod';
import { signUpRequestSchema } from '@/zod-schema/auth';
import { signUpResponseSchema } from '@/zod-schema/auth';

import { useNavigate } from 'react-router-dom';

type SignUpRequestBody = z.infer<typeof signUpRequestSchema>;

// api url
const apiUrl: string = import.meta.env.VITE_API_URL;
import { useToast } from '@/components/ui/shadcn-ui/toast/use-toast';

export const createUserAccountQuery = async (body: SignUpRequestBody) => {  
	const res = await fetch(`${apiUrl}/user/sign-up`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});
	const responseData = await res.json();
	if (res.ok) {
		return signUpResponseSchema.parse(responseData);
	} else {
		throw new Error(responseData.message || 'Sign-up failed');
	}
};

export const createUserAccount = () => {
	const navigate = useNavigate();
	const { toast } = useToast();
	return useMutation(createUserAccountQuery, {
		onSuccess: (data) => {
			localStorage.setItem('authToken', data.authToken);
			navigate('/notes');
			toast({
				description: data.message,
			});
			
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