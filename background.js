var currentDate = new Date();
var dd = currentDate.getDate();
var mm = currentDate.getMonth()+1;
var yy = currentDate.getFullYear();
if(dd<10) {dd = '0'+dd}
if(mm<10) {mm = '0'+mm}
currentDate = (mm)+ "/"+ dd + "/" + yy;
chrome.runtime.onInstalled.addListener(function(details){
    var defaultSettings = {
		censorCharacter: "****",
		filterMethod: "0",
		filterToggle: false,
		matchMethod: "0",
		multipleMeaning: "0",
		password: "null",
		warningDomains: [
			"https://www.facebook.com",
			"https://www.twitter.com",
			"https://www.9gag.com",
			"https://www.tumblr.com",
			"https://www.youtube.com",
		],
		websites: [
			{"count": "69","site": "https://www.google.com.ph"},
			{"count": "32","site": "https://notifications.google.com"},
			{"count": "38","site": "https://www.youtube.com"},
			{"count": "64","site": "https://www.twitter.com"},
			{"count": "47","site": "https://www.facebook.com"}
			],
		defaultWords: [
			{"count": 0,"word": "fuck","double":false},
			{"count": 0,"word": "fuckable","double":false},
			{"count": 0,"word": "fucked","double":false},
			{"count": 0,"word": "fucker","double":false},
			{"count": 0,"word": "fuckin","double":false},
			{"count": 0,"word": "fucks","double":false},
			{"count": 0,"word": "fvck","double":false},
			{"count": 0,"word": "shit","double":false},
			{"count": 0,"word": "asses","double":true},
			{"count": 0,"word": "asshole","double":false},
			{"count": 0,"word": "assshit","double":false},
			{"count": 0,"word": "ass-hat","double":false},
			{"count": 0,"word": "asssucker","double":false},
			{"count": 0,"word": "assbag","double":false},
			{"count": 0,"word": "assbite","double":false},
			{"count": 0,"word": "asscock","double":false},
			{"count": 0,"word": "assfuck","double":false},
			{"count": 0,"word": "asshead","double":false},
			{"count": 0,"word": "asslick","double":false},
			{"count": 0,"word": "asslicker","double":false},
			{"count": 0,"word": "assmonkey","double":false},
			{"count": 0,"word": "assmunch","double":false},
			{"count": 0,"word": "anal","double":false},
			{"count": 0,"word": "bastard","double":false},
			{"count": 0,"word": "blowjob","double":false},
			{"count": 0,"word": "bampot","double":false},
			{"count": 0,"word": "bitchass","double":false},
			{"count": 0,"word": "bitchy","double":false},
			{"count": 0,"word": "bullshit","double":false},
			{"count": 0,"word": "bitch","double":true},
			{"count": 0,"word": "cunt","double":false},
			{"count": 0,"word": "creampie","double":false},
			{"count": 0,"word": "cum","double":false},
			{"count": 0,"word": "clitface","double":false},
			{"count": 0,"word": "clusterfuck","double":false},
			{"count": 0,"word": "cockass","double":false},
			{"count": 0,"word": "cockbite","double":false},
			{"count": 0,"word": "cockburger","double":false},
			{"count": 0,"word": "cockface","double":false},
			{"count": 0,"word": "cockhead","double":false},
			{"count": 0,"word": "cockmonkey","double":false},
			{"count": 0,"word": "cocknose","double":false},
			{"count": 0,"word": "cocknugget","double":false},
			{"count": 0,"word": "cockshit","double":false},
			{"count": 0,"word": "cockwaffle","double":false},
			{"count": 0,"word": "cumbubble","double":false},
			{"count": 0,"word": "cumslut","double":false},
			{"count": 0,"word": "cumtart","double":false},
			{"count": 0,"word": "cuntass","double":false},
			{"count": 0,"word": "cumdumpster","double":false},
			{"count": 0,"word": "cuntface","double":false},
			{"count": 0,"word": "cuntrag","double":false},
			{"count": 0,"word": "cuntslut","double":false},
			{"count": 0,"word": "cock","double":true},
			{"count": 0,"word": "damn","double":false},
			{"count": 0,"word": "douche","double":false},
			{"count": 0,"word": "douchebag","double":false},
			{"count": 0,"word": "deepthroat","double":false},
			{"count": 0,"word": "dildo","double":false},
			{"count": 0,"word": "dildos","double":false},
			{"count": 0,"word": "dickbag","double":false},
			{"count": 0,"word": "dickface","double":false},
			{"count": 0,"word": "dickfuck","double":false},
			{"count": 0,"word": "dickfucker","double":false},
			{"count": 0,"word": "dickhead","double":false},
			{"count": 0,"word": "dickjuice","double":false},
			{"count": 0,"word": "dickmilk","double":false},
			{"count": 0,"word": "dicksucker","double":false},
			{"count": 0,"word": "dickwad","double":false},
			{"count": 0,"word": "dickweasel","double":false},
			{"count": 0,"word": "dickweed","double":false},
			{"count": 0,"word": "dickwod","double":false},
			{"count": 0,"word": "dipshit","double":false},
			{"count": 0,"word": "doochbag","double":false},
			{"count": 0,"word": "douchefag","double":false},
			{"count": 0,"word": "dumass","double":false},
			{"count": 0,"word": "dumb ass","double":false},
			{"count": 0,"word": "dumbass","double":false},
			{"count": 0,"word": "dumbfuck","double":false},
			{"count": 0,"word": "dumbshit","double":false},
			{"count": 0,"word": "dumshit","double":false},
			{"count": 0,"word": "dick","double":true},
			{"count": 0,"word": "fag","double":false},
			{"count": 0,"word": "fagfucker","double":false},
			{"count": 0,"word": "fuckers","double":false},
			{"count": 0,"word": "fucken","double":false},
			{"count": 0,"word": "fucking","double":false},
			{"count": 0,"word": "fuckass","double":false},
			{"count": 0,"word": "handjob","double":false},
			{"count": 0,"word": "holyshit","double":false},
			{"count": 0,"word": "jizz","double":false},
			{"count": 0,"word": "motherfucker","double":false},
			{"count": 0,"word": "motherfucka","double":false},
			{"count": 0,"word": "orgy","double":false},
			{"count": 0,"word": "piss","double":false},
			{"count": 0,"word": "pissed","double":false},
			{"count": 0,"word": "pissing","double":false},
			{"count": 0,"word": "shite","double":false},
			{"count": 0,"word": "thefuck","double":false},
			{"count": 0,"word": "whore","double":false}
		],
		substituteWords: [
			{"substitute": "[butt]","word": "anal","double":false},
			{"substitute": "[butt-hat]","word": "ass-hat","double":false},
			{"substitute": "[buttbag]","word": "assbag","double":false},
			{"substitute": "[buttbite]","word": "assbite","double":false},
			{"substitute": "[buttcrook]","word": "asscock","double":false},
			{"substitute": "[butts]","word": "asses","double":false},
			{"substitute": "[buttmate]","word": "assfuck","double":false},
			{"substitute": "[butthead]","word": "asshead","double":false},
			{"substitute": "[butthole]","word": "asshole","double":false},
			{"substitute": "[buttlick]","word": "asslick","double":false},
			{"substitute": "[buttlicker]","word": "asslicker","double":false},
			{"substitute": "[buttmonkey]","word": "assmonkey","double":false},
			{"substitute": "[butmunch]","word": "assmunch","double":false},
			{"substitute": "[buttard]","word": "assshit","double":false},
			{"substitute": "[buttsipper]","word": "asssucker","double":false},
			{"substitute": "[bam]","word": "bampot","double":false},
			{"substitute": "[no father]","word": "bastard","double":false},
			{"substitute": "[dog]","word": "bitch","double":true},
			{"substitute": "[mean]","word": "bitchass","double":false},
			{"substitute": "[mean]","word": "bitchy","double":false},
			{"substitute": "[job]","word": "blowjob","double":false},
			{"substitute": "[crap]","word": "bullshit","double":false},
			{"substitute": "[face]","word": "clitface","double":false},
			{"substitute": "[mess]","word": "clusterfuck","double":false},
			{"substitute": "[rooster]","word": "cock","double":true},
			{"substitute": "[nonsense]","word": "cockass","double":false},
			{"substitute": "[rooster]","word": "cockbite","double":false},
			{"substitute": "[donkey]","word": "cockburger","double":false},
			{"substitute": "[cock]","word": "cockface","double":false},
			{"substitute": "[vex]","word": "cockhead","double":false},
			{"substitute": "[monkey]","word": "cockmonkey","double":false},
			{"substitute": "[nose]","word": "cocknose","double":false},
			{"substitute": "[nugget]","word": "cocknugget","double":false},
			{"substitute": "[cock]","word": "cockshit","double":false},
			{"substitute": "[waffle]","word": "cockwaffle","double":false},
			{"substitute": "[food]","word": "creampie","double":false},
			{"substitute": "[rum]","word": "cum","double":false},
			{"substitute": "[bubble]","word": "cumbubble","double":false},
			{"substitute": "[choosy]","word": "cumdumpster","double":false},
			{"substitute": "[tart]","word": "cumslut","double":false},
			{"substitute": "[tart]","word": "cumtart","double":false},
			{"substitute": "[insult]","word": "cunt","double":false},
			{"substitute": "[irritating]","word": "cuntass","double":false},
			{"substitute": "[bunny]","word": "cuntface","double":false},
			{"substitute": "[napkin]","word": "cuntrag","double":false},
			{"substitute": "[annoying]","word": "cuntslut","double":false},
			{"substitute": "[duck]","word": "damn","double":false},
			{"substitute": "[throat]","word": "deepthroat","double":false},
			{"substitute": "[bob]","word": "dick","double":true},
			{"substitute": "[bag]","word": "dickbag","double":false},
			{"substitute": "[face]","word": "dickface","double":false},
			{"substitute": "[insult]","word": "dickfuck","double":false},
			{"substitute": "[anger]","word": "dickfucker","double":false},
			{"substitute": "[head]","word": "dickhead","double":false},
			{"substitute": "[juice]","word": "dickjuice","double":false},
			{"substitute": "[milk]","word": "dickmilk","double":false},
			{"substitute": "[gay]","word": "dicksucker","double":false},
			{"substitute": "[mean]","word": "dickwad","double":false},
			{"substitute": "[rude]","word": "dickweasel","double":false},
			{"substitute": "[weed]","word": "dickweed","double":false},
			{"substitute": "[annoying]","word": "dickwod","double":false},
			{"substitute": "[toy]","word": "dildo","double":false},
			{"substitute": "[toys]","word": "dildos","double":false},
			{"substitute": "[loser]","word": "dipshit","double":false},
			{"substitute": "[rude]","word": "doochbag","double":false},
			{"substitute": "[duck]","word": "douche","double":false},
			{"substitute": "[throat]","word": "douchebag","double":false},
			{"substitute": "[frat]","word": "douchefag","double":false},
			{"substitute": "[loser]","word": "dumass","double":false},
			{"substitute": "[ass]","word": "dumb ass","double":false},
			{"substitute": "[ass]","word": "dumbass","double":false},
			{"substitute": "[bob]","word": "dumbfuck","double":false},
			{"substitute": "[bob]","word": "dumbshit","double":false},
			{"substitute": "[bob]","word": "dumshit","double":false},
			{"substitute": "[duck]","word": "expression","double":false},
			{"substitute": "[happy]","word": "fag","double":false},
			{"substitute": "[happy]","word": "fagfucker","double":false},
			{"substitute": "[love]","word": "fuck","double":false},
			{"substitute": "[loveable]","word": "fuckable","double":false},
			{"substitute": "[loveass]","word": "fuckass","double":false},
			{"substitute": "[loved]","word": "fucked","double":false},
			{"substitute": "[loven]","word": "fucken","double":false},
			{"substitute": "[lover]","word": "fucker","double":false},
			{"substitute": "[lovers]","word": "fuckers","double":false},
			{"substitute": "[lovin]","word": "fuckin","double":false},
			{"substitute": "[loving]","word": "fucking","double":false},
			{"substitute": "[loves]","word": "fucks","double":false},
			{"substitute": "[lve]","word": "fvck","double":false},
			{"substitute": "[hand]","word": "handjob","double":false},
			{"substitute": "[holy]","word": "holyshit","double":false},
			{"substitute": "[fluid]","word": "jizz","double":false},
			{"substitute": "[mother]","word": "motherfucker","double":false},
			{"substitute": "[group]","word": "orgy","double":false},
			{"substitute": "[urine]","word": "piss","double":false},
			{"substitute": "[mad]","word": "pissed","double":false},
			{"substitute": "[urinating]","word": "pissing","double":false},
			{"substitute": "[turd]","word": "shit","double":false},
			{"substitute": "[crap]","word": "shite","double":false},
			{"substitute": "[crap]","word": "thefuck","double":false},
            {"substitute": "[pathetic]","word": "whore","double":false},
            {"substitute": "[votes]","word": "ballots","double":false},
            {"substitute": "[vote]","word": "ballot","double":false},
            {"substitute": "[discord]","word": "disagreement","double":false},
            {"substitute": "[statehouses]","word": "government buildings","double":false},
            {"substitute": "[more]","word": "additional","double":false},
            {"substitute": "[getting ready for]","word": "Bracing","double":false},
            {"substitute": "[fight]","word": "confrontation","double":false},
            {"substitute": "[fights]","word": "confrontations","double":false},
            {"substitute": "[disagree with]","word": "object to","double":false},
            {"substitute": "[disagree]","word": "object","double":false},
            {"substitute": "[votes]","word": "ballots","double":false},
            {"substitute": "[maintaining]","word": "perpetuating","double":false},
            {"substitute": "[maintain]","word": "perpetuate","double":false},
            {"substitute": "[quality]","word": "integrity","double":false},
            {"substitute": "[police]","word": "law enforcement","double":false},
            {"substitute": "[maintaining]","word": "perpetuating","double":false},
            {"substitute": "[getting ready]","word": "gearing up","double":false},
            {"substitute": "[maintaining]","word": "perpetuating","double":false},
            {"substitute": "[country]","word": "nation","double":false},
            {"substitute": "[terrorists]","word": "domestic extremists","double":false},
            {"substitute": "[before]","word": "prior to","double":false},
            {"substitute": "[maintaining]","word": "perpetuating","double":false},
            {"substitute": "[change]","word": "amend","double":false},
            {"substitute": "[government]","word": "federal","double":false},
            {"substitute": "[wrong]","word": "reprehensible","double":false},
            {"substitute": "[a lot]","word": "numerous","double":false},
            {"substitute": "[gotten]","word": "received","double":false},
            {"substitute": "[get]","word": "receive","double":false},
            {"substitute": "[confirm]","word": "legitimize","double":false},
            {"substitute": "[wrong]","word": "unsupported","double":false},
            {"substitute": "[went to]","word": "attended","double":false},
            {"substitute": "[lies]","word": "falsehoods","double":false},
            {"substitute": "[lie]","word": "falsehood","double":false},
		],
		textHistory: [],
		wordDates:[{date: currentDate, wordHist: []}]
	}

    if(details.reason == "install"){
       chrome.storage.local.set(defaultSettings, function() {
      	alert("Chrome Extension successfully installed");
    });
    }
});

