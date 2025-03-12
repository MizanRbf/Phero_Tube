// Load Categories
const loadCategories = () => {
fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
.then(res => res.json())
.then(data => displayCategories(data.categories));
}
// Load Videos
const loadVideos = () => {
  fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
  .then(res => res.json())
  .then(data => displayVideos(data.videos));
}
// Load Category Videos
const loadCategoryVideos = (id) => {
const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`;

fetch(url)
.then(res => res.json())
.then(data => displayVideos(data.category));
}

// Display Categories
const displayCategories = (categories) => {
  const categoryContainer = document.
  getElementById('category-container');
  for(let cat of categories){
    const categoryDiv = document.createElement('div');
    categoryDiv.innerHTML = `
    <button onclick="loadCategoryVideos(${cat.category_id})" class="btn btn-sm">${cat.category}</button>`;
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
      <figure>
        <img class="object-cover w-full h-[150px]"
          src="${video.thumbnail}"
          alt="" />
        </figure>
         <div class="p-4">
          <div class="flex">
            <div class="mr-2">
              <img class="w-8 h-8 rounded-full" src="${video.authors[0].profile_picture}"/>
            </div>
          <div>
           <h2 class="card-title text-sm font-bold">${video.title}</h2>
           <div class="flex items-center">
           <p class="flex gap-2">${video.authors[0].profile_name} <img class="w-5 h-5" src="https://img.icons8.com/?size=48&id=98A4yZTt9abw&format=png"/></p>
           </div>
           <p>${video.others.views}</p>
          </div>
          </div>
    </div>`;
  videoContainer.append(videoCard);
})
}
loadCategories()

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
//   "description": "John Mulaney's 'Kid Gorgeous' has captured the hearts of many with 241K views. As a verified comedian, John delivers a masterclass in stand-up with clever anecdotes, quick wit, and relatable humor. This performance is a laugh-filled adventure through his unique take on life, politics, and pop culture."
// }