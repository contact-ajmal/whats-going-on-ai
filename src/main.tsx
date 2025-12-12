import { createRoot } from "react-dom/client";
import { ThemeProvider } from "next-themes";
import App from "./App.tsx";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")!).render(
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </ThemeProvider>
);
