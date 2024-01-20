import { z } from 'zod';

export const readUserProfileResponseSchema = z.object({
	firstName: z.string(),
	email: z.string(),
});
