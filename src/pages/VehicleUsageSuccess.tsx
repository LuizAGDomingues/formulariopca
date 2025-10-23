import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Car, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VehicleUsageSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="w-10 h-10 text-success" />
          </div>
          <CardTitle className="text-2xl">Registro Enviado com Sucesso!</CardTitle>
          <CardDescription>
            O controle de uso do veículo foi registrado no sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full" size="lg" onClick={() => navigate("/controle-uso-info")}>
            <Car className="w-4 h-4 mr-2" />
            Registrar Novo Uso
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={() => navigate("/historico-uso")}>
            <History className="w-4 h-4 mr-2" />
            Ver Histórico de Uso
          </Button>
          <Button variant="ghost" className="w-full" onClick={() => navigate("/")}>
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VehicleUsageSuccess;
