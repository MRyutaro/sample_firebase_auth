import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import { auth, googleAuthProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import { Button, Container, Typography, Box, Card } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useSetAtom } from 'jotai';
import { userAtom } from '../atoms/userAtom';

export default function Login(): JSX.Element {
    const [error, setError] = useState<string>('');
    const setUser = useSetAtom(userAtom);
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, googleAuthProvider);
            setUser(result.user);
            navigate('/'); // トップページにリダイレクト
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}
        >
            <Card
                sx={{
                    p: 3,
                    maxWidth: 400,
                    width: '100%',
                    boxShadow: 10,
                }}
            >
                <Typography variant="h4" gutterBottom>
                    ログイン
                </Typography>
                <Box
                    component="form"
                    noValidate
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <Button
                        variant="outlined"
                        fullWidth
                        startIcon={<GoogleIcon />}
                        onClick={handleGoogleLogin}
                    >
                        Googleでログイン
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </Box>
            </Card>
        </Container>
    );
}
