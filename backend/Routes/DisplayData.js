const express = require('express');
const router = express.Router();

router.post('/fooddata',(req,res)=>{
try{ 
    res.send([global.food_cat,global.food_rest])

}catch(error){
  console.error(error.message);
  res.send("server error:"+error.message)


}
})


module.exports = router;
