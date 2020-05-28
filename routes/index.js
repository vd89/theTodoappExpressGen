var express = require('express');
var router = express.Router();
const Todo = require('../model/todo')

/* GET home page. */
router.get('/',async function(req, res, next) {
  await Todo.find({},(err,data) => {
    if (err) {
      res.send(err)
    } else {
      res.render('index',{todos:data})
    }
  })
});

router.post('/submit', async (req,res) => {
  // console.log(req.body);
  const todo_item = new Todo(req.body)
  console.log(todo_item);
  try {
    await todo_item.save()
    await Todo.find({},(err,data) => {
      if (err) {
        res.send(err)
      } else {
        res.render('index',{todos:data})
      }
    })
  } catch (error) {
    res.send(error)
  }
})

router.post('/delete/:id',async(req,res)=>{
  try {    
    const id = req.params.id
   await Todo.deleteOne({_id:id},(err)=>{
       if (err) {
         res.send(err)
       } else {
         res.redirect('/')
       }
     })
  } catch (error) {
    res.send(error)
  }
})

router.post('/edit/:id', (req,res) => {
  
    const id = req.params.id
    // console.log(`Edit task`);
    const {task} = req.body
    console.log(task);
    Todo.findByIdAndUpdate({_id:id},{$set: {item:task}},{useFindeAndModify:false},err=>{
      if (err) {
        res.send(err)
      } else {
        res.redirect('/')
      }
    })
})
module.exports = router;
