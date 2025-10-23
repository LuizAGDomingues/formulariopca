import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";

const VehicleUsageInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    responsavelVeiculo: "",
    veiculo: "",
    periodoReferencia: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.responsavelVeiculo || !formData.veiculo || !formData.periodoReferencia) {
      return;
    }

    sessionStorage.setItem("vehicleUsageInfo", JSON.stringify(formData));
    navigate("/controle-uso");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
            <Car className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Controle de Uso do Veículo</h1>
          <p className="text-muted-foreground">Montes Gallego Instalação de Ar Condicionado LTDA</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informações do Veículo</CardTitle>
            <CardDescription>
              Preencha os dados do veículo antes de registrar o uso
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="responsavelVeiculo">Responsável pelo Veículo *</Label>
                <Input
                  id="responsavelVeiculo"
                  placeholder="Nome do responsável pelo veículo"
                  value={formData.responsavelVeiculo}
                  onChange={(e) => setFormData({ ...formData, responsavelVeiculo: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="veiculo">Veículo *</Label>
                <Input
                  id="veiculo"
                  placeholder="Ex: SANDERO"
                  value={formData.veiculo}
                  onChange={(e) => setFormData({ ...formData, veiculo: e.target.value.toUpperCase() })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="periodoReferencia">Período de Referência *</Label>
                <Input
                  id="periodoReferencia"
                  placeholder="Ex: Janeiro/2024"
                  value={formData.periodoReferencia}
                  onChange={(e) => setFormData({ ...formData, periodoReferencia: e.target.value })}
                  required
                />
              </div>

              <Button type="submit" className="w-full" size="lg">
                Continuar para Registro de Uso
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleUsageInfo;
