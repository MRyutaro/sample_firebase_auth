import { useState } from 'react';

import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';


export default function Login(): JSX.Element {
    const [error, setError] = useState('');

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            alert("ログイン成功!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <h2>Googleでログイン</h2>
            <button onClick={handleGoogleLogin}>Googleでログイン</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};
