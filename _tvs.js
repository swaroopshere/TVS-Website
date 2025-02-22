// tvs.js: JavaScript functions common to all Tri-Valley Stargazer web pages

// Last modified: Mar 4, 2023

// Names for banner image files.  They must all be in folder images/banner.
var bannerNames = [
	"01-H2O-daytime.jpg", 
	"02-H2O-nighttime.jpg", 
	"03-Comet-ISON.jpg", 
	"04-Milky-Way.jpg", 
	"05-NGC-4631.jpg", 
	"06-Horsehead-Nebula.jpg",
	"07-Solar-Eclipse.jpg"];

var bannerTitles = [
	'Our "Hidden Hill Observatory" site, H2O',
	"H2O at night",
	"Comet ISON, by Ken Sperber",
	"The Milky Way, by Alex Mellinger",
	"The Whale Galaxy, by Hilary Jones",
	"Horsehead Nebula, by Chuck Vaughn",
	"Solar Eclipse, by Gert Gottschalk"];

// Variables used to keep track of the shopping cart
var explanation="";			// Explanation for the other payment item
var item_count;				// Total number of items user has chosen
var otherValue=0;			// Amount for the other payment item
var total;				// Total amount the user will have to pay
var url;				// PayPal's URL, including query terms, etc.

// Parameters that control animated banners
var bannerIndex = 0;			// Index into bannerNames and bannerTitles for the current banner image
var blendID;				// The ID for the setInterval function that blends images
var blendPercent;			// The opacity percentage for the top banner image
var fadeTime = 1000;			// Time that it takes to fade from one banner to the next, in msec
var numChanges = 20;			// Number of times we change opacity.  Larger values => less jerky transition.
var swapTime = 10000;			// The time between banner swaps, in msec

var contactWidth = "300px";		// The width of the contact table entries
var currentTopic = null;		// Which links topic is displayed
var lastUpdateDate;			// The time this web page was last updated


// ********************************************************************************
// Code for pop-down menus.  TBD: this stuff still needs to be edited for style similar
// to my other stuff, same indenting, etc.  This is just Q&D stuff copied from TBD......................

var timeout         = 500;
var closetimer		= 0;
var ddmenuitem      = 0;

// open hidden layer
function mopen(id)
{	
	// cancel close timer
	mcancelclosetime();

	// close old layer
	if(ddmenuitem) ddmenuitem.style.visibility = 'hidden';

	// get new layer and show it
	ddmenuitem = document.getElementById(id);
	ddmenuitem.style.visibility = 'visible';
};

// close showed layer
function mclose() {
    if (ddmenuitem)
		ddmenuitem.style.visibility = 'hidden';
};

// go close timer
function mclosetime() {
	closetimer = window.setTimeout(mclose, timeout);
};

// cancel close timer
function mcancelclosetime() {
	if(closetimer) {
		window.clearTimeout(closetimer);
		closetimer = null;
	}
};

// close layer when click-out
document.onclick = mclose;

// ********************************************************************************



// Add one item to the list of things that user wants to pay for.  In particular, change the
// PayPal url to include a description of that item.  The third argument (details) is optional
// text that can be used to describe the item that is being added.  This is primarily for
// the explanation of the "Other" payments option.
function addItem(name, value, details) {
// TBD: value can't be zero for dues page?  But I'm allowing it temporarily for contributions page
//	if (value == 0)
//        	return;
	total += parseFloat(value);
	item_count++;
	var term = "&item_name_" + item_count + "=" + name;
	term = term + "&amount_" + item_count + "=" + value;
	if (details)
		term = term + "&on0_" + item_count + "=Details&os0_" + item_count + "=" + details;
	url = url + term;
};

// Display Observing Progam award info for the named person
function award(cert_no, name, date) {
	document.write("<tr><td>" + cert_no + "</td><td>" + name + "</td><td>" + date + "</td></tr>");
}


