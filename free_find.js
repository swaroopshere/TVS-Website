// free_find.js: javascript routines required by FreeFind's indexing service

// FreeFind on-page results handler
var ffresults = {

	// copyright 2008 - 2012 FreeFind.com - authorized for use with the FreeFind service only

	// Start of config settings

    autoPos : true,			// automatic initial window position / size. 

	// if autoPos if false, the following four numbers are used as initial window position and size

	initialX : 78,			// left position (pixels)
	initialY : 66,			// right position (pixels)
	initialH : 395,			// height of window
	initialW : 622,			// width of window

	// choose a number for z-index that is high enough so the results window appears above other windows on your page

	initialZ : 10000000,    // initial z-index of the results window
	
	// the following value controls the color of the window's drag bar (top area of window)
	
	barColor : 'navy',

	// end of config settings

	element : undefined,
	cover : undefined,
	mouseDownX : 0,
	mouseDownY : 0,
	objectX : 0,
	objectY : 0,
	objectH : 0,
	objectW : 0,
    ipos : false,
	resize : false,
	
	sizeImageUrl : 'https://search.freefind.com/img/rsize.gif',

	selectFunc : undefined,
	selectState : undefined,
	mozSelect : undefined,

	noSelect : function()
	{
	    var obj = document.body;

        ffresults.selectFunc = obj.onselectstart;
		ffresults.selectState = obj.unselectable;
		ffresults.mozSelect = obj.style.MozUserSelect;

		obj.onselectstart = function(){ return false; };
		obj.unselectable = 'on';
		obj.style.MozUserSelect = 'none';
	},

	restoreSelect : function()
	{
	    var obj = document.body;

		obj.onselectstart = ffresults.selectFunc;
		obj.unselectable = ffresults.selectState;
		obj.style.MozUserSelect = ffresults.mozSelect;
	},


	drag : function (e,size)
	{
		if(!document.getElementById) return;
		
		if(!e) e = window.event;
		var targ = e.target || e.srcElement;
	    ffresults.resize = size;

		if(targ.id != 'ffresult_bar' && targ.id != 'ffresult_szimg') return true;
		ffresults.noSelect();

		ffresults.element = document.getElementById('ffresult_win');
		ffresults.objectX = parseInt(ffresults.element.style.left,10);
		ffresults.objectY = parseInt(ffresults.element.style.top,10);
		ffresults.objectH = parseInt(ffresults.element.style.height,10);
		ffresults.objectW = parseInt(ffresults.element.style.width,10);

		ffresults.cover = document.getElementById('ffresult_cvr');
		ffresults.cover.style.zIndex = '40';
		ffresults.mouseDownX = e.clientX;
		ffresults.mouseDownY = e.clientY;
		if(e.preventDefault) e.preventDefault();
		e.returnValue = false;
		e.cancelBubble = true;
		ffresults.attach(document,"mouseup",ffresults.drop);
		ffresults.attach(document,"mousemove",ffresults.move);
	},




	attach : function(to,eventname,func)
	{
		if(to.addEventListener) 
			to.addEventListener(eventname,func,false);
		else
			to.attachEvent("on" + eventname,func);
	},

	detach : function(to,eventname,func)
	{
		if(to.removeEventListener) 
			to.removeEventListener(eventname,func,false);
		else
			to.detachEvent("on" + eventname,func);
	},

	drop : function(e)
	{
		ffresults.detach(document,"mouseup",ffresults.drop);
		ffresults.detach(document,"mousemove",ffresults.move);
		ffresults.cover.style.zIndex = 0;	
		ffresults.element = null;
		ffresults.restoreSelect();
	},

	move: function(e)
	{
	   if(!e) e = window.event;

	   e.returnValue = false;
	   e.cancelBubble = true;
	   if(e.preventDefault) e.preventDefault();

		var x = e.clientX;
		var y = e.clientY; 

		if(ffresults.resize)
		{
			var winW = ffresults.objectW + x - ffresults.mouseDownX;
			var winH = ffresults.objectH + y - ffresults.mouseDownY;
			
			if(winH < 128) winH = 128;
			if(winW < 128) winW = 128;

			ffresults.element.style.width = winW + "px";
			ffresults.element.style.height = winH + "px";
		}
		else
		{
			var left = ffresults.objectX + x - ffresults.mouseDownX;
			var top = ffresults.objectY + y - ffresults.mouseDownY;

			ffresults.element.style.left = left + "px";
			ffresults.element.style.top = top + "px";
		}
		

	},

	hide : function()
	{
		var rStyle = document.getElementById('ffresult_win').style;
		rStyle.display = "none";
		rStyle.zIndex = 0;
		var ifr = document.getElementById('ffresult_ifr');
		if(ifr) ifr.src="";
		var szImg = document.getElementById('ffresult_szimg');
		if(szImg) szImg.src = "";

	},


	show : function(num)
	{
		if(!document.getElementById) return;

		var searchForm = document.getElementById('ffresult_sbox'+num);
		var idxLink = document.getElementById('ffresult_idx'+num);
		var smpLink = document.getElementById('ffresult_smp'+num);
		var advLink = document.getElementById('ffresult_adv'+num);

		if(searchForm) searchForm.target = 'ffresult_frame';
		if(idxLink) idxLink.target = 'ffresult_frame';
		if(smpLink) smpLink.target = 'ffresult_frame';
		if(advLink) advLink.target = 'ffresult_frame';

		var rDiv = document.getElementById('ffresult_win');

		if(!ffresults.ipos)
		{
		    if(ffresults.autoPos)
			{
			    ffresults.computePos(rDiv); 
			}
			else
			{
				rDiv.style.top = ffresults.initialY + 'px';
				rDiv.style.left = ffresults.initialX + 'px';
				rDiv.style.width = ffresults.initialW + 'px';
				rDiv.style.height = (ffresults.initialH - 36) + 'px';	
			}
			ffresults.ipos = true;
		}

		var szImg = document.getElementById('ffresult_szimg');
		if(szImg) szImg.src = ffresults.sizeImageUrl;

		var dragBar = document.getElementById('ffresult_bar');
		if(dragBar) 
		{
			dragBar.style.backgroundColor = ffresults.barColor;
			dragBar.style.borderColor = ffresults.barColor;
		}

		rDiv.style.zIndex = ffresults.initialZ;
		rDiv.style.display = "block";
	},



	computePos : function(rDiv)
	{

		var view = ffresults.viewSize();
		var w = parseInt(view.width * 0.75,10);
		var h = parseInt(view.height * 0.75,10);
		if(w < 220) w = 220;
		if(h < 220) h = 220;


		var left = parseInt((view.width - w ) / 2,10);
		var top = parseInt((view.height - (h + 36)) / 2,10);


		if(left < 0) left = 0;
		if(top < 0) top = 0;

		rDiv.style.top = (top + view.scrollY) + 'px';
		rDiv.style.left =  (left + view.scrollX) + 'px';
		rDiv.style.width =  w + 'px';
		rDiv.style.height =  h + 'px';

	},
	
	viewSize : function()
	{   
		var w = 0;
		var h = 0;
		var sx = 0;
		var sy = 0;

	    if(window.innerWidth)	
		{  // non-ie
		   w = window.innerWidth;
		   h = window.innerHeight;
		   sx = window.pageXOffset;
		   sy = window.pageYOffset;
		}
		else
		{
		    var elem;
			if(document.documentElement && document.documentElement.clientWidth != 0)
			{   // ie strict
				elem = document.documentElement;
			}
			else
			{	// ie quirks
				elem = document.body;
			}
			w = elem.clientWidth;
			h = elem.clientHeight;
			sx = elem.scrollLeft;
			sy = elem.scrollTop;
			
		}
		  
		
		return {width: w,height: h, scrollX: sx, scrollY: sy};
		
	}


};
