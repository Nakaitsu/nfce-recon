import { getConnection } from './SQLiteDb';

export const seedDatabase = async () => {
  const db = await getConnection();

  try {
    await db.execAsync('BEGIN TRANSACTION')

    await db.execAsync(`
      INSERT INTO purchase (place, date) VALUES
        ('COMERCIO VAREJISTA DE MERCADORIAS LT', '2024-11-25'),
        ('COMERCIO VAREJISTA DE MERCADORIAS LT', '2024-10-20'),
        ('COMERCIO VAREJISTA DE MERCADORIAS LT', '2024-09-15'),
        ('MERCADO E PANIFICADORA KM17', '2024-11-22'),
        ('MERCADO E PANIFICADORA KM17', '2024-10-18'),
        ('MERCADO E PANIFICADORA KM17', '2024-09-12'),
        ('SUPERMERCADO CENTRAL', '2024-11-20'),
        ('SUPERMERCADO CENTRAL', '2024-10-15'),
        ('SUPERMERCADO CENTRAL', '2024-09-10'),
        ('MERCADINHO DA ESQUINA', '2024-11-18'),
        ('MERCADINHO DA ESQUINA', '2024-10-13'),
        ('MERCADINHO DA ESQUINA', '2024-09-08'),
        ('HIPERMERCADO BONANÇA', '2024-11-15'),
        ('HIPERMERCADO BONANÇA', '2024-10-10'),
        ('HIPERMERCADO BONANÇA', '2024-09-05');
    `)

    await db.execAsync(`
      INSERT INTO items (desc, unType, val, qtd, purchase_id) VALUES
        ('AIMPIM KG', 'KG', 7.01, 1.17, (SELECT id FROM purchase WHERE place = 'COMERCIO VAREJISTA DE MERCADORIAS LT' AND date = '2024-11-25')),
        ('SALGADOS SORT UN', 'UN', 11.98, 2, (SELECT id FROM purchase WHERE place = 'COMERCIO VAREJISTA DE MERCADORIAS LT' AND date = '2024-11-25')),

        ('QUEIJO LANCHE ALELUIA KG', 'KG', 4.92, 0.082, (SELECT id FROM purchase WHERE place = 'MERCADO E PANIFICADORA KM17' AND date = '2024-11-22')),
        ('MANTEIGA AGRANEL KG', 'KG', 7.59, 0.11, (SELECT id FROM purchase WHERE place = 'MERCADO E PANIFICADORA KM17' AND date = '2024-11-22')),

        ('FEIJÃO PRETO KG', 'KG', 5.50, 1.5, (SELECT id FROM purchase WHERE place = 'SUPERMERCADO CENTRAL' AND date = '2024-11-20')),
        ('ARROZ AGULHINHA KG', 'KG', 3.45, 2, (SELECT id FROM purchase WHERE place = 'SUPERMERCADO CENTRAL' AND date = '2024-11-20')),

        ('PÃO DE FORMA UN', 'UN', 6.30, 1, (SELECT id FROM purchase WHERE place = 'MERCADINHO DA ESQUINA' AND date = '2024-11-18')),
        ('LEITE INTEGRAL L', 'L', 3.00, 1, (SELECT id FROM purchase WHERE place = 'MERCADINHO DA ESQUINA' AND date = '2024-11-18')),

        ('MACARRÃO ESPAGUETE KG', 'KG', 2.50, 1, (SELECT id FROM purchase WHERE place = 'HIPERMERCADO BONANÇA' AND date = '2024-11-15')),
        ('MOLHO DE TOMATE UN', 'UN', 2.30, 2, (SELECT id FROM purchase WHERE place = 'HIPERMERCADO BONANÇA' AND date = '2024-11-15')),

        ('AIMPIM KG', 'KG', 7.01, 1.17, (SELECT id FROM purchase WHERE place = 'COMERCIO VAREJISTA DE MERCADORIAS LT' AND date = '2024-10-20')),
        ('SALGADOS SORT UN', 'UN', 11.98, 2, (SELECT id FROM purchase WHERE place = 'COMERCIO VAREJISTA DE MERCADORIAS LT' AND date = '2024-10-20')),

        ('QUEIJO LANCHE ALELUIA KG', 'KG', 4.92, 0.082, (SELECT id FROM purchase WHERE place = 'MERCADO E PANIFICADORA KM17' AND date = '2024-10-18')),
        ('MANTEIGA AGRANEL KG', 'KG', 7.59, 0.11, (SELECT id FROM purchase WHERE place = 'MERCADO E PANIFICADORA KM17' AND date = '2024-10-18')),

        ('FEIJÃO PRETO KG', 'KG', 5.50, 1.5, (SELECT id FROM purchase WHERE place = 'SUPERMERCADO CENTRAL' AND date = '2024-10-15')),
        ('ARROZ AGULHINHA KG', 'KG', 3.45, 2, (SELECT id FROM purchase WHERE place = 'SUPERMERCADO CENTRAL' AND date = '2024-10-15')),

        ('PÃO DE FORMA UN', 'UN', 6.30, 1, (SELECT id FROM purchase WHERE place = 'MERCADINHO DA ESQUINA' AND date = '2024-10-13')),
        ('LEITE INTEGRAL L', 'L', 3.00, 1, (SELECT id FROM purchase WHERE place = 'MERCADINHO DA ESQUINA' AND date = '2024-10-13')),

        ('MACARRÃO ESPAGUETE KG', 'KG', 2.50, 1, (SELECT id FROM purchase WHERE place = 'HIPERMERCADO BONANÇA' AND date = '2024-10-10')),
        ('MOLHO DE TOMATE UN', 'UN', 2.30, 2, (SELECT id FROM purchase WHERE place = 'HIPERMERCADO BONANÇA' AND date = '2024-10-10')),

        ('AIMPIM KG', 'KG', 7.01, 1.17, (SELECT id FROM purchase WHERE place = 'COMERCIO VAREJISTA DE MERCADORIAS LT' AND date = '2024-09-15')),
        ('SALGADOS SORT UN', 'UN', 11.98, 2, (SELECT id FROM purchase WHERE place = 'COMERCIO VAREJISTA DE MERCADORIAS LT' AND date = '2024-09-15')),

        ('QUEIJO LANCHE ALELUIA KG', 'KG', 4.92, 0.082, (SELECT id FROM purchase WHERE place = 'MERCADO E PANIFICADORA KM17' AND date = '2024-09-12')),
        ('MANTEIGA AGRANEL KG', 'KG', 7.59, 0.11, (SELECT id FROM purchase WHERE place = 'MERCADO E PANIFICADORA KM17' AND date = '2024-09-12')),

        ('FEIJÃO PRETO KG', 'KG', 5.50, 1.5, (SELECT id FROM purchase WHERE place = 'SUPERMERCADO CENTRAL' AND date = '2024-09-10')),
        ('ARROZ AGULHINHA KG', 'KG', 3.45, 2, (SELECT id FROM purchase WHERE place = 'SUPERMERCADO CENTRAL' AND date = '2024-09-10')),

        ('PÃO DE FORMA UN', 'UN', 6.30, 1, (SELECT id FROM purchase WHERE place = 'MERCADINHO DA ESQUINA' AND date = '2024-09-08')),
        ('LEITE INTEGRAL L', 'L', 3.00, 1, (SELECT id FROM purchase WHERE place = 'MERCADINHO DA ESQUINA' AND date = '2024-09-08')),

        ('MACARRÃO ESPAGUETE KG', 'KG', 2.50, 1, (SELECT id FROM purchase WHERE place = 'HIPERMERCADO BONANÇA' AND date = '2024-09-05')),
        ('MOLHO DE TOMATE UN', 'UN', 2.30, 2, (SELECT id FROM purchase WHERE place = 'HIPERMERCADO BONANÇA' AND date = '2024-09-05'));
    `)

    await db.execAsync('COMMIT TRANSACTION')
  }
  catch(ex) {
    await db.execAsync('ROLLBACK TRANSACTION')
    console.log(ex.message)
  }
  finally {
    await db.closeAsync()
  }
}