UI.DataGridRow = Class.create(Hash, {

	initialize: function($super, dataGrid, data)
	{
		this.dataGrid = dataGrid;
		$super(data);
		this.create();
	},
	
	create: function()
	{
		this.element = new Element('tr').insert(
			this.fit = new Element('td', {className:'fit'})
			.insert(new Element('div', {className:'entry'})
					.update('&nbsp;')
				)	
		);
	},
	
	displayColumn: function(column)
	{
		this.fit.insert({before:new Element('td')
				.setStyle({width:column.getWidth()+'px', display:column.getVisible() ? '': 'none'})
				.insert(
					new Element('div', {className:'entry'})
					.setStyle({width:column.getWidth()+'px'})
					.update(this.get(column.getKey()))
				)});
	},
	
  set: function(key, value)
  {
    var update = {};
    update[key] = value;
    this.update(update);
    return this;
  },
  
	update: function($super, data)
	{
		$H(data).each(function(pair){
			var cell = this.getCell(pair.key);
			if (cell) cell.firstDescendant().update(pair.value);
		});
		$super(data);
		this.dataGrid.fire('row:update', {entry:this, update:data});
		return this;
	},
	
	focus: function()
	{
		this.dataGrid.body.scrollTop = this.element.positionedOffset().top - this.element.getHeight();
		return this;
	},
	
	getCell: function(index)
	{
		if (Object.isNumber(index)) return this.element.cells[index];
		var column = this.dataGrid.getColumn(index);
		if (column) return this.element.cells[column.getIndex()];
	},
	
  destroy : function()
  {
    this.element.remove();
    this.dataGrid.rows = this.dataGrid.rows.without(this);
    this.dataGrid.fire('row:destroyed', {row:this});
  },
  
	toElement: function()
	{
		return this.element;
	}
});
