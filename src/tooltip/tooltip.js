UI.Tooltip = Class.create(UI.Options, {
  options: {
    className: '',
    beforeShow: null,
    afterShow: null,
    beforeHide: null,
    afterHide: null
  },
  initialize: function(anchor, options){
    this.setOptions(UI.Tooltip.options);
    this.setOptions(options);
    this.anchor = $(anchor);
    this.anchor.addClassName('ui_tooltip_anchor');
    

    
    this.pulldown = new UI.PullDown(this.anchor, {
      className: (this.options.theme?this.options.theme+'_ui_pulldown ':'') + this.options.className,
      shadow: this.options.shadow,
      position: 'over',
      beforeShow: this.options.beforeShow,
      afterShow: this.options.afterShow,
      beforeHide: this.options.beforeHide,
      afterHide: this.options.afterHide,
      cloneWidth: false
    });

    this.anchor.observe('mouseover', this.show.bindAsEventListener(this));   
    this.pulldown.element.addClassName('ui_tooltip');
    this.pulldown.element.observe('mouseout', this.hide.bindAsEventListener(this));
  },
  setContent: function(content) {
    this.pulldown.element.innerHTML= content;
    return this;
  },
  show: function() {
    this.pulldown.place();
    this.pulldown.show();
      
    return this;
  },
  hide: function() {
    this.pulldown.hide();
    return this;
  }
});
