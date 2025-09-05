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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      competitive_advantages: {
        Row: {
          advantage: string
          created_at: string
          id: string
          project_id: string
        }
        Insert: {
          advantage: string
          created_at?: string
          id?: string
          project_id: string
        }
        Update: {
          advantage?: string
          created_at?: string
          id?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "competitive_advantages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      financial_projections: {
        Row: {
          created_at: string
          id: string
          net_profit: number
          operating_expenses: number
          project_id: string
          revenue: number
          roi: number
          year: number
        }
        Insert: {
          created_at?: string
          id?: string
          net_profit: number
          operating_expenses: number
          project_id: string
          revenue: number
          roi: number
          year: number
        }
        Update: {
          created_at?: string
          id?: string
          net_profit?: number
          operating_expenses?: number
          project_id?: string
          revenue?: number
          roi?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "financial_projections_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      funding_breakdown: {
        Row: {
          amount: number
          category: string
          created_at: string
          id: string
          percentage: number
          project_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          id?: string
          percentage: number
          project_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          id?: string
          percentage?: number
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "funding_breakdown_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      investments: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          investment_type: string | null
          korapay_reference: string | null
          notes: string | null
          project_id: string | null
          reference: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          investment_type?: string | null
          korapay_reference?: string | null
          notes?: string | null
          project_id?: string | null
          reference: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          investment_type?: string | null
          korapay_reference?: string | null
          notes?: string | null
          project_id?: string | null
          reference?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "investments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          address: string | null
          created_at: string
          date_of_birth: string | null
          full_name: string | null
          id: string
          investment_preference: string | null
          phone: string | null
          total_invested: number | null
          total_profit: number | null
          updated_at: string
          user_id: string
          verification_status: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          investment_preference?: string | null
          phone?: string | null
          total_invested?: number | null
          total_profit?: number | null
          updated_at?: string
          user_id: string
          verification_status?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          date_of_birth?: string | null
          full_name?: string | null
          id?: string
          investment_preference?: string | null
          phone?: string | null
          total_invested?: number | null
          total_profit?: number | null
          updated_at?: string
          user_id?: string
          verification_status?: string | null
        }
        Relationships: []
      }
      project_details: {
        Row: {
          annual_return_range_max: number | null
          annual_return_range_min: number | null
          annual_revenue_projection_max: number | null
          annual_revenue_projection_min: number | null
          breakeven_point: string | null
          business_overview: string
          created_at: string
          equipment_investment: number | null
          executive_summary: string
          full_roi_period: string | null
          id: string
          market_opportunity: string
          monthly_revenue_potential_max: number | null
          monthly_revenue_potential_min: number | null
          name: string
          production_capacity: string | null
          selling_price: number | null
          total_funding_needed: number | null
          updated_at: string
        }
        Insert: {
          annual_return_range_max?: number | null
          annual_return_range_min?: number | null
          annual_revenue_projection_max?: number | null
          annual_revenue_projection_min?: number | null
          breakeven_point?: string | null
          business_overview: string
          created_at?: string
          equipment_investment?: number | null
          executive_summary: string
          full_roi_period?: string | null
          id: string
          market_opportunity: string
          monthly_revenue_potential_max?: number | null
          monthly_revenue_potential_min?: number | null
          name: string
          production_capacity?: string | null
          selling_price?: number | null
          total_funding_needed?: number | null
          updated_at?: string
        }
        Update: {
          annual_return_range_max?: number | null
          annual_return_range_min?: number | null
          annual_revenue_projection_max?: number | null
          annual_revenue_projection_min?: number | null
          breakeven_point?: string | null
          business_overview?: string
          created_at?: string
          equipment_investment?: number | null
          executive_summary?: string
          full_roi_period?: string | null
          id?: string
          market_opportunity?: string
          monthly_revenue_potential_max?: number | null
          monthly_revenue_potential_min?: number | null
          name?: string
          production_capacity?: string | null
          selling_price?: number | null
          total_funding_needed?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_details_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          created_at: string
          current_amount: number
          description: string
          id: string
          name: string
          status: string
          target_amount: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_amount?: number
          description: string
          id?: string
          name: string
          status?: string
          target_amount: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_amount?: number
          description?: string
          id?: string
          name?: string
          status?: string
          target_amount?: number
          updated_at?: string
        }
        Relationships: []
      }
      revenue_model: {
        Row: {
          created_at: string
          description: string
          id: string
          price_range_max: number
          price_range_min: number
          project_id: string
          type: string
        }
        Insert: {
          created_at?: string
          description: string
          id?: string
          price_range_max: number
          price_range_min: number
          project_id: string
          type: string
        }
        Update: {
          created_at?: string
          description?: string
          id?: string
          price_range_max?: number
          price_range_min?: number
          project_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "revenue_model_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      social_impact: {
        Row: {
          created_at: string
          id: string
          impact: string
          project_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          impact: string
          project_id: string
        }
        Update: {
          created_at?: string
          id?: string
          impact?: string
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_impact_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      assign_admin_role: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_project_amount: {
        Args: { amount_to_add: number; p_id: string }
        Returns: undefined
      }
      increment_total_invested: {
        Args: { amount_param: number; user_id_param: string }
        Returns: undefined
      }
      increment_user_total_invested: {
        Args: { amount_to_add: number; p_user_id: string }
        Returns: undefined
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
