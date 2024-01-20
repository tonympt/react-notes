import { CardFooter } from '@/components/ui/shadcn-ui/card';
import { Button } from '@/components/ui/shadcn-ui/button';
import { logoutUser } from '@/queries/User/logoutUser';
import { ReloadIcon } from '@radix-ui/react-icons';

const Logout = () => {
	const {mutate, isLoading} = logoutUser();
	const onClickLogout= () =>{
		mutate();
	}; 
	return(
		<CardFooter className='justify-center mt-5'>
			<Button onClick={onClickLogout} variant="outline">
				{isLoading ? <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> : null}
				Logout
			</Button>
		</CardFooter>
	);
};

export default Logout;