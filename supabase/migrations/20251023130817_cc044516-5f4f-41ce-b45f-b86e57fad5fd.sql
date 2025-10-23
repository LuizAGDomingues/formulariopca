-- Create table for vehicle usage control
CREATE TABLE public.controle_uso_veiculo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  responsavel_veiculo TEXT NOT NULL,
  veiculo TEXT NOT NULL,
  periodo_referencia TEXT NOT NULL,
  data DATE NOT NULL,
  nome_motorista TEXT NOT NULL,
  hora_saida TIME NOT NULL,
  hora_retorno TIME NOT NULL,
  destino_finalidade TEXT NOT NULL,
  km_inicial NUMERIC NOT NULL,
  km_final NUMERIC NOT NULL,
  observacoes TEXT,
  assinatura TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.controle_uso_veiculo ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Permitir leitura de todos os registros de uso" 
ON public.controle_uso_veiculo 
FOR SELECT 
USING (true);

CREATE POLICY "Permitir criação de registros de uso" 
ON public.controle_uso_veiculo 
FOR INSERT 
WITH CHECK (true);