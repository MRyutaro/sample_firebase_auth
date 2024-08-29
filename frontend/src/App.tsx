// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Login from './pages/Login';
import Main from './pages/Index';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useAtom } from 'jotai';
import { userAtom } from './atoms/userAtom';

// デフォルトのテーマ設定
const theme = createTheme({
  palette: {
    mode: 'light',
  },
});

// 認証が必要なページのガード
function PrivateRoute() {
  const [user] = useAtom(userAtom);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* ログインページ */}
          <Route path="/login" element={<Login />} />

          {/* 認証が必要なページ */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Main />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
