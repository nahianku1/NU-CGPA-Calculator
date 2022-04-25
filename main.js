let addyear = document.getElementById("add-year");

let idcount1 = 2;
let idcount2 = 2;
let maincount = 2;
let epsobj = {}
let creditobj = {}
let mainarr = []
let ttps = {};
let totalcredit = {};

function addnum() {
    let main = document.querySelectorAll(".main-section")
    return main.length + 1
}
function deletenum() {
    let headyear = document.querySelectorAll(".head-year")
    let footyear = document.querySelectorAll(".foot-year")
    for (let i = 0; i < headyear.length; i++) {
        headyear[i].innerHTML = i + 1
    }
    for (let i = 0; i < footyear.length; i++) {
        footyear[i].innerHTML = i + 1
    }
}
addyear.addEventListener("click", function () {
    let num = addnum();
    let html = `<div class="main-section" id="${maincount++}">
                
    <div class="content-heading">
        <h4>Year <span class="head-year">${num}</span></h4>
        <button class="main-close"><i class="fa-solid fa-trash-can main-close"></i></button>
    </div>

    <div class="content-body">
    
            <input type="text" placeholder="Subject Code">
            <select class="gpa-calculator__grate grades-1" name="grade" id="${idcount1++}">
                <option >Grade</option>
                <option value="4.0">A+</option>
                <option value="3.75">A</option>
                <option value="3.50">A-</option>
                <option value="3.25">B+</option>
                <option value="3.0">B</option>
                <option value="2.75">B-</option>
                <option value="2.50">C+</option>
                <option value="2.25">C</option>
                <option value="2.0">D</option>
            </select>
            <input type="number" placeholder="Credit" id="${idcount2++}" disabled>
            <button class="row-close close"><i class="fa-solid fa-trash-can close"></i></button>
        
       
    </div>

    <div class="content-footer">
        <h4>Year <span class="foot-year">${num}</span> GPA : <span class="gpa">0.00</span></h4>
        <button class="add-subject">Add Subject</button>
    </div>
</div>`

    document.querySelector(".content-section").insertAdjacentHTML("beforeend", html);
});

document.addEventListener("click", function (e) {

    if (e.target.classList.contains("main-close")) {

        e.target.closest('.main-section').remove();
        deletenum()

    }
})

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("close")) {
        e.target.closest('.content-body').remove();

    }
})

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("add-subject")) {
        let clone = `<div class="content-body">
                    
         <input type="text" placeholder="Subject Code">
         <select class="gpa-calculator__grate grades-1" name="grade" id="${idcount1++}">
             <option >Grade</option>
             <option value="4.0">A+</option>
             <option value="3.75">A</option>
             <option value="3.50">A-</option>
             <option value="3.25">B+</option>
             <option value="3.0">B</option>
             <option value="2.75">B-</option>
             <option value="2.50">C+</option>
             <option value="2.25">C</option>
             <option value="2.0">D</option>
         </select>
         <input type="number" placeholder="Credit" id="${idcount2++}" disabled>
         <button class="row-close close"><i class="fa-solid fa-trash-can close"></i></button>
     
    
 </div>`
        e.target.closest('.content-footer').insertAdjacentHTML('beforebegin', clone);
    }
})

document.addEventListener("change", function (e) {
    if (e.target.id === e.target.nextElementSibling.id) {
        e.target.nextElementSibling.removeAttribute("disabled")
    }
})

function oldmain(target) {
    let mainid = target.closest('.main-section')
    epsobj = {}
    creditobj = {}
    let mainsec = target.closest('.main-section').children.length - 2
    for (let i = 1; i <= mainsec; i++) {
        let grade = mainid.children[i].children[1].value == 'Grade' ? 0 : mainid.children[i].children[1].value
        let credit = mainid.children[i].children[2].value || 0
        let eps = parseFloat(grade) * parseFloat(credit)
        epsobj[i] = eps
        creditobj[i] = parseInt(credit)
       

    }
}
document.addEventListener("keyup", function (e) {

    if (e.target.id === e.target.previousElementSibling.id) {

        if (!mainarr.includes(e.target.parentElement.parentElement.id)) {
            oldmain(e.target);
           
        } else if (mainarr.includes(e.target.parentElement.parentElement.id)) {
            oldmain(e.target);
        }
        mainarr.push(e.target.parentElement.parentElement.id)
        let totalp = Object.values(epsobj).reduce((a, b) => a + b, 0)
        ttps[e.target.parentElement.parentElement.id] = totalp;
        let totaltps = Object.values(ttps).reduce((a, b) => a + b, 0)
        let totalc = Object.values(creditobj).reduce((a, b) => a + b, 0)
        totalcredit[e.target.parentElement.parentElement.id] = totalc;
        let totalcre = Object.values(totalcredit).reduce((a, b) => a + b, 0)
      
        let gpa = totalp / totalc;
        e.target.parentElement.parentElement.lastElementChild.children[0].children[1].innerHTML = gpa.toFixed(2);
        let cgpa = totaltps / totalcre;
        document.querySelector(".cgpa").innerHTML = cgpa.toFixed(2);
    }

})
document.addEventListener("change", function (e) {

    if (e.target.id === e.target.nextElementSibling.id) {

        if (!mainarr.includes(e.target.parentElement.parentElement.id)) {
            oldmain(e.target);
        } else if (mainarr.includes(e.target.parentElement.parentElement.id)) {
            oldmain(e.target);
        }
        mainarr.push(e.target.parentElement.parentElement.id)
        let totalp = Object.values(epsobj).reduce((a, b) => a + b, 0)
        ttps[e.target.parentElement.parentElement.id] = totalp;
        let totaltps = Object.values(ttps).reduce((a, b) => a + b, 0)
        let totalc = Object.values(creditobj).reduce((a, b) => a + b, 0)
        totalcredit[e.target.parentElement.parentElement.id] = totalc;
        let totalcre = Object.values(totalcredit).reduce((a, b) => a + b, 0)
      
        let gpa = totalp / totalc;
        e.target.parentElement.parentElement.lastElementChild.children[0].children[1].innerHTML = gpa.toFixed(2);
        let cgpa = totaltps / totalcre;
        document.querySelector(".cgpa").innerHTML = cgpa.toFixed(2);
    }

})

