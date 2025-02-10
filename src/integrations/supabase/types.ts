export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          email: string
          id: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          course_id: string | null
          enrolled_at: string | null
          id: string
          status: string | null
          student_id: string | null
        }
        Insert: {
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Update: {
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          status?: string | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          duration: string | null
          id: string
          price: number | null
          skill_level: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          price?: number | null
          skill_level?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration?: string | null
          id?: string
          price?: number | null
          skill_level?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exhibition_posts: {
        Row: {
          author_id: string | null
          comments: number | null
          content: string
          created_at: string | null
          exhibition_id: string | null
          id: string
          likes: number | null
          shares: number | null
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          comments?: number | null
          content: string
          created_at?: string | null
          exhibition_id?: string | null
          id?: string
          likes?: number | null
          shares?: number | null
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          comments?: number | null
          content?: string
          created_at?: string | null
          exhibition_id?: string | null
          id?: string
          likes?: number | null
          shares?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exhibition_posts_exhibition_id_fkey"
            columns: ["exhibition_id"]
            isOneToOne: false
            referencedRelation: "exhibitions"
            referencedColumns: ["id"]
          },
        ]
      }
      exhibitions: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          id: string
          image_url: string
          start_date: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url: string
          start_date?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          id?: string
          image_url?: string
          start_date?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      galleries: {
        Row: {
          collection_id: string | null
          created_at: string | null
          description: string | null
          id: string
          image_url: string
          is_private: boolean | null
          owner_id: string | null
          password: string | null
          title: string
          type: string | null
        }
        Insert: {
          collection_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url: string
          is_private?: boolean | null
          owner_id?: string | null
          password?: string | null
          title: string
          type?: string | null
        }
        Update: {
          collection_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          image_url?: string
          is_private?: boolean | null
          owner_id?: string | null
          password?: string | null
          title?: string
          type?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "galleries_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_access: {
        Row: {
          gallery_id: string
          granted_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          gallery_id: string
          granted_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          gallery_id?: string
          granted_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "gallery_access_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      gallery_password_requests: {
        Row: {
          created_at: string | null
          gallery_id: string | null
          id: string
          request_message: string | null
          requester_email: string
          requester_name: string
          status: string | null
        }
        Insert: {
          created_at?: string | null
          gallery_id?: string | null
          id?: string
          request_message?: string | null
          requester_email: string
          requester_name: string
          status?: string | null
        }
        Update: {
          created_at?: string | null
          gallery_id?: string | null
          id?: string
          request_message?: string | null
          requester_email?: string
          requester_name?: string
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "gallery_password_requests_gallery_id_fkey"
            columns: ["gallery_id"]
            isOneToOne: false
            referencedRelation: "galleries"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          amount: number
          booking_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          payment_details: Json | null
          payment_method: Database["public"]["Enums"]["payment_method_type"]
          status: string | null
          transaction_id: string | null
          updated_at: string | null
        }
        Insert: {
          amount: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_details?: Json | null
          payment_method: Database["public"]["Enums"]["payment_method_type"]
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Update: {
          amount?: number
          booking_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_details?: Json | null
          payment_method?: Database["public"]["Enums"]["payment_method_type"]
          status?: string | null
          transaction_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "service_bookings"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          budget: string | null
          client_email: string
          client_name: string
          client_phone: string | null
          created_at: string | null
          id: string
          project_details: string | null
          service_type: string
          status: string | null
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          client_email: string
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          id?: string
          project_details?: string | null
          service_type: string
          status?: string | null
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          client_email?: string
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          id?: string
          project_details?: string | null
          service_type?: string
          status?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      service_bookings: {
        Row: {
          client_email: string
          client_name: string
          client_phone: string | null
          created_at: string | null
          id: string
          preferred_date: string | null
          requirements: string | null
          service_type: string
          status: string | null
        }
        Insert: {
          client_email: string
          client_name: string
          client_phone?: string | null
          created_at?: string | null
          id?: string
          preferred_date?: string | null
          requirements?: string | null
          service_type: string
          status?: string | null
        }
        Update: {
          client_email?: string
          client_name?: string
          client_phone?: string | null
          created_at?: string | null
          id?: string
          preferred_date?: string | null
          requirements?: string | null
          service_type?: string
          status?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          created_at: string | null
          email: string
          experience_level: string | null
          full_name: string
          id: string
          phone: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          experience_level?: string | null
          full_name: string
          id?: string
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          experience_level?: string | null
          full_name?: string
          id?: string
          phone?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      table_name: {
        Row: {
          data: Json | null
          id: number
          inserted_at: string
          name: string | null
          updated_at: string
        }
        Insert: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
        }
        Update: {
          data?: Json | null
          id?: number
          inserted_at?: string
          name?: string | null
          updated_at?: string
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
      booking_type:
        | "photography"
        | "video"
        | "sound"
        | "school"
        | "equipment_rental"
      payment_method_type: "mpesa" | "card" | "bank_transfer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