// Set the opacity to blend the top and bottom banners.
function blendBanners() {
	blendPercent += 100/numChanges;
	if (blendPercent > 100) {
		clearInterval(blendID);	// Stop the setInterval function that is calling us
		return;
	}
	changeOpacity("bannerTop", blendPercent);
	// changeOpacity("logo", 100);	// But the logo must always be visible
	return;
};


// Find what the user wants to pay for, and call PayPal.
function callPayPal() {
	updateItems();
	if (item_count == 0) {
		alert("You didn't order anything");
		return;
	}
	if (otherValue != 0 && explanation == "") {
		alert("Please enter an explanation for the other payment");
		item_count = 0;			// Prevent accidentally calling PayPal
		return;
	}

	// To test w/ PayPal's sandbox, the URL must look like http://www.trivalleystargazers.org/pay.shtml?sandbox
	var usingSandbox = (window.location.search.substring(1) == "sandbox");
	if (usingSandbox)
		alert("Testing with PayPal's sandbox");
	document.body.onbeforeunload = "";		// Let the user leave this page w/o a warning.
	window.location.assign(url);
};


// Change the opacity of an element.  This is used to transition smoothly between banner images.
// The id is the element to be changed, and the opacity is an integer percentage, between 0 and 100.
function changeOpacity(id, opacity) { 
	var object = document.getElementById(id).style; 
	object.opacity = (opacity / 100); 
	object.MozOpacity = (opacity / 100); 
	object.KhtmlOpacity = (opacity / 100); 
	object.filter = "alpha(opacity=" + opacity + ")"; 
}


// Display information about a contact.  If the title is non-null, format the contact's name
// and title in separate columns to facilitate preparation of a table.  The width of the
// table's entries is specified by global variable contactWidth.  A default value is used,
// but the user can change it if need be.
function contact(e_name, e_site, fullname, title) {
	if (title != null) {
		document.write("<div style='min-width:" + contactWidth + ";float:left;'>" + title + ";</div>");
		document.write("<div style='min-width:" + contactWidth + ";float:left;'>");
	}

	if (e_name == "" || e_site == "") {
		// No email address supplied; so don't provide a link
		document.write(fullname);
	}
	else {
		// Email address supplied, so present the contact's name as a link
		var email = e_name + "@" + e_site;
		var mailto = "mailto:" + email;
		document.write("<a href='" + mailto + "'" + " title='" + mailto + "'>" + fullname + "</a>");
	}
	if (title != null) {
		document.write("&nbsp;</div>");
		document.write("<br>");
	}
};


// Set up the newsletter web page to show all years for which newsletters are available.
// We assume they are always available from any year since 1996 up to the present date.
function defineNewsletterYears() {
	var thisYear = Number((new Date()).getFullYear());
	var select = document.getElementById("theYear");
	var year;
	for (year=1996; year<=thisYear; year++) {
		var option = document.createElement("option");
		option.text = String(year);
		option.value = String(year);
		if (year == thisYear)
			option.selected = true;
		try {
			// for IE earlier than version 8
			select.add(option, select.options[null]);
		}
		catch (e) {
			select.add(option, null);
		}
	}
};


// Show an astronomical event.  Assumes that a surrounding <table> has been set up.
function event(day, time, description) {
	var html = "";
	html +=
'	 <tr>' +
'	  <td>' + day + '</td>' +
'	  <td>' + time + '</td>' +
'	  <td>' + description + '</td>' +
'	 </tr>';
	document.write(html);
};


// Parse URL for query parameters of form name=value.  Returns the value, or "" if param is missing.
function getQueryParam(name) {
	var params;			/* Parameter string from the URL */
	var value;			/* Value, if any */

	var query = window.location.search.substring(1);	/* everything after the question mark */
	var vars = query.split("&");
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split("=");
		if (pair[0] == name)
			return pair[1];
	}
	return "";
}


