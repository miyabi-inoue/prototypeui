UI.AjaxDataGrid = Class.create(UI.DataGrid, {
  ajax_options: {
    url: '',
    first: 0,
    perPage: -1
  },
  
  initialize: function($super, columns, ajax_options, options) {
    $super(columns, options);
    Object.extend(this.ajax_options, ajax_options || {});
    
    this.sortColumn=this.getColumn(columns[0].key);
    this.sortOrder='asc';
    
    this.load();
  },
  
  unload: function() {
    this.scroller.destroy();
    this.tbody = new Element('table')
          .insert(new Element('tbody'))   
    this.body.update(this.tbody);
    this.rows = [];
  },
  
  load: function() {
    this.ajax_options.loadFunction=function(transport){
        $A(transport.responseText.evalJSON()).each(this.addRow.bind(this));
      }.bind(this)
      
    this.ajax_options.parameters = this.ajax_options.parameters || {};
    this.ajax_options.parameters.sortColumn=this.sortColumn.options.key;
    this.ajax_options.parameters.sortOrder=this.sortOrder || 'asc';
    
    
    this.scroller=new UI.Scroller(this.body, this.ajax_options.url, this.ajax_options);    
  },
  
  sort: function(index) {
    var column = this.getColumn(index), tbody = $(this.tbody.tBodies[0]), order;
    
    if (this.sortColumn != column)
    {    
      if(this.sortColumn)
        this.sortColumn.element.removeClassName('active');
      this.sortOrder = 'asc';
      this.sortColumn = column;
    }
    else
    {
      this.sortOrder = this.sortDisplay.className == 'sortasc' ? 'desc' : 'asc';
    }
    
    this.unload();
    this.load();
    
    this.sortDisplay.className = "sort" + this.sortOrder;
    column.element.addClassName('active');
    column.element.firstDescendant().insert(this.sortDisplay);
    
    this.fire('sort', {column:this.sortColumn, order:this.sortOrder});
    
    return this;
  }
});