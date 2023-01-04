// ==UserScript==
// @name tixid, deck Dixit alternatif
// @description Remplace les cartes Dixit originelles par celles du Deck alternatif (s'il y a exactement le mot "tixid" dans le titre de la partie)
// @namespace https://www.boiteajeux.net
// @match https://www.boiteajeux.net/jeux/dix/partie.php*
// @match https://www.boiteajeux.net/jeux/dix/historique.php*
// @require http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js
// @version 1.0
// ==/UserScript==
var myTitleSesame = 'tixid';
var myDecksRoot = 'https://raw.githubusercontent.com/peyofr/tixid/main/dix_files/';
var myURL = window.location.href;
var myTitle = '?' ;
if (myURL.indexOf("partie") >= 0) { myTitle = document.querySelectorAll('span[style="font-size:8pt;font-style:italic;"]')[0].innerHTML; }
if ((myTitle.indexOf(myTitleSesame) >= 0) || (myURL.indexOf("deck=alternatif") >= 0)) {
    var gameId = window.location.href.split('=')[1];
    unsafeWindow.historique = function () { popup('historique.php?id=' + gameId + '&deck=alternatif','wiHisto',650,800); }
	$('img').each(function(){
		var oldUrl = $(this).attr("src");
		var imgName = oldUrl.split('/')[1];
		var imgNumber = imgName.split('.')[0];
		if($.isNumeric(imgNumber)){
			$(this).attr("src", myDecksRoot+imgNumber+'.png');
            $(this).attr("onmouseover", '$("#dvGdeCarte").html("<img src=\''+myDecksRoot+imgNumber+'.png\'>"); $("#dvGdeCarte").show();');
		}
	});
}