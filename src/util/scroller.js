UI.Scroller = Class.create(UI.Options, {
  // Group: Options
  options: {
    first: 0,
    perPage: 3
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
    this.element.update(new Element('div'));
    
    this.url     = url;
    
    this.first=this.options.first;
    this.perPage=this.options.perPage;
    this.loaded=0; 
         
    this.load();
    
    
    $('scroller').observe('scroll',function(e){
      this.load();     
    }.bind(this),false);      
      
    return this;
  },

  /*
    Method: destroy
      Destructor, cleans up DOM and memory
  */
  destroy: function($super) {
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

  load: function() {
    var paneHeight=$(this.element).down().getHeight();
    var boxHeight=$(this.element).getHeight();
    var scrollTop=$(this.element).scrollTop;
    var scrollBottom=paneHeight-boxHeight-scrollTop;
   
    if(scrollBottom<500 && this.loaded>=this.first)
    {
      new Ajax.Updater($(this.element).down(), this.url, {
        parameters:{
          first:this.first,
          perpage:this.perPage
        }, 
        onSuccess: 
          function(){
            this.loaded+=this.perPage;
            this.load();
            this.fire('loaded');
          }.bind(this),
        insertion: Insertion.Bottom});

      this.first+=this.perPage;
    }
  }
});