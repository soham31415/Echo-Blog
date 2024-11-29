import pg from "pg";

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Blog",
    password: "soham",
    port: 5432
  });

db.connect();


export function addUser(uname, uemail, upassword) {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO users (uname, uemail, upassword) VALUES ($1, $2, $3)", [uname, uemail, upassword], (err, res) => {
        if (err)
            reject(err);
        else
            resolve(res);
    });
    })
}

export function getUserByName(uname){
    return new Promise((resolve, reject) => {
        // console.log(uname);
        db.query("SELECT * FROM users WHERE uname=$1", [uname], (err, res) => {
            if(err)
                reject(err);
            else
                // console.log(res.rows);
                resolve(res.rows);
        })
    })
}