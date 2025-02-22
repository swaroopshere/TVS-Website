/**
* Responsive
* 
* author: Thilo Ilg
* version: 1.1.5
* 
**/

/** 
* --- jAlbumGlobals ---
* jAlbumGlobals is responsible for constant parameter of the skin.
* In the process of creating an album the jAlbum parser will overwrite 
* the variables according to the skin with the selected ones in the
* program. jAlbumGlobals also includes global variables which describe
* the state of the skin like if it is embedded, viewed on a mobile device,
* online or in filesystem etc.
*/
var jAlbumGlobals = (function () {

	var styles = ["dark.css", "light.css", "transparent.css"]; // styles

	var mobile = isMobile(); // is the skin viewed on a mobile device
	var online = isOnline(); // is the skin viewed online or in the filesystem
	var jAlbumURL = getURL(); // what's the current url?

	var stylePath = ""; //path points to the styles folder
	var resPath = ""; // path points to the res folder

	var credits = "Create photo gallery websites with jAlbum"; // should skin show credits in footer
	var albumTitle = "NEOWISE"; // what's the album title?
	var contentPath = ""; // path points to the skin folder
	var imgHoverScaleFactor = "scale(1.1)"; // scale factor of hovering an element

	var folderTitleUp = true; // positioning of folder title, under or above folder
	var folderImgCount = false; // says if folder deep count should be shown
	var maxImgInRow = 10; // restricts the number of elements in a row
	var imgBorderSize = 3; // define border size of element
	var imgBoxSize = 175; // defines size of container of element
	var showFolderName = false; // says if folder name should be displayed
	var textSize = 11; // defines text size of whole page
	var showComments = true; // defines if comments should be shown in slideshow
	var slideBorderSize = 0;
	var slideBorderColor = "#ff000000";
	var style = "dark.css";

	var dataTree = {"path":"NEOWISE","counters":{"total":25,"images":25,"files":25},"objects":[{"path":"07-06%20Kai.jpg","image":{"path":"slides\/07-06%20Kai.jpg","width":1536,"height":945},"thumb":{"path":"thumbs\/07-06%20Kai.jpg","width":256,"height":158},"fileSize":372569,"name":"07-06 Kai.jpg","comment":"07\/06\/20 Kai Yung Taken on top of Del Valle Road","fileDate":"2020-07-27T16:28:00.0Z","category":"image","camera":{"exposureTime":"1.0s","originalDate":"2020-07-06T04:40:41.0Z","cameraModel":"Canon EOS 6D","resolution":"5099 x 3138","cameraMake":"Canon","isoEquivalent":400,"flash":"Flash did not fire, auto"}},{"path":"07-06b%20Kai.jpg","image":{"path":"slides\/07-06b%20Kai.jpg","width":1047,"height":1536},"thumb":{"path":"thumbs\/07-06b%20Kai.jpg","width":175,"height":256},"fileSize":787275,"name":"07-06b Kai.jpg","comment":"07\/06\/20 Kai Yung Taken on top of Dell Valle Road","fileDate":"2020-07-27T16:28:44.0Z","category":"image","camera":{"resolution":"3302 x 4845"}},{"path":"07-08%20Ken.jpg","image":{"path":"slides\/07-08%20Ken.jpg","width":1536,"height":1024},"thumb":{"path":"thumbs\/07-08%20Ken.jpg","width":256,"height":171},"fileSize":1507695,"name":"07-08 Ken.jpg","comment":"07\/08\/20 Ken Sperber Composite of four images taken 4 minutes apart","fileDate":"2020-07-27T16:26:22.0Z","category":"image","camera":{"aperture":2.8,"exposureTime":"2.0s","originalDate":"2020-07-08T04:39:23.0Z","cameraModel":"Canon EOS 6D","resolution":"5472 x 3648","cameraMake":"Canon","isoEquivalent":1250,"flash":"Flash did not fire, auto","focalLength":"135.0mm"}},{"path":"07-08%20Rich.jpg","image":{"path":"slides\/07-08%20Rich.jpg","width":1512,"height":1536},"thumb":{"path":"thumbs\/07-08%20Rich.jpg","width":252,"height":256},"fileSize":450344,"name":"07-08 Rich.jpg","comment":"07\/08\/20 Rich Combs at 3:45 AM from Patterson Pass","fileDate":"2020-07-27T16:30:47.0Z","category":"image","camera":{"aperture":1.73,"exposureTime":"0.399968s","originalDate":"2020-07-08T04:38:10.0Z","cameraModel":"Pixel 4","focusDistance":"0.241m","focalLength35mm":"27.0mm","resolution":"2592 x 1944","cameraMake":"Google","isoEquivalent":2600,"flash":"Flash did not fire, auto","focalLength":"4.4mm"}},{"path":"07-09%20Kevin.jpg","image":{"path":"slides\/07-09%20Kevin.jpg","width":1536,"height":1025},"creator":"Kevin McLoughlin","thumb":{"path":"thumbs\/07-09%20Kevin.jpg","width":256,"height":171},"fileSize":10984093,"name":"07-09 Kevin.jpg","comment":"07\/09\/20 Kevin McLoughlin.  Morning at Inspiration Point in Berkeley.  Shows Pleiades.  300 mm, ISO 1600, 4 sec at f\/5.6","fileDate":"2020-07-27T16:24:00.0Z","category":"image","camera":{"aperture":3.5,"exposureTime":"3.0s","originalDate":"2020-07-09T04:39:29.0Z","cameraModel":"NIKON D610","focalLength35mm":"28.0mm","cameraMake":"NIKON CORPORATION","isoEquivalent":1600,"flash":"Flash did not fire, auto","focalLength":"28.0mm"}},{"path":"07-09%20Ross.jpg","image":{"path":"slides\/07-09%20Ross.jpg","width":1536,"height":1024},"creator":"K Ross Gaunt","thumb":{"path":"thumbs\/07-09%20Ross.jpg","width":256,"height":171},"fileSize":3756154,"rights":"Copyright 2012","name":"07-09 Ross.jpg","comment":"Ross Gaunt 07\/09\/20 Taken from Patterson Pass Road in the morning.  Canon 5D-MRK 3, ISO-125, 70mm FL, F 2\/8, 1 sec.","fileDate":"2020-07-27T16:25:31.0Z","category":"image","camera":{"aperture":2.8,"exposureTime":"1.0s","originalDate":"2020-07-09T03:47:55.0Z","cameraModel":"Canon EOS 5D Mark III","resolution":"5760 x 3840","cameraMake":"Canon","isoEquivalent":1250,"flash":"Flash did not fire, auto","focalLength":"70.0mm"}},{"path":"07-09a%20Karthik.JPG","image":{"path":"slides\/07-09a%20Karthik.JPG","width":1536,"height":1022},"thumb":{"path":"thumbs\/07-09a%20Karthik.JPG","width":256,"height":170},"fileSize":2052326,"name":"07-09a Karthik.JPG","comment":"07\/09\/20 Karthik Vasudhevan Taken from Fremont.  Nikon Z6, 10-sec exposure.","fileDate":"2020-07-27T16:21:20.0Z","category":"image","camera":{"aperture":5.6,"exposureTime":"10.0s","originalDate":"2020-07-09T04:55:35.0Z","cameraModel":"NIKON Z 6","focalLength35mm":"300.0mm","resolution":"6048 x 4024","cameraMake":"NIKON CORPORATION","isoEquivalent":560,"flash":"Flash did not fire","focalLength":"300.0mm"}},{"path":"07-09a%20Swaroop.jpg","image":{"path":"slides\/07-09a%20Swaroop.jpg","width":1536,"height":910},"thumb":{"path":"thumbs\/07-09a%20Swaroop.jpg","width":256,"height":152},"fileSize":2739089,"rights":"© Swaroop Shere","name":"07-09a Swaroop.jpg","comment":"07\/09\/20 Swaroop Shere.  Taken from a nearby park in Dublin.  Canon 5D-Mkii 400mm focal length, at ISO 400, about 8 sec exposure","fileDate":"2020-07-27T16:22:42.0Z","category":"image","title":"Comet Neowise C\/2020 F3","camera":{"aperture":5.6,"exposureTime":"25.0s","originalDate":"2020-07-09T04:38:39.0Z","cameraModel":"Canon EOS 5D Mark II","cameraMake":"Canon","isoEquivalent":400,"flash":"Flash did not fire, auto","focalLength":"400.0mm"}},{"path":"07-09b%20Karthik.JPG","image":{"path":"slides\/07-09b%20Karthik.JPG","width":1536,"height":1022},"thumb":{"path":"thumbs\/07-09b%20Karthik.JPG","width":256,"height":170},"fileSize":1688104,"name":"07-09b Karthik.JPG","comment":"07\/09\/20 Karthik Vasudhevan.  Taken in morning from Fremont.  Nikon Z6, 10-sec exposure.","fileDate":"2020-07-27T16:21:45.0Z","category":"image","camera":{"aperture":4.2,"exposureTime":"10.0s","originalDate":"2020-07-09T04:56:22.0Z","cameraModel":"NIKON Z 6","focalLength35mm":"150.0mm","resolution":"6048 x 4024","cameraMake":"NIKON CORPORATION","isoEquivalent":280,"flash":"Flash did not fire","focalLength":"150.0mm"}},{"path":"07-09b%20Swaroop.jpg","image":{"path":"slides\/07-09b%20Swaroop.jpg","width":1536,"height":1024},"thumb":{"path":"thumbs\/07-09b%20Swaroop.jpg","width":256,"height":171},"fileSize":2508149,"rights":"© Swaroop Shere","name":"07-09b Swaroop.jpg","comment":"07\/09\/20 Swaroop Shere.  Taken from a nearby park in Dublin.  Canon 5D-Mkii 400mm focal length, at ISO 400, about 8 sec exposure","fileDate":"2020-07-27T16:23:20.0Z","category":"image","title":"Comet Neowise C\/2020 F3","camera":{"aperture":5.6,"exposureTime":"10.0s","originalDate":"2020-07-09T04:34:18.0Z","cameraModel":"Canon EOS 5D Mark II","cameraMake":"Canon","isoEquivalent":400,"flash":"Flash did not fire, auto","focalLength":"400.0mm"}},{"path":"07-10%20Chuck.jpg","image":{"path":"slides\/07-10%20Chuck.jpg","width":1536,"height":1152},"thumb":{"path":"thumbs\/07-10%20Chuck.jpg","width":256,"height":192},"fileSize":3996664,"name":"07-10 Chuck.jpg","comment":"07\/10\/20 Chuck Grant.  On Del Valle Hill.  Taken with iPhone 11pro.  Shows Unistellar eVscope.","fileDate":"2020-07-27T16:18:32.0Z","category":"image","camera":{"aperture":1.8,"exposureTime":"1.0s","originalDate":"2020-07-10T04:22:34.0Z","cameraModel":"iPhone 11 Pro Max","location":{"altitude":"411 metres","latitude":"37°36'21.42\" N","lat":37.60595,"long":-121.68897,"longitude":"121°41'20.30\" W"},"focalLength35mm":"26.0mm","resolution":"4032 x 3024","cameraMake":"Apple","isoEquivalent":5000,"flash":"Flash did not fire, auto","focalLength":"4.3mm"}},{"path":"07-10%20Ross.jpg","image":{"path":"slides\/07-10%20Ross.jpg","width":1536,"height":1024},"creator":"K Ross Gaunt","thumb":{"path":"thumbs\/07-10%20Ross.jpg","width":256,"height":171},"fileSize":5554249,"rights":"Copyright 2012","name":"07-10 Ross.jpg","comment":"07\/09\/20 Ross Gaunt.  Canon 5D Mark-III, ISO 1600, F\/2.8, 200mm FL, 6 sec","fileDate":"2020-07-27T16:19:01.0Z","category":"image","camera":{"aperture":2.8,"exposureTime":"6.0s","originalDate":"2020-07-09T03:32:31.0Z","cameraModel":"Canon EOS 5D Mark III","resolution":"5760 x 3840","cameraMake":"Canon","isoEquivalent":1600,"flash":"Flash did not fire, auto","focalLength":"200.0mm"}},{"path":"07-12%20David%20Childree.jpg","image":{"path":"slides\/07-12%20David%20Childree.jpg","width":1536,"height":1016},"thumb":{"path":"thumbs\/07-12%20David%20Childree.jpg","width":256,"height":169},"fileSize":415034,"name":"07-12 David Childree.jpg","comment":"07\/12\/20 David Childree Olympus EM1, 1 second exposures with a 200 mm lens.  Stack of 10 exposures.","fileDate":"2020-07-27T16:16:32.0Z","category":"image","camera":{"resolution":"2712 x 1794"}},{"path":"07-12%20Ken.JPG","image":{"path":"slides\/07-12%20Ken.JPG","width":1536,"height":1024},"thumb":{"path":"thumbs\/07-12%20Ken.JPG","width":256,"height":171},"fileSize":950228,"name":"07-12 Ken.JPG","comment":"07\/12\/20 Ken Sperber morning on Patterson Pass Road","fileDate":"2020-07-27T16:15:23.0Z","category":"image"},{"path":"07-12%20Roland.jpg","image":{"path":"slides\/07-12%20Roland.jpg","width":1536,"height":1023},"thumb":{"path":"thumbs\/07-12%20Roland.jpg","width":256,"height":171},"fileSize":2395409,"name":"07-12 Roland.jpg","comment":"07\/12\/20 Roland Albers morning from Holm Park in Livermore.  4-second photo with a 50mm lens at f\/2.8 and 800 ISO","fileDate":"2020-07-27T16:17:22.0Z","category":"image","title":"C2020F3_LIGHT_4s_800iso_f2-8_+23c_20200712-04h43m43s125ms","camera":{"aperture":2.8,"exposureTime":"4.0s","originalDate":"2020-07-12T04:45:49.0Z","cameraModel":"Canon EOS REBEL T3i","resolution":"5202 x 3464","cameraMake":"Canon","isoEquivalent":800,"flash":"Flash did not fire, auto","focalLength":"50.0mm"}},{"path":"07-13%20Ken.JPG","image":{"path":"slides\/07-13%20Ken.JPG","width":1536,"height":1024},"thumb":{"path":"thumbs\/07-13%20Ken.JPG","width":256,"height":171},"fileSize":732857,"name":"07-13 Ken.JPG","comment":"07\/13\/20 Ken Sperber morning from Dublin Hills","fileDate":"2020-07-27T16:14:48.0Z","category":"image"},{"path":"07-14a%20Kai.jpg","image":{"path":"slides\/07-14a%20Kai.jpg","width":1355,"height":1536},"thumb":{"path":"thumbs\/07-14a%20Kai.jpg","width":226,"height":256},"fileSize":416756,"name":"07-14a Kai.jpg","comment":"07\/14\/20 Kai Yung From top of Del Valle.  Shows ISS transit.","fileDate":"2020-07-27T16:13:20.0Z","category":"image","camera":{"resolution":"3648 x 4135"}},{"path":"07-14b%20Kai.jpg","image":{"path":"slides\/07-14b%20Kai.jpg","width":1008,"height":1536},"thumb":{"path":"thumbs\/07-14b%20Kai.jpg","width":168,"height":256},"fileSize":114828,"name":"07-14b Kai.jpg","comment":"07\/13\/20 Kai Yung From top of Del Valle","fileDate":"2020-07-27T16:34:34.0Z","category":"image","camera":{"resolution":"2615 x 3985"}},{"path":"07-15%20Ken.jpg","image":{"path":"slides\/07-15%20Ken.jpg","width":1536,"height":1024},"thumb":{"path":"thumbs\/07-15%20Ken.jpg","width":256,"height":171},"fileSize":1894591,"name":"07-15 Ken.jpg","comment":"07\/15\/20 Ken Sperber Montage of 8 images 4 minutes apart","fileDate":"2020-07-27T16:12:28.0Z","category":"image"},{"path":"07-16%20Craig.jpg","image":{"path":"slides\/07-16%20Craig.jpg","width":1536,"height":1536},"thumb":{"path":"thumbs\/07-16%20Craig.jpg","width":256,"height":256},"fileSize":938701,"name":"07-16 Craig.jpg","comment":"07\/16\/20 Craig Siders 9:30 at night in Livermore, handheld iPhone 11","fileDate":"2020-07-27T16:37:06.0Z","category":"image","camera":{"aperture":1.8,"exposureTime":"0.5s","originalDate":"2020-07-15T21:38:19.0Z","cameraModel":"iPhone 11 Pro Max","location":{"altitude":"164 metres","latitude":"37°41'34.25\" N","lat":37.69285,"long":-121.73418,"longitude":"121°44'3.04\" W"},"focalLength35mm":"52.0mm","resolution":"2168 x 2168","cameraMake":"Apple","isoEquivalent":2500,"flash":"Flash did not fire, auto","focalLength":"4.3mm"}},{"path":"07-16%20Jack.JPG","image":{"path":"slides\/07-16%20Jack.JPG","width":1152,"height":1536},"thumb":{"path":"thumbs\/07-16%20Jack.JPG","width":192,"height":256},"fileSize":631983,"name":"07-16 Jack.JPG","comment":"07\/16\/20 Jack Mowchenko 9\"40 PM backyard in Pleasanton.","fileDate":"2020-07-27T16:11:16.0Z","category":"image","camera":{"aperture":5.6,"exposureTime":"10.0s","originalDate":"2020-07-16T21:54:47.0Z","cameraModel":"Canon EOS 50D","resolution":"2350 x 3133","cameraMake":"Canon","isoEquivalent":800,"flash":"Flash did not fire, auto","focalLength":"135.0mm"}},{"path":"07-17%20Craig.JPG","image":{"path":"slides\/07-17%20Craig.JPG","width":1024,"height":1536},"thumb":{"path":"thumbs\/07-17%20Craig.JPG","width":171,"height":256},"fileSize":5329995,"rights":"Craig William Siders","name":"07-17 Craig.JPG","rating":3,"comment":"07\/17\/20 Craig Siders Night 200mm f2.8 on Fuji X-T1.  Second straight tail.","fileDate":"2020-07-27T16:09:50.0Z","category":"image","camera":{"aperture":1.0,"exposureTime":"4.0s","originalDate":"2020-07-17T20:51:26.0Z","cameraModel":"X-T1","focalLength35mm":"300.0mm","resolution":"3264 x 4896","cameraMake":"FUJIFILM","isoEquivalent":1600,"flash":"Flash did not fire, auto","focalLength":"200.0mm"}},{"path":"07-18%20Kai.jpg","image":{"path":"slides\/07-18%20Kai.jpg","width":716,"height":1536},"thumb":{"path":"thumbs\/07-18%20Kai.jpg","width":119,"height":256},"fileSize":2943748,"name":"07-18 Kai.jpg","comment":"07\/18\/20 Kai Yung (reprocessed from 07\/11\/20 data)","fileDate":"2020-07-27T16:06:33.0Z","category":"image","camera":{"resolution":"2731 x 5858"}},{"path":"07-19%20Craig.jpeg","image":{"path":"slides\/07-19%20Craig.jpeg","width":867,"height":1280},"thumb":{"path":"thumbs\/07-19%20Craig.jpeg","width":173,"height":256},"fileSize":142328,"name":"07-19 Craig.jpeg","comment":"07\/19\/20 Craig Siders Fuji X-T1 with Rokinon 85mm f\/1.4 lens (at f\/2).  Stack of 60 ten second images. ","fileDate":"2020-07-27T16:07:37.0Z","category":"image","camera":{"originalDate":"2020-07-19T00:40:21.0Z","resolution":"867 x 1280"}},{"path":"07-25%20Swaroop.jpg","image":{"path":"slides\/07-25%20Swaroop.jpg","width":1536,"height":1195},"thumb":{"path":"thumbs\/07-25%20Swaroop.jpg","width":256,"height":199},"fileSize":559585,"name":"07-25 Swaroop.jpg","comment":"07\/25\/20 Swaroop Shere Stack of 15 luminance subs, 30 seconds at 1000mm focal length","fileDate":"2020-07-27T16:04:38.0Z","category":"image"}],"name":"NEOWISE","comment":"Comet NEOWISE pix","fileDate":"2020-07-28T11:17:09.429Z"}; // includes all the album data in a json tree
	var stylePath = ""; 

	var widgetColor = getWidgetColor(); // get suggested color for widget support

	/** check if page viewed on mobile device **/
	function isMobile(){
		return (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
	    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)));
	}

	/** check if page viewed online or from file system **/
	function isOnline(){
		switch(window.location.protocol) {
		   case 'http:':
		   		return true;
		   case 'https:':
		     	return true;
		   case 'file:':
		    	return false;
		}
	}

	/** get current url of page **/
	function getURL(){
		var curr = document.getElementById('jAlbum').src;
		return curr.substring(0, curr.lastIndexOf("/") + 1);
	}

	/** get fidget color according to current style **/
	function getWidgetColor(){
		if(style == styles[0]) return "black";
		else return "white";
	}

	/** returns all the public variables and functions **/
	return {
		mobile: mobile,
		online: online,
		jAlbumURL: jAlbumURL,
		stylePath: stylePath,
		resPath: resPath,
		credits: credits,
		albumTitle: albumTitle,
		contentPath: contentPath,
		imgHoverScaleFactor: imgHoverScaleFactor,
		folderTitleUp: folderTitleUp,
		folderImgCount: folderImgCount,
		maxImgInRow: maxImgInRow,
		imgBorderSize: imgBorderSize,
		imgBoxSize: imgBoxSize,
		showFolderName: showFolderName,
		textSize: textSize,
		showComments: showComments,
		dataTree: dataTree,
		stylePath: stylePath,
		slideBorderSize: slideBorderSize,
		slideBorderColor: slideBorderColor,
		widgetColor: widgetColor
	};

})();

