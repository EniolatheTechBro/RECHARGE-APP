let card =  []
let reSet = false

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
    let year = date.getFullYear();
    let time = hour + ':' + min
    // console.log(`${hour}:${min}`);
    let dateT = date.toLocaleDateString() 
    dateUsed = false


    // console.log(`${dateT}`);

    
        if(network === 'MTN'){

        kode = '*555*'

        }
        if(network === 'GLO'){

        kode = '*123*'

        }
        if(network === '9MOBILE'){

        kode = '*222*'

        }
        if(network === 'AIRTEL'){

        kode = '*126*'

        }
    
    let cardB = {
        network,Amnt,pincode,kode,status,dateT,time,dateUsed
    }

    card.push(cardB)

    // console.log(cardB);

}


function savePin(){

    console.log(card);
    localStorage.setItem('CARD',JSON.stringify(card))
    DisP()
    
}

function DisP(index){

    
    let card = JSON.parse(localStorage.getItem('CARD'))

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

                    </tr>
                </tbody>
                    
        `
        rechargee.innerHTML = `
            <h3>Recharge Here:</h3>
            <input type="text" name="" id="pinInput">
        
            <button type="button" class="rechgBTN" onclick="recharge(${i})">RECHARGE</button>
            
        `
    })

               
}
DisP()

function recharge(index){
    console.log(index);
    
    card.forEach((elem,i)=>{

        
        let card = JSON.parse(localStorage.getItem('CARD'))
    
        if(i===index){
            
            let PIN = pinInput.value
        
            let kk = elem.kode
            let pp = elem.pincode
            let ccc = kk + pp + '#'
            if(PIN == ccc || PIN.length === 18){
            
                elem.status = true
                elem.dateUsed = true
                alert('Recharge Successful')
                reSet = true
            }else if(PIN !== ccc){
                elem.status = false
                alert('please input your pin') 
            } 
        }
    }) 


    localStorage.setItem('CARD',JSON.stringify(card))
    console.log(card);

    
    DisP()
    
}


