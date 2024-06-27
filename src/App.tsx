import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { theme } from "./theme";
import { HomePage } from "./pages/Home.page";
import { Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/Landing.page";

export default function App() {
    return (
        <MantineProvider theme={theme} defaultColorScheme="dark">
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/blooming-quest" element={<HomePage />} />
            </Routes>
        </MantineProvider>
    );
}
