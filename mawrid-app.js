
// Some global vars that we need:
var debugmode = false; 
var version = "4.0 - beta";
var title_text = '... ' + " - powered by Mawrid Reader" + " v" + version;
$("#version").append(title_text);
var toggle = 1;
var starting_hash = "#";
var state = {};

// Available configurations and descriptions
var confs = [
	{ "aa": "Root based Arabic dictionaries in various languages" },
	{ "mr": "Regular (non-root based) Arabic dictionaries in various languages" }
	]
// default configuration from the above
var requested_conf = "aa"

//var all_roots = {};

// reload_page()

var initial_book_order = "";
//var aa_book_order = initial_book_order;

var toggle_view_auto = 1;
var toggle_view_mode;
var fitwidth = false;
var last_input = "";
var searched_word = "";
// This is the base directory under which all image directories will be placed:
var img_base_dir = "../aa-data/img/";
//var img_base_dir = "img/";
var text_base_dir = "text/";

// Only allow .dev classes to show up when we're not live:
// Make not allow it in file: either ? TODO
if ( (document.location.hostname == "localhost") || (document.location.hostname == "abd.ejtaal.net") || (window.location.protocol=='file:') ) 
  $(".dev").show();


// Setup shortcuts:
shortcut.add("F",function() { searchandgo(); });
shortcut.add("V",function() { toggle_view(); });

shortcut.add("Z",function() { visible_book_shift( -1); });
shortcut.add("D",function() { visible_book_shift( -1); });
shortcut.add("Left",function() { visible_book_shift( -1); });
shortcut.add("X",function() { visible_book_shift( 1); });
shortcut.add("G",function() { visible_book_shift( 1); });
shortcut.add("Right",function() { visible_book_shift( 1); });
shortcut.add("P",function() { testing123(); });
shortcut.add("W",function() { toggle_fitwidth(); });

// Bind the swipeHandler callback function to the swipe css classes
$( ".swipe" ).on( "swiperight", swipe_it);
$( ".swipe" ).on( "swipeleft", swipe_it );

// Callback function references the event target and adds the 'swipe' class to it
function swipe_it( event ){
	if ( state['enable_swipe'] == 1) {
		var pid = $(event.target).closest("div.book").attr("id");
		debug("JQM Swipe event for img under "+pid+":");
		console.log(event);
		if ( event.type == 'swiperight') shift_page( pid, -1);
		if ( event.type == 'swipeleft') shift_page( pid, 1);
	}
}

$( window ).hashchange(function() {
	parse_hash();
});

$(".swipe").click(function(){
	searchandgo()
});

// **********************************************
// *** -------------------------------------- ***
// Beware, there be subroutines beyond this point
// *** -------------------------------------- ***
// **********************************************

function make_suggestions( root, arr) {

	//debug( "Start finding suggestions: ")

	// This little array produces yamli-like magic :)
	var yamli_map = {
		"ي": "يوا",
		"و": "ويا",
		"ا": "اوي",
		"ت": "تط",
		"ط": "طت",
		"د": "دذضظ",
		"ظ": "ظز",
		"ز": "زظ",
		"ك": "كق",
		"ق": "قك",
		"ه": "هح",
		"ح": "حه",
		"a": "awye",
		"w": "way",
		"y": "ywa",
		"d": "dD*Z",
		"h": "hH",
		"t": "tT",
		"s": "sSv",
		"z": "zZ",
		"k": "kx"
	}

	var suggestions = [];
	var building = [];
	suggestions[0] = '';
	
	
	for ( var letter = 0; letter < root.length; letter++) {
		var mapping_found = false;
		var la = root.substring( letter, letter+1)
		for ( var search in yamli_map) {
			//debug( "la: "+la+" == search:" + search)
			var cur_suggestion_size = suggestions.length;
			building = [];
			if ( la == search) {
				mapping_found = true;
				var replace = yamli_map[search];
				//debug( "letter " + letter + " in '" + root +"' equals search '"
					//+ search + "': '" + replace +"'");
				for ( var c = 0; c < suggestions.length; c++) {
					//debug( "r = " + r);
					for ( var r = 0; r < replace.length; r++ ) {
						//debug( "c = " + c);
						var newbuild = suggestions[c] + replace.substring( r, r+1);
						building.push( newbuild)
					}
				}
				suggestions = building;
			}
		}
		if (! mapping_found)
			for ( var c = 0; c < suggestions.length; c++)
				suggestions[c] += la;
	}
	
	// If any of the suggestions are 2 letters long, 
	// suggest one straight after with the 2nd letter repeated
	for (var i = 0; i < suggestions.length; i++)
		if ( suggestions[i].length == 2)
			suggestions.splice( i + 1, 0, suggestions[i] + suggestions[i].substring( 1, 2))

	//debug( "suggestions: ")
	//debug(  suggestions)

	var suggestions_bw = [];
	// Now buckwalterize the suggestions:
	for ( var c = 0; c < suggestions.length; c++)
		suggestions_bw[c] = buckwalter( 'encode', suggestions[c]);
	//debug( "suggestions buckwaltered: ")
	//debug(  suggestions_bw)

	//arr=['ﺍ','آﺍ','ﺍب','ﺍبﺍ','ﺍبب','ﺍبت','ﺍبجد'];
	//arr=['ا','آا','اب','ابا','ابب','ابت','ابجد','ابخ','ابد'];

	// filter suggestions to those that match arr
	// beware, the next bit gets slow quickly the more you type :(
	//debug( "start filtering")
	// 4 phases: 
	//	1: collect ones that are equal
	var found = 0
	var suggestions_bw_filtered  = jQuery.grep( suggestions_bw, function( n, i ) {
		if ( found > 10) return false
		for ( var r = 0; r < arr.length; r++) {
			if ( n == arr[r]) {
				found++
				return true;
			}
		}
	  return false;
	});
	//debug( "after phase 1, results:")
	//debug(  suggestions_bw_filtered)
	
	found = 0
	out_of_the_matrix_2:
	for ( var s = 0; s < suggestions_bw.length; s++) {
		for ( var a = 0; a < arr.length; a++) {
			if ( arr[a].indexOf( suggestions_bw[s]) == 0) {
				found++
				suggestions_bw_filtered.push( arr[a])
			}
			if ( found > 10) break out_of_the_matrix_2
		}		
	}
			
	
	/*
	//	2: collect ones that begin with search term
	suggestions_bw_filtered = suggestions_bw_filtered.concat(
		jQuery.grep( arr, function( n, i ) {
			if ( found > 10) return false
			for ( var s = 0; s < suggestions_bw.length; s++) {
				//debug( "n = ["+n+'], root = [' +suggestions_bw[s]+']')
				//debug( n.indexOf( suggestions_bw[s] ))
				if ( n.indexOf( suggestions_bw[s] ) == 0) {
					found++
					return true
				}
			}
		  return false;
		})
	);
	*/
	//debug( "after phase 2, results:")
	//debug(  suggestions_bw_filtered)

	found = 0
	//	3: collect ones that match any other part
	suggestions_bw_filtered = suggestions_bw_filtered.concat(
		jQuery.grep( arr, function( n, i ) {
			if ( found > 10) return false
			for ( var s = 0; s < suggestions_bw.length; s++) {
				if ( n.indexOf( suggestions_bw[s] ) !== -1) {
					found++
					return true
				}
			}
		  return false;
		})
	);
	
	//debug( "end of collection, results:")
	//debug(  suggestions_bw_filtered)

	//	4: remove duplicates 
	for ( var i = 0; i < suggestions_bw_filtered.length; i++)
		for ( var j = suggestions_bw_filtered.length - 1; j > i; j--)
			if ( suggestions_bw_filtered[i] == suggestions_bw_filtered[j])
				suggestions_bw_filtered.splice( j, 1);
		
	
	//debug( "end filtering, results:")
	//debug(  suggestions_bw_filtered)

	//debug( "Finished finding suggestions.")
	//response = [ 'a', 'b', 'c']
	return suggestions_bw_filtered
}

