import { HomePage } from "./pages/Home.page";
import { Routes, Route, Outlet } from "react-router-dom";
import { LandingPage } from "./pages/Landing.page";
import { SignUpPage } from "./pages/SignUp.page";

import "@mantine/core/styles.css";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<Outlet />}>
                <Route index element={<LandingPage />} />
                <Route path="/sign-up" element={<SignUpPage />} />
                <Route path="/home" element={<HomePage />} />
            </Route>
        </Routes>
    );
}
