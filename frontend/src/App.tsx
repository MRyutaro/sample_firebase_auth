import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userAtom } from './atoms/userAtom';
import Login from './pages/Login';
import Main from './pages/Main';

export default function App(): JSX.Element {
  const [user, setUser] = useAtom<User | null>(userAtom);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // コンポーネントがアンマウントされた時にリスナーを解除
    return () => unsubscribe();
  }, [setUser]);

  return (
    <div>
      {user ? <Main /> : <Login />}
    </div>
  );
}
