import { useMutation, useQueryClient } from 'react-query';
// validation queries

// api url
const apiUrl: string = import.meta.env.VITE_API_URL;
import { useToast } from '@/components/ui/shadcn-ui/toast/use-toast';
import { ItemType, NoteType } from '@/zod-schema/notes';

type addItemQueryType = {
	noteId: NoteType['_id'],
	body: {text : string, index?: number};
}

export const addItemQuery = async ({body, noteId}: addItemQueryType) => {  
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes/${noteId}/items`, {
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
		throw new Error(responseData.message || 'Sign-up failed');
	}
};

export const addItem = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	return useMutation(addItemQuery, {
		onSuccess: (data) => {
			const noteId = data.noteId;
			queryClient.invalidateQueries(['items', noteId]);
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

type updateItemType = {
	noteId: NoteType['_id'],
	itemId: ItemType['_id']
	datasToPatch: {propName: string, value: string}[]
}


export const updateItemQuery = async ({noteId, itemId, datasToPatch}: updateItemType) => {  
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes/${noteId}/items/${itemId}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify(datasToPatch),
	});
	const responseData = await res.json();
	if (res.ok) {
		return responseData;
	} else {
		throw new Error(responseData.message || 'Update failed');
	}
};

export const updateItem = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();

	return useMutation(updateItemQuery, {

		onError: (error) => {
			if (error instanceof Error) {
				toast({
					variant: 'destructive',
					title: 'Uh oh! Something went wrong.',
					description: error.message,
				});
			}
		},
		onSuccess: (_, { noteId }) => {
			queryClient.invalidateQueries(['items', noteId]);
			queryClient.invalidateQueries(['notes']);
		},
	});
};

type deleteItemType = Omit<updateItemType, 'datasToPatch'>;

export const deleteItemQuery = async ({noteId, itemId}: deleteItemType) => {  
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes/${noteId}/items/${itemId}`, {
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
		throw new Error(responseData.message || 'Delete failed');
	}
};

export const deleteItem = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	return useMutation(deleteItemQuery, {
		onSuccess: (_, { noteId }) => {
			queryClient.invalidateQueries(['items', noteId]);
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