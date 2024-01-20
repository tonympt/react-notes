import { Outlet, Navigate } from 'react-router-dom';
import { useToast } from '../ui/shadcn-ui/toast/use-toast';

const PrivateRoutes = () => {
	const authToken =  localStorage.getItem('authToken');
	const {toast} = useToast();
	if (!authToken) {
		toast({
			variant: 'destructive',
			description: 'Please, log in to access the notes!',
		});
	}
	return(
		authToken ? <Outlet /> : <Navigate to='/sign-in' />
	);
};

export default PrivateRoutes;