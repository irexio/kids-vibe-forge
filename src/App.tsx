import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import GettingStarted from "./pages/GettingStarted";
import Tools from "./pages/Tools";
import Glossary from "./pages/Glossary";
import Auth from "./pages/Auth";
import Community from "./pages/Community";
import CommunityProjects from "./pages/CommunityProjects";
import ShareProject from "./pages/ShareProject";
import Forums from "./pages/Forums";
import QA from "./pages/QA";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/getting-started" element={<GettingStarted />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/community" element={<Community />} />
          <Route path="/community/projects" element={<CommunityProjects />} />
          <Route path="/share-project" element={<ShareProject />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/qa" element={<QA />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
