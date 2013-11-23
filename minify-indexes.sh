for i in aa mr; do
	perl minify.pl < mr-$i-indexes.js > mr-$i-indexes.min.js
done
