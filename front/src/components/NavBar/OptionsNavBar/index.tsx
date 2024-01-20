import { TbLayoutList } from 'react-icons/tb';
import { LuLayoutGrid } from 'react-icons/lu';
import Profile from './Profile';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { useListMode } from '@/context/context.listMode';


const OptionNavBar = () => {
	const { toggleListMode, listMode } = useListMode();
	return(
		<div className="flex gap-2 justify-end md:mr-4">
			<div className='hidden md:block'>
				{listMode 
					? <AnimatedTooltipOption toolTipText='Grid Mode' sideOffset={9} onClick={()=> toggleListMode()}>
						<LuLayoutGrid className='w-6 h-6'/>
					</AnimatedTooltipOption> 
					: <AnimatedTooltipOption toolTipText='List Mode' sideOffset={9} onClick={()=> toggleListMode()}>
						<TbLayoutList className='w-6 h-6'/>
					</AnimatedTooltipOption>
				}
			</div>
			<Profile/>
		</div>
	);
};

export default OptionNavBar;