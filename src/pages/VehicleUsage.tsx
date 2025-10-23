import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const VehicleUsage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [vehicleInfo, setVehicleInfo] = useState({
    responsavelVeiculo: "",
    veiculo: "",
    periodoReferencia: "",
  });

  const [formData, setFormData] = useState({
    data: new Date().toISOString().split('T')[0],
    nomeMotorista: "",
    horaSaida: "",
    horaRetorno: "",
    destinoFinalidade: "",
    kmInicial: "",
    kmFinal: "",
    observacoes: "",
    assinatura: "",
  });

  useEffect(() => {
    const storedInfo = sessionStorage.getItem("vehicleUsageInfo");
    if (!storedInfo) {
      navigate("/controle-uso-info");
      return;
    }
    setVehicleInfo(JSON.parse(storedInfo));
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("controle_uso_veiculo").insert({
        responsavel_veiculo: vehicleInfo.responsavelVeiculo,
        veiculo: vehicleInfo.veiculo,
        periodo_referencia: vehicleInfo.periodoReferencia,
        data: formData.data,
        nome_motorista: formData.nomeMotorista,
        hora_saida: formData.horaSaida,
        hora_retorno: formData.horaRetorno,
        destino_finalidade: formData.destinoFinalidade,
        km_inicial: parseFloat(formData.kmInicial),
        km_final: parseFloat(formData.kmFinal),
        observacoes: formData.observacoes,
        assinatura: formData.assinatura,
      });

      if (error) throw error;

      toast({
        title: "Registro salvo com sucesso!",
        description: "O controle de uso do veículo foi registrado.",
      });

      sessionStorage.removeItem("vehicleUsageInfo");
      navigate("/sucesso-uso");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o registro. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
            <Car className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Registro de Uso do Veículo</h1>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Veículo:</strong> {vehicleInfo.veiculo}</p>
            <p><strong>Responsável:</strong> {vehicleInfo.responsavelVeiculo}</p>
            <p><strong>Período:</strong> {vehicleInfo.periodoReferencia}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Dados da Utilização</CardTitle>
            <CardDescription>
              Preencha os dados de uso do veículo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
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
                  <Label htmlFor="nomeMotorista">Nome do Motorista *</Label>
                  <Input
                    id="nomeMotorista"
                    placeholder="Nome completo"
                    value={formData.nomeMotorista}
                    onChange={(e) => setFormData({ ...formData, nomeMotorista: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="horaSaida">Hora de Saída *</Label>
                  <Input
                    id="horaSaida"
                    type="time"
                    value={formData.horaSaida}
                    onChange={(e) => setFormData({ ...formData, horaSaida: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="horaRetorno">Hora de Retorno *</Label>
                  <Input
                    id="horaRetorno"
                    type="time"
                    value={formData.horaRetorno}
                    onChange={(e) => setFormData({ ...formData, horaRetorno: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destinoFinalidade">Destino / Finalidade do Serviço *</Label>
                <Textarea
                  id="destinoFinalidade"
                  placeholder="Descreva o destino e finalidade"
                  value={formData.destinoFinalidade}
                  onChange={(e) => setFormData({ ...formData, destinoFinalidade: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="kmInicial">KM Inicial *</Label>
                  <Input
                    id="kmInicial"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.kmInicial}
                    onChange={(e) => setFormData({ ...formData, kmInicial: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="kmFinal">KM Final *</Label>
                  <Input
                    id="kmFinal"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={formData.kmFinal}
                    onChange={(e) => setFormData({ ...formData, kmFinal: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea
                  id="observacoes"
                  placeholder="Observações adicionais (opcional)"
                  value={formData.observacoes}
                  onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assinatura">Assinatura (Nome completo) *</Label>
                <Input
                  id="assinatura"
                  placeholder="Digite seu nome completo"
                  value={formData.assinatura}
                  onChange={(e) => setFormData({ ...formData, assinatura: e.target.value })}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/")}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1" size="lg">
                  Salvar Registro
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleUsage;
