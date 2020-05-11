//addresses: 21 Greens Road RD 2 Ruawai 0592. Partial addresses: Main Highway Otaki; 32 Wilson Street."

/* var student={first_Name:"Noemie", last_name:"Moen", jobTitle:"Principal Solutions Representative",prrefix:"Mrs.", suffix:"DVM",  title:"Forward Branding Specialist",
/*  job_descripter:"District",
  jobarea:"Paradigm",
  jobType:"Officer"
city:"North Veldamouth"
country:"<"
address:"960 Lucie Mission"
phone-no:"654-654-2575"
* }*/


var p1 = document.getElementById("p1")
var p2 = document.getElementById("p2")
var p3 = document.getElementById("p3")
var p4 = document.getElementById("p4")
var p5 = document.getElementById("p5")
var p6 = document.getElementById("p6")
var p7 = document.getElementById("p7")
var namesEL = document.getElementById("names")
var emailsEL = document.getElementById("emails")
var citiesEL = document.getElementById("cities")
var addresesEL = document.getElementById("addreses")
var phonesEL = document.getElementById("phones")
var countriesEL = document.getElementById("countries")


function onclicks() {
    try{
    var n = true
    var e = true
    var ci = true
    var a = true
    var p = true
    var co = true
    var names = namesEL.value
    var emails = emailsEL.value
    var cities = citiesEL.value
    var addreses = addresesEL.value
    var phones = phonesEL.value
    var countries = countriesEL.value
    //regexes
    var regex = /^[\w\-\.\+]+\@[a-zA-Z0-9\. \-]+\.[a-zA-z0-9]{2,4}$/;
    var RegexPhon=/^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/


    //email

    if (!(emails.match(regex))) {
        e = false
        p2.innerHTML = "please write a valid email"
    } else {
        e = true
        p2.innerHTML = ""

    }
    //email ends
    if (names.length === 0 || !isNaN(names)) {
        !isNaN(names) && names.length !== 0 ? p1.innerHTML = "a name never contains numbers" : p1.innerHTML = "a name have atleast 3 names"
        n = false

    } else {
        n = true
        p1.innerHTML = ""

    }

    if (cities.length === 0 || !isNaN(cities)) {
        !isNaN(cities) && cities.length !== 0 ? p3.innerHTML = "please donot add numbers" : p3.innerHTML = "a city name has atleast 3 characters"
        ci = false

    } else {
        ci = true

        p3.innerHTML = ""
    }
    if (addreses.length ===0) {
        p4.innerHTML = "an adress have atleast 4 characters"
        a = false
    } else {
        a = true
        p4.innerHTML = ""
    }
    if (!RegexPhon.test(phones)) {
        p5.innerHTML = "please write a valid number"
        p = false
    } else {
        p = true
        p5.innerHTML = ""
    }
    if (countries.length === 0 || !isNaN(countries)) {
        co = false
        !isNaN(countries) && countries.length < 2 ? p6.innerHTML = "a country name doesnt have any numbers" : p6.innerHTML = "a country name has atleast 3 chars"

    } else {
        co = true
        p6.innerHTML = ""
    }
    if (e  && co  && ci  && n  && p  && a ) {
        var data = {
            name: names.trim(),
            email: emails,
            city: cities,
            address: addreses,
            phone_no: phones,
            contry: countries,
        }
        sub(data)

    }
    else{console.error("e=> ",e  ," co=> ", co ,"ci=> " , ci ,"n=> " , n ,"p=> " , p  ,"a=> ", a )

    console.log(!isNaN(names))

}
}
catch(err){

    console.log(err)

}}

function sub(data) {

    database().ref(`formData/${data.name}`)
        .set(data)
        .then(function () {
            p7.style.color = "green"
            p7.innerHTML = `
<h1 style="color:green">successfully submitted following info:- </h1>
    Name: ${data.name}<br>
    Email: ${data.email}<br> 
    City: ${data.city}<br>
    Address: ${data.address}<br>
    Phone no: ${data.phone_no}<br>
    country: ${data.contry}<br>
     
     `
        })
        .catch(function (err) {

            err.message ? alert(err.message) : console.error("err=> ", err)
            p7.style.color = "red"
            p7.innerHTML = err.message ? err.message : 'An error occurred'
        })

}

function getdata() {

    database()

        .ref(`formData`)
        .on("child_added", onData);

    database()
        .ref(`formData`)
        .on("child_changed",onChange);

    database()
        .ref(`formData`)
        .on("child_removed",onRemove);
}
function onRemove(d){
    try{
var data = d.val()
var DivIdReg=data.name.replace(/\s/g,"_")+"_div"
var DivId = document.getElementById(DivIdReg)
if(DivId){
    DivId.remove()
}
}
catch(err){console.error(err)}}
function onChange(d) {
    try {

        var data = d.val()
        var hi = `${data.name.replace(" ", "_")}`

        console.log("changed==>> \n\n", data, "d.email==>>", data.email)
        var li = document.getElementById(hi+"s");
        li.innerHTML =`<li id="${hi+ "'s"}name2">Name:${data.name}</li> 
        <li id="${hi+"'s"}email">Email:${data.email}</li> 
        <li id="${hi+"'s"}city">City:${data.city}</li> 
        <li id="${hi+"'s"}address">Address:${data.address}</li> 
        <li id="${hi+"'s"}phone_no">Phone number:${data.phone_no}</li> 
        <li id="${hi+"'s"}country">Country:${data.contry}</li>`
   
    } catch (err) {
        console.error(err)
        console.log("hello")
    }
}






