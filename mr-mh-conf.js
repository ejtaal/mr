var presets = {
	"default": { "name": "Default", "order": "text1,text2,text3" },
	"arabic": { "name": "Arabic", "order": "text3,text2,text1" },
	"english": { "name": "English", "order": "text1,text3,text2" }
}

var project = {
	"info": "Text based Arabic dictionaries",
	"intro": "Mabhath",
	"title": "Mabhath ulTalib",
	"version": "1.0",
	"prefix": "mh1_",
	"type": "text"
}

var books = {
	"la": { "name": "Lisan ulArab", "color": "Salmon",
		"index": la, "align": "right", "columns": "0",
		"offset": 0, "startpage": 0, "image-prefix": "la" },
	"ll_nvd": { "name": "Lane's Lexicon (NVD)", "color": "lawngreen",
		"index": ll_nvd, "align": "left", "columns": "0",
		"offset": 0, "startpage": 0, "image-prefix": "ll_nvd" },
	"ll_pt": { "name": "Lane's Lexicon (Perseus Tufts)", "color": "gold",
		"index": ll_pt, "align": "left", "columns": "0",
		"offset": 0, "startpage": 0, "image-prefix": "ll_pt" },
	"ta_nvd": { "name": "Taj ulAroos", "color": "skyblue",
		"index": ta_nvd, "align": "right", "columns": "0",
		"offset": 0, "startpage": 0, "image-prefix": "ta_nvd" }
}

