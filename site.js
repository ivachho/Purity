"use strict";


const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");
//accessing textarea, save, and checkbox from html file 


save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(s => s.trim()).filter(Boolean);

  chrome.storage.local.set({ blocked }); //store blocked sites locally
}); 
// when save is clicked, blocked will equal the websites entered into textfield seperated by newline 


checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;
    
  chrome.storage.local.set({ enabled }); // store enabled status locally
}); //when checkbox is changed, change value of enabled

window.addEventListener("DOMContentLoaded", () => {  //when page is fully loaded
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (!Array.isArray(blocked)) {
      return;
    } 

    // blocked
    var value = blocked.join("\r\n"); // display every blocked in new line
    textarea.value = value;

    // enabled
    checkbox.checked = enabled;

    // show controls
    document.body.classList.add("ready");
  });
});
