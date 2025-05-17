
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clienti from "./pages/Clienti";
import DettaglioCliente from "./pages/DettaglioCliente";
import Progetti from "./pages/Progetti";
import DettaglioProgetto from "./pages/DettaglioProgetto";
import Calendario from "./pages/Calendario";
import BancaIdee from "./pages/BancaIdee";
import EmailViewer from "./pages/EmailViewer";
import OsservatorioWeb from "./pages/OsservatorioWeb";
import Team from "./pages/Team";
import Collaboratori from "./pages/Collaboratori";
import NotFound from "./pages/NotFound";
import { SidebarProvider } from "@/components/ui/sidebar";
import Layout from "./components/Layout";
import Impostazioni from "./pages/Impostazioni";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/clienti" element={<Clienti />} />
              <Route path="/clienti/:id" element={<DettaglioCliente />} />
              <Route path="/collaboratori" element={<Collaboratori />} />
              <Route path="/progetti" element={<Progetti />} />
              <Route path="/progetti/nuovo" element={<Progetti />} />
              <Route path="/progetti/:id" element={<DettaglioProgetto />} />
              <Route path="/calendario" element={<Calendario />} />
              <Route path="/idee" element={<BancaIdee />} />
              <Route path="/contenuti" element={<EmailViewer />} />
              <Route path="/osservatorio-web" element={<OsservatorioWeb />} />
              <Route path="/team" element={<Team />} />
              <Route path="/impostazioni" element={<Impostazioni />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </SidebarProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
