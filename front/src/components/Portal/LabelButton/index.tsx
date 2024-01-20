import { PortalContext } from '@/context/context.portal';
import { LabelsType } from '@/type/labelsType';
import { useContext } from 'react';
import { MdLabelOutline } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const LabelButton = ({labelName}: {labelName : LabelsType['labelName']}) => {
	const {isClose} = useContext(PortalContext);
	
	return(
		<NavLink to={`/${labelName.toLocaleLowerCase()}`}>
			{({ isActive }) => (
				<div 
					className={`flex items-center pl-2 
					${!isActive && !isClose ? 'hover:bg-neutral-100 rounded-r-full' : ''} 
					${isActive && !isClose ? 'bg-amber-100 rounded-r-full' :''}`}>
					<MdLabelOutline 
						className={`h-12 w-12 p-3 text-neutral-800 
						${!isActive && isClose ? 'hover:bg-neutral-100 rounded-full' : ''}
						${isActive && isClose ? 'bg-amber-100 rounded-full' : ''}`}/>
					{!isClose && <h2 className={'ml-6 text-sm font-medium w-56 text-neutral-800'}>{labelName}</h2>}
				</div>
			)}
		</NavLink>
	);
};

export default LabelButton;

