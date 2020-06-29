
let rests;
let RestDivArr = [];
let shetchik = 0;
let RestDivArr1 = [];
let shetchik1 = 0;
let Summa=0;
let price_value;
let a;
let Restaurant;
let costs = [];

let delievery_discount = document.getElementById('student_discount');
let move_delievery = document.getElementById('fast_delievery');
let twice_delievery = document.getElementById('double_delievery');

function getData(){
	let obXhr = new XMLHttpRequest();

		let okrug = document.getElementById('Adm');
		let rayon = document.getElementById('Rayon');
		let type = document.getElementById('Tip');

		
		obXhr.open('GET', 'http://exam-2020-1-api.std-400.ist.mospolytech.ru/api/data1');
		obXhr.send();
		
		obXhr.onreadystatechange = function(){
			if(obXhr.readyState != 4) {return;}


			if(obXhr.response){
				let result = JSON.parse(obXhr.response);
				console.log(result);
				rests=result;

				let okruga=[];



				for(let i in result)
				{
					okruga.push(result[i].admArea);

				}
				console.log(okruga);
				let filter_okruga=sort(okruga);
				console.log(filter_okruga);
				
				

				for(let i=0; i<filter_okruga.length; i++)
				{

				let NewElement=document.createElement('option');
				NewElement.innerHTML=`

				${filter_okruga[i]}

				`
				okrug.append(NewElement);
				}






				let rayoni=[];




				for(let i in result)
				{
					rayoni.push(result[i].district);

				}
				console.log(rayoni);
				let filter_rayoni=sort(rayoni);
				console.log(filter_rayoni);
				
				

				for(let i=0; i<filter_rayoni.length; i++)
				{

				let NewElement=document.createElement('option');
				NewElement.innerHTML=`

				${filter_rayoni[i]}

				`
				rayon.append(NewElement);
				}

				

				let types=[];


				for(let i in result)
				{
					types.push(result[i].typeObject);

				}
				console.log(types);
				let filter_types=sort(types);
				console.log(filter_types);
				
				

				for(let i=0; i<filter_types.length; i++)
				{

				let NewElement=document.createElement('option');
				NewElement.innerHTML=
				`

				${filter_types[i]}

				`
				type.append(NewElement);
				}



			}


		}	

	}

function sort(a) {

    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
 
    return a;
};

function poisk()
{
	let okrug_name=document.getElementById('Adm').value;
	let rayon_name=document.getElementById('Rayon').value;
	let type_name=document.getElementById('Tip').value;
	let priveligii_name=document.getElementById('Privelegii').value;



	let Mesta = document.getElementById('Mesta');
			Mesta.innerHTML = "";
			
			let MenuBlock = document.getElementById('menu');
			
			let SpisokRestoranov = document.getElementById('spisok_restoranov');
	for (let i in rests)
	{

		if ((rests[i].admArea==okrug_name) && (rests[i].district== rayon_name) && (rests[i].typeObject==type_name) && (rests[i].socialPrivileges==priveligii_name)) 
		{
				console.log(rests[i]);
				




				

				spisok_restoranov.innerHTML = 

				`
				<div class = "row border border-secondary ml-3 mr-3">
					<div class = "col-3" >
						<h3 style="font-style: italic;"> Название </h3>
					</div>
							
					<div class = "col-3">
						<h3> Тип </h3>
					</div>
							
					<div class = "col-4">
						<h3> Адрес </h3>
					</div>
							
					<div class = "col-2">
						<h3> Действия </h3>
					</div>
				</div>	

			`

				let newDiv = document.createElement('div');
				newDiv.className = "row border border-secondary ml-3 mr-3";


				/*let NewElement=document.createElement('div');
				NewElement.innerHTML=*/

				newDiv.innerHTML =


				`

				<div class = "col-3 mt-3">
						<h6 style="font-style: italic;"> ${rests[i].name} </h6>
					</div>
								
					<div class = "col-2 mt-3">
						<h6 style="font-style: italic;"> ${rests[i].typeObject} </h6>
					</div>
								
					<div class = "col-4 mt-3 text-danger">
						<h6 style="font-style: italic;"> ${rests[i].address} </h6>
					</div>


								
					<div class = "col-3 mt-2">
						<button class = "form-control but" style="font-style: italic;" id="button1"> Выбрать </button>    
					</div>

				`




				RestDivArr.push(newDiv);
					
				if (shetchik < 10){
					Mesta.append(newDiv);
				}
					
				shetchik++;
					
				if (shetchik == 20){
					break;
				}

				//spisok_restoranov.append(NewElement);

				button1.addEventListener('click',Choose);

				}

		}
		
}


