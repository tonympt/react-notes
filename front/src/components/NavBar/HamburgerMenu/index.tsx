
import { PortalContext } from '@/context/context.portal';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { useContext } from 'react';

const HamburgerMenu = () => {
	const {toggleIsClose} = useContext(PortalContext);
	return(
		<AnimatedTooltipOption toolTipText='Main Menu' sideOffset={9} onClick={toggleIsClose}>
			<HamburgerMenuIcon className='w-6 h-6'/>
		</AnimatedTooltipOption>
	);
};

export default HamburgerMenu;


