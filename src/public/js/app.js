const socket = io();


const customerTransmitter = document.querySelector("#customerTransmitter");
const customerSide = document.getElementById("customerSide")
const showcardSide = document.getElementById("showcardSide")
const btnContainer = document.getElementById("btnContainer")
const customerBtn = document.querySelector(".customerSide_btn")
const showcardBtn = document.querySelector(".showcardSide_btn")

customerSide.hidden = true;
showcardSide.hidden = true;

socket.addEventListener("open", ()=>console.log("open"));

socket.addEventListener("close", () => {
  console.log("Disconnected from Server ❌");
});

socket.on('setShowCardData', (setData)=>{
  console.log(setData);
})

function openPage(event){
  const currentPage = event.target.innerText;
  if(currentPage === "Customer Side"){
    customerSide.hidden = false;
    btnContainer.hidden = true;
  } else if(currentPage === "Showcard Side"){
    showcardSide.hidden = false;
    btnContainer.hidden = true;
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const name = customerTransmitter.querySelector(".customerTransmitter_name");
  const price = customerTransmitter.querySelector(".customerTransmitter_price");
  console.log(name.value);
  socket.emit("setData", {name:name.value, price:price.value});
  name.value = ""
  price.value = "";
};


customerBtn.addEventListener('click', openPage)
showcardBtn.addEventListener('click', openPage)

customerTransmitter.addEventListener('submit', handleSubmit)