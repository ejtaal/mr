==========================================
Mawrid Reader: Arabic dictionary interface
==========================================

Mawrid Reader is a HTML/JavaScript app for both desktop and mobile use
for displaying and searching books. It is used by the following sub projects:

	- Arabic Almanac (root based dictionaries in various languages) `link to website <http://ejtaal.net/aa/>`_
	- Mawrid (for alphabetical disctionaries, notably al-Mawrid) `link to website <http://ejtaal.net/mr/>`_
	- Mabhath ul Talib (root based dictionaries in text format rather than as images) `link to website <http://ejtaal.net/mh/>`_

All of these projects can also be downloaded to your hard disk or
smart phone's sd card, for fast offline usage. Read below for more
information on how to use this website, how to downloading and install it and
other background information.

..
  A link to an internal target: `test <#aa>`_

.. contents::
.. 
	sectnum::


Latest news
===========

-   Version 6.0 - 31/1/2015

		- Page swiping is now less sensitive by default as iOS users were reporting it was a problem in the old version. Feedback on the test version confirms it works better, but if it doesn't you can now switch swiping off altogether in the menu.

		-	Now with 10 new dictionaries (1 Egyptian, 7 Arabic, 1 English, 1 Malay/Indonesian):

			- bdw: Hind/Badawi (Egyptian)
			- amr: Mufradat al Quran by Raghib (Arabic)
			- asb: Asaas al Balaaghah by Zamakhshari (Arabic)
			- auh: Umdat ul Huffaaz (Arabic)
			- tla: Tasheeh Lisan ul Arab (Arabic)
			- msb: Misbaah ul Muneer by Fuyyumi (Arabic)
			- mht: Muheet al-Muheet (Arabic)
			- amj: Al-Munjid (Arabic)
			- dhq: Dictionary of the Holy Quran
			- ens: Ensiklopedia Al-Quran (Malay): Kajian Kosa Kata, Quraish Shihab

		- New beta project: `Mabhath ul Talib <http://ejtaal.net/mh>`_. This project provides a text based interface similar to the mabheth.info website and is still work in progress but hopefully it will be of some use already. More work needs to be undertaken in order to increase the number of books as well as the quality of the existing books and the user interface. Simply type the root you wish to lookup in the search field and a drop down list should list the roots that are found in the available dictionaries.

		- Now on twitter (but without much to say yet): `@ejvtaal <https://twitter.com/ejvtaal>`_

  	Older news: `read more... <#older-news>`_
    

   

How to use
==========

There is a really useful explanation page with screenshots here:
`http://revivearabic.blogspot.co.uk <http://revivearabic.blogspot.co.uk/p/using-arabic-almanac.html>`_

Below a short guide:

Click on the search button and enter the arabic root you would like to
look up. You can use roman (english) letters in case you don't have an
arabic keyboard. The letters will be replaced according to the following
table:

