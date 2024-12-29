#!/bin/bash

:||"
This script converts the mr-??-conf.js mr-??-indexes.js files into one big one.
This way there's no need to make sym-links to change the app from one settings
profile to another. Up to now the 2 different setting profiles were between
aa, which is Arabic Almanac, the collection of root based dictionaries, and mr or
Mawrid, which is the collection of regular (non-root based) dictionaries.
Once the app takes one big file this paves the way into creating different
profiles more easily.
"

FULL_CONFIGS=mawrid-configs.js

mv -vf "$FULL_CONFIGS" "$FULL_CONFIGS".bak
echo 'var all_indexes=[]
var all_presets = []
var all_project = []
var all_books = []

' > "$FULL_CONFIGS"

CONFIGS=$(sed -n -e '/^var confs =/,/[ \t]\]/p' mawrid-app.js \
| grep ':' | cut -f 2 -d\")

for CONF in $CONFIGS; do
	echo "[[[ CONF: $CONF ]]]"
	
	INDEX_FILE="mr-$CONF-indexes.js"
	cat $INDEX_FILE \
	| perl -p -e "
		s/^var (.*?)\s*=/all_indexes['\$1'] =/;
		s/\) (.{2,5})\[i\]/) all_indexes['\$1'][i]/;
		s/^(\w{2,5})\[/all_indexes['\$1'][/;
	" >> "$FULL_CONFIGS"

	CONF_FILE="mr-$CONF-conf.js"
	cat $CONF_FILE \
	| perl -p -e "
		s/^var (.*?) =/all_\$1\['$CONF'] =/;
		s/\"index\": (.{2,5}),/\"index\": all_indexes['\$1'],/;
	" >> "$FULL_CONFIGS"

	#" >> "$FULL_CONFIGS"



done
