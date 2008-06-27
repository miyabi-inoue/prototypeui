UI.DataGrid.sort = function(tbody, index, type)
{
	tbody = $(tbody);
	var flaggedRows = [];
	$A(tbody.rows).each(function(row){
		flaggedRows.push([UI.DataGrid.getSortText(row.cell[index]), row]);
	});
	flaggedRows.sort(type);
	$A(flaggedRows).each(function(row){
		tbody.insert(row[1]);
	});
}

UI.DataGrid.reverse = function(tbody)
{
	if (tbody.rows.length == 1) return;
	tbody = $(tbody);
	for (var i = tbody.rows.length - 2; i >= 0; i--)
	{
		tbody.insert(tbody.rows[i]);
	}
}

UI.DataGrid.getSortText = function(element)
{
	var node = element.firstDescendant();
	if (node.empty()) return '';
	var hasInputs = node.select('input').length;
	
	if (node.innerHTML && !hasInputs)
	{
		return node.innerHTML.replace(/^\s+|\s+$/g, '');
	}
	else
	{
		switch (node.nodeType)
		{
			case 4:
				return node.nodeValue.replace(/^\s+|\s+$/g, '');
			case 1:
			case 11:
				var innerText = '';
				node.childElements().each(function(elm){
					innerText += UI.DataGrid.getSortText(elm)
				});
				return innerText.replace(/^\s+|\s+$/g, '');
			case 3:
				if (node.getValue) return node.getValue();
				if (node.tagName.toLowerCase() == 'img') return (node.alt | node.title); 
			default:
				return '';
		}
	}
}

UI.DataGrid.sortReg = {
	date: /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/,
	time: /^([0]?[1-9]|1[\d]|2[0-3])[\s]?[\:h][\s]?([0-5]\d)?$/,
	datetimeSplit: /[\;\,][\s]?/
}
UI.DataGrid.sortMethod = {
	alpha:function(a, b)
	{
		if (a[0] == b[0]) return 0;
		if (a[0] < b[0]) return -1;
		return 1;
	},
	
	numeric:function(a,b)
	{
		var aa = parseFloat(a[0].replace(/[^0-9.-]/g,''));
		var bb = parseFloat(b[0].replace(/[^0-9.-]/g,'')); 
		if (isNaN(aa)) aa = 0;
		if (isNaN(bb)) bb = 0;
		return aa-bb;
	},
	
	date: function(a, b)
	{
		var mtch = a[0].match(UI.DataGrid.sortReg.date);
		if (!mtch) return 0;
		var y = mtch[3], d = mtch[2], m = mtch[1];
		if (m.length == 1) m = '0'+m;
		if (d.length == 1) d = '0'+d;
		var dt1 = y+m+d;
		var mtch = b[0].match(UI.DataGrid.sortReg.date);
		if (!mtch) return 1;
		var y = mtch[3], d = mtch[2], m = mtch[1];
		if (m.length == 1) m = '0'+m;
		if (d.length == 1) d = '0'+d;
		var dt2 = y+m+d;
		if (dt1==dt2) return 0;
		if (dt1<dt2) return -1;
		return 1;
	},
	
	time: function(a, b)
	{
                var mtch = a[0].match(UI.DataGrid.sortReg.time);
		var t1 = mtch.join('');
		var mtch = b[0].match(UI.DataGrid.sortReg.time);
		var t2 = mtch.join('');
		if (t1==t2) return 0;
                if (t1<t2) return -1;
                return 1;
	},
	
	datetime: function(a, b)
	{
		var dtt1 = a[0].split(UI.DataGrid.sortReg.datetimeSplit);
		var dtt2 = b[0].split(UI.DataGrid.sortReg.datetimeSplit);
		var dateSort = UI.DataGrid.sortReg.date(dtt1[0], dtt2[0]);
		if (dateSort !== 0)
			return dateSort;
		else
			return UI.DataGrid.sortReg.time(dtt1[1], dtt2[1]);
	}
};