.. raw:: html

   <pre>
   Double letters:
   th/v/V -> "ث"       gh/g/G -> "غ"
   kh/x/X -> "خ"       sh/$ -> "ش"
   dh/* -> "ذ"

   Different cases:
   d -> "د"            t -> "ت"
   D -> "ض"            T -> "ط"
   z -> "ز"            h -> "ه"
   Z -> "ظ"            H -> "ح"
   s -> "س"
   S -> "ص"

   All other "normal" letters:
   a/A -> "ا"          q/Q   -> "ق"   
   b/B -> "ب"          k/K   -> "ك"
   j/J -> "ج"          l/L   -> "ل"
   7 -> "ح"            m/M   -> "م"
   r/R -> "ر"          n/N   -> "ن"
   w/W -> "و"          y/Y   -> "ي"
   f/F -> "ف"          e/E/3 -> "ع"
   </pre>

There are also some keyboard shortcuts you can use:

.. raw:: html

   <pre>
   search (find): f
   switch between column and full page view: v
   make pages fit to window: w

   The following keys only apply for the book you're currently looking at:
   back 1 page: left arrow, d or z
   forward 1 page: right arrow, g or x
   </pre>
   

Use swiping actions to the left and right to skip to the next or previous pages if you're using this site on a phone or tablet. There are option in the menu to toggle the sensitivity or to switch swiping off altogether.

If you hide a book its images are not loaded during new searches, so this will improve the load time for the books that you do want to view.




API
~~~
A very basic one: You can create links to this site that will perform a search in all the books like so: "http://ejtaal.net/aa#q=bqr" or to avoid clashes between for instance 'khf' and 'k h f' you could use the 'buckwalter query' option using #bwq, which strictly follows Buckwalter transliteration. The links for the 2 given root would then be: "http://ejtaal.net/aa#bwq=xf" and "http://ejtaal.net/aa#bwq=khf".


Books currently included
========================

.. _aa:

Arabic Almanac: Root based dictionaries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

English
*******


HW: Hans Wehr
-------------

Started around WW2 and amended a few times since then, it is a very
concise dictionary listing some commonly found sayings. Its drawback is
that is focuses more on the language as it is found in print today with
all sorts of modern usages, making it difficult to find meanings
intended in older texts.

LL/LS: Lane's Lexicon + supplement
----------------------------------

This is a monumental work written in the 19th century, where the author
has gone through dozens of arabic sources and compiled a lot of relevant
examples for each root, from Quran, Hadeeth, poetry and proverbs. It is
extremely verbose which sometimes makes it difficult to find the
word you're looking for. The main work only goes up til the letter qaf,
and the supplement written after the author's death relies on his notes
and is therefore unfortunately lacking. Still extremely useful
nonetheless. In this website the supplement will close and open
automatically for you depending on whether you search for a root before
or after the letter qaf respectively.

SG: Steingass
-------------

This dictionary seems to fill the gap between Hans Wehr and Lane's
Lexicon in that it was also written in the 19th century and also focuses
on classical meanings. See for example the translation of 'to plough'
under IV of the root thwr (tha wow ra) which is not in Wehr but is
present in the lexicon. `Biography of the
author <http://en.wikipedia.org/wiki/Francis_Joseph_Steingass>`_

BR: Brill
---------
A very good dictionary devoted to the roots found in the Quran giving statistics and translations of every root listed.

PR: A Dictionary and Glossary of the Koran by John Penrice
----------------------------------------------------------

An older dictionary also devoted to Quranic roots authored in the 19th century.

HA: Hava
--------

A very basic dictionary focusing on some more classical meanings.

AAN: Vocabulary Of The Holy Quran by Dr Abdullah Abbas Nadwi
------------------------------------------------------------

An extremely useful dictionary of the words in the Qur'an, compiled on the basis of their three-letter roots, allowing one to infer the meanings of almost all the different Qur'anic words by recognizing their root meaning. Examples of uses of the words in the Qur'an are also presented.

The Compiler: Dr. Abdullah Abbas Al-Nadwi is a graduate of the Nadwatul Ulema and an MA &PhD in Linguistic Philosophy, He is advisor to the Rabitah al-Alam al-Islamiyyah, Makkah, Member of the Liguistic Society Cambride and Professor at Umm al-Qura University Makkah. 

VI: Verbal Idoms of the Quraan by Mustansir Mir
-----------------------------------------------

An idiom is a phrase where the words together have a different meaning to the literal dictionary meaning of the words. For example, in English there are thousands, e.g. "a little bird told me", "a penny for your thoughts", "a picture is worth a thousand words", "add fuel to the fire" etc.
Similarly, in Arabic there are also thousands. The Quran uses several hundred, thus to truly understand and study The Quran, it is very important to be able to identify, study and understand its idiomatic expressions. This book does just that. It is a very unique study (I have not come across another book that does the same in English). It is a simple list and reference for The Quran's idiomatic usage. This book is recommended for anyone wishing to undertake a deeper and more accurate study of The Quran.

MGF: Dictionary Of The Holy Quran, by Malik Ghulam Farid, M.A
-------------------------------------------------------------

Caution: This dictionary was written by a Qadiani / Ahmadiyah.
However, the dictionary is useful and bias is very limited, it discusses mainly the basic root meaning in detail and also gives effects in shade when some other particles or words are combined with a derivative of such root and it contains unique and useful material on roots.  

DHQ: Dictionary of The Holy Qur'an by Abdul Mannan Omar
-------------------------------------------------------
Caution: This dictionary was written by a Qadiani / Ahmadiyah and bias is visible in some of the roots. However, the dictionary is still useful, and can be studied with caution and additional verification using other dictionaries. It lists multiple meanings associated with the root at the beginning, then he starts listing the various derived forms from the root. Referencing style is also vague e.g. he may list 4 books reference without making distinction which portion he took from which dictionary.  

Urdu
****

UQW: Urdu Qaamoos ul Waheed
--------------------------------------------------

Primarily based on the Arabic dictionary Mu'jam al Waseet which was compiled by a team of scholars in 20th century. Qaamoos ul Waheed is one of the largest available Arabic Urdu dictionaries. 

UMR: Urdu Mufraadaat Alfaaz al Qur'an by ar Raghib
--------------------------------------------------

This is the Urdu translation of the very famous and useful Mufraadaat Alfaaz al Qur'an al Kareem by Raaghib Asfahaany. 

UMS: Urdu Mukhtaar us Sihah
---------------------------

Mukhtaar us Sihaah written by al Raazi is a highly condensed abridgement of As Sihaah by Al-Jawhary with minor additions by him. Many words used in the Qur'an or Hadith were chosen by al Raazi for inclusion in this book. This is the Urdu translation of the book. 

UMJ: Urdu al Munjid
-----------------------

This is the Urdu translation by Ismat abu Saleem of the famous Arabic dictionary al Munjid written by Fr. Louis Ma’luf al-Yassu’i and Fr. Bernard Tottel al-Yassu’i, which has been printed, published, and distributed by a Catholic printing house since 1908. The Arabic dictionary has received some criticism from Muslim Scholars though it is still widely used. Though this is an Urdu translation by a Muslim and appears to have removed many of the concerns, caution is still advised. In Urdu, Al Munjid has been the source of 3 books. Misbaah ul Lughaat was actually based on this dictionary in which the translator removed some content and added some of his own content. The edition used in Almanac is claimed to be the 1st complete Urdu translation of Al Munjid.

ULQ: Urdu Lughaat ul Qur'an by GA Parwez
----------------------------------------
This Arabic Urdu dictionary of the Qur'an has quoted material from some important works and many entries contain useful material. However, since the author is a Sunnah rejector, he has inserted baseless material in a few of the roots. Caution is advised. It contains some rare and useful material but this caution and his bias should be kept in mind.

UQA: Qaamoos alfaaz o Istelehaat e Qur'an
----------------------------------------- 
This dictionary is extracted from the notes on words given in the large Urdu Tafseer of The Qur'an Tadabbur e Qur'an by Amin Ahsan Islahi. The focus appears to be on giving meaning based on usage of the word in language.

UQQ: Urdu Qaamoos Alfaaz al Qur'an al Kareem
--------------------------------------------

Urdu Translation of Vocabulary of The Holy Qur'an by Abdullah Abbas Nadwi. Gives meanings of the roots and their related words. A brief yet useful book. Also gives brief grammatical notes. 

Arabic
******

LA: Lisan al-'Arab
-----------------------
The Lisān al-ʿArab (لسان العرب, "The Arab Tongue") was completed by Ibn Manzur in 1290. Occupying 20 printed book volumes (in the most frequently cited edition), it is the most well-known dictionary of the Arabic language,[3] as well as one of the most comprehensive. Ibn Manzur compiled it from other sources, to a large degree.

TLA: Tasheeh Lisan ul Arab (Arabic)
-----------------------------------
This is a short book which has posted some corrections to few of the entries of Lisaan ul Arab. This can be used along with Lisaan ul Arab for the few roots it has touched.

AMJ: Al-Munjid
--------------

It is said that in the Arab World al-Munjid is the standard Arabic-Arabic dictionary used.It includes a chapter of Arabic saying at the end of the book as well as additional color images, maps and tables.

BDW: Hind/Badawi (Egyptian)
---------------------------
This root based dictionary enjoys glowing reviews by those who wish to study this particular dialect of Arabic.

AMR: Mufradat al Quran by Raghib (Arabic)
-----------------------------------------
The most famous Dictionary of The Qur'an in Arabic.  Arabic English Dictionary of Qur'anic Usage has mentioned in its introduction: "Indeed, 'al Raghib was of the opinion, expressed in the introduction to his book, that of all disciplines needed for the study of the Qur'an those concerned with the language itself should come first, and, of these, those concerned with the meanings of Qur'anic vocabulary should be considered of primary importance." He has usually 1st given the primary meanings of words and then quoted the Qur'anic Ayaat along with further explanation of the words used. 

ASB: Asaas al Balaaghah by Zamakhshari (Arabic)
-------------------------------------------------
This is a short dictionary by Zamakhshari who is famous for his Qur'an Tafsir Kashaaf and Grammar work Mufassal. In Asaas al Balaaghah, while briefly explaining the words, he has discussed primary meanings and secondary meanings of words. He has written unique content in explanation of words.

AUH: Umdat ul Huffaaz (Arabic)
------------------------------
He has also written a detailed Tafsir by the name of  Ad Durr ul Masoon in which he has exlpained the words used in the Ayat in some detail. In this dictionary he has explained the words under their roots using Qur'an , Ahaadith and Poetic verses.

MSB: Misbaah ul Muneer by Fuyyumi (Arabic)
------------------------------------------
A compact Arabic to Arabic dictionary. Regarding it Lane said in his preface: "...forming a most valuable companion and supplement to the larger lexicons . Notwithstanding its title, it comprises a very large collection of classical words and phrases and significations of frequent occurrence; in many instances with more clear and full explanations than I have found elsewhere. I have therefore constantly drawn from it in composing my own lexicon."

MHT: Muheet al-Muheet (Arabic)
-------------------------------
It was compiled in the last century. Although this book is not among the large books, it is still very useful. The primary source of this book is Qaamoos ul Muheet but the author has also consulted other important books while compiling this dictionary. He has tried to present the important material regarding the words in this dictionary. An attempt to combine the best of Qaamoos ul Muheet and his own research by Butras Bustani in a compact manner.


Indonesion / Malaysian
**********************

IMN: Indonesia, Al-Munawwir, Kamus Arab-Indonesia Terlengkap, oleh KH. Ahmad Warson Munawwir
--------------------------------------------------------------------------------------------
Kamus Al-Munawwir merupakan sebuah kamus bahasa Arab-Indonesia yang merupakan kamus bahasa Arab terlengkap, paling tebal dan legendaris di Indonesia. Kamus ini telah banyak digunakan oleh para penuntut ilmu (thullabul Ilmi) untuk mengetahui arti kosakata Arab ke dalam bahasa Indonesia juga sebagai acuan pada bendahara kosakata terjemahan kitab kuning. Kamus ini termasuk kategori best seller, karena telah dicetak berulangkali dan dicetak sekitar 10 ribu-15 ribu eksemplar pertahun. Untuk melengkapinya kamus ini kemudian diikuti edisi Indonesia-Arab-nya. Link: http://id.wikipedia.org/wiki/Al-Munawwir_(kamus)

MAR: Kamus Idris Al-Marbawi (Arabic-Malay) 
-------------------------------------------
Compiled by Sheikh Muhammad Idris Abdul Rauf Al-Marbawia, a Malay scholar born in Saudi Arabia. He spent most of his life facilitating the efforts of learning the Arabic books in many madrasa in Malaysia and finally in Al Azhar University in Egypt. Then, he began to compile the Arabic/Malay dictionary or more recognizable as Kamus Idris al-Marbawi, published in 1937. 

ENS: Ensiklopedia Al-Quran (Malay): Kajian Kosa Kata, Quraish Shihab
---------------------------------------------------------------------
This book is produced in an effort to explain the Qur'anic vocabulary and its guidance equipped with an
explanation of semantic meanings. The book is based on the criticism of the Qur’anic experts who found an
abundant confusion in the exegetical works made by the exegetes in understanding the Qur’anic vocabulary. The
idea for this book was inspired in 1992 by Shihab as a reference for religious leaders, educators and scholars. To
achieve these goals, the research team was formed comprising of a chief researcher and authors.

The chief researcher was selected from among the Qur’anic experts; in this case Shihab was elected to assume
the position. The group of organizers were supervised by Abd. Hafizh Dasuki and assisted by Ahmad Thib Raya.
The authors consisted of the lecturers in the Islamic State University and Higher Education Institution who were
studying at the post-graduate level IAIN Syarif Hidayatullah, Jakarta and IAIN Sunan Kalijaga, Yogyakarta.

In 1997, the trial edition of the Qur’anic Encyclopaedia was published, entitled Ensiklopedi Al-Qur’an: Kajian
Kosa kata dan Tafsirnya [An Encyclopaedia of the Qur’an: Study of the Vocabulary and its Exegesis]. The book
is dissected and studied extensively in an academic symposium to which the participants were invited. Many of
the Qur’anic experts attended along with intellectuals and Islamic civil society activists. Through criticism and
suggestions on the trial edition, a group of researchers sought to perfect the book. After a relatively long time as
well as the addition of new titles, a new organizers group were formed to oversee the existing data and prepare
for publication. Members of the group in question include Shihab (Chief), Nasaruddin Umar and Muchlis Hanafi
(Vice Chairman), Sahabuddin, Yusuf Baihaqi, and Irfan Abdullah and Salim Masud Rusydi Cahyono (Members).

The result is a published on collaboration with the Lentera Hati publisher, the Centre of Qur’anic Study and
Yayasan Paguyuban Ikhlas in 2007. An initial publication of 485 was increased to 1050 units. The book is
arranged alphabetically by following the Indonesian language transliteration of the Arabic language. Whereas the
form of the selected word is determined based on its usage in the Qur’an and not the original or root of the word
(though the original word was deliberated and discussed with a variety of regular derivations). This method is
selected for the convenience of readers

`Source <http://ccsenet.org/journal/index.php/ass/article/viewFile/39701/21983>`_

French
******

KAZ: Kazimirski, French Dictionnaire Arabe-Francais
---------------------------------------------------
This work has been the standard dictionary for translation of Arabic into French for many years. It contains most of the known roots of the Arabic language and also includes the dialects of Algiers and Morocco. Albert de Biberstein Kazimirski (1808-1887) was a lexicographer of repute in the nineteenth century. Among his many accomplishments was the translation of the Quran into French and the production of multiple dictionaries.

.. _mr:

Mawrid: Alphabetical dictionaries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

English
*******

MAW: al-Mawrid 7th ed. by Rowhi Baalbaki 
----------------------------------------
This is a modern and compact Arabic English dictionary. It is arranged according to words instead of roots and is a great resource for both beginners as well as advanced learners of Modern Arabic. 

Urdu
****

LQN: Lughaat ul-Quran by Abdur Rasheed Noumani (Urdu)
-----------------------------------------------------

The largest Arabic Urdu Dictionary of The Qur'an of about 2161 pages, but it is arranged according to words instead of roots. It gives meanings and explanations of the words along with brief grammatical information. It has explained some of the important words in great detail. 

.. _mh:

Mabhath: Text based dictionaries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Lanes Lexicon
*************

By the Perseus Tuft project, text improved by br. Naveed.

Other books
***********

More explanation to come soon.




Starting points:
================

(This section is outdated. It should be replaced by new functionality that allows accessing the non-indexed parts of books, such as the introduction, prefaces, biographies etc.)

Here are some links to get you started (TODO: Remaining morphology links for SG, BR, PR, HW4, AAN, VI):

-  `Prefaces <aa.html#HW3=5,LL=1_6,LS=2,HA=11,LS_HIDE,SG=6,BR=7,PR=8,HW4=4,AAN=6,VI=17>`_
-  `Morphology <aa.html#HW3=13,LL=1_29,LS=2,HA=19,LS_HIDE>`_
-  `Abbreviations <aa.html#HW3=16,LL=1_30,LS=2,HA=20,LS_HIDE,SG=18,BR=25,PR_HIDE,HW4=12,AAN=12,VI=13>`_
-  `First page of content <aa.html#HW3=19,LL=1_38,LS=3,HA=21,SG=20,BR=27,PR=10,HW4=14,AAN=24,VI=51>`_
-  `Lane's Lexicon Editor's preface and memoir (about 40
   pages) <aa.html#HW3=5,LL=5_5,LS=2,HA=11,HW_HIDE,LS_HIDE,HA_HIDE,SG_HIDE,BR_HIDE,PR_HIDE,HW4_HIDE,AAN_HIDE,VI_HIDE>`_

Browser support
===============

I aim to make this website compatible with all major current desktop and mobile/tablet browsers, like Chrome, Firefox and Opera. However, I recommend against using Internet Explorer as this browser gives inconsistent behaviour when using this website.

Should work on most smart phones & tablets!
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Depending on your screen resolution it will decide upon first load to
either use full width view or single column view mode, so that it should
select full view when you use this page on a largish desktop/tablet
screen but column mode if you access it using your smart phone. You can
always change the view manually with the 'View' button.

.. raw:: html

   <p>

Warning! With all books visible a single search may load up to 1-2 MB of images! Watch your internet usage allowance! Books that you hide won't have their images downloaded.

Download for offline use
========================

Entire site
~~~~~~~~~~~


You can now download the entire website and install it for instance on
your phone's SD card or your desktop PC for super fast access. Download
link:

-  **Main download site @ archive.org:**
   `Mawrid_Reader_v2.0.zip <https://ia600803.us.archive.org/2/items/ArabicAlmanac/Mawrid_Reader_v1.0.zip>`_
..
    -  Secondary backup site: `here <../>`_\ 


The size is about 2.9 GB. The zip file contains two folders, one named "aa" and one "mr"
which you should place somewhere on your PC's drive or on your phone's
SD card. For desktops you should then be able to do "File->Open" and
select the index.html file within the "aa" or "mr" folder for root based or alphabetical dictionaries respectively. On smart phones &
tablets there are 2 ways you could try to get it installed: 1) Install the free Opera browser (the full one, not the Mini) to go the following url:
`file://localhost/sdcard <file://localhost/sdcard>`_, then locate the
"aa" or "mr" folder and click on index.html or 2) Install the free Astro file manager and navigate to the aa or mr folder that you've extracted from the zip file onto the sdcard. Tap the index.html file and it will either open in your default browser or you can choose any of the installed browser to open the file. Once in your browser you can bookmark it for quick access. I've found the Dolpin browser to have the best performance, but the Chrome or Firefox browsers should work as well.

.. 
	Download single dictionaries only
	~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
	
	This way allows you to download only those dictionaries you wish to use. Currently the site will still assume you've got all dictionaries present so the ones you haven't downloaded will simply appear as "File not found" images.
	
	Firstly you need the base files contained in base.zip. This file contains the indexes and the site itself. Create a folder on your PC or sdcard called 'AA' or 'MR' for Arabic Almanac or Mawrid Reader respectively. Place the right base.zip and the dictionaries zip files that you've downloaded all in this folder and extract them one by one.
	
	Required to install Arabic Almanac
	**********************************
	
	- Base files (download this to get the latest indexes and website version) `base_aa.zip <./base_aa.zip>`_
	
	
	Required to install Mawrid Reader
	*********************************
	
	- Base files (download this to get the latest indexes and website version) `base_mr.zip <./base_mr.zip>`_
	
	
	Optional dictionaries
	*********************
	

    
    



Future plans / Feedback
=======================

- Plans are forming for a version solely based on arabic grammar books. They would include a list of particles/subject which when activated will display all relevant pages from the included books.
- Enhancements as well as bugs are now recorded in the Github issue list: `Mawrid Reader issues <https://github.com/ejtaal/mr/issues>`_
- Figure out a way to have interesting pages for a book listed, such as foreword, biographies or appendices which would normally be difficult to find using the search function.

Contact me at ejtaal@gmail.com for more details on how to help with adding further books.. You can also contact me if you wish to discuss a custom made
version featuring your own books.

I'm planning to start work soon insha Allah on a text based Arabic dictionary, you can follow my progress on Github at the `Mabhath <https://github.com/ejtaal/mabhath>`_ project. It will feature a re-designed layout and I aim to include as many dictionaries as can be found in a text format. Contact me if you have any suggestions.

   
Older news
==========

-   Version 5.1 - 18/1/2014

    - Small fixes to the interface, renamed the top buttons and disabled swipe images by default. It can be turned on in the Menu, in which there's also a fix to make it less sensitive.
    - included different favicons for each separate mawrid reader project (Arabic Almanac, Mawrid, Mabhath)
    - Now separate downloads are offered: the base files and each dictionary as a separate zip file. This is in preparation for a soon to be released Android app made by a volunteer. More news to follow regarding this. See the download section below
    - A basic debugging facility in the Menu to see if images are being loaded or not.
    
-   Version 5.0 - 24/11/2013

    Further hard work by the project's volunteers has resulted in addition of the following books:

    - LA: Lisan al-'Arab, by Ibn Manzur
    - MAR: Marbawi: Arabic - Malaysian dictionary
    - IMN: Indonesian: Kamus Al-Munawwir, Arab-Indonesia Terlengkap, oleh KH. Ahmad Warson Munawwir
    - KAZ: Kazimirski, French Dictionnaire Arabe-Francais
    - UQQ: Urdu Qamoos Alfaaz al-Quran: A translation of Vocabulary Of The Holy Quran by Dr Abdullah Abbas Nadwi
    - ULQ: Lughaat ul Qur'an by GA Parwez
    - UQA: Qaamoos alfaaz o Istelehaat e Qur'an
    - UQQ: Lughat al Quran, an urdu translation of AAN: Vocabulary of the Holy Quran.
    - MAW: al-Mawrid 7th edtion.
    - LQN: Lughaat ul-Quran by Abdur Rasheed Noumani (Urdu)
  
    The website is now split up in two parts, one dedicated to root based dictionaries (formerly known as Arabic Almanac) and one for dictionaries that are arranged alphabetically. You can find them here:
    
    - Root based (Hans Wehr, Lanes Lexicon, etc): `http://ejtaal.net/aa <http://ejtaal.net/aa>`_ 
    - Alphabetical (al-Mawrid, etc) `http://ejtaal.net/mr <http://ejtaal.net/mr>`_
    
    The new version now has an improved settings screen, which allows better book re-ordering when using the site on mobile devices. You can now also skip to the next or previous page using a swiping action on mobile and tablet browsers as you do in many other apps.

		If for some reason you encounter problems with the new version, you can go back to the old version 4 here: `Version 4 <http://ejtaal.net/aa-old>`_


-  version 4.0 - 20/7/2013

   Thanks to the work of 2 very enthusiastic volunteers, we present
   version 4.0 which now includes the following 7 new books:
   
   -  Dictionary Of The Holy Quran, by Malik Ghulam Farid, M.A.
   -  Verbal Idioms Of The Holy Quran by Mustansir Mir.
   -  Vocabulary Of The Holy Quran by Dr Abdullah Abbas Nadwi.
   -  Urdu: Qaamoos ul Waheed
   -  Urdu: Mukhtaar us Sihah
   -  Urdu: Mufraadaat ar Raghiib
   -  Urdu: al-Munjid

-  version 3.1 - 28/3/2013

   - 2 minor fixes: 1) Fix hanging with downloaded version (it was trying to contact Google analytics which is pointless when you're offline) and 2) Clear images when doing a new search so that you can see the new image being downloaded.

-  version 3.0 - 25/2/2013

   -  Thanks to brother Abd Shomad, I've been able to add the following 3
      new books: 4th print of Hans Wehr (finally), and the Quranic dictionaries by Brill and Penrice.
   - New way of selecting book order in the settings menu (3 bar button on top left)
   - other minor fixes and updates

-  version 2.0 - 30/1/2013

   -  Included "The student's Arabic-English dictionary", by Steingass,
      similar to Hans Wehr but more useful for classical arabic words.
      Thanks to some very helpful volunteers I was able to include it
      very quickly.
   -  New settings dialog (click the 3 line menu on the top left) which
      allows you to re-order the books.
   -  A new button on top allows you to fit large pages to the window.
      You can also use the button 'w' to toggle this on and off.

-  version 1.8 - 14/12/2012

   -  Improved index for Hans Wehr (3rd print), about 60% done, not sure
      if it will be completed as looking into using the 4th print
   -  Site is now hosted at Memset.com, hopefully this will allow for
      faster access and improved reliability :)

-  Version 1.7 - 19/7/2012

   -  Updated images of Hava book to scans that Ahmad Sheikh had
      prepared.
   -  Tweak HW lookup as it often goes to the page before a root

-  Version 1.6 - 19/3/2012

   -  include option to do '#q=bqr' or '#search' in the url bar which
      will return the relevant search results and bring up the search
      box respectively.

-  Version 1.5 - 19/11/2011

   -  added some useful starting points.

-  Version 1.4 - 8/11/2011

   -  Make it work in Internet Explorer 7/8/9 (read: use more jQuery so
      it should support even more browsers)

-  Version 1.3 - 4/11/2011

   -  added Hava dictionary, thanks to a fan of this website for
      providing some missing pages :)
   -  fixed window title to be according to order and visibility of the
      books
   -  provide a downloadable version. If you can provide mirroring for a
      615MB files, then please drop me a line!

-  Version 1.2 - 3/11/2011

   -  implemented saving order of books and restoring this on page
      reload.

-  Version 1.1 - 3/11/2011

   -  Use cookies to: 1) bring you back to the last page you viewed and
      2) Save hidden states of individual books between reloads
   -  Move a book up by clicking on the '^' button. (Not saved between
      reloads yet...)

-  Version 1.0 - 1/11/2011

   -  Fix issues with spaces, these are now filtered out in the search
      function. If you search for "N S b" or "NSb", you should reach the
      same page.

-  Version 1.0 beta - 29/10/2011 New features (mostly thanks to
   inclusion of jQuery):

   -  Keyboard back/forward shortcuts will only turn pages on the book
      that you're looking at.
   -  Ability to hide books.
   -  Loading text to inform of images that are loading
   -  Lanes Supplement hides itself when nothing useful is found during
      a search.


Sources and acknowledgements
============================

First of all I'd like to say thanks to thank every one who has taken
time to send a few words of appreciation. I'm honestly humbled by seeing
how many people and institutes are making use of this project.

Then there are some people who have contributed a lot of their time helping 
to improve the project, namely:

The indexes for both Hans Wehr (3rd print) & Hava has been made possible
by using data generously provided by a fan of this website.

The index for Lanes Lexicon and suggestions for including the supplement
has been made possible by using data generously provided by Abdul Hafiz.

The index for Steingass has been provided by some very helpful Malaysian
students of Arabic.

The index for the 4th print of Hans Wehr, Brill and Penrice have been provided by Abd Shomad.

For version 4.0, Abd Shomad provided help in development by adding
the code required for 4 new books, and Asim Iqbal 2nd for gathering content 
( `www <http://asimiqbal2nd.wordpress.com/>`_ ).


Jazakum Allahu khair :)


Contact / donate / license
===========================

-  Project hosted at: `GitHub <https://github.com/ejtaal/mr>`_

Kindly direct any donations you wish to make to those less fortunate in the world. I especially like UWT for their 100% donation
policy which means they pass on all money to the final recipients. Their website can be found here:
`Ummah Welfare Trust <http://www.uwt.org/>`_

If you'd like to contribute towards the running cost of the website you can
use the following donate button. Jazak Allah khairan and many thanks in advance for any 
and all amounts you wish to donate :)

.. raw:: html

	<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
	<input type="hidden" name="cmd" value="_donations">
	<input type="hidden" name="business" value="ejtaal@gmail.com">
	<input type="hidden" name="lc" value="GB">
	<input type="hidden" name="item_name" value="ejtaal.net">
	<input type="hidden" name="no_note" value="0">
	<input type="hidden" name="currency_code" value="USD">
	<input type="hidden" name="bn" value="PP-DonationsBF:btn_donate_LG.gif:NonHostedGuest">
	<input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_LG.gif" border="0" name="submit" alt="PayPal – The safer, easier way to pay online.">
	<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
	</form>

© 2011-2015 by Abdurahman Erik Taal

My email: `ejtaal@gmail.com <mailto:ejtaal@gmail.com>`_

Code license: GNU GPL v3.
Dua-ware: You must make dua for everyone involved in this project at least once if you're using this software :)

Software used
=============

-  scantailor, a useful tool to prepare the image files of the books
-  ImageMagick, an image processing tool
-  ReText, documentation editor

Stats
=====

Relative popularity of individual books
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

I've determined this by this command:

awk '{ print $7 }' /var/log/apache2/ejtaal.net-access.log.1 | grep '/aa/img' | cut -f 4 -d '/' | sort | uniq -c | sort -n

The following data is for December 2014:

  40391 ls
  87929 pr
  90147 vi
  93186 uqa
  95664 uqq
  97338 mar
  98802 umr
  98853 aan
  99284 ums
  99599 umj
  99995 mgf
 100810 ulq
 101269 imn
 101632 uqw
 103220 sg
 103831 ha
 104405 kaz
 105281 br
 105905 la
 121140 ll
 191958 hw4

Most popular pages/roots
~~~~~~~~~~~~~~~~~~~~~~~~~

Of December 2014: 
Hans Wehr: hw4-0718.png  (عرض)
Lanes Lexicon: ll-2670.png ﴾قوض﴿







