import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Calendar, Car, User, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

type ChecklistRecord = {
  id: string;
  responsavel: string;
  data: string;
  placa_veiculo: string;
  condutor: string;
  created_at: string;
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
        .select("id, responsavel, data, placa_veiculo, condutor, created_at")
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
            <CardTitle className="text-2xl">Histórico de Checklists</CardTitle>
            <CardDescription>
              Últimos 20 checklists realizados
            </CardDescription>
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