/** --- jAlbumInject ---
* jAlbumInject is responsible for copying html code into
* the website. Stylesheet includes will be printed into
* the header, the body will be printed to the position
* of the embed code.
*/
var jAlbumInject = (function () {

	appendToHead(injLink('res/css/normalize.min.css', 'stylesheet')); // normalizes browser specific stylesheet defaults
	appendToHead(injLink('res/css/custom.min.css', 'stylesheet')); // customized desgin of the skin, will be partly overwritten by style.css
	appendToHead(injLink('res/styles.css', 'stylesheet')); // different styles to the skin which change the appearance

	appendToHead(injMeta("viewport", "width=device-width, initial-scale=1.0, maximum-scale=1.0")); // viewport handles mobile scaling size

	inj('<div id="Responsive" class="jAlbum">'); // Responsive id surrounds all code of the body of the skin
	inj('<div id="fullscreen"></div>'); // element where to add fullscreen
	inj('<div id="jAlbum-header"></div>'); // header container
	inj('<div id="jAlbum-content"></div>'); // content container
	inj('<div style="clear: both"></div>');

	inj('<div id="jAlbum-footer">'); // footer
	inj('<div class="left leaveFolder">');
	inj('<p><a onclick="jAlbumController.back();"> &#10096;</a></p>'); // go back button in footer
	inj('</div><div class="center"><p><a href="http://jalbum.net/">Create photo gallery websites with jAlbum</a> - '); // credits in footer
	inj('<a href="http://jalbum.net/skins/skin/Responsive">Responsive</a></p>'); // skin advertisement in footer
	inj('</div></div></div>'); // close footer

	inj('<script src="' + jAlbumGlobals.jAlbumURL + 'res/libs/jquery-2.1.4.min.js"></script>'); // embets jQuery library
	inj('<script type="text/javascript">$(document).bind("mobileinit", function(){$.extend($.mobile , {autoInitializePage: false})});</script>'); // deactivates jQuery unnecessary mobile feature
	inj('<script src="' + jAlbumGlobals.jAlbumURL + 'res/libs/jquery.mobile-1.4.5.min.js"></script>'); // includes jQuery Mobile
	inj('<script src="' + jAlbumGlobals.jAlbumURL + 'res/libs/jquery.touchswipe.min.js"></script>'); // jQuery touchswipe plugin
	inj('<script src="' + jAlbumGlobals.jAlbumURL + 'res/js/main.js" type="text/javascript"></script>'); // includes skin controller
	
	/** injects html code at embedded position **/
	function inj(html){
		document.write(html);
	}

	/** injects html code in header **/
	function appendToHead(elem){
		document.getElementsByTagName('head').item(0).appendChild(elem);
	}

	/** injects header of embedded page with stylesheet includes **/
	function injLink(path, rel){
		var elem = document.createElement("link");
		elem.href = jAlbumGlobals.jAlbumURL + path;
		elem.rel = rel;

		return elem;
	}

	function injMeta(name, content){
		var elem = document.createElement("meta");
		elem.name = name;
		elem.content = content;

		return elem;
	}

})();


/** --- Widget Support---
* provides JavaScript code for jAlbum widget support
*/
window._jaWidgetBarColor = jAlbumGlobals.widgetColor;

if(!document.getElementById('non-embedded')){ // check if embedded
	window._jaUrl = jAlbumGlobals.jAlbumURL;
	_jaSkin = "Responsive";
_jaStyle = "dark.css";
_jaVersion = "13.4";
_jaGeneratorType = "desktop";
_jaLanguage = "en";
_jaPageType = "index";
_jaRootPath = ".";
_jaUserId = "308647";
var jalbumWidgetContainer = document.createElement('div');
jalbumWidgetContainer.setAttribute('id','jalbumwidgetcontainer');
var jalbumWidgetScript = document.createElement("script");
jalbumWidgetScript.type = "text/javascript";
jalbumWidgetScript.src = "http"+("https:"==document.location.protocol?"s":"")+"://jalbum.net/widgetapi/load.js";
jalbumWidgetScript.async = true;
jalbumWidgetContainer.appendChild(jalbumWidgetScript);
document.body.appendChild(jalbumWidgetContainer);
 // get JavaScript code for widget
}
