UI.DataGridColumn = Class.create(UI.Options, {
	
	options: {
		width: 80,
		key:'',
		header: '',
		sort: 'alpha',
		sortable: true,
		visible:true,
		resizeable:true,
		moveable:true
	},
	
	initialize:function(dataGrid, options)
	{
		this.dataGrid = dataGrid;
		this.setOptions(options);
		if (!UI.DataGrid.sortMethod[this.options.sortMode]) this.options.sortMode = 'alpha';
		this.optionsGetter('width', 'key', 'sort', 'header', 'resizeable', 'visible');
		this.create();
	},
	
	create: function()
	{
		this.element = new Element('th')
			.setStyle({width:this.getWidth()+'px', display:this.options.visible ? '': 'none'})
			.insert(
				this.header = new Element('div', {className:'header'})
				.update(this.getHeader())
				.setStyle({width:this.getWidth()+'px'})
			);
			
		this.resizer = new Element('th', {className:'resizer'})
			.setStyle({display:this.options.visible ? '': 'none'})
			.insert(new Element('div', {className:'resizer'}));
			
		this.dataGrid.rows.invoke('displayColumn', this);
		
		if (this.options.resizeable)
		{
			this.resizer.addClassName('enabled');
			this.resizer.enableDrag();
			this.resizer.observe('drag:started', this._startResize.bindAsEventListener(this));
			this.resizer.observe('drag:updated',  this._dragResize.bindAsEventListener(this));
			this.resizer.observe('drag:ended',  this._endResize.bindAsEventListener(this));
		}
		
		if (this.options.moveable)
		{
			this.element.enableDrag();
			this.element.observe('drag:started', this._startMove.bindAsEventListener(this));
			this.element.observe('drag:updated',  this._dragMove.bindAsEventListener(this));
			this.element.observe('drag:ended',  this._endMove.bindAsEventListener(this));
		}
		
		if (this.options.sortable)
		{
			this.element.observe('mouseup', (function(){
				if (!this._moving)this.dataGrid.sort(this.getIndex())
			}).bind(this)
			);
		}
	},
	
	show: function()
	{
		this.getCells(true).invoke('show');
		this.resizer.show();
		this.dataGrid.fire('column:shown', {column:this});
    this.options.visible = true;
		return this;
	},
	
	hide: function()
	{
		this.getCells(true).invoke('hide');
		this.resizer.hide();
		this.dataGrid.fire('column:hidden', {column:this});
    this.options.visible = false;
		return this;
	},
	
	getCells: function(header)
	{
		var cells = [], columnIndex = this.getIndex();
		this.dataGrid.rows.each(function(entry){
			cells.push(entry.getCell(columnIndex));
		});
		if (header) cells.push(this.element);
		return cells;
	},
	
	setWidth: function(width)
	{
		if (width < 1) width = 1;
		this.options.width = width;
		width += 'px';
		this.getCells(true).each(function(cell){
			cell.style.width = width;
			cell.firstDescendant().style.width = width;
		});
		return this;
	},
	
	getIndex: function()
	{
		return this.element.cellIndex / 2;
	},
	
	setIndex: function(index)
	{
		index < 0 ? index = 0 : index >= this.dataGrid.columns.length ? index =  this.dataGrid.columns.length - 1 : index;
		if (index == this.getIndex()) return;
		
		var reference = this.dataGrid.getColumn(index);
		var actualIndex = this.getIndex();
		
		if (actualIndex > index)
		{
			reference.element.insert({before:this.element});
			var moveCell = function(entry){entry.getCell(index).insert({before:entry.getCell(actualIndex)})};
		}
		else
		{
			reference.resizer.insert({after:this.element});
			var moveCell = function(entry){entry.getCell(index).insert({after:entry.getCell(actualIndex)})};
		}
		
		this.element.insert({after:this.resizer});
		
		$A(this.dataGrid.rows).each(moveCell);
		
		this.dataGrid.columns.sort(function(a, b){
			var ai = a.getIndex(), bi = b.getIndex();
			if (ai == bi) return 0;
			if (ai < bi) return -1;
			return 1;
		});
		
		return this;
	},
	
	setHeader: function(header)
	{
		this.header.update(header);
		this.options.header = header;
		return this;
	},
	
	toElement: function()
	{
		return this.element;
	},
	
	destroy: function()
	{
		this.getCells(true).invoke('remove');
		this.resizer.remove();
		this.dataGrid.columns = this.dataGrid.columns.without(this);
		this.dataGrid.fire('column:destroyed', {column:this});
		delete this;
	},
	
	_startResize: function(event)
	{
		if (!this.dataGrid.resizeDisplay)
		{
			this.dataGrid.viewport.insert(this.dataGrid.resizeDisplay = new Element("div", {className: 'resize_display'}));
			this.dataGrid.viewport.insert(this.dataGrid.resizeHover = new Element("div", {className: 'resize_hover'}));
		}
		
		var height = (this.dataGrid.viewport.getHeight() - this.dataGrid.getScrollbarHeight()) + 'px';
			
		this.dataGrid.resizeDisplay.setStyle({
			display:'block',
			height:height,
			left:event.element().positionedOffset().left+'px'
		});
		
		this.dataGrid.resizeHover.setStyle({
			display:'block',
			height:height,
			left:this.element.positionedOffset().left + 'px',
			width:this.element.getWidth() + 'px'
		});
		
		document.body.style.cursor = 'col-resize';
		this.dataGrid.overlay(true);
	},
	
	_dragResize: function(event)
	{
		var position = event.element().positionedOffset().left + event.memo.dx;
		var offset = this.element.positionedOffset().left;
		
		if (position > offset)
		{
			this.dataGrid.resizeDisplay.style.left = position + 'px';
			this.dataGrid.resizeHover.style.width = (this.element.getWidth() + event.memo.dx) + 'px';
		}
		else
		{
			this.dataGrid.resizeDisplay.style.left = offset + 'px';
			this.dataGrid.resizeHover.style.width = '0px';
		}
	},
	
	_endResize: function(event)
	{
    event.memo.mouseEvent.stop();
		document.body.style.cursor = '';
		
		this.dataGrid.resizeDisplay.hide();
		this.dataGrid.resizeHover.hide();
		
    //Fix an opera rendering bug
    if (Prototype.Browser.Opera) this.dataGrid.element.hide();
    
		this.setWidth(this.options.width + event.memo.dx);
    
		//Fix an opera rendering bug
    if (Prototype.Browser.Opera) this.dataGrid.element.show();
      
		if (Prototype.Browser.IE) this.dataGrid._fixHeadPosition();
    
		this.dataGrid.overlay(false);
	},
	
	_startMove: function(event)
	{
		if (!this.moveClone)
		{
			this.dataGrid.viewport.insert(this.moveClone = new Element('div', {className:'move_clone header'}));
			this.dataGrid.viewport.insert(this.movePreview = new Element('div', {className:'move_preview'}));
		}
		
		this.moveClone.setStyle({
      position:'absolute',
			display: 'block',
			left:this.element.positionedOffset().left + 'px',
			width:this.getWidth() + 'px',
			top:this.element.getHeight() + 'px'
		}).update(this.header.innerHTML);
		
		this.dataGrid.overlay(true);
		this._moving = true;
	},
	
	_dragMove: function(event)
	{
		var relativePointerX = event.memo.mouseEvent.pointerX() - this.element.parentNode.cumulativeOffset().left - this.dataGrid.body.scrollLeft;
			this.moveClone.style.left = (relativePointerX > 0 ? relativePointerX : 0) + 'px';
			
		if (this.dataGrid.getScrollbarHeight() > 0)
		{
			this.dataGrid.body.scrollLeft += event.memo.dx;	
		}
			
		var hover = $A(this.dataGrid.columns).find(function(column){
			return relativePointerX <= (column.resizer.positionedOffset().left - column.element.getWidth()/2);
		});
		
		if (!hover)
		{
			if (this != this.dataGrid.columns.last())
			{
					var resizer = this.dataGrid.columns.last().resizer;
					this.movePreview.setStyle({
					left: (resizer.positionedOffset().left + resizer.getWidth() - this.movePreview.getWidth() / 2) + 'px',
					display: 'block'
				});
			}
			return;
		}
		else if (hover != this && hover.getIndex() - 1 != this.getIndex())
		{
			this.movePreview.setStyle({
				left: (hover.element.positionedOffset().left - this.movePreview.getWidth() / 2) + 'px',
				display: 'block'
			});
		}
		else
		{
			this.movePreview.hide();
		}
	},
	
	_endMove: function(event)
	{
		this.moveClone.hide();
		this.movePreview.hide();
		this.dataGrid.overlay(false);
		this._moving = false;
		
		var relativePointerX = event.memo.mouseEvent.pointerX() - this.element.parentNode.cumulativeOffset().left - this.dataGrid.body.scrollLeft;
		
		var hover = $A(this.dataGrid.columns).find(function(column){
			return relativePointerX <= (column.resizer.positionedOffset().left - column.element.getWidth()/2);
		});
    
    if (Prototype.Browser.Opera) this.dataGrid.element.hide();
    
		if (!hover)
		{
			if (this != this.dataGrid.columns.last()) this.setIndex(this.dataGrid.columns.length - 1);
		}
		else if (hover != this && hover.getIndex() - 1 != this.getIndex())
		{
			var index = hover.getIndex();
			this.setIndex(index > this.getIndex() ? index - 1 : index);
		}
		
    if (Prototype.Browser.Opera) this.dataGrid.element.show();
    
		else if (Prototype.Browser.IE) this.dataGrid._fixHeadPosition();
	}
});
