import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Blog",
    password: "soham",
    port: 5432
  });

db.connect();

db.query("select * from us", (err, res) => {
    if (!err)
        console.log(res.rows);
    else
        console.log(err);
})