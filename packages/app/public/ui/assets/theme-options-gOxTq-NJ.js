const a=["tomato","red","ruby","crimson","pink","plum","purple","violet","iris","indigo","blue","cyan","teal","jade","green","grass","brown","orange"],s=["sky","mint","lime","yellow","amber"],r=["gold","bronze"],n=[...a,...s,...r],t="gray",c=["mauve","slate","sage","olive","sand"],l=[t,...c];function o(e){switch(e){case"tomato":case"red":case"ruby":case"crimson":case"pink":case"plum":case"purple":case"violet":return"mauve";case"iris":case"indigo":case"blue":case"sky":case"cyan":return"slate";case"teal":case"jade":case"mint":case"green":return"sage";case"grass":case"lime":return"olive";case"yellow":case"amber":case"orange":case"brown":case"gold":case"bronze":return"sand"}}const u=["inherit","light","dark"],i=[...n,"gray"],d=[...l,"auto"],g=["solid","translucent"],m=["none","small","medium","large","full"],y=["90%","95%","100%","105%","110%"],p={hasBackground:{type:"boolean",default:!0},appearance:{type:"enum",values:u,default:"inherit"},accentColor:{type:"enum",values:i,default:"indigo"},grayColor:{type:"enum",values:d,default:"auto"},panelBackground:{type:"enum",values:g,default:"translucent"},radius:{type:"enum",values:m,default:"medium"},scaling:{type:"enum",values:y,default:"100%"}};function f(e){return e==="gray"?"gray":o(e)}export{f as g,p as t};
