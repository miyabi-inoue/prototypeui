UI.Widget.Selection = Class.create(UI.Widget.Generic, {
  select_options: {
    className: 'UI-widget-selection',
    hideInput: true,
    placeDropdown: 'over',
    options: []
  },
  initialize: function($super, input, options){
    this.setOptions(this.select_options);
    $super(input, options);
  },
  
  buildFromSelect: function(){
    var options = this.input.descendants('option');
    this.value = 0;
    this.width = this.input.getWidth();
    
    this.options.options = new Array();
    
    for (var i = 0; i < options.length; i++) {
      if (options[i].firstChild) 
        this.options.options.push({
          value: options[i].value,
          title: options[i].firstChild.data
        });
      else 
        this.options.options.push({
          title: options[i].value
        });
    }
  },
  build: function(){
    if (this.input.nodeName == 'SELECT') 
      this.buildFromSelect();
    
    this.optionsEl = new Element('ul');
    
    this.options.options.each(function(option){
      var value = option.value || option.title;
      
      var item = new Element('li', {
        className: option.className || ''
      }).insert(new Element('span').insert(option.title));
      item.data = option;
      
      if (value == this.input.value) {
        item.addClassName('selected');
        this.output.update(option.title);
      }
      
      //item.observe('click', this.select.bind(this));
      
      this.optionsEl.insert(item);
    }
.bind(this));
    
    this.optionsEl.observe('click', this.select.bind(this));
    this.pulldown.insert(this.optionsEl);
  },
  
  select: function(event){
    event.stop();
    var item = event.element();
    if (item.tagName != 'LI') 
      item = item.up('li');
    
    if (!item) 
      return;
    
    this.output.update(item.data.title);
    this.input.value = item.data.value || item.data.title;
    this.pulldown.element.down('.selected').removeClassName('selected');
    item.addClassName('selected');
    this.pulldown.hide();
  }
});
