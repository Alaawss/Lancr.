export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          display_name: string | null
          plan: 'free' | 'premium'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name?: string | null
          plan?: 'free' | 'premium'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string | null
          plan?: 'free' | 'premium'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      campaigns: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          category: 'mobile_app' | 'saas' | 'website' | 'product' | 'event' | 'course' | 'community' | 'newsletter' | 'game' | 'other' | null
          slug: string
          logo_url: string | null
          banner_url: string | null
          launch_date: string | null
          theme: string
          accent_color: string
          signup_cap: number | null
          confirmation_message: string | null
          thank_you_redirect_url: string | null
          remove_branding: boolean
          status: 'draft' | 'published' | 'ended'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          category?: 'mobile_app' | 'saas' | 'website' | 'product' | 'event' | 'course' | 'community' | 'newsletter' | 'game' | 'other' | null
          slug: string
          logo_url?: string | null
          banner_url?: string | null
          launch_date?: string | null
          theme?: string
          accent_color?: string
          signup_cap?: number | null
          confirmation_message?: string | null
          thank_you_redirect_url?: string | null
          remove_branding?: boolean
          status?: 'draft' | 'published' | 'ended'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          category?: 'mobile_app' | 'saas' | 'website' | 'product' | 'event' | 'course' | 'community' | 'newsletter' | 'game' | 'other' | null
          slug?: string
          logo_url?: string | null
          banner_url?: string | null
          launch_date?: string | null
          theme?: string
          accent_color?: string
          signup_cap?: number | null
          confirmation_message?: string | null
          thank_you_redirect_url?: string | null
          remove_branding?: boolean
          status?: 'draft' | 'published' | 'ended'
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      benefits: {
        Row: {
          id: string
          campaign_id: string
          text: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          text: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          text?: string
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "benefits_campaign_id_fkey"
            columns: ["campaign_id"]
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
        ]
      }
      signups: {
        Row: {
          id: string
          campaign_id: string
          email: string
          referral_code: string
          referred_by: string | null
          source: 'direct' | 'referral'
          created_at: string
        }
        Insert: {
          id?: string
          campaign_id: string
          email: string
          referral_code: string
          referred_by?: string | null
          source?: 'direct' | 'referral'
          created_at?: string
        }
        Update: {
          id?: string
          campaign_id?: string
          email?: string
          referral_code?: string
          referred_by?: string | null
          source?: 'direct' | 'referral'
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "signups_campaign_id_fkey"
            columns: ["campaign_id"]
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "signups_referred_by_fkey"
            columns: ["referred_by"]
            referencedRelation: "signups"
            referencedColumns: ["id"]
          }
        ]
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          paddle_subscription_id: string
          status: 'active' | 'cancelled' | 'past_due' | 'paused' | 'trialing'
          plan: string
          current_period_end: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          paddle_subscription_id: string
          status?: 'active' | 'cancelled' | 'past_due' | 'paused' | 'trialing'
          plan?: string
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          paddle_subscription_id?: string
          status?: 'active' | 'cancelled' | 'past_due' | 'paused' | 'trialing'
          plan?: string
          current_period_end?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      campaign_views: {
        Row: {
          id: string
          campaign_id: string
          viewed_at: string
          referrer: string | null
        }
        Insert: {
          id?: string
          campaign_id: string
          viewed_at?: string
          referrer?: string | null
        }
        Update: {
          id?: string
          campaign_id?: string
          viewed_at?: string
          referrer?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_views_campaign_id_fkey"
            columns: ["campaign_id"]
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          }
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
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
