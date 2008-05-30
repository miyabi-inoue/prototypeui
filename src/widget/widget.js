UI.Widget = {
  options: {}
}

UI.Widget.Generic = Class.create(UI.Options, {
  options: {
    className: '',
    hideInput: false,
    placeDropdown: 'below',
    emptyText: '---',
    beforeShow: null,
    afterShow: null,
    beforeUpdate: null,
    afterUpdate: null,
    afterCreate: null
  },
  input: null,
  pulldown: null,
  active: false,
  initialize: function(input, options){
    this.setOptions(UI.Widget.options);
    this.setOptions(options);
    this.input = $(input);
    
    this.output = new Element('span', {
      className: 'UI-widget-c'
    });
    
    this.container = new Element('span', {
      className: 'UI-widget ' + this.options.className + ' ' + this.options.theme
    }).insert(new Element('span', {
      className: 'UI-widget-w'
    })).insert(this.output).insert(new Element('span', {
      className: 'UI-widget-e'
    }));
    
    this.container.onclick = this.show.bindAsEventListener(this);
    this.input.insert({
      after: this.container
    });
    
    this.pulldown = new UI.PullDown(this.container, {
      className: this.options.theme + ' ' + this.options.className,
      shadow: this.options.shadow,
      position: this.options.placeDropdown,
      cloneWidth: false
    });
    
    this.build();
    
    if (this.options.hideInput) {
      this.container.addClassName('UI-widget-hidden-input');
      
      this.anchor = this.control;
      
      if (!this.output.innerHTML) 
        this.output.update(this.input.value || this.options.emptyText);
      
      input = new Element('input', {
        type: 'hidden',
        name: this.input.name,
        value: this.input.getValue()
      });
      this.container.insert({
        after: input
      });
      Element.remove(this.input);
      this.input = input;
    }
    else {
      Element.remove(this.input);
      this.output.insert({
        before: this.input
      });
    }
  },
  dispose: function(){
    this.pulldown = null;
  },
  
  show: function(){
    this.refresh();
    this.pulldown.place().show();
  },
  
  build: function(event){
    alert('This is a static function; build() has to be filled for widgets');
  },
  refresh: function(){
  
  },
  update: function(value, options){
    options = Object.extend({
      pullup: true
    }, options ||
    {});
    this.input.value = value;
    if (this.options.hideInput) 
      this.output.update(this.input.value || this.options.emptyText);
    if (options.pullup) 
      this.pulldown.hide();
  }
  
  
});
