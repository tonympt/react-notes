import { useQuery, useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
// properties to fetch
const apiUrl: string = import.meta.env.VITE_API_URL;

import { NoteType } from '@/zod-schema/notes';

import { useToast } from '@/components/ui/shadcn-ui/toast/use-toast';

import { FormValues } from '@/components/CreateNoteForm';

/* === GET ALL NOTE QUERY === */

export const getAllNotesQuery = async () => {  
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
	});
	const responseData = await res.json();
	const notes = responseData.notes;
	if (res.ok) {
		return notes;
	} else {
		throw new Error(responseData.message || 'Get all notes failed');
	}
};

export const getAllNotes = () => {
	const queryKey= ['notes'];
	return useQuery(queryKey, getAllNotesQuery);
};

/* === CREATE NOTE QUERY === */

export const createNoteQuery = async (body: FormValues | unknown) => { 
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify(body),
	});
	const responseData = await res.json();
	if (res.ok) {
		return responseData;
	} else {
		console.log(responseData);
		throw new Error(responseData.message || 'Create Note failed');
	}
};

export const createNote = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	return useMutation(createNoteQuery, {
		onSuccess: (data) => {
			toast({
				description: data.message,
			});
			queryClient.invalidateQueries(['notes']);
		},
		onError: (error) => {			
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: error.message,
				});
			}
		},
	});
};

/* === GET ALL ITEMS BY NOTE QUERY === */

export const getAllItemByNoteQuery = async (noteId : NoteType['_id']) => {  
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes/${noteId}/items`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
	});
	const responseData = await res.json();
	const items = responseData.items;
	
	if (res.ok) {
		return items;
	} else {
		throw new Error(responseData.message || 'Get all items failed');
	}
};

export const getAllItemByNote = (noteId: NoteType['_id']) => {
	const queryKey= ['items', noteId];
	return useQuery(queryKey, () => getAllItemByNoteQuery(noteId));
};


/* === UPDATE NOTE QUERY === */

type updateNoteQuery = {
	id: string,
	datasToPatch: {propName: string, value: string}[]
}

export const updateNoteQuery = async ({id, datasToPatch}: updateNoteQuery) => {
	const authToken = localStorage.getItem('authToken');  	
	const res = await fetch(`${apiUrl}/notes/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify(datasToPatch),
	});
	const responseData = await res.json();
	const note = responseData.note;

	if (res.ok) {
		return note;
	} else {
		throw new Error(responseData.message || 'Updated failed');
	}
};

export const updateNote = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	return useMutation(updateNoteQuery, {
		onSuccess: () => {			
			queryClient.invalidateQueries(['notes']);
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: error.message,
				});
			}
		},
	});
};


/* === SORTED NOTES QUERY === */


export const sortedNotPinnedNoteQuery = async (sortedNotes: NoteType[]) => {
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes/sorted`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify(sortedNotes),
	});
	const responseData = await res.json();
	
	if (res.ok) {
		return responseData;
	} else {
		throw new Error(responseData.message || 'Updated failed');
	}
};

export const sortedNotPinnedNote = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	return useMutation(sortedNotPinnedNoteQuery, {
		onSuccess: () => {			
			queryClient.invalidateQueries(['notes']);
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: error.message,
				});
			}
		},
	});
};


/* === DELETE NOTE QUERY === */

export const deleteNoteQuery = async (noteId: NoteType['_id']) => {
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes/${noteId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
	});
	const responseData = await res.json();
	if (res.ok) {
		return responseData;
	} else {
		throw new Error(responseData.message || 'Logout failed');
	}
};

export const deleteNote = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	return useMutation(deleteNoteQuery, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['notes']);
			toast({
				description: data.message,
			});
			
		},
		onError: (error) => {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: error.message,
				});
			}
		},
	});
};