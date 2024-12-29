#!/bin/bash

dest=root@192.168.0.100:/storage/sdcard1/MR3
dest="root@192.168.0.103:/storage/extsd/AA6"
dest="root@192.168.0.102:/storage/sdcard1/AA6"
dest="/mnt/cifs/TScratch1/httpd/htdocs"
SSH="ssh -p 2222"
SSH="ssh -p 22"
RSYNC="rsync --delete-after -tvrL --size-only --inplace -P"
RSYNC="rsync --delete-after -tvrL --modify-window=30 --inplace -P"
$RSYNC -e "$SSH" aa/{.nomedia,jslib,aa.ico,*.html,*.js,img} $dest/aa/
$RSYNC -e "$SSH" mr/{.nomedia,jslib,mr.ico,*.html,*.js,img} $dest/mr/
$RSYNC -e "$SSH" mh/{.nomedia,jslib,mh.ico,*.html,*.js,text} $dest/mh/

