UI.Window.addMethods({
  startDrag: function(handle) {
    this.initBounds = this.getBounds();
    this.activate();

    if (this.options.wired  && !this.saveElement) {
      this.createWiredElement();
      this.wiredElement.style.cssText = this.element.style.cssText;
      this.saveElement = this.element;
      this.windowManager.container.appendChild(this.wiredElement);
      this.element = this.wiredElement;
	  this.element.show();
    }
    
    handle.hasClassName('resize_handle') ? this.startResize(handle) : this.startMove();
  },
  
  endDrag: function() {
    this.element.hasClassName('resized') ? this.endResize() : this.endMove();
    
    if (this.options.wired) {
      this.element = this.saveElement;
	  this.saveElement = false;
	  this.setBounds(Object.extend({
	  	width: parseInt(this.wiredElement.style.width),
		height: parseInt(this.wiredElement.style.height),
	  }, this.wiredElement.positionedOffset()));
      this.wiredElement.remove();
    }
  },
  
  startMove: function() {
    // method used to drag
    this.drag = this.moveDrag;
    this.element.addClassName('moved');
    this.fire('move:started');
  },
  
  endMove: function() {
    this.element.removeClassName('moved');
    this.fire('move:ended');
  },
  
  startResize: function(handle) {
    this.drag = this[handle.readAttribute('drag_prefix')+'Drag'];
    this.element.addClassName('resized');
    this.fire('resize:started');
  },
  
  endResize: function() {
    this.element.removeClassName('resized');
    this.fire('resize:ended');
  },

  moveDrag: function(dx, dy) {
    this.setPosition(this.initBounds.top + dy, this.initBounds.left + dx);
  },

  swDrag: function(dx, dy) {
    var initBounds = this.initBounds;
    this.setSize(initBounds.width - dx, initBounds.height + dy)
        .setPosition(initBounds.top,
                     initBounds.left + (initBounds.width - this.getSize().width));
  },

  seDrag: function(dx, dy) {     
    this.setSize(this.initBounds.width + dx, this.initBounds.height + dy);
  },

  nwDrag: function(dx, dy) {
    var initBounds = this.initBounds;
    this.setSize(initBounds.width - dx, initBounds.height - dy)
        .setPosition(initBounds.top + (initBounds.height - this.getSize().height),
                     initBounds.left + (initBounds.width - this.getSize().width));
  },

  neDrag: function(dx, dy) {
    var initBounds = this.initBounds;
    this.setSize(initBounds.width + dx, initBounds.height - dy)
        .setPosition(initBounds.top + (initBounds.height - this.getSize().height),
                     initBounds.left);
  },

  wDrag: function(dx, dy) {
    var initBounds = this.initBounds;
    this.setSize(initBounds.width - dx, initBounds.height)
        .setPosition(initBounds.top,
                     initBounds.left + (initBounds.width - this.getSize().width));
  },

  eDrag: function(dx, dy) {
    this.setSize(this.initBounds.width + dx, this.initBounds.height);
  },

  nDrag: function(dx, dy) {
    var initBounds = this.initBounds;
    this.setSize(initBounds.width, initBounds.height - dy)
        .setPosition(initBounds.top + (initBounds.height - this.getSize().height),
                     initBounds.left);
  },

  sDrag: function(dx, dy) {
    this.setSize(this.initBounds.width, this.initBounds.height + dy);
  }
});
