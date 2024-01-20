import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useFormContext } from 'react-hook-form';
import { Badge } from '@/components/ui/shadcn-ui/badge';
import { LabelsType } from '@/type/labelsType';

const LabelContainer = () => {
	// state of selectedLabels
	const [selectedLabels, setSelectedLabels] = useState<LabelsType[] | null>([]);
	// state of cache labels (react queries)
	const queryClient = useQueryClient();
	const labelsOnCache: LabelsType[] = queryClient.getQueryData(['labels']) || [];
	// state of form context labels
	const {watch} = useFormContext();
	const labels: string[] = watch('labels');


	useEffect(() => {
		// Filter labelsOnCache to find matching labels
		const matchingLabels = labelsOnCache.filter(label => labels.includes(label._id));
		setSelectedLabels(matchingLabels);
	}, [labels]); 

	return(
		<div className='flex gap-1'>
			{selectedLabels && selectedLabels.length > 0 
				? selectedLabels.slice(0, 3).map((label) => 
					<Badge variant="secondary" key={label._id}>
						{label.labelName}
					</Badge>
				)
				: null
			}
			{selectedLabels && selectedLabels.length > 3 
				? <Badge variant="secondary"> 
					{`+ ${selectedLabels.length - 3}`}
				</Badge>
				: null
			}
		</div>
	);
};

export default LabelContainer;