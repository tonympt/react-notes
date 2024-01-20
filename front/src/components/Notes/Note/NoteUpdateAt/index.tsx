import { NoteType } from '@/zod-schema/notes';

const NoteUpdateAt = ({ updatedAt }: { updatedAt: NoteType['updatedAt'] }) => {
	const updatedDate = new Date(updatedAt);
	const formatDate = (date: Date) => {
		const today = new Date();
		const isToday = date.toDateString() === today.toDateString();
		if (isToday) {
			return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }).toLocaleLowerCase();
		} else {
			return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' }).toLocaleLowerCase();
		}
	};

	return (
		<p className="text-xs text-neutral-950 opacity-0 group-hover/notes:opacity-100 transition-opacity duration-300">{`Last edit: ${formatDate(updatedDate)}`}</p>
	);
};

export default NoteUpdateAt;