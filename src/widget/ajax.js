UI.Widget.Ajax = Class.create(UI.Widget.Generic, {
  color_options: {
    className: 'ui_ajax_widget',
    src: false,
    onComplete: false
  },
  initialize: function($super, input, options){
    this.setOptions(this.ajax_options);
    $super(input, options);
  },
  
  refresh: function(){
    new Ajax.Updater(this.pulldown.element, this.options.src, {
      parameters: {
        value: this.input.value
      },
      onComplete: this.completed.bindAsEventListener(this),
      evalScripts: true
    });
  },
  
  completed: function(){
    this.pulldown.place();
    
    if (this.options.onComplete) 
      this.options.onComplete();
  },
  
  build: function(){
    this.pulldown.element.widget = this;
  }
});
