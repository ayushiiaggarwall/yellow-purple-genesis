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
      announcements: {
        Row: {
          body: string
          cohort_id: string
          created_at: string
          id: string
          title: string
        }
        Insert: {
          body: string
          cohort_id: string
          created_at?: string
          id?: string
          title: string
        }
        Update: {
          body?: string
          cohort_id?: string
          created_at?: string
          id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "announcements_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
        ]
      }
      assignments: {
        Row: {
          due_date: string | null
          id: string
          instructions: string
          lesson_id: string
          title: string
        }
        Insert: {
          due_date?: string | null
          id?: string
          instructions: string
          lesson_id: string
          title: string
        }
        Update: {
          due_date?: string | null
          id?: string
          instructions?: string
          lesson_id?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "assignments_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      cohorts: {
        Row: {
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          start_date: string | null
        }
        Insert: {
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          start_date?: string | null
        }
        Update: {
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          start_date?: string | null
        }
        Relationships: []
      }
      enrollments: {
        Row: {
          cohort_id: string
          created_at: string
          id: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Insert: {
          cohort_id: string
          created_at?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          user_id: string
        }
        Update: {
          cohort_id?: string
          created_at?: string
          id?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "enrollments_cohort_id_fkey"
            columns: ["cohort_id"]
            isOneToOne: false
            referencedRelation: "cohorts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "enrollments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          note: string | null
          source: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          note?: string | null
          source?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          note?: string | null
          source?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: Json | null
          id: string
          resources: Json | null
          slug: string
          summary: string | null
          title: string
          visible: boolean | null
          week: number
        }
        Insert: {
          content?: Json | null
          id?: string
          resources?: Json | null
          slug: string
          summary?: string | null
          title: string
          visible?: boolean | null
          week: number
        }
        Update: {
          content?: Json | null
          id?: string
          resources?: Json | null
          slug?: string
          summary?: string | null
          title?: string
          visible?: boolean | null
          week?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          email: string
          id: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      submissions: {
        Row: {
          assignment_id: string
          created_at: string
          id: string
          notes: string | null
          status: Database["public"]["Enums"]["submission_status"]
          url: string | null
          user_id: string
        }
        Insert: {
          assignment_id: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          url?: string | null
          user_id: string
        }
        Update: {
          assignment_id?: string
          created_at?: string
          id?: string
          notes?: string | null
          status?: Database["public"]["Enums"]["submission_status"]
          url?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "submissions_assignment_id_fkey"
            columns: ["assignment_id"]
            isOneToOne: false
            referencedRelation: "assignments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "submissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      payment_status: "pending" | "paid" | "failed"
      submission_status: "submitted" | "reviewed" | "needs_changes"
      user_role: "student" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}