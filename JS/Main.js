//Globals
var mouseX = 0;
var mouseY = 0;

// Creates a new paragraph element with optional class
function newParagraph(pinnerhtml, pclassname = "") {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = pinnerhtml;
    if (pclassname) {
        paragraph.className = pclassname;
    }
    return paragraph;
}

// Switches visibility between folders and updates navigation index
function folder_to(idx) {
    const folders = document.getElementsByClassName("folder");
    const indices = document.getElementsByClassName("index");

    // Hide all folders and disable interaction
    Array.from(folders).forEach(folder => {
        folder.style.opacity = 0;
        folder.style.pointerEvents = 'none';
    });

    // Show selected folder and enable interaction
    folders[idx].style.opacity = 1;
    folders[idx].style.pointerEvents = 'auto';

    // Dim all index links
    Array.from(indices).forEach(index => {
        index.style.opacity = 0.4;
    });

    // Highlight selected index link
    indices[idx].style.opacity = 1;

    // Scroll the page to a specific position
    window.scrollTo({ top: 1200 });
}

// Redirects browser to a new URL
function load_url(url) {
    window.location.href = url;
}

// Creates the index container with links to projects and "About / CV" section
function load_index_container() {
    const index_container = document.createElement("div");
    index_container.className = "index_container";
    index_container.id = "index_container";

    let curYear = 5000;
    const cutoff = 2023;

    // "About / CV" link
    const index = document.createElement("p");
    index.innerHTML = "About / CV";
    index.className = "index";
    index.onmouseover = () => folder_to(0);
    index_container.appendChild(index);
    index_container.appendChild(document.createElement("br"));

    // Iterate through projects and create year-wise index
    Projects.forEach((project, i) => {
        if (curYear > project.year && curYear >= cutoff) {
            const indexYear = document.createElement("p");
            indexYear.className = "indexYear";
            indexYear.innerHTML = curYear === cutoff ? "Earlier" : project.year.toString();
            index_container.appendChild(indexYear);
            curYear = project.year;
        }

        const indexItem = document.createElement("p");
        indexItem.className = "index";
        indexItem.innerHTML = project.indexlabel;
        indexItem.onmouseover = () => folder_to(i + 1);
        index_container.appendChild(indexItem);
    });

    document.body.appendChild(index_container);
}

// Loads project details into a folder
function load_folder(Project) {
    const Folder = document.createElement("div");
    Folder.className = "folder";

    // Add project description
    const Description = document.createElement("p");
    Description.className = "description";
    Description.id = "description";
    Description.innerHTML = `<i><strong>${Project.title}</strong> [${Project.year}]</i><br/><br/>${Project.description}`;
    Folder.appendChild(Description);

    // Add video elements
    Project.videoSources.forEach((videoSrc, v) => {
        const videoDiv = document.createElement("video");
        videoDiv.className = "image";
        videoDiv.poster = Project.videoPosters[v];
        videoDiv.src = videoSrc;
        videoDiv.autoplay = false;
        videoDiv.controls = true;
        videoDiv.muted = false;
        Folder.appendChild(videoDiv);
        Folder.appendChild(document.createElement("p"));
    });

    // Add image elements with captions
    Project.imageSources.forEach((imageSrc, j) => {
        const imageDiv = document.createElement("img");
        imageDiv.className = "image";
        imageDiv.src = imageSrc;
        Folder.appendChild(imageDiv);

        const spanDiv = document.createElement("span");
        spanDiv.innerHTML = Project.imageSpans[j];
        Folder.appendChild(spanDiv);
        Folder.appendChild(document.createElement("p"));
    });
	
    document.body.appendChild(Folder);
}

