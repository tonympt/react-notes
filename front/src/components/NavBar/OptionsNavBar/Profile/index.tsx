import { useState, useRef, useEffect } from 'react';
import ProfileCard from './ProfileCard';
import { FaRegUserCircle } from 'react-icons/fa';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';

const Profile = () => {
	const [showCard, setShowCard] = useState(false);
	const [disableClickOutside, setDisableClickOutside] = useState(false);
	const buttonRef = useRef<HTMLDivElement>(null);
	const cardRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (disableClickOutside) return;
		const target = event.target as HTMLElement;
		if (cardRef.current && !cardRef.current.contains(target) &&
			buttonRef.current && !buttonRef.current.contains(target)) {
			setShowCard(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [disableClickOutside, showCard]);

	return (
		<div className="relative">
			<div ref={buttonRef}>
				<AnimatedTooltipOption toolTipText='User Account' sideOffset={9} onClick={() => setShowCard(!showCard)}>
					<FaRegUserCircle className='w-6 h-6'/>
				</AnimatedTooltipOption>
			</div>
			<ProfileCard showCard={showCard} cardRef={cardRef} setDisableClickOutside={setDisableClickOutside}/>
		</div>
	);
};

export default Profile;