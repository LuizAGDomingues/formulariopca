import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, History, Snowflake } from "lucide-react";
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
            Sistema de Checklist
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gestão de inspeções semanais para veículos de serviço de refrigeração
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate("/info")}>
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <ClipboardCheck className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Novo Checklist</CardTitle>
              <CardDescription className="text-base">
                Iniciar uma nova inspeção semanal do veículo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" size="lg">
                Começar Inspeção
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-shadow cursor-pointer group" onClick={() => navigate("/historico")}>
            <CardHeader>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <History className="w-6 h-6 text-accent" />
              </div>
              <CardTitle className="text-2xl">Histórico</CardTitle>
              <CardDescription className="text-base">
                Visualizar checklists anteriores realizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" size="lg">
                Ver Histórico
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <Card className="bg-secondary/30 border-primary/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-3">Periodicidade da Inspeção</h3>
              <p className="text-muted-foreground mb-4">
                Os checklists devem ser realizados <strong>toda Segunda-feira e Sexta-feira</strong> para garantir a segurança e o bom funcionamento dos veículos.
              </p>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p>Limpeza e interior do veículo</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p>Equipamentos de segurança</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p>Motor e fluidos</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2" />
                  <p>Pneus e calibragem</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
