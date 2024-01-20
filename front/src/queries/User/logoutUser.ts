import { useMutation, useQueryClient } from 'react-query';
import { logoutResponseSchema } from '@/zod-schema/logout';
const apiUrl: string = import.meta.env.VITE_API_URL;
import { useToast } from '@/components/ui/shadcn-ui/toast/use-toast';
import { useNavigate } from 'react-router-dom';

export const logoutUserQuery = async () => {
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/user/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
	});
	const responseData = await res.json();
	if (res.ok) {
		return logoutResponseSchema.parse(responseData);
	} else {
		throw new Error(responseData.message || 'Logout failed');
	}
};

export const logoutUser = () => {
	const queryClient = useQueryClient();
	const navigate = useNavigate();
	const { toast } = useToast();
	return useMutation(logoutUserQuery, {
		onSuccess: (data) => {
			localStorage.removeItem('authToken');
			queryClient.clear();
			navigate('/sign-in');
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