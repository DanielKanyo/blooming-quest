import { Routes, Route, Outlet } from "react-router-dom";

import "@mantine/core/styles.css";

import { GamePage } from "./Pages/Game/GamePage";
import { HomePage } from "./Pages/HomePage";
import { LandingPage } from "./Pages/LandingPage";
import { SignUpPage } from "./Pages/SignUpPage";
import { UserPage } from "./Pages/UserPage";
import "./global.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<LandingPage />} />
                <Route path="sign-up" element={<SignUpPage />} />
                <Route path="home" element={<HomePage />}>
                    <Route index element={<GamePage />} />
                    <Route path="user" element={<UserPage />} />
                </Route>
            </Route>
        </Routes>
    );
}
