import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';

import { cn } from '@/utils/ui.util';

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
	<AccordionPrimitive.Item
		ref={ref}
		className={cn(className)}
		{...props}
	/>
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Header className="flex group/accordion">
		<AccordionPrimitive.Trigger
			ref={ref}
			className={cn(
				'flex w-full gap-2 items-center mt-4 py-2 text-sm group-hover/accordion:text-neutral-900 text-neutral-500 font-normal transition-all [&[data-state=open]>svg]:rotate-180 border-t border-neutral-400',
				className
			)}
			{...props}
		>
			<ChevronDownIcon className="h-4 w-4 shrink-0 group-hover/accordion:text-neutral-900 text-neutral-500 text-muted-foreground transition-transform duration-200" />
			{children}
		</AccordionPrimitive.Trigger>
	</AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
	<AccordionPrimitive.Content
		ref={ref}
		className="overflow-hidden text-neutral-500 text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
		{...props}
	>
		<div className={cn('flex flex-col gap-1', className)}>{children}</div>
	</AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
