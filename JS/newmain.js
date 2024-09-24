//Globals
var mouseX = 0;
var mouseY = 0;

const MEDIADIR = "Media/";
const PROJECTSDIR = MEDIADIR + "Projects/";
const LOGOSDIR = MEDIADIR + "Logos/";

//Helper functions
function createParagraph(innerhtml = "", classname = undefined) {
    p = document.createElement("p");
    p.innerHTML = innerhtml;
    if (classname) {
        p.className = classname;
    }
    return p;
}

function createWhitespace(height=50) {
    ws = document.createElement("div");
    ws.className = "whitespace"
    ws.style.height=height + "px";
    return ws;
}

function createImage(src, classname) {
    img = new Image();
    img.src = src;
    img.className = classname;
    return img;
}

function createAnchorInParagraph(anchortext, href, classname) {
    return createParagraph("<a href=" + href + " class='" + classname +"'>" + anchortext + "</a>", classname);
}

function createAnchor(anchortext, href, classname) {
    a = document.createElement("a");
    a.innerHTML = anchortext;
    a.href = href;
    a.className = classname;
    return a;
}

function clamp(num, lower = 0, upper = 1) {
    return Math.min(Math.max(num, lower), upper);
}

function norm(num, lower, upper) {
    return clamp((num - lower) / (upper - lower));
}



//Cursor functions
function repositionCursor(x, y) {
	const cursor = document.getElementById("cursor");
    cursor.style.left = `${Math.round(x - cursor.clientWidth / 2)}px`;
    cursor.style.top = `${Math.round(y - cursor.clientHeight / 2)}px`;
}

function mouseMoveFunction(e) {
	mouseX = e.clientX;
	mouseY = e.clientY;
}



//Load project functions
function clear_folder() {
    document.getElementById("folder").textContent = '';
    document.getElementById("description").textContent = '';
}

function load_description(title) {
    const projectData = Projects[title];

    const description = document.getElementById("description");

    description.appendChild(createParagraph(title, "title"));

    if (projectData.description) {
        description.appendChild(createParagraph(projectData.description, "text"));

    }

    if (projectData.links) {
        description.appendChild(createParagraph("Links", "header"));
        for (const [anchortext, href] of Object.entries(projectData.links)) {
            description.appendChild(createAnchorInParagraph('&#x1F517 ' + anchortext, href, "link"));
        }
    }

    // if (projectData.logos) {
    //     description.appendChild(createParagraph("Institutional support", "header"));
    //     for (const [institution, href] of Object.entries(projectData.logos)) {
    //         const src = LOGOSDIR + institution + ".png";
    //         logo = createImage(src, "logo");
    //         logo.onclick = function() {window.location.href = href};
    //         description.appendChild(logo);
    //     }
    // }

    if (projectData.institutions) {
        description.appendChild(createParagraph("Institutional support", "header"));
        for (const [institution, href] of Object.entries(projectData.institutions)) {
            description.appendChild(createAnchor(institution, href, "link widget"));
        }
    }
}

function load_folder(title) {
    const projectData = Projects[title];
    const folder = document.getElementById("folder");

    clear_folder();

    folder.appendChild(createWhitespace());
    

    load_description(title);

    if (projectData.imageSources) {
        for (const [i, src] of projectData.imageSources.entries()) {
            const label = document.createElement("span");
            label.innerHTML = projectData.imageSpans[i]
            label.className = "imagelabel";

            const imgcontainer = document.createElement("div");
            imgcontainer.className = "imagecontainer";
            const img = createImage(src, "image");
            //img.style.opacity=0;
            img.onload = function() {
                this.parentNode.style.animation = "none";
                this.parentNode.style.backgroundColor="transparent";
                this.nextSibling.style.opacity=1;
                this.style.opacity = 1;
            };
            imgcontainer.appendChild(img);
            imgcontainer.appendChild(label);
            folder.appendChild(imgcontainer);
        }
    }

    folder.appendChild(createWhitespace());
    
    folder.scrollIntoView({ behavior: "smooth"});
}

