const someObject = {

};

btn.onclick = function () {
    someKey = document.getElementById("key").value;
    someValue = document.getElementById("value").value;
    if (someKey == "" || someValue == "") {
        alert("Заполните поля");
    } else
    someObject[someKey] = someValue;
    console.log(someObject);
    
};

let keys = document.getElementById("someObject");
for (const key in someObject) {
    keys.innerHTML += `
    <ul>${key} = ${someObject[key]}</ul>
    `; 
};