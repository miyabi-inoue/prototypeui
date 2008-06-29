UI.Widget.Date = Class.create(UI.Widget.Generic, {
  date_options: {
    className: 'ui_date_widget',
    format: '%m/%d/%Y',
    startWeekday: 1,
    calendarTheme: ''
  },
  initialize: function($super, input, options){
    this.setOptions(this.date_options);
    $super(input, options);
  },
  dispose: function($super){
    this.calendar = null;
    $super();
  },
  
  refresh: function(){
    date = Date.parseString(this.input.getValue(), this.options.format);
    if (!date.getMonth() && date.getMonth() != 0) 
      date = new Date();
    
    this.calendar.selectedDay = date;
    this.calendar.update(date);
  },
  
  build: function(event){
    this.calendar = new UI.Calendar(this.pulldown.element, {
      format: this.options.format,
      startWeekday: this.options.startWeekday,
      theme: (this.options.calendarTheme?this.options.calendarTheme:this.options.theme)
    });
    this.calendar.observe('click', this.selectDate.bindAsEventListener(this));
  },
  
  selectDate: function(e){
    this.update(e.memo.formattedDate);
  }
});