function onData(data) {
    try {
        
        var d = data.val()
        var parentDiv = document.createElement("DIV")
        var parentDivId=d.name.replace(/\s/g,"_")+"_div"
            parentDiv.setAttribute("id",parentDivId)
        var disc;
        disc += d.name + "," + d.email + "," + d.city + "," + d.address + "," + d.phone_no + "," + d.contry + "$"
        disc = disc.replace("undefined", "")
        // var firstd =disc.slice(0,disc.indexOf("$"))
        // var secd =disc.slice(disc.indexOf("$"),disc.length)
        var i = 0
// 
        console.log(disc.slice(0, disc.indexOf("$")))

        var ol = document.getElementById("ol")
        var hi = `${d.name.replace(" ", "_")}`

        parentDiv.innerHTML = `
<li id="${d.name.replace(" ", "_") + "'s"}name">${d.name}</li> 


<button class="btn btn-outline-secondary" id="${d.name.replace(" ", "_") + "but"}" data-toggle="tooltip" data-placement="top" title="Click Here To See More" onclick="seeMore('${hi}s','${d.name.replace(" ", "_") + "but"}','${d.name.replace(" ", "_") + "but2"}')">See More
</button>   
     

<ul id="${d.name.replace(" ", "_")}s" style="display:none">
<li id="${d.name.replace(" ", "_") + "'s"}name2">Name:${d.name}</li> 
<li id="${d.name.replace(" ", "_") + "'s"}email">Email:${d.email}</li> 
<li id="${d.name.replace(" ", "_") + "'s"}city">City:${d.city}</li> 
<li id="${d.name.replace(" ", "_") + "'s"}address">Address:${d.address}</li> 
<li id="${d.name.replace(" ", "_") + "'s"}phone_no">Phone number:${d.phone_no}</li> 
<li id="${d.name.replace(" ", "_") + "'s"}country">Country:${d.contry}</li>
</ul>


<button class="btn btn-outline-info" id="${d.name.replace(" ", "_") + "but2"}" data-toggle="tooltip" data-placement="top" title="Click Here To See Less" style="display:none" onclick="seeless('${hi}s','${d.name.replace(" ", "_") + "but2"}','${d.name.replace(" ", "_") + "but"}')">See Less </button>


<button class="btn btn-outline-success" id="${d.name.replace(" ", "_")}b" data-toggle="tooltip" data-placement="top" title="Click Here To Update the details" onclick="add('${d.name} ',' ${d.phone_no} ', '${d.address}',' ${d.city} ', '${d.contry} ', '${d.email}')">Update</button>



<button class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Click Here To Delete the information" onclick="removeData('${d.name}')">Delete</button>`


ol.appendChild(parentDiv)
    } catch (err) {
        console.log(err + "x")
    }

}






// function onData(data) {  //>>>>> ("value") 
//     var ol = document.getElementById("ol")

//     var d =data.val()
//     console.log(d)
//     var i = 1;
//     var I = 1;
//     for (var key in d ) {
//        var spid= key+"_span";
//          var isExist=document.getElementById(spid)
//         console.log(d[key].name)

// var datahtml =`Name: ${d[key].name}<br>Email: ${d[key].email}<br> 
// City: ${d[key].city}<br>
// Address: ${d[key].address}<br>
// Phone no: ${d[key].phone_no}<br>
// country: ${d[key].contry}<br>`

// if(!isExist){
//        var spp=`<span style="display:none;" id='${spid}'>
//        ${datahtml}
//       </span><br>`

//     ol.innerHTML += `<li>${key}</li>
//     <button class="b${I}" id='${key+"_btn"}' onclick="seeMore('${key}')">see more</button><br>
//     ${spp}
//     ` 

// var daniya = document.getElementById("daniya")
// var amaan = document.getElementById("amaan")

// i++
// I++
// if(I >= 8){
//     I=1
//     I++
// }

// }
// else{
//     isExist.innerHTML=datahtml

// }
// }

// }

getdata()

function removeData(id){

database().ref(`/formData/${id}`).remove()


}


function seeMore(non, butn, buton) {
    try {
        var buton = document.getElementById(`${buton}`)
        var btn = document.getElementById(`${butn}`)
        var span = document.getElementById(`${non}`)
        span.style.display = "block"
        btn.style.display = "none"
        buton.style.display = ""

    } catch (errrrrr) {
        alert(errrrrr)
    }
}


function seeless(non, butn, buton) {
    try {
        var btn = document.getElementById(`${butn}`)
        var buton = document.getElementById(`${buton}`)
        var span = document.getElementById(`${non}`)
        span.style.display = "none"
        btn.style.display = "none"
        buton.style.display = ""
    } catch (errrrrr) {
        alert(errrrrr)
    }
}




function add(na, ph, ad, ci, co, em) {
    try {
        scrollTo(0,0)
        // alert(na+" , "+em+" , "+ph+" , "+ad+" , "+ci+" , "+co+" , "+em)
        emailsEL.value = em;
        citiesEL.value = ci;
        addresesEL.value = ad;
        phonesEL.value = ph;
        countriesEL.value = co;
        namesEL.value = na;



    } catch (err) {

        alert(err)

    }
}

function erase() {
    try {
        emailsEL.value = "";
        citiesEL.value = "";
        addresesEL.value = "";
        phonesEL.value = "";
        countriesEL.value = "";
        namesEL.value = "";
    } catch (err) {

        console.error(err)

    }
}