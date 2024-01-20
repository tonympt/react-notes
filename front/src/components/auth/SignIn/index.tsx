import { 
	Form, 
	FormField, 
	FormItem, 
	FormLabel, 
	FormControl,
	FormMessage
} from '@/components/ui/shadcn-ui/form';
import AuthLayout from '../AuthLayout';
import { Button } from '@/components/ui/shadcn-ui/button';
import { Input } from '@/components/ui/shadcn-ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SignInSchema } from '@/zod-schema/auth';
import { Link } from 'react-router-dom';
import { signInRequestSchema } from '@/zod-schema/auth';
import { loginInUser } from '@/queries/User/loginUser';
import { ReloadIcon } from '@radix-ui/react-icons';

type signInRequestBody = z.infer<typeof signInRequestSchema>;

const SignIn = () => {
	const {mutate, isLoading} = loginInUser();

	const form = useForm<z.infer<typeof SignInSchema>>({
		resolver: zodResolver(SignInSchema),
		defaultValues: {
			email:'',
			password:'',
		},
	});
	const onSubmit = (body: signInRequestBody) => {
		const validatedBody = SignInSchema.parse(body);
		mutate(validatedBody);
	};
	
	return(
		<AuthLayout>
			<div className='flex flex-col justify-center items-center mb-5'>
				<h2 className='text-3xl font-semibold text-slate-750'> Welcome back</h2>
				<p className='text-slate-600'>your notes are waiting for you 🙂 !!!</p>
			</div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
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
					{'If you don\'t have an account?'}
				</h3>
				<Link className="text-blue-600 dark:text-blue-500 hover:underline" to="/sign-up">sign-up</Link>
			</div>
		</AuthLayout>
	);
};

export default SignIn;