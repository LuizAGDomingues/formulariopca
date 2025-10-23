import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Car, User, FileText, Download } from "lucide-react";
import * as XLSX from 'xlsx';
import { useNavigate } from "react-router-dom";

type ChecklistRecord = {
  id: string;
  responsavel: string;
  data: string;
  placa_veiculo: string;
  condutor: string;
  created_at: string;
  limpeza_interna: string;
  limpeza_interna_obs: string | null;
  limpeza_externa: string;
  limpeza_externa_obs: string | null;
  bancos_estofamentos: string;
  bancos_estofamentos_obs: string | null;
  cintos_seguranca: string;
  cintos_seguranca_obs: string | null;
  tapetes_acabamento: string;
  tapetes_acabamento_obs: string | null;
  triangulo_sinalizacao: string;
  triangulo_sinalizacao_obs: string | null;
  macaco_chave_roda: string;
  macaco_chave_roda_obs: string | null;
  estepe: string;
  estepe_obs: string | null;
  nivel_oleo_motor: string;
  nivel_oleo_motor_obs: string | null;
  nivel_agua_radiador: string;
  nivel_agua_radiador_obs: string | null;
  fluido_freio: string;
  fluido_freio_obs: string | null;
  vazamentos_visiveis: string;
  vazamentos_visiveis_obs: string | null;
  ruidos_anormais: string;
  ruidos_anormais_obs: string | null;
  correias_mangueiras: string;
  correias_mangueiras_obs: string | null;
  calibragem_pneus: string;
  calibragem_pneus_obs: string | null;
  desgaste_banda: string;
  desgaste_banda_obs: string | null;
  alinhamento_balanceamento: string;
  alinhamento_balanceamento_obs: string | null;
  observacoes_adicionais: string | null;
};

const History = () => {
  const navigate = useNavigate();
  const [checklists, setChecklists] = useState<ChecklistRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    try {
      const { data, error } = await supabase
        .from("checklists")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setChecklists(data || []);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    } finally {
      setLoading(false);
    }
  };

  const exportToExcel = () => {
    if (checklists.length === 0) {
      return;
    }

    const exportData = checklists.map(checklist => ({
      'Data': new Date(checklist.data).toLocaleDateString('pt-BR'),
      'Responsável': checklist.responsavel,
      'Placa Veículo': checklist.placa_veiculo,
      'Condutor': checklist.condutor,
      'Limpeza Interna': checklist.limpeza_interna,
      'Obs. Limpeza Interna': checklist.limpeza_interna_obs || '',
      'Limpeza Externa': checklist.limpeza_externa,
      'Obs. Limpeza Externa': checklist.limpeza_externa_obs || '',
      'Bancos e Estofamentos': checklist.bancos_estofamentos,
      'Obs. Bancos': checklist.bancos_estofamentos_obs || '',
      'Cintos de Segurança': checklist.cintos_seguranca,
      'Obs. Cintos': checklist.cintos_seguranca_obs || '',
      'Tapetes e Acabamento': checklist.tapetes_acabamento,
      'Obs. Tapetes': checklist.tapetes_acabamento_obs || '',
      'Triângulo': checklist.triangulo_sinalizacao,
      'Obs. Triângulo': checklist.triangulo_sinalizacao_obs || '',
      'Macaco e Chave': checklist.macaco_chave_roda,
      'Obs. Macaco': checklist.macaco_chave_roda_obs || '',
      'Estepe': checklist.estepe,
      'Obs. Estepe': checklist.estepe_obs || '',
      'Nível Óleo': checklist.nivel_oleo_motor,
      'Obs. Óleo': checklist.nivel_oleo_motor_obs || '',
      'Água Radiador': checklist.nivel_agua_radiador,
      'Obs. Radiador': checklist.nivel_agua_radiador_obs || '',
      'Fluido Freio': checklist.fluido_freio,
      'Obs. Freio': checklist.fluido_freio_obs || '',
      'Vazamentos': checklist.vazamentos_visiveis,
      'Obs. Vazamentos': checklist.vazamentos_visiveis_obs || '',
      'Ruídos Anormais': checklist.ruidos_anormais,
      'Obs. Ruídos': checklist.ruidos_anormais_obs || '',
      'Correias e Mangueiras': checklist.correias_mangueiras,
      'Obs. Correias': checklist.correias_mangueiras_obs || '',
      'Calibragem Pneus': checklist.calibragem_pneus,
      'Obs. Calibragem': checklist.calibragem_pneus_obs || '',
      'Desgaste Banda': checklist.desgaste_banda,
      'Obs. Desgaste': checklist.desgaste_banda_obs || '',
      'Alinhamento/Balanceamento': checklist.alinhamento_balanceamento,
      'Obs. Alinhamento': checklist.alinhamento_balanceamento_obs || '',
      'Observações Adicionais': checklist.observacoes_adicionais || '',
      'Registrado em': new Date(checklist.created_at).toLocaleString('pt-BR'),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Checklists');
    
    const fileName = `checklists_${new Date().toLocaleDateString('pt-BR').replace(/\//g, '-')}.xlsm`;
    XLSX.writeFile(workbook, fileName, { bookType: 'xlsm' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl">Histórico de Checklists</CardTitle>
                <CardDescription>
                  Últimos 20 checklists realizados
                </CardDescription>
              </div>
              {checklists.length > 0 && (
                <Button onClick={exportToExcel} variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar
                </Button>
              )}
            </div>
          </CardHeader>
        </Card>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Carregando histórico...</p>
          </div>
        ) : checklists.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Nenhum checklist realizado ainda.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {checklists.map((checklist) => (
              <Card key={checklist.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Data da Inspeção</p>
                        <p className="font-medium">
                          {new Date(checklist.data).toLocaleDateString('pt-BR')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Placa do Veículo</p>
                        <p className="font-medium">{checklist.placa_veiculo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Responsável</p>
                        <p className="font-medium">{checklist.responsavel}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Condutor</p>
                        <p className="font-medium">{checklist.condutor}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <p className="text-xs text-muted-foreground">
                      Registrado em: {new Date(checklist.created_at).toLocaleString('pt-BR')}
                    </p>
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

export default History;
