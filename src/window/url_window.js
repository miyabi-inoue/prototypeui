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
    Event.stopObserving(this.contentframe, "load", this.onLoad);
    this.contentframe.src = "about:blank";
    $super();
  },
  
  getUrl: function() {
    return this.contentframe.src;
  },
  
  setUrl: function(url, options) {
    this.contentframe.src = url;
    return this;
  },

  adapt: function() {
    var dimensions = Element.getScrollDimensions(this.contentframe.contentDocument.body);
      this.setSize(dimensions.width+1, dimensions.height, true);
      this.morph(dimensions, true);
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

    Event.observe(this.contentframe, "load", this.onLoad);

    this.content.insert(this.contentframe);
  },

  onLoad: function(event) {
    var element = Event.element(event);
    var document = element.contentDocument || element.contentWindow.document;
    element.contentWindow.focus();
    if (typeof element.contentWindow.Prototype != "undefined" && typeof document.forms != "undefined" && document.forms.length > 0)
      document.forms[0].findFirstElement().focus();
  }
});

