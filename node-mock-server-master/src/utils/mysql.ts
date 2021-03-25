const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'diarydb'
})

// 接收第一参数一个sql语句
// 接收第二参数values，可以使用mysql的占位符 '?'
// query(`select * from my_database where id = ?`, [1])

let query = function (sql: any, values: any) {
    // 返回一个 Promise
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err: any, connection: { query: (arg0: any, arg1: any, arg2: (err: any, rows: any) => void) => void; release: () => void }) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        console.log(`SQL error: ${err}!`);
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}

export { query }
