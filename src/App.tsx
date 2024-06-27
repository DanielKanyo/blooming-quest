import "@mantine/core/styles.css";
import { HomePage } from "./pages/Home.page";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/Landing.page";

export default function App() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    );
}
