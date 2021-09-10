
let cartbuttons = $('.btn-add')
let removebuttons = $('.btn-remove')
let wishlistbuttons = $('.btn-wish')
let removewishbuttons = $('.btn-wishremove')
let qtys = $('.qty')

let items =[]

for(i in wishlistbuttons){

    let btn  = wishlistbuttons[i]
    wishlistbuttons[i].onclick =  function(){

        console.log(btn.parentElement.innerText)
        let img = btn.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('img-container')[0].getElementsByTagName('img')[0]

        console.log(img.src)

        let i = {

            price:btn.parentElement.getElementsByClassName('price')[0].innerText ,
            src : img.src
        }
        

        
       

        $.post('/wishadd' , {item : i} , (data)=>{
            console.log("Posted")
        })

    }
}

for(i in cartbuttons){

    let btn  = cartbuttons[i]
    cartbuttons[i].onclick =  function(){

        console.log(btn.parentElement.innerText)
        let img = btn.parentElement.parentElement.parentElement.parentElement.getElementsByClassName('img-container')[0].getElementsByTagName('img')[0]

        console.log(img.src)

        let i = {

            price:btn.parentElement.getElementsByClassName('price')[0].innerText ,
            src : img.src
        }
        
       

        $.post('/additem' , {item : i} , (data)=>{
            console.log("Posted")
        })

    }
}

for(i in removebuttons){

    let btn  = removebuttons[i]
    btn.onclick =  function(){

        $.post('/delitem' , {item : {src : btn.name}} ,(data)=>{

            console.log(btn.name)
            let del = btn.parentElement.parentElement
            del.remove()
        })

    }
}

for(i in removewishbuttons){

    let btn  = removewishbuttons[i]
    btn.onclick =  function(){

        $.post('/delitemwish' , {item : {src : btn.name}} ,(data)=>{

            console.log(btn.name)
            let del = btn.parentElement.parentElement
            del.remove()
        })

    }
}

for(i in qtys){

    let att = qtys[i];

    att.onchange = function(){

        $.post('/additem' , {item : {value : att.value , src: att.name}} , (data)=>{

        location.reload()
            
        })

    }
}



   

