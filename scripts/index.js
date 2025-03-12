const getCatagory = async ()=>{
const url = `https://openapi.programming-hero.com/api/phero-tube/categories`
const response = await fetch(url);
const data = await response.json()
const {categories} = data ;
displayCatagory(categories);
}

const displayCatagory = (catagories)=>{
  for(const cat of catagories){
   const {category_id , category} = cat;
   console.log(category_id , category)
   const newDiv = document.createElement("div");
   newDiv.innerHTML = `
   <button class="btn btn-sm md:btn-md  hover:bg-[#FF1F3D] hover:text-white">${category}</button>
   `;
   document.getElementById("catagory").append(newDiv)
  }
}
getCatagory();