function suggest_completions( typed, callback) {
	// This function is only used by the autocomplete input field.

	suggestions_bw_filtered = make_suggestions( typed, all_roots)

	typed_bw = buckwalter( 'encode', typed)	
	response = []

	for ( var i = 0; i < suggestions_bw_filtered.length; i++)
		response.push({ 
			'value': suggestions_bw_filtered[i],
			'count': count_root_occurances( suggestions_bw_filtered[i]),
			'label': 
				suggestions_bw_filtered[i].replace( 
					new RegExp('('+typed_bw+')'), '<b>\$1</b>')
		})
	
	//response = suggestions_bw_filtered
	callback(response)
}

function load_page ( book, page) {
	books[book]['wanted'] = page
	load_book_texts()
	//build_hash()
}

function buckwalter( action, str) {

	// Very limited functionality as only needed for root letters
	// and we don't deal with diacritics etc.
	if ( action == 'encode') {
		// From android: ء ٱ آ إ
		//str = str.replace(/[إآٱأءﺀﺀﺁﺃﺅﺇﺉ]/g,"ا");
		//str = str.replace(/[ﻯ]/g,"ي");
		// Firstly the letters that take IMHO 2 letters to transliterate
		str = str.replace(/v/g,"ث");
		str = str.replace(/[gG]/g,"غ");
		str = str.replace(/x/g,"خ");
		str = str.replace(/\$/g,"ش");
		str = str.replace(/\*/g,"ذ");
		// Hmm, make the following case insensitive and assign different letters to different cases:
		str = str.replace(/d/g,"د");
		str = str.replace(/D/g,"ض");
		str = str.replace(/z/g,"ز");
		str = str.replace(/Z/g,"ظ");
		str = str.replace(/s/g,"س");
		str = str.replace(/S/g,"ص");
		str = str.replace(/t/g,"ت");
		str = str.replace(/T/g,"ط");
		str = str.replace(/h/g,"ه");
		str = str.replace(/H/g,"ح");
		// Include chat arabic?
		//str = str.replace(/[7]/g,"ح");
		//str = str.replace(/[3]/g,"ع");
		// Not much iktilaaf over these I guess:
		str = str.replace(/[xX]/g,"خ");
		str = str.replace(/[vV]/g,"ث");
		str = str.replace(/[aA]/g,"ا");
		str = str.replace(/[bB]/g,"ب");
		str = str.replace(/[jJ]/g,"ج");
		str = str.replace(/[rR]/g,"ر");
		str = str.replace(/[eE]/g,"ع");
		str = str.replace(/[fF]/g,"ف");
		str = str.replace(/[qQ]/g,"ق");
		str = str.replace(/[kK]/g,"ك");
		str = str.replace(/[lL]/g,"ل");
		str = str.replace(/[mM]/g,"م");
		str = str.replace(/[nN]/g,"ن");
		str = str.replace(/[wW]/g,"و");
		str = str.replace(/[yY]/g,"ي");
	}
	if ( action == 'decode' ) {
		//well that's a bit trickier
	}

	return str

}



/*
$(function() {
	$(".swipe").swipe({
		swipeLeft:  shift_the_page,
		swipeRight: shift_the_page, 
		swipe:      shift_the_page,
	  tap:function(event, target) {
			//var pid = $(this).parent().attr("id");
	    debug("You tapped" );
			searchandgo();
	  },
		allowPageScroll:"vertical" 
	});

	function shift_the_page(event, direction) {
		//var pid = $(this).parent().parent().parent().attr("id");
		var pid = $(this).closest("div.book").attr("id");
	  //$(this).text("You swiped " + direction );
	  debug("You swiped " + direction + ' on ' + pid);
	  //alert("You swiped " + direction + ' on ' + pid);
		if ( direction == 'right') shift_page( pid, -1);
		if ( direction == 'left') shift_page( pid, 1);
	}
});
*/



function move_build( id, where) {
	move( id, where)
	build_hash()
}

function move( id, where) {

	var objects = [ '#'+id, '#'+id+"_setting"];
	for (i = 0; i < objects.length; i++) {
		obj = objects[i]
		//$(obj).fadeOut({ duration: 100})
		if ( where == "top" ) { 
			// Move to top
			//debug( "moving "+obj+" to top")
			$(obj).parent().prepend($(obj));
		}
		else if (where == "bottom" ) { 
			//debug( "moving "+obj+" to bottom")
			$(obj).parent().append($(obj));
			//$('#all_objs').append($(obj));
			//$(obj).remove().insertAfter($("#all_objs div:last"));
			//$("#all_objs" .row:first").remove().insertAfter($("#container .row:last));
		}
		else if (where == "up" ) {
			// Move one up
			//debug( "moving "+obj+" 1 up")
			$(obj).after( $(obj).prev() );
		}
		else if (where == "down") {
			// Move one down
			//debug( "moving "+obj+" 1 down")
			$(obj).before( $(obj).next() );
		}
		//$(obj).fadeIn({ duration: 100})
	}
}

