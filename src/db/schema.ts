export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]
export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      api_tokens: {
        Row: {
          created_at: string
          expires_at: string | null
          id: string
          last_used_at: string | null
          name: string
          token: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_used_at?: string | null
          name: string
          token: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string | null
          id?: string
          last_used_at?: string | null
          name?: string
          token?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_tokens_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      artifacts: {
        Row: {
          content: string | null
          content_hash: string | null
          created_at: string
          group_id: string
          id: string
          metadata: Json | null
          name: string
          source: string
          tags: string[] | null
          type: string | null
          updated_at: string
        }
        Insert: {
          content?: string | null
          content_hash?: string | null
          created_at?: string
          group_id: string
          id?: string
          metadata?: Json | null
          name: string
          source: string
          tags?: string[] | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          content?: string | null
          content_hash?: string | null
          created_at?: string
          group_id?: string
          id?: string
          metadata?: Json | null
          name?: string
          source?: string
          tags?: string[] | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "artifacts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      buyer_personas: {
        Row: {
          blocker_risk: Database["public"]["Enums"]["risk_level"]
          category: Database["public"]["Enums"]["buyer_persona_category"] | null
          champion_potential: Database["public"]["Enums"]["risk_level"]
          common_titles: string
          concerns: string | null
          created_at: string
          department: Database["public"]["Enums"]["department"][] | null
          description: string | null
          first_meeting_goal: string | null
          group_id: string
          id: string
          name: string
          priorities: string | null
          role_in_buying_process: string | null
          seniority_level: Database["public"]["Enums"]["seniority_level"] | null
          success_metrics: string | null
          updated_at: string
        }
        Insert: {
          blocker_risk: Database["public"]["Enums"]["risk_level"]
          category?:
            | Database["public"]["Enums"]["buyer_persona_category"]
            | null
          champion_potential: Database["public"]["Enums"]["risk_level"]
          common_titles: string
          concerns?: string | null
          created_at?: string
          department?: Database["public"]["Enums"]["department"][] | null
          description?: string | null
          first_meeting_goal?: string | null
          group_id: string
          id?: string
          name: string
          priorities?: string | null
          role_in_buying_process?: string | null
          seniority_level?:
            | Database["public"]["Enums"]["seniority_level"]
            | null
          success_metrics?: string | null
          updated_at?: string
        }
        Update: {
          blocker_risk?: Database["public"]["Enums"]["risk_level"]
          category?:
            | Database["public"]["Enums"]["buyer_persona_category"]
            | null
          champion_potential?: Database["public"]["Enums"]["risk_level"]
          common_titles?: string
          concerns?: string | null
          created_at?: string
          department?: Database["public"]["Enums"]["department"][] | null
          description?: string | null
          first_meeting_goal?: string | null
          group_id?: string
          id?: string
          name?: string
          priorities?: string | null
          role_in_buying_process?: string | null
          seniority_level?:
            | Database["public"]["Enums"]["seniority_level"]
            | null
          success_metrics?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "buyer_personas_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      call_subscriptions: {
        Row: {
          call_id: string
          connection_id: string
          created_at: string
        }
        Insert: {
          call_id: string
          connection_id: string
          created_at?: string
        }
        Update: {
          call_id?: string
          connection_id?: string
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "call_subscriptions_call_id_fkey"
            columns: ["call_id"]
            isOneToOne: false
            referencedRelation: "calls"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "call_subscriptions_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "connections"
            referencedColumns: ["id"]
          },
        ]
      }
      calls: {
        Row: {
          artifact_id: string | null
          attended_contact_ids: string[]
          brief_artifact_id: string | null
          created_at: string
          deal_id: string | null
          end_time: string | null
          google_event_id: string | null
          group_id: string
          id: string
          invited_contact_ids: string[]
          metadata: Json | null
          name: string
          start_time: string | null
          status: string
          updated_at: string
        }
        Insert: {
          artifact_id?: string | null
          attended_contact_ids?: string[]
          brief_artifact_id?: string | null
          created_at?: string
          deal_id?: string | null
          end_time?: string | null
          google_event_id?: string | null
          group_id: string
          id?: string
          invited_contact_ids?: string[]
          metadata?: Json | null
          name?: string
          start_time?: string | null
          status: string
          updated_at?: string
        }
        Update: {
          artifact_id?: string | null
          attended_contact_ids?: string[]
          brief_artifact_id?: string | null
          created_at?: string
          deal_id?: string | null
          end_time?: string | null
          google_event_id?: string | null
          group_id?: string
          id?: string
          invited_contact_ids?: string[]
          metadata?: Json | null
          name?: string
          start_time?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "calls_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_brief_artifact_id_fkey"
            columns: ["brief_artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_deal_id_fkey"
            columns: ["deal_id"]
            isOneToOne: false
            referencedRelation: "deals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "calls_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string
          customer_profile_id: string | null
          domain: string
          group_id: string
          id: string
          metadata: Json | null
          name: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          customer_profile_id?: string | null
          domain: string
          group_id: string
          id?: string
          metadata?: Json | null
          name?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          customer_profile_id?: string | null
          domain?: string
          group_id?: string
          id?: string
          metadata?: Json | null
          name?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "companies_customer_profile_id_fkey"
            columns: ["customer_profile_id"]
            isOneToOne: false
            referencedRelation: "customer_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "companies_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      connections: {
        Row: {
          created_at: string
          id: string
          is_encrypted: boolean
          metadata: Json | null
          profile_id: string
          provider: string
          provider_refresh_token: string
          provider_refresh_token_encrypted: string | null
          provider_token: string
          provider_token_encrypted: string | null
          token_expiry: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_encrypted?: boolean
          metadata?: Json | null
          profile_id: string
          provider: string
          provider_refresh_token: string
          provider_refresh_token_encrypted?: string | null
          provider_token: string
          provider_token_encrypted?: string | null
          token_expiry: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          is_encrypted?: boolean
          metadata?: Json | null
          profile_id?: string
          provider?: string
          provider_refresh_token?: string
          provider_refresh_token_encrypted?: string | null
          provider_token?: string
          provider_token_encrypted?: string | null
          token_expiry?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "connections_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contacts: {
        Row: {
          buyer_persona_id: string | null
          company_id: string | null
          created_at: string
          email: string
          group_id: string
          id: string
          linkedin_url: string | null
          metadata: Json | null
          name: string
          profile_id: string | null
          role: Database["public"]["Enums"]["contact_role"]
          subroles: Database["public"]["Enums"]["subrole"][] | null
          updated_at: string
        }
        Insert: {
          buyer_persona_id?: string | null
          company_id?: string | null
          created_at?: string
          email: string
          group_id: string
          id?: string
          linkedin_url?: string | null
          metadata?: Json | null
          name: string
          profile_id?: string | null
          role: Database["public"]["Enums"]["contact_role"]
          subroles?: Database["public"]["Enums"]["subrole"][] | null
          updated_at?: string
        }
        Update: {
          buyer_persona_id?: string | null
          company_id?: string | null
          created_at?: string
          email?: string
          group_id?: string
          id?: string
          linkedin_url?: string | null
          metadata?: Json | null
          name?: string
          profile_id?: string | null
          role?: Database["public"]["Enums"]["contact_role"]
          subroles?: Database["public"]["Enums"]["subrole"][] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "contacts_buyer_persona_id_fkey"
            columns: ["buyer_persona_id"]
            isOneToOne: false
            referencedRelation: "buyer_personas"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "contacts_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      customer_profiles: {
        Row: {
          budget_range: string | null
          category:
            | Database["public"]["Enums"]["customer_profile_category"]
            | null
          created_at: string
          description: string | null
          geography: Database["public"]["Enums"]["geography_region"] | null
          group_id: string
          id: string
          industries: string | null
          name: string
          pain_points: string | null
          revenue: Database["public"]["Enums"]["revenue_range"] | null
          stage: Database["public"]["Enums"]["stage"][] | null
          tech_stack: string | null
          updated_at: string
          urgency_drivers: string | null
          use_cases: string | null
        }
        Insert: {
          budget_range?: string | null
          category?:
            | Database["public"]["Enums"]["customer_profile_category"]
            | null
          created_at?: string
          description?: string | null
          geography?: Database["public"]["Enums"]["geography_region"] | null
          group_id: string
          id?: string
          industries?: string | null
          name: string
          pain_points?: string | null
          revenue?: Database["public"]["Enums"]["revenue_range"] | null
          stage?: Database["public"]["Enums"]["stage"][] | null
          tech_stack?: string | null
          updated_at?: string
          urgency_drivers?: string | null
          use_cases?: string | null
        }
        Update: {
          budget_range?: string | null
          category?:
            | Database["public"]["Enums"]["customer_profile_category"]
            | null
          created_at?: string
          description?: string | null
          geography?: Database["public"]["Enums"]["geography_region"] | null
          group_id?: string
          id?: string
          industries?: string | null
          name?: string
          pain_points?: string | null
          revenue?: Database["public"]["Enums"]["revenue_range"] | null
          stage?: Database["public"]["Enums"]["stage"][] | null
          tech_stack?: string | null
          updated_at?: string
          urgency_drivers?: string | null
          use_cases?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customer_profiles_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      deal_stages: {
        Row: {
          created_at: string
          group_id: string
          id: string
          name: string
          position: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          name: string
          position: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          name?: string
          position?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deal_stages_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      deals: {
        Row: {
          close_date: string | null
          closed_reason: string | null
          company_id: string
          created_at: string
          group_id: string
          id: string
          metadata: Json | null
          name: string
          owner_id: string | null
          primary_contact_id: string | null
          stage_id: string
          status: Database["public"]["Enums"]["deal_status"]
          updated_at: string
        }
        Insert: {
          close_date?: string | null
          closed_reason?: string | null
          company_id: string
          created_at?: string
          group_id: string
          id?: string
          metadata?: Json | null
          name: string
          owner_id?: string | null
          primary_contact_id?: string | null
          stage_id: string
          status?: Database["public"]["Enums"]["deal_status"]
          updated_at?: string
        }
        Update: {
          close_date?: string | null
          closed_reason?: string | null
          company_id?: string
          created_at?: string
          group_id?: string
          id?: string
          metadata?: Json | null
          name?: string
          owner_id?: string | null
          primary_contact_id?: string | null
          stage_id?: string
          status?: Database["public"]["Enums"]["deal_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "deals_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_primary_contact_id_fkey"
            columns: ["primary_contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deals_stage_id_fkey"
            columns: ["stage_id"]
            isOneToOne: false
            referencedRelation: "deal_stages"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string
          group_id: string
          id: string
          metadata: Json
          profile_id: string
          type: string
        }
        Insert: {
          created_at?: string
          group_id: string
          id?: string
          metadata?: Json
          profile_id: string
          type: string
        }
        Update: {
          created_at?: string
          group_id?: string
          id?: string
          metadata?: Json
          profile_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "events_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      groups: {
        Row: {
          created_at: string
          domain: string
          id: string
          metadata: Json
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          domain: string
          id?: string
          metadata?: Json
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          domain?: string
          id?: string
          metadata?: Json
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      playbooks: {
        Row: {
          created_at: string
          discovery_questions: string[]
          faqs: string[]
          group_id: string
          id: string
          objections: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          discovery_questions?: string[]
          faqs?: string[]
          group_id: string
          id?: string
          objections?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          discovery_questions?: string[]
          faqs?: string[]
          group_id?: string
          id?: string
          objections?: string[]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "playbooks_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: true
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          full_name: string | null
          group_id: string | null
          id: string
          is_admin: boolean
          metadata: Json | null
          tokens_valid_after: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          full_name?: string | null
          group_id?: string | null
          id: string
          is_admin?: boolean
          metadata?: Json | null
          tokens_valid_after?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          full_name?: string | null
          group_id?: string | null
          id?: string
          is_admin?: boolean
          metadata?: Json | null
          tokens_valid_after?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      signals: {
        Row: {
          agent_version: string
          artifact_id: string
          contact_id: string
          created_at: string
          data: Json
          embedding: string | null
          group_id: string
          id: string
          reasoning: string
          type: Database["public"]["Enums"]["signal_type"]
        }
        Insert: {
          agent_version: string
          artifact_id: string
          contact_id: string
          created_at?: string
          data?: Json
          embedding?: string | null
          group_id: string
          id?: string
          reasoning: string
          type: Database["public"]["Enums"]["signal_type"]
        }
        Update: {
          agent_version?: string
          artifact_id?: string
          contact_id?: string
          created_at?: string
          data?: Json
          embedding?: string | null
          group_id?: string
          id?: string
          reasoning?: string
          type?: Database["public"]["Enums"]["signal_type"]
        }
        Relationships: [
          {
            foreignKeyName: "signals_artifact_id_fkey"
            columns: ["artifact_id"]
            isOneToOne: false
            referencedRelation: "artifacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signals_contact_id_fkey"
            columns: ["contact_id"]
            isOneToOne: false
            referencedRelation: "contacts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signals_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
      slack_user_mappings: {
        Row: {
          created_at: string
          id: string
          is_encrypted: boolean
          slack_user_id: string
          updated_at: string | null
          user_access_token: string | null
          user_access_token_encrypted: string | null
          user_id: string
          verified: boolean
          workspace_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_encrypted?: boolean
          slack_user_id: string
          updated_at?: string | null
          user_access_token?: string | null
          user_access_token_encrypted?: string | null
          user_id: string
          verified?: boolean
          workspace_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_encrypted?: boolean
          slack_user_id?: string
          updated_at?: string | null
          user_access_token?: string | null
          user_access_token_encrypted?: string | null
          user_id?: string
          verified?: boolean
          workspace_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "slack_user_mappings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "slack_user_mappings_workspace_id_fkey"
            columns: ["workspace_id"]
            isOneToOne: false
            referencedRelation: "slack_workspaces"
            referencedColumns: ["id"]
          },
        ]
      }
      slack_workspaces: {
        Row: {
          access_token: string
          access_token_encrypted: string | null
          channels: Json
          created_at: string
          granted_scopes: string | null
          id: string
          installed_by: string | null
          is_encrypted: boolean
          slack_workspace_id: string
          team_name: string
          updated_at: string | null
        }
        Insert: {
          access_token: string
          access_token_encrypted?: string | null
          channels?: Json
          created_at?: string
          granted_scopes?: string | null
          id?: string
          installed_by?: string | null
          is_encrypted?: boolean
          slack_workspace_id: string
          team_name: string
          updated_at?: string | null
        }
        Update: {
          access_token?: string
          access_token_encrypted?: string | null
          channels?: Json
          created_at?: string
          granted_scopes?: string | null
          id?: string
          installed_by?: string | null
          is_encrypted?: boolean
          slack_workspace_id?: string
          team_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "slack_workspaces_installed_by_fkey"
            columns: ["installed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      syntheses: {
        Row: {
          additional_artifact_ids: string[]
          agent_version: string
          created_at: string
          data: Json
          group_id: string
          id: string
          reasoning: string
          signal_ids: string[]
          status: Database["public"]["Enums"]["synthesis_status"]
          type: Database["public"]["Enums"]["synthesis_type"]
          updated_at: string
        }
        Insert: {
          additional_artifact_ids?: string[]
          agent_version: string
          created_at?: string
          data?: Json
          group_id: string
          id?: string
          reasoning: string
          signal_ids?: string[]
          status?: Database["public"]["Enums"]["synthesis_status"]
          type: Database["public"]["Enums"]["synthesis_type"]
          updated_at?: string
        }
        Update: {
          additional_artifact_ids?: string[]
          agent_version?: string
          created_at?: string
          data?: Json
          group_id?: string
          id?: string
          reasoning?: string
          signal_ids?: string[]
          status?: Database["public"]["Enums"]["synthesis_status"]
          type?: Database["public"]["Enums"]["synthesis_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "syntheses_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "groups"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_group_id: { Args: { user_id: string }; Returns: string }
      uuid_generate_v7: { Args: never; Returns: string }
    }
    Enums: {
      buyer_persona_category: "Primary" | "Secondary" | "Emerging"
      contact_role: "buyer" | "seller"
      customer_profile_category: "Ideal" | "Secondary" | "Emerging"
      deal_status: "in_progress" | "won" | "lost"
      department:
        | "EXECUTIVE"
        | "ENGINEERING"
        | "PRODUCT"
        | "DESIGN"
        | "DATA"
        | "SALES"
        | "MARKETING"
        | "BUSINESS_DEVELOPMENT"
        | "CUSTOMER_SUCCESS"
        | "OPERATIONS"
        | "FINANCE"
        | "HR"
        | "LEGAL"
        | "IT"
        | "SECURITY"
      geography_region: "NORTH_AMERICA" | "EMEA" | "APAC" | "LATAM"
      revenue_range:
        | "UNDER_500K"
        | "500K_TO_1M"
        | "1M_TO_5M"
        | "5M_TO_10M"
        | "10M_TO_50M"
        | "50M_TO_100M"
        | "OVER_100M"
      risk_level: "high" | "medium" | "low"
      seniority_level:
        | "C_LEVEL"
        | "VP"
        | "DIRECTOR"
        | "MANAGER"
        | "TEAM_LEAD"
        | "IC"
        | "BOARD"
      signal_type: "objection" | "question"
      stage:
        | "PRE_SEED"
        | "SEED"
        | "SERIES_A"
        | "SERIES_B"
        | "SERIES_C"
        | "SERIES_D"
        | "SERIES_D_PLUS"
        | "GROWTH"
        | "LATE_STAGE"
        | "PUBLIC"
        | "BOOTSTRAPPED"
        | "ESTABLISHED"
        | "ENTERPRISE"
      subrole: "sales" | "customer_success" | "partnerships"
      synthesis_status: "draft" | "include" | "exclude"
      synthesis_type: "objection" | "faq" | "discovery_question"
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
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      buyer_persona_category: ["Primary", "Secondary", "Emerging"],
      contact_role: ["buyer", "seller"],
      customer_profile_category: ["Ideal", "Secondary", "Emerging"],
      deal_status: ["in_progress", "won", "lost"],
      department: [
        "EXECUTIVE",
        "ENGINEERING",
        "PRODUCT",
        "DESIGN",
        "DATA",
        "SALES",
        "MARKETING",
        "BUSINESS_DEVELOPMENT",
        "CUSTOMER_SUCCESS",
        "OPERATIONS",
        "FINANCE",
        "HR",
        "LEGAL",
        "IT",
        "SECURITY",
      ],
      geography_region: ["NORTH_AMERICA", "EMEA", "APAC", "LATAM"],
      revenue_range: [
        "UNDER_500K",
        "500K_TO_1M",
        "1M_TO_5M",
        "5M_TO_10M",
        "10M_TO_50M",
        "50M_TO_100M",
        "OVER_100M",
      ],
      risk_level: ["high", "medium", "low"],
      seniority_level: [
        "C_LEVEL",
        "VP",
        "DIRECTOR",
        "MANAGER",
        "TEAM_LEAD",
        "IC",
        "BOARD",
      ],
      signal_type: ["objection", "question"],
      stage: [
        "PRE_SEED",
        "SEED",
        "SERIES_A",
        "SERIES_B",
        "SERIES_C",
        "SERIES_D",
        "SERIES_D_PLUS",
        "GROWTH",
        "LATE_STAGE",
        "PUBLIC",
        "BOOTSTRAPPED",
        "ESTABLISHED",
        "ENTERPRISE",
      ],
      subrole: ["sales", "customer_success", "partnerships"],
      synthesis_status: ["draft", "include", "exclude"],
      synthesis_type: ["objection", "faq", "discovery_question"],
    },
  },
} as const
