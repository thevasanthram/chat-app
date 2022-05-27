const express = require("express")
const crypto = require('crypto');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose') 
const User = require('./model/user');


const algorithm = 'aes-256-ctr';
const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3';

const encrypt = (text) => {
    
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    };
};

const decrypt = (hash) => {

    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'));

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);

    return decrpyted.toString();
};

const app = express()

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended: false}))
app.set('view engine' , 'ejs')

app.get('/' ,(req, res)=>{
    res.send('hello world')
})

app.get('/register' , (req, res)=>{
    res.render(path.join(__dirname,'/public/register.ejs'))
})

app.listen(80, () => {
    console.log('server listening on port 800')
})
