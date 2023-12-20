const table = document.querySelector(".table")
const USER_API = "https://64340de21c5ed06c958dd2da.mockapi.io/users/"
const formInput = document.querySelectorAll(".form input")
const addUserBtn = document.querySelector(".form button")


console.log(formInput);
/*
GET 
POST
PATCH
PUT
DELETE
*/

// Промис

getUsers();

// ADD_USER

let data = {}

formInput.forEach((input) => {
    input.addEventListener("keyup",(e) => {
        const {name,value} = e.target
        data[name] = value
    })
})

addUserBtn.addEventListener("click",(e) => {
    e.preventDefault()
    if(!!Object.keys(data).length){
        fetch(USER_API,{
            method:"POST",
            body:JSON.stringify(data),
            headers:{
                "Content-Type":"application/json",
            },
        })
        .then ((data) => data.json())
        .then((data) => {
            clearInputs()
            getUsers()

            data = {};
        })
    }
})

function getUsers(){
    fetch(USER_API)
    .then ((data) => data.json())
    .then((data) => {
        table.innerHTML = "";
        console.log(data);
        displayTable(data)
    
    })
}

function displayTable(data){
    data.map((user) => {
        const tr = document.createElement("tr")
        const tdName = document.createElement("td")
        const tdAge = document.createElement("td")
        const tdJob = document.createElement("td")  
        const tdExperience = document.createElement('td')
        const tdDelete = document.createElement('td')
        const tdСhange = document.createElement('td')

        tdName.textContent = user.name;
        tdAge.textContent = user.age;
        tdJob.textContent = user.job;
        tdExperience.textContent = user.experience;
        tdDelete.textContent = "Удалить";
        tdСhange.textContent = "Изменить"

        tdDelete.addEventListener("click", () => deleteUser(user.id))

        tdDelete.style.background = "rgb(245, 85, 85)";
        tdDelete.style.color = "white";
        tdDelete.style.cursor = "pointer"

        tdСhange.style.background = "rgb(64, 115, 154)";
        tdСhange.style.color = "white";
        tdСhange.style.cursor = "pointer"

        let isEdit = false

        tdСhange.addEventListener("click",() => {
            isEdit = !isEdit

            if(isEdit){

                tdСhange.textContent = "Save"
                tdСhange.style.background = "green"

                const nameInput = document.createElement("input");
                nameInput.defaultValue = user.name
                tdName.textContent = ""
                tdName.append(nameInput)

                const ageInput = document.createElement("input");
                ageInput.defaultValue = user.age
                tdAge.textContent = ""
                tdAge.append(ageInput)

                const jobInput = document.createElement("input");
                jobInput.defaultValue = user.job
                tdJob.textContent = ""
                tdJob.append(jobInput)

                const experienceInput = document.createElement("input");
                experienceInput.defaultValue = user.experience
                tdExperience.textContent = ""
                tdExperience.append(experienceInput)

                tdСhange.addEventListener("click",() => {
                    const newUserData = {
                        name:nameInput.value,
                        age:ageInput.value,
                        job:jobInput.value,
                        experience:experienceInput.value,
                    }

                    editUser(user.id,newUserData)
                })
            }
        })


        tr.append(tdName)
        tr.append(tdAge)
        tr.append(tdJob)
        tr.append(tdExperience)
        tr.append(tdDelete)
        tr.append(tdСhange)

        table.append(tr)
    })
}

function deleteUser(id){
    fetch(USER_API + id, {
        method:"DELETE",
        headers:{
            "Content-Type": "application/json",
        },
    })
    .then((data) => data.json())
      .then((data) => {
        getUsers();
    })
}

function clearInputs(){
    formInput.forEach((input)=>{
        input.value = "";
    })
}

function editUser(id,newData){
    fetch(USER_API + id,{
        method:"PUT",
        body:JSON.stringify(newData),
        headers:{
            "Content-Type": "application/json",
        },
    })
    .then((data) => data.json())
    .then((data) => {
      getUsers();
  })
}


