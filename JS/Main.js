function newParagraph(pinnerhtml, pclassname="") {
	const paragraph = document.createElement("p");
	paragraph.innerHTML = pinnerhtml;
	if (pclassname != "") {
		paragraph.className = pclassname;
	}
	return paragraph
}

function folder_to(idx) {
	var elements = document.getElementsByClassName("folder");
	for (var i=0, max=elements.length; i < max; i++) {
		elements[i].style.opacity=0;
		elements[i].style.pointerEvents = 'none';
	}
	elements[idx].style.opacity=1;
	elements[idx].style.pointerEvents = 'auto';

	var elements = document.getElementsByClassName("index");
	for (var i=0, max=elements.length; i < max; i++) {
		elements[i].style.opacity=0.4;
	}
	elements[idx].style.opacity=1;

	window.scrollTo({top: 1200})
}


function load_url(url) {
	window.location.href = url;
}


function load_index_container() {
	const br = document.createElement("br");
	
	const index_container = document.createElement("div");
	index_container.className = "index_container";
	index_container.id = "index_container";
	

	const indexList = [];
	var curYear = 5000;
	const cutoff = 2023;
	const index = document.createElement("p");
	index.innerHTML = "About / CV";
	index.className = "index";
	index.onmouseover = function(inner_i) { return function(){folder_to(inner_i)} }(0);
	index_container.appendChild(index);
	
	index_container.appendChild(br);
	
	for (var i = 0; i < Projects.length; i++) {
		if (curYear > Projects[i].year && curYear >= cutoff) {
			const indexYear = document.createElement("p");
			indexYear.className = "indexYear";
			if (curYear == cutoff) {
				indexYear.innerHTML = "Earlier"
			} else {
				indexYear.innerHTML = Projects[i].year.toString();
			}
			index_container.appendChild(indexYear);
			curYear = Projects[i].year;
		}
		
		const index = document.createElement("p");
		index.className = "index";
		index.innerHTML = Projects[i].indexlabel;
		index.onmouseover = function(inner_i) { return function(){folder_to(inner_i)} }(i + 1);
		
		index_container.appendChild(index);
	}

	document.body.appendChild(index_container);
}

function load_folder(Project) {
	const Folder = document.createElement("div");
	Folder.className = "folder";
	
	
	
	const Description = document.createElement("p");
	Description.className = "description";
	Description.id = "description";
		
	Description.innerHTML = "<i><strong>" + Project.title + "</strong> [" + Project.year + "]</i> <br/><br/>" + Project.description;
	Folder.appendChild(Description);
	
	for (var v = 0; v < Project.videoSources.length; v++) {
		const videoDiv = document.createElement("video");
		videoDiv.className = "image";
		videoDiv.poster = Project.videoPosters[v];
		videoDiv.src = Project.videoSources[v];
		videoDiv.autoplay = false;
		videoDiv.controls = true;
		videoDiv.muted = false;
		
		Folder.appendChild(videoDiv);
		Folder.appendChild(document.createElement("p"));
	}
	
	for (var j = 0; j < Project.imageSources.length; j++) {
		const imageDiv = document.createElement("img");
		imageDiv.className = "image";
		imageDiv.src = Project.imageSources[j];
		Folder.appendChild(imageDiv);
		
		const spanDiv = document.createElement("SPAN");
		spanDiv.innerHTML = Project.imageSpans[j];
		Folder.appendChild(spanDiv);
		
		Folder.appendChild(document.createElement("p"));
	}
	
	document.body.appendChild(Folder);
}	

