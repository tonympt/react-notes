import { z } from 'zod';

const itemSchema = z.object({
	_id: z.string(),
	text: z.string(),
	isCompleted: z.boolean(),
});

const labelSchema = z.object({
	_id: z.string(),
	labelName: z.string(),
	isCompleted: z.boolean(),
	createdAt: z.string(),
	updatedAt: z.string(),
	__v: z.number(),
});

export const noteSchema = z.object({
	_id: z.string(),
	title: z.string(),
	color: z.string(),
	position: z.number(),
	isCheckBoxMode: z.boolean(),
	isPinned: z.boolean(),
	isArchived: z.boolean(),
	items: z.array(itemSchema),
	labels: z.array(labelSchema), 
	createdAt: z.string(),
	updatedAt: z.string(),
	__v: z.number(),
});

export const responseSimpleMessageSchema = z.object({
	message: z.string(),
});

export const responseGetAllNotesSchema = z.object({
	notes: z.array(noteSchema)
});

// TypeScript Types
export type ItemType = z.infer<typeof itemSchema>;
export type NoteType = z.infer<typeof noteSchema>;
export type NotesCacheType = {
    notes: NoteType[];
};
export type GetAllNotesResponse = z.infer<typeof responseGetAllNotesSchema>;