/*
  # Schema inicial do Sistema PDV

  1. Novas Tabelas
    - `categories` - Categorias de produtos
    - `products` - Produtos do sistema
    - `customers` - Clientes
    - `payment_methods` - Métodos de pagamento
    - `sales` - Vendas realizadas
    - `sale_items` - Itens das vendas
    - `pdv_settings` - Configurações do sistema
    - `activity_logs` - Log de atividades

  2. Segurança
    - Habilitar RLS em todas as tabelas
    - Políticas para acesso público (temporário para desenvolvimento)

  3. Dados Iniciais
    - Métodos de pagamento padrão
    - Configurações iniciais do PDV
*/

-- Criar tabela de categorias
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de produtos
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  stock_quantity integer DEFAULT 0,
  category_id uuid REFERENCES categories(id),
  barcode varchar(255),
  image_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de clientes
CREATE TABLE IF NOT EXISTS customers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(255) NOT NULL,
  phone varchar(20),
  email varchar(255),
  address text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de métodos de pagamento
CREATE TABLE IF NOT EXISTS payment_methods (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(100) NOT NULL,
  is_active boolean DEFAULT true,
  is_default boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de vendas
CREATE TABLE IF NOT EXISTS sales (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_number varchar(50) UNIQUE NOT NULL,
  total_amount numeric(10,2) NOT NULL,
  discount_amount numeric(10,2) DEFAULT 0,
  final_amount numeric(10,2) NOT NULL,
  payment_method varchar(50) NOT NULL,
  status varchar(20) DEFAULT 'completed',
  customer_name varchar(255),
  customer_phone varchar(20),
  notes text,
  created_at timestamptz DEFAULT now(),
  customer_id uuid REFERENCES customers(id)
);

-- Criar tabela de itens da venda
CREATE TABLE IF NOT EXISTS sale_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id uuid REFERENCES sales(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id),
  product_name varchar(255) NOT NULL,
  quantity integer NOT NULL,
  unit_price numeric(10,2) NOT NULL,
  total_price numeric(10,2) NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Criar tabela de configurações do PDV
CREATE TABLE IF NOT EXISTS pdv_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pdv_name varchar(255) DEFAULT 'Sistema PDV',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Criar tabela de logs de atividade
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action varchar(100) NOT NULL,
  table_name varchar(100) NOT NULL,
  record_id uuid,
  description text NOT NULL,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS em todas as tabelas
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pdv_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- Políticas de acesso público (para desenvolvimento)
CREATE POLICY "Allow public access to categories" ON categories FOR ALL TO public USING (true);
CREATE POLICY "Allow public access to products" ON products FOR ALL TO public USING (true);
CREATE POLICY "Allow public access to customers" ON customers FOR ALL TO public USING (true);
CREATE POLICY "Allow public access to payment_methods" ON payment_methods FOR ALL TO public USING (true);
CREATE POLICY "Allow public access to sales" ON sales FOR ALL TO public USING (true);
CREATE POLICY "Allow public access to sale_items" ON sale_items FOR ALL TO public USING (true);
CREATE POLICY "Allow public access to pdv_settings" ON pdv_settings FOR ALL TO public USING (true);
CREATE POLICY "Allow public access to activity_logs" ON activity_logs FOR ALL TO public USING (true);

-- Inserir dados iniciais
INSERT INTO payment_methods (name, is_active, is_default) VALUES
  ('Dinheiro', true, true),
  ('Cartão de Débito', true, false),
  ('Cartão de Crédito', true, false),
  ('PIX', true, false),
  ('Cheque', true, false)
ON CONFLICT DO NOTHING;

INSERT INTO pdv_settings (pdv_name) VALUES ('Sistema PDV Web')
ON CONFLICT DO NOTHING;

-- Inserir algumas categorias de exemplo
INSERT INTO categories (name, description) VALUES
  ('Alimentação', 'Produtos alimentícios'),
  ('Bebidas', 'Bebidas em geral'),
  ('Limpeza', 'Produtos de limpeza'),
  ('Higiene', 'Produtos de higiene pessoal'),
  ('Diversos', 'Produtos diversos')
ON CONFLICT DO NOTHING;

-- Inserir alguns produtos de exemplo
INSERT INTO products (name, description, price, stock_quantity, category_id, barcode, is_active) 
SELECT 
  'Coca-Cola 350ml', 'Refrigerante Coca-Cola lata 350ml', 4.50, 100, c.id, '7894900011517', true
FROM categories c WHERE c.name = 'Bebidas'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, stock_quantity, category_id, barcode, is_active) 
SELECT 
  'Pão de Açúcar', 'Pão de açúcar tradicional', 6.90, 50, c.id, '7891000100103', true
FROM categories c WHERE c.name = 'Alimentação'
ON CONFLICT DO NOTHING;

INSERT INTO products (name, description, price, stock_quantity, category_id, barcode, is_active) 
SELECT 
  'Detergente Ypê', 'Detergente líquido Ypê 500ml', 2.99, 75, c.id, '7896098900116', true
FROM categories c WHERE c.name = 'Limpeza'
ON CONFLICT DO NOTHING;