import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft, CheckCircle, AlertCircle, XCircle, Snowflake } from "lucide-react";

type ChecklistItem = {
  field: string;
  label: string;
  obsField: string;
};

type ChecklistSection = {
  title: string;
  items: ChecklistItem[];
};

const checklistSections: ChecklistSection[] = [
  {
    title: "Limpeza e Interior",
    items: [
      { field: "limpeza_interna", label: "Limpeza interna", obsField: "limpeza_interna_obs" },
      { field: "limpeza_externa", label: "Limpeza externa", obsField: "limpeza_externa_obs" },
      { field: "bancos_estofamentos", label: "Bancos e estofamentos", obsField: "bancos_estofamentos_obs" },
      { field: "cintos_seguranca", label: "Cintos de segurança", obsField: "cintos_seguranca_obs" },
      { field: "tapetes_acabamento", label: "Tapetes e acabamento interno", obsField: "tapetes_acabamento_obs" },
    ],
  },
  {
    title: "Equipamentos de Segurança",
    items: [
      { field: "triangulo_sinalizacao", label: "Triângulo de sinalização", obsField: "triangulo_sinalizacao_obs" },
      { field: "macaco_chave_roda", label: "Macaco e chave de roda", obsField: "macaco_chave_roda_obs" },
      { field: "estepe", label: "Estepe (calibragem e estado)", obsField: "estepe_obs" },
    ],
  },
  {
    title: "Motor e Fluidos",
    items: [
      { field: "nivel_oleo_motor", label: "Nível de óleo do motor", obsField: "nivel_oleo_motor_obs" },
      { field: "nivel_agua_radiador", label: "Nível da água do radiador", obsField: "nivel_agua_radiador_obs" },
      { field: "fluido_freio", label: "Fluido de freio", obsField: "fluido_freio_obs" },
      { field: "vazamentos_visiveis", label: "Vazamentos visíveis", obsField: "vazamentos_visiveis_obs" },
      { field: "ruidos_anormais", label: "Ruídos anormais no motor", obsField: "ruidos_anormais_obs" },
      { field: "correias_mangueiras", label: "Correias e mangueiras", obsField: "correias_mangueiras_obs" },
    ],
  },
  {
    title: "Pneus",
    items: [
      { field: "calibragem_pneus", label: "Calibragem dos pneus", obsField: "calibragem_pneus_obs" },
      { field: "desgaste_banda", label: "Desgaste da banda de rodagem", obsField: "desgaste_banda_obs" },
      { field: "alinhamento_balanceamento", label: "Alinhamento e balanceamento", obsField: "alinhamento_balanceamento_obs" },
    ],
  },
];

const Checklist = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [observacoesAdicionais, setObservacoesAdicionais] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedInfo = sessionStorage.getItem("checklistInfo");
    if (!savedInfo) {
      navigate("/");
      return;
    }
    setInfo(JSON.parse(savedInfo));
  }, [navigate]);

  const handleStatusChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleObsChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "OK":
        return <CheckCircle className="w-5 h-5 text-success" />;
      case "Regular":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case "Não OK":
        return <XCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar que todos os campos obrigatórios estão preenchidos
    const allFieldsFilled = checklistSections.every(section =>
      section.items.every(item => formData[item.field])
    );

    if (!allFieldsFilled) {
      toast.error("Por favor, preencha todos os itens do checklist");
      return;
    }

    setIsSubmitting(true);

    try {
      const checklistData = {
        responsavel: info.responsavel,
        data: info.data,
        placa_veiculo: info.placaVeiculo,
        condutor: info.condutor,
        ...formData,
        observacoes_adicionais: observacoesAdicionais,
      };

      const { error } = await supabase
        .from("checklists")
        .insert([checklistData]);

      if (error) throw error;

      toast.success("Checklist enviado com sucesso!");
      sessionStorage.removeItem("checklistInfo");
      navigate("/sucesso");
    } catch (error) {
      console.error("Erro ao salvar checklist:", error);
      toast.error("Erro ao salvar checklist. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!info) return null;

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

        <div className="bg-card rounded-lg p-6 mb-6 shadow-sm border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <Snowflake className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Checklist Semanal</h1>
              <p className="text-sm text-muted-foreground">
                {info.responsavel} • {new Date(info.data + 'T00:00:00').toLocaleDateString('pt-BR')} • {info.placaVeiculo}
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {checklistSections.map((section, sectionIdx) => (
            <Card key={sectionIdx}>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>Avalie cada item e adicione observações se necessário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="space-y-3 pb-6 border-b last:border-0 last:pb-0">
                    <div className="flex items-center justify-between">
                      <Label className="text-base font-medium">{item.label}</Label>
                      {formData[item.field] && getStatusIcon(formData[item.field])}
                    </div>
                    
                    <RadioGroup
                      value={formData[item.field] || ""}
                      onValueChange={(value) => handleStatusChange(item.field, value)}
                      className="flex gap-4"
                      required
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="OK" id={`${item.field}-ok`} />
                        <Label htmlFor={`${item.field}-ok`} className="cursor-pointer">
                          OK
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Regular" id={`${item.field}-regular`} />
                        <Label htmlFor={`${item.field}-regular`} className="cursor-pointer">
                          Regular
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Não OK" id={`${item.field}-nao-ok`} />
                        <Label htmlFor={`${item.field}-nao-ok`} className="cursor-pointer">
                          Não OK
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData[item.field] && formData[item.field] !== "OK" && (
                      <Textarea
                        placeholder="Adicione observações sobre este item..."
                        value={formData[item.obsField] || ""}
                        onChange={(e) => handleObsChange(item.obsField, e.target.value)}
                        className="mt-2"
                      />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <Card>
            <CardHeader>
              <CardTitle>Observações Adicionais</CardTitle>
              <CardDescription>Comentários gerais sobre a inspeção</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Adicione observações gerais ou anotações adicionais..."
                value={observacoesAdicionais}
                onChange={(e) => setObservacoesAdicionais(e.target.value)}
                rows={4}
              />
            </CardContent>
          </Card>

          <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Finalizar e Enviar Checklist"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Checklist;