function load_about() {
	const Folder = document.createElement("div");
	Folder.className = "folder";
	
	const profilePic = document.createElement("img");
	profilePic.className = "description";
	profilePic.src = "Media/Misc/me.jpg";
	//Folder.appendChild(profilePic);
	
	const textContainer = document.createElement("div");
	textContainer.className = "image";
	
	textContainer.appendChild(newParagraph("nielsgercama [at] gmail.com"))
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	textContainer.appendChild(newParagraph("<strong>ABOUT</strong>"));
	textContainer.appendChild(newParagraph(BIO));
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	textContainer.appendChild(newParagraph("<strong>Education</strong>"));
	textContainer.appendChild(newParagraph("2022-2024	&emsp; MA Design and Computation, Universit&auml;t der K&uuml;nste Berlin / Technische Universit&auml;t Berlin, Berlin, DE<br><br> 2019-2021 &emsp; MSc Artificial Intelligence, Universiteit van Amsterdam, Amsterdam, NL <br><br> 2015-2018   &emsp; BSc Liberal Arts and Sciences, Amsterdam University College, Amsterdam, NL"));
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	textContainer.appendChild(newParagraph("<strong>Events</strong>"));
	var eventsText = ''
	var curYear = 5000
	for (var i = 0; i < EVENTS.length; i++) {
		if (curYear > EVENTS[i].year && curYear != 5000) {
			eventsText += "<br>";
		}
		eventsText += EVENTS[i].year.toString() + " &emsp; " + EVENTS[i].content + "<br><br>";	
		curYear = EVENTS[i].year;
	}
	textContainer.appendChild(newParagraph(eventsText));
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	textContainer.appendChild(newParagraph("<strong>Publications & Grants</strong>"));
	
	var publicationsText = '';
	for (var i = 0; i < PUBLICATIONS.length; i++) {
		publicationsText += PUBLICATIONS[i].year.toString() + " &emsp; " + PUBLICATIONS[i].content + "<br><br>";	
	}
	textContainer.appendChild(newParagraph(publicationsText));
	textContainer.appendChild(newParagraph("&nbsp;"));
	/*
	textContainer.appendChild(newParagraph("<strong>Digital proficiency</strong>"));
	var proficiencyText = '';
	for (var i = 0; i < DIGITALPROFICIENCY.length; i++) {
		proficiencyText += DIGITALPROFICIENCY[i].category + " &emsp; ";
		const content = DIGITALPROFICIENCY[i].content;
		
		proficiencyText += content[0];
		for (var j = 1; j < content.length; j++) {
			proficiencyText += " | " + content[j];
		}
		
		if (i < DIGITALPROFICIENCY.length - 1) {
			proficiencyText += "<br/><br/><br/>";
		}
	}
	
	textContainer.appendChild(newParagraph(proficiencyText));
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	
	textContainer.appendChild(newParagraph("<strong>Languages</strong>"));
	textContainer.appendChild(newParagraph("NL	&emsp; Native<br><br> EN &emsp;Native<br><br> DE	&emsp; C1<br><br> ES	&emsp; C1<br><br> FR	&emsp; B1"));
	
	*/
	
	Folder.appendChild(textContainer)
	document.body.appendChild(Folder);
}

var arrowsn = 0;
var counter = 20;
var mult=1.1;
var weird = function() {
	if (counter > 550) {
		mult=1/mult;
	} else if (counter < 20) {
		mult=1/mult;
	}

	counter *= mult;
	
	if (arrowsn >= 50) {
		arrowsn = 0;
	} else {
		arrowsn += 1;
	}

	document.getElementById("landingarrow").innerHTML = "&#129095<br>".repeat(arrowsn);
	setTimeout(weird, counter);
}

function load_landing_page() {
	setTimeout(function() {
		document.getElementById('bar').style.top = 0;
	}, 500);

	setTimeout(function() {
		document.getElementById('landingtitle').style.opacity = 1;
	}, 1000);

	
	// setTimeout(function() {
	// 	setInterval(updateArrows, 50)
	// }, 2000);

	
	setTimeout(function() {
		setTimeout(weird, counter);
	}, 2000);

	setTimeout(function() {
		document.getElementById('landingvideo').style.opacity=0.75;
	}, 1000)


}

function randomizeCursor() {
	const cursorstyles = ["alias", "all-scroll", "auto", "crosshair"]
	document.body.style.cursor = cursorstyles[Math.floor(Math.random() * cursorstyles.length)];
}

function clamp(num, lower=0, upper=1) {
	return Math.min(Math.max(num, lower), upper);
}

function norm(num, lower, upper) {
    return clamp((num - lower) / (upper - lower));
}


function load_page() {
	const cursor = document.createElement("cursor");
	cursor.id = "cursor";
	cursor.className = "cursor";
	document.body.addEventListener("mousemove", function(e) {
	cursor.style.left = e.clientX + "px",
		cursor.style.top = e.clientY + "px";
	});
	document.body.appendChild(cursor);

	document.onreadystatechange = function () {
		if (document.readyState !== "complete") {
			document.querySelector(
				"body").style.visibility = "hidden";
			document.querySelector(
				"#cursor").style.visibility = "visible";
		} else {
			document.querySelector(
				"body").style.visibility = "visible";
		}
	};

	load_landing_page();

	load_index_container();
		
	load_about();
	
	for (var i = 0; i < Projects.length; i++) {
		load_folder(Projects[i])
	}	

	


	

	// window.onscroll = function() {
	// 	const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
	// 	console.log("hh");
	// 	console.log(scrollTop);
	// 	const indexOpacity = norm(scrollTop, 750, 1200);
	// 	document.getElementById("index_container").style.opacity=indexOpacity;
	// 	document.getElementById("description").style.opacity=indexOpacity;

	// 	const cursorOpacity = 1 - norm(scrollTop, 600, 750);
	// 	console.log(cursorOpacity);

	// 	document.getElementById("cursor").style.opacity = cursorOpacity;
	// }

	//window.onscroll = function() {randomizeCursor()};
}