// Fetch a newsletter
function goFetch() {
	var theMonth = document.getElementById("theMonth").value;
	var theYear = document.getElementById("theYear").value;		// eg. 2001
	var shortYear = theYear.substring(2);				// eg. 01
	var filename = "newsletters/" + theYear + "/";


	// Give user a warning if he tries to display a file that probably doesn't exist
	// This check won't know whether this month's newsletter has been published yet,
	// so it will try to display it, even if that triggers the 1&1 bug.

	if (theYear == 1996 && theMonth < 3) {
		alert("There is no newsletter for that date");
		return;
	}
	var thisYear = Number((new Date()).getFullYear());
	var thisMonth = Number((new Date()).getMonth()) + 1;
	if (theYear == thisYear && theMonth > thisMonth) {
		alert("That newsletter hasn't been published yet ");
		return;
	}

	// Files before 09'01 are HTML files, and files on or after that are PDF files

	if ((theYear < 2001) || (theYear == 2001 && theMonth < 9))
		filename += theMonth + shortYear + "/index.html";
	else
		filename += "tvsnews" + theMonth + shortYear + ".pdf#zoom=100&pagemode=none";

	// On 1&1's servers, if the file doesn't exist, they may try to do you a "favor"
	// by substituting a file that does exist.  For example, tvsnews0196/index.html
	// doesn't exist; so they substitute tvsnew1096/index.html assuming you have made a
	// typo.  This caused me many hours of debugging before I realized what was happening.

	window.location.href = filename;		// display the selected newsletter
};


// Highlight the TVS logo according to whether the mouse is over it or not
function highlightLogo(mouseover) {
	var logoSrc = document.getElementById("logo").src;
	if (mouseover)
		document.getElementById("logo").src = "images/logo2.png";
	else
		document.getElementById("logo").src = "images/logo1.png";	
};


// Display a presentation.  The link is optional.  If provided, it gives
// a link to a URL that gives the presenter's slides.  This might be a
// PDF file or an HTML file.  The function assumes that a <table> has
// be set up by the surrounding code.
function presentation(month, day, presenter, title, link) {
	if (link) {
		title = '<a href="' + link + '" title="See more about this talk">' + title + '</a>';
	}
	if (presenter) {
		if (title != null) {
			title = '; "' + title + '"';
		}
		else {
			title = "";
		}
	}
	else {
		presenter = "";
	}
	var html = "";
	html +=
'	 <tr>' +
'	  <td>' + month + '</td>' +
'	  <td>' + day + '</td>' +
'	  <td>' + presenter + title + '</td>' +
'	 </tr>';
	document.write(html);
};


// Set up the membership application form.  We do these things here to foil spambots.
function setupForm() {
	document.application.action="cgi-bin/apply.pl";
	document.getElementById("preset").value = "Preset";
};


// Display the date when this page was last updated
function showLastUpdate() {
	var html = "";
	html += 
'	 <div class="lastUpdate">' +
'	 Last modified on ' + lastUpdateDate +
'	  by <a href = "mailto:webmaster@trivalleystargazers.org" title="mailto:webmaster@trivalleystargazers.org">TVS Webmaster</a>' +
'	</div>';
	html = 'Last modified on ' + lastUpdateDate + ' by <a href = "webmaster@trivalleystargazers.org" title="mailto:webmaster@trivalleystargazers.org">TVS Webmaster</a>'
	document.write(html);
};


// Highlight a named optional block of HTML.  This is used to turn on announcements, describe different kinds of
// meetings, etc.  Blocks are identified using this syntax: <tag class="optional" id="opt_xxx"> where xxx is the option name.
// If we need to control a second related optional block, append details to the id: <tag class="optional" id="opt_xxx_details".
// Optional blocks are turned on in the <head> section of index.shtml.
function showOptional(optionName) {
        var element;
        element  = document.getElementById(optionName);
        if (element == null)
	    alert("Programming error: cannot find optional code for " + optionName);
        else
            element.style.display = "block";
        element = document.getElementById(optionName + "_details");
        if (element != null)
	    element.style.display = "block";
}


