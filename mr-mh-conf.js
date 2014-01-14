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
	"type": "text",
	"icon": "mh.ico"
}

var books = {
	"sh_nvd": { "name": "al-Sihah fi Lugha (NVD)", "color": "Teal",
		"index": sh_nvd, "align": "right", "offset": 0, "startpage": 0 },
	"sh": { "name": "al-Sihah fi Lugha", "color": "Cyan",
		"index": sh, "align": "right", "offset": 0, "startpage": 0 },
	"la": { "name": "Lisan ulArab", "color": "Salmon",
		"index": la, "align": "right", "offset": 0, "startpage": 0 },
	"ll_nvd": { "name": "Lane's Lexicon (NVD)", "color": "lawngreen",
		"index": ll_nvd, "align": "left", "offset": 0, "startpage": 0 },
	"ll_pt": { "name": "Lane's Lexicon (Perseus Tufts)", "color": "gold",
		"index": ll_pt, "align": "left", "offset": 0, "startpage": 0 },
	"ta_nvd": { "name": "Taj ulAroos (NVD)", "color": "skyblue",
		"index": ta_nvd, "align": "right", "offset": 0, "startpage": 0 }
}

