import express from 'express';
import { addUser, deleteUser, getUserByName, updateUser, createPost, getPostById, updatePost, getAllPosts } from './SQL/tables.js';
import { verifyToken } from './auth.js'
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cors from 'cors';

const app = express();
const PORT = 5000;
dotenv.config();

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors());

// Simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello, World! Your server is running!');
  });

app.post('/addUser', async (req, res) => {
  const { uname, uemail, upassword } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(upassword, salt);
  
  try{
    await addUser(uname, uemail, hashedPass);
    res.status(201).json({message:"User added successfully"});
  }
  catch(error){
    console.error(error.message);
    res.status(500).json({error: "Failed to add user"});
  }

})

app.post('/login', async (req, res) => {
  const {uname, upassword} = req.body;

  try {
    const user = await getUserByName(uname);
    if(user.length === 0)
      return res.status(404).json({error: "User not found"});
    const isMatch = await bcrypt.compare(upassword, user[0].upassword);
    if(!isMatch)
      return res.status(400).json({error: "Invalid password"});

    
    const payload = { uid: user[0].uid, uname: user[0].uname };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    return res.status(200).json({token, msg: "User registered successfully"});

  } catch (error) {
    res.status(500).json({ error: "Login failed due to database error" });
  }
})

app.get("/user/:uname", async (req, res) => {
  const uname = req.params.uname;
  
  try {
    const user = await getUserByName(uname);
    console.log(user[0]);
    if (user.length > 0) {
      res.status(200).json({
        msg: "User found",
        uid: user[0].uid,
        user: user[0].uname,
        email: user[0].uemail,
      });
    } else {
      res.status(404).json({msg: "User not found"});
  }
  } catch (error) {
    res.status(500).json({error: "Some error occured"})
  }
})

app.put('/updateUser/:uname', verifyToken, async (req, res) => {
  const uname = req.params.uname;
  const { uemail, upassword } = req.body;

  try {
    const msg = await updateUser(uname, uemail, upassword);
    if(msg.rowCount > 0)
      res.status(200).json({msg: "Data for username: " + uname + " updated successfully"});
    else
      res.status(404).json({msg: "Username not found"});

  } catch (error) {
    res.status(500).json({error: "error occured"});
  }
})

app.delete('/deleteUser/:uname', async (req, res) => {
  const uname = req.params.uname;
  const upassword = req.body.upassword;
  
  try {
    await deleteUser(uname, upassword);
    res.status(200).json({msg: "user deleted successfully", username: uname});
  } catch (error) {
    console.log(error.message);
    res.status(500).json({error: "some error occured please check console"});
  }
})

app.post('/addPost', verifyToken, async (req, res) => {
  const { title, content, status } = req.body;
  const uid = req.userDetails.uid;

  try {
      const post = await createPost(uid, title, content, status);
      res.status(201).json({ message: "Post created successfully", post });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to create post" });
  }
});

app.put('/updatePost/:id', verifyToken, async (req, res) => {
  const post_id = parseInt(req.params.id);
  const { title, content, status } = req.body;
  const uid = req.userDetails.uid;

  try {
      const post = await getPostById(post_id);
      if (!post) return res.status(404).json({ error: "Post not found" });

      if (post.uid !== uid) return res.status(403).json({ error: "Unauthorized" });

      const updatedPost = await updatePost(post_id, title, content, status);
      res.status(200).json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to update post" });
  }
});

app.get('/posts', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page
  const offset = parseInt(req.query.offset) || 0;

  try {
      const posts = await getAllPosts(limit, offset);
      res.status(200).json({ posts });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get('/posts/:id', async (req, res) => {
  const post_id = parseInt(req.params.id);

  try {
      const post = await getPostById(post_id);
      if (post) res.status(200).json({ post });
      else res.status(404).json({ error: "Post not found" });
  } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Failed to fetch post" });
  }
});
  
// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

