UI.Widget.Color = Class.create(UI.Widget.Generic, {
  color_options: {
    className: 'UI-widget-color',
    trackWidth: 170,
    mode: 'rgb',
    value: 'dec',
    defaultColorText: 'Default Color',
    allowUnset: false,
    unsetValue: -1
  },
  initialize: function($super, input, options){
    this.setOptions(this.color_options);
    $super(input, options);
    this.setColorByInput();
  },
  
  build: function(){
    trackRed = new Element('div', {
      style: 'width:' + this.options.trackWidth + 'px;background:#f00',
      className: 'track'
    });
    sliderRed = new Element('div', {
      style: 'cursor:move',
      className: 'slider'
    });
    trackGreen = new Element('div', {
      style: 'width:' + this.options.trackWidth + 'px;background:#0f0',
      className: 'track'
    });
    sliderGreen = new Element('div', {
      style: 'cursor:move',
      className: 'slider'
    });
    trackBlue = new Element('div', {
      style: 'width:' + this.options.trackWidth + 'px;background:#00f',
      className: 'track'
    });
    sliderBlue = new Element('div', {
      style: 'cursor:move',
      className: 'slider'
    });
    
    trackRed.colorWidget = this;
    trackGreen.colorWidget = this;
    trackBlue.colorWidget = this;
    
    this.color = new Element('div', {
      className: 'UI-widget-color-view'
    });
    
    this.pulldown.insert(this.color).insert(trackRed).insert(sliderRed).insert(trackGreen).insert(sliderGreen).insert(trackBlue).insert(sliderBlue);
    
    if (this.options.allowUnset) {
      unsetter_string = new Element('label').insert(this.options.defaultColorText);
      this.unsetter = new Element('input', {
        type: 'checkbox',
        checked: (this.input.value == '')
      });
      
      this.unsetter.observe('click', this.unset.bindAsEventListener(this));
      unsetter_string.observe('click', this.unset.bindAsEventListener(this));
      this.pulldown.insert(this.unsetter).insert(unsetter_string);
    }
    
    values = this.parseRGB(this.input.value);
    
    this.sliderRed = new Control.Slider(sliderRed, trackRed, {
      range: $R(0, 255),
      sliderValue: values[0],
      onSlide: function(v, s){
        s.track.colorWidget.updateFromSliders()
      },
      onChange: function(v, s){
        s.track.colorWidget.updateFromSliders()
      }
    });
    this.sliderGreen = new Control.Slider(sliderGreen, trackGreen, {
      range: $R(0, 255),
      sliderValue: values[1],
      onSlide: function(v, s){
        s.track.colorWidget.updateFromSliders()
      },
      onChange: function(v, s){
        s.track.colorWidget.updateFromSliders()
      }
    });
    this.sliderBlue = new Control.Slider(sliderBlue, trackBlue, {
      range: $R(0, 255),
      sliderValue: values[2],
      onSlide: function(v, s){
        s.track.colorWidget.updateFromSliders()
      },
      onChange: function(v, s){
        s.track.colorWidget.updateFromSliders()
      }
    });
    
    this.preview = new Element('span', {
      className: 'UI-widget-color-preview'
    });
    this.container.down('.UI-widget-c').insert({
      after: this.preview.insert('')
    });
    
    this.input.observe('blur', this.updateFromInput.bindAsEventListener(this));
  },
  
  invertRGB: function(color){
    color = this.parseRGB(color);
    for (var i = 0; i < 3; i++) 
      color[i] = 255 - color[i];
    return this.parseRGBArray(color);
  },
  invertRGBtoGrey: function(color){
    color = this.parseRGB(color);
    var c = 0;
    for (var i = 0; i < 3; i++) 
      c += color[i];
    c = 255 - parseInt(c / 3);
    return (c * 256 + c) * 256 + c;
  },
  invertRGBtoBW: function(color){
    color = this.parseRGB(color);
    var c = 0;
    for (var i = 0; i < 3; i++) 
      c += color[i];
    if (c / 3 < 128) 
      return parseInt('FFFFFF', 16);
    else 
      return 0;
  },
  parseRGB: function(value){
    if (!value.substr(0, 1) == '#') 
      value = '#' + parseInt(value).toPaddedString(6, 16);
    return [parseInt(value.substr(1, 2), 16), parseInt(value.substr(3, 2), 16), parseInt(value.substr(5, 2), 16)]
  },
  parseRGBArray: function(values){
    return (((parseInt(values[0]) * 256) + parseInt(values[1])) * 256) + parseInt(values[2]);
  },
  setColorByInput: function(){
    if (this.input.value.substr(0, 1) == '#') {
      this.preview.style.backgroundColor = this.input.value;
      this.color.style.backgroundColor = this.input.value;
      
      if (this.options.hideInput) {
        this.output.update(this.input.value);
      }
    }
    else {
      this.preview.style.backgroundColor = 'transparent';
      this.color.style.backgroundColor = '#' + parseInt(this.valueFromSliders()).toPaddedString(6, 16);
      
      if (this.options.hideInput) {
        this.output.update('---');
      }
    }
  },
  valueFromSliders: function(){
    return (this.parseRGBArray([this.sliderRed.value, this.sliderGreen.value, this.sliderBlue.value]));
  },
  update: function(value, options){
    if (value >= 0) {
      color = '#' + parseInt(value).toPaddedString(6, 16).toUpperCase();
      this.input.value = color;
      //this.control.style.background=color;
      if (this.unsetter) 
        this.unsetter.checked = false;
      
    }
    else {
      this.input.value = '';
      //this.control.style.background='transparent';
      if (this.unsetter) 
        this.unsetter.checked = true;
      
    }
    this.setColorByInput();
  },
  updateFromSliders: function(){
    var value = this.valueFromSliders();
    if (this.options.allowUnset && this.unsetter.checked) 
      value = -1;
    this.update(value);
  },
  
  updateFromInput: function(){
    var color = this.parseRGB(this.input.value);
    this.sliderRed.setValue(color[0]);
    this.sliderGreen.setValue(color[1]);
    this.sliderBlue.setValue(color[2]);
    this.setColorByInput();
  },
  
  unset: function(event){
    if (Event.element(event).type != 'checkbox') 
      this.unsetter.checked = !this.unsetter.checked;
    
    this.updateFromSliders();
  }
});