//add list of blacklist websites
const defaultFilters = [
    "*://*.pornhub.com/*",
]

//website blocker function
chrome.webRequest.onBeforeRequest.addListener(
	function(details){return{ cancel: true}},
	{urls: defaultFilters},
	["blocking"]
)

//downloading explicit images
function downloadImages(info,tab) {
  alert('o');
  chrome.tabs.executeScript(tab.id,{file:"faceRec.js"});
}

chrome.contextMenus.create({
    title: "ExampleFunction",
    contexts:["page"],
    onclick: downloadImages,
  });

chrome.runtime.onMessage.addListener(function(message){
  //In case you want to do other things too this is a simple way to handle it
  if(message.method == "downloadImages"){
    message.images.forEach(function(v){
      allImages.push(v);
    });
    alert(allImages[0]);
  }
});

// chrome.webRequest.onCompleted.addListener(function(details) {
//     var url = document.createElement('a');
//     url.href = details.url;
//     if (url.search && url.search.indexOf('ajaxpipe=1') !== -1) {
//         console.log('New page via AJAX.');
//         chrome.tabs.executeScript({'file' : 'content.js'});
//     }
// }, {urls : ["*://*.facebook.com/*"]});



//-------- background for website blocking ----------

"use strict";

/* global chrome, URL */

