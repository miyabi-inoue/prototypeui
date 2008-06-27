[
<?php
if(isset($_POST['first']))
	$first=intval($_POST['first']);
else
	$first=0;
if(isset($_POST['perpage']))
	$perpage=intval($_POST['perpage']);
else
	$perpage=30;
	
$firstnames=array(
	"Sébastien",
	"Samuel", 
	"Vincent", 
	"Tobie", 
	"Christophe",
	"Lo",
	"Cloé", 
	"Inès",
	"Sven",
	"Matthias",
	"Paul",
	"Peter",
	"Mary",
	"Simon",
	"Steve",
	"Steven",
	"Bill",
	"William",
	
);
$lastnames=array(
	"Dupois",
	"Mermoz",
	"Spasibo",
	"Sabaka",
	"Gruhier",
	"Charettes",
	"Brönstrup",
	"Miller",
	"Müller",
	"Maier",
	"Meyer",
	"Meier",
	"Meyrs",
	"Gates",
	"Jobs",
	"Williams",
);	
	
for($i=$first;$i<$first+$perpage;$i++)
{
	shuffle($firstnames);
	shuffle($lastnames);
	echo "{firstname:'".$firstnames[0]."', lastname:'".$lastnames[0]."', id:".($i+1)."},\n";
}

if(false) {
?>
 {firstname:"Sébastien", lastname:"Dupois", id:1},
 {firstname:"Samuel", lastname:"Mermoz", id:2},
 {firstname:"Vincent", lastname:"Spasibo", id:3},
<?php
}
?>
]