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
	
$items=array(
	array('firstname'=>'Cloé', 'lastname'=>'Gruhier', 'id'=>1),
	array('firstname'=>'Peter', 'lastname'=>'Meyrs', 'id'=>2),
	array('firstname'=>'Peter', 'lastname'=>'Meier', 'id'=>3),
	array('firstname'=>'Bill', 'lastname'=>'Gates', 'id'=>4),
	array('firstname'=>'Matthias', 'lastname'=>'Gruhier', 'id'=>5),
	array('firstname'=>'Sven', 'lastname'=>'Mermoz', 'id'=>6),
	array('firstname'=>'Peter', 'lastname'=>'Williams', 'id'=>7),
	array('firstname'=>'Steve', 'lastname'=>'Müller', 'id'=>8),
	array('firstname'=>'Samuel', 'lastname'=>'Charettes', 'id'=>9),
	array('firstname'=>'Steve', 'lastname'=>'Mermoz', 'id'=>10),
	array('firstname'=>'Steve', 'lastname'=>'Gruhier', 'id'=>11),
	array('firstname'=>'Vincent', 'lastname'=>'Maier', 'id'=>12),
	array('firstname'=>'Inès', 'lastname'=>'Müller', 'id'=>13),
	array('firstname'=>'Christophe', 'lastname'=>'Williams', 'id'=>14),
	array('firstname'=>'Samuel', 'lastname'=>'Sabaka', 'id'=>15),
	array('firstname'=>'Cloé', 'lastname'=>'Spasibo', 'id'=>16),
	array('firstname'=>'Simon', 'lastname'=>'Spasibo', 'id'=>17),
	array('firstname'=>'Steven', 'lastname'=>'Spasibo', 'id'=>18),
	array('firstname'=>'Cloé', 'lastname'=>'Gates', 'id'=>19),
	array('firstname'=>'Sébastien', 'lastname'=>'Müller', 'id'=>20),
	array('firstname'=>'Paul', 'lastname'=>'Müller', 'id'=>21),
	array('firstname'=>'Steve', 'lastname'=>'Mermoz', 'id'=>22),
	array('firstname'=>'Matthias', 'lastname'=>'Meyer', 'id'=>23),
	array('firstname'=>'Steve', 'lastname'=>'Williams', 'id'=>24),
	array('firstname'=>'Steven', 'lastname'=>'Williams', 'id'=>25),
	array('firstname'=>'Inès', 'lastname'=>'Sabaka', 'id'=>26),
	array('firstname'=>'Steven', 'lastname'=>'Müller', 'id'=>27),
	array('firstname'=>'Sven', 'lastname'=>'Sabaka', 'id'=>28),
	array('firstname'=>'William', 'lastname'=>'Meyer', 'id'=>29),
	array('firstname'=>'Paul', 'lastname'=>'Meyer', 'id'=>30),
	array('firstname'=>'Sven', 'lastname'=>'Dupois', 'id'=>31),
	array('firstname'=>'Christophe', 'lastname'=>'Maier', 'id'=>32),
	array('firstname'=>'Cloé', 'lastname'=>'Charettes', 'id'=>33),
	array('firstname'=>'Tobie', 'lastname'=>'Meyrs', 'id'=>34),
	array('firstname'=>'Samuel', 'lastname'=>'Sabaka', 'id'=>35),
	array('firstname'=>'Cloé', 'lastname'=>'Williams', 'id'=>36),
	array('firstname'=>'Vincent', 'lastname'=>'Williams', 'id'=>37),
	array('firstname'=>'Matthias', 'lastname'=>'Miller', 'id'=>38),
	array('firstname'=>'Steve', 'lastname'=>'Miller', 'id'=>39),
	array('firstname'=>'Bill', 'lastname'=>'Maier', 'id'=>40),
	array('firstname'=>'Paul', 'lastname'=>'Meyer', 'id'=>41),
	array('firstname'=>'Steve', 'lastname'=>'Brönstrup', 'id'=>42),
	array('firstname'=>'Tobie', 'lastname'=>'Meyrs', 'id'=>43),
	array('firstname'=>'Steven', 'lastname'=>'Müller', 'id'=>44),
	array('firstname'=>'Matthias', 'lastname'=>'Dupois', 'id'=>45),
	array('firstname'=>'Mary', 'lastname'=>'Brönstrup', 'id'=>46),
	array('firstname'=>'William', 'lastname'=>'Miller', 'id'=>47),
	array('firstname'=>'Steven', 'lastname'=>'Williams', 'id'=>48),
	array('firstname'=>'Steven', 'lastname'=>'Meier', 'id'=>49),
	array('firstname'=>'William', 'lastname'=>'Mermoz', 'id'=>50),
	array('firstname'=>'Mary', 'lastname'=>'Maier', 'id'=>51),
	array('firstname'=>'Peter', 'lastname'=>'Charettes', 'id'=>52),
	array('firstname'=>'Paul', 'lastname'=>'Mermoz', 'id'=>53),
	array('firstname'=>'Tobie', 'lastname'=>'Dupois', 'id'=>54),
	array('firstname'=>'Steven', 'lastname'=>'Brönstrup', 'id'=>55),
	array('firstname'=>'Peter', 'lastname'=>'Miller', 'id'=>56),
	array('firstname'=>'Lo', 'lastname'=>'Sabaka', 'id'=>57),
	array('firstname'=>'Mary', 'lastname'=>'Mermoz', 'id'=>58),
	array('firstname'=>'Steve', 'lastname'=>'Brönstrup', 'id'=>59),
	array('firstname'=>'Simon', 'lastname'=>'Meyrs', 'id'=>60),
	array('firstname'=>'William', 'lastname'=>'Dupois', 'id'=>61),
	array('firstname'=>'Steve', 'lastname'=>'Müller', 'id'=>62),
	array('firstname'=>'Steven', 'lastname'=>'Gates', 'id'=>63),
	array('firstname'=>'Bill', 'lastname'=>'Meyer', 'id'=>64),
	array('firstname'=>'Lo', 'lastname'=>'Williams', 'id'=>65),
	array('firstname'=>'Bill', 'lastname'=>'Brönstrup', 'id'=>66),
	array('firstname'=>'Inès', 'lastname'=>'Brönstrup', 'id'=>67),
	array('firstname'=>'Vincent', 'lastname'=>'Miller', 'id'=>68),
	array('firstname'=>'Sébastien', 'lastname'=>'Jobs', 'id'=>69),
	array('firstname'=>'Bill', 'lastname'=>'Gruhier', 'id'=>70),
	array('firstname'=>'Lo', 'lastname'=>'Jobs', 'id'=>71),
	array('firstname'=>'Sven', 'lastname'=>'Meier', 'id'=>72),
	array('firstname'=>'Cloé', 'lastname'=>'Meyer', 'id'=>73),
	array('firstname'=>'Vincent', 'lastname'=>'Williams', 'id'=>74),
	array('firstname'=>'William', 'lastname'=>'Meier', 'id'=>75),
/*	array('firstname'=>'Samuel', 'lastname'=>'Maier', 'id'=>76),
	array('firstname'=>'Samuel', 'lastname'=>'Meyrs', 'id'=>77),
	array('firstname'=>'Tobie', 'lastname'=>'Müller', 'id'=>78),
	array('firstname'=>'Christophe', 'lastname'=>'Spasibo', 'id'=>79),
	array('firstname'=>'Mary', 'lastname'=>'Meier', 'id'=>80),
	array('firstname'=>'Lo', 'lastname'=>'Müller', 'id'=>81),
	array('firstname'=>'Inès', 'lastname'=>'Jobs', 'id'=>82),
	array('firstname'=>'Lo', 'lastname'=>'Jobs', 'id'=>83),
	array('firstname'=>'Bill', 'lastname'=>'Spasibo', 'id'=>84),
	array('firstname'=>'Tobie', 'lastname'=>'Williams', 'id'=>85),
	array('firstname'=>'Vincent', 'lastname'=>'Meyer', 'id'=>86),
	array('firstname'=>'Cloé', 'lastname'=>'Brönstrup', 'id'=>87),
	array('firstname'=>'Steve', 'lastname'=>'Miller', 'id'=>88),
	array('firstname'=>'Sébastien', 'lastname'=>'Miller', 'id'=>89),
	array('firstname'=>'Tobie', 'lastname'=>'Müller', 'id'=>90),
	array('firstname'=>'Simon', 'lastname'=>'Meyer', 'id'=>91),
	array('firstname'=>'Peter', 'lastname'=>'Williams', 'id'=>92),
	array('firstname'=>'Peter', 'lastname'=>'Brönstrup', 'id'=>93),
	array('firstname'=>'Vincent', 'lastname'=>'Dupois', 'id'=>94),
	array('firstname'=>'Paul', 'lastname'=>'Müller', 'id'=>95),
	array('firstname'=>'Inès', 'lastname'=>'Jobs', 'id'=>96),
	array('firstname'=>'Steve', 'lastname'=>'Sabaka', 'id'=>97),
	array('firstname'=>'Samuel', 'lastname'=>'Meyer', 'id'=>98),
	array('firstname'=>'Tobie', 'lastname'=>'Miller', 'id'=>99),
	array('firstname'=>'Christophe', 'lastname'=>'Sabaka', 'id'=>100),
	array('firstname'=>'Tobie', 'lastname'=>'Gruhier', 'id'=>101),
	array('firstname'=>'Paul', 'lastname'=>'Mermoz', 'id'=>102),
	array('firstname'=>'Christophe', 'lastname'=>'Gates', 'id'=>103),
	array('firstname'=>'Mary', 'lastname'=>'Meier', 'id'=>104),
	array('firstname'=>'Cloé', 'lastname'=>'Maier', 'id'=>105),
	array('firstname'=>'Sven', 'lastname'=>'Williams', 'id'=>106),
	array('firstname'=>'Bill', 'lastname'=>'Miller', 'id'=>107),
	array('firstname'=>'Bill', 'lastname'=>'Brönstrup', 'id'=>108),
	array('firstname'=>'Steve', 'lastname'=>'Williams', 'id'=>109),
	array('firstname'=>'William', 'lastname'=>'Maier', 'id'=>110),
	array('firstname'=>'Steve', 'lastname'=>'Meyer', 'id'=>111),
	array('firstname'=>'William', 'lastname'=>'Jobs', 'id'=>112),
	array('firstname'=>'Mary', 'lastname'=>'Spasibo', 'id'=>113),
	array('firstname'=>'Cloé', 'lastname'=>'Müller', 'id'=>114),
	array('firstname'=>'Matthias', 'lastname'=>'Sabaka', 'id'=>115),
	array('firstname'=>'Bill', 'lastname'=>'Spasibo', 'id'=>116),
	array('firstname'=>'Peter', 'lastname'=>'Brönstrup', 'id'=>117),
	array('firstname'=>'Lo', 'lastname'=>'Mermoz', 'id'=>118),
	array('firstname'=>'Matthias', 'lastname'=>'Sabaka', 'id'=>119),
	array('firstname'=>'Bill', 'lastname'=>'Spasibo', 'id'=>120),
	array('firstname'=>'Sven', 'lastname'=>'Meyrs', 'id'=>121),
	array('firstname'=>'Cloé', 'lastname'=>'Meyrs', 'id'=>122),
	array('firstname'=>'William', 'lastname'=>'Dupois', 'id'=>123),
	array('firstname'=>'Cloé', 'lastname'=>'Williams', 'id'=>124),
	array('firstname'=>'Steven', 'lastname'=>'Mermoz', 'id'=>125),
	array('firstname'=>'Vincent', 'lastname'=>'Gates', 'id'=>126),
	array('firstname'=>'Matthias', 'lastname'=>'Dupois', 'id'=>127),
	array('firstname'=>'Inès', 'lastname'=>'Charettes', 'id'=>128),
	array('firstname'=>'Steven', 'lastname'=>'Müller', 'id'=>129),
	array('firstname'=>'Paul', 'lastname'=>'Charettes', 'id'=>130),
	array('firstname'=>'Inès', 'lastname'=>'Sabaka', 'id'=>131),
	array('firstname'=>'William', 'lastname'=>'Mermoz', 'id'=>132),
	array('firstname'=>'Matthias', 'lastname'=>'Charettes', 'id'=>133),
	array('firstname'=>'Simon', 'lastname'=>'Jobs', 'id'=>134),
	array('firstname'=>'Vincent', 'lastname'=>'Meier', 'id'=>135),
	array('firstname'=>'Lo', 'lastname'=>'Brönstrup', 'id'=>136),
	array('firstname'=>'Simon', 'lastname'=>'Miller', 'id'=>137),
	array('firstname'=>'Cloé', 'lastname'=>'Charettes', 'id'=>138),
	array('firstname'=>'Steve', 'lastname'=>'Gruhier', 'id'=>139),
	array('firstname'=>'Sébastien', 'lastname'=>'Charettes', 'id'=>140),
	array('firstname'=>'Sébastien', 'lastname'=>'Miller', 'id'=>141),
	array('firstname'=>'Paul', 'lastname'=>'Gates', 'id'=>142),
	array('firstname'=>'Tobie', 'lastname'=>'Williams', 'id'=>143),
	array('firstname'=>'Matthias', 'lastname'=>'Spasibo', 'id'=>144),
	array('firstname'=>'Paul', 'lastname'=>'Müller', 'id'=>145),
	array('firstname'=>'Sven', 'lastname'=>'Brönstrup', 'id'=>146),
	array('firstname'=>'William', 'lastname'=>'Gruhier', 'id'=>147),
	array('firstname'=>'Mary', 'lastname'=>'Gates', 'id'=>148),
	array('firstname'=>'Cloé', 'lastname'=>'Müller', 'id'=>149),
	array('firstname'=>'Paul', 'lastname'=>'Meyrs', 'id'=>150),
	array('firstname'=>'Tobie', 'lastname'=>'Dupois', 'id'=>151),
	array('firstname'=>'Lo', 'lastname'=>'Miller', 'id'=>152),
	array('firstname'=>'Sven', 'lastname'=>'Sabaka', 'id'=>153),
	array('firstname'=>'Bill', 'lastname'=>'Dupois', 'id'=>154),
	array('firstname'=>'Steve', 'lastname'=>'Spasibo', 'id'=>155),
	array('firstname'=>'Sven', 'lastname'=>'Gates', 'id'=>156),
	array('firstname'=>'Mary', 'lastname'=>'Miller', 'id'=>157),
	array('firstname'=>'Inès', 'lastname'=>'Mermoz', 'id'=>158),
	array('firstname'=>'Samuel', 'lastname'=>'Gates', 'id'=>159),
	array('firstname'=>'Christophe', 'lastname'=>'Meyer', 'id'=>160),
	array('firstname'=>'William', 'lastname'=>'Maier', 'id'=>161),
	array('firstname'=>'Cloé', 'lastname'=>'Mermoz', 'id'=>162),
	array('firstname'=>'Lo', 'lastname'=>'Meyrs', 'id'=>163),
	array('firstname'=>'Peter', 'lastname'=>'Müller', 'id'=>164),
	array('firstname'=>'Cloé', 'lastname'=>'Miller', 'id'=>165),
	array('firstname'=>'Sébastien', 'lastname'=>'Müller', 'id'=>166),
	array('firstname'=>'Steven', 'lastname'=>'Gruhier', 'id'=>167),
	array('firstname'=>'Inès', 'lastname'=>'Meier', 'id'=>168),
	array('firstname'=>'Cloé', 'lastname'=>'Dupois', 'id'=>169),
	array('firstname'=>'Inès', 'lastname'=>'Meyer', 'id'=>170),
	array('firstname'=>'Simon', 'lastname'=>'Maier', 'id'=>171),
	array('firstname'=>'William', 'lastname'=>'Gruhier', 'id'=>172),
	array('firstname'=>'Peter', 'lastname'=>'Mermoz', 'id'=>173),
	array('firstname'=>'Vincent', 'lastname'=>'Mermoz', 'id'=>174),
	array('firstname'=>'Inès', 'lastname'=>'Jobs', 'id'=>175),
	array('firstname'=>'Inès', 'lastname'=>'Williams', 'id'=>176),
	array('firstname'=>'Vincent', 'lastname'=>'Maier', 'id'=>177),
	array('firstname'=>'Steven', 'lastname'=>'Miller', 'id'=>178),
	array('firstname'=>'Tobie', 'lastname'=>'Spasibo', 'id'=>179),
	array('firstname'=>'Steven', 'lastname'=>'Brönstrup', 'id'=>180),
	array('firstname'=>'Matthias', 'lastname'=>'Meyer', 'id'=>181),
	array('firstname'=>'Sven', 'lastname'=>'Mermoz', 'id'=>182),
	array('firstname'=>'Inès', 'lastname'=>'Spasibo', 'id'=>183),
	array('firstname'=>'Steven', 'lastname'=>'Maier', 'id'=>184),
	array('firstname'=>'Peter', 'lastname'=>'Charettes', 'id'=>185),
	array('firstname'=>'Samuel', 'lastname'=>'Williams', 'id'=>186),
	array('firstname'=>'Simon', 'lastname'=>'Sabaka', 'id'=>187),
	array('firstname'=>'Christophe', 'lastname'=>'Mermoz', 'id'=>188),
	array('firstname'=>'Matthias', 'lastname'=>'Spasibo', 'id'=>189),
	array('firstname'=>'Sébastien', 'lastname'=>'Gruhier', 'id'=>190),
	array('firstname'=>'Vincent', 'lastname'=>'Meier', 'id'=>191),
	array('firstname'=>'Steven', 'lastname'=>'Brönstrup', 'id'=>192),
	array('firstname'=>'Peter', 'lastname'=>'Williams', 'id'=>193),
	array('firstname'=>'Sven', 'lastname'=>'Jobs', 'id'=>194),
	array('firstname'=>'Simon', 'lastname'=>'Gruhier', 'id'=>195)*/
);
	
function order($a,$b){

	if($a[$_POST['sortColumn']]<$b[$_POST['sortColumn']])
		$comp=-1;
	elseif($a[$_POST['sortColumn']]>$b[$_POST['sortColumn']])
		$comp=1;
	else
		$comp=0;
		
	if($_POST['sortOrder']=='desc')
		return 0-$comp;
	else
		return $comp;
}	

usort($items,"order");
$i=$first;
	
while($i<$first+$perpage && isset($items[$i]))
{
	echo "{firstname:'".$items[$i]['firstname']."', lastname:'".$items[$i]['lastname']."', id:".$items[$i]['id']."}".(($i+1)<$first+$perpage?',':'')."\n";
	$i++;
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