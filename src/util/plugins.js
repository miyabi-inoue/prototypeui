Prototype.BrowserFeatures.getFlashVersion=function(){
	if(navigator&&navigator.plugins&&navigator.plugins.length>0){
		for(m=0;m<navigator.plugins.length;m++){
			r=navigator.plugins[m];
			if(r.name.indexOf("Shockwave Flash")>-1){
				return r.description.split("Shockwave Flash ")[1]
			}
		}
	}else if(window.ActiveXObject){
		for(q=10;q>=2;q--){
			try{
				g=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+q);
				if(g){
					return q+".0"
				}
			}catch(p){}
		}
	}
	return 0
};
	
Prototype.BrowserFeatures.hasJava=function() {
	if(!self.screen&&self.java)
	{
		return java.awt.Toolkit.getDefaultToolkit()?1:0;
	}
	else if(navigator&&navigator.javaEnabled())
	{
		return navigator.javaEnabled()?1:0;
	}
	return undefined
};