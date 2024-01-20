import { NoteType } from '@/zod-schema/notes';

export const filterNotes = (notes: NoteType[], filter: string, textParams: string | undefined) => {  
	if (filter === 'searchQuery') {
		if(textParams === undefined) return [];
		return notes.filter(note =>
			note.title.toLowerCase().includes(textParams?.toLowerCase()) ||
            note.labels.some(label => label.labelName.toLowerCase().includes(textParams?.toLowerCase())) ||
            note.items.some(item => item.text.toLowerCase().includes(textParams?.toLowerCase()))
		);
	}
	if (filter === 'colors') { 
		return notes.filter(note => note.color === textParams);
	}
	if (filter === 'types') {
		return notes.filter(note => note.isCheckBoxMode === (textParams === 'lists'));
	}
	if (filter === 'labels') {
		if (textParams === undefined) return [];
		const lowerCaseTextParams = textParams.toLowerCase();
		return notes.filter(note => note.labels.some(label => label.labelName.toLowerCase().includes(lowerCaseTextParams)));
	}
	return [];
};
