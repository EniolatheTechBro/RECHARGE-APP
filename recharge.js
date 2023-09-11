let card = JSON.parse(localStorage.getItem('CARD'))
if(!card){
    card=[]
};

function Gen() {
    let pin = Math.floor(Math.random()*1000000000000)
    codeInput.value = pin

    // const {network,amount,pincode,code} = card

    let network = NETWORK.value
    let Amnt = Amount.value
    let pincode = pin
    let status = false
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    // let year = date.getFullYear();
    let time = hour + ':' + min
    // console.log(`${hour}:${min}`);
    let dateT = date.toLocaleDateString() 
    dateUsed = false

    let codes = {
        MTN:'*555*',
        AIRTEL:'*126*',
        GLO:'*123*',
        NINEMOBILE:'*222*'
    }

    let kode = codes[network]

    
    let cardB = {
        network,Amnt,pincode,kode,status,dateT,time,dateUsed
    }

    card.push(cardB)

    console.log(cardB);

}


function savePin(){

    console.log(card);
    localStorage.setItem('CARD',JSON.stringify(card))
    DisP()
    
}

function DisP(){

    
    card = JSON.parse(localStorage.getItem('CARD'))

    Table.innerHTML = ''
    card.forEach((elem,i)=>{

        
        Table.innerHTML +=  `   
                <tbody>
                    <tr>
                        <td scope="row">${i+1}</td>
                        <td>${elem.network}</td>
                        <td>${elem.Amnt}</td>
                        <td>${elem.kode}${elem.pincode}#</td>
                        <td>${elem.pincode}</td>
                        <td>${elem.status ? 'used' : 'unused'}</td>
                        <td>${elem.dateT};${elem.time}</td>
                        <td>${elem.dateUsed ? elem.dateT + elem.time : 'Not yet used' }</td>
                        <td><button class="delBTN" onclick="del(${i})">DEL</button></td>
                    

                    </tr>
                </tbody>
                    
        `
        rechargee.innerHTML = `
            <h3>Recharge Here:</h3>
            <input type="text" name="" id="pinInput">
        
            <button type="button" class="rechgBTN" onclick="recharge()">RECHARGE</button>
            
        `
    })

    

               
}

DisP()

let useD = false

function recharge(){
    console.log();
    
    let card = JSON.parse(localStorage.getItem('CARD'))
    let found = false
  
    card.forEach((elem,i)=>{
        
 
            let PIN = pinInput.value
        
            let kk = elem.kode
            let pp = elem.pincode
            let ccc = kk + pp + '#'
            if(PIN == ccc ){    
                if(elem.status === true){
                    useD = true
                }else{
                    
                elem.status = true
                elem.dateUsed = true
                useD = false
                alert('Recharge Successful')
                }

                found = true
            } 
            
    }) 
    
    localStorage.setItem('CARD',JSON.stringify(card))
    // console.log(card);

    
    DisP()

    
    if(useD === true){
        alert('This card has been used!!')
    }

    if(!found){
        alert('Please Input your pincode!!')
    }

    console.log(useD);

    if(!found){
        alert('please input your pin') 
    } 
    

   
    
}


function del(id){

    card.splice(id, 1)
    localStorage.setItem('CARD',JSON.stringify(card))
    DisP()

}


