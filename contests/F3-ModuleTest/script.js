//event listener on load to show ip address
window.addEventListener("load",()=>{
  $.getJSON("https://api.ipify.org?format=json", function(data) {
       
  // Setting text of element P with id gfg
  $("#gfg").html(data.ip);
})
})

const getDataBtn= document.getElementById("getData");
const ipSpan= document.getElementById("gfg");
const lat=document.getElementById("lat");
const city=document.getElementById("city");
const organisation=document.getElementById("organisation");
const long=document.getElementById("long");
const region=document.getElementById("region");
const hostname=document.getElementById("hostname");
const iframeTag=document.getElementById("map1");
const searchFilter=document.getElementById("searchFilter1");
const container1=document.getElementById("container1");
const container2=document.getElementById("container2")

const timeZone=document.getElementById("timezone");
const dateAndTime=document.getElementById("dateAndTime");
const pincode= document.getElementById("pincode");
const message= document.getElementById("message");
const resultcardContainer=document.getElementById("resultcard")

//event listener click when we click getdata button
getDataBtn.addEventListener("click", ()=>{
  container1.style.display="none";
  container2.style.display="block"
 var IP= ipSpan.innerText;
 try{
  let response=fetch(`https://ipinfo.io/${IP}/geo?token=5c80fcd6b5fdc7`)
  response.then((data)=>{
      let prom=data.json()
      prom.then((info)=>{
          // console.log("hi")
          // console.log(info);
          lat.innerText=`Lat: ${info.loc.split(",")[0]}`;
          city.innerText=`City: ${info.city}`
          organisation.innerText=`Organisation: ${info.org}`
          long.innerText=`Long: ${info.loc.split(",")[1]}`
          region.innerText=`Region: ${info.region}`
          hostname.innerText=`Hostname: ${info.hostname}`
          iframeTag.src=`https://maps.google.com/maps?q=${info.loc.split(",")[0]}, ${info.loc.split(",")[1]}&z=15&output=embed`; 
          let india_datetime_str = new Date().toLocaleString(`en-${info.country}`, { timeZone: "Asia/Kolkata" });
          timeZone.innerText=`Time Zone: ${info.timezone}`;
          dateAndTime.innerText=`Date And Time: ${india_datetime_str}`;
          pincode.innerText=`Pincode: ${info.postal}`
          aboutPostOffices(info.postal);

      })
  })
  response.catch((data)=>{
      console.log("something went wrong",data)
  })
 }
 catch(error){
   console.log("somwething went wrong",error)
 }

})


function aboutPostOffices(pincode){
  try{
      let postalResponse=fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      postalResponse.then((data)=>{
          let prom1=data.json();
          prom1.then((info)=>{
              console.log(info);
              message.innerText=`${info[0].Message}`
              addingToResultcard(info);
          })
          prom1.catch((error)=>{
              console.log(error);
          })
      })
      postalResponse.catch((data)=>{
          console.log("something went wrong")
      })
  }
  catch(error){
      console.log("something went wrong")
  }

}

//adding post office details 
function addingToResultcard(info){
  resultcardContainer.innerHTML="";
  info[0].PostOffice.forEach((obj)=>{
      let card= document.createElement("div");
      card.className="card";
      let pTag=document.createElement("p");
      pTag.innerText=`Name: ${obj.Name}`;
      let p1Tag=document.createElement("p");
      p1Tag.innerText=`Branch Type: ${obj.BranchType}`
      let p2Tag=document.createElement("p");
      p2Tag.innerText=`Delivery Status: ${obj.DeliveryStatus}`
      let p3Tag=document.createElement("p");
      p3Tag.innerText=`District: ${obj.District}`
      let p4Tag=document.createElement("p");
      p4Tag.innerText=`Division: ${obj.Division}`
      card.appendChild(pTag);
      card.appendChild(p1Tag);
      card.appendChild(p2Tag);
      card.appendChild(p3Tag);
      card.appendChild(p4Tag);
      resultcardContainer.appendChild(card);
  })
}

//filtering the postoffice details
searchFilter.addEventListener("input",(event)=>{
  // console.log(event.target.value)
 const filter=event.target.value.toUpperCase();
 const listItems =resultcardContainer.getElementsByTagName("div");
//    console.log(listItems);
 for (let i = 0; i < listItems.length; i++) {
  const listItem = listItems[i];
  // console.log(listItems[i].textContent);
  const text = listItem.textContent || listItem.innerText;
  if (text.toUpperCase().indexOf(filter) > -1) {
    listItem.style.display = "";
  } else {
    listItem.style.display = "none";
  }
}

})
  