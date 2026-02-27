document.body.style.overflowY="hidden";

let canvas = document.getElementById("canvas");
canvasHeight = 2560;
canvas.height = 2560;
canvas.width = canvas.height*1.5;

canvas.style.height = window.innerHeight+'px';
canvas.style.width = canvas.style.height*1.5+'px';
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled=false;
ctx.fillStyle="red";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let mouseX,mouseY,mouseZ,mouseW;
let zoom=16;
let rect=canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function (e) {
    mouseX=(e.clientX-rect.left)/window.innerHeight*canvas.height;
    mouseY=(e.clientY-rect.top)/window.innerHeight*canvas.height;
 }, false);
canvas.addEventListener('wheel', function (event){ if (mode==0){
    zoom=Math.min(25,Math.max(5,zoom+event.deltaY/10));
    c.z=zoom**2/200;
    }}, { passive: true });
canvas.addEventListener("mousedown", function(e) {
    mouseW=e.button;
  });
function setCookie(cname, cvalue, exdays) {//W www w3schools
    const d=new Date();
    d.setTime(d.getTime()+(exdays*24*3600000));
    let expires="expires="+d.toUTCString();
    document.cookie=cname+"="+cvalue+";"+expires+";path=/";}
function getCookie(cname) {
    let name=cname + "=";
    let ca=document.cookie.split(';');
    for(let i=0; i < ca.length; i++) {
        let c=ca[i];
        while (c.charAt(0) == ' ') {c=c.substring(1);}
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }}return "";}
window.addEventListener('resize', () => {
    canvas.style.height=window.innerHeight+'px';
    canvas.style.width=canvas.style.height*1.5+'px';
});
window.onbeforeunload=function(){return '';};
document.getElementById('cP').addEventListener('input',e=>{editBlockColor=e.target.value;});
function mouse(e) {
    /*if (e=='m') {
        mouseX=event.clientX-rect.left;
        mouseY=event.clientY-rect.top;}*/
    if (e=='d') {
        mouseZ=1;}
    if (e=='u') {
        mouseZ=0;}
    if (e=='fixpos') {
        rect = canvas.getBoundingClientRect();}
    if (e=='c') {
        if (mode==0&&mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4)){
            editObjId=Math.floor((mouseY-canvas.height/screenHeightBlocks*(screenHeightBlocks-4))/(s*10*c.z))*Math.floor(screenHeightBlocks*8/5)+Math.floor((mouseX)/(s*10*c.z));
            editBlockData=[0,0,0,0];
            updateBD();
            if (editObjId!=0) {document.getElementById("rgb").style.visibility='hidden';} else document.getElementById("rgb").style.visibility='';
        }}}
function button(e) {
    if (e=='lPlus') {
        editLayer=Math.min(99,(keyShiftPressed)?editLayer+10:editLayer+1);
        e2=(editLayer<=9)?"&emsp;"+editLayer:"&ensp;"+editLayer;
        document.getElementById("Layer").innerHTML="Layer:&emsp;"+e2+"&emsp;";
        return;}
    if (e=='lMinus') {
        editLayer=Math.max(0,(keyShiftPressed)?editLayer-10:editLayer-1);
        e2=(editLayer<=9)?"&emsp;"+editLayer:"&ensp;"+editLayer;
        document.getElementById("Layer").innerHTML="Layer:&emsp;"+e2+"&emsp;";
        return;}
    if (e=='cPlus') {
        editChannel=Math.min((keyShiftPressed&&keyFPressed&&editChannel==21)?31:29,(keyShiftPressed)?editChannel+10:editChannel+1);
        e2=(editChannel<=9)?"&emsp;"+editChannel:"&ensp;"+editChannel;
        document.getElementById("Channel").innerHTML="Channel:&emsp;"+e2+"&emsp;";
        return;}
    if (e=='cMinus') {
        editChannel=Math.max(0,(keyShiftPressed)?editChannel-10:editChannel-1);
        e2=(editChannel<=9)?"&emsp;"+editChannel:"&ensp;"+editChannel;
        document.getElementById("Channel").innerHTML="Channel:&emsp;"+e2+"&emsp;";
        return;}
    if (e=='Mode') {
        if (mode==0) {toPlayMode()} else {toEditMode()}
        return;}
    if (e=='BlockData') {
        if (editBDId==3) {editBDId=1;
        } else{editBDId+=1;}
        updateBD();
        return;}
    if (e=='bDToggle') {
        editBlockData[editBDId]=Math.abs(editBlockData[editBDId]-1);
        updateBD();
        return;}
    if (e=='bD0') {
        editBlockData[0]=-(editBlockData[0]-1);
        document.getElementById("bD0").innerHTML=(editBlockData[0]==1)?'Culling: No':'Culling: Yes';
        return;}
    if (e=='Clear') {
        let txt=document.getElementById("Clear");
        if (txt.innerHTML=="Sure?") {txt.innerHTML="Clear";objects=[];if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));}
        } else if (txt.innerHTML=="Clear") txt.innerHTML="Sure?";
        return;}
    if (e=='Save') {
        setCookie("level1",saveSettings()+toSave(unSizedLevel()),367);
        setMessage("Level Saved","200,255,200");
        return;}
    if (e=='Load') {
        let p=getCookie("level1");
        if (confirm("Load Level?")&&p.trim()!=''){
        try{
            loadSettings(p);
            objects=toObjects(p.substring(p.indexOf("–")+1));
            objects=sizedLevel();
            updateAutoTiles(6,7,true);
            if (toSave(objects)!=previousObjects[0]){
                previousObjects.unshift(toSave(objects));
                }
            toPlayMode();
            setMessage("Level Loaded","200,255,200");
        }catch(e){alert("Error Loading Level Data");}}
        return;}
    if (e=='Export') {
        try{saveFile();}catch(e){
            let save=saveSettings()+toSave(unSizedLevel());
            const tempTextArea = document.createElement("textarea");
            tempTextArea.value = save;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            document.execCommand("copy");
            alert('Error - Save Copied to Clipboard');
            document.body.removeChild(tempTextArea);}
        return;}
    if (e=='Import') {
        loadFile();
        return;}//let p=prompt("Load Level Data", "").trim();if (p.trim()!=''){try{loadSettings(p);objects=toObjects(p.substring(p.indexOf("–")+1));objects=sizedLevel();updateAutoTiles(6,7,true);if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));toPlayMode();}}catch(e){alert("Error Loading Level Data");}}
    if (e=='ImageSize') {
        if (editSize==50) {editSize=1;
        } else if (editSize==1) {editSize=2;
        } else if (editSize==2) {editSize=5;
        } else if (editSize==5) {editSize=10;
        } else if (editSize==10) {editSize=20;
        } else if (editSize==20) {editSize=50;
        }
        document.getElementById("ImageSize").innerHTML="Block Size: "+editSize+" px";
        return;}
    if (e=='GridSize') {
        if (editGridSize==50) {editGridSize=1;
        } else if (editGridSize==1) {editGridSize=2;
        } else if (editGridSize==2) {editGridSize=5;
        } else if (editGridSize==5) {editGridSize=10;
        } else if (editGridSize==10) {editGridSize=20;
        } else if (editGridSize==20) {editGridSize=50;}
        document.getElementById("GridSize").innerHTML="Grid Size: "+editGridSize+" px";
        return;}
    if (e=='State') {
        if (editState==0) {editState=1;
        } else {editState=0;}
        document.getElementById("State").innerHTML="State: "+editState;
        return;}
    if (e=='Undo') {
        objects=toObjects(previousObjects[0]);
        if (previousObjects.length>1)previousObjects=previousObjects.slice(1,previousObjects.length);
        return;}
    if (e=='Collision') {
        if (editCollision==2) {editCollision=0;      document.getElementById("Collision").innerHTML="Collision: None";
        } else if (editCollision==1) {editCollision=2;document.getElementById("Collision").innerHTML="Collision: Auto";
        } else if (editCollision==0) {editCollision=1;document.getElementById("Collision").innerHTML="Collision: Full";}
        return;}
    if (e=='Background') {
        if (backgroundColor=="rgb(141,255,163)") {backgroundColor="rgb(0,0,0)";
        } else if (backgroundColor=="rgb(0,0,0)") {backgroundColor="rgb(115,170,255)";
        } else if (backgroundColor=="rgb(115,170,255)") {backgroundColor="rgb(255,255,255)";
        } else if (backgroundColor=="rgb(255,255,255)") {backgroundColor="rgb(141,255,163)";}
        return;}
}
let keyWPressed,keyAPressed,keySPressed,keyDPressed,keyLPressed,keyGPressed,keyRightPressed,keyPPressed,keyLeftPressed,keyUpPressed,keyDownPressed,keySpacePressed,keyFPressed,keyRPressed,keyPlusPressed,keyMinusPressed,keyShiftPressed;
window.addEventListener("keydown", (event) => {
  switch(event.key.toLowerCase()) {
    case "arrowright":keyRightPressed=true;break;
    case "arrowleft":keyLeftPressed=true;break;
    case "arrowup":keyUpPressed=true;break;
    case "w":keyWPressed=true;break;
    case "a":keyAPressed=true;break;
    case "d":keyDPressed=true;break;
    case "arrowdown":keyDownPressed=true;break;
    case "s":keySPressed=true;break;
    case "p":keyPPressed=true;break;
    case " ":keySpacePressed=true;break;
    case "e":if (mode==0){toPlayMode();}else{toEditMode();}break;
    case "f":keyFPressed=true;break;
    case "r":keyRPressed=true;break;
    case "p":keyPPressed=true;break;
    case "shift":keyShiftPressed=true;break;
    case "g":keyGPressed=true;break;
    case "l":keyLPressed=true;break;
    case "shift":keyShiftPressed=true;break;
    case "-":if (mode==0)keyMinusPressed=true;break;
    case "+":if (mode==0)keyPlusPressed=true;break;
    case "_":if (mode==0)keyMinusPressed=true;break;
    case "=":if (mode==0)keyPlusPressed=true;break;
  }});
window.addEventListener("keyup", (event) => {
  switch(event.key.toLowerCase()) {
    case "arrowright":keyRightPressed=false;break;
    case "arrowleft":keyLeftPressed=false;break;
    case "arrowup":keyUpPressed=false;break;
    case "w":keyWPressed=false;break;
    case "a":keyAPressed=false;break;
    case "d":keyDPressed=false;break;
    case "arrowdown":keyDownPressed=false;break;
    case "s":keySPressed=false;break;
    case "p":keyPPressed=false;break;
    case " ":keySpacePressed=false;break;
    case "f":keyFPressed=false;break;
    case "l":keyLPressed=false;break;
    case "r":keyRPressed=false;break;
    //case "e":keyEPressed=false;break;
    case "g":keyGPressed=false;break;
    case "shift":keyShiftPressed=false;break;
  }});
function notRandom(p,o,seed=0) {
    let rand=Math.floor(o.x*374761393)+Math.floor(o.y*668265263);
    rand=(rand^(rand>>(13+seed)))*1274126177;
    rand=(rand^(rand>>16))>>>0;
    return (rand/0xFFFFFFFF)<p; 
}
function some(arr, predicate) {
    for (let i=0,l=arr.length;i<l;i++) {
        if (predicate(arr[i],i,arr)) {
            return true; 
        }
    }
    return false;}
function filter(arr, predicate) {
    const result=[];
    for (let i=0,len=arr.length;i<len;i++) {
        if (predicate(arr[i],i,arr)) {
            result.push(arr[i]);
        }
    }
    return result;}
function drawRect(x,y,w,h,C){
    ctx.fillStyle="rgb("+C+")";
    ctx.fillRect(x,y,(w>=50)?w+2:w,(h>=50)?h+2:h);}
