import { useAtom } from 'jotai';
import { auth } from '../firebase';
import { User } from 'firebase/auth';
import { signOut } from 'firebase/auth';
import { userAtom } from '../atoms/userAtom';


export default function Main(): JSX.Element {
    const [user] = useAtom<User | null>(userAtom);
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('ログアウト成功!');
        } catch (error) {
            console.error('ログアウト中にエラーが発生しました:', error);
        }
    };

    return (
        <div>
            <h1>メインページ</h1>
            <p>ログインしています</p>
            {user?.displayName && <p>こんにちは、{user.displayName}さん！</p>}
            <button onClick={handleLogout}>ログアウト</button>
        </div>
    );
}
