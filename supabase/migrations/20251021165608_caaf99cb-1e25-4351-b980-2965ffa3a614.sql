-- Criar tabela para armazenar os checklists
CREATE TABLE public.checklists (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  responsavel TEXT NOT NULL,
  data DATE NOT NULL,
  placa_veiculo TEXT NOT NULL,
  condutor TEXT NOT NULL,
  
  -- Limpeza e Interior
  limpeza_interna TEXT NOT NULL CHECK (limpeza_interna IN ('OK', 'Regular', 'Não OK')),
  limpeza_interna_obs TEXT,
  limpeza_externa TEXT NOT NULL CHECK (limpeza_externa IN ('OK', 'Regular', 'Não OK')),
  limpeza_externa_obs TEXT,
  bancos_estofamentos TEXT NOT NULL CHECK (bancos_estofamentos IN ('OK', 'Regular', 'Não OK')),
  bancos_estofamentos_obs TEXT,
  cintos_seguranca TEXT NOT NULL CHECK (cintos_seguranca IN ('OK', 'Regular', 'Não OK')),
  cintos_seguranca_obs TEXT,
  tapetes_acabamento TEXT NOT NULL CHECK (tapetes_acabamento IN ('OK', 'Regular', 'Não OK')),
  tapetes_acabamento_obs TEXT,
  
  -- Equipamentos de Segurança
  triangulo_sinalizacao TEXT NOT NULL CHECK (triangulo_sinalizacao IN ('OK', 'Regular', 'Não OK')),
  triangulo_sinalizacao_obs TEXT,
  macaco_chave_roda TEXT NOT NULL CHECK (macaco_chave_roda IN ('OK', 'Regular', 'Não OK')),
  macaco_chave_roda_obs TEXT,
  estepe TEXT NOT NULL CHECK (estepe IN ('OK', 'Regular', 'Não OK')),
  estepe_obs TEXT,
  
  -- Motor e Fluidos
  nivel_oleo_motor TEXT NOT NULL CHECK (nivel_oleo_motor IN ('OK', 'Regular', 'Não OK')),
  nivel_oleo_motor_obs TEXT,
  nivel_agua_radiador TEXT NOT NULL CHECK (nivel_agua_radiador IN ('OK', 'Regular', 'Não OK')),
  nivel_agua_radiador_obs TEXT,
  fluido_freio TEXT NOT NULL CHECK (fluido_freio IN ('OK', 'Regular', 'Não OK')),
  fluido_freio_obs TEXT,
  vazamentos_visiveis TEXT NOT NULL CHECK (vazamentos_visiveis IN ('OK', 'Regular', 'Não OK')),
  vazamentos_visiveis_obs TEXT,
  ruidos_anormais TEXT NOT NULL CHECK (ruidos_anormais IN ('OK', 'Regular', 'Não OK')),
  ruidos_anormais_obs TEXT,
  correias_mangueiras TEXT NOT NULL CHECK (correias_mangueiras IN ('OK', 'Regular', 'Não OK')),
  correias_mangueiras_obs TEXT,
  
  -- Pneus
  calibragem_pneus TEXT NOT NULL CHECK (calibragem_pneus IN ('OK', 'Regular', 'Não OK')),
  calibragem_pneus_obs TEXT,
  desgaste_banda TEXT NOT NULL CHECK (desgaste_banda IN ('OK', 'Regular', 'Não OK')),
  desgaste_banda_obs TEXT,
  alinhamento_balanceamento TEXT NOT NULL CHECK (alinhamento_balanceamento IN ('OK', 'Regular', 'Não OK')),
  alinhamento_balanceamento_obs TEXT,
  
  -- Observações adicionais
  observacoes_adicionais TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.checklists ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso (permite leitura e escrita para todos - ajuste conforme necessário)
CREATE POLICY "Permitir leitura de todos os checklists" 
ON public.checklists 
FOR SELECT 
USING (true);

CREATE POLICY "Permitir criação de checklists" 
ON public.checklists 
FOR INSERT 
WITH CHECK (true);

-- Índices para melhor performance
CREATE INDEX idx_checklists_data ON public.checklists(data DESC);
CREATE INDEX idx_checklists_placa ON public.checklists(placa_veiculo);
CREATE INDEX idx_checklists_responsavel ON public.checklists(responsavel);