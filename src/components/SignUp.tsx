import { hasLength, isEmail, isNotEmpty, useForm } from '@mantine/form';
import { Anchor, Button, Container, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../main';

export const SignUp = () => {
    const [createUserWithEmailAndPassword,
        user,
        loading,
        error
    ] = useCreateUserWithEmailAndPassword(auth)

    const navigate = useNavigate()
    const form = useForm({
        initialValues: {
            username: '',
            password: '',
            confirmPassword: ''
        },
        validate: {
            username: isNotEmpty('Username required') && isEmail('Invalid email'),
            password: isNotEmpty('Password required') && hasLength({ min: 6 }, 'Password must be at least 6 characters '),
            confirmPassword: (value: string, values: {
                password: string
            }) => (values.password === value ? null : "Passwords do not match")
        }
    })

    const signup = ({ username, password }: { username: string, password: string }) => {
        console.log({ username, password })
        createUserWithEmailAndPassword(username, password)
            .then(() => navigate('/userinfo'))

    }

    return (
        <Container size={420} my={40}>
            <Title align="center"> Sign in</Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Have an account?{' '}
                <Anchor size="sm" component="button">
                    <Link to="/login">
                        Sign in
                    </Link>
                </Anchor>
            </Text>

            <form onSubmit={form.onSubmit(signup)}>
                <TextInput label="Email" placeholder="you@mantine.dev"
                           {...form.getInputProps('username')}/>
                <PasswordInput label="Password" placeholder="Your password"
                               mt="md" {...form.getInputProps('password')}/>

                <PasswordInput label="Confirm password" placeholder="Repeat your password"
                               mt="md" {...form.getInputProps('confirmPassword')}/>
                <Button fullWidth mt="xl" type="submit" loading={loading}> Sign up</Button>
            </form>

            {error && 'Error while trying to create your account'}
        </Container>
    );

}


