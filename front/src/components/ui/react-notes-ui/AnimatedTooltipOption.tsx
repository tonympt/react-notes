import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/shadcn-ui/tooltip';

type TooltipType = {
    children: React.ReactNode;
    toolTipText: string;
    delayDuration?: number;
    sideOffset?: number;
    onClick?: () => void;
    disabled?: boolean;
};

const AnimatedTooltipOption = ({ children, toolTipText, delayDuration = 100, sideOffset = 12, disabled, onClick}: TooltipType) => {
	return (
		<TooltipProvider delayDuration={delayDuration}>
			<Tooltip>
				<TooltipTrigger asChild>
					<span 
						onClick={onClick} 
						className={`${disabled ? 'cursor-auto' : 'cursor-pointer'} inline-flex items-center justify-center p-2 rounded-full text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 dark:text-[#99999B] dark:hover:text-[#E8EAED] dark:hover:bg-[#313236] duration-150`}
					>
						{children}
					</span>
				</TooltipTrigger>
				<TooltipContent className='text-sm z-50' sideOffset={sideOffset}>
					{toolTipText}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export default AnimatedTooltipOption;