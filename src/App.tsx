
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
import RLHFDeepDive from '@/pages/decoded/RLHF';
import MoEDeepDive from '@/pages/decoded/MoE';
import LoRADeepDive from '@/pages/decoded/LoRA';
import DeepMind from '@/pages/DeepMind';
import YoungMinds from '@/pages/YoungMinds';
import Trending from '@/pages/Trending';
import AnthropicSkillsDeepDive from '@/pages/trending/AnthropicSkills';
import ContextGraphsDeepDive from '@/pages/trending/ContextGraphs';
import ClaudeSkills from '@/pages/ClaudeSkills';
import AgenticCrafting from '@/pages/trending/AgenticCrafting';
import NemotronCascade from '@/pages/trending/NemotronCascade';
import GeometryOfReason from '@/pages/trending/GeometryOfReason';
import NvidiaRubin from '@/pages/trending/NvidiaRubin';
import NvidiaAlpamayo from '@/pages/trending/NvidiaAlpamayo';
import Robotics from '@/pages/Robotics';
import BostonDynamicsDeepMind from '@/pages/robotics/BostonDynamicsDeepMind';
import AgenticAI from '@/pages/AgenticAI';
import { SharePlatformFab } from '@/components/SharePlatformFab';
import { HelmetProvider } from 'react-helmet-async';

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
          <Route path="/young-minds" element={<YoungMinds />} />
          <Route path="/decoded" element={<Decoded />} />
          <Route path="/decoded/transformers" element={<TransformersDeepDive />} />
          <Route path="/decoded/diffusion" element={<DiffusionDeepDive />} />
          <Route path="/decoded/embeddings" element={<EmbeddingsDeepDive />} />
          <Route path="/decoded/rlhf" element={<RLHFDeepDive />} />
          <Route path="/deepmind" element={<DeepMind />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/trending/anthropic-skills" element={<AnthropicSkillsDeepDive />} />
          <Route path="/trending/context-graphs" element={<ContextGraphsDeepDive />} />
          <Route path="/trending/agentic-crafting" element={<AgenticCrafting />} />
          <Route path="/trending/nemotron-cascade" element={<NemotronCascade />} />
          <Route path="/trending/geometry-of-reason" element={<GeometryOfReason />} />
          <Route path="/trending/nvidia-rubin" element={<NvidiaRubin />} />
          <Route path="/trending/nvidia-alpamayo" element={<NvidiaAlpamayo />} />
          <Route path="/robotics" element={<Robotics />} />
          <Route path="/robotics/boston-dynamics-deepmind" element={<BostonDynamicsDeepMind />} />
          <Route path="/agentic-ai" element={<AgenticAI />} />
          <Route path="/skills" element={<ClaudeSkills />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <SharePlatformFab />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
