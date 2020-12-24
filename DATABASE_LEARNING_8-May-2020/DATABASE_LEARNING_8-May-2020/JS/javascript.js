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


function onclicks(id) {
    try {

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
        var RegexPhon = /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/


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
        if (addreses.length === 0) {
            p4.innerHTML = "an adress have atleast 4 characters"
            a = false
        } else {
            a = true
            p4.innerHTML = ""
        }
        if (!RegexPhon.test(phones.trim())) {

            p5.innerHTML = "please write a valid number"
            p = false
        } else {
            p = true
            p5.innerHTML = ""
        }
        if (countries.length === 0 || !isNaN(countries)) {
            co = false!isNaN(countries) && countries.length < 2 ? p6.innerHTML = "a country name doesnt have any numbers" : p6.innerHTML = "a country name has atleast 3 chars"

        } else {
            co = true
            p6.innerHTML = ""
        }
        if (e && co && ci && n && p && a) {
            var data = {
                name: names.trim(),
                email: emails,
                city: cities,
                address: addreses,
                phone_no: phones.trim(),
                contry: countries,
            }
            var b = document.getElementById("subb")
            b.innerText = `Submit Form`
            b.setAttribute("onclick", `onclicks()`)

            namesEL.value = ""
            emailsEL.value = ""
            citiesEL.value = ""
            addresesEL.value = ""
            phonesEL.value = ""
            countriesEL.value = ""
            sub(data, id)

        } else {
            console.error("e=> ", e, " co=> ", co, "ci=> ", ci, "n=> ", n, "p=> ", p, "a=> ", a)

            console.log(!isNaN(names))

        }
    } catch (err) {

        console.log(err)

    }
} //sub(sdfg)sub(data,)
function sub(data, id = null) {
    var s = document.getElementById("subb")
    var sp = document.getElementById("spi")
    sp.style.display = ""
    s.style.display = "none"

    database().ref(`${id?`formData/${id}`:"formData"}`)[id?"set":"push"](data)
   //database().ref(`formData/id`).set(data)

 // database().ref(`formData`).push(data)
        
        
        
        .then(function () {
            s.style.display=""
           sp.style.display="none"
            p7.style.color = "green"
            id?p7.innerHTML = `<h1 style="color:green">successfully updated.</h1>`:p7.innerHTML = `<h1 style="color:green">successfully submitted. </h1>`
            
        })
        .catch(function (err) {
            s.style.display=""
            sp.style.display="none"
            err.message ? console.warn(err.message) : console.error("err=> ", err)
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
        var key = d.key

var data = d.val()
var DivIdReg=key
var DivId = document.getElementById(DivIdReg)
if(DivId){
    DivId.remove()
}
}
catch(err){console.error(err)}}






function onData(data) {
    
    try {
        var lo = document.getElementById("loading")
        lo.style.display ="none"
        var d = data.val()
        var key = data.key
        console.log(key)
        var parentDiv = document.createElement("DIV")
        var parentDivId=key
            parentDiv.setAttribute("id",parentDivId)
        var disc;
        disc += d.name + "," + d.email + "," + d.city + "," + d.address + "," + d.phone_no + "," + d.contry + "$"
        disc = disc.replace("undefined", "")
        // var firstd =disc.slice(0,disc.indexOf("$"))
        // var secd =disc.slice(disc.indexOf("$"),disc.length)
        var i = 0

        console.log(disc.slice(0, disc.indexOf("$")))

        var ol = document.getElementById("ol")
        var hi = `${key}`
                              
        parentDiv.innerHTML = `
<li id="${key}name">${d.name}</li> 


<button class="btn btn-outline-secondary" id="${key}but" data-toggle="tooltip" data-placement="top" title="Click Here To See More" onclick="seeMore('${hi}s','${key+"but"}','${key+"but2"}')">See More
</button>   
     

<ul id="${key}s" style="display:none">
<li id="${key}name2">Name:${d.name}</li> 
<li id="${key}email">Email:${d.email}</li> 
<li id="${key}city">City:${d.city}</li> 
<li id="${key}address">Address:${d.address}</li> 
<li id="${key}phone_no">Phone number:${d.phone_no}</li> 
<li id="${key}country">Country:${d.contry}</li>
</ul>


<button class="btn btn-outline-info" id="${key+"but2"}" data-toggle="tooltip" data-placement="top" title="Click Here To See Less" style="display:none" onclick="seeless('${hi}s','${key+"but2"}','${key+"but"}')">See Less </button>


<button class="btn btn-outline-success" id="${key}b" data-toggle="tooltip" data-placement="top" title="Click Here To Update the details" onclick="add('${d.name} ',' ${d.phone_no} ', '${d.address}','${d.city} ', '${d.contry} ', '${d.email}','${key}but','${key}','${data}')">Update</button>



<button class="btn btn-outline-danger" data-toggle="tooltip" data-placement="top" title="Click Here To Delete the information" onclick="removeData('${key}')">Delete</button>`


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
    p7.innerHTML=''
database().ref(`/formData/${id}`).remove()

}


function seeMore(non, butn, buton) {
    try {
        p7.innerHTML=''

        var buton = document.getElementById(`${buton}`)
        var btn = document.getElementById(`${butn}`)
        var span = document.getElementById(`${non}`)
        span.style.display = ""
        btn.style.display = "none"
        buton.style.display = ""

    } catch (errrrrr) {
        console.error(errrrrr)
    }
}


function seeless(non, butn, buton) {
    try {
        p7.innerHTML=''
        var btn = document.getElementById(`${butn}`)
        var buton = document.getElementById(`${buton}`)
        var span = document.getElementById(`${non}`)
        span.style.display = "none"
        btn.style.display = "none"
        buton.style.display = ""
    } catch (errrrrr) {
        console.error(errrrrr)
    }
}




function add(na, ph, ad, ci, co, em,btn,key,data) {

    try {
        p7.innerHTML=""
        scrollTo(0,0)
        // alert(na+" , "+em+" , "+ph+" , "+ad+" , "+ci+" , "+co+" , "+em)
        emailsEL.value = em;
        citiesEL.value = ci;
        addresesEL.value = ad;
        phonesEL.value = ph;
        countriesEL.value = co;
        namesEL.value = na;
     var b = document.getElementById("subb")
    b.innerText=`Update Form`
    b.setAttribute("onclick",`onclicks('${key}')`)

    } catch (err) {

        console.error(err)

    }
}

function erase() {
    try {
        p7.innerHTML=''
        emailsEL.value = "";
        citiesEL.value = "";
        addresesEL.value = "";
        phonesEL.value = "";
        countriesEL.value = "";
        namesEL.value = "";
        var b = document.getElementById("subb")
b.innerText=`Submit Form`
    b.setAttribute("onclick",`onclicks()`)
    } catch (err) {

        console.error(err)

    }
}
function onChange(d) {
    try {
        p1.innerHTML=""
        p2.innerHTML=""
        p3.innerHTML=""
        p4.innerHTML=""
        p5.innerHTML=""
        p6.innerHTML=""
        var data = d.val() 
               var key = d.key

        var hi = key
var sup = document.getElementById(`${key}b`)
var lin = document.getElementById(`${key}name`)
if(lin){

lin.innerHTML=data.name

}
if(sup){ 
sup.setAttribute("onclick",`add('${data.name} ',' ${data.phone_no} ', '${data.address}','${data.city} ', '${data.contry} ', '${data.email}','${key}but','${key}')`)
}
console.log("changed==>> \n\n", data, "d.email==>>", data.email)
        var li = document.getElementById(`${hi}s`);
        if(li){
        li.innerHTML =`<li id="${hi+ "s"}name2">Name:${data.name}</li> 
        <li id="${hi+"'s"}email">Email:${data.email}</li> 
        <li id="${hi+"'s"}city">City:${data.city}</li> 
        <li id="${hi+"'s"}address">Address:${data.address}</li> 
        <li id="${hi+"'s"}phone_no">Phone number:${data.phone_no}</li> 
        <li id="${hi+"'s"}country">Country:${data.contry}</li>` 
        }else{console.error("ul not found=>> ",key,d.key)}
    } catch (err) {
        console.error(err)
        console.log("hello")
    }
}