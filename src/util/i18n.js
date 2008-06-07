Object.extend(String.prototype, {
  localize: function(){
    var lstring = ((UI) && (UI.i18n)) ? UI.i18n.getText(this) : this;
	var args = (arguments[0] && !Object.isString(arguments[0])) ? arguments[0] : arguments;
    
    if (!lstring) {
      lstring = "§§§" + this + "§§§";
    }
    else {
      for (var i = 0; i < args.length; i++) {
        lstring = lstring.replace("{" + i + "}", args[i]);
      }
    }
    return lstring;
  }
});

Object.extend(Array.prototype, {
  localize: function(key){
  	return ((UI) && (UI.i18n)) ? UI.i18n.getArray(key, this) : this;
  },
	
  localizeStrings: function(){
  	return this.clone().invoke('localize',arguments);
  }
});

UI.i18n = {
  lang: 'en',
  fallbackLangs: [],
  texts: {},
  arrays: {},
  
  // lang is language
  // gtext is global text
  // ltext is locale text
  addText: function(lang, gtext, ltext){
  	if(!(this.texts))
		this.texts={};
	if(!(this.texts[lang]))
		this.texts[lang]={};
	this.texts[lang][gtext]=ltext;
	return this;
  },  
  
  getTextFor: function(gtext, langs){
  	var lang=langs.shift();
	
  	if((this.texts) && (this.texts[lang]) && (this.texts[lang][gtext])){
	  return this.texts[lang][gtext];
	}
	else if(langs.length){
	  return this.getTextFor(gtext, langs)
	}
	else
	  return gtext;
  	
  },
  
  getText: function(gtext){
  	var langs=this.fallbackLangs.clone();
	langs.unshift(this.lang);
	return this.getTextFor(gtext, langs)
  },
  
  addArray: function(lang, key, values){
   	if(!(this.arrays))
		this.arrays={};
	if(!(this.arrays[lang]))
		this.arrays[lang]={};
	this.arrays[lang][key]=values;
	
	return this; 	
  },
  
  getArrayFor: function(key, langs){
  	var lang=langs.shift();
	
  	if((this.arrays) && (this.arrays[lang]) && (this.arrays[lang][key])){
	  return this.arrays[lang][key].clone();
	}
	else if(langs.length){
	  return this.getArrayFor(key, langs)
	}
	else
	  return [];
  	
  },
  
  getArray: function(key, default_values){
  	var langs=this.fallbackLangs.clone();
	langs.unshift(this.lang);
	var result=this.getArrayFor(key, langs);
	
	if(result.length || !Object.isArray(default_values))
		return result;
	else
		return default_values;
  },
  
  // Set Lang and Fallbacks
  
  setLang: function(lang){
    this.lang = lang;
	if(lang.match(/\w{2}[-_]\w{2}/))
	{
		this.fallbackLangs.unshift(lang.substr(0,2));
	}
	return this;
  },
  
  setFallbackLangs: function(langs) {
  	this.fallbackLangs=langs;
	return this;
  }
  

}
