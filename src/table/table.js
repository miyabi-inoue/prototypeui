UI.Table = Class.create(UI.Options, {
  // Group: Options
  options: {},
 
  // Group: Contructor
  
  /*
    Method: initialize
      Constructor, should not be called directly, it's called by new operator (new Table())
      The table is not open and nothing has been added to the DOM yet
      
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
      Fires a table custom event automatically namespaced in "table:" (see Prototype custom events).
      The memo object contains a "table" property referring to the table.

    Example:
      > UI.Table.addMethods({
      >   iconify: function() {
      >     // ... your iconifying code here ...
      >     this.fire('iconified');
      >     // chain friendly
      >     return this;
      >   }
      > });
      > 
      > document.observe('table:iconified', function(event) {
      >   alert("Table with id " + event.memo.table.id + " has just been iconified");
      > });

    Parameters:
      eventName - an event name
      memo - a memo object

    Returns:
      fired event
  */
  fire: function(eventName, memo) {
    memo = memo || { };
    memo.table = this;
    return (this.element).fire('table:' + eventName, memo);
  },

   /*
     Method: observe
       Observe a table event with a handler function automatically bound to the table

     Parameters:
       eventName - an event name
       handler - a handler function

     Returns:
       this
  */  
  observe: function(eventName, handler) {
    this.element.observe('table:' + eventName, handler.bind(this));
    return this;
  },
  

  // Group: Actions
  
  terminate_for_ie: true
});
