
let rests;
let RestDivArr = [];
let shetchik = 0;
let RestDivArr1 = [];
let shetchik1 = 0;

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
				NewElement.innerHTML=`

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
						<button class = "form-control but" style="font-style: italic;"> Выбрать </button>    
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

				}

		}
		

}


Find.addEventListener('click',poisk);




getData();



