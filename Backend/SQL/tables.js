import pg from "pg";
import dotenv from 'dotenv';

dotenv.config();

const db = new pg.Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT
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
            if(err){
                reject(err);
            }
            else{
                console.log(res.rows);
                resolve(res.rows);
            }
        })
    })
}

export function updateUser(uname, uemail, upassword){
    return new Promise((resolve, reject) => {
        db.query("UPDATE users SET uemail = $1, upassword = $2 WHERE uname = $3", [uemail, upassword, uname], (err, res) => {
            if(err)
                reject(err);
            else
                resolve(res);
        });
    })
}

export function deleteUser(uname, upassword){
    return new Promise((resolve, reject) => {
        db.query("SELECT upassword FROM users WHERE uname = $1", [uname], (err, res) => {
            if(err){
                console.err(err.stack);
                reject(err);
            }
            else if(res.rows.length === 0){
                reject(new Error("User not found"));
            }
            else{
                if(upassword !== res.rows[0].upassword)
                    reject(new Error("Invalid password"));
                else{
                    db.query("DELETE FROM users WHERE uname = $1", [uname], (err, res) => {
                        if(err)
                            reject(err);
                        else if(res.rowCount === 0)
                            reject(new Error("Could not delete user"))
                        else
                            resolve(res);
                    });
                }
            }
        })
    })
}

export function createPost(uid, title, content, status) {
    return new Promise((resolve, reject) => {
        db.query(
            "INSERT INTO posts (uid, title, content, status, created_at, updated_at) VALUES ($1, $2, $3, $4, NOW(), NOW()) RETURNING *",
            [uid, title, content, status],
            (err, res) => {
                if (err) reject(err);
                else resolve(res.rows[0]);
            }
        );
    });
}

export function getPostById(post_id) {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM posts WHERE post_id = $1", [post_id], (err, res) => {
            if (err) reject(err);
            else resolve(res.rows[0]);
        });
    });
}

export function updatePost(post_id, title, content, status) {
    return new Promise((resolve, reject) => {
        db.query(
            "UPDATE posts SET title = $1, content = $2, status = $3, updated_at = NOW() WHERE post_id = $4 RETURNING *",
            [title, content, status, post_id],
            (err, res) => {
                if (err) reject(err);
                else resolve(res.rows[0]);
            }
        );
    });
}

export function getAllPosts(limit, offset) {
    return new Promise((resolve, reject) => {
        db.query(
            "SELECT * FROM posts ORDER BY created_at DESC LIMIT $1 OFFSET $2",
            [limit, offset],
            (err, res) => {
                if (err) reject(err);
                else resolve(res.rows);
            }
        );
    });
}