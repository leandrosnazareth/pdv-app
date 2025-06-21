'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { supabase } from '@/lib/supabase'
import { 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign, 
  TrendingUp, 
  Activity,
  LogOut,
  Menu,
  X
} from 'lucide-react'
import toast from 'react-hot-toast'

interface DashboardStats {
  totalSales: number
  totalProducts: number
  totalCustomers: number
  totalRevenue: number
  recentSales: any[]
  lowStockProducts: any[]
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalSales: 0,
    totalProducts: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    recentSales: [],
    lowStockProducts: []
  })
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    try {
      // Carregar estatísticas
      const [salesCount, productsCount, customersCount, revenueData, recentSalesData, lowStockData] = await Promise.all([
        supabase.from('sales').select('*', { count: 'exact', head: true }),
        supabase.from('products').select('*', { count: 'exact', head: true }),
        supabase.from('customers').select('*', { count: 'exact', head: true }),
        supabase.from('sales').select('final_amount'),
        supabase.from('sales').select('*').order('created_at', { ascending: false }).limit(5),
        supabase.from('products').select('*').lt('stock_quantity', 10).eq('is_active', true)
      ])

      const totalRevenue = revenueData.data?.reduce((sum, sale) => sum + Number(sale.final_amount), 0) || 0

      setStats({
        totalSales: salesCount.count || 0,
        totalProducts: productsCount.count || 0,
        totalCustomers: customersCount.count || 0,
        totalRevenue,
        recentSales: recentSalesData.data || [],
        lowStockProducts: lowStockData.data || []
      })
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error('Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      toast.success('Logout realizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao fazer logout')
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 lg:hidden"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <div className="flex items-center ml-2 lg:ml-0">
              <ShoppingCart className="h-8 w-8 text-primary-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">PDV Web System</h1>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Olá, {user?.email}</span>
            <button
              onClick={handleSignOut}
              className="btn btn-secondary btn-sm"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <nav className="mt-8 px-4">
            <div className="space-y-2">
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 bg-primary-50 rounded-lg">
                <Activity className="h-5 w-5 mr-3 text-primary-600" />
                Dashboard
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Package className="h-5 w-5 mr-3" />
                Produtos
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <ShoppingCart className="h-5 w-5 mr-3" />
                PDV
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <DollarSign className="h-5 w-5 mr-3" />
                Vendas
              </a>
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
                <Users className="h-5 w-5 mr-3" />
                Clientes
              </a>
            </div>
          </nav>
        </aside>

        {/* Overlay para mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Vendas</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalSales}</p>
                  </div>
                  <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Produtos</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                  </div>
                  <div className="h-12 w-12 bg-success-100 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-success-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Clientes</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                  </div>
                  <div className="h-12 w-12 bg-warning-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-warning-600" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-content">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Faturamento</p>
                    <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
                  </div>
                  <div className="h-12 w-12 bg-danger-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-danger-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Vendas Recentes */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Vendas Recentes</h3>
              </div>
              <div className="card-content">
                {stats.recentSales.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">#{sale.sale_number}</p>
                          <p className="text-sm text-gray-600">{formatDate(sale.created_at)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">{formatCurrency(Number(sale.final_amount))}</p>
                          <p className="text-sm text-gray-600">{sale.payment_method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Nenhuma venda encontrada</p>
                )}
              </div>
            </div>

            {/* Produtos com Estoque Baixo */}
            <div className="card">
              <div className="card-header">
                <h3 className="text-lg font-semibold text-gray-900">Estoque Baixo</h3>
              </div>
              <div className="card-content">
                {stats.lowStockProducts.length > 0 ? (
                  <div className="space-y-4">
                    {stats.lowStockProducts.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 bg-warning-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{formatCurrency(Number(product.price))}</p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                            {product.stock_quantity} unidades
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">Todos os produtos com estoque adequado</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}