UI.Tabbox = Class.create(UI.Options, {
  // Group: Options
  options: {},
 
  // Group: Contructor
  
  /*
    Method: initialize
      Constructor, should not be called directly, it's called by new operator (new Tabbox())
      The tabbox is not open and nothing has been added to the DOM yet
      
    Parameters:                                                                            
      options - (Hash) list of optional parameters  
      
    Returns:
      this
  */
  initialize: function(options) {
    this.setOptions(options);
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

});