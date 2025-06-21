export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          price: number
          stock_quantity: number
          category_id: string | null
          barcode: string | null
          image_url: string | null
          is_active: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price: number
          stock_quantity?: number
          category_id?: string | null
          barcode?: string | null
          image_url?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price?: number
          stock_quantity?: number
          category_id?: string | null
          barcode?: string | null
          image_url?: string | null
          is_active?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      sales: {
        Row: {
          id: string
          sale_number: string
          total_amount: number
          discount_amount: number | null
          final_amount: number
          payment_method: string
          status: string | null
          customer_name: string | null
          customer_phone: string | null
          notes: string | null
          created_at: string
          customer_id: string | null
        }
        Insert: {
          id?: string
          sale_number: string
          total_amount: number
          discount_amount?: number | null
          final_amount: number
          payment_method: string
          status?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          notes?: string | null
          created_at?: string
          customer_id?: string | null
        }
        Update: {
          id?: string
          sale_number?: string
          total_amount?: number
          discount_amount?: number | null
          final_amount?: number
          payment_method?: string
          status?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          notes?: string | null
          created_at?: string
          customer_id?: string | null
        }
      }
      sale_items: {
        Row: {
          id: string
          sale_id: string | null
          product_id: string | null
          product_name: string
          quantity: number
          unit_price: number
          total_price: number
          created_at: string
        }
        Insert: {
          id?: string
          sale_id?: string | null
          product_id?: string | null
          product_name: string
          quantity: number
          unit_price: number
          total_price: number
          created_at?: string
        }
        Update: {
          id?: string
          sale_id?: string | null
          product_id?: string | null
          product_name?: string
          quantity?: number
          unit_price?: number
          total_price?: number
          created_at?: string
        }
      }
      customers: {
        Row: {
          id: string
          name: string
          phone: string | null
          email: string | null
          address: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string | null
          email?: string | null
          address?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payment_methods: {
        Row: {
          id: string
          name: string
          is_active: boolean | null
          is_default: boolean | null
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          is_active?: boolean | null
          is_default?: boolean | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          is_active?: boolean | null
          is_default?: boolean | null
          created_at?: string
        }
      }
      pdv_settings: {
        Row: {
          id: string
          pdv_name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          pdv_name?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          pdv_name?: string
          created_at?: string
          updated_at?: string
        }
      }
      activity_logs: {
        Row: {
          id: string
          action: string
          table_name: string
          record_id: string | null
          description: string
          old_data: any | null
          new_data: any | null
          created_at: string
        }
        Insert: {
          id?: string
          action: string
          table_name: string
          record_id?: string | null
          description: string
          old_data?: any | null
          new_data?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          action?: string
          table_name?: string
          record_id?: string | null
          description?: string
          old_data?: any | null
          new_data?: any | null
          created_at?: string
        }
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
  }
}