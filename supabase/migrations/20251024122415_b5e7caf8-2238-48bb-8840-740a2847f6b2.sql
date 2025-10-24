-- Adicionar campo status para controlar registros em andamento e completos
ALTER TABLE controle_uso_veiculo 
ADD COLUMN status text NOT NULL DEFAULT 'completo' CHECK (status IN ('em_andamento', 'completo'));

-- Tornar campos opcionais para permitir preenchimento em duas etapas
ALTER TABLE controle_uso_veiculo 
ALTER COLUMN hora_retorno DROP NOT NULL,
ALTER COLUMN km_final DROP NOT NULL;

-- Criar índice para buscar registros em andamento mais rapidamente
CREATE INDEX idx_controle_uso_status ON controle_uso_veiculo(status) WHERE status = 'em_andamento';