function toggleMenu() {
	var x = document.getElementById("myLinks");
	if (x.style.display === "block") {
		x.style.display = "none";
	} else {
		x.style.display = "block";
	}
}

function get_mobile_index() {
	const topnav = document.createElement("div");
	topnav.className = "topnav";
	
	toptitle = document.createElement("a");
	toptitle.innerHTML = "Niels Gercama | New Media";
	toptitle.href = "#home";
	toptitle.className = "active";
	topnav.appendChild(toptitle);
	
	topLinks = document.createElement("div");
	topLinks.id = "myLinks";
	topLinks.onclick = function() {toggleMenu()};
	
	var midlink = document.createElement("a");
	midlink.href = "#about";
	midlink.innerHTML = "About";
	topLinks.appendChild(midlink);
	
	var Year = 20500;
	for (var i = 0; i < Projects.length; i++) {
		if (Projects[i].year < Year) {
			Year = Projects[i].year;
			midlink = document.createElement("a");
			midlink.href = "#" + Year;
			midlink.innerHTML = "" + Year;
			topLinks.appendChild(midlink);
		}
	}
	
	midlink = document.createElement("a");
	midlink.href = "#contact";
	midlink.innerHTML = "Contact";
	topLinks.appendChild(midlink);
	
	midlink = document.createElement("a");
	midlink.href = "#cv";
	midlink.innerHTML = "CV";
	topLinks.appendChild(midlink);
	
	topnav.appendChild(topLinks);
	
	bottomLink = document.createElement("a");
	bottomLink.href = "javascript:void(0);";
	bottomLink.className = "icon";
	bottomLink.onclick = function() {toggleMenu()};
	bottomLink.innerHTML = "<i class='fa fa-bars'></i>"
	topnav.appendChild(bottomLink);
	
	return topnav;
}

function get_mobile_about() {
	const container = document.createElement("div");
	container.id = "about";
	
	const title = document.createElement("h3");
	title.style = "font-size:50px";
	title.innerHTML = "<br/>About";
	container.appendChild(title);
	
	const me = document.createElement("img");
	me.src = "../Media/Misc/me.jpg";
	me.style = "padding-top:0";
	me.className = "image";
	container.appendChild(me);
	
	container.appendChild(newParagraph(BIO));	
	
	return container;
}

function fill_mobile_folder(Project, folder) {
	subtitle = document.createElement("h2");
	subtitle.innerHTML = "<br/><em><strong>" + Project.title + "</strong> [" + Project.year + "] </em></h2>"
	folder.appendChild(subtitle);
	
	folder.appendChild(newParagraph(Project.description));
	
	for (var v = 0; v < Project.videoSources.length; v++) {
		const videoDiv = document.createElement("video");
		videoDiv.className = "image";
		videoDiv.poster = "../" + Project.videoPosters[v];
		videoDiv.src = "../"+ Project.videoSources[v];
		videoDiv.autoplay = false;
		videoDiv.controls = true;
		videoDiv.muted = false;
		
		folder.appendChild(videoDiv);
		folder.appendChild(document.createElement("p"));
	}
	
	for (var j = 0; j < Project.imageSources.length; j++) {
		folderImage = document.createElement("img");
		folderImage.src = "../" + Project.imageSources[j];
		folderImage.className = "image";
		folder.appendChild(folderImage);
		
		folderSpan = document.createElement("span");
		folderSpan.innerHTML = Project.imageSpans[j];
		folder.appendChild(folderSpan);
	}
	
	return folder
}

function get_mobile_contact() {
	contactDiv = document.createElement("div");
	contactDiv.id = "contact";
	contactDiv.style = "padding-left:10px";
	
	title = document.createElement("h3");
	title.innerHTML = "<br/>Contact<br/>"
	contactDiv.appendChild(title);
	
	contactLink = document.createElement("a");
	contactLink.style = "color:black";
	contactLink.href="mailto:nielsgercaam@gmail.com";
	contactLink.innerHTML = "<h2>nielsgercama [at] gmail.com</h2>"
	contactDiv.appendChild(contactLink);
	
	contactLink = document.createElement("a");
	contactLink.style = "color:black";
	contactLink.href = "https://www.instagram.com/niels_gercama/?hl=en";
	contactLink.innerHTML = "<h2>@niels_gercama</h2>";
	contactDiv.appendChild(contactLink);
	
	return contactDiv;
}

