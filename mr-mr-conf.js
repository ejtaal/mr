var presets = {
	"default": { "name": "Default", "order": "maw,lqn" },
	"english": { "name": "English", "order": "maw" },
	"urdu": { "name": "Urdu", "order": "lqn" }
}

var project = {
	"info": "Search through al-Mawrid online",
	"intro": "Mawrid Reader",
	"title": "al-Mawrid",
	"version": "1",
	"prefix": "mr_",
	"icon": "mr.ico"
}

/*
	"": { "name": "", "color": "",
		"index": , "direction": "ltr", "columns": "2",
		"offset": , "startpage": , "image-prefix": "" },
*/

var books = {
	"maw": { "name": "al-Mawrid, 7th ed.", "color": "Salmon",
		"index": maw, "direction": "rtl", "columns": "2",
		"offset": 16, "startpage": 16, "image-prefix": "maw" },
	"lqn": { "name": "Lughaat ul-Quran (Urdu)", "color": "Lawngreen",
		"index": lqn, "direction": "rtl", "columns": "2",
		"offset": 23, "startpage": 23, "image-prefix": "lqn" }
}

