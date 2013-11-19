var presets = {
	"default": { "name": "Default", "order": "maw,lqn" },
	"english": { "name": "English", "order": "maw" },
	"urdu": { "name": "Urdu", "order": "lqn" }
}

var project = {
	"info": "Search through al-Mawrid online",
	"intro": "Mawrid Reader",
	"prefix": "mr_"
}

/*
	"": { "name": "", "color": "",
		"index": , "direction": "ltr", "columns": "2",
		"offset": , "startpage": , "image-prefix": "" },
*/

var books = {
	"maw": { "name": "al-Mawrid, 7th ed.", "color": "Salmon",
		"index": maw, "direction": "rtl", "columns": "2",
		"offset": 17, "startpage": 17, "image-prefix": "maw" },
	"lqn": { "name": "Lughaat ul-Quran (Urdu)", "color": "Lawngreen",
		"index": maw, "direction": "rtl", "columns": "2",
		"offset": 22, "startpage": 22, "image-prefix": "lqn" }
}

