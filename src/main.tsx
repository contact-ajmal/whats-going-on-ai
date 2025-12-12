import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

import { CodeProtection } from "./components/CodeProtection";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <CodeProtection />
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
