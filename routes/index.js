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

router.delete('/delete/:id',async(req,res)=>{
  const id = req.params.id
  try {
   Todo.deleteOne({_id:id})
       res.send("deleted item") 
  } catch (err) {
    res.send(err)
  }
})

module.exports = router;