function toggle_hide( book) {
	if ( books[book]["should_hide"] == 1)
		books[book]["should_hide"] = 0
	else books[book]["should_hide"] = 1
	build_hash()
}

function hide_book_build( target, should_hide) {
	hide_book( target, should_hide)
	build_hash()
}

function hide_book( target, should_hide) {
	//debug( "hide: " + target + "=" + should_hide)
	books[target]["should_hide"] = should_hide;
	if ( should_hide) {
		hide_show( target+'_page', target+'_toggle');
		$("#"+target+"_hidebutton").removeClass("disabled_button").addClass( "enabled_button" )
	}
	else {
		hide_show( target+'_toggle', target+'_page');
		$("#"+target+"_hidebutton").css('border','')
		$("#"+target+"_hidebutton").removeClass("enabled_button").addClass( "disabled_button" )
	}
}

function hideme_show( hideobj, showobj) {
  hideobj.style.display = "none";
  //document.getElementById(showobj).style.display = "block";
	$("#"+showobj).show('fast');
}

function hide_id( id, scrollto) {
  //document.getElementById( id).style.display = "none";
	//debug( 'hiding ' + id);
	$("#"+id).hide('fast');
	if (scrollto) {
		//debug( 'scrolling to: ' +id);
		$(window).scrollTop( $("#"+id).offset().top);
	}
}

function hide_show( hideid, showid, scrollto) {
	$("#"+hideid).hide('fast');
	$("#"+showid).show('fast');
	if (scrollto) {
		//debug( 'scrolling to: ' +showid);
		$(window).scrollTop( $("#"+showid).offset().top);
	}
}

function set_hash( s) {
	hide_id('about');
	window.location.hash = s;
	setCookie( project["prefix"]+"last_hash", window.location.hash, 365);
}
function build_hash() {
	var new_hash = "#"

	new_hash += "conf=" + requested_conf + ','

	$('#all_books').children().each(function(){
		var book = $(this).attr('id');
 		// debug( book);
		new_hash += book + "="
		if (books[book]["should_hide"] == 1) new_hash += "h"
		new_hash += books[book]["wanted"] + ','
	})

	if ( project['type'] == 'text' && searched_word != '')
		new_hash += 'q=' + searched_word
	
	new_hash = new_hash.replace(/,$/,'')
	debug("new_hash = " + new_hash);

	window.location.hash = new_hash;
	setCookie( project["prefix"]+"last_hash", window.location.hash, 365);
}

function set_title() {
	var title = "";
	var i = 1;
	//TODO: in order of books displayed:
	if ( searched_word == "" ) {
		$('#all_books').children().each(function(){
			var id = $(this).attr('id');
	 		// debug( 'CCC')
			// debug( id);
			var add_text = "";
			if ( ! books[id]["should_hide"]) add_text = id + ": " + books[id]["index"][books[id]["current"]]
			if ( add_text != "") 
				if ( title != "") title += " / " + add_text;
				else title = add_text;
		});
	}
	else title = "Search: " + searched_word;
	if (title != "") title += " - ";
	title += title_text;
  if (document.location.protocol == 'file:' ||
		document.location.protocol == 'content:') {
		title = "[L] " + title;
	}
	//alert( title);
	document.title = title;
}

function user_debug_1() {
	alert( 'Protocol = ' + document.location.protocol)
}

var presets = []
var project = []
var books = []

function switch_config( c) {
	debug( 'XXXXX')
	// debug( c)
	// debug( all_presets[c])
	presets = all_presets[c]
	debug(presets)
	project = all_project[c]
	books = all_books[c]

	title_text = project["title"] + " v" + project["version"] + " - powered by Mawrid Reader" + " v" + version;

	// debug('LLL')
	// debug(books)

	// Initiate books array with extra needed vars:
	$( "#all_books" ).html("");
	var book_id = 0
	for (var key in books) {
		// debug('FFF')
		// debug(books[key])
		//book_id++
		books[key]["key"] = key
		books[key]["id"] = ++book_id
		books[key]["current"] = -1 // i.e. no page has been loaded
		books[key]["wanted"] = books[key]["offset"];

		if ( project["type"] == "text") {
			// Do something
			template = "text-book-template"
			for (i = 0; i < books[key]["index"].length; i++) {
				//all_roots[books[key]["index"][i]]
			}
		} else {
			template = "image-book-template"
			// Images based dictionaries assumed. Will there be a point in the future
			// where text and image dictionaries can be mixed? Perhaps...
			// Set up the right column order for viewing on mobiles
			books[key]["col1_id"] = 1
			books[key]["col2_id"] = 2
			books[key]["col3_id"] = 3
			if ( books[key]['columns'] == 1) {
				$( '#' + key+'col_2').hide()
				$( books[key]['columns']+'col_3').hide()
			}
			else if ( books[key]['columns'] == 2) {
				$( books[key]['columns']+'col_3').hide()
				if ( books[key]['direction'] == 'rtl') {
					books[key]["col1_id"] = 2
					books[key]["col2_id"] = 1
				}
			}
			else if ( books[key]['columns'] == 3) {
				if ( books[key]['direction'] == 'rtl') {
					books[key]["col1_id"] = 3
					books[key]["col2_id"] = 2
					books[key]["col3_id"] = 1
				}
			}
		}
	
		// var book = books[key]
	//	for (var prop in book)
	//		if (book.hasOwnProperty(prop)) debug(key + "." + prop + " = " + book[prop])
		$( "#"+template ).tmpl( books[key]).appendTo( "#all_books" );
		$("#"+key+"_toggle").hide()
	
		// Settings must be set for both text and image based dicts
		$( "#settings-row" ).tmpl( books[key]).appendTo( "#settings_rows" );
		starting_hash += key + '=' + books[key]["offset"] + ',';
		$("."+key+"_color").css('background-color', books[key]["color"])
		$("#"+key+"_wideviewimg").css('border', '3px solid ' + books[key]["color"])
	
		if ( books[key]['columns'] < 2) $( '#' + key+'_col2').hide()
		if ( books[key]['columns'] < 3) $( '#' + key+'_col3').hide()
	}
	debug( 'YYY')
	debug(presets)
	
	$( "#preset-cells" ).html("");
	for (var key in presets) {
		// debug('PRESET')
		// debug(key)
		presets[key]["key"] = key
		$( "#preset-cell" ).tmpl( presets[key]).appendTo( "#preset-cells" );

	}



	// debug( books)
	// reload_page()
	// parse_hash();

}

