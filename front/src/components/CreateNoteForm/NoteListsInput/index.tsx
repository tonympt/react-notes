import { Controller, useFormContext } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import AnimatedTooltipOption from '@/components/ui/react-notes-ui/AnimatedTooltipOption';
import { useFieldArray } from 'react-hook-form';
import { Checkbox } from '@/components/ui/shadcn-ui/checkbox';
import { PlusIcon } from '@radix-ui/react-icons';
import { useState } from 'react';
import { FormValues } from '..';
import { Cross1Icon } from '@radix-ui/react-icons';

const NoteListsInput = () => {
	const [textInput, setTextInput] = useState('');
	const { watch, register, setFocus,control } = useFormContext();
	const items = watch('items');

	const { fields, insert, remove, append } = useFieldArray({
		name: 'items',
		control
	});
	
	const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		const textItem = items[index]?.text;
		if (e.key === 'Enter') {
			e.preventDefault();
			const newItemIndex = index + 1;
			insert(newItemIndex, { text: '', isCompleted: false });
			setTimeout(() => {
				setFocus(`items.${newItemIndex}.text` as keyof FormValues);

			}, 20);
		} else if (e.key === 'Backspace' && textItem === '' && index > 0) {
			remove(index);
			const newItemFocus = index - 1;
			setTimeout(() => {
				setFocus(`items.${newItemFocus}.text` as keyof FormValues);

			}, 20);
		}
	};

	const handleCreateItemWithInput = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			append({ text: textInput, isCompleted: false });
			setTextInput('');
		}
	};


	return (
		<ul className="flex flex-col ">
			{fields.map((field, index) => (
				<li className="flex items-center group/items hover:border-y focus-within:border-y border-neutral-400" 
					key={field.id}>
					<Controller 
						control={control}
						name={`items[${index}].isCompleted` as keyof FormValues}
						render={({ field: { onChange, value, ref } }) => (
							<Checkbox
								onCheckedChange={onChange}
								checked={value}
								ref={ref}
							/>
						)}
					/>
					<TextareaAutosize
						onKeyDown={(e) => handleKeyDown(index, e)}
						rows={1}
						className='bg-transparent outline-none ml-2 py-1 w-full resize-none'
						{...register(`items[${index}].text` as keyof FormValues)} 
					/>
					<AnimatedTooltipOption toolTipText='Delete' sideOffset={4} onClick={()=> remove(index)}>
						<Cross1Icon className="opacity-0 group-focus-within/items:opacity-100 group-hover/items:opacity-100"/>
					</AnimatedTooltipOption>
				</li>
			))}
			<div className={'flex items-center w-full hover:border-y focus-within:border-y border-slate-300'}>
				<PlusIcon className='w-5 h-5 text-neutral-500'/> 
				<TextareaAutosize
					value={textInput}
					className='bg-transparent outline-none py-1 px-2 resize-none w-full'
					rows={1}
					onKeyDown={(e) => handleCreateItemWithInput(e)}
					onChange={(e)=> setTextInput(e.target.value)}
					placeholder='Press Enter to add task'
				/>
			</div>
		</ul>
	);
};

export default NoteListsInput;