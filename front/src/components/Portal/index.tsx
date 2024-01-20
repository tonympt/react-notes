import { getAllLabels } from '@/queries/Labels/labels';
import { LabelsForm } from './LabelsForm';
import LabelButton from './LabelButton';
import { ReloadIcon } from '@radix-ui/react-icons';
import { LabelsType } from '@/type/labelsType';
import { useContext } from 'react';
import { PortalContext } from '../../context/context.portal';
import NotesButton from './NotesButton';
import ArchivedButton from './ArchivedButton';

const Portal = () => {
	const {data, isLoading} = getAllLabels();
	const labels: LabelsType[] = data || [];
	const {isClose} = useContext(PortalContext);

	return(
		<nav className={`flex flex-col z-40 fixed left-0 top-[69px] h-full bottom-0 ${!isClose ? 'bg-white dark:bg-[#202124] border-r-1 shadow-[rgba(0,_0,_0,_0.24)_0px_4px_10px] md:border-none md:shadow-none' : ''}`}>
			<NotesButton />
			{!isLoading 
				?(labels.map((label) => <LabelButton key={label._id} {...label}/>)) 
				:<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
			}
			<LabelsForm />
			<ArchivedButton />
		</nav>
	);
};




export default Portal;