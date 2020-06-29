var d = new Date();
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
document.querySelector('.budget__title--month').innerHTML = " "+months[d.getMonth()]+" "+d.getFullYear();
document.querySelector('.budget__value').innerHTML = 0;
var i = [];
var e = [];
var i_sum;
var e_sum;
var delete_event = false;

var income = function(a, value){
    i.push({amount:value, desc:a});
};
var expenses = function(a, value){
    e.push({amount:value, desc:a});
    
};
var budget = 0;
var budgetcontroller = function(){

};
document.querySelector('.add__btn').addEventListener('click',function(){
    var option = document.querySelector('.add__type').value;
    var amount = document.querySelector('.add__value').value;
    var desc = document.querySelector('.add__description').value;
    if(option=='inc'){
        income(desc, amount);
        i_sum = 0;
        e_sum = 0;
        i.forEach((value)=>{
            i_sum+=Number(value.amount);
        })
        e.forEach((value)=>{
            e_sum+=Number(value.amount);
        })
        budget = i_sum - e_sum ;
        UIcontroller();
    }
    else{
        expenses(desc, amount);
        i_sum = 0;
        e_sum = 0;
        i.forEach((value)=>{
            i_sum+=Number(value.amount);
        })
        e.forEach((value)=>{
            e_sum+=Number(value.amount);
        })
        budget = i_sum - e_sum ;
        UIcontroller();
    }
},false);

document.querySelector('.expenses__list').addEventListener('click',function(event){
    console.log(event.target);
    var item = event.target.parentNode.parentNode.parentNode.parentNode.id;
    var id = item.split('-')[1];
    var u= event.target.parentNode.parentNode.parentNode.parentNode.removeNode;
    e.splice(Number(id),1);
    i_sum = 0;
    e_sum = 0;
    i.forEach((value)=>{
        i_sum+=Number(value.amount);
    })
    e.forEach((value)=>{
        e_sum+=Number(value.amount);
    })
    budget = i_sum - e_sum ;
    UIcontroller();
    },false);
    

document.querySelector('.income__list').addEventListener('click',function(event){
    console.log(event.target);
    var item = event.target.parentNode.parentNode.parentNode.parentNode.id;
    var id = item.split('-')[1];
    var u =event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeNode;
    i.splice(Number(id),1);
    i_sum = 0;
    e_sum = 0;
    i.forEach((value)=>{
        i_sum+=Number(value.amount);
    })
    e.forEach((value)=>{
        e_sum+=Number(value.amount);
    })
    budget = i_sum - e_sum ;
    UIcontroller();
    },false);

var UIcontroller = function(){
    var i_list = document.querySelector('.income__list');
    var e_list = document.querySelector('.expenses__list');
    var html = '';
    var inc = document.querySelector('.budget__income--value');
    inc.innerHTML = `+ ${i_sum}.00`;
    var incp = document.querySelector('.budget__income--percentage');
    var per = 100 - parseInt(e_sum*100/i_sum);
    if(isNaN(per)){
        incp.innerHTML = `---`;
    }else{
        incp.innerHTML = `${per}%`;
    }
    var exp = document.querySelector('.budget__expenses--value');
    exp.innerHTML = `- ${e_sum}.00`;
    var expp = document.querySelector('.budget__expenses--percentage');
    per =parseInt(e_sum*100/i_sum);
    if(isNaN(per)){
        expp.innerHTML = `---`;
    }else{
        expp.innerHTML = `${per}%`;
    }
    var b = document.querySelector('.budget__value');
    delete_event = true;
    if(budget>0){
        b.innerHTML = '+ '+String(budget)+'.00';
    }
    else if(budget<0){
        b.innerHTML = String(budget)+'.00';
    }
    else{
        b.innerHTML = '0';
    }
    i.forEach(function(value){
        html+=`<div class="item clearfix" id="income-${i.indexOf(value)}"><div class="item__description">${value.desc}</div>
                            <div class="right clearfix">
                                <div class="item__value">+ ${(value.amount)}.00</div>
                                <div class="item__delete">
                                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                </div>
                            </div>
                        </div>`;
    })
    i_list.innerHTML=html;
    html = '';
    e.forEach(function(value){
        html+=`<div class="item clearfix" id="expense-${e.indexOf(value)}">
        <div class="item__description">${value.desc}</div>
        <div class="right clearfix">
            <div class="item__value">- ${value.amount}.00</div>
            <div class="item__percentage">${parseInt(value.amount*100/e_sum)}%</div>
            <div class="item__delete">
                <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
            </div>
        </div>
    </div>`;
    })
    e_list.innerHTML = html;
};
