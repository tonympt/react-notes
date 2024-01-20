import { 
	Form, 
	FormField, 
	FormItem, 
	FormLabel, 
	FormControl,
	FormMessage
} from '@/components/ui/shadcn-ui/form';

// components
import AuthLayout from '../AuthLayout';
import { Button } from '@/components/ui/shadcn-ui/button';
import { Input } from '@/components/ui/shadcn-ui/form';
import { Link } from 'react-router-dom';
import { createUserAccount } from '@/queries/User/createUserAccount';
import { ReloadIcon } from '@radix-ui/react-icons';
// handle typing form
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpRequestSchema } from '@/zod-schema/auth';
import { SignUpSchema } from '@/zod-schema/auth';
// form method
import { useForm } from 'react-hook-form';

type SignUpRequestBody = z.infer<typeof signUpRequestSchema>;

const SignUp = () => {
	const { mutate, isLoading } = createUserAccount();
	const form = useForm<z.infer<typeof SignUpSchema>>({
		resolver: zodResolver(SignUpSchema),
		defaultValues: {
			firstName: '',
			lastName:'',
			email:'',
			password:'',
			confirmPassword:'',
		},
	});
	const onSubmit = (body: SignUpRequestBody) => {
		const validatedBody = signUpRequestSchema.parse(body);
		mutate(validatedBody);
	};

	return(			
		<AuthLayout>
			<div className='flex flex-col justify-center items-center mb-5'>
				<h2 className='text-3xl font-semibold text-slate-750'>Create your account</h2>
				<p className='text-slate-600'>Discover the react note experience 📝 !!! </p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
					<div className='flex gap-3'>
						<FormField
							control={form.control}
							name="firstName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Firstname</FormLabel>
									<FormControl>
										<Input className='bg-white' placeholder="Firstname*" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="lastName"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Lastname</FormLabel>
									<FormControl>
										<Input className='bg-white' placeholder="Lastname*" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input className='bg-white' placeholder="Email*" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										className='bg-white'
										type='password'
										placeholder="Enter your password*" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="confirmPassword"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Confirmation Password</FormLabel>
								<FormControl>
									<Input 
										className='bg-white'
										type='password'
										placeholder="Re-Enter Password*" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					{isLoading 
						? (<Button className='w-full' disabled>
							<ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
							Please wait
						</Button>)
						:(<Button className='w-full' type="submit">
						Continue
						</Button>)
					}
				</form>
			</Form>
			<div className='flex justify-center items-center text-slate-600 mt-5 gap-1'>
				<h3>
					{'Already have an account?'}
				</h3>
				<Link className="text-blue-600 dark:text-blue-500 hover:underline" to="/sign-in">sign-in</Link>
			</div>
		</AuthLayout>
	);
};

export default SignUp;