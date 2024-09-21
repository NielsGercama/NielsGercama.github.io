opacityloader = 1;
faderate = 0.1;

function MyFadeFunction1() {
	if (opacityloader>0) {
		opacityloader += -faderate;
		setTimeout(function(){MyFadeFunction1()},100);
	} else {
		document.querySelector("#loader").style.display = "none";
		MyFadeFunction2();
	}
	document.querySelector("#loader").style.opacity = opacityloader;
}

opacitypage = 0;
function MyFadeFunction2() {
	document.querySelector("body").style.opacity = opacitypage;
	document.querySelector("body").style.visibility = "visible";
		if (opacitypage<1) {
			opacitypage += faderate;
			setTimeout(function(){MyFadeFunction2()},100);
		}
}



function loadPage() {
	if (screen.width <= 699) {
        	document.location = "mobile/PRISMA";
        }
		
	opacityloader = 1;
	faderate = 0.2;
	opacitypage = 0;

	document.onreadystatechange = function () {
		if (document.readyState !== "complete") {
			document.querySelector(
				"body").style.visibility = "hidden";
			document.querySelector(
				"#loader").style.visibility = "visible";
		} else {
			MyFadeFunction1();
			
		}
	};
}