function Choose()
{
	
	let Rest;
	
		let Name = event.target.parentNode.parentNode.children[0].children[0].innerText;  
		let Address = event.target.parentNode.parentNode.children[2].children[0].innerText;
		let Type = event.target.parentNode.parentNode.children[1].children[0].innerText;
		
		for (let key in rests){
			if (rests[key].address == Address && rests[key].name == Name && rests[key].typeObject == Type){
				Rest = rests[key];
			}
		}
	
	let Prices = Object.values(Rest); 
	
	
	Prices.splice(0, 15);  


	let obXhr = new XMLHttpRequest();
	
	obXhr.open('GET', 'json');
	obXhr.send();


	let ShowMenu = document.getElementById('menu');
	console.log(ShowMenu);

	ShowMenu.innerHTML = '';



	obXhr.onreadystatechange = function(){
		if(obXhr.readyState != 4) return;

		if(obXhr.response){
			let result = JSON.parse(obXhr.response);
			
			console.log(result);
	
			for (let i in result){
				let set = document.createElement('div');
				set.className = "col-xl-4 col-md-6 col-12"




				set.innerHTML = `
				
					<p> <img src = "${result[i].img}" width = "100%" style="border-radius: 100px;  box-shadow: 0 0 0 3px green, 0 0 13px #333;"> </p>
					<h4 class = "text-center MenuName" style="font-style: italic;  color: #fac564;"> ${result[i].Name} </h4>
					<p class = "opinion text-center" style="font-style: italic; color: white;"> ${result[i].Description} </p>
					<h4 class = "text-center" style="font-style: italic; color: #fac564 ;"> <span>${Prices[i]}</span> руб. </h4>
					<div class = "text-center mb-3">
						<button class="delete"> - </button>
						<div class = "Amount"; style = "width: 100px; display: inline-block; border: 2px solid white; ; color: white"> 0 </div>
						<button class="add"> + </button> 
					</div>
					
				`
				
				ShowMenu.append(set);		
			}

			zakaz();
		}
	}
	
}


function delete_value()
{

	if (event.target.parentNode.children[1].innerText > 0)
	{
	event.target.parentNode.children[1].innerText--;
	
	let price_value = event.target.parentNode.parentNode.children[3].children[0].innerText;

	
	Summa = Number(Summa) - Number(price_value);

	
	let Total = document.getElementById('Total');
	console.log(Total);
	
	Total.innerHTML = '';
	
	let newH2 = document.createElement('h2');
	
	newH2.innerHTML = 
	`
	Итого: ${Summa} Руб.
	`
	
	Total.append(newH2);
}
}


function add_value()
{
	if (event.target.parentNode.children[1].innerText>=0)
	{
		event.target.parentNode.children[1].innerText++;
	
	
	let Price = event.target.parentNode.parentNode.children[3].children[0].innerText;

	
	Summa = Number(Summa) + Number(Price);
	console.log(Summa);
	
	let Total = document.getElementById('Total');
	console.log(Total);
	
	Total.innerHTML = '';
	
	let newH2 = document.createElement('h2');
	
	newH2.innerHTML = 
	`
	<span style="font-style: italic; color: #fac564;">Итого: ${Summa} Руб.</span>
	`
	
	Total.append(newH2);
}
}

function zakaz()
{
	let removal =document.querySelectorAll('.delete');

			for( let i of removal) 

			{
				i.addEventListener('click', delete_value);
			}


			let addition = document.querySelectorAll('.add');
			
			for (let i of addition)
			{
				i.addEventListener('click', add_value);
			}
}

function Deleveiry_discount()
{
	




	let skidka=0;
	
	if (delievery_discount.checked)
	{
		skidka = Summa / 10;
		Summa = Summa - skidka;
	}
	else
	{
		skidka = Summa / 9;
		Summa = Summa + skidka;
	}
	
	Summa = Math.floor(Summa);
	
	let Total = document.getElementById('Total');
	Total.innerHTML = '';	
	let newH2 = document.createElement('h2');
	newH2.innerHTML = 
	`
	<span style="font-style: italic; color: #fac564;">Итого: ${Summa} Руб.</span>
	`
	Total.append(newH2);
}

function Deleveiry_fast()
{

	
	

	let skidka_1;
	
	if (move_delievery.checked)
	{
		let skidka_1 = Summa / 5;
		Summa = Summa + skidka_1;
	}
	else
	{
		let skidka_1 = Summa / 6;
		Summa = Summa - skidka_1;
	}
	
	Summa = Math.floor(Summa);
	
	let Total = document.getElementById('Total');
	Total.innerHTML = '';	
	let newH2 = document.createElement('h2');
	newH2.innerHTML = 
	`
	<span style="font-style: italic; color: #fac564;">Итого: ${Summa} Руб.</span>
	`
	Total.append(newH2)
}

function Deleveiry_double()
{



	let skidka2;

	if (twice_delievery.checked)
	{
		let skidka2 = Summa * 0.6;
		Summa = Summa + skidka2;
	}
	else
	{
		Summa = Summa / 1.6;
	}
	
	Summa = Math.floor(Summa);
	
	let Total = document.getElementById('Total');
	Total.innerHTML = '';	
	let newH2 = document.createElement('h2');
	newH2.innerHTML = 
	`
	<span style="font-style: italic; color: #fac564;">Итого: ${Summa} Руб.</span>
	`
	Total.append(newH2);
}



Find.addEventListener('click',poisk);
delievery_discount.addEventListener('click', Deleveiry_discount);
move_delievery.addEventListener('click',Deleveiry_fast);
twice_delievery.addEventListener('click',Deleveiry_double);
//button1.addEventListener('click',Choose);


getData();
//Choose();



