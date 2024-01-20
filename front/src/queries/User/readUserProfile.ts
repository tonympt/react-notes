import { useQuery } from 'react-query';
import { readUserProfileResponseSchema } from '@/zod-schema/profile';
const apiUrl: string = import.meta.env.VITE_API_URL;
import { useToast } from '@/components/ui/shadcn-ui/toast/use-toast';

export const createUserAccountQuery = async () => {
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/user/me`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
	});
	const responseData = await res.json();
	if (res.ok) {
		return readUserProfileResponseSchema.parse(responseData);
	} else {
		throw new Error(responseData.message || 'Authentification failed');
	}
};

export const readUserProfile = () => {
	const { toast } = useToast();
	return useQuery(['user'], createUserAccountQuery, {
		refetchOnWindowFocus : false,
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