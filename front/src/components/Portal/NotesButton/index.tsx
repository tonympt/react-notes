import { PortalContext } from '@/context/context.portal';
import { useContext } from 'react';
import { AiOutlineBulb } from 'react-icons/ai';
import { NavLink } from 'react-router-dom';
const NotesButton = () => {
	const { isClose } = useContext(PortalContext);


	return (
		<NavLink to='/notes'>
			{({ isActive }) => (
				<div 
					className={`flex items-center pl-2 
					${!isActive && !isClose ? 'hover:bg-neutral-100 rounded-r-full' : ''} 
					${isActive && !isClose ? 'bg-amber-100 rounded-r-full' :''}`}>
					<AiOutlineBulb 
						className={`h-12 w-12 p-3 text-neutral-800 
						${!isActive && isClose ? 'hover:bg-neutral-100 rounded-full' : ''}
						${isActive && isClose ? 'bg-amber-100 rounded-full' : ''}`}/>
					{!isClose && <p className={'ml-6 text-sm font-medium w-56 text-neutral-800'}>Notes</p>}
				</div>
			)}
		</NavLink>
	);
};

export default NotesButton;
