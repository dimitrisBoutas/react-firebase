import { Anchor, Button, Container, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { isEmail, isNotEmpty, useForm } from '@mantine/form';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../main';


export const Login = () => {
    const navigate = useNavigate()
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth)
    const form = useForm({
        initialValues: {
            username: '',
            password: ''
        },
        validate: {
            username: isNotEmpty() && isEmail('Invalid email'),
            password: isNotEmpty()
        }
    })

    const login = ({ username, password }: { username: string, password: string }) => {
        signInWithEmailAndPassword(username, password)
            .then(() => navigate("/userinfo"))
    }

    return (
        <Container size={420} my={40}>
            <Title align="center"> Sign in</Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                Do not have an account yet?{' '}
                <Anchor size="sm" component="button">
                    <Link to="/signup">
                        Create account
                    </Link>
                </Anchor>
            </Text>

            <form onSubmit={form.onSubmit(login)}>
                <TextInput label="Email" placeholder="you@mantine.dev"
                           required {...form.getInputProps('username')}/>
                <PasswordInput label="Password" placeholder="Your password" required
                               mt="md" {...form.getInputProps('password')}/>
                <Button fullWidth mt="xl" type="submit" loading={loading}> Sign in</Button>
            </form>
        </Container>
    );

}
