// // UFO Landing Intro Animation
// window.addEventListener('load',()=>{
//   const tl = gsap.timeline({defaults:{ease:"power2.out"}});
//   tl.to(".ufo",{opacity:1,y:0,duration:1})
//     .to(".ufo",{y:100,scale:0.8,duration:1.5})
//     .to(".intro-text",{opacity:1,scale:1.1,duration:1},"-=0.5")
//     .to(".intro-quote",{opacity:1,duration:1},"-=0.5")
//     .to("#intro",{opacity:0,duration:1,delay:1,onComplete:()=>document.getElementById("intro").style.display="none"});
// });

// // Navigation behavior
// const navLinks=document.querySelectorAll('nav a');
// const sections=document.querySelectorAll('.section');
// navLinks.forEach(link=>{
//   link.addEventListener('click',e=>{
//     e.preventDefault();
//     const id=link.getAttribute('data-section');
//     sections.forEach(s=>s.classList.add('hidden'));
//     document.getElementById(id).classList.remove('hidden');
//     window.scrollTo({top:0,behavior:'smooth'});
//   });
// });

// // Explore button
// document.getElementById('exploreBtn').addEventListener('click',()=>{
//   sections.forEach(s=>s.classList.add('hidden'));
//   document.getElementById('about').classList.remove('hidden');
//   window.scrollTo({top:0,behavior:'smooth'});
// });

// UFO Landing Intro Animation
window.addEventListener('load',()=>{
  const tl = gsap.timeline({defaults:{ease:"power2.out"}});
  tl.to(".ufo",{opacity:1,y:0,duration:1})
    .to(".ufo",{y:100,scale:0.8,duration:1.5})
    .to(".intro-text",{opacity:1,scale:1.1,duration:1},"-=0.5")
    .to(".intro-quote",{opacity:1,duration:1},"-=0.5")
    .to("#intro",{opacity:0,duration:1,delay:1,onComplete:()=>document.getElementById("intro").style.display="none"});
});

// Navigation behavior
const navLinks=document.querySelectorAll('nav a');
const sections=document.querySelectorAll('.section');
navLinks.forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const id=link.getAttribute('data-section');
    sections.forEach(s=>s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    window.scrollTo({top:0,behavior:'smooth'});
  });
});

// Explore button
document.getElementById('exploreBtn').addEventListener('click',()=>{
  sections.forEach(s=>s.classList.add('hidden'));
  document.getElementById('about').classList.remove('hidden');
  window.scrollTo({top:0,behavior:'smooth'});
});
// Reveal on load for first section
document.querySelectorAll('#home *').forEach(el => el.classList.add('reveal'));
setTimeout(() => {
  document.querySelectorAll('#home .reveal').forEach(el => el.classList.add('show'));
}, 1200);

// Add reveal classes when switching sections
function revealSection(id){
  const els = document.querySelectorAll(`#${id} *`);
  els.forEach(el => el.classList.add('reveal'));
  setTimeout(() => {
    els.forEach(el => el.classList.add('show'));
  }, 100);
}

// Modify nav click to trigger reveal
navLinks.forEach(link=>{
  link.addEventListener('click',e=>{
    e.preventDefault();
    const id=link.getAttribute('data-section');
    sections.forEach(s=>s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
    revealSection(id);
    window.scrollTo({top:0,behavior:'smooth'});
  });
});

const starCursor = document.getElementById("star-cursor");

document.addEventListener("mousemove", (e) => {
  starCursor.style.left = e.pageX + "px";
  starCursor.style.top = e.pageY + "px";
});

const shootStar = document.getElementById("shooting-star");

document.addEventListener("mousemove", (e) => {
  shootStar.style.left = e.pageX + "px";
  shootStar.style.top = e.pageY + "px";

  // create trail dot
  const trail = document.createElement("div");
  trail.classList.add("cursor-trail");
  trail.style.left = e.pageX + "px";
  trail.style.top = e.pageY + "px";
  document.body.appendChild(trail);

  // remove after fade
  setTimeout(() => trail.remove(), 500);
});
/* ✨ Sparkle trail cursor */
document.addEventListener("mousemove", (e) => {
  const sp = document.createElement("div");
  sp.className = "sparkle";
  sp.style.left = e.pageX + "px";
  sp.style.top = e.pageY + "px";
  document.body.appendChild(sp);
  setTimeout(() => sp.remove(), 600);
});

/* ✨ Popup dish details */
function showDish(name, desc, price) {
  const popup = document.createElement("div");
  popup.style.position = "fixed";
  popup.style.top = "50%";
  popup.style.left = "50%";
  popup.style.transform = "translate(-50%, -50%)";
  popup.style.background = "rgba(0,0,0,0.8)";
  popup.style.padding = "20px";
  popup.style.borderRadius = "12px";
  popup.style.color = "#fff";
  popup.style.zIndex = "1000";
  popup.style.textAlign = "center";
  popup.innerHTML = `
    <h2>${name}</h2>
    <p>${desc}</p>
    <strong>${price}</strong><br><br>
    <button onclick="this.parentElement.remove()" style="padding:8px 14px;">Close</button>
  `;
  document.body.appendChild(popup);
}
// Dish Popup
const popup = document.createElement("div");
popup.className = "dish-popup";
popup.innerHTML = `
  <div class="popup-box">
    <img id="popup-img">
    <h2 id="popup-title"></h2>
    <p id="popup-desc"></p>
    <h3 id="popup-price"></h3>
    <button onclick="closePopup()" class="close-btn">Close</button>
  </div>
`;
document.body.appendChild(popup);

function showDish(name,img,desc,price) {
  document.getElementById("popup-img").src = img;
  document.getElementById("popup-title").innerText = name;
  document.getElementById("popup-desc").innerText = desc;
  document.getElementById("popup-price").innerText = price;
  popup.classList.add("show");
}

function closePopup() {
  popup.classList.remove("show");
}

// Attach to cards
document.querySelectorAll(".dish").forEach(card=>{
  card.addEventListener("click", ()=>{
    showDish(
      card.dataset.name,
      card.dataset.img,
      card.dataset.desc,
      card.dataset.price
    );
  });
});
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(btn){
  const card = btn.closest(".dish");
  const item = {
    name: card.dataset.name,
    price: card.dataset.price,
    img: card.dataset.img
  };

  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));

  alert("✅ Added to cart!");
  window.location.href = "order.html";
}
function trackOrder() {
  mapboxgl.accessToken = "YOUR_MAPBOX_TOKEN"; // Replace with your real token

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v11",
    center: [77.5946, 12.9716], // Bengaluru
    zoom: 10,
  });

  const car = new mapboxgl.Marker({ color: "orange" })
    .setLngLat([77.5946, 12.9716])
    .addTo(map);

  let lat = 12.9716;
  let lng = 77.5946;

  setInterval(() => {
    lat += 0.0008;
    lng += 0.0012;
    car.setLngLat([lng, lat]);
  }, 1200);
}