let b=-1;
function drawObj(o,transform=0) {
    ctx.save();ctx.translate(o.x+c.x+o.i*s/2,o.y+c.y+o.i*s/2);ctx.rotate(o.a*Math.PI/2);ctx.translate(-o.i*s/2,-o.i*s/2);
    if (o.id==0) {ctx.fillStyle=(o.r!=null)?"rgb("+o.r+","+o.g+","+o.b+")":editBlockColor;ctx.fillRect(0,0,s*o.i,s*o.i);
    } else if (o.id==1) {drawRect(0,0,s*o.i,s*o.i,"255,255,255");
    } else if (o.id==2) {drawRect(0,0,s*o.i,s*o.i,"115,170,255");
    } else if (o.id>=3&&o.id<=8) {ctx.drawImage(mario,(o.id-3)*16,0,16,16,0,0,o.i*s,o.i*s);
    } else if (o.id==9) {ctx.drawImage(marioLucky,Math.max(0,Math.floor(-1.5*Math.cos(Math.PI*fCT/26)+0.9))*16,0*16,16,16,0,0,o.i*s,o.i*s);
    } else if (o.id==10) {ctx.drawImage(marioCoin,Math.max(0,Math.floor(-1.5*Math.cos(Math.PI*fCT/26)+0.9))*16,0*16,16,16,0,0,o.i*s,o.i*s);
    } else if (o.id==11) {ctx.drawImage(marioEnemies,Math.floor(fCT%20/10)*16,0*16,16,16,0-transform*s,0-transform*s*2+o.i*s*0.15,o.i*s,o.i*s*0.85);
    } else if (o.id==12) {ctx.drawImage(marioEnemies,Math.floor(fCT%20/10)*16,1*16+Math.max(0,Math.sign(o.vx||mode))*24,16,24,0-transform*s,0-transform*s*2-o.i*s*0.2,o.i*s,o.i*s*1.2);
    } else if (o.id==13) {drawRect(-transform*s,-transform*s*2,o.i*s,o.i*s,"255,255,100");
    } else if (o.id==14) {drawRect(-transform*s,-transform*s*2,o.i*s,o.i*s,"255,150,150");
    
    } else if (o.id==20) {drawAutoTile(o,gD3,20);
    } else if (o.id==21) {drawAutoTile(o,gD2,44);
    } else if (o.id==22) {drawAutoTile(o,gD1,44);
    } else if (o.id==23) {ctx.drawImage(gD0,0,0,o.i*s,o.i*s);
    } else if (o.id==25&&mode==0) {ctx.drawImage(startPos,0,0,o.i*s,o.i*s);
    } else if (o.id==26&&mode==0) {ctx.drawImage(killBlock,0,0,o.i*s,o.i*s);
    } else if (o.id>=27&&o.id<=30&&mode==0) {ctx.drawImage(blockBlocks,128*(o.id-27),0,128,128,0,0,o.i*s,o.i*s);
    } else if (o.id==31&&mode==0) {ctx.globalAlpha=(o.l!=editLayer&&o.l>=0)?0.2:0.67;ctx.strokeStyle='rgb(20,20,50)';ctx.lineWidth=Math.min(10,o.w,o.i)*s/4;ctx.strokeRect(0+Math.min(10,o.w,o.i)*s/8,0+Math.min(10,o.w,o.i)*s/8,o.w*s-Math.min(10,o.w,o.i)*s/4,o.i*s-Math.min(10,o.w,o.i)*s/4);ctx.drawImage(camArea,0+o.w*s/2-Math.min(10,o.w,o.i)*s/2,0+o.i*s/2-Math.min(10,o.w,o.i)*s/2,Math.min(10,o.w,o.i)*s,Math.min(10,o.w,o.i)*s);ctx.globalAlpha=1;
    
    } else if (o.id==51) {ctx.drawImage(jerry,(1+o.s%2||1)*16,0*16,16,16,0,0,s*o.i,s*o.i);
    } else if (o.id==52) {
    } else if (o.id>=50&&o.id<=61) {ctx.drawImage(jerry,((o.id-50)%4)*16,Math.floor((o.id-50)/4)*16,16,16,0,0,s*o.i,s*o.i);
    } else if (o.id==62) {ctx.drawImage(jerry,Math.floor(fCT%64/16)*16,3*16,16,16,0-transform*s,0-transform*s,s*o.i,s*o.i);
    } else if (o.id>=63&&o.id<=65) {ctx.drawImage(jerry,Math.floor(fCT%32/8)*16,(o.id-59)*16,16,16,0-transform*s,0-transform*s,s*o.i,s*o.i);
    } else if (o.id==66||o.id==67) {ctx.drawImage(jerry,(2*o.id%3+(o.s||0)%2)*16,7*16,16,16,0,0,s*o.i,s*o.i);
    } else if (o.id==68) {ctx.drawImage(jerry,((o.s||0)%2)*16,8*16,16,16,0,0,s*o.i,s*o.i);//-(mode*(o.s%2-.5)*(fCT%3)*s||0)smooth movement
    } else if (o.id==69) {ctx.drawImage(jerryLaser,0,0,s*o.i,s*o.i);
    
    } else if (o.id==75) {drawAutoTile(o,grassyStone);
    } else if (o.id==76) {drawAutoTile(o,mossyStone,32);
    } else if (o.id==77) {drawAutoTile(o,metalTiles,32);
    } else if (o.id==78) {drawAutoTile(o,woodPlanks,36);
    } else if (o.id==79) {drawAutoTile(o,sandStone);
    } else if (o.id>=80&&o.id<=82) {ctx.drawImage(spikeBlocks,32*(o.id-80),0,32,32,0+((o.id==80)?-transform*3*s:(o.id==82)?-transform*2*s:0),0+((o.id==80)?-transform*3*s:(o.id==82)?-transform*2*s:0),o.i*s,o.i*s);
    } else if (o.id==83) {ctx.drawImage(spikeMoveBlock,-s*o.i/2,-s*o.i/2,s*o.i*2,s*o.i*2);
    } else if (o.id==84) {ctx.drawImage(sideMoveBlock,0,0,s*o.i,s*o.i);
    } else if (o.id==85) {drawAutoTile(o,dirtTiles,32);
    } else if (o.id==86) {ctx.drawImage(dirtExtras,32*3,0,32,32,0,0,s*o.i,s*o.i);
    
    
    } else if (o.id==990) {ctx.drawImage(gDBackground,0,0,s*o.i,s*o.i);
    
    
    } else if (o.id==1100) {ctx.drawImage(marioDeadEnemies,0,0,16,16,0-transform*s,-transform*s*2+o.i*s*0.15,o.i*s,o.i*s*0.85);
    } else if (o.id==1200) {ctx.drawImage(marioDeadEnemies,16,3,16,13,0-transform*s*3,0-transform*s*6+o.i*s*0.2,o.i*s,o.i*s*0.8);
    } else if (o.id==1101) {ctx.drawImage(marioEnemies,0,0*16,16,16,0-transform*s,0-transform*s*2+o.i*s*0.4,o.i*s,o.i*s*0.6);
    } else if (o.id==1201) {ctx.drawImage(marioShell,0,0,16,13,0-transform*s*3,0-transform*s*6+o.i*s*0.2,o.i*s,o.i*s*0.8);
    } else if (o.id>=6300&&o.id<=6500) {ctx.drawImage(jerry,0*16,(o.id/100-59)*16,16,16,-transform*s,0-transform*s,s*o.i,s*o.i);
    } ctx.restore();}
function respawn() {
    mode=1;
    deathTimer=0;
    p={...p1};
    setStartPos();
    p.x=p.startX;
    p.y=p.startY;
    p.super=false;
    jump=false;
    c.x=-Math.max(c.xMin,Math.min(c.xMax,p.x-s*10*12));
    c.y=-Math.max(c.yMin,Math.min(c.yMax,p.y-s*10*8));
    return 1;}
function collideX(o=6.7) {
    if (o==6.7) {
        p.x+=p.vx;
    } else {
    if (p.vx>0) {
        if (p.x+p.w*s+p.vx>o.x) {
            p.x=o.x-p.w*s;p.vx=0;
        } else p.x+=p.vx;
    } else {
        if (p.x+p.vx<o.x+(o.w||o.c)*s) {
            p.x=o.x+(o.w||o.c)*s;p.vx=0;
        } else p.x+=p.vx;
    }}}
function collideY(o=6.7) {
    if (o==6.7) {
        p.y+=p.vy;
    } else {
    if (p.vy>0) {
        if (p.y+p.h*s+p.vy>o.y) {
            p.y=o.y-p.h*s;p.vy=0;jump=true;coyote=true;if (animation.j>=0&&animation.l<0){animation.j=-1;animation.l=fCT;}
        } else {p.y+=p.vy;}
    } else {
        if (p.y+p.vy<o.y+o.c*s) {
            p.y=o.y+o.c*s;p.vy=0;
        } else {p.y+=p.vy;}
    }}}
function getCollision(id) {//when placing in  editore
    if (editCollision==0) return 0;
    if (id>=11&&id<=14||id>=62&&id<=65) return Math.max(1,editSize-2);
    if (id==82) return Math.max(1,editSize-4);
    if (id==80) return Math.max(1,editSize-6);
    if (editCollision==1) return editSize;
    if (id==10||id==31||id==81||id==25||id==51||id==53||id==57||id==59||id==60||id==66) return 0;
    return editSize;}
function getFromTileset(me) {//b= auto-tile id
    let Q,W,E,A,D,Z,X,C;
    let culd2=objects.filter(o=>o.l>=0&&o.l==me.l&&o.i==me.i&&o.x+o.i*s>=me.x&&o.x<=me.x+me.i*s&&o.y+o.i*s>=me.y&&o.y<=me.y+me.i*s);
    if (!culd2.some(o=>o.x+o.i*s==me.x&&o.y==me.y)) {A=true;}
    if (!culd2.some(o=>o.x==me.x+me.i*s&&o.y==me.y)) {D=true;}
    if (!culd2.some(o=>o.y+o.i*s==me.y&&o.x==me.x)) {W=true;} else {
        if (!A&&!culd2.some(o=>o.x+o.i*s==me.x&&o.y+o.i*s==me.y)) {
            Q=true;}
        if (!D&&!culd2.some(o=>o.x==me.x+me.i*s&&o.y+o.i*s==me.y)) {
            E=true;}}
    if (!culd2.some(o=>o.y==me.y+me.i*s&&o.x==me.x)) {
        X=true;} else {
        if (!A&&!culd2.some(o=>o.x+o.i*s==me.x&&o.y==me.y+me.i*s)) {
            Z=true;}
        if (!D&&!culd2.some(o=>o.x==me.x+me.i*s&&o.y==me.y+me.i*s)) {
            C=true;}}
        
    if (W) { if (A) { if (D) { if (X) {return [0,3]; } else  return [0,0]; } else { if (X) {return [1,3]; } else if (C) { return [1,0]; } else  return [8,0]; } } else if (D) { if (X) {    return [3,3]; } else if (Z) { return [3,0]; } else      return [11,0]; } else if (X) { return [2,3]; } else if (Z) { if (C) {    return [2,0]; } else      return [5,0]; } else if (C) { return [6,0]; } else          return [10,0]; } else if (X) { if (A) { if (D) {    return [0,2]; } else if (E) { return [1,2]; } else      return [8,3]; } else if (D) { if (Q) {    return [3,2]; } else      return [11,3]; } else if (Q) { if (E) {    return [2,2]; } else      return [5,3]; } else if (E) { return [6,3]; } else          return [9,3]; } else if (A) { if (D) {        return [0,1]; } else if (C) { if (E) {    return [1,1]; } else      return [4,2]; } else if (E) { return [4,1]; } else          return [8,1]; } else if (D) { if (Q) { if (Z) {    return [3,1]; } else      return [7,1]; } else if (Z) { return [7,2]; } else          return [11,2]; } else if (Q) { if (E) { if (Z) { if (C) {return [2,1]; } else  return [7,3]; } else if (C) { return [4,3]; } else      return [9,0]; } else if (Z) { if (C) {    return [7,0]; } else      return [8,2]; } else if (C) { return [9,1]; } else          return [5,1]; } else if (E) { if (C) {if (Z) {    return [4,0];} else      return [11,1];} else if (Z) { return [10,2];} else          return [6,1];} else if (Z) {if (C) {        return [10,3];} else          return [5,2];} else if (C) {     return [6,2];} else              return [9,2];}