function reload_page() {
	// debug( 'YYY')
	// debug( books)
	/*
		Run this when first setting a desired configuration.
		Run it again if the config changes so new books,
		presets etc are initialized

	TODO: clear out books in DOM, config?
	build_hash?
	set_title?
	*/
	if ( project["type"] == "text") {

		$("#text-input-field").show()
		$("#text-input-field").keypress(function(e) {
			code= (e.keyCode ? e.keyCode : e.which);
			if (code == 13) {
				$(".ui-menu-item").hide();
				text_search( buckwalter( 'encode', $("#text-input-field").val() ));
				build_hash()
			}
		});
		$("#text-input-field").autocomplete({
			source: function( request, callback){
				var t = request.term;
				suggest_completions( t, callback)
			},
			select: function (a, b) {
				$(this).val(b.item.value);
				text_search( buckwalter( 'encode', $("#text-input-field").val() ));
				build_hash()
			},
			delay: 0
		})
	    .data( "ui-autocomplete" )._renderItem = function( ul, item ) {
		return $( "<li>" )
		  .append( "<a><table class='suggestion-table'><tr><td>(" + item.count + ")</td><td class='rtl'>" + item.label + "</td></tr></table></a>" )
		  .appendTo( ul );
	  	};
		
		// console.log(books)
		set_title()
		  //.append( "<a><tablediv class='suggestion-label'>" + item.label + "</div><div class='suggestion_count'>(" + item.count + ")</span></a>" )
	}
	

	

	
	// JQM causes each link to work through AJAX, please
	// don't do that!!! This or setting data-ajax="false"
	// is supposed to fix that
	$(document).ready(function(){
		$("a").each(function(){
			  $(this).attr("rel","external");
		});
		// Do page_load once
		// first_page_load();
		// reload_page();
	});
	
	starting_hash = starting_hash.replace(/,$/,'')
	debug("starting_hash = " + starting_hash)

	initial_book_order = presets["default"];
	title_text = project["title"] + " v" + project["version"] + " - powered by Mawrid Reader" + " v" + version;

}

