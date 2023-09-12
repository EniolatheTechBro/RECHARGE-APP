let card = JSON.parse(localStorage.getItem('CARD'))
if(!card){
    card=[]
};

function Gen() {
    let pin = Math.floor(Math.random()*1000000000000)
    codeInput.value = pin

    // const {network,amount,pincode,code} = card

}

genBTN.addEventListener('click', ()=>{
    if(NETWORK.value !== '' && Amount.value !== ''){
        Gen()
    }
})

saveBTN.addEventListener('click',()=>{

    if(NETWORK.value !== '' && Amount.value !== ''){
            savePin()
    }
    
})

function savePin(){
    
    let network = NETWORK.value
    let Amnt = Amount.value
    let pincode =  codeInput.value
    let status = false
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    // let year = date.getFullYear();
    let time = hour + ':' + min

    let timeused = '';

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
        network,Amnt,pincode,kode,status,dateT,time,dateUsed,timeused
    }

    card.push(cardB)

    console.log(cardB);


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
                        <td>${elem.dateUsed ? elem.dateT + elem.timeused : 'Not yet used' }</td>
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

  
    let card = JSON.parse(localStorage.getItem('CARD'))
    let found = false
  
    card.forEach((elem,i)=>{

        

            let PIN = pinInput.value.trim();
            let cardcode = elem.kode + elem.pincode + '#';
            if(PIN == cardcode ){    
                if(elem.status === true){
                    useD = true
                }else{
                    
                elem.status = true
                elem.dateUsed = true
                useD = false
             
                // alert('Recharge Successful')
                disModal('Recharge Successful')
                }

                found = true
            }
            
    }) 
    
    localStorage.setItem('CARD',JSON.stringify(card))
    // console.log(card);

    
    let date = new Date();
    let hour = date.getHours();
    let  min = date.getMinutes();
    let timeused = hour + ':' + min;
    
    console.log(timeused);
    
    DisP()

    if(!found){
        alert('Please Input your pincode!!')
         useD = false
    }
    
    if(useD === true){
        alert('This card has been used!!')
    }

    

    console.log(useD);
  
    
}


function del(id){

    card.splice(id, 1)
    localStorage.setItem('CARD',JSON.stringify(card))
    DisP()

}

function disModal(messg){
    messagediv.innerHTML = `
    
        <div class="Mesgdiv">

            ${messg}
        
        
        </div>
    
    
    `
}


