#!/bin/bash

version=$(grep "var version" aa/mawrid-app.js | cut -f 2 -d\")
file="Mawrid_Reader_v${version}.zip"
zip -u0vr "$file" {aa,mr,mh}/{.nomedia,jslib,*.ico,*.html,*.js,img,text/*} --exclude \*.swp

unzip -l "$file" | egrep "html|js"

ls -l "$file"
ls -lh "$file"
