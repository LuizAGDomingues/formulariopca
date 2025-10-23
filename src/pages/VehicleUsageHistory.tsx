import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Car, ArrowLeft, Calendar, User, Clock, Navigation, Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface VehicleUsageRecord {
  id: string;
  responsavel_veiculo: string;
  veiculo: string;
  periodo_referencia: string;
  data: string;
  nome_motorista: string;
  hora_saida: string;
  hora_retorno: string;
  destino_finalidade: string;
  km_inicial: number;
  km_final: number;
  observacoes: string | null;
  assinatura: string;
  created_at: string;
}

const VehicleUsageHistory = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [records, setRecords] = useState<VehicleUsageRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      const { data, error } = await supabase
        .from("controle_uso_veiculo")
        .select("*")
        .order("data", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) throw error;
      setRecords(data || []);
    } catch (error) {
      console.error("Erro ao carregar registros:", error);
      toast({
        title: "Erro ao carregar histórico",
        description: "Não foi possível carregar os registros.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString + 'T00:00:00').toLocaleDateString('pt-BR');
  };

  const formatTime = (timeString: string) => {
    return timeString.substring(0, 5);
  };

  const calculateKmDiff = (initial: number, final: number) => {
    return (final - initial).toFixed(1);
  };

  const exportToExcel = () => {
    if (records.length === 0) {
      toast({
        title: "Nenhum registro para exportar",
        description: "Não há dados disponíveis para exportação.",
        variant: "destructive",
      });
      return;
    }

    const exportData = records.map(record => ({
      'Data': formatDate(record.data),
      'Veículo': record.veiculo,
      'Período': record.periodo_referencia,
      'Responsável': record.responsavel_veiculo,
      'Motorista': record.nome_motorista,
      'Hora Saída': formatTime(record.hora_saida),
      'Hora Retorno': formatTime(record.hora_retorno),
      'Destino/Finalidade': record.destino_finalidade,
      'KM Inicial': record.km_inicial,
      'KM Final': record.km_final,
      'KM Percorrido': calculateKmDiff(record.km_inicial, record.km_final),
      'Observações': record.observacoes || '',
      'Assinatura': record.assinatura,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Controle de Uso');
    
    const fileName = `controle_uso_veiculos_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsm`;
    XLSX.writeFile(workbook, fileName, { bookType: 'xlsm' });

    toast({
      title: "Exportação concluída",
      description: "O arquivo foi baixado com sucesso.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-full mb-4">
            <Car className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Histórico de Uso de Veículos</h1>
          <p className="text-muted-foreground">Consulte os registros de utilização dos veículos</p>
          
          {records.length > 0 && (
            <Button onClick={exportToExcel} className="mt-4" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar para Excel
            </Button>
          )}
        </div>

        {loading ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">Carregando registros...</p>
            </CardContent>
          </Card>
        ) : records.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <Car className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum registro de uso encontrado</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {records.map((record) => (
              <Card key={record.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Car className="w-5 h-5" />
                        {record.veiculo}
                      </CardTitle>
                      <CardDescription>
                        Período: {record.periodo_referencia}
                      </CardDescription>
                    </div>
                    <div className="text-right text-sm">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        {formatDate(record.data)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm font-medium">Motorista</p>
                          <p className="text-sm text-muted-foreground">{record.nome_motorista}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm font-medium">Responsável pelo Veículo</p>
                          <p className="text-sm text-muted-foreground">{record.responsavel_veiculo}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm font-medium">Horário</p>
                          <p className="text-sm text-muted-foreground">
                            Saída: {formatTime(record.hora_saida)} | Retorno: {formatTime(record.hora_retorno)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Navigation className="w-4 h-4 text-muted-foreground mt-1" />
                        <div>
                          <p className="text-sm font-medium">Destino / Finalidade</p>
                          <p className="text-sm text-muted-foreground">{record.destino_finalidade}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Quilometragem</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Inicial: {record.km_inicial} km</span>
                          <span>Final: {record.km_final} km</span>
                          <span className="font-medium text-primary">
                            Percorrido: {calculateKmDiff(record.km_inicial, record.km_final)} km
                          </span>
                        </div>
                      </div>
                      {record.observacoes && (
                        <div>
                          <p className="text-sm font-medium">Observações</p>
                          <p className="text-sm text-muted-foreground">{record.observacoes}</p>
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-medium">Assinatura</p>
                        <p className="text-sm text-muted-foreground italic">{record.assinatura}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default VehicleUsageHistory;
