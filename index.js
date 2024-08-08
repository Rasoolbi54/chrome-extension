
let myLeads = [];
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
let deletebtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");



const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"))
if(leadsFromLocalStorage){
  myLeads = leadsFromLocalStorage;
  render(myLeads)
}



tabBtn.addEventListener("click", ()=>{


  // chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
      
  // });
   
   chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
       console.log(tabs);
       myLeads.push(tabs[0].url);
       inputEl.value = "";
       localStorage.setItem("myLeads", JSON.stringify(myLeads));
       render(myLeads)
   })

   
})

function render(leads){
  let listItems = ""
  for(let i = 0; i<leads.length; i++){
        listItems += `
        <li>
          <a target="_blank" href="${leads[i]}">
          ${myLeads[i]}
          </a>
        </li>
        `
      
      

  }
  ulEl.innerHTML = listItems;   
}

deletebtn.addEventListener("dblclick" , ()=>{

  localStorage.clear();
  myLeads = [];
  render(myLeads);
})

inputBtn.addEventListener("click", function(){
     myLeads.push(inputEl.value);
     inputEl.value = ""
     localStorage.setItem("myLeads", JSON.stringify(myLeads))
     render(myLeads)
     console.log(localStorage.getItem("myLeads"));
})





