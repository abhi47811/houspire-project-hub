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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      api_logs: {
        Row: {
          cost_usd: number
          created_at: string
          created_by: string | null
          endpoint: string
          error_message: string | null
          id: string
          input_tokens: number | null
          latency_ms: number | null
          metadata: Json | null
          model: string | null
          output_tokens: number | null
          project_id: string | null
          room_id: string | null
          service: string
          status: string
        }
        Insert: {
          cost_usd?: number
          created_at?: string
          created_by?: string | null
          endpoint: string
          error_message?: string | null
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          metadata?: Json | null
          model?: string | null
          output_tokens?: number | null
          project_id?: string | null
          room_id?: string | null
          service: string
          status?: string
        }
        Update: {
          cost_usd?: number
          created_at?: string
          created_by?: string | null
          endpoint?: string
          error_message?: string | null
          id?: string
          input_tokens?: number | null
          latency_ms?: number | null
          metadata?: Json | null
          model?: string | null
          output_tokens?: number | null
          project_id?: string | null
          room_id?: string | null
          service?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "api_logs_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "api_logs_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      budget_items: {
        Row: {
          amount: number | null
          assigned_vendor_id: string | null
          category: string
          created_at: string
          gst_amount: number | null
          gst_percent: number
          id: string
          item_name: string
          project_id: string
          quantity: number
          rate: number
          room_id: string | null
          sort_order: number | null
          specification: string | null
          status: string
          total: number | null
          unit: string
          updated_at: string
          vendor_name: string | null
        }
        Insert: {
          amount?: number | null
          assigned_vendor_id?: string | null
          category: string
          created_at?: string
          gst_amount?: number | null
          gst_percent?: number
          id?: string
          item_name: string
          project_id: string
          quantity?: number
          rate?: number
          room_id?: string | null
          sort_order?: number | null
          specification?: string | null
          status?: string
          total?: number | null
          unit?: string
          updated_at?: string
          vendor_name?: string | null
        }
        Update: {
          amount?: number | null
          assigned_vendor_id?: string | null
          category?: string
          created_at?: string
          gst_amount?: number | null
          gst_percent?: number
          id?: string
          item_name?: string
          project_id?: string
          quantity?: number
          rate?: number
          room_id?: string | null
          sort_order?: number | null
          specification?: string | null
          status?: string
          total?: number | null
          unit?: string
          updated_at?: string
          vendor_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "budget_items_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "budget_items_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      bulk_operations: {
        Row: {
          affected_rooms: string[] | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          error_message: string | null
          failed_count: number
          id: string
          operation_type: Database["public"]["Enums"]["bulk_operation_type"]
          project_id: string
          status: Database["public"]["Enums"]["bulk_operation_status"]
          success_count: number
          total_count: number
        }
        Insert: {
          affected_rooms?: string[] | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          failed_count?: number
          id?: string
          operation_type: Database["public"]["Enums"]["bulk_operation_type"]
          project_id: string
          status?: Database["public"]["Enums"]["bulk_operation_status"]
          success_count?: number
          total_count?: number
        }
        Update: {
          affected_rooms?: string[] | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          failed_count?: number
          id?: string
          operation_type?: Database["public"]["Enums"]["bulk_operation_type"]
          project_id?: string
          status?: Database["public"]["Enums"]["bulk_operation_status"]
          success_count?: number
          total_count?: number
        }
        Relationships: [
          {
            foreignKeyName: "bulk_operations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      change_events: {
        Row: {
          change_type: string
          changed_by: string | null
          changed_fields: Json | null
          created_at: string
          entity_id: string
          entity_type: string
          id: string
          new_values: Json | null
          old_values: Json | null
          project_id: string | null
          room_id: string | null
        }
        Insert: {
          change_type: string
          changed_by?: string | null
          changed_fields?: Json | null
          created_at?: string
          entity_id: string
          entity_type: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          project_id?: string | null
          room_id?: string | null
        }
        Update: {
          change_type?: string
          changed_by?: string | null
          changed_fields?: Json | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          id?: string
          new_values?: Json | null
          old_values?: Json | null
          project_id?: string | null
          room_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "change_events_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "change_events_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      job_queue: {
        Row: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          error_message: string | null
          id: string
          job_type: string
          max_retries: number
          payload: Json | null
          priority: number
          project_id: string
          result: Json | null
          retry_count: number
          room_id: string
          scheduled_at: string
          started_at: string | null
          status: string
          updated_at: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          job_type: string
          max_retries?: number
          payload?: Json | null
          priority?: number
          project_id: string
          result?: Json | null
          retry_count?: number
          room_id: string
          scheduled_at?: string
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          error_message?: string | null
          id?: string
          job_type?: string
          max_retries?: number
          payload?: Json | null
          priority?: number
          project_id?: string
          result?: Json | null
          retry_count?: number
          room_id?: string
          scheduled_at?: string
          started_at?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "job_queue_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_queue_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          link: string | null
          message: string
          title: string
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message: string
          title: string
          type?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          link?: string | null
          message?: string
          title?: string
          type?: string
          user_id?: string
        }
        Relationships: []
      }
      optimistic_updates: {
        Row: {
          client_id: string
          confirmed_at: string | null
          created_at: string
          entity_id: string
          entity_type: string
          error_message: string | null
          expires_at: string
          id: string
          operation: string
          optimistic_data: Json
          status: string
          user_id: string
        }
        Insert: {
          client_id: string
          confirmed_at?: string | null
          created_at?: string
          entity_id: string
          entity_type: string
          error_message?: string | null
          expires_at?: string
          id?: string
          operation: string
          optimistic_data: Json
          status?: string
          user_id: string
        }
        Update: {
          client_id?: string
          confirmed_at?: string | null
          created_at?: string
          entity_id?: string
          entity_type?: string
          error_message?: string | null
          expires_at?: string
          id?: string
          operation?: string
          optimistic_data?: Json
          status?: string
          user_id?: string
        }
        Relationships: []
      }
      pricing_reference: {
        Row: {
          base_rate: number
          category: string
          city_multipliers: Json | null
          created_at: string
          id: string
          item_name: string
          specification: string | null
          unit: string
        }
        Insert: {
          base_rate: number
          category: string
          city_multipliers?: Json | null
          created_at?: string
          id?: string
          item_name: string
          specification?: string | null
          unit?: string
        }
        Update: {
          base_rate?: number
          category?: string
          city_multipliers?: Json | null
          created_at?: string
          id?: string
          item_name?: string
          specification?: string | null
          unit?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          full_name: string | null
          id: string
          is_active: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          full_name?: string | null
          id?: string
          is_active?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          actual_cost: number | null
          assigned_to: string | null
          city: Database["public"]["Enums"]["city_enum"] | null
          client_email: string | null
          client_name: string | null
          created_at: string | null
          created_by: string | null
          current_phase: number | null
          deadline: string | null
          description: string | null
          estimated_budget: number | null
          id: string
          max_rooms: number | null
          name: string
          status: Database["public"]["Enums"]["project_status"] | null
          total_rooms: number | null
          updated_at: string | null
        }
        Insert: {
          actual_cost?: number | null
          assigned_to?: string | null
          city?: Database["public"]["Enums"]["city_enum"] | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string | null
          created_by?: string | null
          current_phase?: number | null
          deadline?: string | null
          description?: string | null
          estimated_budget?: number | null
          id?: string
          max_rooms?: number | null
          name: string
          status?: Database["public"]["Enums"]["project_status"] | null
          total_rooms?: number | null
          updated_at?: string | null
        }
        Update: {
          actual_cost?: number | null
          assigned_to?: string | null
          city?: Database["public"]["Enums"]["city_enum"] | null
          client_email?: string | null
          client_name?: string | null
          created_at?: string | null
          created_by?: string | null
          current_phase?: number | null
          deadline?: string | null
          description?: string | null
          estimated_budget?: number | null
          id?: string
          max_rooms?: number | null
          name?: string
          status?: Database["public"]["Enums"]["project_status"] | null
          total_rooms?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      room_analysis: {
        Row: {
          ceiling_fan_count: number | null
          created_at: string | null
          detected_height_feet: number | null
          detected_length_feet: number | null
          detected_width_feet: number | null
          door_count: number | null
          door_positions: Json | null
          id: string
          is_verified: boolean | null
          measurement_confidence: number | null
          other_features: Json | null
          outlet_count: number | null
          raw_analysis_data: Json | null
          room_id: string
          selected_style: string | null
          suggested_styles: Json | null
          updated_at: string | null
          verified_at: string | null
          verified_by: string | null
          window_count: number | null
          window_positions: Json | null
        }
        Insert: {
          ceiling_fan_count?: number | null
          created_at?: string | null
          detected_height_feet?: number | null
          detected_length_feet?: number | null
          detected_width_feet?: number | null
          door_count?: number | null
          door_positions?: Json | null
          id?: string
          is_verified?: boolean | null
          measurement_confidence?: number | null
          other_features?: Json | null
          outlet_count?: number | null
          raw_analysis_data?: Json | null
          room_id: string
          selected_style?: string | null
          suggested_styles?: Json | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          window_count?: number | null
          window_positions?: Json | null
        }
        Update: {
          ceiling_fan_count?: number | null
          created_at?: string | null
          detected_height_feet?: number | null
          detected_length_feet?: number | null
          detected_width_feet?: number | null
          door_count?: number | null
          door_positions?: Json | null
          id?: string
          is_verified?: boolean | null
          measurement_confidence?: number | null
          other_features?: Json | null
          outlet_count?: number | null
          raw_analysis_data?: Json | null
          room_id?: string
          selected_style?: string | null
          suggested_styles?: Json | null
          updated_at?: string | null
          verified_at?: string | null
          verified_by?: string | null
          window_count?: number | null
          window_positions?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "room_analysis_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: true
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_analysis_verified_by_fkey"
            columns: ["verified_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      room_images: {
        Row: {
          created_at: string
          file_name: string
          file_size: number | null
          id: string
          image_type: string
          phase: number
          resolution: string
          room_id: string
          storage_path: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          file_name: string
          file_size?: number | null
          id?: string
          image_type: string
          phase: number
          resolution: string
          room_id: string
          storage_path: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          file_name?: string
          file_size?: number | null
          id?: string
          image_type?: string
          phase?: number
          resolution?: string
          room_id?: string
          storage_path?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_images_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          created_at: string | null
          current_phase: number | null
          final_quality_score: number | null
          height_feet: number | null
          id: string
          length_feet: number | null
          phase_1_completed: boolean | null
          phase_2_completed: boolean | null
          phase_3_completed: boolean | null
          phase_4_completed: boolean | null
          phase_5_completed: boolean | null
          project_id: string
          retry_count: number | null
          room_name: string | null
          room_number: number
          room_type: Database["public"]["Enums"]["room_type_enum"] | null
          selected_style: string | null
          smart_default_id: string | null
          updated_at: string | null
          width_feet: number | null
        }
        Insert: {
          created_at?: string | null
          current_phase?: number | null
          final_quality_score?: number | null
          height_feet?: number | null
          id?: string
          length_feet?: number | null
          phase_1_completed?: boolean | null
          phase_2_completed?: boolean | null
          phase_3_completed?: boolean | null
          phase_4_completed?: boolean | null
          phase_5_completed?: boolean | null
          project_id: string
          retry_count?: number | null
          room_name?: string | null
          room_number: number
          room_type?: Database["public"]["Enums"]["room_type_enum"] | null
          selected_style?: string | null
          smart_default_id?: string | null
          updated_at?: string | null
          width_feet?: number | null
        }
        Update: {
          created_at?: string | null
          current_phase?: number | null
          final_quality_score?: number | null
          height_feet?: number | null
          id?: string
          length_feet?: number | null
          phase_1_completed?: boolean | null
          phase_2_completed?: boolean | null
          phase_3_completed?: boolean | null
          phase_4_completed?: boolean | null
          phase_5_completed?: boolean | null
          project_id?: string
          retry_count?: number | null
          room_name?: string | null
          room_number?: number
          room_type?: Database["public"]["Enums"]["room_type_enum"] | null
          selected_style?: string | null
          smart_default_id?: string | null
          updated_at?: string | null
          width_feet?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "rooms_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_smart_default_id_fkey"
            columns: ["smart_default_id"]
            isOneToOne: false
            referencedRelation: "smart_defaults"
            referencedColumns: ["id"]
          },
        ]
      }
      smart_defaults: {
        Row: {
          created_at: string | null
          default_settings: Json | null
          default_style: string | null
          id: string
          name: string
          room_type: Database["public"]["Enums"]["room_type_enum"] | null
        }
        Insert: {
          created_at?: string | null
          default_settings?: Json | null
          default_style?: string | null
          id?: string
          name: string
          room_type?: Database["public"]["Enums"]["room_type_enum"] | null
        }
        Update: {
          created_at?: string | null
          default_settings?: Json | null
          default_style?: string | null
          id?: string
          name?: string
          room_type?: Database["public"]["Enums"]["room_type_enum"] | null
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          client_id: string | null
          created_at: string
          current_project_id: string | null
          current_room_id: string | null
          id: string
          is_active: boolean
          last_active_at: string
          session_started_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          current_project_id?: string | null
          current_room_id?: string | null
          id?: string
          is_active?: boolean
          last_active_at?: string
          session_started_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          current_project_id?: string | null
          current_room_id?: string | null
          id?: string
          is_active?: boolean
          last_active_at?: string
          session_started_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_sessions_current_project_id_fkey"
            columns: ["current_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_sessions_current_room_id_fkey"
            columns: ["current_room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      vendor_matches: {
        Row: {
          budget_item_id: string
          created_at: string
          id: string
          match_score: number
          notes: string | null
          price_quote: number | null
          status: string
          updated_at: string
          vendor_id: string
        }
        Insert: {
          budget_item_id: string
          created_at?: string
          id?: string
          match_score?: number
          notes?: string | null
          price_quote?: number | null
          status?: string
          updated_at?: string
          vendor_id: string
        }
        Update: {
          budget_item_id?: string
          created_at?: string
          id?: string
          match_score?: number
          notes?: string | null
          price_quote?: number | null
          status?: string
          updated_at?: string
          vendor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vendor_matches_budget_item_id_fkey"
            columns: ["budget_item_id"]
            isOneToOne: false
            referencedRelation: "budget_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vendor_matches_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "vendors"
            referencedColumns: ["id"]
          },
        ]
      }
      vendors: {
        Row: {
          address: string | null
          business_name: string
          categories: string[]
          city: string | null
          contact_name: string | null
          created_at: string
          discount_percentage: number | null
          email: string | null
          id: string
          is_curated: boolean
          is_verified: boolean
          lead_time_days: number | null
          min_order_amount: number | null
          on_time_percentage: number | null
          phone: string | null
          projects_completed: number | null
          rating: number | null
          total_reviews: number | null
          updated_at: string
        }
        Insert: {
          address?: string | null
          business_name: string
          categories?: string[]
          city?: string | null
          contact_name?: string | null
          created_at?: string
          discount_percentage?: number | null
          email?: string | null
          id?: string
          is_curated?: boolean
          is_verified?: boolean
          lead_time_days?: number | null
          min_order_amount?: number | null
          on_time_percentage?: number | null
          phone?: string | null
          projects_completed?: number | null
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string
        }
        Update: {
          address?: string | null
          business_name?: string
          categories?: string[]
          city?: string | null
          contact_name?: string | null
          created_at?: string
          discount_percentage?: number | null
          email?: string | null
          id?: string
          is_curated?: boolean
          is_verified?: boolean
          lead_time_days?: number | null
          min_order_amount?: number | null
          on_time_percentage?: number | null
          phone?: string | null
          projects_completed?: number | null
          rating?: number | null
          total_reviews?: number | null
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      apply_style_to_all_rooms: {
        Args: {
          p_design_style: string
          p_project_id: string
          p_user_id: string
        }
        Returns: {
          operation_id: string
          success_count: number
          total_count: number
        }[]
      }
      approve_all_analysis: {
        Args: { p_project_id: string; p_user_id: string }
        Returns: {
          operation_id: string
          success_count: number
          total_count: number
        }[]
      }
      approve_all_budget_items: {
        Args: { p_category?: string; p_project_id: string; p_user_id: string }
        Returns: {
          operation_id: string
          success_count: number
          total_count: number
        }[]
      }
      auto_assign_best_vendors: {
        Args: { p_project_id: string; p_user_id: string }
        Returns: {
          failed_count: number
          operation_id: string
          success_count: number
          total_count: number
        }[]
      }
      claim_job: { Args: { p_job_id: string }; Returns: boolean }
      cleanup_old_events: { Args: never; Returns: number }
      complete_job: {
        Args: { p_job_id: string; p_result?: Json }
        Returns: boolean
      }
      copy_room_settings: {
        Args: {
          p_copy_requirements?: boolean
          p_copy_style?: boolean
          p_copy_vastu?: boolean
          p_source_room_id: string
          p_target_room_ids: string[]
          p_user_id?: string
        }
        Returns: {
          success_count: number
          total_count: number
        }[]
      }
      create_targeted_notification: {
        Args: {
          p_link?: string
          p_message: string
          p_target_user_id: string
          p_title: string
          p_type?: string
        }
        Returns: string
      }
      end_user_session: { Args: { p_client_id: string }; Returns: boolean }
      fail_job: {
        Args: { p_error_message: string; p_job_id: string }
        Returns: boolean
      }
      get_next_job: {
        Args: { p_project_id?: string }
        Returns: {
          completed_at: string | null
          created_at: string
          created_by: string | null
          error_message: string | null
          id: string
          job_type: string
          max_retries: number
          payload: Json | null
          priority: number
          project_id: string
          result: Json | null
          retry_count: number
          room_id: string
          scheduled_at: string
          started_at: string | null
          status: string
          updated_at: string
        }[]
        SetofOptions: {
          from: "*"
          to: "job_queue"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["user_role"]
      }
      heartbeat_session: { Args: { p_client_id: string }; Returns: boolean }
      mark_notifications_read: {
        Args: { p_notification_ids: string[] }
        Returns: number
      }
      notify_project_stakeholders: {
        Args: {
          p_exclude_user_id?: string
          p_link?: string
          p_message: string
          p_project_id: string
          p_title: string
          p_type?: string
        }
        Returns: number
      }
      record_change_event: {
        Args: {
          p_change_type?: string
          p_changed_fields?: Json
          p_entity_id: string
          p_entity_type: string
          p_new_values?: Json
          p_old_values?: Json
          p_project_id: string
          p_room_id?: string
        }
        Returns: string
      }
      upsert_user_session: {
        Args: {
          p_client_id?: string
          p_project_id?: string
          p_room_id?: string
        }
        Returns: string
      }
    }
    Enums: {
      bulk_operation_status: "pending" | "processing" | "completed" | "failed"
      bulk_operation_type:
        | "approve_all_analysis"
        | "apply_style_to_all"
        | "approve_all_budget_items"
        | "auto_assign_best_vendors"
      city_enum:
        | "Mumbai"
        | "Delhi"
        | "Bangalore"
        | "Chennai"
        | "Hyderabad"
        | "Pune"
        | "Kolkata"
        | "Ahmedabad"
        | "Jaipur"
        | "Surat"
        | "Lucknow"
      project_status:
        | "draft"
        | "in_progress"
        | "review"
        | "approved"
        | "completed"
        | "cancelled"
      room_type_enum:
        | "living_room"
        | "master_bedroom"
        | "bedroom"
        | "kitchen"
        | "dining_room"
        | "balcony"
        | "study_room"
        | "kids_room"
        | "guest_room"
        | "pooja_room"
        | "home_office"
        | "gym"
        | "entertainment_room"
        | "utility_room"
      user_role: "admin" | "renderer" | "budgeter" | "vendor_finder"
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
      bulk_operation_status: ["pending", "processing", "completed", "failed"],
      bulk_operation_type: [
        "approve_all_analysis",
        "apply_style_to_all",
        "approve_all_budget_items",
        "auto_assign_best_vendors",
      ],
      city_enum: [
        "Mumbai",
        "Delhi",
        "Bangalore",
        "Chennai",
        "Hyderabad",
        "Pune",
        "Kolkata",
        "Ahmedabad",
        "Jaipur",
        "Surat",
        "Lucknow",
      ],
      project_status: [
        "draft",
        "in_progress",
        "review",
        "approved",
        "completed",
        "cancelled",
      ],
      room_type_enum: [
        "living_room",
        "master_bedroom",
        "bedroom",
        "kitchen",
        "dining_room",
        "balcony",
        "study_room",
        "kids_room",
        "guest_room",
        "pooja_room",
        "home_office",
        "gym",
        "entertainment_room",
        "utility_room",
      ],
      user_role: ["admin", "renderer", "budgeter", "vendor_finder"],
    },
  },
} as const
