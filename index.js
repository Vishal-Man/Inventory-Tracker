//locally storing the object arrey and its ids(temparory)
let Item = JSON.parse(localStorage.getItem("items")) || []
let lastId = Number(localStorage.getItem("lastId")) || 1000

//search and display items
let search = document.getElementById("search-Bar")
let idDel = document.getElementById("Id-Bar")

//btns
const addItem = document.getElementById("add-itm")
const addFm = document.getElementById("Add")
const addEqp = document.getElementById("add-Eqp")
const deleteBtn = document.getElementById("delete-Btn")
const searchBtn = document.getElementById('search-Btn')

//input fields
let names = document.getElementById("name")
let category = document.getElementById("category")
let Location = document.getElementById("location")
let statu = document.getElementById("status")
let assignedTo = document.getElementById("assigned-To")
let purchaseDate = document.getElementById("purchase-Date")
let note = document.getElementById("notes")

//search by id
searchBtn.addEventListener('click', ()=>{
    const foundObject = Item.filter(item => item.Id ===Number(search.value))
    dispItem(foundObject)
    console.log(dispItem(foundObject))
})

//delete by searching id
deleteBtn.addEventListener('click', ()=>{
    const index = Item.findIndex(item => item.Id ===Number(idDel.value))
    if(index !== -1) {
        Item.splice(index, 1)
        localStorage.setItem("items", JSON.stringify(Item))
        dispItem(Item)
        idDel.value = ""
    } else {
        alert("Not found")
    }
})

//displaying list
let editId = null
function dispItem(arr){
let uL = document.getElementById("list")
let listItems =""
for (let i = 0;i < arr.length; i++) {
    listItems +=`
    <li>
    <hr>
         <strong>${arr[i].Id}</strong><br>
            ${arr[i].Name}<br>
            status: ${arr[i].status}<br>
            <button onclick="editItem(${arr[i].Id})">Update</button>
            <hr>
    </li>`
}
uL.innerHTML = listItems
}
dispItem(Item)

function editItem(id) {
    const item = Item.find(i => i.Id === id )
    if(item) return

    editId = id
    addFm.style.display ="block"

    names.value = item.Name;
    category.value = item.category;
    Location.value = item.location;
    statu.value = item.status;
    assignedTo.value = item.assignedto;
    purchaseDate.value = item.purchasedate;
    note.value = item.notes;

    addEqp.innerText = "Update Item"
}

//displaying input columns
addItem.addEventListener("click", () =>{
    addFm.style.display = 
        addFm.style.display === "none" ? "block" : "none"
})

//adding the input values to an arrey as objects
addEqp.addEventListener("click", (e)=> {
    e.preventDefault();
    const nm = names.value
    const cat = category.value
    const loc = Location.value
    const stat = statu.value
    const asto = assignedTo.value
    const purdt = purchaseDate.value
    const notes = note.value
    
    if(cat && nm && loc && stat && asto && purdt && notes){
        
        
        
        if(editId === null) {
            lastId +=1
        Item.push({
            Id: lastId,
            Name: nm,
            category: cat,
            location: loc,
            status: stat,
            assignedto: asto,
            purchasedate: purdt,
            notes: notes
        })
        localStorage.setItem("lastId",lastId)
        };
    } else {
        const index = Item.findIndex(i => i.id ===editId)
        if(index != -1) {
            Item[index] = {
                ...Item[index],
                Name: nm,
                category: cat,
                location: loc,
                status: stat,
                assignedto: asto,
                purchasedate: purdt,
                notes: notes
            }
        }
        editId = null
        addEqp.innerText ="Add Item"
    }
    localStorage.setItem("items", JSON.stringify(Item))
    dispItem(Item)

    addFm.style.display="none"
    names.value = category.value =Location.value =
    statu.value = assignedTo.value = purchaseDate.value = note.value =""
})


 console.log(Item)