import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Research from "./pages/Research";
import Admin from "./pages/Admin";
import { History } from "./pages/History";
import Videos from "./pages/Videos";
import Jobs from "./pages/Jobs";
import ToolsPage from "./pages/Tools";
import LatestUpdates from "./pages/LatestUpdates";
import NotFound from "./pages/NotFound";
import Learning from '@/pages/Learning';
import Profile from '@/pages/Profile';
import Decoded from '@/pages/Decoded';
import TransformersDeepDive from '@/pages/decoded/Transformers';
import DiffusionDeepDive from '@/pages/decoded/Diffusion';
import EmbeddingsDeepDive from '@/pages/decoded/Embeddings';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/updates" element={<LatestUpdates />} />
          <Route path="/research" element={<Research />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/history" element={<History />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/learning" element={<Learning />} />
          <Route path="/decoded" element={<Decoded />} />
          <Route path="/decoded/transformers" element={<TransformersDeepDive />} />
          <Route path="/decoded/diffusion" element={<DiffusionDeepDive />} />
          <Route path="/decoded/embeddings" element={<EmbeddingsDeepDive />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
