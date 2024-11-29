import * as SQLite from 'expo-sqlite';

const getConnection = async () => 
  await SQLite.openDatabaseAsync('nfce-recon', {
    useNewConnection: true
  })

export const startDatabase = async () => {
  const db = await getConnection();

  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS purchase (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        place TEXT NOT NULL,
        date TEXT
      );
    `);

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        desc TEXT NOT NULL,
        unType TEXT NOT NULL,
        val REAL NOT NULL,
        qtd REAL NOT NULL,
        purchase_id INTEGER,
        FOREIGN KEY (purchase_id) REFERENCES purchase (id) ON DELETE CASCADE
      );
    `);
  }
  catch(ex) {
    console.log(ex.message)
  }
  finally {
    await db.closeAsync()
  }
}

export const insertPurchase = async (purchase) => {
  const { place, date, items } = purchase

  const db = await getConnection()

  try {
    await db.execAsync('BEGIN TRANSACTION')

    let command = await db.prepareAsync(`
      INSERT INTO purchase (place, date) VALUES ($place, $date)
    `)

    const result = await command.executeAsync({
      $place: place,
      $date: date
    })

    const purchaseId = result.lastInsertRowId

    for(const item of items) {
      command = await db.prepareAsync(`
        INSERT INTO items (desc, unType, val, qtd, purchase_id) VALUES ($desc, $unType, $val, $qtd, $purchase_id) 
      `)

      await command.executeAsync({
        $desc: item.desc,
        $unType: item.unType,
        $val: item.val,
        $qtd: item.qtd,
        $purchase_id: purchaseId,
      })
    }

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

export const deletePurchase = async (id) => {
  const db = await getConnection()
  
  try {
    const command = await db.prepareAsync('DELETE FROM purchase WHERE id = $id')
    await command.executeAsync({ $id: id })
  }
  catch(ex) {
    console.log(ex.message)
  }
  finally {
    await db.closeAsync()
  }
}

export const getPurchases = async () => {
  const db = await getConnection()

  try {
    const result = await db.getAllAsync(`
      SELECT * FROM purchase 
        JOIN items ON items.purchase_id = purchase.id
    `)

    return result.map(linha => ({
      ...linha
    }))
  }
  catch(ex) {
    console.log(ex)
  }
  finally {
    await db.closeAsync()
  }
}

export const resetDatabase = async () => {
  const db = await getConnection()

  try {
    const command = await db.prepareAsync(`
      DELETE FROM purchase;
      DELETE FROM items;  
    `)

    await command.executeAsync()
  }
  catch(ex) {
    console.log(ex.message)
  }
  finally {
    await db.closeAsync()
  }
}