// Show the details for a selected topic.  This routine finds <div> tag corresponding to the given
// topic by prepending "D_" to the id of the topic tag.
function showLinksDetails(newTopic) {
        var newDetails = document.getElementById("D_" + newTopic.id);	
        if (currentTopic == null)
	    currentTopic = document.getElementById("overview");
        var currentDetails = document.getElementById("D_" + currentTopic.id);

        currentTopic.style.fontWeight = "normal";
	currentDetails.style.display = "none";

        newTopic.style.fontWeight = "bold";
        newDetails.style.display = "block";

        currentTopic = newTopic;
}   


// Start swapping banner images.  This function runs forever.
function startBannerSwapping() {
	setInterval(function() {swapBanners()}, swapTime);
}


// Swap banner images.  Ideally when user changes tabs, the banner image shouldn't revert 
// to the first image.  However, fixing this is hard.
function swapBanners() {
	var oldName = "url('images/banners/" + bannerNames[bannerIndex] + "')";
	oldname = "url('nosuch.jpg')";
	document.getElementById("bannerBottom").style.backgroundImage = oldName;
	blendPercent = 0;		// Set opacity of top element to 0, so that we still see the old banner for a while
	changeOpacity("bannerTop", blendPercent);
	// changeOpacity("logo", 100);	// But the logo must always be visible
	bannerIndex++;
	if (bannerIndex >= bannerNames.length)
		bannerIndex = 0;
	var newName = "url('images/banners/" + bannerNames[bannerIndex] + "')";
	document.getElementById("bannerTop").style.backgroundImage = newName;
	document.getElementById("bannerTop").title = bannerTitles[bannerIndex];
	// Start blending images
	blendID = setInterval(function() {blendBanners()}, fadeTime/numChanges);
};


// Don't let a user leave pay.shtml if he hasn't filled out the form.  The warning will only be delivered to
// people who get to pay.shtml by way of membership.shtml.  These are people who haven't completed the
// standard procedure fully.
function unloadHandler() {
    return "You must fill out this form if you want to pay using PayPal!";
}
	
// Find user's name, email, and donation amount
function updateDonation() {
	var e;

	// To test w/ PayPal's sandbox, the URL must look like http://www.trivalleystargazers.org/pay.shtml?sandbox
	var usingSandbox = (window.location.search.substring(1) == "sandbox");
	if (usingSandbox)
		url = "https://www.sandbox.paypal.com/cgi-bin/webscr?business=treasurer-facilitator@trivalleystargazers.org";
	else
		url = "https://www.paypal.com/cgi-bin/webscr?business=treasurer@trivalleystargazers.org";
	url += "&cmd=_cart&currency_code=USD&upload=1";

	e = document.getElementById("donation");
	if (e.value == "")
		e.value = "0";
	var r = /^\$?[0-9]+\.?[0-9]?[0-9]?$/;
	if (r.test(e.value)) {
		e.value = e.value.replace(/\$/g, '');
		addItem("Donation", e.value);
		e.value = "$" + e.value;
	}
	else {
		alert("Please enter a valid amount for the donation.  " + e.value + " isn't valid.");
		e.value = "$0";
		item_count = 0;			// Prevent accidentally calling PayPal
		return;
	};


}

