import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface OpenTrip {
  id: string;
  data: string;
  nome_motorista: string;
  hora_saida: string;
  km_inicial: number;
  destino_finalidade: string;
}

const VehicleUsage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const vehicleInfo = {
    responsavelVeiculo: "Rafael Guimarães",
    veiculo: "SANDERO",
    periodoReferencia: new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' }).toUpperCase(),
  };

  const [activeTab, setActiveTab] = useState("saida");
  const [openTrips, setOpenTrips] = useState<OpenTrip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<OpenTrip | null>(null);
  const [loadingTrips, setLoadingTrips] = useState(false);
  const retornoFormRef = useRef<HTMLFormElement>(null);

  const [saidaData, setSaidaData] = useState({
    data: new Date().toISOString().split('T')[0],
    nomeMotorista: "",
    horaSaida: "",
    destinoFinalidade: "",
    kmInicial: "",
  });

  const [retornoData, setRetornoData] = useState({
    data: new Date().toISOString().split('T')[0],
    nomeMotorista: "",
    horaRetorno: "",
    kmFinal: "",
    observacoes: "",
  });

  useEffect(() => {
    if (activeTab === "retorno") {
      loadOpenTrips();
    }
  }, [activeTab]);

  useEffect(() => {
    if (!selectedTrip) return;
    setTimeout(() => {
      retornoFormRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, [selectedTrip]);

  const loadOpenTrips = async () => {
    setLoadingTrips(true);
    try {
      const { data, error } = await supabase
        .from("controle_uso_veiculo")
        .select("id, data, nome_motorista, hora_saida, km_inicial, destino_finalidade")
        .eq("status", "em_andamento")
        .order("data", { ascending: false });

      if (error) throw error;
      setOpenTrips(data || []);
    } catch (error) {
      console.error("Erro ao carregar viagens:", error);
      toast({
        title: "Erro ao carregar",
        description: "Não foi possível carregar as viagens em andamento.",
        variant: "destructive",
      });
    } finally {
      setLoadingTrips(false);
    }
  };

  const handleSaidaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from("controle_uso_veiculo").insert({
        responsavel_veiculo: vehicleInfo.responsavelVeiculo,
        veiculo: vehicleInfo.veiculo,
        periodo_referencia: vehicleInfo.periodoReferencia,
        data: saidaData.data,
        nome_motorista: saidaData.nomeMotorista,
        hora_saida: saidaData.horaSaida,
        destino_finalidade: saidaData.destinoFinalidade,
        km_inicial: parseFloat(saidaData.kmInicial),
        status: "em_andamento",
      });

      if (error) throw error;

      toast({
        title: "Saída registrada!",
        description: "A saída do veículo foi registrada com sucesso.",
      });

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

  const handleRetornoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTrip) {
      toast({
        title: "Selecione uma viagem",
        description: "Por favor, selecione uma viagem em andamento para registrar o retorno.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("controle_uso_veiculo")
        .update({
          hora_retorno: retornoData.horaRetorno,
          km_final: parseFloat(retornoData.kmFinal),
          observacoes: retornoData.observacoes,
          status: "completo",
        })
        .eq("id", selectedTrip.id);

      if (error) throw error;

      toast({
        title: "Retorno registrado!",
        description: "O retorno do veículo foi registrado com sucesso.",
      });

      navigate("/sucesso-uso");
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o retorno. Tente novamente.",
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Controle de Uso do Veículo</h1>
          <div className="text-sm text-muted-foreground space-y-1">
            <p><strong>Veículo:</strong> {vehicleInfo.veiculo}</p>
            <p><strong>Responsável:</strong> {vehicleInfo.responsavelVeiculo}</p>
            <p><strong>Período:</strong> {vehicleInfo.periodoReferencia}</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Registro de Uso</CardTitle>
            <CardDescription>
              Registre a saída ou o retorno do veículo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="saida">Registrar Saída</TabsTrigger>
                <TabsTrigger value="retorno">Registrar Retorno</TabsTrigger>
              </TabsList>

              <TabsContent value="saida">
                <form onSubmit={handleSaidaSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="data-saida">Data *</Label>
                      <Input
                        id="data-saida"
                        type="date"
                        value={saidaData.data}
                        onChange={(e) => setSaidaData({ ...saidaData, data: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="motorista-saida">Nome do Motorista *</Label>
                      <Input
                        id="motorista-saida"
                        placeholder="Nome completo"
                        value={saidaData.nomeMotorista}
                        onChange={(e) => setSaidaData({ ...saidaData, nomeMotorista: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="hora-saida">Hora de Saída *</Label>
                      <Input
                        id="hora-saida"
                        type="time"
                        value={saidaData.horaSaida}
                        onChange={(e) => setSaidaData({ ...saidaData, horaSaida: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="km-inicial">KM Inicial *</Label>
                      <Input
                        id="km-inicial"
                        type="number"
                        step="0.1"
                        placeholder="0.0"
                        value={saidaData.kmInicial}
                        onChange={(e) => setSaidaData({ ...saidaData, kmInicial: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="destino">Destino / Finalidade do Serviço *</Label>
                    <Textarea
                      id="destino"
                      placeholder="Descreva o destino e finalidade"
                      value={saidaData.destinoFinalidade}
                      onChange={(e) => setSaidaData({ ...saidaData, destinoFinalidade: e.target.value })}
                      required
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/")}>
                      Cancelar
                    </Button>
                    <Button type="submit" className="flex-1" size="lg">
                      Registrar Saída
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="retorno">
                {loadingTrips ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Carregando viagens em andamento...
                  </div>
                ) : openTrips.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Não há viagens em andamento para registrar retorno.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {selectedTrip ? (
                      <>
                        <div className="rounded-lg border bg-accent/30 p-4 space-y-1">
                          <p className="text-sm font-medium text-muted-foreground">Registrando retorno para:</p>
                          <p className="font-semibold">{selectedTrip.nome_motorista}</p>
                          <p className="text-sm text-muted-foreground">
                            Saída: {new Date(selectedTrip.data + 'T00:00:00').toLocaleDateString('pt-BR')} às {selectedTrip.hora_saida} · KM Inicial: {selectedTrip.km_inicial}
                          </p>
                          <p className="text-sm text-muted-foreground">Destino: {selectedTrip.destino_finalidade}</p>
                          <Button type="button" variant="ghost" size="sm" className="mt-2 text-xs" onClick={() => setSelectedTrip(null)}>
                            ← Trocar viagem
                          </Button>
                        </div>

                        <form ref={retornoFormRef} onSubmit={handleRetornoSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="data-retorno">Data *</Label>
                              <Input id="data-retorno" type="date" value={retornoData.data} onChange={(e) => setRetornoData({ ...retornoData, data: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="motorista-retorno">Nome do Motorista *</Label>
                              <Input id="motorista-retorno" value={retornoData.nomeMotorista} onChange={(e) => setRetornoData({ ...retornoData, nomeMotorista: e.target.value })} required disabled className="bg-muted" />
                            </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="hora-retorno">Hora de Retorno *</Label>
                              <Input id="hora-retorno" type="time" value={retornoData.horaRetorno} onChange={(e) => setRetornoData({ ...retornoData, horaRetorno: e.target.value })} required />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="km-final">KM Final *</Label>
                              <Input id="km-final" type="number" step="0.1" placeholder="0.0" value={retornoData.kmFinal} onChange={(e) => setRetornoData({ ...retornoData, kmFinal: e.target.value })} required />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="observacoes">Observações</Label>
                            <Textarea id="observacoes" placeholder="Observações adicionais (opcional)" value={retornoData.observacoes} onChange={(e) => setRetornoData({ ...retornoData, observacoes: e.target.value })} rows={3} />
                          </div>
                          <div className="flex gap-4">
                            <Button type="button" variant="outline" className="flex-1" onClick={() => navigate("/")}>Cancelar</Button>
                            <Button type="submit" className="flex-1" size="lg">Registrar Retorno</Button>
                          </div>
                        </form>

                        {openTrips.filter((t) => t.id !== selectedTrip.id).length > 0 && (
                          <div className="space-y-3 pt-4 border-t">
                            <Label className="text-muted-foreground">Outros Retornos em Aberto</Label>
                            <div className="space-y-2">
                              {openTrips.filter((t) => t.id !== selectedTrip.id).map((trip) => (
                                <Card
                                  key={trip.id}
                                  className="cursor-pointer transition-colors hover:bg-accent/50"
                                  onClick={() => {
                                    setSelectedTrip(trip);
                                    setRetornoData((prev) => ({ ...prev, nomeMotorista: trip.nome_motorista, horaRetorno: "", kmFinal: "", observacoes: "" }));
                                  }}
                                >
                                  <CardContent className="p-3">
                                    <p className="font-semibold text-sm">{trip.nome_motorista}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {new Date(trip.data + 'T00:00:00').toLocaleDateString('pt-BR')} às {trip.hora_saida} · KM: {trip.km_inicial}
                                    </p>
                                  </CardContent>
                                </Card>
                              ))}
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Label>Selecione a Viagem</Label>
                        <div className="space-y-2">
                          {openTrips.map((trip) => (
                            <Card
                              key={trip.id}
                              className="cursor-pointer transition-colors hover:bg-accent/50"
                              onClick={() => {
                                setSelectedTrip(trip);
                                setRetornoData((prev) => ({ ...prev, nomeMotorista: trip.nome_motorista }));
                              }}
                            >
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="space-y-1">
                                    <p className="font-semibold">{trip.nome_motorista}</p>
                                    <p className="text-sm text-muted-foreground">
                                      Saída: {new Date(trip.data).toLocaleDateString('pt-BR')} às {trip.hora_saida}
                                    </p>
                                    <p className="text-sm text-muted-foreground">KM Inicial: {trip.km_inicial}</p>
                                    <p className="text-sm text-muted-foreground">Destino: {trip.destino_finalidade}</p>
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VehicleUsage;