function updateAutoTiles(X,Y,all=false) {
    let autoTiles=objects.filter(o=>(all||o.x<=X+o.i*s&&o.y<=Y+o.i*s&&o.x>=X-o.i*s&&o.y>=Y-o.i*s)&&(o.id>=20&&o.id<=22||o.id>=75&&o.id<=79||o.id==85));
    for (i=0;i<autoTiles.length;i++) {
        let O=autoTiles[i];
        let place=getFromTileset(O);
        O.n=place[0];
        O.m=place[1];
        if (O.id==85&&O.z==undefined) {
            O.z=0;
            if (notRandom(.15,O)&&(place[0]<5&&place[1]>1||place[1]>2&&place[0]>4&&place[0]<6||place[0]>7&&place[1]>2&&place[0]!=10)) O.z+=1;
            if (notRandom(.25,O,1)&&(place[0]<5&&(place[1]<1||place[1]>2)||place[1]<1&&place[0]>4&&place[0]<6||place[0]>7&&place[1]<1&&place[0]!=9)) O.z+=2
        }}
}
function drawAutoTile(me,tileset,tileSize=16) {
    let place=(me.l<0)?[0,3]:[me.n,me.m];
    ctx.drawImage(tileset,place[0]*tileSize,place[1]*tileSize,tileSize,tileSize,0,0,me.i*s,me.i*s);
    if (me.id==85){
        if (me.z==1||me.z==3) ctx.drawImage(dirtExtras,32*2,0,32,32,0,me.i*s,me.i*s,me.i*s);
        if (me.z>=2) ctx.drawImage(dirtExtras,Math.round((Math.PI*(me.y+me.x))%1)*32,0,32,32,0,-me.i*s,me.i*s,me.i*s);}}
function toEditMode() {
    if (!noEditLevel){
    unWin();
    mode=0;
    deathTimer=0;
    won=false;
    document.getElementById("Clear").innerHTML="Clear";
    objects=toObjects(previousObjects[0]); 
    document.getElementById("Mode").innerHTML="Play";
    document.querySelectorAll('.edit').forEach(e=>e.hidden=false);
    document.getElementById("timer").hidden=true;
    editSelection=[-1,-1];
    if (editObjId==0) document.getElementById("rgb").style.visibility='';
    others.length=0;
    let activatedCheckpointIndex=objects.findIndex(o=>o.id==51&&o.s==1);
    if (activatedCheckpointIndex>=0) objects[activatedCheckpointIndex].s=0;
    }}
function toPlayMode() {
    if (objects.length==0) return;
    fCT=0;
    keys=0;
    coins=0;
    mode=1;
    respawn();
    document.getElementById("Mode").innerHTML="Edit";
    document.getElementById("timer").innerHTML="0.00s";
    document.getElementById("timer").hidden=false;
    if (editObjId==0) document.getElementById("rgb").style.visibility='hidden';
    document.querySelectorAll('.edit').forEach(e=>e.hidden=true);
    objects=objects.map(o=>Object.fromEntries(Object.entries({...o,y:(o.id>=11&&o.id<=14||o.id>=62&&o.id<=65)?o.y+s:(o.id==80)?o.y+s*3:(o.id==82)?o.y+s*2:o.y,x:(o.id>=11&&o.id<=14||o.id>=62&&o.id<=65)?o.x+s:(o.id==80)?o.x+s*3:(o.id==82)?o.x+s*2:o.x}).filter(([_,v])=>v!==undefined)));
    c.z=c.zDefault;
    zoom=1/c.zDefault;
    editRotation=0;
    camAreas=filter(objects,o=>o.id==31);
    bounds.xMin=Math.min(...objects.map(function(o){return o.x}));
    bounds.yMin=Math.min(...objects.map(function(o){return o.y}))-canvas.height/2;
    bounds.xMax=Math.max(...objects.map(function(o){return o.x+(o.w||o.i)*s;}));
    bounds.yMax=Math.max(...objects.map(function(o){return o.y+o.i*s}));
    }
function toSave(o) {
    return o.map(obj=>{
        return Object.entries(obj)
            .map(([key, value])=>{
            key=(key=="x"&&value<0)?"h":(key=="y"&&value<0)?"k":key;
            key=(key=="id")?"q":key;
            if (key=="c"&&value==10||key=="i"&&value==obj.c||key=="s"&&value==0||key=="d"&&parseInt(value.join(''),2)==0){return null;}
            key=(key!="d"&&value%10==0)?key.toUpperCase():key;
            value=(key=="d")?parseInt(value.join(''),2):(value%10==0)?Math.abs(value)/10:Math.abs(value);
            return key+value;})
            .join("");
    }).join("-");}
function toObjects(str) {
    return str.split("-").map(segment => {
        let obj={};
        let matches=segment.match(/[a-zA-Z]\d+/g);
        matches.forEach(pair => {
            let key=(pair[0].toLowerCase()=="q")?"id":pair[0].toLowerCase();
            let value=(key=="d")?Number(pair[1]).toString(2).padStart(4,0).split('').map(Number):(pair[0]==pair[0].toUpperCase())?(Number(pair.slice(1))*10):Number(pair.slice(1));
            if (key=='h'){key='x';value*=-1;}
            if (key=='k'){key='y';value*=-1;}
            obj[key]=value;});
        if (!segment.includes("c")&&!segment.includes("C"))obj.c=10;
        if (!segment.includes("S")&&!segment.includes("s"))obj.s=0;
        if (!segment.includes("d"))obj.d=[0,0,0,0];
        if (!segment.includes("i")&&!segment.includes("I"))obj.i=obj.c;
        return obj;
    });}
function saveFile() {
    let save=saveSettings()+toSave(unSizedLevel());
    const blob = new Blob([save], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    let name=prompt("Level Name");
    if (!name||name.trim()==''){name='level'}
    a.download = name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);}
function loadFile() {
    const input = document.getElementById('fileInput');
    input.value = '';
    input.click();
    input.onchange = async () => {
    const file = input.files[0];
    if (!file) return;
    let p= await file.text();
    if (p.trim()!=''){
        try{
            loadSettings(p);
            objects=toObjects(p.substring(p.indexOf("–")+1));
            objects=sizedLevel();
            updateAutoTiles(6,7,true);
            if (toSave(objects)!=previousObjects[0]){
                previousObjects.unshift(toSave(objects));
                }
            toPlayMode();
            setMessage("Level Loaded","200,255,200");
        }catch(e){alert("Error Loading Level Data");}}
    };}
function saveSettings() {
    let sS="platformMaker";
    sS+="-"+backgroundColor.match(/\d+/g).join(",");
    sS+="-"+[p.vMax,p.jumpPower,p.w,p.h,16*c.zDefault,p.G_Max,s/p.gravity].join(",");
    return sS+"–";}
function loadSettings(S) {
    let lS=S.substring(14,S.indexOf("–"));
    if (S.substring(1,2)=="I") {noEditLevel=true;toPlayMode();}
    backgroundColor="rgb("+lS.substring(0,lS.indexOf("-"))+")";
    lS=lS.substring(lS.indexOf("-")+1);
    p1.vMax=        Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1); 
    p1.jumpPower=   Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1);
    p1.w=           Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1);
    p1.h=           Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1);
    c.zDefault=     Number(lS.substring(0,lS.indexOf(",")))/16;lS=lS.substring(lS.indexOf(",")+1);
    p1.G_Max=       Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1);
    p1.gravity=   s/Number(lS);
    p={...p1};
    }
function unWin() {
    document.getElementById("win").hidden=true;
    won=false;}
function updateBD(){
    document.getElementById("bD0").innerHTML=(editBlockData[0]==1)?'Culling: No':'Culling: Yes';
    if (editBlockData[editBDId]==1) {
        document.getElementById('bDToggle').innerHTML='Yes';
    } else document.getElementById('bDToggle').innerHTML='No';
    if (editBDId==1) document.getElementById('BlockData').innerHTML='Pushable';
    if (editBDId==2) document.getElementById('BlockData').innerHTML='Powerup';
    if (editBDId==3) document.getElementById('BlockData').innerHTML='Breakable';}
function unSizedLevel(){
    return objects.map(o=>Object.fromEntries(Object.entries({...o,x:o.x/s,y:o.y/s,n:undefined,m:undefined,z:undefined}).filter(([_,V])=>V!==undefined)));
}
function sizedLevel(){
    return objects.map(o=>Object.fromEntries(Object.entries({...o,x:o.x*s,y:o.y*s}).filter(([_,V])=>V!==undefined)));
}      
function damagePlayer() {
    if (p.Super) { 
        p.h=p1.h;
        p.w=p1.w;
        p.jumpPower=p1.jumpPower;
        p.x+=2*s;
        p.y+=6*s; 
        p.Super=false;
        p.invincible=90;
    } else deathTimer=1;}
