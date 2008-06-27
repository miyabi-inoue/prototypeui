<?php 
if(isset($_POST['first']))
	$first=intval($_POST['first']);
else
	$first=0;
if(isset($_POST['perpage']))
	$perpage=intval($_POST['perpage']);
else
	$perpage=30;

for($i=$first;$i<$first+$perpage;$i++)
{
	echo sprintf("Test payload %0004.0f <br/>\n",$i+1);
}

if(false) {
?>
Test payload 01<br/>
Test payload 02<br/>
Test payload 03<br/>

<?php
}
?>