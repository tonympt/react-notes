import * as DialogPrimitive from '@radix-ui/react-dialog';
import CreateLabel from './CreateLabel';
import LabelUpdate from './LabelUpdate';
import { PiNotePencilDuotone } from 'react-icons/pi';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTrigger,
} from '@/components/ui/shadcn-ui/dialog';

import { useQueryClient } from 'react-query';
import { Separator } from '@/components/ui/shadcn-ui/separator';
import { LabelsType } from '@/type/labelsType';
import { PortalContext } from '@/context/context.portal';
import { useContext } from 'react';

export function LabelsForm() {
	const queryClient = useQueryClient();
	const labels: LabelsType[] | undefined  = queryClient.getQueryData(['labels']);
	const {isClose} = useContext(PortalContext);
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div 
					className={`flex items-center pl-2 cursor-pointer 
					${!isClose ? 'hover:bg-neutral-100 rounded-r-full' : ''}`}>
					<PiNotePencilDuotone 
						className={`h-12 w-12 p-3 text-neutral-800 
						${isClose ? 'hover:bg-neutral-100 rounded-full' : ''}`}/>
					{isClose ? '' : <p className='ml-6 text-neutral-800 text-sm w-56 font-medium'>Modify Labels</p>}
				</div>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[350px]">
				<DialogHeader>
					<p className='text-slate-950 font-medium'>Edit Labels</p>
				</DialogHeader>
				<CreateLabel/>
				{labels && labels.length > 0 
					? labels.map((label) => <LabelUpdate key={label._id} {...label} />) 
					: null}
				<Separator />
				<div className='flex justify-end py-1'>
					<DialogPrimitive.Close>
						<p className='text-slate-950 text-sm font-medium'>Cancel</p>
					</DialogPrimitive.Close>
				</div>
			</DialogContent>
		</Dialog>
	);
}
