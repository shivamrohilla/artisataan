const express = require('express')

const app = express()

// const mysql = require('mysql2')

// const connection = mysql.createConnection({

//     host: 'localhost' , 
//     database : 'mytestdb' , 
//     user: 'myuser' , 
//     password : 'mypass'
// })


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.set('view engine' , 'hbs')
app.use('/' ,express.static(__dirname +'/public'))

let currentUser= 'temp'

let users= new Map()

users.set('temp' , {items: []})

app.get('/' , (req , res)=>{

    res.redirect('/index')
})

app.post('/signup' , (req , res)=>{

    
    console.log(req.body)

    users.set(req.body.email , {pass: req.body.pass , name: req.body.name , phone: req.body.phone  , items: [] , wishlist: []})

    console.log(users)
    res.render('login' , {response:"Account Created"})

})

app.post('/login' , (req , res)=>{

    if(users.has(req.body.email)){

        if(users.get(req.body.email).pass== req.body.pass){

            res.render('profile' , {name : users.get(req.body.email).name })
            currentUser = req.body.email
        }
        else{

            res.render('login' , {response : "Incorrect password"})
        }

    }

    else{

        res.render('login' , {response : "Account does not exist"})

    }
})

app.get('/checkout'  , (req , res)=>{

    let total =0
    for(i of users.get(currentUser).items){

        total += parseInt(i.amount)

    }

    if(currentUser==='temp'){

        
        res.render('checkout' , { items: users.get(currentUser).items , total , s:"SIGN IN" , path:"/login.html"})    
    
        }
    else{
    
        
        res.render('checkout' , { items: users.get(currentUser).items , total , s:"SIGN OUT" , path:"/signout"})    
    
    }
    
})

app.post('/additem' , (req , res)=>{

    flag =1;
    for(i of users.get(currentUser).items){

        if(i.src === req.body.item.src){

            if(req.body.item.value){

                i.value = req.body.item.value

            }
            else{

                i.value = i.value +1;
            }
            flag =0;

            i.amount = i.value * parseInt(i.price)
        }

    }

    if(flag){

        users.get(currentUser).items.push({amount :req.body.item.price ,value: 1 , src: req.body.item.src , price : req.body.item.price})

    }
    
    res.send("")
  
})

app.post('/delitem', (req , res)=>{

    for(let i=0;i<users.get(currentUser).items.length;i++){

        if(users.get(currentUser).items[i].src === req.body.item.src){

            users.get(currentUser).items.splice(i , 1)
            break
         }
    }
    res.send("")
})

app.get('/index' , (req , res)=>{

    if(currentUser==='temp'){

    res.render('index' , {s:"SIGN IN" , path : "/login.html" , wish: false})

    }
    else{

        res.render('index' ,{s:'SIGN OUT' , path : "/signout" , wish : true} )

    }
})
app.get('/signout' , (req , res)=>{

    currentUser='temp';
    res.redirect('/index')
})

app.get('/wishlist' , (req , res)=>{

    res.render('wishlist' , { items: users.get(currentUser).wishlist , s:"SIGN OUT" , path:"/signout"})    

})

app.post('/wishadd' , (req , res)=>{

    flag =1;
    for(i of users.get(currentUser).wishlist){

        if(i.src === req.body.item.src){

          
            flag =0;
            break;
        }

    }

    if(flag){

        users.get(currentUser).wishlist.push({src: req.body.item.src , price : req.body.item.price})

    }
    
    res.send("")
})

app.post('/delitemwish', (req , res)=>{

    for(let i=0;i<users.get(currentUser).wishlist.length;i++){

        if(users.get(currentUser).wishlist[i].src === req.body.item.src){

            users.get(currentUser).wishlist.splice(i , 1)
            break
         }
    }
    res.send("")
})

app.listen(4455 , ()=>{

    console.log("Server started on http://localhost:4455")
})