function get_mobile_cv() {
	const textContainer = document.createElement("div");
	textContainer.id = "cv";
	
	var title = document.createElement("h3");
	title.innerHTML = "<br/>CV<br/>";
	textContainer.appendChild(title);
	
			
	textContainer.appendChild(newParagraph("<strong>Education</strong>"));
    var paraf = newParagraph("2022-2024<br/><strong>MA Design And Computation</strong><br/>Universit&auml;t der K&uuml;nste Berlin / <br/>Technische Universit&auml;t Berlin<br/><br/>2019-2021<br/><strong>MSc Artificial Intelligence</strong><br/>Universiteit van Amsterdam <br/><br/>2015-2018<br/><strong>BSc Liberal Arts and Sciences</strong><br/>Amsterdam University College");
	paraf.style="font-size:14px";
	textContainer.appendChild(paraf);
	
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	textContainer.appendChild(newParagraph("<strong>Events</strong>"));
	var eventsText = ''
	var curYear = 5000
	for (var i = 0; i < EVENTS.length; i++) {
		if (curYear > EVENTS[i].year && curYear != 5000) {
			eventsText += "<br>";
		}
		eventsText += EVENTS[i].year.toString() + " &emsp; " + EVENTS[i].content + "<br><br>";	
		curYear = EVENTS[i].year;
	}
	var paraf = newParagraph(eventsText);
	paraf.style="font-size:14px";
	textContainer.appendChild(paraf);
	
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	textContainer.appendChild(newParagraph("<strong>Publications & Grants</strong>"));
	
	var publicationsText = '';
	for (var i = 0; i < PUBLICATIONS.length; i++) {
		publicationsText += PUBLICATIONS[i].year.toString() + " &emsp; " + PUBLICATIONS[i].content + "<br><br>";	
	}
	var paraf = newParagraph(publicationsText);
	paraf.style="font-size:14px";
	textContainer.appendChild(paraf);
	
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	/*textContainer.appendChild(newParagraph("<strong>Digital proficiency</strong>"));
	var proficiencyText = '';
	for (var i = 0; i < DIGITALPROFICIENCY.length; i++) {
		proficiencyText += DIGITALPROFICIENCY[i].category + " &emsp; ";
		const content = DIGITALPROFICIENCY[i].content;
		
		proficiencyText += content[0];
		for (var j = 1; j < content.length; j++) {
			proficiencyText += " | " + content[j];
		}
		
		if (i < DIGITALPROFICIENCY.length - 1) {
			proficiencyText += "<br/><br/><br/>";
		}
	}
	var paraf = newParagraph(proficiencyText);
	paraf.style="font-size:14px; text-align: justify; text-justify: inter-word;";
	textContainer.appendChild(paraf);
	textContainer.appendChild(newParagraph("&nbsp;"));
	
	
	textContainer.appendChild(newParagraph("<strong>Languages</strong>"));
	textContainer.appendChild(newParagraph("NL	&emsp; Native<br> EN &emsp;Native<br> DE	&emsp; C1<br> ES	&emsp; C1<br> FR	&emsp; B1"));
	*/
	var paraf = newParagraph("&copy; copyright Niels Gercama");
	paraf.style = "font-size:14px; opacity:0.5;";
	textContainer.appendChild(paraf);
	
	return textContainer;
}

function load_mobile_page() {
	const mobileContainer = document.createElement("div");
	mobileContainer.className = "mobile-container";
	
	mobileContainer.appendChild(get_mobile_index());
	mobileContainer.appendChild(get_mobile_about());
	
	var Year = 25000;
	var MobileFolders = {};
	for (var i = 0; i < Projects.length; i++) {
		if (Projects[i].year < Year) {
			Year = Projects[i].year;
			folderDiv = document.createElement("div");
			folderDiv.id = "" + Year;
			
			title = document.createElement("h3");
			title.innerHTML = "<br/>"+Year+"<br/>";
			folderDiv.appendChild(title);
			
			MobileFolders[Year] = folderDiv;
		}
	}
	
	for (var i = 0; i < Projects.length; i++) {
		MobileFolders[Projects[i].year] = fill_mobile_folder(Projects[i], MobileFolders[Projects[i].year]); 
	}
	
	Year = 25000;
	for (var i = 0; i < Projects.length; i++) {
		if (Projects[i].year < Year) {
			Year = Projects[i].year;
			mobileContainer.appendChild(MobileFolders[Year]);
		}
	}
	
	mobileContainer.appendChild(get_mobile_contact());
	
	mobileContainer.appendChild(get_mobile_cv());
	
	end = document.createElement("div");
	
	title = document.createElement("h3");
	title.style = "padding-left:50%";
	title.innerHTML = "<br/>END"
	
	end.appendChild(title);
	
	mobileContainer.appendChild(end);
	
	document.body.appendChild(mobileContainer);
}