let crouch=0;
function drawJerry(jerry) {
    ctx.save();
    if (p.vx!=0) animation.d=Math.sign(p.vx);
    ctx.translate(jerry.x+c.x-Math.min(animation.d,0)*4*s,jerry.y+c.y);
    ctx.scale(animation.d,1);
    if (!(fCT-animation.j<14)&&(!(jerry.vy==jerry.gravity&&(p.vx!=0&&(keyDPressed||keyRightPressed||keyAPressed||keyLeftPressed)))||animation.j>-1&&jerry.vy==jerry.gravity)&&!(fCT-animation.l<7&&animation.l>0)&&p.crouching) {
        ctx.drawImage(jerryHimself,0,17,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
    } else if (jerry.vy!=jerry.gravity) {
        if (jerry.vy<-s){
            if (fCT-animation.j<4) {ctx.drawImage(jerryHimself,0,8,8,8,-3*s,0,s*10,2*s+s*jerry.h);
            } else if (fCT-animation.j<8) {ctx.drawImage(jerryHimself,8,8,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
            } else {ctx.drawImage(jerryHimself,16,8,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);}
        } else if (jerry.vy<-s*.25) {ctx.drawImage(jerryHimself,24,17,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
        } else if (jerry.vy<s*1.25) {ctx.drawImage(jerryHimself,24,8,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
        } else if (jerry.vy<s*2) {ctx.drawImage(jerryHimself,16,16,8,9,-3*s,-3*s,s*10,2.8*s+s*jerry.h);
        } else if ((fCT-animation.j)%21<7) {ctx.drawImage(jerryHimself,8,8,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
        } else if ((fCT-animation.j)%21<14) {ctx.drawImage(jerryHimself,24,8,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
        } else               {ctx.drawImage(jerryHimself,16,16,8,9,-3*s,-3*s,s*10,2.8*s+s*jerry.h);}
    } else if (jerry.vx!=0&&fCT-animation.l<3&&animation.l>0) {
        ctx.drawImage(jerryHimself,8,16,8,9,-3*s,-2*s,s*10,3*s+s*jerry.h);
    } else if (jerry.vx!=0&&(keyDPressed||keyRightPressed||keyAPressed||keyLeftPressed)) {
        if (animation.w<0) animation.w=fCT;
        if (p.crouching) {ctx.drawImage(jerryHimself,Math.floor((fCT-animation.w)%28/7)*8,25,8,7,-3*s,-.75*s,s*10,.75*s+s*jerry.h);
        } else ctx.drawImage(jerryHimself,Math.floor((fCT-animation.w)%28/7)*8,0,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
    } else {
        animation.w=-1;
        if (fCT-animation.l<2&&animation.l>0) {ctx.drawImage(jerryHimself,24,17,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
        } else if (fCT-animation.l<7&&animation.l>0) {ctx.drawImage(jerryHimself,8,16,8,9,-3*s,-2*s,s*10,3*s+s*jerry.h);
        } else {
            animation.l=-1;
            ctx.drawImage(jerryHimself,24,17,8,8,-3*s,-2*s,s*10,2*s+s*jerry.h);
        }   
    }
    
    ctx.restore();}
function setStartPos() {
    cI=objects.findIndex(o=>o.id==51&&o.s%2==1);
    if(cI!=-1) {
        p.startX=objects[cI].x+objects[cI].i*s/2-p.w*s/2;
        p.startY=objects[cI].y+objects[cI].i*s/2-p.h*s/2;
    } else {
        let sP = objects.filter(o=>o.id==25)[0];
        if (sP) {
            p.startX=sP.x+sP.i/2*s-s*p.w/2;
            p.startY=sP.y+sP.i/2*s-s*p.h/2;} else {p.startX=0;p.startY=0;}}}
function overlapping(o2,o1){
    return (o1.x+o1.c*s>o2.x&&o1.x<o2.x+(o2.w||o2.c)*s&&o1.y+o1.c*s>o2.y&&o1.y<o2.y+(o2.h||o2.c)*s);
}
function setMessage(text,color,time=99){messages.push({text:text,color:color,time:time});}
function outOfBounds(o) {
    return (o.x+(o.w||o.i)*s<bounds.xMin||o.x>bounds.xMax||o.y+(o.h||o.i)*s<bounds.yMin||o.y>bounds.yMax);
}

let won=false;
let fCT=0;//total frames
let noEditLevel=false;
let mode=1;
let screenHeightBlocks=16;//blocks (10px) that fit height of canvas
let s=canvas.height/screenHeightBlocks/10;//size of one pixel
let p={x:0,y:0,vx:2,vy:0,vMax:1,jumpPower:2.5,w:4,h:8,startX:0,startY:0,invincible:0,Super:0,gravity:s/8,G_Max:4,crouching:false};
let p1={...p};
let fat={a:0,b:0,c:0};//screen shake when character is on shrooms
let animation={j:0,l:0,w:0,d:1}//jump time, land time, walk time, direction facing
let c={x:0,y:0,xMin:0,xMax:0,yMin:0,yMax:0,vx:0,vy:0,x2:0,y2:0,zDefault:1,z:1};//camera pos
let coins=0;
let keys=0;
let deathTimer=0;
let weapon=0;
let weaponCooldown=0;
let portalCooldown=0;
let jump=false;//if can jump
let coyote=false;
let channels=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let editObjId=0;//for level editor
let editCollision=2;//0: forced no, 1: forced yes, 2: auto (getCollision(id))
let editSize=10;//size of block image
let editLayer=1;
let editGridSize=10;
let editState=0;
let editChannel=0;
let editRotation=0;
let editBlockData=[0,0,0,0];//cull, push,powerup,break
let editBDId=1;//break,move,powerup
let editBlockColor="#000000";
let backgroundColor="rgb(141,255,163)";
let objects=[];
let others=[];
let messages=[];
objects=toObjects("X0Y15q54l1-X1Y15q54l1-X2Y15q54l1-X3Y15q54l1-X4Y15q54l1-X5Y15q54l1-X6Y15q54l1-X7Y15q54l1-X8Y15q54l1-X9Y15q54l1-X10Y15q54l1-X11Y15q54l1-X12Y15q54l1-X13Y15q54l1-X14Y15q54l1-X15Y15q54l1-X16Y15q54l1-X17Y15q54l1-X18Y15q54l1-X19Y15q54l1-X20Y15q54l1-X21Y15q54l1-X22Y15q54l1-X23Y15q54l1-X0Y0q54l1-X1Y0q54l1-X2Y0q54l1-X3Y0q54l1-X4Y0q54l1-X5Y0q54l1-X6Y0q54l1-X7Y0q54l1-X8Y0q54l1-X9Y0q54l1-X10Y0q54l1-X11Y0q54l1-X12Y0q54l1-X13Y0q54l1-X14Y0q54l1-X15Y0q54l1-X16Y0q54l1-X17Y0q54l1-X18Y0q54l1-X19Y0q54l1-X20Y0q54l1-X21Y0q54l1-X22Y0q54l1-X23Y0q54l1");
objects=sizedLevel();
let previousObjects=[toSave(objects)];
let layers=Array.from({ length: 100 }, () => []);
let camAreas=filter(objects, o=>o.id==31);
let editSelection=[-1,-1];
let bounds={};
/*let url = new URL(window.location.toLocaleString()).searchParams;let urlObjs=url.get('s');
if (urlObjs) {try{loadSettings(urlObjs);objects=toObjects(urlObjs.substring(urlObjs.indexOf("–")+1));objects=sizedLevel();if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));toPlayMode();}}catch(e){alert("Error Loading Level Data");}
} else window.location.replace('https://platform-maker-17774376.codehs.me/index.html?s=platformMaker-141,255,163-1.5,4,6,8%E2%80%93H9Y11q54C1s4I1L0d0-H8Y11q54C1s4I1L0d1000-H7Y11q54C1s4I1L0d0-H6Y11q54C1s4I1L0d0-H5Y11q54C1s4I1L0d0-H4Y11q54C1s4I1L0d0-H3Y11q54C1s4I1L0d0-H2Y11q54C1s4I1L0d0-H1Y11q54C1s4I1L0d0-X0Y11q54C1s4I1L0d0-X1Y11q54C1s4I1L0d0-X2Y11q54C1s4I1L0d0-X3Y11q54C1s4I1L0d0-X4Y11q54C1s4I1L0d0-X6Y11q54C1s4I1L0d0-X7Y11q54C1s4I1L0d0-X8Y11q54C1s4I1L0d0-X9Y11q54C1s4I1L0d0-X10Y11q54C1s4I1L0d0-X11Y11q54C1s4I1L0d0-X12Y11q54C1s4I1L0d0-X13Y11q54C1s4I1L0d0-X14Y11q54C1s4I1L0d0-X15Y11q54C1s4I1L0d0-X16Y11q54C1s4I1L0d0-X17Y11q54C1s4I1L0d0-H9Y10q54C1s4I1L0d0-H9Y9q54C1s4I1L0d0-H9Y8q54C1s4I1L0d0-H9Y7q54C1s4I1L0d0-H9Y6q54C1s4I1L0d0-H9Y5q54C1s4I1L0d0-H9Y4q54C1s4I1L0d0-H9Y3q54C1s4I1L0d0-H9Y2q54C1s4I1L0d0-H9Y1q54C1s4I1L0d0-H9Y0q54C1s4I1L0d0-H9K1q54C1s4I1L0d0-H9K2q54C1s4I1L0d0-H9K3q54C1s4I1L0d0-H9K4q54C1s4I1L0d0-H9K5q54C1s4I1L0d0-H9K6q54C1s4I1L0d0-H9K7q54C1s4I1L0d0-H9K8q54C1s4I1L0d0-H9K9q54C1s8I1L0d0-X17Y10q54C1s4I1L0d0-X17Y9q54C1s4I1L0d0-X17Y8q54C1s4I1L0d0-X17Y7q54C1s4I1L0d0-X17Y6q54C1s4I1L0d0-X...7q54C1s4I1L0d0-X2Y6q54C1s4I1L0d0-X2Y5q54C1s4I1L0d0-X3Y10q53C0s4I1L0d0-H6Y7q25C0s8I1L0d0-H9K10q54C1s8I1L0d0-H9K11q54C1s8I1L0d0-H9K12q54C1s8I1L0d0-H9K13q54C1s8I1L0d0-H9K14q54C1s8I1L0d0-H9K15q54C1s8I1L0d0-H9K16q54C1s8I1L0d0-H9K17q54C1s8I1L0d0-H9K18q54C1s8I1L0d0-H9K19q54C1s8I1L0d0-H9K20q54C1s8I1L0d0-H8K20q54C1s8I1L0d0-H7K20q54C1s8I1L0d0-H6K20q54C1s8I1L0d0-H5K20q54C1s8I1L0d0-H4K20q54C1s8I1L0d0-H3K20q54C1s8I1L0d0-H2K20q54C1s8I1L0d0-H1K20q54C1s8I1L0d0-X0K20q54C1s8I1L0d0-X1K20q54C1s8I1L0d0-X2K20q54C1s8I1L0d0-X3K20q54C1s8I1L0d0-X4K20q54C1s8I1L0d0-X5K20q54C1s8I1L0d0-X6K20q54C1s8I1L0d0-X7K20q54C1s8I1L0d0-X8K20q54C1s8I1L0d0-X9K20q54C1s8I1L0d0-X10K20q54C1s8I1L0d0-X11K20q54C1s8I1L0d0-X12K20q54C1s8I1L0d0-X13K20q54C1s8I1L0d0-X14K20q54C1s8I1L0d0-X15K20q54C1s8I1L0d0-X17K12q54C1s8I1L0d0-X17K13q54C1s8I1L0d0-X17K14q54C1s8I1L0d0-X17K15q54C1s8I1L0d0-X17K16q54C1s8I1L0d0-X17K17q54C1s8I1L0d0-X17K18q54C1s8I1L0d0-X17K19q54C1s8I1L0d0-X17K20q54C1s8I1L0d0-X16K20q54C1s8I1L0d0-X17K10q54C1s8I1L0d0-X17K11q54C1s8I1L0d0');
*/
toPlayMode();
//main loop
function t() {

if (keyFPressed){document.getElementById("debug").innerHTML='FPS: '+fps;}else{document.getElementById("debug").innerHTML='';}
if (won) {document.getElementById("win").hidden=false;noEditLevel=false;}

//zoom
canvas.height=canvasHeight*c.z;
canvas.width=canvas.height*1.5;
ctx.imageSmoothingEnabled=false;

ctx.fillStyle=backgroundColor;
ctx.fillRect(0,0,canvas.width,canvas.height);

//culling
let objCuld=filter(objects,o=>o.d[0]==1||o.x>=-c.x-s*10-o.i*s&&o.x<=-c.x+canvas.width+o.i*s&&o.y>=-c.y-s*10-o.i*s&&o.y<=-c.y+canvas.height+s*10+o.i*s);

if (mode==1&&!won&&deathTimer==0) {
    if (keyGPressed){weapon=-(weapon-1);keyGPressed=false;}
    if (keyRPressed) {if (keyShiftPressed){toEditMode();toPlayMode();} else respawn();}
    document.getElementById("timer").innerHTML=(Math.floor(fCT/.6)%10==0)?Math.floor(fCT/.6)/100+"0s":Math.floor(fCT/.6)/100+"s";
    
    //movement inputs
    if (keyAPressed||keyLeftPressed){
        p.vx=Math.max(-p.vMax*s,Math.min(-s,p.vx-s/2));
    } else if (keyDPressed||keyRightPressed){
        p.vx=Math.min(p.vMax*s,Math.max(s,p.vx+s/2));
    } else p.vx=0;
    if (jump&&(keyWPressed||keyUpPressed||keySpacePressed)) {
        p.vy=-s*p.jumpPower;
        animation.l=-1;animation.j=fCT;
    }
    if (!coyote) jump=false;
    coyote=false;
    
    //more culling
    for (let i=0;i<camAreas.length;i++) {
        let O=camAreas[i]; 
        if (p.x+p.w*s/2>=O.x&&p.x+p.w*s/2<O.x+O.w*s&&p.y+p.h*s/2>O.y&&p.y+p.h*s/2<O.y+O.i*s) {
            objCuld=filter(objects,o=>o.d[0]==1||o.x+o.i*s>=O.x&&o.x<=O.x+O.w*s&&o.y+o.i*s>=O.y&&o.y<=O.y+O.i*s);
            break;}}
            
    //crouch player
    if (!p.crouching&&(keySPressed||keyDownPressed)) {p.y+=crouch*s;p.h-=crouch;p.crouching=true;} else if (!(keySPressed||keyDownPressed)&&p.crouching&&!objects.some(o=>o.c!=0&&overlapping({x:p.x,y:p.y-crouch*s,h:p.h,w:p.w},o))){p.h+=crouch;p.y-=crouch*s;p.crouching=false;}
    
    //fat jump
    if (p.w*p.h>120){
    if (jump){if (fat.b==0){fat.a=Math.floor(Math.min(40,15+(p.w/5)**4+2*(fat.c/s)**1.6));fat.b=1;}
    }else fat.b=0;
    if (fat.a>0){fat.a-=1;}
    if (!jump){fat.c=Math.abs(p.vy);}
    c.x2=(fat.a/40)**2*fat.c*3/5*Math.cos(2*fCT*Math.sign(fat.a)/(40.5-fat.a)*30)/(42-fat.a)**0.6*(1+p.w*p.h/500);
    c.y2=(fat.a/40)**2*fat.c*Math.sin(fCT*Math.sign(fat.a)/(40.5-fat.a)*30)/(42-fat.a)**0.6*(1+p.w*p.h/500);}
    
    //bullet movement
    let bullets=others.filter(o=>o.id<0);
    for(let i=0;i<bullets.length;i++) {
        let O=bullets[i];
        O.x+=O.vx;O.y+=O.vy;
        
        let por1=objCuld.filter(o=>o.id==59&&o.x<O.x+O.i*s&&o.x+o.i*s>O.x&&o.y<O.y+O.i*s&&o.y+o.i*s>O.y)[0];
        if (por1){let portle=objCuld.filter(o=>o.id==59&&por1.s-por1.s%4==o.s-o.s%4&&por1!=o)[0];
        if (portle&&!O.inportal) {
            O.x=portle.x+portle.i*s/2-O.i*s/2;
            O.y=portle.y+portle.i*s/2-O.i*s/2;
            }O.inportal=true;} else O.inportal=false;
        if (some(objCuld,o=>!(o.id>=11&&o.id<=12||o.id>=63&&o.id<=65||o.id>=1000||o.d[3]==1)&&o.c!=0&&O.x<o.x+s*o.c&&O.y<o.y+o.c*s&&O.x+O.i*s>o.x&&O.y+O.i*s>o.y&&o.id!=27&&o.id!=28&&o.id!=30)
        ||outOfBounds(O)
        ||camAreas.some(o=>p.x+p.w*s/2>=o.x&&p.x+p.w*s/2<o.x+o.w*s&&p.y+p.h*s/2>o.y&&p.y+p.h*s/2<o.y+o.i*s)&&O.x<s*10+Math.min(...objCuld.map(function(o){return o.x}))
        ||camAreas.some(o=>p.x+p.w*s/2>=o.x&&p.x+p.w*s/2<o.x+o.w*s&&p.y+p.h*s/2>o.y&&p.y+p.h*s/2<o.y+o.i*s)&&O.y<s*10+Math.min(...objCuld.map(function(o){return o.y}))
        ||camAreas.some(o=>p.x+p.w*s/2>=o.x&&p.x+p.w*s/2<o.x+o.w*s&&p.y+p.h*s/2>o.y&&p.y+p.h*s/2<o.y+o.i*s)&&O.x>Math.max(...objCuld.map(function(o){return o.x}))
        ||camAreas.some(o=>p.x+p.w*s/2>=o.x&&p.x+p.w*s/2<o.x+o.w*s&&p.y+p.h*s/2>o.y&&p.y+p.h*s/2<o.y+o.i*s)&&O.y>Math.max(...objCuld.map(function(o){return o.y}))){
            others=filter(others,o=>o!=O);}
        if (p.invincible==0&&O.x<p.x+s*p.w&&O.y<p.y+p.h*s&&O.x+O.i*s>p.x&&O.y+O.i*s>p.y) {others=filter(others,o=>o!=O);damagePlayer();}
        }
    
    //Lock Detection (occurs before colision)
    let lockeds=filter(objCuld,o=>o.id==61);
    for(let i=0;i<lockeds.length;i++) {
        let O=lockeds[i];
        if (keys>0&&(O.x==p.x+p.w*s&&O.y<p.y+s*p.h&&O.y+s*O.c>p.y||O.x+O.c*s==p.x&&O.y<p.y+s*p.h&&O.y+s*O.c>p.y||O.y==p.y+p.h*s&&O.x<p.x+s*p.w&&O.x+s*O.c>p.x||O.y+O.c*s==p.y&&O.x<p.x+s*p.w&&O.x+s*O.c>p.x)) {
            objects=filter(objects,o=>o!=O);
            objCuld=filter(objCuld,o=>o!=O);
            keys-=1;}}
    
    //pushable blocks
    let pushableObjs=filter(objCuld,o=>o.d[1]==1);
    for(let i=0;i<pushableObjs.length;i++) {
        let O=pushableObjs[i];
        if (O.s==0) {
            if (O.x==p.x+p.w*s&&O.y<p.y+s*p.h&&O.y+s*O.c>p.y&&!some(objCuld,o=>o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&o.x==O.x+O.c*s&&o.id!=28&&o.id!=29&&o.id!=27)) {O.x+=s;O.s=3;continue;}
            if (O.x+O.c*s==p.x&&O.y<p.y+s*p.h&&O.y+s*O.c>p.y&&!some(objCuld,o=>o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&O.x==o.x+o.c*s&&o.id!=28&&o.id!=29&&o.id!=27)) {O.x-=s;O.s=3;continue;}
            if (O.y==p.y+p.h*s&&O.x<p.x+s*p.w&&O.x+s*O.c>p.x&&!some(objCuld,o=>o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&o.y==O.y+O.c*s&&o.id!=28&&o.id!=29&&o.id!=27)) {O.y+=s;O.s=3;continue;}
            if (O.y+O.c*s==p.y&&O.x<p.x+s*p.w&&O.x+s*O.c>p.x&&!some(objCuld,o=>o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&O.y==o.y+o.c*s&&o.id!=28&&o.id!=29&&o.id!=27)) {O.y-=s;O.s=3;continue;}
        } else O.s=Math.max(0,O.s-1);}
    
    //moving blocks
    let movingBlocks=filter(objCuld,o=>o.id==68||o.id>=83&&o.id<=84);
    for(let i=0;i<movingBlocks.length;i++) {
        let O=movingBlocks[i];
        if (O.id==68) {
            O.vy=(O.s%2==1)?-s*.33:s*.33;
            let yC=filter(objCuld,o=>o.x+o.c*s>O.x&&o.x<O.x+O.c*s&&o.y>=O.y-o.c*s+O.vy&&o.y<=O.y+O.c*s+O.vy&&O!=o&&o.id!=28&&o.id!=29&&o.id!=27&&!overlapping(O,o)).sort((a,b)=>(O.vy<0)?(b.y+b.c*s-a.y-a.c*s):(a.y-b.y))[0];
            if (yC) {
                O.y=(O.vy<0)?yC.y+yC.c*s:yC.y-O.c*s;
            } else if (O.y+O.c*s+O.vy>=p.y&&O.y+O.vy<=p.y+p.h*s&&O.x<p.x+p.w*s&O.x+O.c*s>p.x) {
                O.y=(O.vy<0)?p.y+p.h*s:p.y-O.c*s;
            } else O.y+=O.vy;
        } else if (O.id>=83&&O.id<=84) {
            O.vx=(O.s%2==1)?-s*.25:s*.25;
            let xC=filter(objCuld,o=>o.y+o.c*s>O.y&&o.y<O.y+O.c*s&&o.x>=O.x-o.c*s+O.vx&&o.x<=O.x+O.c*s+O.vx&&O!=o&&o.id!=28&&o.id!=29&&o.id!=27&&!overlapping(O,o)).sort((a,b)=>(O.vx<0)?(b.x+b.c*s-a.x-a.c*s):(a.x-b.x))[0];
            if (xC) {
                O.x=(O.vx<0)?xC.x+xC.c*s:xC.x-O.c*s;O.s=(O.s%4<2)?O.s+2:O.s-2;
            } else if (O.x+O.c*s+O.vx>=p.x&&O.x+O.vx<=p.x+p.w*s&&O.y<p.y+p.h*s&O.y+O.c*s>p.y) {
                O.x=(O.vx<0)?p.x+p.w*s:p.x-O.c*s;
            } else O.x+=O.vx;
            if (O.x+O.c*s+O.vx>=p.x&&O.x+O.vx<=p.x+p.w*s&&O.y==p.y+p.h*s) p.vx+=O.vx;
        }
        
        let por1=objCuld.filter(o=>o.id==59&&o.x<O.x+O.c*s&&o.x+o.i*s>O.x&&o.y<O.y+O.c*s&&o.y+o.i*s>O.y)[0];
        if (por1){let portle=objCuld.filter(o=>o.id==59&&por1.s-por1.s%4==o.s-o.s%4&&por1!=o)[0];
        if (portle&&!O.inportal) {
            O.x=portle.x+portle.i*s/2-O.i*s/2;
            O.y=portle.y+portle.i*s/2-O.i*s/2;
            }O.inportal=true;} else if (O.inportal)O.inportal=false;}

    //enemy movement
    let movingEnemies=filter(objCuld,o=>o.id==11||o.id==12||o.id==63||o.id==64||o.id==65);
    for(let i=0;i<movingEnemies.length;i++) {
        let O=movingEnemies[i];
        if (O.id==64){
            O.vy=(O.s%2==0)?s*.8:-s*.8;
            let yC=filter(objCuld,o=>o.x+o.c*s>O.x&&o.x<O.x+O.c*s&&o.y+o.c*s>=O.y+O.vy&&o.y<=O.y+O.c*s+O.vy&&O!=o&&o.id!=28&&o.id!=29&&o.id!=30&&!overlapping(o,O)).sort((a,b)=>(O.vy<0)?(b.y+b.c*s-a.y-a.c*s):(a.y-b.y))[0];
            if (yC) {
                O.y=(O.vy<0)?yC.y+yC.c*s:yC.y-O.c*s;
                O.s=-(O.s-1);
            } else O.y+=O.vy;
        } else if (O.id==63){
            O.vx=(O.s%2==0)?s*.8:-s*.8;
            let xC=filter(objCuld,o=>o.y+o.c*s>O.y&&o.y<O.y+O.c*s&&o.x+o.c*s>=O.x+O.vx&&o.x<=O.x+O.c*s+O.vx&&O!=o&&o.id!=28&&o.id!=29&&o.id!=30&&!overlapping(o,O)).sort((a,b)=>(O.vx<0)?(b.x+b.c*s-a.x-a.c*s):(a.x-b.x))[0];
            if (xC) {
                O.x=(O.vx<0)?xC.x+xC.c*s:xC.x-O.c*s;
                O.s=-(O.s-1);
            } else O.x+=O.vx;
        } else if (O.id!=65) {
            if (!O.vy)O.vy=0;if (!O.vx)O.vx=s*.35;
            let yC=filter(objCuld,o=>o.x+o.c*s>O.x&&o.x<O.x+O.c*s&&o.y>=O.y+O.c*s&&o.y<=O.y+O.c*s+O.vy&&O!=o&&o.id!=28&&o.id!=29&&o.id!=30&&!overlapping(o,O)).sort((a,b)=>(O.vy<0)?(b.y+b.c*s-a.y-a.c*s):(a.y-b.y))[0];
            if (yC) {
                O.y=(O.vy<0)?yC.y+yC.c*s:yC.y-O.c*s;O.vy=0;
            } else O.y+=O.vy;
            O.vy+=s/4;
            let xC=filter(objCuld,o=>o.y+o.c*s>O.y&&o.y<O.y+O.c*s&&o.x+o.c*s>=O.x+O.vx&&o.x<=O.x+O.c*s+O.vx&&O!=o&&o.id!=28&&o.id!=29&&o.id!=30&&!overlapping(o,O)).sort((a,b)=>(O.vx<0)?(b.x+b.c*s-a.x-a.c*s):(a.x-b.x))[0];
            if (xC) {
                O.x=(O.vx<0)?xC.x+xC.c*s:xC.x-O.c*s;
                O.vx*=-1;
            } else O.x+=O.vx;}
        //teleport through portals
        let por1=objCuld.filter(o=>o.id==59&&o.x<O.x+O.c*s&&o.x+o.i*s>O.x&&o.y<O.y+O.c*s&&o.y+o.i*s>O.y)[0];
        if (por1){let portle=objCuld.filter(o=>o.id==59&&por1.s-por1.s%4==o.s-o.s%4&&por1!=o)[0];
        if (portle&&!O.inportal) {
            O.x=portle.x+portle.i*s/2-O.i*s/2;
            O.y=portle.y+portle.i*s/2-O.i*s/2;
            }O.inportal=true;} else if (O.inportal)O.inportal=false;
        //kill
        if (p.invincible>0&&O.x-s<p.x+s*p.w&&O.x-s+s*O.i>p.x&&O.y-s<p.y+p.h*s&&O.y-s+s*O.i>p.y
        ||outOfBounds(O)
        ||some(others,o=>o.x<O.x+s*O.c&&o.y<O.y+O.c*s&&(o.id==-1&&o.x+o.i*s>O.x&&o.y+o.i*s>O.y
        ||o.id==69.1&&o.x+o.i/8*6*s>O.x&&o.y+o.i/8*2*s>O.y||o.id==69.2&&o.x+o.i/8*2*s>O.x&&o.y+o.i/8*6*s>O.y))
        ||objCuld.some(o=>o.id==1201&&overlapping(o,O)&&o.vy!=0)) {
            O.id*=100;O.vy=-2*s;}
        }
    
    //dead enemies
    let deadEnemies=filter(objCuld,o=>o.id>=1000&&o.id%100==0);
    for(let i=0;i<deadEnemies.length;i++) {
        let O=deadEnemies[i];
        if (!O.vy) O.vy=0;
        O.y+=O.vy;
        O.x+=(O.s%4<2)?-s/2:s/2;
        O.vy+=s/4;
        let por1=objCuld.filter(o=>o.id==59&&o.x<O.x+O.c*s&&o.x+o.i*s>O.x&&o.y<O.y+O.c*s&&o.y+o.i*s>O.y)[0];
        if (por1){let portle=objCuld.filter(o=>o.id==59&&por1.s-por1.s%4==o.s-o.s%4&&por1!=o)[0];
        if (portle&&!O.inportal) {
            O.x=portle.x+portle.i*s/2-O.i*s/2;
            O.y=portle.y+portle.i*s/2-O.i*s/2;
            }O.inportal=true;} else if (O.inportal)O.inportal=false;
        if (outOfBounds(O)){
            objects=filter(objects,o=>o!=O);}}
    
    //stompped goomba
    let deadGoombas=filter(objCuld,o=>o.id==1101);
    for(let i=0;i<deadGoombas.length;i++) {
        let O=deadGoombas[i];
        O.s+=.1;
        if (O.s>2.8) objects=filter(objects,o=>o!=O);}
    
    //mario shells
    let deadKTs=filter(objCuld,o=>o.id==1201);
    for(let i=0;i<deadKTs.length;i++) {
        let O=deadKTs[i];
            if (!O.vy) O.vy=0;
            let yC2=filter(objCuld,o=>o.x+o.c*s>O.x&&o.x<O.x+O.c*s&&o.y>=O.y+s*O.c&&o.y<=O.y+s*O.c+O.vy&&O!=o&&o.id!=28&&o.id!=29&&o.id!=30&&!overlapping(o,O)).sort((a,b)=>(O.vy<0)?(b.y+b.c*s-a.y-a.c*s):(a.y-b.y))[0];
            if (yC2) {
                O.y=yC2.y-O.c*s;O.vy=0;
            } else O.y+=O.vy;
            O.vy+=s/4;
            let xC=filter(objCuld,o=>o.y+o.c*s>O.y&&o.y<O.y+O.c*s&&(O.vx>0&&o.x>=O.x+O.c*s&&o.x<O.x+O.c*s+O.vx||O.vx<0&&o.x+o.c*s<=O.x&&o.x+o.c*s>O.x+O.vx)&&o.id!=28&&o.id!=29&&o.id!=30&&o.id!=11&&o.id!=12&&o.id!=63&&o.id!=64&&o.id!=65&&!overlapping(o,O)).sort((a,b)=>(O.vx<0)?(b.x+b.c*s-a.x-a.c*s):-(b.x-a.x))[0];
            if (O.vx>0) {if (xC) {O.x=xC.x-O.c*s;O.vx*=-1;} else {O.x+=O.vx;}
            } else if (O.vx<0) {if (xC) {O.x=xC.x+xC.c*s;O.vx*=-1;} else {O.x+=O.vx;}
            }
            if (O.vx==0){
                if (p.y+p.h*s>=O.y&&p.y<O.y+O.c*s&&p.x+p.w*s>O.x-s&&p.x<O.x+O.c*s+s){
                    if (p.x+p.w*s/2<=O.x+O.c*s/2){
                        O.vx=1.6*s;
                    } else O.vx=-1.6*s;
                    if (p.y+p.h*s<=O.y) p.vy=-p.gravity*10;}
            } else if (O.x<p.x+p.w*s&&O.x+O.c*s>p.x&&p.y+p.h*s==O.y) {O.vx=0;p.vy=-p.gravity*10;}
            
            let por1=objCuld.filter(o=>o.id==59&&o.x<O.x+O.c*s&&o.x+o.i*s>O.x&&o.y<O.y+O.c*s&&o.y+o.i*s>O.y)[0];
            if (por1){let portle=objCuld.filter(o=>o.id==59&&por1.s-por1.s%4==o.s-o.s%4&&por1!=o)[0];
            if (portle&&!O.inportal) {
                O.x=portle.x+portle.i*s/2-O.i*s/2;
                O.y=portle.y+portle.i*s/2-O.i*s/2;
                }O.inportal=true;} else if (O.inportal)O.inportal=false;
            if (p.invincible>0&&O.x-s<p.x+s*p.w&&O.x-s+s*O.i>p.x&&O.y-s<p.y+p.h*s&&O.y-s+s*O.i>p.y||some(others,o=>o.x<O.x+s*O.c&&o.y<O.y+O.c*s&&(o.id==-1&&o.x+o.i*s>O.x&&o.y+o.i*s>O.y||o.id==69.1&&o.x+o.i/8*6*s>O.x&&o.y+o.i/8*2*s>O.y||o.id==69.2&&o.x+o.i/8*2*s>O.x&&o.y+o.i/8*6*s>O.y))) {O.id=1200;O.vy=-2*s;}
            if (p.invincible==0&&O.x<p.x+s*p.w&&O.x+s*O.c>p.x&&O.y<p.y+p.h*s&&O.y+s*O.c>p.y)deathTimer=1;
            if (outOfBounds(O)){
                objects=filter(objects,o=>o!=O);
                objCuld=filter(objCuld,o=>o!=O);}
            }
    
    //moving powerups
    let movingPowerups=filter(objCuld,o=>o.id==13||o.id==14);
    for(let i=0;i<movingPowerups.length;i++) {
        let O=movingPowerups[i];
        if (!O.vy) O.vy=0;
        let yC=filter(objCuld,o=>o.x+o.c*s>O.x&&o.x<O.x+O.c*s&&o.y>=O.y-o.c*s+O.vy&&o.y<=O.y+s*O.c+O.vy&&O!=o&&o.id!=28&&o.id!=29&&o.id!=27&&!overlapping(o,O)).sort((a,b)=>(O.vy<0)?(b.y+b.c*s-a.y-a.c*s):(a.y-b.y))[0];
        if (yC) {
            O.y=(O.vy<0)?yC.y+yC.c*s:yC.y-O.c*s;
            if (O.vy>0&&O.id==13) {O.vy=-s*4;} else O.vy=0;
        } else {
            O.y+=O.vy;}
        O.vy+=(O.id==13)?s/6:s/4;
        O.vx=(O.s%2==0)?s:-s;
        let xC=filter(objCuld,o=>o.y+o.c*s>O.y&&o.y<O.y+O.c*s&&o.x+o.c*s>=O.x+O.vx&&o.x<=O.x+O.c*s+O.vx&&O!=o&&o.id!=28&&o.id!=29&&o.id!=27&&!overlapping(o,O)).sort((a,b)=>(O.vx<0)?(b.x+b.c*s-a.x-a.c*s):(a.x-b.x))[0];
        if (xC) {
            O.x=(O.vx<0)?xC.x+xC.c*s:xC.x-O.c*s;
            O.s=-(O.s-1);
        } else O.x+=O.vx;
        if (outOfBounds(O)){
            objects=filter(objects,o=>o!=O);
            objCuld=filter(objCuld,o=>o!=O);
        }
    }
    
    //lasers
    let laserSummoners=filter(objCuld,o=>o.id==69);//nice
    for(let i=0;i<laserSummoners.length;i++) {
        let O=laserSummoners[i];
        if (fCT%150==0||O.s%2==1){
        if (O.s%2==1)O.s=(O.s%4>=2)?O.s-O.s%4:O.s-O.s%4+2;
        others.push({x:O.x+O.i/8*s,y:O.y+O.i/8*3*s,id:69.1,vx:s*p.vMax,vy:0,i:O.i});
        others.push({x:O.x+O.i/8*s,y:O.y+O.i/8*3*s,id:69.1,vx:-s*p.vMax,vy:0,i:O.i});
        others.push({x:O.x+O.i/8*3*s,y:O.y+O.i/8*s,id:69.2,vx:0,vy:s*p.vMax,i:O.i});
        others.push({x:O.x+O.i/8*3*s,y:O.y+O.i/8*s,id:69.2,vx:0,vy:-s*p.vMax,i:O.i});}}
    let lasers=filter(others,o=>o.id-o.id%1==69);
        for(let i=0;i<lasers.length;i++) {
        let O=lasers[i];
        if (some(objCuld,o=>o.d[3]!=1&&o.c!=0&&o.id!=69&&O.x<o.x+s*o.c&&O.y<o.y+o.c*s&&(O.id==69.1&&O.x+O.i/8*6*s>o.x&&O.y+O.i/8*2*s>o.y||O.id==69.2&&O.x+O.i/8*2*s>o.x&&O.y+O.i/8*6*s>o.y)&&o.id!=27&&o.id!=28&&o.id!=30)
        ||outOfBounds(O)){
            others=filter(others,o=>o!=O);}
        O.x+=O.vx;O.y+=O.vy;
        if (p.invincible==0&&O.x<p.x+s*p.w&&O.y<p.y+p.h*s&&(O.id==69.1&&O.x+O.i/8*6*s>p.x&&O.y+O.i/8*2*s>p.y||O.id==69.2&&O.x+O.i/8*2*s>p.x&&O.y+O.i/8*6*s>p.y)) {others=filter(others,o=>o!=O);damagePlayer();}
        }
    
    
    
    //spring
    if (some(objCuld,o=>o.id==58&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&p.y+p.h*s==o.y)) {p.vy=-p.jumpPower*s-9.2*p.gravity;coyote=false;jump=false;animation.j=fCT;animation.l=-1;}
    if (some(objCuld,o=>o.id==58&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&p.y==o.y+o.i*s)) p.vy=s*2;
    
    //player collisions. collidable=if within player velocities and if not overlapping with player
    let collidable=filter(objCuld,o=>!(p.invincible>0&&(o.id>=11&&o.id<=12||o.id>=63&&o.id<=65||o.id>=1000))&&o.c!=0&&o.x<p.x+s*p.w+Math.max(p.vx,0)&&o.x+o.c*s>p.x+Math.min(p.vx,0)&&o.y<p.y+s*p.h+Math.max(p.vy,0)&&o.y+o.c*s>p.y+Math.min(p.vy,0)&&!overlapping(p,o)&&o.id!=27&&o.id!=29&&o.id!=30);
    let yC=filter(collidable,o=>o.x+o.c*s>p.x&&o.x<p.x+p.w*s).sort((a,b)=>(p.vy<0)?(b.y+b.c*s-a.y-a.c*s):-(b.y-a.y))[0];
    let xC=filter(collidable,o=>o.y+o.c*s>p.y&&o.y<p.y+p.h*s).sort((a,b)=>(p.vx<0)?(b.x+b.c*s-a.x-a.c*s):-(b.x-a.x))[0];
    if (collidable.length>0&&!xC&&!yC) {
        p.x+=p.vx;
        yC=filter(collidable,o=>o.x+o.c*s>p.x&&o.x<p.x+p.w*s).sort((a,b)=>(p.vy<0)?(b.y+b.c*s-a.y-a.c*s):-(b.y-a.y))[0];
        collideY(yC);
    } else if (yC) {
        collideY(yC);
        xC=filter(collidable,o=>o.y+o.c*s>p.y&&o.y<p.y+p.h*s).sort((a,b)=>(p.vx<0)?(b.x+b.c*s-a.x-a.c*s):-(b.x-a.x))[0];
        collideX(xC);
    } else if (xC) {
        collideX(xC);
        yC=filter(collidable,o=>o.x+o.c*s>p.x&&o.x<p.x+p.w*s).sort((a,b)=>(p.vy<0)?(b.y+b.c*s-a.y-a.c*s):-(b.y-a.y))[0];
        collideY(yC);
    } else {
        p.x+=p.vx;
        p.y+=p.vy;}
    p.vy=Math.min(p.vy+p.gravity,s*p.G_Max);//gravity

    //shoot weapons
    if (weapon!=0) {
        if (mouseZ==1||keyShiftPressed) {
            if (weapon==1&&(weaponCooldown==0||keyShiftPressed)) {
                let A=(Math.random()-.5)/41+Math.atan2(mouseY-(p.y+c.y+p.h*s/2),mouseX-(p.x+c.x+p.w*s/2));
                others.push({x:p.x+p.w*s/2+Math.cos(A)*s*(11+Math.random()*2),y:p.y+p.h*s/2+Math.sin(A)*s*(11+Math.random()*2),vx:Math.cos(A)*s*6,vy:Math.sin(A)*s*6,id:-1,i:1,a:A});
                weaponCooldown=1;
            }
        } else weaponCooldown=0;
    }

    //stomp on enemies
    let stompedEnemies=filter(objCuld,o=>(o.id==11||o.id==12||o.id==63||o.id==64||o.id==65)&&o.x<p.x+p.w*s+s&&o.x+o.c*s-s>p.x&&p.y+p.h*s>=o.y-s&&p.y+p.h*s<=o.y);
    for(let i=0;i<stompedEnemies.length&&p.invincible==0;i++) {
        let O=stompedEnemies[i];
        if (O.id==11||O.id==12){
            var O2={...O};
            O2.id=O2.id*100+1;O2.c=(O.id==11)?0:O2.c/2;O2.s=0;
            if (O.id==12) {O2.x+=2*s;O2.y+=3*s;O2.vx=0;}
            objects.push(O2);
        }
        objects=filter(objects,o=>o!=O);
        objCuld=filter(objCuld,o=>o!=O);
        p.vy=-p.gravity*12;}
    
    //Breakable Blocks
    let breakableObjs=filter(objCuld,o=>o.d[3]==1)
        for(let i=0;i<breakableObjs.length;i++) {
            let O=breakableObjs[i];
            if (O.x<p.x+s*p.w&&O.x+s*O.c>p.x&&p.y==O.y+O.c*s
            ||some(objCuld,o=>o.id==1201&&O.y+s<o.y+o.c*s&&O.y+O.c*s>=o.y&&(o.x==O.x+O.c*s&&o.vx<0||o.x+o.c*s==O.x&&o.vx>0))
            ||some(others,o=>o.x<O.x+s*O.c&&o.y<O.y+O.c*s&&(o.id==-1&&o.x+o.i*s>O.x&&o.y+o.i*s>O.y||o.id==69.1&&o.x+o.i/8*6*s>O.x&&o.y+o.i/8*2*s>O.y||o.id==69.2&&o.x+o.i/8*2*s>O.x&&o.y+o.i/8*6*s>O.y))) {
                objects=filter(objects,o=>o!=O);
                objCuld=filter(objCuld,o=>o!=O);}}
    
    //collect powerups
    if(some(objCuld,o=>o.id==13&&o.x<=p.x+s*p.w&&o.x+s*o.c>=p.x&&o.y<=p.y+p.h*s&&o.y+s*o.c>=p.y)) {
        objects=filter(objects,o=>!(o.id==13&&o.x<=p.x+s*p.w&&o.x+s*o.c>=p.x&&o.y<=p.y+p.h*s&&o.y+s*o.c>=p.y));
        p.invincible = 600;} else p.invincible=Math.max(0,p.invincible-1); 
    if(some(objCuld,o=>o.id==14&&o.x<=p.x+s*p.w&&o.x+s*o.c>=p.x&&o.y<=p.y+p.h*s&&o.y+s*o.c>=p.y)) {
        objects=filter(objects,o=>!(o.id==14&&o.x<=p.x+s*p.w&&o.x+s*o.c>=p.x&&o.y<=p.y+p.h*s&&o.y+s*o.c>=p.y));
        if (!p.powered) {
            p.h+=5;p.w+=2;
            p.jumpPower+=2*p.gravity/s;p.vMax+=p.w/40;
            p.x-=2*s;p.y-=6*s; 
            p.Super=true;}}
    
    //update switches
    let switches=filter(objCuld,o=>o.id==66);
    for(let i=0;i<switches.length;i++) {
        let O=switches[i];
        let canBe=objCuld.some(o=>(o.id==68||o.id>=83&&o.id<=84||o.id==56||o.id<=12&&o.id>=11||o.id>=1000||o.id>=63&&o.id<=64)&&o.c!=0&&O.x<o.x+s*o.c&&O.x+s*O.i>o.x&&O.y<o.y+o.c*s&&O.y+s*O.i>o.y);
        if ((O.x<p.x+s*p.w&&O.x+s*O.i>p.x&&O.y<p.y+p.h*s&&O.y+s*O.i>p.y)||canBe) {
            O.s=O.s-O.s%2+1;
        } else {O.s=O.s-O.s%2;}}
    
    
    //channels
    for (let j=0;j<channels.length;j++) {
        if (some(switches,o=>o.s%2==1&&(o.s-o.s%4)/4==j+1)) {
            channels[j]=1;
        } else channels[j]=0;}
    
    //update toggleable blocks
    let toggleBlocks=filter(objCuld,o=>o.s>=4);
    for(let i=0;i<toggleBlocks.length;i++) {
        let O=toggleBlocks[i];
        if (O.s%4<2){O.s=O.s-O.s%2+channels[Math.floor(O.s/4)-1];
        } else O.s=O.s-O.s%2+1-channels[Math.floor(O.s/4)-1];
        if (O.id==67) O.c=Math.abs(O.s%2-1)*O.i;}

    //Keys
    if(some(objCuld,o=>(o.id==60)&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&o.y<p.y+p.h*s&&o.y+s*o.i>p.y)) {
        let collected0=objects.length;
        objects=filter(objects,o=>!((o.id==60)&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&o.y<p.y+p.h*s&&o.y+s*o.i>p.y));
        keys+=(collected0-objects.length);}
    
    //coins
    if(some(objCuld,o=>(o.id==10||o.id==57)&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&o.y<p.y+p.h*s&&o.y+s*o.i>p.y)) {
        let collected0=objects.length;
        objects=filter(objects,o=>!((o.id==10||o.id==57)&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&o.y<p.y+p.h*s&&o.y+s*o.i>p.y));
        coins+=(collected0-objects.length);}
    
    //portals
    cI=objCuld.findIndex(o=>o.id==59&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&o.y<p.y+p.h*s&&o.y+s*o.i>p.y);
    if (cI>-1) {if (portalCooldown==0){
        cI2=objCuld.findIndex(o=>o.id==59&&objCuld[cI].s-objCuld[cI].s%4==o.s-o.s%4&&objCuld[cI]!=o);
        if (cI2>-1) {
            p.x=objCuld[cI2].x+objCuld[cI2].i*s/2-p.w*s/2;
            p.y=objCuld[cI2].y+objCuld[cI2].i*s/2-p.h*s/2;
            c.x=-Math.max(c.xMin,Math.min(c.xMax,p.x-canvas.width/2));
            c.y=-Math.max(c.yMin,Math.min(c.yMax,p.y-canvas.height/2));
            portalCooldown=100;}} else portalCooldown-=1;
    } else portalCooldown=0;
    
    
    //checkpoint
    cI=objCuld.findIndex(o=>o.id==51&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&o.y<p.y+p.h*s&&o.y+s*o.i>p.y&&o.s%2==0);
    if(cI>-1) {
        objects.forEach(o=>{if (o.id==51&&o.s%2==1)o.s-=1;});
        objCuld[cI].s+=1;}

    //win
    if(some(objCuld,o=>o.id==53&&o.x<p.x+s*p.w&&o.x+s*o.i>p.x&&o.y<p.y+p.h*s&&o.y+s*o.i>p.y)) {
        won=true;
    //death
    } else if (outOfBounds(p)
        ||objCuld.some(o=>(p.invincible==0||o.id==26)&&(o.id==11||o.id==26||o.id==12||o.id==62||o.id==63||o.id==64||o.id==65)&&o.x<=p.x+p.w*s&&o.x+o.c*s>=p.x&&o.y<=p.y+p.h*s&&o.y+o.c*s>=p.y)
        ||objCuld.some(o=>p.invincible==0&&o.id==80&&(o.x<p.x+p.w*s&&o.x+o.c*s>p.x&&o.y-o.c*s/2<p.y+p.h*s&&o.y+o.c*s*3/2>p.y||o.y<p.y+p.h*s&&o.y+o.c*s>p.y&&o.x-o.c*s/2<p.x+p.w*s&&o.x+o.c*s*3/2>p.x)) 
        ||objCuld.some(o=>p.invincible==0&&o.id==81&&(!o.a&&o.x<p.x+p.w*s&&o.x+o.i*s>p.x&&o.y+o.i*7/10*s<p.y+p.h*s&&o.y+o.i*s>p.y||o.a==2&&o.x<p.x+p.w*s&&o.x+o.i*s>p.x&&o.y<p.y+p.h*s&&(o.y+o.i*3/10*s>p.y&&!p.crouching||o.y+o.i*2/10*s>p.y)||o.a==3&&o.y<p.y+p.h*s&&o.y+o.i*s>p.y&&o.x+o.i*7/10*s<p.x+p.w*s&&o.x+o.i*s>p.x||o.a==1&&o.y<p.y+p.h*s&&o.y+o.i*s>p.y&&o.x<p.x+p.w*s&&o.x+o.i*3/10*s>p.x)) 
        ||objCuld.some(o=>p.invincible==0&&o.id==82&&(o.x<p.x+p.w*s&&o.x+o.c*s>p.x&&o.y-o.c*s/6<p.y+p.h*s&&o.y+o.c*s*7/6>p.y||o.y<p.y+p.h*s&&o.y+o.c*s>p.y&&o.x-o.c*s/6<p.x+p.w*s&&o.x+o.c*s*7/6>p.x))
        ||objCuld.some(o=>p.invincible==0&&o.id==83&&o.x-o.i*s/3<p.x+p.w*s&&o.x+o.i*s*4/3>p.x&&o.y+o.i*.8<p.y+p.h*s&&o.y+s*o.i-o.i*.8>p.y)) {
            damagePlayer();}

} else if (mode==0) {
    if (keyRPressed) {keyRPressed=false;editRotation+=1;if(editRotation>3)editRotation=0;}
    
    if (keyWPressed||keyUpPressed) c.y+=keyShiftPressed?5*s*c.z:3*s*c.z;
    if (keyAPressed||keyLeftPressed) c.x+=keyShiftPressed?5*s*c.z:3*s*c.z;
    if (keySPressed||keyDownPressed) c.y-=keyShiftPressed?5*s*c.z:3*s*c.z;
    if (keyDPressed||keyRightPressed) c.x-=keyShiftPressed?5*s*c.z:3*s*c.z;
    
    
    
    if (keyPlusPressed) {keyPlusPressed=false;
        editLayer=Math.min(99,(keyShiftPressed)?editLayer+10:editLayer+1);
        e2=(editLayer<=9)?"&emsp;"+editLayer:"&ensp;"+editLayer;
        document.getElementById("Layer").innerHTML="Layer:&emsp;"+e2+"&emsp;";}
    if (keyMinusPressed) {keyMinusPressed=false;
        editLayer=Math.max(0,(keyShiftPressed)?editLayer-10:editLayer-1);
        e2=(editLayer<=9)?"&emsp;"+editLayer:"&ensp;"+editLayer;
        document.getElementById("Layer").innerHTML="Layer:&emsp;"+e2+"&emsp;";}
    
    if (mouseZ==1) {
        if (mouseY<=canvas.height/screenHeightBlocks*(screenHeightBlocks-4)) {
            let X=Math.floor((mouseX-c.x)/(s*editGridSize))*s*editGridSize;
            let Y=Math.floor((mouseY-c.y)/(s*editGridSize))*s*editGridSize;
            
            
            //drag selection
            if (editSelection[0]<0) {
                editSelection=[objects.findIndex(o=>o.l==editLayer&&o.l==editLayer&&o.id==31&&mouseX>=o.x+c.x+o.w*s-25&&mouseY>=o.y+c.y+o.i*s-25&&mouseX<=o.x+c.x+o.w*s+25&&mouseY<=o.y+c.y+o.i*s+25),4];
                if (editSelection[0]<0) {editSelection=[objects.findIndex(o=>o.l==editLayer&&o.id==31&&mouseX>=o.x+c.x-25&&mouseY>=o.y+c.y-25&&mouseX<=o.x+c.x+25&&mouseY<=o.y+c.y+25),1];
                if (editSelection[0]<0) {editSelection=[objects.findIndex(o=>o.l==editLayer&&o.id==31&&mouseX>=o.x+c.x-25&&mouseY>=o.y+c.y+o.i*s-25&&mouseX<=o.x+c.x+25&&mouseY<=o.y+c.y+o.i*s+25),3];
                if (editSelection[0]<0) {editSelection=[objects.findIndex(o=>o.l==editLayer&&o.id==31&&mouseX>=o.x+c.x+o.w*s-25&&mouseY>=o.y+c.y-25&&mouseX<=o.x+c.x+o.w*s+25&&mouseY<=o.y+c.y+25),2];
                if (editSelection[0]<0) {editSelection=[objects.findIndex(o=>o.l==editLayer&&o.id==31&&mouseX>=o.x+c.x&&mouseY>=o.y+c.y&&mouseX<=o.x+c.x+o.w*s&&mouseY<=o.y+c.y+o.i*s),0];
                }}}}
            } 
            if (mouseW==1) {
                editObjId=objects.findIndex(o=>o.x==X&&o.y==Y&&o.l==editLayer).id;
            } else if (mouseW==2||editObjId>86||editObjId>69&&editObjId<75||editObjId>14&&editObjId<20||editObjId>31&&editObjId<50) {
                objects=filter(objects,o=>!(o.x==X&&o.y==Y&&o.l==editLayer));
            } else if (editSelection[0]>-1) {
                let O=objects[editSelection[0]];
                if (editSelection[1]==0) {
                    O.x=X;
                    O.y=Y;
                } else if (editSelection[1]==1) {
                    if (X<O.x+O.w*s) {O.w=Math.max(editGridSize,Math.abs(O.w-(X-O.x)/s));O.x=X;}
                    if (Y<O.y+O.i*s) {O.i=Math.max(editGridSize,Math.abs(O.i-(Y-O.y)/s));O.y=Y;}
                } else if (editSelection[1]==2) {
                    if (X>O.x)O.w=Math.max(editGridSize,Math.abs(Math.floor((O.x-X)/s)));
                    if (Y<O.y+O.i*s) {O.i=Math.max(editGridSize,Math.abs(O.i-(Y-O.y)/s));O.y=Y;}
                } else if (editSelection[1]==3) {
                    if (X<O.x+O.w*s) {O.w=Math.max(editGridSize,Math.abs(O.w-(X-O.x)/s));O.x=X;}
                    if (Y>O.y)O.i=Math.max(editGridSize,Math.abs(Math.floor((O.y-Y)/s)));
                } else if (editSelection[1]==4) {
                    if (X>O.x)O.w=Math.max(editGridSize,Math.abs(Math.floor((O.x-X)/s)));
                    if (Y>O.y)O.i=Math.max(editGridSize,Math.abs(Math.floor((O.y-Y)/s)));
                }
            } else if (mouseW==0) {
                let obj={
                    x:X,
                    y:Y,
                    id:editObjId,
                    c:getCollision(editObjId),
                    s:(editObjId<11||editObjId>=15&&editObjId<=58||editObjId>=60&&editObjId<=62||editObjId>=75&&editObjId<=82||editObjId>=85)?0:editState*3+(editChannel+1)*4,
                    i:editSize,
                    l:editLayer,
                    d:[...editBlockData]};
                if (editRotation>0) obj.a=editRotation;
                if (editObjId==0) {
                    obj.r=parseInt(editBlockColor.slice(1, 3), 16);
                    obj.g=parseInt(editBlockColor.slice(3, 5), 16);
                    obj.b=parseInt(editBlockColor.slice(5, 7), 16);}
                if (editObjId==31) obj.w=editSize;
                let oI=objects.findIndex(o=>o.x==X&&o.y==Y&&o.l==editLayer);
                if(oI!=-1&&objects[oI]!=obj)objects=objects.filter(o=>o!=objects[oI]);
                if(objects[oI]!=obj)objects.push(obj);
            }
            updateAutoTiles(X,Y);
            //save history
            if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));
            if (editObjId==31)camAreas=filter(objects, o=>o.id==31);
            }
        }
    } else {editSelection=[-1,-1];}
}
//camera control
if (mode==1) {
    c.xMin=bounds.xMin;
    c.yMin=bounds.yMin+canvas.height/2;
    c.xMax=bounds.xMax-canvas.width;
    c.yMax=bounds.yMax-canvas.height;
    for (let i=camAreas.length-1;i>=0;i--) {
        let O=camAreas[i];
        if (p.x+p.w*s/2>=O.x&&p.x+p.w*s/2<O.x+O.w*s&&p.y+p.h*s/2>O.y&&p.y+p.h*s/2<O.y+O.i*s) {
            if (O.i*s<canvasHeight)c.z=Math.max(O.i*s/canvasHeight,5/8);
            c.xMin=(O.w*s<canvas.width)?-(canvas.width-O.w*s)/2+O.x:O.x;
            c.yMin=(O.i*s<canvas.height)?-(canvas.height-O.i*s)/2+O.y:O.y;
            c.xMax=(O.w*s<canvas.width)?c.xMin:O.x+O.w*s-canvas.width;
            c.yMax=(O.i*s<canvas.height)?c.yMin:O.y+O.i*s-canvas.height;
            objCuld=filter(objects,o=>o.d[0]==1||o.x+o.i*s>O.x&&o.x<O.x+O.w*s&&o.y+o.i*s>O.y&&o.y<O.y+O.i*s);
            break;} 
        c.z=c.zDefault;
    }
    c.vx=-Math.max(-s*20*c.z,Math.min(s*20*c.z,Math.floor((-(p.x+p.w*s/2+15*p.vx*c.z-(-c.x+canvas.width/2))/s/20)**3*10)/20*s));
    c.vy=-Math.max(-s*20*c.z*(Math.max(s*20*c.z,p.vy)/s/20/c.z),Math.min(s*20*c.z,Math.floor((-(p.y+p.h*s/2+Math.max(p.vy*2,0)-(-c.y+canvas.height*0.7))/s/10)**3)/4*s));
    c.x=-c.x2-Math.max(c.xMin,Math.min(c.xMax,-c.x+c.vx));
    c.y=-c.y2-Math.max(c.yMin,Math.min(c.yMax,-c.y+c.vy));}

//Draw objects on screen
for (let l = 0; l < 100; l++) layers[l].length = 0;//empty layers
for (let i = 0, len = objCuld.length; i < len; i++) layers[objCuld[i].l].push(objCuld[i]);//update layers
if (mode==0&&keyLPressed){
        const bucket = layers[editLayer];
    for (let j = 0, blen = bucket.length; j < blen; j++) {
        drawObj(bucket[j],mode);}
} else {
    for (let l = 0; l < 100; l++) {
        const bucket = layers[l];
        for (let j = 0, blen = bucket.length; j < blen; j++) {
            drawObj(bucket[j],mode);}}}

//draw player and others
if (mode==1) { 
    //ctx.fillStyle=(p.invincible>0&&Math.floor(fCT/6)%3)?"rgb(100,100,100,0.8)":"rgb(255,0,0)";
    //ctx.fillRect(p.x+c.x,p.y+c.y,s*p.w,s*p.h);
    drawJerry(p);
    for (let i=0;i<others.length;i++){
        let O=others[i];
        if (O.id==-1) {ctx.save();ctx.translate(O.x+c.x,O.y+c.y);ctx.rotate(O.a);drawRect(-O.i*s*6/2,-O.i*s/2,O.i*s*6,O.i*s,"255,41,74");ctx.restore();continue;}
        if (O.id==69.1) {drawRect(O.x+c.x,O.y+c.y,O.i/8*6*s,O.i/8*2*s,"255,41,74");continue;}
        if (O.id==69.2) {drawRect(O.x+c.x,O.y+c.y,O.i/8*2*s,O.i/8*6*s,"255,41,74");continue;}}
    
    if (weapon==1){let a=Math.atan2(mouseY-(p.y+c.y+p.h*s/2),mouseX-(p.x+c.x+p.w*s/2));ctx.save();ctx.translate(p.x+c.x+p.w*s/2,p.y+c.y+p.h*s/2);ctx.rotate(a+Math.PI/4);ctx.drawImage(jerryBlaster,s*4,-s*12,s*8,s*8);ctx.restore();}
    }
    

//edit mode overlays
if (mode==0) {
    //camAreas resizers
    let camAreas=filter(objects, o=>o.id==31);
    for (let i=0;i<camAreas.length;i++){
        let O=camAreas[i];
        if (O.l!=editLayer) continue;
        drawRect(O.x+c.x-20,O.y+c.y-20,40,40,"70,70,70");drawRect(O.x+c.x-12,O.y+c.y-12,24,24,"170,170,170");
        drawRect(O.x+c.x+O.w*s-20,O.y+c.y+O.i*s-20,40,40,"70,70,70");drawRect(O.x+c.x+O.w*s-12,O.y+c.y+O.i*s-12,24,24,"170,170,170");
        drawRect(O.x+c.x-20+O.w*s,O.y+c.y-20,40,40,"70,70,70");drawRect(O.x+c.x+O.w*s-12,O.y+c.y-12,24,24,"170,170,170");
        drawRect(O.x+c.x-20,O.y+c.y+O.i*s-20,40,40,"70,70,70");drawRect(O.x+c.x-12,O.y+c.y+O.i*s-12,24,24,"170,170,170");
    }
    
    //ui
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,canvas.height/screenHeightBlocks*(screenHeightBlocks-4.1),canvas.width,canvas.height/screenHeightBlocks*4);
    ctx.fillStyle="rgb(180,180,180)";
    ctx.fillRect(0,canvas.height/screenHeightBlocks*(screenHeightBlocks-4),canvas.width,canvas.height/screenHeightBlocks*4);
    //object images
    for (let i=0;i<4;i++){
        for (let j=0;j<Math.floor(screenHeightBlocks*8/5);j++){
            drawObj({x:j*s*10*c.z-c.x,y:i*s*10*c.z+s*10*c.z*(screenHeightBlocks-4)-c.y,id:Math.floor(screenHeightBlocks*8/5)*i+j,i:10*c.z,s:0,w:10*c.z,l:-1,a:editRotation});ctx.restore();}}
    
    (editObjId*s*10)%Math.floor(screenHeightBlocks*8/5)
    ctx.fillStyle="rgba(0,0,0,0.3)";
    ctx.fillRect(editObjId%Math.floor(screenHeightBlocks*8/5)*s*10*c.z,canvas.height/screenHeightBlocks*(screenHeightBlocks-4)+Math.floor(editObjId/Math.floor(screenHeightBlocks*8/5))*s*10*c.z,s*10*c.z,s*10*c.z)
    ctx.fillStyle="rgba(255,255,255,0.3)";
    ctx.fillRect(
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?c.z*s*10*Math.floor((mouseX)/(s*10*c.z)):s*editGridSize*Math.floor((mouseX-c.x%(s*editGridSize))/(s*editGridSize))+c.x%(s*editGridSize), 
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?canvas.height/screenHeightBlocks*Math.floor(mouseY/canvas.height*screenHeightBlocks):s*editGridSize*Math.floor((mouseY-c.y%(s*editGridSize))/(s*editGridSize))+c.y%(s*editGridSize),
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?s*10*c.z:s*editSize,
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?s*10*c.z:s*editSize);}//mouse highlight


//messages and popups
for (let i=0;i<messages.length;i++){
    let M=messages[i];
    let text=M.text;
    let transparency=Math.min(35,M.time)/35;
    ctx.font='100px "Lucida Console", "Courier New", monospace';
    let width=ctx.measureText(text).width+100;
    ctx.fillStyle = 'rgba('+M.color+','+(.8*transparency)+')';
    ctx.fillRect((canvas.width-width)/2,15,width,150);
    ctx.fillStyle = 'rgba(0,0,0,'+(transparency)+')';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text,canvas.width/2,90);
    M.time-=1;if (M.time<=0)messages=messages.filter(m=>m!=M);}

//death time
if (deathTimer>0) {deathTimer+=1;}
if (deathTimer==30) respawn();

}

//get fps
let fC=0;
let fps=0;
let last=performance.now();
let pause=false;
function f() {
    const n = performance.now();
    if (keyPPressed){keyPPressed=false;pause=!pause;}
    if (!pause) t()
    fC++;if(deathTimer==0&&!(pause&&!keyFPressed))fCT++;
    if (keyFPressed&&pause){keyFPressed=false;t();}
    if (n-last>=1000) {fps=fC;fC=0;last=n;}
requestAnimationFrame(f);
}
requestAnimationFrame(f);

/* TO DO
  - add levels menu
  - better powerups 
  - better enemies
  - boss fights
  - connect to firebase
 */
