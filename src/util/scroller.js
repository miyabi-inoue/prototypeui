UI.Scroller = Class.create(UI.Options, {
  // Group: Options
  options: {
    first: 0,
    perPage: 3,
    preloadOffset: 500,
    loadFunction: false
  },
 
  // Group: Contructor
  
  /*
    Method: initialize
      Constructor, should not be called directly, it's called by new operator (new Tabbox())
      The tabbox is not open and nothing has been added to the DOM yet
      
    Parameters:                                                                            
      element - Element to make a tabbox
      tabs    - (Array) tab definition
      options - (Hash) list of optional parameters  
      
    Returns:
      this
  */
  initialize: function(element, url, options) {
    this.setOptions(options);

    this.element = $(element);  
    if(!this.element.down())
      this.element.update(new Element('div'));
    
    this.url     = url;
    this.active  = true;
    
    this.first=this.options.first;
    this.perPage=this.options.perPage;
    this.loaded=0; 
         
    this.load();
    
    $(this.element).observe('scroll',function(e){
      this.load();     
    }.bind(this),false);      
      
    return this;
  },

  /*
    Method: destroy
      Destructor, cleans up DOM and memory
  */
  destroy: function($super) {
    this.active=false;
    this.fire('destroyed');
  },
  
  // Group: Event handling
  
  /*
    Method: fire
      Fires a tabbox custom event automatically namespaced in "tabbox:" (see Prototype custom events).
      The memo object contains a "tabbox" property referring to the tabbox.

    Example:
      > UI.Tabbox.addMethods({
      >   iconify: function() {
      >     // ... your iconifying code here ...
      >     this.fire('iconified');
      >     // chain friendly
      >     return this;
      >   }
      > });
      > 
      > document.observe('tabbox:iconified', function(event) {
      >   alert("Tabbox with id " + event.memo.tabbox.id + " has just been iconified");
      > });

    Parameters:
      eventName - an event name
      memo - a memo object

    Returns:
      fired event
  */
  fire: function(eventName, memo) {
    memo = memo || { };
    memo.tabbox = this;
    return (this.element).fire('tabbox:' + eventName, memo);
  },

   /*
     Method: observe
       Observe a tabbox event with a handler function automatically bound to the tabbox

     Parameters:
       eventName - an event name
       handler - a handler function

     Returns:
       this
  */  
  observe: function(eventName, handler) {
    this.element.observe('tabbox:' + eventName, handler.bind(this));
    return this;
  },

  // Group: Actions

  _loaded: function(transport) {
    if (!(this.loaded+this.perPage == this.first && this.active)) {
      return false;
    }  
    this.loaded+=this.perPage;
    
    var paneHeight=$(this.element).down().getHeight();
    if(paneHeight == this.paneHeight) {
      this.loaded=true;
    }
    this.paneHeight=paneHeight;
    
    if(this.options.loadFunction) {
      this.options.loadFunction(transport);
    }
    this.load();
    this.fire('loaded');    
  },

  load: function() {
    var paneHeight=$(this.element).down().getHeight();
    var boxHeight=$(this.element).getHeight();
    var scrollTop=$(this.element).scrollTop;
    var scrollBottom=paneHeight-boxHeight-scrollTop;

    if(scrollBottom<this.options.preloadOffset && this.loaded==this.first && this.active)
    {
      parameters=this.options.parameters || {};
      parameters.first=this.first;
      this.first+=this.perPage;
      parameters.perpage=this.perPage
      
      if(this.options.loadFunction) {
        new Ajax.Request(this.url, {
          parameters:parameters, 
          onSuccess : this._loaded.bind(this)
        });
      } else {
        new Ajax.Updater($(this.element).down(), this.url, {
          parameters:parameters, 
          onSuccess: this._loaded.bind(this),
          insertion : Insertion.Bottom});
      }

    }
  }
});