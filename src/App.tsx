import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ChecklistInfo from "./pages/ChecklistInfo";
import Checklist from "./pages/Checklist";
import Success from "./pages/Success";
import History from "./pages/History";
import VehicleUsageInfo from "./pages/VehicleUsageInfo";
import VehicleUsage from "./pages/VehicleUsage";
import VehicleUsageSuccess from "./pages/VehicleUsageSuccess";
import VehicleUsageHistory from "./pages/VehicleUsageHistory";
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
          <Route path="/info" element={<ChecklistInfo />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/sucesso" element={<Success />} />
          <Route path="/historico" element={<History />} />
          <Route path="/controle-uso-info" element={<VehicleUsageInfo />} />
          <Route path="/controle-uso" element={<VehicleUsage />} />
          <Route path="/sucesso-uso" element={<VehicleUsageSuccess />} />
          <Route path="/historico-uso" element={<VehicleUsageHistory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