chrome.runtime.onInstalled.addListener(function () { //Fired when the extension is first installed, when the extension is updated to a new version, and when Chrome is updated to a new version.

  chrome.storage.local.get(["blocked", "enabled"], function (local) { //get blocked and enabled from local storage
    if (!Array.isArray(local.blocked)) { //if passed value (local.blocked)is not array
      chrome.storage.local.set({ blocked: [] });//make blocked into array
    }

    if (typeof local.enabled !== "boolean") { //if enabled is not a boolean
      chrome.storage.local.set({ enabled: false }); //make enabled a boolean and set value to false
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) { //fired when tab is updated
  const url = changeInfo.pendingUrl || changeInfo.url;
  if (!url || !url.startsWith("http")) {
    return;
  }

  const hostname = new URL(url).hostname;

  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (Array.isArray(blocked) && enabled && blocked.find(domain => hostname.includes(domain))) { //if blocked is array, if enabled, and if domain name is in the list of blocked
      chrome.tabs.remove(tabId); //close that tab
    }
  });
});


chrome.contextMenus.create({
	title: "ExampleFunction",
	contexts:["page"],
	onclick: downloadImages,
  });

  function downloadImages(info,tab) {
	alert('o');
	chrome.tabs.executeScript(tab.id,{file:"faceRec.js"});
  }

  chrome.runtime.onMessage.addListener(function(message){
	//In case you want to do other things too this is a simple way to handle it
	if(message.method == "downloadImages"){
	  message.images.forEach(function(v){
		allImages.push(v);
	  });
	  alert(allImages[0]);
	}
  });