function parse_hash() {
	debug('PARSING HASH')
	var hashstring = window.location.hash.replace(/^#/,'');
	var i, vars = hashstring.split(','); 
	if (vars.length > 0) { 
	  // Variables present in hash 
		var hide_following = false
	  for (i = vars.length - 1; i >= 0; i--) { 
	    keyValuePair = vars[i].split('='); 
			//alert( "Var found: " + keyValuePair[0] + ' = ' + keyValuePair[1] );
			var key = keyValuePair[0];
			var value = keyValuePair[1];
			//debug( "Var found: " + keyValuePair[0] + ' = ' + keyValuePair[1] );
			if ( key == "conf" ) { 
				old_conf = requested_conf;
				requested_conf = value;
				if ( old_conf != requested_conf) {
					// Somehow reload new configuration
					debug('SWITCHING CONFIG')
					switch_config( requested_conf)
				}
			}
			if ( key == "Q" || key == "q" ) { 
				if ( project['type'] == 'text') searched_word = value
				else do_search(value);
			}
			else if ( key == "BWQ" || key == "bwq" ) { 
				if ( project['type'] == 'text') searched_bw_word = value
				else do_bw_search(value);
			}
			else if ( key == "SEARCH" || key == "search" ) { searchandgo(); }
			else {
				if ( books.hasOwnProperty(key)) {
					books[key]["should_hide"] = 0
					if (value.match( /^h/ )) {
						books[key]["should_hide"] = 1
						value = value.replace(/^h/, '')
					}
					hide_book( key, books[key]["should_hide"]);
					
					books[key]["wanted"] = parseInt(value)
					// all this moving, is it necessary?
					book_index = $('#'+key).index()
					//debug("index: " + book_index + ", arrayindex = " + i)
					// Only move books around if order has changed:
					// i - 1 because we now have mandatory extra value
					// in the hash: 'conf'
					if ( book_index != i - 1) move(key, "top");
					//move_to_top(key+"_setting");
				}
			}
		}
	}
	else { 
		alert ('Nothing found');
	  // No variables in the hash 
	} 

	if ( project['type'] == 'text') {
		load_book_texts();
	} else {
		display_images();
	}

	set_title();
}

function load_book_texts() {
	for (var book in books) {
		suggestions = make_suggestions( searched_word, books[book]["index"]);
		$( '#'+book+'_suggestions').html("")
	
		// Only load the book text if it's not hidden
		if ( books[book]['should_hide'] != 1) {
			var status_string = "";
			if ( books[book]["wanted"] == -1) {
				status_string = searched_word+ ": Not found unfortunately."
				$("#"+book+"_text").html( '')
				if ( suggestions.length > 0) {
					status_string += " Loaded 1st suggestion '" + suggestions[0] + "' instead."
					books[book]['current'] = books[book]["index"].indexOf( suggestions[0])
					var url = get_text_url( book, suggestions[0])
					load_jsonp( url)
				} else
					status_string += " No suggestions found either doubly unfortunately."
			} else if ( books[book]["wanted"] !=  books[book]["current"]) {
				var root = books[book]["index"][ books[book]["wanted"]]
				books[book]["current"] = books[book]["wanted"]
				var status_string = 
					" <b>" + root + "</b> | " +
					books[book]["name"] + ", entry no. " + books[book]["current"] + 
					" <small>(of " + books[book]["index"].length + ") " +
					"</small>"
				//debug( 'offset = ' + books[book]['offset'] + ", wanted = " + books[book]["wanted"] + 			", current = " + books[book]["current"]);
				var url = get_text_url( book, root)
				load_jsonp( url)
			}
			$("#"+book+"_status_line").html( status_string);
		}

		var selected_sug = -1
		for (var i = 0; i < suggestions.length; i++) {
			var index = books[book]["index"].indexOf( suggestions[i])
			var t = {
				'book': book,
				'root': suggestions[i],
				'sug_index': i,
				'index': index
			}
			if (  books[book]["current"] == index) selected_sug = i
			$( "#suggestion-template" ).tmpl( t).appendTo( '#'+book+'_suggestions');
		}
		if ( selected_sug != -1) {
			//debug( "#sug_"+book+'_'+selected_sug)
			//debug( $("#sug_"+book+'_'+selected_sug).css('border'))
			$("#sug_"+book+'_'+selected_sug).css('border', '3px solid ' + books[book]['color'])
		}
		
	}
}

function shift_page( book, offset) {
	hide_id('about');
	debug( 'offset = ' + offset + 
			", wanted = " + books[book]["wanted"] + 
			", current = " + books[book]["current"]);
	books[book]["wanted"] = books[book]["current"] + offset;
	$(window).scrollTop( $("#"+book).offset().top);
	searched_word = "";
	build_hash();
}

function percentVisible( elem)
{
	// This returns how many % of the screen contains element 'elem'
	if ( $(elem).css('display') == "none" ) return 0;
  var docViewTop = $(window).scrollTop();
  var docViewBottom = docViewTop + $(window).height();


  var elemTop = $(elem).offset().top;
  var elemBottom = elemTop + $(elem).height();
	//debug( $(elem).height());
	//debug( 'docViewTop = ' + docViewTop + ', docViewBottom = ' + docViewBottom)
	//debug( 'elem id = ' + $(elem).attr('id') + ', elemTop = ' + elemTop + ', elemBottom = ' + elemBottom)
	var perc_vis = 0;

	// The only assumption here is that the element spans more than 1 screen height
	if ( elemTop <= docViewTop && elemBottom >= docViewBottom) perc_vis = 100;
	else if ( elemBottom < docViewTop || elemTop > docViewBottom) perc_vis = 0;
	else if ( elemTop >= docViewTop ) perc_vis = (docViewBottom-elemTop) * 100  / $(window).height();
	else if ( elemBottom <= docViewBottom ) perc_vis = ( elemBottom-docViewTop) * 100 / $(window).height();
	
	//debug( '=> % = ' + perc_vis + '?');
  
	return perc_vis;
}

function visible_book_shift( offset) {
	for (var key in books) 
		if ( percentVisible("#"+key) > 50) { shift_page( key, offset); break }
}

function get_text_url( book, root) {
	var fn = text_base_dir + book + '/'
		+	root.substring( 0, 1) + '/' + root + '.txt';
	//debug("filename = "+fn)
	return fn
}

function get_img_url( book) {
	//debug( "get_img_url( " + book +")")
	var page = books[book]["wanted"]
	if (page < 1) books[book]["wanted"] = page = 1
	if (page > books[book]["index"].length)
		books[book]["wanted"] = page = books[book]["index"].length - 1
	var str = "" + page
	var pad = "0000"
	prefixed_page = pad.substring(0, pad.length - str.length) + str
	return img_base_dir + books[book]["image-prefix"] + "/" + Math.floor(page/100) + "/" +
		books[book]["image-prefix"] + "-" + prefixed_page + ".png"
}

function display_images() {
	//ll_display_page( page);
	//debug ( ll_get_img_url( page));
	//document.getElementById("ll-narrow").src = ll_get_img_url( cur_ll_vol, cur_ll_page);
	// TODO: jQuery-fy the stuff below

	for (var key in books) 
		if ( ! books[key]["should_hide"]) {	
		// Clear image if it's being changed so it's clearer to user that a new imagine
		// is being downloaded
			//Fine in theory but we want to move to: "if current != wanted logic"
			//if ( $("#"+key+"_col1").attr('src') != img_url) {
			if ( books[key]['wanted'] != books[key]["current"]) {
				var img_url = get_img_url(key)
				books[key]["current"] = books[key]['wanted']
				var status_string = 
					" <b>" + books[key]["index"][books[key]["current"]] + "</b> | " +
					books[key]["name"] + ", page " + (books[key]["current"] - books[key]["offset"] + 1) + 
					" <small>(of " + (books[key]["index"].length-1-books[key]["offset"]) + ") " +
					"</small>"
				var debug_txt = books[key]['name'] + ': Loading new image url: '  + img_url
				user_debug( debug_txt)
				/*
				$("#"+key+"_col1").attr('src', '');
				$("#"+key+"_col2").attr('src', '');
				$("#"+key+"_col3").attr('src', '');
				$("#"+key+"_wideviewimg").attr('src', '');
				*/
				$("#"+key+"_col1").attr('src', img_url);
				$("#"+key+"_col2").attr('src', img_url);
				$("#"+key+"_col3").attr('src', img_url);
				$("#"+key+"_wideviewimg").attr('src', img_url);
				$("#"+key+"_status_line").html( status_string);
			}
		}
	}

function user_debug( text) {
	var d = new Date(); // for now
	var str = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds() 
		+ ' - ' + text
	debug( "user_debug: " + str )

	if ( state['enable_debug'] == 1) {
		$('#user_debug').val(function(index, old) { return str + "\n" + old; });
		// Limit it to 100 lines:
		var lines = $('#user_debug').val().split("\n")
		var new_lines = lines.slice(0,100).join("\n")
	}


	
}

function debug( text) {
	var obj = text
	var time = new Date().getTime();
	var date = new Date(time);
	var msecs = time % 1000;
	var time_info = date.toString().replace(/(..:..) /,"$1"+"."+msecs+" ")
	
	var oCallStackTrack = new Error();
    // console.log(oCallStackTrack.stack.replace('Error', 'Call Stack:'), 
	var str = time_info + " - [" + text + "] " + '\n' +
	oCallStackTrack.stack.replace('Error', 'Call Stack:')

	if (debugmode) { 
	  document.getElementById("debug").innerHTML += "<br>" + str
	} 
	// Thank you IE for not creating the console element until debug tools
	// are opened!
	if (window.console) console.log(str)
	if (typeof obj != "string") console.log( obj)
}

// http://constc.blogspot.com/2008/07/undeclared-undefined-null-in-javascript.html
function isUndefined(x) { return x == null && x !== null; }

function first_page_load() {
	switch_config( requested_conf)

	/*
		Default cookie setting:
			- do enable swiping for mobile devices
			- make swipe less sensitive so pages won't skip when scrolling down
	*/
	var cookie = getCookie( project["prefix"]+"state");
	if ( cookie == '' || cookie === null) 
		state = { 
			'fitwidth': 0,
			'enable_swipe': 1,
			'less_sensitive_swipe': 1,
			'retain_search': 1,
			'enable_debug': 0,
			'enable_columns': 0,
			'enable_fitwidth': 0
			}
	else state = JSON.parse( cookie)
	
	if ( $(document.body).width() < 750) state['enable_columns'] = 1
	else state['enable_columns'] = 0
	
	for (var s in state) update_setting( s);
	
	enforce_settings()
	
	// Set default hash value, and show About if this appears to be the first visit
	if ( window.location.hash.replace(/^#/,'') == "") { 
		var mr_last_hash = getCookie( project["prefix"]+"last_hash");
		debug( mr_last_hash);
		if ( isUndefined(mr_last_hash) || mr_last_hash == "" || mr_last_hash == null) {
			debug('hash = empty, first visit?')
			window.location.hash = starting_hash;
			// Then set the books to default order
			set_order_preset("default");
			//toggle_about();
			//parse_hash();
		} else {
			window.location.hash = mr_last_hash;
		}
	} else parse_hash();

	
	
	
	/*
	// Not working for some reason...
	$('.wideview').load(function() {
		var book = $(event.target).closest("div.book").attr("id");
		var debug_txt = 
			books[book]['name'] + ": image " + $(this).attr('src') + " loaded."
		user_debug( debug_txt)
	})
	$('.wideview').error(function() {
		var book = $(event.target).closest("div.book").attr("id");
		var debug_txt = 
			books[book]['name'] + ': error loading: ' + $(this).attr('src')
		user_debug( debug_txt)
	});
	*/

	// Set favicon
	(function() {
	    var link = document.createElement('link');
	    link.type = 'image/x-icon';
	    link.rel = 'shortcut icon';
	    link.href = project["icon"];
	    document.getElementsByTagName('head')[0].appendChild(link);
	}());
		
	
	
}

function toggle_setting( s) {
	//debug( s + ' = ' + state[s])
	state[s] = (state[s] + 1) % 2
	update_setting( s)
	save_settings()
	enforce_settings()
}

function update_setting( s) {
	if ( state[s] == 1) $("#"+s).removeClass("disabled_button").addClass( "enabled_button" )
	else $("#"+s).removeClass("enabled_button").addClass( "disabled_button" )
}

function enforce_settings() {
	
	var mw = '';
	var cm = 'full width'
	if ( state['enable_fitwidth'] == 1) {
		mw = '99%'
		cm = 'fit width'
	}
	$('.wideview').each(function(index) {
		$(this).css('max-width', mw)
	})
	$("#currentmode").html( cm)

	/*
		All this really necessary?
		$("#br_wideviewimg").css('max-width', mw);
		$("#vi_wideviewimg").css('max-width', mw); // TODO: Need or not?
		$("#mgf_wideviewimg").css('max-width', mw);// TODO: Need or not?
		$("#ulq_wideviewimg").css('max-width', mw);// TODO: Need or not?
		$("#uqa_wideviewimg").css('max-width', mw);// TODO: Need or not?
	*/

	if ( state['enable_columns'] == 1) {
		$(".narrowview").show();
		$(".wideview").hide();
		$("#currentmode").html("Mobile (column)");
	} else {
		$(".narrowview").hide();
		$(".wideview").show();
		$("#currentmode").html("Desktop (full page)");
	}

	if ( state['enable_debug'] == 1) $('.debug').show()
	else $('.debug').hide()
		
	if ( state['less_sensitive_swipe'] == 1) {
		// Hopefully this will fix swipe events being perceived
		// as being too sensitive
		var thres = 100 // Default is only 30px
		// of use 1/6 of the screen, whichever is greater
		var avail = (screen.availWidth) / 6
		if ( avail > thres) thres = avail

		$.event.special.swipe.horizontalDistanceThreshold = thres
	}
}

function init_settings() {
	var table_html = "<table><tr>\n";
	for (var row = 0; row <= books.length; row++) {
		//var rowpp = row + 1;
		for (var book = 0 ; book < available_books.length; book++) {
			//var bookpp = book + 1;
			if (book == 0) {
				table_html += "<tr>";
				if (row == 0) table_html += "<td>";
				else  table_html += "<td>" + row;
			}

			if (row == 0) {
				table_html += "<th class='" + available_books[book] + "_color'><b>" + available_books[book] + "</b>";
			} else {
				table_html += "<td class='" + available_books[book] + "_color'><input type='radio' name='setbook" + row + "' value='" + available_books[book] + "'>";
			}
		}
	}
	table_html += "</table>";
	//console.debug(table_html);
	//$("#settings_2").html(table_html);

	update_settings_order( aa_book_order);

}

function update_settings_order( order_toset) {
	var book_array = order_toset.split(',');
	for ( i = book_array.length - 1; i >= 0; i--) {
		var j = i + 1;
		$("input[name=setbook"+j+"][value=" + book_array[i] + "]").prop('checked', true);
	}
}

function set_order_preset( preset) {
	// debug('BBB')
	// debug(presets)
	var i, order = presets[preset]['order'].split(',')

	for (var key in books) books[key]['should_hide'] = 1

	if (order.length > 0) {
	  for (i = order.length - 1; i >= 0; i--) {
			hide_book( order[i], false)
			move( order[i], "top")
			debug('move to top')
			debug( order[i])
		}
	}
	build_hash()
}

function close_settings() {
	toggle_menu();
	save_settings()
}

function save_settings() {
	setCookie( project["prefix"]+"state", JSON.stringify( state), 365);
}

function testing123() {
	var i = 1;
	$('#all_books').children().each(function(){
	 var kid = $(this);
	 debug( kid.attr('id'));
	 i++;
	});

	/*
	for (i=0; i< $('#all_books').children().size(); i++) {
		debug( i);
		debug( $('#all_books').children()[i].attr('id'));
	}
	$(e.target).children().each(function(){
	 var kid = $(this);
	  console.log(kid, kid.attr('id'), kid.attr('class'));
		});
		*/
	//debug( $('#all_books').children().attr('id').each() );
	
}

/*
*/

function toggle_menu() {
		$('#settings_container').toggle('fast');
}



function searchandgo() {
	// Some browsers don't autoselect the query in the search box, so allow
	// people to always let it be empty:
	if ( state['retain_search'] == 0)
		last_input = ''
	var input = prompt( "Enter root letters in english or arabic to search (see About section)", last_input);
	if ( ! isUndefined( input) && input != "")
		do_search( input);
}

function new_text_search( input) {
}
	
function count_root_occurances( input) {
	//debug("searching no. of occurances for : "+input)
	var times = 0;
	for (var key in books) { 
		var ind = jQuery.inArray( input, books[key]['index'])
		if ( ind > -1) times++
	}
	return times
}

function text_search( input) {
	//do_search( input)
	input = input.replace( /\s*/g, "")
	if ( isUndefined( input) || input === null || input == "") return
	for (var key in books) { 
	//		debug("searching "+key+" for : "+input)
		var ind = jQuery.inArray( input, books[key]['index'])
		if ( ind > -1) {
			//debug("found at index: "+ind)
			books[key]["wanted"] = ind
			//$("#"+key+".text").html("Loading...")
			//var url = get_text_url( key, input)
			// The js in the loaded jsonp calls load_data()
			//load_jsonp( url)
			//debug("data loaded = "+data)

		} else {
			//debug("not found")
			books[key]["wanted"] = -1
		}
	}
	searched_word = input
}

function load_data( json) {
	//debug(json)
	book = json["book"]
	text = json["text"]
	$("#"+book+"_text").html( text)
}

function load_jsonp( url) {
	//debug("loading url: "+url)
	user_debug("Loading jsonp file " + url + " ...");
	$.ajax({
	    type: 'GET',
	     url: url,
	     async: false,
	     jsonpCallback: 'load_data',
	     contentType: "application/json",
	     dataType: 'jsonp',
	     success: function(json) {
	        user_debug("Loaded jsonp file OK: " + url);
			 		
	        //debug("json loaded ok");
	     },
	     error: function(e) {
	        //debug(+e.message);
	        user_debug("Error loading jsonp file: "+url + ' : ' + e.message);
	     }
	});
}

function do_bw_search( input) {
	// Strictly search by Buckwalter transliteration only:
	input = input.replace(/[إآٱأءﺀﺀﺁﺃﺅﺇﺉ]/g,"ا");
	input = input.replace(/[ﻯ]/g,"ي");
	input = input.replace(/[gG]/g,"غ");
	input = input.replace(/\$/g,"ش");
	input = input.replace(/\*/g,"ذ");
	input = input.replace(/d/g,"د");
	input = input.replace(/D/g,"ض");
	input = input.replace(/z/g,"ز");
	input = input.replace(/Z/g,"ظ");
	input = input.replace(/s/g,"س");
	input = input.replace(/S/g,"ص");
	input = input.replace(/t/g,"ت");
	input = input.replace(/T/g,"ط");
	input = input.replace(/h/g,"ه");
	input = input.replace(/H/g,"ح");
	input = input.replace(/[xX]/g,"خ");
	input = input.replace(/[vV]/g,"ث");
	input = input.replace(/[aA]/g,"ا");
	input = input.replace(/[bB]/g,"ب");
	input = input.replace(/[jJ]/g,"ج");
	input = input.replace(/[rR]/g,"ر");
	input = input.replace(/[eE]/g,"ع");
	input = input.replace(/[fF]/g,"ف");
	input = input.replace(/[qQ]/g,"ق");
	input = input.replace(/[kK]/g,"ك");
	input = input.replace(/[lL]/g,"ل");
	input = input.replace(/[mM]/g,"م");
	input = input.replace(/[nN]/g,"ن");
	input = input.replace(/[wW]/g,"و");
	input = input.replace(/[yY]/g,"ي");
	do_search( input)
}

function do_search( input) {
	if ( isUndefined( input) || input === null || input == "") return
	var search = input;
	last_input = input;
	// TODO: converting all forms of alif and hamza                                             
	// (ء, آ, أ, ؤ, إ, ئ, ا) to a single character ء
	// أكل
	// Here's a funny hamza, what is it?
	// ha_p[25]="ءدب";
	// The same should be done for both forms of yaa (ي, ى)
	/*
		Perform search and replace mostly according to the Arabic Chat Alphabet:
		http://en.wikipedia.org/wiki/Arabic_chat_alphabet
	search = search.replace(//gi,"");
	*/
	// Normalize alifs and yas, not sure if this is right yet?
	// The first character (hamza above alif) is different from the second one, different code page?
	// From android: ء ٱ آ إ
	search = search.replace(/[إآٱأءﺀﺀﺁﺃﺅﺇﺉ]/g,"ا");
	search = search.replace(/[ﻯ]/g,"ي");
	// Firstly the letters that take IMHO 2 letters to transliterate
	search = search.replace(/th/g,"ث");
	search = search.replace(/gh/g,"غ");
	search = search.replace(/[gG]/g,"غ");
	search = search.replace(/kh/g,"خ");
	search = search.replace(/sh/g,"ش");
	search = search.replace(/\$/g,"ش");
	search = search.replace(/dh/g,"ذ");
	search = search.replace(/\*/g,"ذ");
	// Hmm, make the following case insensitive and assign different letters to different cases:
	search = search.replace(/d/g,"د");
	search = search.replace(/D/g,"ض");
	search = search.replace(/z/g,"ز");
	search = search.replace(/Z/g,"ظ");
	search = search.replace(/s/g,"س");
	search = search.replace(/S/g,"ص");
	search = search.replace(/t/g,"ت");
	search = search.replace(/T/g,"ط");
	search = search.replace(/h/g,"ه");
	search = search.replace(/H/g,"ح");
	// Not much iktilaaf over these I guess:
	search = search.replace(/[xX]/g,"خ");
	search = search.replace(/[vV]/g,"ث");
	search = search.replace(/[aA]/g,"ا");
	search = search.replace(/[bB]/g,"ب");
	search = search.replace(/[jJ]/g,"ج");
	search = search.replace(/[7]/g,"ح");
	search = search.replace(/[rR]/g,"ر");
	search = search.replace(/[3]/g,"ع");
	search = search.replace(/[eE]/g,"ع");
	search = search.replace(/[fF]/g,"ف");
	search = search.replace(/[qQ]/g,"ق");
	search = search.replace(/[kK]/g,"ك");
	search = search.replace(/[lL]/g,"ل");
	search = search.replace(/[mM]/g,"م");
	search = search.replace(/[nN]/g,"ن");
	search = search.replace(/[wW]/g,"و");
	search = search.replace(/[yY]/g,"ي");
	debug( "Searching for: " + search);
	for (var key in books) { debug("searching: "+key)
		if ( books[key]["alpha"] == "no") {
			results = plainSearch( books[key]['index'], search, 0)
			if ( results["wanted"] != "" )
				books[key]["wanted"] = results["wanted"]
			//else can we set the status for this book somehow?
			//XXX Maybe hide the book in particle tool at least if not found?
			books[key]["suggestions"] = results["suggestions"]
		}
		else
			books[key]["wanted"] = binarySearch( books[key]['index'], search, 0)
		//debug( "book['"+key+"']['wanted'] = " + books[key]["wanted"])
	}
	// Headers 

	search_status = "Searched for: <strong>" + search + "</strong>";
	if ( input != search) search_status += " (" + input + ")";
	search_status += " |";
	$("#searchbar").html( search_status)
	
	// set searched_word first because build_hash() will lead to set_title() where it is used
	searched_word = search;

	build_hash();
	//parse_hash();
	
}

function plainSearch(items, value){
	// entries look like: ens[118]='ﺏﺎﺒﻟ ﺏﺩﺀ'
	// so a word must be in the beginning or after a space to be a match
	var results = []
	results["wanted"] = ""
	results["suggestions"] = []

	debug("plain searching: "+value)
	var re1 = new RegExp( '^'+value+' ')
	var re2 = new RegExp( ' '+value+' ')
	var re3 = new RegExp( ' '+value+'$')
	for (var index in items) { 
		if (
			re1.test( items[index]) ||
			re2.test( items[index]) ||
			re3.test( items[index])) {
			debug("found something: "+items[index] + " @ index[" + index + "]")
				if ( results["wanted"] == "" )
					results["wanted"] = index
				else
					results["suggestions"].push( index)
		}
	}
	// If any still empty, seek out partial matches:
	if ( results["wanted"] == "" || results["suggestions"].length == 0) {
		var re4 = new RegExp( '^'+value)
		var re5 = new RegExp( ' '+value)
		debug("Nothing found so searching without spaces now: "+value)
		for (var index in items) { 
			if (
				re4.test( items[index]) ||
				re5.test( items[index])) {
				debug("found something: "+items[index] + " @ index[" + index + "]")
					if ( results["wanted"] == "" )
						results["wanted"] = index
					else
						results["suggestions"].push( index)
			}
		}
	}

	debug( "results:")
	debug( results)
	return results

}

function getCookie(c_name) {
	// Local Storage is the way of the future
	/*
	var i,x,y,ARRcookies=document.cookie.split(";");
	for (i=0;i<ARRcookies.length;i++) {
  	x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  	y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  	x=x.replace(/^\s+|\s+$/g,"");
  	if (x==c_name) { return unescape(y); }
  }
	*/
	return $.totalStorage( c_name)
}

function setCookie(c_name,value,exdays)
{
	/*
	// Local Storage is the way of the future
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value;
	localStorage.setItem(c_name, value);
	*/
	$.totalStorage( c_name, value);
}


//Copyright 2009 Nicholas C. Zakas. All rights reserved.
//MIT-Licensed, see source file
function binarySearch(items, value, exact_match_fudge, new_chapter_for_letter){
		/*
			exact_match_fudge is the offset to return when an exact
			match is found. By default we track back at least 20 places
			to find the first occurance, however do we then return
			the first occurance or the one before?
			exact_match_fudge = 0 means yes (the former)
			exact_match_fudge = -1 means the one before

			TODO: new_chapter_for_letter, if set, will make searches return the
			next page of what it would normally would return, since the
			new letter starts on the page where the first root with that
			letter occurs also.
		*/

    //debug('items: ' + items + 'value: ' + value + 'exact_match_fudge: ' + exact_match_fudge); 
		value = value.replace( /\s*/g, "");

    var startIndex  = 0,
        stopIndex   = items.length - 1,
        middle      = Math.floor((stopIndex + startIndex)/2),
				retval = 0;

    loop_count = 0;
    while(items[middle] != value && startIndex < stopIndex && loop_count < 100){
        //debug(middle+'='+items[middle]); 
        loop_count++; // abd shomad: Temporary countermeasure to prevent endless looping (due to index is not defined). 
        //adjust search area
        if (value < items[middle]) stopIndex = middle - 1;
        if (value > items[middle]) startIndex = middle + 1;
				if (middle != 0 && value < items[middle] && value > items[middle-1]) {
					// This is really the page we want
					//debug( "wanted page encountered on path traversing binary branches")
					break
				}
				
				if (loop_count > 98) alert("something fishy, loopcount = 99!");

        //recalculate middle
        middle = Math.floor((stopIndex + startIndex)/2);
        //debug("Recalculated middle: " +middle+'='+items[middle]); 
    }
		if ( middle == 0) retval = 0;
		if ( middle > items.length-1) middle = items.length-1;
		if ( items[middle] == value) {
			// Trace back to a max of 20 items to get the first occurrence of items[middle] == value
			//debug("Tracing back...")
			for (i = 1; i < middle; i++) {
				if ( items[middle-i] != value) {
					// Give the first match if searching for the start of a chapter
					if ( value.length == 1 && exact_match_fudge == -1)
						retval = middle-i+2+exact_match_fudge;
					else 
						retval = middle-i+1+exact_match_fudge;
					break;
				}
				
			}
		} else {
    	//return (items[middle] != value) ? -1 : middle;
    	//return (items[middle] > value && middle > 0) ? middle-1 : middle;
    	//retval = (value > items[middle]) ? middle+1+exact_match_fudge : middle+exact_match_fudge;
    	if (value > items[middle] && value.length == 1) retval = middle+1
			else retval = middle
		}
		debug( 'search = ' + value + ' retval = ' + retval + ' which is: ' + items[retval]);
		return retval;
}


// main()

first_page_load();




//==========================================================
/* The javascript graveyard:
*/

