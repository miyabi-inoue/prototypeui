UI.Progress = Class.create(UI.Options, {
  options: {
    width: 400,
    theme: '',
    maxValue: 100,
    onUpdate: false
  },
  initialize: function(element, options){
    this.element = $(element);
    this.setOptions(options);
    this.pane = new Element('div', {
      className: 'pane',
      style: 'width:' + this.options.width + 'px'
    });
    this.bar = new Element('div', {
      className: 'bar working',
      style: 'width:' + this.options.width + 'px'
    });
    this.pane.insert(this.bar);
    this.element.insert(new Element('div', {
      className: 'ui_progress ' + (this.options.theme?' '+this.options.theme+'_ui_progress':'')
    }).insert(this.pane));
    this.value = '';
  },
  setValue: function(v){
    if (v < 0) {
      this.bar.style.width = this.options.width + 'px';
      this.bar.addClassName('working');
      this.value = '';
    }
    else {
      if (this.bar.hasClassName('working')) 
        this.bar.removeClassName('working');
      if (v > this.options.maxValue) 
        v = this.options.maxValue;
      var width = parseInt(this.options.width * v / this.options.maxValue);
      this.bar.style.width = width + 'px';
      this.value = v;
    }
    
    if (this.options.onUpdate) 
      this.options.onUpdate(this);
    
    return this;
  }
});
