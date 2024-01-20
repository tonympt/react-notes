import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { useState } from 'react';
import { EyeOpenIcon, EyeClosedIcon, CrossCircledIcon } from '@radix-ui/react-icons';

import {
	Controller,
	ControllerProps,
	FieldPath,
	FieldValues,
	FormProvider,
	useFormContext,
} from 'react-hook-form';

import { cn } from '@/utils/ui.util';
import { Label } from '@/components/ui/shadcn-ui/label';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> = {
  name: TName
}

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
		...props
	}: ControllerProps<TFieldValues, TName>) => {
	return (
		<FormFieldContext.Provider value={{ name: props.name }}>
			<Controller {...props} />
		</FormFieldContext.Provider>
	);
};

const useFormField = () => {
	const fieldContext = React.useContext(FormFieldContext);
	const itemContext = React.useContext(FormItemContext);
	const { getFieldState, formState } = useFormContext();

	const fieldState = getFieldState(fieldContext.name, formState);

	if (!fieldContext) {
		throw new Error('useFormField should be used within <FormField>');
	}

	const { id } = itemContext;

	return {
		id,
		name: fieldContext.name,
		formItemId: `${id}-form-item`,
		formDescriptionId: `${id}-form-item-description`,
		formMessageId: `${id}-form-item-message`,
		...fieldState,
	};
};

type FormItemContextValue = {
  id: string
}

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
	const id = React.useId();

	return (
		<FormItemContext.Provider value={{ id }}>
			<div ref={ref} className={cn('space-y-2', className)} {...props} />
		</FormItemContext.Provider>
	);
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ ...props }, ref) => {
	const { formItemId } = useFormField();

	return (
		<Label
			ref={ref}
			htmlFor={formItemId}
			{...props}
		/>
	);
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
	const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

	return (

		<Slot
			ref={ref}
			id={formItemId}
			className={cn(error && 'border-red-400')}
			aria-describedby={
				!error
					? `${formDescriptionId}`
					: `${formDescriptionId} ${formMessageId}`
			}
			aria-invalid={!!error}
			{...props}
		/>
	);
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
	const { formDescriptionId } = useFormField();

	return (
		<p
			ref={ref}
			id={formDescriptionId}
			className={cn('text-[0.8rem] text-muted-foreground', className)}
			{...props}
		/>
	);
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
	const { error, formMessageId } = useFormField();
	const body = error ? String(error?.message) : children;

	if (!body) {
		return null;
	}

	return (
		<p
			ref={ref}
			id={formMessageId}
			className={cn('text-[0.8rem] font-medium text-destructive', className)}
			{...props}
		>
			{body}
		</p>
	);
});
FormMessage.displayName = 'FormMessage';


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false);
		const { error } = useFormField();
		const inputType = type === 'password' && showPassword ? 'text' : type;

		const togglePasswordVisibility = (event: React.MouseEvent<HTMLButtonElement>) => {
			event.preventDefault();
			setShowPassword(!showPassword);
		};
	
		return (
			<div className={cn(
				'flex w-full justify-between items-center h-9 rounded-md border border-input bg-transparent text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
				className
			)}>
				<input
					className='bg-transparent w-full px-3 py-2'
					type={inputType}
					ref={ref}
					{...props}
				/>
				{error 
					? <CrossCircledIcon className=' h-5 w-5 m-1 text-destructive' />
					: null
				}
				{type === 'password' 
					? <span onClick={togglePasswordVisibility}>
						{showPassword 
							? <EyeOpenIcon className='m-2 h-5 w-5 text-slate-700' /> 
							: <EyeClosedIcon className='m-2 h-5 w-5 text-slate-700'/> 
						}
					</span> 
					: null
				}
			</div>
		);
	}
);
Input.displayName = 'Input';

export {
	useFormField,
	Form,
	FormItem,
	FormLabel,
	FormControl,
	FormDescription,
	FormMessage,
	FormField,
	Input,
};
