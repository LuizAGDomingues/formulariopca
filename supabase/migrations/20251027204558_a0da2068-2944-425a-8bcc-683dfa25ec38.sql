-- Adicionar política RLS para permitir atualização de registros de uso
CREATE POLICY "Permitir atualização de registros de uso"
ON controle_uso_veiculo
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);