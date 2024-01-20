import { useQuery, useQueryClient } from 'react-query';
import { useMutation } from 'react-query';
// properties to fetch
const apiUrl: string = import.meta.env.VITE_API_URL;

import { useToast } from '@/components/ui/shadcn-ui/toast/use-toast';
import { LabelsType } from '@/type/labelsType';

/* === GET ALL LABEL QUERY === */

export const getAllLabelsQuery = async () => {  
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/labels`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
	});
	const responseData = await res.json();
	const labels = responseData.labels;
	if (res.ok) {
		return labels;
	} else {
		throw new Error(responseData.message || 'Get all labels failed');
	}
};

export const getAllLabels = () => {
	const queryKey= ['labels'];
	return useQuery(queryKey, getAllLabelsQuery);
};

/* === CREATE LABEL QUERY === */

export const createLabelQuery = async (labelName: Omit<LabelsType, '_id'>) => {  
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/label`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify(labelName),
	});
	const responseData = await res.json();
	if (res.ok) {
		return responseData;
	} else {
		throw new Error(responseData.message || 'Create Label failed');
	}
};

export const createLabel = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	return useMutation(createLabelQuery, {
		onSuccess: (data) => {
			toast({
				description: data.message,
			});
			queryClient.invalidateQueries(['labels']);
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

/* === UPDATE LABEL QUERY === */

type updateLabelQuery = {
	labelId: string,
	body: {labelName: string}
}

export const updateLabelQuery = async ({labelId, body}: updateLabelQuery) => {
	const authToken = localStorage.getItem('authToken'); 	
	const res = await fetch(`${apiUrl}/label/${labelId}`, {
		method: 'PATCH',
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
		throw new Error(responseData.message || 'Updated failed');
	}
};

export const updateLabel = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	return useMutation(updateLabelQuery, {
		onSuccess: () => {			
			queryClient.invalidateQueries(['labels']);
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


/* === DELETE LABEL QUERY === */

export const deleteLabelQuery = async (labelId: LabelsType['_id']) => {
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/label/${labelId}`, {
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

export const deleteLabel = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	return useMutation(deleteLabelQuery, {
		onSuccess: (data) => {
			queryClient.invalidateQueries(['labels']);
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


/* === UPDATE LABEL ON NOTE QUERY === */

type updateLabelOnNoteQuery = {
	noteId: string,
	checkedLabels: string[],
}

export const updateLabelOnNoteQuery = async ({checkedLabels, noteId}: updateLabelOnNoteQuery) => {
	const authToken = localStorage.getItem('authToken');
	const res = await fetch(`${apiUrl}/notes/${noteId}/labels`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${authToken}`,
		},
		body: JSON.stringify(checkedLabels),
	});
	const responseData = await res.json();

	if (res.ok) {
		return responseData;
	} else {
		throw new Error(responseData.message || 'Updated failed');
	}
};

export const updateLabelOnNote = () => {
	const { toast } = useToast();
	const queryClient = useQueryClient();
	return useMutation(updateLabelOnNoteQuery, {
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
