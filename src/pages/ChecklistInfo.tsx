import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Snowflake } from "lucide-react";

const ChecklistInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    responsavel: "",
    data: new Date().toISOString().split('T')[0],
    placaVeiculo: "",
    condutor: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação simples
    if (!formData.responsavel || !formData.data || !formData.placaVeiculo || !formData.condutor) {
      return;
    }

    // Armazenar dados no sessionStorage para usar na próxima tela
    sessionStorage.setItem("checklistInfo", JSON.stringify(formData));
    
    // Navegar para a tela do checklist
    navigate("/checklist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-4">
            <Snowflake className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Checklist Semanal de Frota</h1>
          <p className="text-muted-foreground">Carros de Serviços - Refrigeração</p>
          <p className="text-sm text-muted-foreground mt-2">
            Periodicidade: Segunda e Sexta-feira
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Responsável</CardTitle>
            <CardDescription>
              Preencha os dados antes de iniciar a inspeção
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável pela inspeção *</Label>
                <Input
                  id="responsavel"
                  placeholder="Nome completo do responsável"
                  value={formData.responsavel}
                  onChange={(e) => setFormData({ ...formData, responsavel: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="data">Data *</Label>
                <Input
                  id="data"
                  type="date"
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="placaVeiculo">Placa do veículo *</Label>
                <Input
                  id="placaVeiculo"
                  placeholder="ABC-1234"
                  value={formData.placaVeiculo}
                  onChange={(e) => setFormData({ ...formData, placaVeiculo: e.target.value.toUpperCase() })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="condutor">Condutor *</Label>
                <Input
                  id="condutor"
                  placeholder="Nome do condutor do veículo"
                  value={formData.condutor}
                  onChange={(e) => setFormData({ ...formData, condutor: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Iniciar Checklist
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChecklistInfo;
