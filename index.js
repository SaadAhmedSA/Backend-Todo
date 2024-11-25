
import dotenv  from 'dotenv'
dotenv.config()
import express from 'express'
import cors from "cors"

const app = express()
const port = 3000

// middleware
app.use(cors())
app.use(express.json())
const users = [{
  title : "Saad Ahmed",
  id: Date.now()

},
{
  title : "Ali Ahmed",
  id: 1234567892

}
]

app.get('/', (req, res) => {
  res.send("Hello world")
})
app.post("/user",(req,res)=>{
  const {title} = req.body
  if(!title){
    res.status(400).json({
     message: "title is required",
   });
    return;
  }
  users.push(
    {
      id : Date.now(),
      title 
    }
  )
  res.status(201).send({
    message:"Data Added Successfully",
    data : users
  })
})
// get all user
app.get("/users", (req, res) => {
  res.status(200).json({
    data: users,
  });
});


// get single user
app.get("/user/:id", (req, res) => {
  const { id } = req.params;

  const index = users.findIndex((item) => item.id === +id);

  if (index === -1) {
    res.status(404).json({
      message: "user not found",
    });
    return;
  }

  res.status(200).json({
    data: users[index],
  });
});



// delete user

app.delete("/user/:id",(req , res)=>{
  const {id} = req.params;
  const index = users.findIndex(item => item.id === +id)
  
  if(index === -1){
    return res.status(404).json({
      message : "no user found"
    });
    
  }
users.splice(index,1);
res.status(200).json({
  message: "User deleted",
  data: users
})
})

// edited user

 app.put("/user/:id",(req,res)=>{
const { id } = req.params;
const { title } = req.body;

const index = users.findIndex(item => item.id === +id)

if(index === -1){
return res.status(404).json({
  message: "Not user found",
})

}
if(!title){
res.status(404).json({
  message : "title is required",
})
return
}
users[index].title = title
res.status(200).json({
  message: "User updated successfully",
  data: users[index],
});
 })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