// Find info about the user and how much he wants to donate.  Create a URL that tells what the user
// wants, then call PayPal to make the donation.
function doPayPalDonation() {
	var e;

	item_count = 0;

	// To test w/ PayPal's sandbox, the URL must look like http://www.trivalleystargazers.org/pay.shtml?sandbox
	var usingSandbox = (window.location.search.substring(1) == "sandbox");
	if (usingSandbox) {
		url = "https://www.sandbox.paypal.com/cgi-bin/webscr?business=treasurer-facilitator@trivalleystargazers.org";
		alert("Testing with PayPal's sandbox");
	}
	else
		url = "https://www.paypal.com/cgi-bin/webscr?business=treasurer@trivalleystargazers.org";
	url += "&cmd=_cart&currency_code=USD&upload=1";

	e = document.getElementById("donation");
	if (e.value == "")
		e.value = "0";			// An error, but it will be caught below
	var r = /^\$?[0-9]+\.?[0-9]?[0-9]?$/;
	if (r.test(e.value)) {
		e.value = e.value.replace(/\$/g, '');
		if (e.value <= 0) {
			alert("The donation amount is not valid.");
			return;
		}
		addItem("Donation", e.value);
		e.value = "$" + e.value;
	}
	else {
		alert("Please enter a valid amount for the donation.  " + e.value + " isn't valid.");
		e.value = "$0";
		item_count = 0;			// Prevent accidentally calling PayPal
		return;
	};

	// TBD value cannot be zereo?  But for testing I've changed addItem to allow it.
	e = document.getElementById("name");
	// TBD: check for empty string
	addItem(e.value, "0");

	e = document.getElementById("email");
	// TBD: check for empty string
	addItem(e.value, "0");

	e = document.getElementById("comment");
	// TBD: check for empty string
	addItem(e.value, "0");


	// Call PayPal.
	// TBD: snapshot's login name is hilary@snapshot.com
	window.location.assign(url);

}



// Find what items the member wants to pay for.  Compute total cost, and create a URL that tells PayPal
// what he wants.
function updateItems() {
	var e;

	item_count = 0;
	total = 0;
	// To test w/ PayPal's sandbox, the URL must look like http://www.trivalleystargazers.org/pay.shtml?sandbox
	var usingSandbox = (window.location.search.substring(1) == "sandbox");
	if (usingSandbox)
		url = "https://www.sandbox.paypal.com/cgi-bin/webscr?business=treasurer-facilitator@trivalleystargazers.org";
	else
		url = "https://www.paypal.com/cgi-bin/webscr?business=treasurer@trivalleystargazers.org";
	url += "&cmd=_cart&currency_code=USD&upload=1";

	e = document.getElementById("membershipType");
	addItem(e.options[e.selectedIndex].text + " Membership", e.value);

	e = document.getElementById("H2OKey");
	if (e.checked)
		addItem("H2O Key Deposit", e.value);

	e = document.getElementById("H2OAccess");
	if (e.checked)
		addItem("H2O Yearly Access Fee", e.value);

	e = document.getElementById("donation");
	if (e.value == "")
		e.value = "0";
	var r = /^\$?[0-9]+\.?[0-9]?[0-9]?$/;
	if (r.test(e.value)) {
		e.value = e.value.replace(/\$/g, '');
		addItem("Donation", e.value);
		e.value = "$" + e.value;
	}
	else {
		alert("Please enter a valid amount for the donation.  " + e.value + " isn't valid.");
		e.value = "$0";
		item_count = 0;			// Prevent accidentally calling PayPal
		return;
	};


	// Special handling for the Other payment item

	e = document.getElementById("other");
	explanation = document.getElementById("explanation").value;
        explanation = explanation.slice(0, 50);		// Up to 127 characters OK, but playing it safe
	otherValue = 0;
	if (e.value == "")
		e.value = "0";
	var r = /^\$?[0-9]+\.?[0-9]?[0-9]?$/;
	if (r.test(e.value)) {
		e.value = e.value.replace(/\$/g, '');
		otherValue = e.value;
		e.value = "$" + e.value;
	}
	else {
		alert("Please enter a valid amount for the Other expense.  " + e.value + " isn't valid.");
		e.value = "$0";
		item_count = 0;			// Prevent accidentally calling PayPal
		return;
	};

	// Add the item even if the explanation is missing.  We will catch that later.
	addItem("Other", otherValue, explanation);

};


// Show the user the current total value of things being ordered
function updateTotal() {
	updateItems();		// Computes global variable total (as well as the URL; but we don't use that)
	e = document.getElementById("total");
	e.value = "$"+total;
};
