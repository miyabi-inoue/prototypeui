UI.DataGrid = Class.create(UI.Options, {
	options:
	{
		theme: '',
		height: 200,
		id: null,
		overlayOpacity: 0.5,
    rowsEvents: []
	},
	
	initialize: function(columns, options)
	{
		this.setOptions(options);
		this.optionsGetter();
		this.columns = [];
		this.rows = [];
		this.create();
		$A(columns).each(this.addColumn.bind(this));
    this.optionsGetter('height', 'theme');
	},
	
	addColumn: function(options)
	{
		var column = new UI.DataGridColumn(this, options);
		this.columns.push(column);
		$(this.thead.rows[0]).insert(column).insert(column.resizer);
		this.fire('columnadded', {column:column});
		return this;
	},
	
	getColumn: function(index)
	{
		if (Object.isNumber(index)) return this.columns[index];
		var method = Object.isElement(index) ? 'toElement' : 'getKey';
		return $A(this.columns).find(function(column){
			return column[method]() == index;
		});
	},
	
	getRow: function(index)
	{
		var method = Object.isElement(index) ? 'toElement' : 'getId';
		return $A(this.rows).find(function(entry){
			return entry[method]() == index;
		});
	},
	
	addRow: function(data)
	{
    var row = new UI.DataGridRow(this, data);
    this.rows.push(row);
    $(this.tbody.tBodies[0]).insert(row);
    this.columns.each(row.displayColumn.bind(row));
    return this;
	},
  
  expandThemeToClassName: function(theme) {
    return (theme?theme+'_ui_datagrid':'');
  },
  
	setTheme: function(theme) {
    var old=this.getTheme();
    this.options.theme = theme;
    if(old)
      this.element.removeClassName(this.expandThemeToClassName(old));
    if(this.options.theme && this.element)
      this.element.addClassName(this.expandThemeToClassName(this.options.theme));
    return this;
	},
        
	setHeight: function(height)
	{
    this.options.height = (this.body.getHeight() + height - this.viewport.getHeight());
		this.body.style.height = this.options.height + 'px';
		return this;
	},
	
	toElement: function()
	{
	  return this.element;
	},
	
	sort: function(index)
	{
		var column = this.getColumn(index), tbody = $(this.tbody.tBodies[0]), order;
		
		if (this.sortColumn != column)
		{
			var sortMethod = UI.DataGrid.sortMethod[column.getSort()], flaggedRows = [], cellIndex = column.getIndex();
      if(this.sortColumn)
        this.sortColumn.element.removeClassName('active');

			$A(tbody.rows).each(function(row){
				flaggedRows.push([UI.DataGrid.getSortText(row.cells[cellIndex]), row]);
			});
      
			flaggedRows.sort(sortMethod);
      
			$A(flaggedRows).each(function(row){
				tbody.insert(row[1]);
			});
      
			order = 'asc';
			this.sortColumn = column;
		}
		else
		{
			//We reverse column order
			if (tbody.rows.length > 1)
			{
				for (var i = tbody.rows.length - 2; i >= 0; i--)
				{
					tbody.insert(tbody.rows[i]);
				}	
			}
			order = this.sortDisplay.className == 'sortasc' ? 'desc' : 'asc';
		}
		
		this.sortDisplay.className = "sort" + order;
    column.element.addClassName('active');
		column.element.firstDescendant().insert(this.sortDisplay);
		
		this.fire('sort', {column:column, order:order});
		
		return this;
	},
	
  fire: function(eventName, memo)
  {
    memo = memo || {};
    memo.datagrid = this;
    return this.element.fire('datagrid:' + eventName, memo);
  },
	
	observe: function(eventName, handler)
	{
		if (eventName)
		{
			var bodyEvent = eventName.split('_')[1];
                }
                this.element.observe('datagrid:' + eventName, handler.bind(this));
                return this;
  	},
	
	create: function()
	{
		// Main Div
		this.element = new Element('div', {className: 'ui-datagrid ' + this.expandThemeToClassName(this.getTheme())});
		
		// Container
		this.viewport = new Element('div', {className: 'viewport'})
		.insert(
			// Header
			this.head = new Element('div', {className: 'head'})
			.insert(
				this.thead = new Element('table').insert(new Element('tbody').insert(new Element('tr')))
			)
		)
		.insert(
			// Body
			this.body = new Element('div', {className: 'body'})
			.insert(
				this.tbody = new Element('table')
					.insert(new Element('tbody'))
			)
		);
    
    this.setHeight(this.options.height);
		
    if (this.options.rowsEvents.length)
      this.enableRowsEvents(this.options.rowsEvents);
    
		// Scrolls the head based on body scrollOffset
		this.body.observe('scroll', this._fixHeadPosition.bind(this));
		
		this.sortDisplay = new Element('span');
		
		this.element.insert(this.viewport);
	},
	
	getScrollbarHeight: function()
	{
		if (this.body.scrollWidth > this.body.clientWidth)
		{
			if (Prototype.Browser.Gecko) return 18;
			if (Prototype.Browser.WebKit) return 17;
			if (Prototype.Browser.IE) return 17;
		}
		return 0;
	},
	
  overlay: function(visible, className)
	{
		if (!this.overlayDisplay) this.viewport.insert(this.overlayDisplay = new Element('div'));
		this.overlayDisplay.setStyle({
			display: visible ? 'block' : 'none'
		}).className = 'overlay ' + (className || '');
		if (Prototype.Browser.IE6)
		{
			this.overlayDisplay.setStyle({
				width: this.element.getWidth() + 'px',
				height: this.element.getHeight() + 'px'
			});
		}
	},
      
  enableRowsEvents: function(events)
  {
    var datagrid = this, handler = this._rowsEventHandler.bindAsEventListener(this);
    $A(events).each(function(name){
      datagrid.body.observe(name, handler);
    });
  }, 
        
	//PRIVATE
	_fixHeadPosition: function()
	{
		this.thead.style.marginLeft = '-' + this.body.cumulativeScrollOffset().left + 'px';
	},
  
  
  _rowsEventHandler: function(event)
  {
    var row = event.findElement('tr');
    if (row)
    {
      this.fire('row:' + event.type, {
        mouseEvent: event,
        row: row
      });
    }
  }
  
});
