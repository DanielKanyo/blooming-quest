import { HomePage } from "./Pages/HomePage";
import { Routes, Route, Outlet } from "react-router-dom";
import { LandingPage } from "./Pages/LandingPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { UserPage } from "./Pages/UserPage";
import { GameLayout } from "./Pages/GameLayout/GameLayout";

import "@mantine/core/styles.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<LandingPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route path="home" element={<HomePage />}>
                    <Route index element={<GameLayout />} />
                    <Route path="user" element={<UserPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
