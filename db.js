const sql = require('mssql')

async () => {
    try {
        console.log("A");
        await sql.connect('Server=localhost,1433;Database=northwind;User Id=qauser;Password=password123;Encrypt=true')
        const result = await sql.query`select * from customers`;
        console.log(result);
    } catch (err) {
        console.log("error " + err);

    }
}