// Loads the "About" section of the page
function load_about() {
    const Folder = document.createElement("div");
    Folder.className = "folder";

    const textContainer = document.createElement("div");
    textContainer.className = "image";

    // Profile and Contact Information
    textContainer.appendChild(newParagraph("nielsgercama [at] gmail.com"));
    textContainer.appendChild(newParagraph("&nbsp;"));
    textContainer.appendChild(newParagraph("<strong>ABOUT</strong>"));
    textContainer.appendChild(newParagraph(BIO));
    textContainer.appendChild(newParagraph("&nbsp;"));

    // Education section
    textContainer.appendChild(newParagraph("<strong>Education</strong>"));
    textContainer.appendChild(newParagraph("2022-2024 &emsp; MA Design and Computation, Universit&auml;t der K&uuml;nste Berlin / Technische Universit&auml;t Berlin, Berlin, DE<br><br> 2019-2021 &emsp; MSc Artificial Intelligence, Universiteit van Amsterdam, Amsterdam, NL <br><br> 2015-2018 &emsp; BSc Liberal Arts and Sciences, Amsterdam University College, Amsterdam, NL"));
    textContainer.appendChild(newParagraph("&nbsp;"));

    // Events section
    textContainer.appendChild(newParagraph("<strong>Events</strong>"));
    let eventsText = '';
    let curYear = 5000;
    EVENTS.forEach(event => {
        if (curYear > event.year && curYear != 5000) eventsText += "<br>";
        eventsText += `${event.year} &emsp; ${event.content}<br><br>`;
        curYear = event.year;
    });
    textContainer.appendChild(newParagraph(eventsText));
    textContainer.appendChild(newParagraph("&nbsp;"));

    // Publications & Grants section
    textContainer.appendChild(newParagraph("<strong>Publications & Grants</strong>"));
    let publicationsText = '';
    PUBLICATIONS.forEach(publication => {
        publicationsText += `${publication.year} &emsp; ${publication.content}<br><br>`;
    });
    textContainer.appendChild(newParagraph(publicationsText));
    textContainer.appendChild(newParagraph("&nbsp;"));

    Folder.appendChild(textContainer);
    document.body.appendChild(Folder);
}

// Dynamic arrow animation with variable speed
var arrowsn = 0;
var counter = 20;
var mult = 1.1;
var weird = function() {
    counter = counter > 550 ? counter / mult : counter < 20 ? counter * mult : counter * mult;
    arrowsn = arrowsn >= 50 ? 0 : arrowsn + 1;

    document.getElementById("landingarrow").innerHTML = "&#129095<br>".repeat(arrowsn);
    setTimeout(weird, counter);
};

// Animates the landing page's elements
function landing_HUD_on() {
    setTimeout(() => document.getElementById('bar').style.top = 0, 500);
    setTimeout(() => document.getElementById('landingtitle').style.opacity = 1, 1000);
    setTimeout(weird, counter); // Start arrow animation after a delay
    setTimeout(() => document.getElementById('landingvideo').style.opacity = 0.75, 1000);
}

// Clamps a number between lower and upper bounds
function clamp(num, lower = 0, upper = 1) {
    return Math.min(Math.max(num, lower), upper);
}

// Normalizes a number within a range
function norm(num, lower, upper) {
    return clamp((num - lower) / (upper - lower));
}

// Updates the custom cursor position
function repositionCursor(x, y) {
	const cursor = document.getElementById("cursor");
    cursor.style.left = `${Math.round(x - cursor.clientWidth / 2)}px`;
    cursor.style.top = `${Math.round(y - cursor.clientHeight / 2)}px`;
}

function mouseMoveFunction(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
}



// Initializes and loads the full page content
function load_page() {
    window.onbeforeunload = () => window.scrollTo(0, 0);
    load_index_container();
    load_about();

    Projects.forEach(project => load_folder(project));

    document.addEventListener("mousemove", e => {
        mouseMoveFunction(e),
        repositionCursor(mouseX, mouseY)
    });

    document.onreadystatechange = function() {
        const cursor = document.getElementById("cursor");
        if (document.readyState !== "complete") {
            document.body.style.visibility = "hidden";
			document.getElementById("landing").style.visibility = "visible";
            cursor.style.visibility = "visible";
			document.body.style.overflow = "hidden";
        } else {
            setTimeout(() => {
                document.querySelector("body").style.visibility = "visible";
				cursor.style.border = "3px solid greenyellow";
				cursor.style.width = "70px";
				cursor.style.height = "70px";
				cursor.style.animation = "none";
				landing_HUD_on();
				document.body.className = "body";
            }, 3000);
        }
    };

    

    window.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const indexOpacity = norm(scrollTop, 750, 1200);
        document.getElementById("index_container").style.opacity = indexOpacity;
        document.getElementById("description").style.opacity = indexOpacity;

        const cursorOpacity = 1 - norm(scrollTop, 600, 750);
		const cursor = document.getElementById("cursor") 
		cursor.style.height = cursorOpacity * 80 + 10 + 'px';
        cursor.style.width = cursorOpacity * 80 + 10 + 'px';
		if (cursorOpacity >= 0.9) {
			cursor.style.transition = "all 500ms ease-out";
		} else {
			cursor.style.transition = "all 50ms ease-out";
		}
		repositionCursor(mouseX, mouseY);
    };
}
