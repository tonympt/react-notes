import { Card, CardHeader, CardTitle, CardDescription} from '@/components/ui/shadcn-ui/card';
import { Separator } from '@/components/ui/shadcn-ui/separator';
import { FaUserGear } from 'react-icons/fa6';
import { FaUserCheck } from 'react-icons/fa';
import { readUserProfile } from '@/queries/User/readUserProfile';
import { Skeleton } from '@/components/ui/shadcn-ui/skeleton';
import Logout from './Logout';
import { useState } from 'react';
import Settings from './Settings';

type ProfileCard = {
	showCard: boolean, 
	cardRef: React.RefObject<HTMLDivElement>,
	setDisableClickOutside: (value: boolean) => void
}

const ProfileCard = ({ showCard, cardRef, setDisableClickOutside }: ProfileCard) => {
	const { data: user, isLoading, isError } = readUserProfile();
	const [showSettingsAccount, setShowSettingsAccount] = useState(false);
	return(
		<div className="">
			{showCard && (
				<div ref={cardRef} className="absolute top-11 right-0 z-10">
					<Card>
						<CardHeader className='items-center'>
							<button onClick={()=> setShowSettingsAccount(!showSettingsAccount)}>
								{showSettingsAccount 
									? <FaUserCheck className='w-7 h-7 my-2'/> 
									: <FaUserGear className='w-7 h-7 my-2'/>}
							</button>
							{isError ? <p>Something went wrong !</p> : null}
							{isLoading ? 
								<>
									<Skeleton className="h-4 w-[100px]"/>
									<Skeleton className="h-4 w-[130px]"/>
								</>
								: 
								<>
									<CardTitle>{`Hello ${user?.firstName} !`}</CardTitle>
									<CardDescription>{`${user?.email}`}</CardDescription>
								</>
							}
						</CardHeader>
						<Settings showSettingsAccount={showSettingsAccount} setDisableClickOutside={setDisableClickOutside}/>
						<Separator/>
						<Logout /> 
					</Card>
				</div>
			)}
		</div>
	);
};

export default ProfileCard;