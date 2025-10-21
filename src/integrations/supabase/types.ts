export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      checklists: {
        Row: {
          alinhamento_balanceamento: string
          alinhamento_balanceamento_obs: string | null
          bancos_estofamentos: string
          bancos_estofamentos_obs: string | null
          calibragem_pneus: string
          calibragem_pneus_obs: string | null
          cintos_seguranca: string
          cintos_seguranca_obs: string | null
          condutor: string
          correias_mangueiras: string
          correias_mangueiras_obs: string | null
          created_at: string
          data: string
          desgaste_banda: string
          desgaste_banda_obs: string | null
          estepe: string
          estepe_obs: string | null
          fluido_freio: string
          fluido_freio_obs: string | null
          id: string
          limpeza_externa: string
          limpeza_externa_obs: string | null
          limpeza_interna: string
          limpeza_interna_obs: string | null
          macaco_chave_roda: string
          macaco_chave_roda_obs: string | null
          nivel_agua_radiador: string
          nivel_agua_radiador_obs: string | null
          nivel_oleo_motor: string
          nivel_oleo_motor_obs: string | null
          observacoes_adicionais: string | null
          placa_veiculo: string
          responsavel: string
          ruidos_anormais: string
          ruidos_anormais_obs: string | null
          tapetes_acabamento: string
          tapetes_acabamento_obs: string | null
          triangulo_sinalizacao: string
          triangulo_sinalizacao_obs: string | null
          vazamentos_visiveis: string
          vazamentos_visiveis_obs: string | null
        }
        Insert: {
          alinhamento_balanceamento: string
          alinhamento_balanceamento_obs?: string | null
          bancos_estofamentos: string
          bancos_estofamentos_obs?: string | null
          calibragem_pneus: string
          calibragem_pneus_obs?: string | null
          cintos_seguranca: string
          cintos_seguranca_obs?: string | null
          condutor: string
          correias_mangueiras: string
          correias_mangueiras_obs?: string | null
          created_at?: string
          data: string
          desgaste_banda: string
          desgaste_banda_obs?: string | null
          estepe: string
          estepe_obs?: string | null
          fluido_freio: string
          fluido_freio_obs?: string | null
          id?: string
          limpeza_externa: string
          limpeza_externa_obs?: string | null
          limpeza_interna: string
          limpeza_interna_obs?: string | null
          macaco_chave_roda: string
          macaco_chave_roda_obs?: string | null
          nivel_agua_radiador: string
          nivel_agua_radiador_obs?: string | null
          nivel_oleo_motor: string
          nivel_oleo_motor_obs?: string | null
          observacoes_adicionais?: string | null
          placa_veiculo: string
          responsavel: string
          ruidos_anormais: string
          ruidos_anormais_obs?: string | null
          tapetes_acabamento: string
          tapetes_acabamento_obs?: string | null
          triangulo_sinalizacao: string
          triangulo_sinalizacao_obs?: string | null
          vazamentos_visiveis: string
          vazamentos_visiveis_obs?: string | null
        }
        Update: {
          alinhamento_balanceamento?: string
          alinhamento_balanceamento_obs?: string | null
          bancos_estofamentos?: string
          bancos_estofamentos_obs?: string | null
          calibragem_pneus?: string
          calibragem_pneus_obs?: string | null
          cintos_seguranca?: string
          cintos_seguranca_obs?: string | null
          condutor?: string
          correias_mangueiras?: string
          correias_mangueiras_obs?: string | null
          created_at?: string
          data?: string
          desgaste_banda?: string
          desgaste_banda_obs?: string | null
          estepe?: string
          estepe_obs?: string | null
          fluido_freio?: string
          fluido_freio_obs?: string | null
          id?: string
          limpeza_externa?: string
          limpeza_externa_obs?: string | null
          limpeza_interna?: string
          limpeza_interna_obs?: string | null
          macaco_chave_roda?: string
          macaco_chave_roda_obs?: string | null
          nivel_agua_radiador?: string
          nivel_agua_radiador_obs?: string | null
          nivel_oleo_motor?: string
          nivel_oleo_motor_obs?: string | null
          observacoes_adicionais?: string | null
          placa_veiculo?: string
          responsavel?: string
          ruidos_anormais?: string
          ruidos_anormais_obs?: string | null
          tapetes_acabamento?: string
          tapetes_acabamento_obs?: string | null
          triangulo_sinalizacao?: string
          triangulo_sinalizacao_obs?: string | null
          vazamentos_visiveis?: string
          vazamentos_visiveis_obs?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
