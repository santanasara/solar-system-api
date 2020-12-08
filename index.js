
const express = require('express')
const app = express()
const port = process.env.PORT || 5000

var fs = require("fs"), json;

app.get('/', (req, res) => {
  
  let filter = req.query.filter;
  let searchBy = req.query.searchBy;

  fs.readFile("data.json", "utf8", function(err, data){
    if(err) throw err;

    var data = JSON.parse(data);

    if(filter === undefined){
        filter = '';    
    }
    filter.replace(/'/g, '');

    const result = data.filter((item) => {
        if(searchBy === 'title'){
            if(item.title.toLowerCase().includes(filter.toLowerCase())){
                return item;
            }
        }else if(searchBy === 'category'){
            if(item.category.toLowerCase().includes(filter.toLowerCase())){
                return item;
            }
        }
        
    });
    
    if(result === []){
        res.sendStatus(404);
    }
    res.send(result);
});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

