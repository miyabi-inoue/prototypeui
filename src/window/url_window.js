UI.URLWindow = Class.create(UI.Window, {
  options: {
    url: 'about:blank'
  },
  
  afterClassCreate: function() {
    this.undefMethod('setAjaxContent');
  },
  
  initialize: function($super, options) {
    $super(options);
    this.createIFrame();
  },
  
  destroy: function($super){
    this.contentframe.src = null;
    $super();
  },
  
  getUrl: function() {
    return this.contentframe.src;
  },
  
  setUrl: function(url, options) {
    this.contentframe.src = url;
    return this;
  },
  
  createIFrame: function($super) {
    this.contentframe = new Element('iframe', {
      style: this.style,
      frameborder: 0,
      src: this.options.url,
      name: this.element.id + "_frame",
      id:  this.element.id + "_frame" 
    });
    
    this.content.insert(this.contentframe);
  }
});

