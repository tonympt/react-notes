import { Button } from '@/components/ui/shadcn-ui/button';
import { Separator } from '@/components/ui/shadcn-ui/separator';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/shadcn-ui/alert-dialog/alert-dialog';
import { deleteAccount } from '@/queries/User/deleteAccount';
import { ReloadIcon } from '@radix-ui/react-icons';

type SettingsType = {
	showSettingsAccount: boolean, 
	setDisableClickOutside: (value: boolean) => void
}
const Settings = ({showSettingsAccount, setDisableClickOutside}: SettingsType) => {
	const handleOpenDialog = () => {
		setDisableClickOutside(true);
	};
	const handleCloseDialog = () => {
		setDisableClickOutside(false);
	};
	const { mutate, isLoading } = deleteAccount();	
	const handleClick = () => mutate();
	
	return(
		<div>
			{showSettingsAccount
				? <AlertDialog>
					<Separator/>
					<AlertDialogTrigger onClick={()=> handleOpenDialog()} asChild>
						{isLoading 
							? (<Button variant='destructive' className='mx-1 my-2' disabled>
								<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							Please wait
							</Button>)
							:(<Button variant='destructive' className='mx-1 my-2' type="submit">
						Delete Your Account
							</Button>)
						}
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader className='text-neutral-950'>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription className='text-neutral-800'>
        This action cannot be undone. This will permanently delete your account
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel onClick={handleCloseDialog}>Cancel</AlertDialogCancel>
							<AlertDialogAction className='bg-neutral-950' onClick={handleClick}>Continue</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
				: ''}
		</div>
	);
};

export default Settings;