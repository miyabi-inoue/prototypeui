UI.Tabbox = Class.create(UI.Options, {
  // Group: Options
  options: {
    theme: ''
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
  initialize: function(element, tabs, options) {
    this.setOptions(options);

    this.element               = $(element);  
    this.tabs                  = new Hash;

    this.element.childElements().invoke('hide');
    this.element.addClassName('ui_tabbox'+(this.options.theme?' '+this.options.theme+'_ui_tabbox':''));
    
    this.head=new Element('div',{className:'tabbox_head'});
    
    tabs.each(function(tab) {
      this.add(tab);
    }.bind(this));
    
    this.element.insert({
        top: this.head
      });
      
    return this;
    //this.change(this.openTab);
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

  add: function(tab) {
      // make sure tab name is unique
      while(this.tabs.get(tab.name))
      {
        tab.name=tab.name+'_';
      }
    
      head=new Element('span').insert(new Element('span',{className:'tab_w'})).insert(new Element('span',{className:'tab_c'}).insert(tab.lable)).insert(new Element('span',{className:'tab_e'}));
      head.writeAttribute('pui-tabbox:name',tab.name)
      head.observe('click',function(e){
        this.select(tab.name);
      }.bind(this).bind(tab));
      tab.head=head;
      if(tab.after && this.tabs.get(tab.after)) {
        this.tabs.get(tab.after).head.insert({after:head});
      } else {
        this.head.insert(head);
      }
      
      
      if(tab.element)
        tab.element=$(tab.element);
      else {
        tab.element=new Element('div').hide();
        this.element.insert({
          bottom: tab.element
        });
        if(tab.content) {
          tab.element.insert(tab.content);
        }
      }
      tab.element.addClassName('tabbox_body');
      tab.element.writeAttribute('pui-tabbox:object',this);
          
      this.tabs.set(tab.name,tab);    
  },

  select: function(tabName) {
    if (this.selectedTab && this.selectedTab.name == tabName) {
      return this;
    }
    
    if(this.selectedTab) {
      this.selectedTab.head.removeClassName('selected');
      this.selectedTab.element.hide();
    }
    
    this.selectedTab=this.tabs.get(tabName);
    
    this.selectedTab.head.addClassName('selected');
    this.selectedTab.element.show();
 
    if(this.selectedTab.ajaxContent)
    {
      tab=this.tabs.get(tabName);
      options={onComplete:function(){
        this.fire('selected', {
          tab: tab
        });
        this.fire('selected:'+tabName);
        if(tab.ajaxLoadOnce) {
          tab.ajaxContent=false;
        }
      }.bind(this).bind(tab)};
      new Ajax.Updater(this.selectedTab.element, this.selectedTab.ajaxContent, options);
    } else {
      this.fire('selected', {
        tab: tabName
      });
      this.fire('selected:'+tabName);
    }      
    
    return this;
  }
});