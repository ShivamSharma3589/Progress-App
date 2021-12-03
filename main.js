// main js goes here 
let circle = document.getElementsByClassName('circle');
let checkedInput = document.querySelectorAll('input[type="checkbox"]');
let totalInput = checkedInput.length;
let checkedCount = 0;
function progressChecker() {
    checkedCount = 0;
    for (let i = 0; i < totalInput; i++) {
        if (checkedInput[i].checked) {
            checkedCount++;
        }
    }
    return checkedCount;
}
function progress() {
    let counter = Math.floor((((checkedCount/totalInput)*360)/360) * 100);
    let cover = document.getElementById('cover');
    let val = (progressChecker()/totalInput)*360;
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
    }, 50);

}
for (let i = 0; i < totalInput; i++) {
    checkedInput[i].addEventListener('click',progress);
}

// let val = 0;
// setInterval(() => {
//     if(val < 180)
//         circle[1].style.transform = `rotate(${val++}deg)`;
//     if(val > 180)
//         circle[2].style.display = 'none';
//     if(val < 360)
//         circle[0].style.transform = `rotate(${val++}deg)`;
// }, 100);

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