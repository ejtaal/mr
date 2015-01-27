#!/bin/bash

dest=root@192.168.0.100:/storage/sdcard1/MR3
RSYNC="rsync -tvrL --size-only --inplace -P"
RSYNC="rsync -tvrL --modify-window=30 --inplace -P"
$RSYNC aa/{.nomedia,jslib,aa.ico,*.html,*.js,img} $dest/aa/
$RSYNC mr/{.nomedia,jslib,mr.ico,*.html,*.js,img} $dest/mr/
$RSYNC mh/{.nomedia,jslib,mh.ico,*.html,*.js,text} $dest/mh/

