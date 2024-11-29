import express from 'express';
import { addUser, getUserByName } from './SQL/tables.js';

const app = express();
const PORT = 5000;

// Middleware to parse incoming JSON requests
app.use(express.json());
app.use(express.urlencoded({extended: true}))

// Simple route to check if the server is running
app.get('/', (req, res) => {
    res.send('Hello, World! Your server is running!');
  });

app.post('/addUser', async (req, res) => {
  const { uname, uemail, upassword } = req.body;
  
  try{
    await addUser(uname, uemail, upassword);
    res.status(201).json({message:"User added successfully"});
  }
  catch(error){
    console.error(error.message);
    res.status(500).json({error: "Failed to add user"});
  }

})

app.get("/user/:uname", async (req, res) => {
  const uname = req.params.uname;
  
  try {
    const user = await getUserByName(uname);
    console.log(user[0]);
    if (user.length > 0) {
      res.status(200).json({msg: "User found", user: user[0].uname});
    } else {
      res.status(404).json({msg: "User not found"});
  }
  } catch (error) {
    res.status(500).json({error: "Some error occured"})
  }
})
  
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });