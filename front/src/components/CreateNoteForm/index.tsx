// React and Hook Imports
import { useForm, FormProvider } from 'react-hook-form';
import { useRef, useState, useEffect } from 'react';
// Component Imports
import TitleInput from './TitleInput';
import NoteListsInput from './NoteListsInput';
import OptionsMenu from './OptionMenu';
import NoteTextInput from './NoteTextInput';
import PinnedInput from './PinnedInput';
// Utility and Query Imports
import { createNote } from '@/queries/Notes/notes';
// UI Icon Imports
import LabelContainer from './LabelsContainer';
import Loader from '../ui/Loader';

export type FormValues = {
  title: string;
  color: string,
  isCheckBoxMode: boolean,
  isPinned: boolean,
  items: {
    text: string;
    isCompleted: boolean;
  }[];
  labels: [],
};

const CreateNoteForm = () => {
	// Refs and State Declarations
	const formRef = useRef<HTMLDivElement>(null);
	const [displayForm, setDisplayForm] = useState(false);
	// Form Initialization with React Hook Form
	const methods = useForm<FormValues>({
		defaultValues: {
			title: '',
			color:'bg-white',
			isCheckBoxMode: false,
			items: [{text: '', isCompleted: false}],
			isPinned: false,
			labels: [],
		}
	});

	// Query Management
	const { mutate, isLoading } = createNote();
	// Form State Management
	const { watch, reset, getValues } = methods;
	// Watchers for Form Values
	const colorBackground = watch('color');
	const isCheckBoxModeState = watch('isCheckBoxMode');
	
	// Form Validation Logic
	const isTitleOrItemsCompleted = () => {
		const values = getValues(['title', 'items']);
		// Check if title is not-empty
		const isTitleValid = values[0] && values[0].trim() !== '';
		// Check if at least one items.text is not-empty
		const isAtLeastOneItemValid = values[1].some(item => item.text.trim() !== '');
		// Final validation
		const isValid = isTitleValid || isAtLeastOneItemValid;
		return isValid;
	};
	
	const handleClickOutside = (event: MouseEvent) => {
		const target = event.target as HTMLElement;
		if(formRef.current && !formRef.current.contains(target) ){
			isSubmitted();
		}
	};

	// Form Submission Logic
	const isSubmitted = () => {
		if (isTitleOrItemsCompleted()) {
			methods.handleSubmit(onSubmit)();
			setDisplayForm(false);
		} else {
			setDisplayForm(false);
			reset();
		}
	};

	const onSubmit = (body: FormValues) => {	
		mutate(body);
		reset();
	};

	useEffect (()=>{
		document.addEventListener('mousedown', handleClickOutside);
		return () =>{
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	

	return (
		<FormProvider {...methods}>
			<form onSubmit={methods.handleSubmit(onSubmit)}>
				<div ref={formRef} 
					className={`border ${colorBackground} rounded-md w-72 md:w-96 mx-auto text-neutral-800 px-4 py-3 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]`}>
					{isLoading 
						? <Loader size='20'/>
						: (!displayForm 
							? <button type='button' onClick={() => setDisplayForm(true)}>Create a note ...</button> 
							: (
								<>
									<div className='flex items-center justify-center'>
										<TitleInput />
										<PinnedInput />
									</div>
                
									{isCheckBoxModeState 
										? <NoteListsInput/> 
										: <NoteTextInput/> }
									<LabelContainer/>
									<div className='grid grid-cols-2'>
										<div className='col-span-1'>
											<OptionsMenu />
										</div>
										<button type='button' 
											className='text-sm font-semibold col-span-1 place-self-end self-center'
											onClick={() => isSubmitted()}>
                                        CLOSE
										</button>
									</div>
								</>
							)
						)}
				</div>
			</form>
		</FormProvider>
	);
};

export default CreateNoteForm;
