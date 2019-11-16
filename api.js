const express = require('express');
const router = express.Router();
const fs = require('fs');
let multer = require("multer");
//require("./isaface.js");

router.get('/', (req, res) => {
	fs.readFile('./index.html', (err, html) => {
    if (err) {
        throw err; 
    }  
	res.writeHeader(200, {"Content-Type": "text/html"});  
	res.write(html);  
	res.end();
	//res.send('all good');
	});
});
function makeid(length= 9){
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result+'.jpg';
 }
 let thename=makeid();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, thename)
    }
})
const upload = multer({
    storage: storage
})



router.post('/upload',  upload.single('file'), (req, res) => {
  const filename = req.file.filename;
  const path = req.file. path;
  // Call your database method here with filename and path
  res.json({'message': thename});
});

module.exports = router;