let circle = document.getElementsByClassName('circle'); //circle class divs
let checkedInput = document.querySelectorAll('input[type="checkbox"]'); //all input[checkbox]
let totalInput = checkedInput.length;   //counting the number of input
let checkedCount = 0;   //counter variable for sequence checking 
let storeData = [];     //creating array to store data locally

// function check the number of input checked 
function progressChecker() {
    checkedCount = 0;   //reset to 0 first then starts count
    for (let i = 0; i < totalInput; i++) {
        storeData[i] = false;   //presuming the value to be false 
        if (checkedInput[i].checked) {
            checkedCount++;     //increasing the counter by 1
            storeData[i] = true;    //setting the value true along 
        }
    }
    document.getElementById('completed').innerHTML = checkedCount;  //printing the number of task completed
    window.localStorage.setItem('key', JSON.stringify(storeData));  //storing the data locally in the form of string
    return checkedCount;
}

// function manage the rounded progress bar and percentage value of cover section 
function progress() {
    // to claculate the percentage 
    let counter = Math.floor((((checkedCount / totalInput) * 360) / 360) * 100);
    let cover = document.getElementById('cover');
    let val = (progressChecker() / totalInput) * 360;   //to calculate the degree
    let status = document.getElementById('status');     //for transformation of sub-heading
    let percentage = Math.floor((val / 360) * 100);     //now converting the degree into practical
    cover.innerHTML = counter;  //changing the value of cover

    // creating set interval section 
    let counterInterval = setInterval(() => {

        // section for counting animation 
        // for increasing animation 
        if (percentage > counter) {
            cover.innerHTML = `${++counter}%`;
        } else if (percentage < counter) {  //for decreasing animation 
            cover.innerHTML = `${--counter}%`;
        }
        if (percentage == counter) {
            clearInterval(counterInterval);   //for stoping the interval
        }
        // for changing the sub heading 
        if (counter == 100) {
            status.innerHTML = '--Tasks Completed--';
        } else {
            status.innerHTML = `In Progress . . .`;
        }

        // section for rotation of progress bar 
        let shortValue = counter * 360 / 100;
        // for first circle 
        if (shortValue <= 360)
            circle[0].style.transform = `rotate(${shortValue}deg)`;
        // for second circle 
        if (shortValue < 180) {
            circle[1].style.transform = `rotate(${shortValue}deg)`;
        }
        else {
            circle[1].style.transform = `rotate(180deg)`;
        }
        // for third circle 
        if (shortValue >= 180)
            circle[2].style.opacity = '0';
        else
            circle[2].style.opacity = '1';
    }, 25);

}

// to trigger the click event on every input  
for (let i = 0; i < totalInput; i++) {
    checkedInput[i].addEventListener('click', progress);
}

window.addEventListener('load', () => {
    document.getElementById('total').innerHTML = totalInput;    //onload show total tasks
    let records = window.localStorage.getItem('key');       //for retreive the data 
    if (records != null) {  //in case no previous data maintained
        storeData = JSON.parse(records);    //retrieving the arrays
        for (let i = 0; i < totalInput; i++) {
            checkedInput[i].checked = storeData[i]; //now loading the values 
        }
        progress();     //clling the function progress for touch up 
    }
})
