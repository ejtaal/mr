#!/bin/sh

BASE=/tmp/mr-index-checks/
mkdir -p "$BASE"

for indexfile in mr-??-indexes.js; do
	for index in `grep '\[\]' $indexfile | cut -d= -f1 | cut -d\  -f2 | sort`; do
		grep "^$index\[[0-9]*\]\ *=" $indexfile | \
			awk -F '"' '{ if ($2 != "") print $2 "|" $1 }' | grep . > "$BASE/${index}.orig"
		sort "$BASE/${index}.orig" > "$BASE/${index}.sorted"
		echo "Comparison for index: $indexfile: <<< ${index} >>>"
		echo "======================================="
		if cmp -s "$BASE/${index}.orig" "$BASE/${index}.sorted"; then
			echo "Index of $(wc -l < $BASE/${index}.orig) lines looks well sorted and OK!! :)"
		else
			echo "Problems found in this index at the following locations:"
			diff -u "$BASE/${index}.orig" "$BASE/${index}.sorted" | \
				grep "^-[^-]" | sed 's/^-//g' | awk -F '|' '{ print $2 $1 }'
		fi
	done
done
