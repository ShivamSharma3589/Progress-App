// main js goes here 
let circle = document.getElementsByClassName('circle');
let checkedInput = document.querySelectorAll('input[type="checkbox"]');
let totalInput = checkedInput.length;
let checkedCount = 0;
let storeData = [];

function progressChecker() {
    checkedCount = 0;
    for (let i = 0; i < totalInput; i++) {
        storeData[i] = false;
        if (checkedInput[i].checked) {
            checkedCount++;
            storeData[i] = true;
        }
    }
    document.getElementById('completed').innerHTML = checkedCount;
    window.localStorage.setItem('key',JSON.stringify(storeData));
    return checkedCount;
}

function progress() {
    let counter = Math.floor((((checkedCount/totalInput)*360)/360) * 100);
    let cover = document.getElementById('cover');
    let val = (progressChecker()/totalInput)*360;
    let status = document.getElementById('status');
    console.log(val);
    if(val <= 360)
        circle[0].style.transform = `rotate(${val}deg)`;
    if(val < 180){
        circle[1].style.transform = `rotate(${val}deg)`;
    }
    else{
        circle[1].style.transform = `rotate(180deg)`;
    }
    if(val >= 180)
        circle[2].style.opacity = '0';
    else
        circle[2].style.opacity = '1';

    let percentage = Math.floor((val/360) * 100);
    cover.innerHTML = counter;
    let counterInterval = setInterval(() => {
        if (percentage > counter) {
            cover.innerHTML = `${++counter}%`;
        } else if (percentage < counter) {
            cover.innerHTML = `${--counter}%`;            
        }
        if (percentage == counter){
            clearInterval(counterInterval);
        }
        if (counter == 100) {
            status.innerHTML = '--Tasks Completed--';
        } else {
            status.innerHTML = `In Progress . . .`;
        }
    }, 50);

}

for (let i = 0; i < totalInput; i++) {
    checkedInput[i].addEventListener('click',progress);
}

window.addEventListener('load', ()=>{
    document.getElementById('total').innerHTML = totalInput;
    let records = window.localStorage.getItem('key');
    if (records != null) {
        storeData = JSON.parse(records);
        for (let i = 0; i < totalInput; i++) {
            checkedInput[i].checked = storeData[i];
        }
        progress();
    }
})

// function fileManagement() {//retrieves items in the localStorage
//         console.log("retrieve records");
//         let records = window.localStorage.getItem('key');
//         if (records == null) {
            
//         }
// }

/*
function store(){ //stores items in the localStorage
    var brand = document.getElementById('carBrand').value;
    var price = document.getElementById('carPrice').value;
    var key = document.getElementById('key').value; //gets the key from the user

    const car = {
        brand: brand,
        price: price,
    }

    window.localStorage.setItem(key,JSON.stringify(car));  
    //converting object to string
}

function retrieveRecords(){ //retrieves items in the localStorage
    console.log("retrieve records");
    var key = document.getElementById('retrieveKey').value;
    var records = window.localStorage.getItem(key);
    var paragraph = document.createElement("p");
    var infor = document.createTextNode(records);
    paragraph.appendChild(infor);
    var element = document.getElementById("retrieve");
    element.appendChild(paragraph);
}

function removeItem(){  //deletes item from localStorage
    var key = document.getElementById('removeKey').value;
    localStorage.removeItem(key)
    console.log("remove items");
}
function clearStorage(){ 
    //clears the entire localStorage
    localStorage.clear()
    console.log("clear records");
}
window.onload =function(){ //ensures the page is loaded before functions are executed.
    document.getElementById("carForm").onsubmit = store
    document.getElementById("clearButton").onclick = clearStorage
    document.getElementById("removeButton").onclick = removeItem
    document.getElementById("retrieveButton").onclick = retrieveRecords
}
*/


/*
// Get the root element
let root = document.querySelector(':root');

// Create a function for getting a variable value
function myFunction_get() {
  // Get the styles (properties and values) for the root
  let rootStyle = getComputedStyle(root);
  // Alert the value of the --blue variable
  alert("The value of --blue is: " + rootStyle.getPropertyValue('--blue'));
}

// Create a function for setting a variable value
function myFunction_set() {
  // Set the value of variable --blue to another value (in this case "lightblue")
  root.style.setProperty('--blue', 'lightblue');
}
*/
