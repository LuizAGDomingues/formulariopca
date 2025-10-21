import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-success-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl">Checklist Enviado!</CardTitle>
          <CardDescription>
            Seu checklist foi salvo com sucesso no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-muted-foreground">
            Obrigado por preencher o checklist semanal. Os dados foram registrados e estão disponíveis para consulta.
          </p>
          <Button 
            onClick={() => navigate("/")} 
            className="w-full"
            size="lg"
          >
            <Home className="w-4 h-4 mr-2" />
            Voltar ao Início
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Success;
