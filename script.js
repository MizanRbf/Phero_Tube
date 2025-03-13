function removeActiveClass(){
  const activeButtons = document.getElementsByClassName("active");
  for(let btn of activeButtons){
  btn.classList.remove("active");
  }
}
// Load Categories
const loadCategories = () => {
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(res => res.json())
.then(data => displayCategories(data.categories));
}
// Load Videos
const loadVideos = (searchText = "") => {
  fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
  .then(res => res.json())
  .then(data => {
    document.getElementById('btn-all').classList.add("active");
    displayVideos(data.videos)});
}
// Load Category Videos
const loadCategoryVideos = (id) => {
const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

fetch(url)
.then(res => res.json())
.then(data => {
  removeActiveClass();
  const clickedButton = document.getElementById(`btn-${id}`);
  clickedButton.classList.add('active');
  displayVideos(data.category)});
}
// Load Video Details
const loadVideoDetails = (videoId) => {
const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;

fetch(url)
.then(res => res.json())
.then(data => displayVideoDetails(data.video));
}

// Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.
  getElementById('category-container');
  for(let cat of categories){
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
    <button id="btn-${cat.category_id}" onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>`;
    categoryContainer.append(categoryDiv);
  }
}
// Display Videos
const displayVideos = (videos) => {
const videoContainer = document.getElementById('video-container');
if(videos.length == 0){
  videoContainer.innerHTML = `
  <div class="col-span-full text-center flex flex-col items-center mt-32">
    <img class="w-36 h-36" src="assets/Icon.png" alt="">
    <p class="text-4xl font-bold mt-4">Oops!! Sorry, There is <br> no content here</p>
   </div>`;
   return;
}
videoContainer.innerHTML = "";
videos.forEach((video) => {
  const videoCard = document.createElement('div');
  videoCard.innerHTML = `
  <div class="card bg-base-100 shadow-xl">
      <figure class="relative">
        <img class="object-cover w-full h-[150px]"
          src="${video.thumbnail}"
          alt="" />
          <div class="absolute bottom-2 right-2 bg-black text-white px-2 text-sm">
          3hrs 56 min ago
          </div>
        </figure>
         <div class="p-4">
          <div class="flex">
            <div class="mr-2">
              <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}"/>
            </div>
          <div>
           <h2 class="card-title text-sm font-bold">${video.title}</h2>
           <div class="flex items-center">
           <p class="flex gap-2">
           ${video.authors[0].profile_name} 
           ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/>` : ``} 
           </p>
           </div>
           <p>${video.others.views}</p>
          </div>
          </div>
          <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block mt-4 rounded-md">Show details</button>
    </div>`;
  videoContainer.append(videoCard);
})
}
// Display Video Details
const displayVideoDetails = (videoDetails) => {
 document.getElementById('video_details').showModal();
 const detailsContainer = document.getElementById('details-container');
 detailsContainer.innerHTML = `
 <div class="card bg-base-100 image-full w-96 shadow-sm">
  <figure>
    <img
      src="${videoDetails.thumbnail}" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${videoDetails.title}</h2>
    <p>${videoDetails.authors[0].profile_name}</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary">Buy Now</button>
    </div>
  </div>
</div>
 `;
 
};
loadCategories()

// Search Input
const searchInput = document.getElementById('search-input').addEventListener('keyup', (event) => {
 const input = event.target.value;
 loadVideos(input);
})

// {
//   "category_id": "1003",
//   "video_id": "aaaj",
//   "thumbnail": "https://i.ibb.co/xgWL3vQ/kid-gorgeous.jpg",
//   "title": "Kid Gorgeous",
//   "authors": [
//       {
//           "profile_picture": "https://i.ibb.co/xsfkwN2/john.jpg",
//           "profile_name": "John Mulaney",
//           "verified": true
//       }
//   ],
//   "others": {
//       "views": "241K",
//       "posted_date": ""
//   },