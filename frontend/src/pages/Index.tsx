import { useAtom } from 'jotai';
import { auth } from '../firebase';
import { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { Avatar, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { userAtom } from '../atoms/userAtom';

export default function Index(): JSX.Element {
    const [user] = useAtom<User | null>(userAtom);
    const navigate = useNavigate(); // useNavigateフックを使う
    console.log(user);
    
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('ログアウト中にエラーが発生しました:', error);
        }
    };

    return (
        <Container
            sx={{
                height: '100vh',
                border: 1,
            }}
        >
            <Typography variant="h1">メインページ</Typography>
            <Typography variant="body1">ログイン中のユーザー: {user?.displayName}</Typography>
            <Typography variant="body1">メールアドレス: {user?.email}</Typography>
            {/* アイコン */}
            {
                user?.photoURL && <Avatar src={user.photoURL} alt={user.displayName || ''} />
            }
            <Button variant="contained" onClick={handleLogout}>ログアウト</Button>
        </Container>
    );
}
