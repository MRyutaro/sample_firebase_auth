// src/App.tsx
import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { auth } from './firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { userAtom } from './atoms/userAtom';
import Login from './pages/Login';
import Main from './pages/Main';

export default function App(): JSX.Element {
  const [user, setUser] = useAtom<User | null>(userAtom);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // コンポーネントがアンマウントされた時にリスナーを解除
    return () => unsubscribe();
  }, [setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {user ? <Main /> : <Login />}
    </div>
  );
}
