const tasks=[
{title:"Product description writing",cat:"Writing",pay:"R180",time:"1–2 hrs",desc:"Write clear descriptions for a small set of products using supplied information."},
{title:"Spreadsheet cleanup",cat:"Data",pay:"R250",time:"2 hrs",desc:"Organise and format a spreadsheet using provided rules. No sensitive information required."},
{title:"Market research summary",cat:"Research",pay:"R320",time:"3 hrs",desc:"Summarise publicly available information into a short, structured research note."},
{title:"Social media content ideas",cat:"Writing",pay:"R150",time:"1 hr",desc:"Create a list of original content ideas for a small local business."},
{title:"Simple poster design",cat:"Design",pay:"R300",time:"2–3 hrs",desc:"Create a basic promotional poster from supplied copy and brand assets."},
{title:"Admin document formatting",cat:"Admin",pay:"R200",time:"1–2 hrs",desc:"Format a supplied document with headings, spacing and consistent layout."}
];
const grid=document.querySelector("#taskGrid"),search=document.querySelector("#search"),category=document.querySelector("#category"),modal=document.querySelector("#modal"),postModal=document.querySelector("#postModal"),toast=document.querySelector("#toast");
let selected=null,applications=0;
function render(){
 const q=search.value.toLowerCase().trim(),c=category.value;
 const list=tasks.filter(t=>(c==="all"||t.cat===c)&&(!q||t.title.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.cat.toLowerCase().includes(q)));
 grid.innerHTML=list.map(t=>`<article class="task"><span class="tag">${t.cat}</span><h3>${t.title}</h3><p>${t.desc}</p><div class="task-bottom"><span><b class="pay">${t.pay}</b><small> • ${t.time}</small></span><button class="btn primary view" data-i="${tasks.indexOf(t)}">View task</button></div></article>`).join("")||"<p>No matching tasks found. Try another search.</p>";
 document.querySelectorAll(".view").forEach(b=>b.onclick=()=>openTask(+b.dataset.i));
 document.querySelector("#availableStat").textContent=list.length;
}
function openTask(i){selected=tasks[i];document.querySelector("#modalTitle").textContent=selected.title;document.querySelector("#modalDesc").textContent=selected.desc;document.querySelector("#modalMeta").innerHTML=`<span class="tag">${selected.cat}</span><span class="tag">${selected.time}</span><span class="tag">${selected.pay}</span>`;modal.classList.remove("hidden")}
function closeModals(){modal.classList.add("hidden");postModal.classList.add("hidden")}
function showToast(message){toast.textContent=message;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),3000)}
function updateActivity(title,pay,status="Application recorded"){applications++;document.querySelector("#dashApplications").textContent=applications;document.querySelector("#activityList").insertAdjacentHTML("afterbegin",`<div class="activity-row"><b>${title}</b><span>${status} • ${pay}</span></div>`)}
search.oninput=render;category.onchange=render;
document.querySelector("#close").onclick=closeModals;document.querySelector("#postClose").onclick=closeModals;
modal.onclick=e=>{if(e.target===modal)closeModals()};postModal.onclick=e=>{if(e.target===postModal)closeModals()};
document.querySelector("#apply").onclick=()=>{if(!selected)return;updateActivity(selected.title,selected.pay);modal.classList.add("hidden");showToast("Demo application recorded — no real application was submitted.")};
document.querySelector("#postTaskBtn").onclick=()=>postModal.classList.remove("hidden");
document.querySelector("#postForm").onsubmit=e=>{e.preventDefault();const data=new FormData(e.target);tasks.unshift({title:data.get("title"),cat:data.get("cat"),pay:data.get("pay"),time:"Flexible",desc:data.get("desc")});e.target.reset();postModal.classList.add("hidden");render();showToast("Sample task added to the prototype.");document.querySelector("#tasks").scrollIntoView({behavior:"smooth"})};
document.querySelector("#menuBtn").onclick=()=>showToast("Use the page links above to navigate on desktop.");
document.querySelector("#activityList").innerHTML='<div class="activity-row"><b>Product description writing</b><span>Approved • R180</span></div><div class="activity-row"><b>Spreadsheet cleanup</b><span>Approved • R250</span></div><div class="activity-row"><b>Market research summary</b><span>Pending review • R320</span></div>';
render();