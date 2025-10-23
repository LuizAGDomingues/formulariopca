import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, Car, History, Snowflake } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 shadow-lg">
            <Snowflake className="w-10 h-10 text-primary-foreground" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Sistema de Gestão de Frota
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gestão completa de veículos de serviço de refrigeração
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-center mb-6">Escolha o formulário que deseja preencher</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate("/info")}>
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <ClipboardCheck className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Checklist Semanal</CardTitle>
                <CardDescription className="text-base">
                  Inspeção completa do veículo (Segunda e Sexta-feira)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  Iniciar Checklist
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate("/controle-uso")}>
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <Car className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-2xl">Controle de Uso</CardTitle>
                <CardDescription className="text-base">
                  Registro diário de utilização do veículo
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" size="lg">
                  Registrar Uso
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-center mb-6">Histórico e Consultas</h2>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate("/historico")}>
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                  <History className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-xl">Histórico de Checklists</CardTitle>
                <CardDescription className="text-base">
                  Visualizar inspeções anteriores realizadas
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="lg">
                  Ver Checklists
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate("/historico-uso")}>
              <CardHeader>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-success/20 transition-colors">
                  <History className="w-6 h-6 text-success" />
                </div>
                <CardTitle className="text-xl">Histórico de Uso</CardTitle>
                <CardDescription className="text-base">
                  Consultar registros de utilização anteriores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" size="lg">
                  Ver Registros
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
