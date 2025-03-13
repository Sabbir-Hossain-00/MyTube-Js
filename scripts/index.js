
const removeActive =()=>{
  const isActive = document.querySelectorAll(".active");
  for(const act of isActive){
    act.classList.remove("active")
  }
}

const showLoader = ()=>{
  const loadSpiner = document.getElementById("loading-spinner");
  const cardHide = document.getElementById("card-container");
  loadSpiner.classList.remove("load");
  cardHide.classList.add("card-hide");
}

const hideLoder = ()=>{
  const loadSpiner = document.getElementById("loading-spinner");
  const cardHide = document.getElementById("card-container");
  loadSpiner.classList.add("load");
  cardHide.classList.remove("card-hide");
}

const showVerified = (value)=>{
   if(value){
     return `<img class="w-3" src="assests/verified-badge-profile-icon-png.webp">`
   }else{
    return " "
   }
}



const getCatagory = async ()=>{
    const catagoryUrl = `https://openapi.programming-hero.com/api/phero-tube/categories`;
    const response = await fetch(catagoryUrl);
    const data = await response.json()
    const {categories} = data ;
    displayCatagory(categories);
}


const getVideos = async (value="")=>{
  const videoUrl = `https://openapi.programming-hero.com/api/phero-tube/videos?title=${value}`;
  showLoader();
    const response = await fetch(videoUrl);
    const data = await response.json()
    const {videos} = data ;
    removeActive()
    document.getElementById("btn-all").classList.add("active");
    displayVideo(videos);
    hideLoder();
}


const catagoryVideo = async (id )=>{
  console.log()
  const catVideoUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  showLoader()
  const response = await fetch(catVideoUrl);
  const data = await response.json();
  const {category} = data ;
  displayVideo(category);
  hideLoder();
}

const getDetails = async(id)=>{
 const detailsUrl = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
 const response = await fetch(detailsUrl);
 const data = await response.json()
 displayDetails(data.video)
}






const displayCatagory = (catagories)=>{
  const catagoryButtons = document.getElementById("catagory");
  for(const cat of catagories){
   const {category_id , category} = cat;
   const newDiv = document.createElement("div");
   newDiv.innerHTML = `
   <button  class="catBTn btn btn-sm md:btn-md  hover:bg-[#FF1F3D] hover:text-white">${category}</button>
   `;
   catagoryButtons.append(newDiv);
   const catagoryBtn = newDiv.querySelector(".catBTn");

   catagoryBtn.addEventListener("click",(e)=>{
    const tBtn = e.target ;
    removeActive();
    tBtn.classList.add("active");
    catagoryVideo(`${category_id}`);
   });

   
  }
}

const displayVideo = (videos)=>{
  const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
  for(const video of videos){
    const {thumbnail , title , authors , others ,video_id} = video ;
    const [author] = authors ;
    const {profile_picture , profile_name , verified} = author ;
    const newCard = document.createElement("div");
    newCard.innerHTML = `
    <div class="card bg-base-100 ">
                <figure class="relative">
                  <img 
                    class="w-full h-[30vh] md:h-[20vh] xl:h-[30vh]"
                    src="${thumbnail}" />
                    <span class="absolute bottom-2 right-2 text-gray-700 text-sm">3hrs 56 min ago</span>
                </figure>
                <div class=" mt-3 flex justify-start items-start gap-3">
                    <div class="avatar mt-1">
                        <div class=" w-6 rounded-full">
                          <img src="${profile_picture}" />
                        </div>
                      </div>
                    <div class="space-y-2">
                        <h2 class="card-title md:text-lg">${title}</h2> 
                        <div class="flex justify-start items-center gap-2 ">
                            <p class="text-sm text-gray-600">${profile_name}</p>
                            
                            
                             ${showVerified(verified)}
                            
                           
                        </div>
                        <p class="text-sm text-gray-600">${others.views}</p>
                    </div>
                  
                </div>
                <div class="card-actions ">
                    <button onclick="getDetails('${video_id}')" class="btn w-full mt-4">View Details</button>
                  </div>
              </div>
    `
    cardContainer.append(newCard);
    showVerified(verified);

 
  }
  
}

const displayDetails = (dtls)=>{

  document.getElementById("view_detls").showModal();
  document.getElementById("details-container").innerHTML = `
   <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${dtls.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${dtls.title}</h2>
    <p>${dtls.description
    }</p>
  </div>
</div>
  `
}



getCatagory();
getVideos();
document.getElementById("search-input").addEventListener("keyup",(e)=>{
  getVideos(e.target.value);
});