// Loads the "About" section of the page
function load_about() {
    clear_folder();
    folder = document.getElementById("folder");

    // Profile and Contact Information
    folder.appendChild(createParagraph("nielsgercama [at] gmail.com", "text"));
    folder.appendChild(createWhitespace());

    folder.appendChild(createParagraph("<strong>ABOUT</strong>","text"));
    folder.appendChild(createParagraph(BIO, "text"));
    folder.appendChild(createWhitespace());

    // Education section
    folder.appendChild(createParagraph("<strong>Education</strong>", "text"));
    folder.appendChild(createParagraph("2022-2024 &emsp; MA Design and Computation, Universit&auml;t der K&uuml;nste Berlin / Technische Universit&auml;t Berlin, Berlin, DE<br><br> 2019-2021 &emsp; MSc Artificial Intelligence, Universiteit van Amsterdam, Amsterdam, NL <br><br> 2015-2018 &emsp; BSc Liberal Arts and Sciences, Amsterdam University College, Amsterdam, NL", "text"));
    folder.appendChild(createWhitespace());

    // Events section
    folder.appendChild(createParagraph("<strong>Events</strong>", "text"));
    let eventsText = '';
    let curYear = 5000;
    EVENTS.forEach(event => {
        if (curYear > event.year && curYear != 5000) eventsText += "<br>";
        eventsText += `${event.year} &emsp; ${event.content}<br><br>`;
        curYear = event.year;
    });
    folder.appendChild(createParagraph(eventsText, "text"));
    folder.appendChild(createWhitespace());

    // Publications & Grants section
    folder.appendChild(createParagraph("<strong>Publications & Grants</strong>", "text"));
    let publicationsText = '';
    PUBLICATIONS.forEach(publication => {
        publicationsText += `${publication.year} &emsp; ${publication.content}<br><br>`;
    });
    folder.appendChild(createParagraph(publicationsText, "text"));
    folder.appendChild(createWhitespace());
}


function select_index(title = "") {
    const indices = document.getElementById("index").children;
    for (c of indices) {
        if (c.className == "title") {
            if (c.innerHTML == title) {
                c.style.color = "lightgreen";
            } else {
                c.style.color = "black";
            }
        }
    }
}


function load_index() {
    const index = document.getElementById("index");
    const folder = document.getElementById("folder");

    aboutTitle = createParagraph("About / CV", "title");
    aboutTitle.onmouseenter = (event) => {
        title = event.srcElement.innerHTML;
        select_index(title);
        load_about();
        folder.scrollIntoView({ behavior: "smooth"});
    }

    index.appendChild(aboutTitle);
    index.appendChild(document.createElement("br"));

    var currentYear = 99999;
    var lastYear;

    for (const [projectTitle, projectData] of Object.entries(Projects)) {
        
        if (!lastYear) {
            lastYear = projectData.year;
        }

        if (projectData.year < currentYear) {
            if (projectData.year < lastYear - 2) {
                index.appendChild(createParagraph("earlier", "year"));
                currentYear = -1;
            } else if (projectData.year >= lastYear - 2) {
                index.appendChild(createParagraph(projectData.year, "year"));
                currentYear = projectData.year;
            }
        }

        indexTitle = createParagraph(projectTitle, "title");
        indexTitle.onmouseenter =  (event) => {
            title = event.srcElement.innerHTML
            select_index(title)
            load_folder(title);
            folder.scrollIntoView({ behavior: "smooth"});
        };

        index.appendChild(indexTitle);
    }
}

// Dynamic arrow animation with variable speed
var arrowsn = 0;
var counter = 20;
var mult=1.1;
var weird = function() {
    landingarrow = document.getElementById("landingarrow");
    landing = document.getElementById("landing");

	if (counter > 550) {
		mult=1/mult;
	} else if (counter < 20) {
		mult=1/mult;
	}

	counter *= mult;
	
	if (landingarrow.offsetHeight > landing.offsetHeight + 100) {
		arrowsn = 0;
	} else {
		arrowsn += 1;
	}

	landingarrow.innerHTML = "&#129095<br>".repeat(arrowsn);
	setTimeout(weird, counter);
}

// Animates the landing page's elements
function landing_HUD_on() {
    setTimeout(() => document.getElementById('bar').style.top = 0, 500);
    setTimeout(() => document.getElementById('landingtitle').style.opacity = 1, 1000);
    setTimeout(weird, counter); // Start arrow animation after a delay
    setTimeout(() => document.getElementById('landingvideo').style.opacity = 0.75, 1000);
}


function load_page() {
    window.onbeforeunload = () => window.scrollTo(0, 0);
    window.scrollTo(0,0);

    load_index();
    load_about();

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
				document.body.style.overflow = "auto";
                document.onreadystatechange = function() {};
            }, 500);
        }
    };

    window.onscroll = function() {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

        const hud = document.getElementById("hud");
        //const landing = document.getElementById("landing");
        // console.log(window.scrollTop());
        // console.log(folder.offset())

        const folderTop = document.getElementById("folder").offsetTop;
        const hudOpacity = norm(scrollTop, folderTop - 200, folderTop - 1);
        hud.style.opacity = hudOpacity;
        if (hudOpacity < 0.2) {
            hud.style.pointerEvents="none";
        } else {
            hud.style.pointerEvents="all";
        }

        const cursorOpacity = 1 - norm(scrollTop, folderTop - 300, folderTop - 200);
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

    // folder = document.getElementById("folder");
    // console.log(folder);
    //folder.onreadystatechange = e => {console.log(e)}
    //     if (folder.readyState !== "complete") {
    //         folder.style.opacity = 0;
    //         console.log("ok");
    //     } else {
    //         setTimeout(() => {
    //             folder.style.opacity = 1;
    //             console.log("ok");
    //         }, 500);
    //     }
    // };
}
