#!/bin/bash

dest=root@192.168.0.100:/storage/sdcard1/MR3
dest="root@192.168.0.103:/storage/extsd/AA6"
SSH="ssh -p 2222"
RSYNC="rsync --delete-after -tvrL --size-only --inplace -P"
RSYNC="rsync --delete-after -tvrL --modify-window=30 --inplace -P"
$RSYNC -e "$SSH" aa/{.nomedia,jslib,aa.ico,*.html,*.js,img} $dest/aa/
$RSYNC -e "$SSH" mr/{.nomedia,jslib,mr.ico,*.html,*.js,img} $dest/mr/
$RSYNC -e "$SSH" mh/{.nomedia,jslib,mh.ico,*.html,*.js,text} $dest/mh/

