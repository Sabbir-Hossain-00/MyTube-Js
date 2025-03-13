
const removeActive =()=>{
  const isActive = document.querySelectorAll(".active");
  console.log(isActive);
  for(const act of isActive){
    act.classList.remove("active")
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
    const response = await fetch(videoUrl);
    const data = await response.json()
    const {videos} = data ;

    removeActive()
    document.getElementById("btn-all").classList.add("active");
    displayVideo(videos);
    
}


const catagoryVideo = async (id )=>{
  console.log()
  const catVideoUrl = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;
  const response = await fetch(catVideoUrl);
  const data = await response.json();
  const {category} = data ;
  displayVideo(category);
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
    const {thumbnail , title , authors , others} = video ;
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
                            
                             <img class="w-4" src="assests/verified-badge-profile-icon-png.webp" alt="">
                            
                           
                        </div>
                        <p class="text-sm text-gray-600">${others.views}</p>
                    </div>
                  
                </div>
                <div class="card-actions ">
                    <button class="btn btn-primary w-full mt-4">View Details</button>
                  </div>
              </div>
    `
    cardContainer.append(newCard);
  }
  
}





getCatagory();
getVideos();
document.getElementById("search-input").addEventListener("keyup",(e)=>{
  getVideos(e.target.value);
})
