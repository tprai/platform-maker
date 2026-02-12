
//document.body.style.overflow = "hidden";
let canvas = document.getElementById("canvas");
canvasHeight=2560;
canvas.height = 2560;
canvas.width = canvas.height*1.5;

canvas.style.height = window.innerHeight+'px';
canvas.style.width = canvas.style.height*1.5+'px';
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled=false;
ctx.fillStyle="red";
ctx.fillRect(0, 0, canvas.width, canvas.height);

let mouseX,mouseY,mouseZ;
let zoom=16;
let rect=canvas.getBoundingClientRect();
canvas.addEventListener("mousemove", function (e) {
    mouseX=(e.clientX-rect.left)/window.innerHeight*canvas.height;
    mouseY=(e.clientY-rect.top)/window.innerHeight*canvas.height;
 }, false);
window.addEventListener('wheel', function (event){ if (mode==0){
    zoom=Math.min(25,Math.max(2,zoom+event.deltaY/10));
    c.z=zoom**2/200;
    }}, { passive: true });
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
    if (e=='c') {}}
function button(e) {
    if (e=='lPlus') {
        editLayer=Math.min(99,(keyShiftPressed)?editLayer+10:editLayer+1);
        e2=(editLayer<=9)?"&emsp;"+editLayer:"&ensp;"+editLayer;
        document.getElementById("Layer").innerHTML="Layer:&emsp;"+e2+"&emsp;";}
    if (e=='lMinus') {
        editLayer=Math.max(0,(keyShiftPressed)?editLayer-10:editLayer-1);
        e2=(editLayer<=9)?"&emsp;"+editLayer:"&ensp;"+editLayer;
        document.getElementById("Layer").innerHTML="Layer:&emsp;"+e2+"&emsp;";}
    if (e=='cPlus') {
        editChannel=Math.min((keyShiftPressed&&keyFPressed&&editChannel==21)?31:29,(keyShiftPressed)?editChannel+10:editChannel+1);
        e2=(editChannel<=9)?"&emsp;"+editChannel:"&ensp;"+editChannel;
        document.getElementById("Channel").innerHTML="Channel:&emsp;"+e2+"&emsp;";}
    if (e=='cMinus') {
        editChannel=Math.max(0,(keyShiftPressed)?editChannel-10:editChannel-1);
        e2=(editChannel<=9)?"&emsp;"+editChannel:"&ensp;"+editChannel;
        document.getElementById("Channel").innerHTML="Channel:&emsp;"+e2+"&emsp;";}
    if (e=='Mode') {
        if (mode==0) {toPlayMode()} else {toEditMode()}}
    if (e=='BlockData') {
        if (editBDId==3) {editBDId=0;
        } else{editBDId+=1;}
        updateBD();}
    if (e=='bDToggle') {
        editBlockData[editBDId]=Math.abs(editBlockData[editBDId]-1);
        updateBD();}
    if (e=='Clear') {
        let txt=document.getElementById("Clear");
        if (txt.innerHTML=="Sure?") {txt.innerHTML="Clear";objects=[];if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));}
        } else if (txt.innerHTML=="Clear") txt.innerHTML="Sure?";}
    if (e=='Save') {
        try{let save=saveSettings()+toSave(unSizedLevel());
        const tempTextArea = document.createElement("textarea");
        tempTextArea.value = save;
        document.body.appendChild(tempTextArea);
        tempTextArea.select();
        try {
          document.execCommand("copy");
          alert('Save Copied Automatically!');
        } catch (err) {
          alert('Save Copying Error. Must manually copy.');
          alert(save);}
        document.body.removeChild(tempTextArea);}catch(e){alert("Inform Jamie of Error: "+e);}}
    if (e=='Load') {
        let p=prompt("Load Level Data", "").trim();
        if (p.trim()!=''){try{loadSettings(p);objects=toObjects(p.substring(p.indexOf("–")+1));objects=sizedLevel();if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));toPlayMode();}}catch(e){alert("Error Loading Level Data");}}}
    if (e=='ImageSize') {
        if (editSize==20) {editSize=1;
        } else if (editSize==1) {editSize=2;
        } else if (editSize==2) {editSize=5;
        } else if (editSize==5) {editSize=10;
        } else if (editSize==10) {editSize=15;
        } else if (editSize==15) {editSize=20;}
        document.getElementById("ImageSize").innerHTML="Block Size: "+editSize+" px";}
    if (e=='GridSize') {
        if (editGridSize==20) {editGridSize=1;
        } else if (editGridSize==1) {editGridSize=2;
        } else if (editGridSize==2) {editGridSize=5;
        } else if (editGridSize==5) {editGridSize=10;
        } else if (editGridSize==10) {editGridSize=15;
        } else if (editGridSize==15) {editGridSize=20;}
        document.getElementById("GridSize").innerHTML="Grid Size: "+editGridSize+" px";}
    if (e=='State') {
        if (editState==0) {editState=1;
        } else {editState=0;}
        document.getElementById("State").innerHTML="State: "+editState;}
    if (e=='Undo') {
        objects=toObjects(previousObjects[0]);
        if (previousObjects.length>1)previousObjects=previousObjects.slice(1,previousObjects.length);}
    if (e=='Collision') {
        if (editCollision==2) {editCollision=0;      document.getElementById("Collision").innerHTML="Collision: None";
        } else if (editCollision==1) {editCollision=2;document.getElementById("Collision").innerHTML="Collision: Auto";
        } else if (editCollision==0) {editCollision=1;document.getElementById("Collision").innerHTML="Collision: Full";}}
    if (e=='Background') {
        if (backgroundColor=="rgb(141,255,163)") {backgroundColor="black";
        } else if (backgroundColor=="black") {backgroundColor="rgb(115,170,255)";
        } else if (backgroundColor=="rgb(115,170,255)") {backgroundColor="rgb(255,255,255)";
        } else if (backgroundColor=="rgb(255,255,255)") {backgroundColor="rgb(141,255,163)";}}
    }
let keyWPressed,keyAPressed,keySPressed,keyDPressed,keyRightPressed,keyPPressed,keyLeftPressed,keyUpPressed,keyDownPressed,keySpacePressed,keyFPressed,keyRPressed,keyShiftPressed;
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
    //case "g":keyGPressed=true;break;
    case "shift":keyShiftPressed=true;break;
    //default:console.log(event.key.toLowerCase());
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
    case "r":keyRPressed=false;break;
    //case "e":keyEPressed=false;break;
    //case "g":keyGPressed=false;break;
    case "shift":keyShiftPressed=false;break;
  }});
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
    ctx.fillRect(x+c.x,y+c.y,w,h);}
function drawObj(o,transform=0) {
    if (o.id==0) {
        drawRect(o.x,o.y,s*o.i,s*o.i,"0,0,0");return;}
    if (o.id==1) {
        drawRect(o.x,o.y,s*o.i,s*o.i,"100,100,100");
        drawRect(o.x+s,o.y+s,s*8*o.i/10,s*8*o.i/10,"150,150,150");return;}
    if (o.id==2)  {drawAutoTile(o,orangeBricks);return;}
    if (o.id==2.5)  {ctx.drawImage(orangeBricks,0*16,3*16,16,16,o.x+c.x,o.y+c.y,o.i*s,o.i*s);return;}
    if (o.id>=3&&o.id<=9) {ctx.drawImage(mario,(o.id-3)*16,0,16,16,o.x+c.x,o.y+c.y,o.i*s,o.i*s);return;}
    if (o.id==13) {drawRect(o.x,o.y,o.i*s,o.i*s,"255,255,100");return;} // Star powerup placeholder
    if (o.id==14) {drawRect(o.x,o.y,o.i*s,o.i*s,"255,150,150");return;} // Mushroom powerup placeholder
    if (o.id==10) {ctx.drawImage(marioCoin,Math.max(0,Math.floor(-1.5*Math.cos(Math.PI*fCT/22)+0.9))*16,0*16,16,16,o.x+c.x,o.y+c.y,o.i*s,o.i*s);return;}
    if (o.id==11) {ctx.drawImage(marioEnemies,Math.floor(fCT%20/10)*16,0*16,16,16,o.x+c.x-transform*s,o.y+c.y-transform*s*2+o.i*s*0.15,o.i*s,o.i*s*0.85);return;}
    if (o.id==12) {ctx.drawImage(marioEnemies,Math.floor(fCT%20/10)*16,1*16+Math.floor(o.s%4/2)*24,16,24,o.x+c.x-transform*s,o.y+c.y-transform*s*2-o.i*s*0.2,o.i*s,o.i*s*1.2);return;}
    if (o.id==25&&mode==0) {ctx.drawImage(startPos,o.x+c.x,o.y+c.y,o.i*s,o.i*s)}
    if (o.id==26&&mode==0) {ctx.drawImage(killBlock,o.x+c.x,o.y+c.y,o.i*s,o.i*s)}
    if (o.id==51) {ctx.drawImage(jerry,(1+o.s%2||1)*16,0*16,16,16,o.x+c.x,o.y+c.y,s*o.i,s*o.i);return;}
    if (o.id==52) {return;}
    if (o.id>=50&&o.id<=61) {ctx.drawImage(jerry,((o.id-50)%4)*16,Math.floor((o.id-50)/4)*16,16,16,o.x+c.x,o.y+c.y,s*o.i,s*o.i);return;}
    if (o.id==62) {ctx.drawImage(jerry,Math.floor(fCT%64/16)*16,3*16,16,16,o.x+c.x-transform*s,o.y+c.y-transform*s,s*o.i,s*o.i);return;}
    if (o.id>=63&&o.id<=65) {ctx.drawImage(jerry,Math.floor(fCT%32/8)*16,(o.id-59)*16,16,16,o.x+c.x-transform*s,o.y+c.y-transform*s,s*o.i,s*o.i);return;}
    if (o.id==66||o.id==67) {ctx.drawImage(jerry,(2*o.id%3+(o.s||0)%2)*16,7*16,16,16,o.x+c.x,o.y+c.y,s*o.i,s*o.i);return;}
    if (o.id==68) {ctx.drawImage(jerry,((o.s||0)%2)*16,8*16,16,16,o.x+c.x,o.y+c.y,s*o.i,s*o.i);return;}//-(mode*(o.s%2-.5)*(fCT%3)*s||0)smooth movement
    if (o.id==69) {ctx.drawImage(jerryLaser,o.x+c.x,o.y+c.y,s*o.i,s*o.i);return;}
    
    if (o.id==1100) {ctx.drawImage(marioEnemies,Math.floor(fCT%20/10)*16,0*16,16,16,o.x+c.x-transform*s,o.y+c.y-transform*s*2+o.i*s*0.4,o.i*s,o.i*s*0.6);return;}
    if (o.id==1200) {ctx.drawImage(marioShell,0,0,16,13,o.x+c.x-transform*s*3,o.y+c.y-transform*s*6+o.i*s*0.2,o.i*s,o.i*s*0.8);return;}
    return;}
function respawn() {
    unWin();
    mode=1;
    deathTimer=0;
    
    // Find all spawn blocks
    let spawnBlocks = objects.filter(o => o.id == 25);
    
    // Clear existing players
    players = [];
    
    if (spawnBlocks.length > 0) {
        // Create a player for each spawn block
        spawnBlocks.forEach(spawn => {
            let player = new Player(
                spawn.x + spawn.i * s / 2 - 3 * s,
                spawn.y + spawn.i * s / 2 - 4 * s
            );
            // Each player remembers their own spawn block
            player.spawnBlock = spawn;
            players.push(player);
        });
    } else {
        // Default spawn if no spawn blocks
        players.push(new Player(0, 0));
    }
    
    // Set camera to first player
    if (players.length > 0) {
        p = players[0]; // Keep p reference for backward compatibility
        c.x = -Math.max(c.xMin, Math.min(c.xMax, players[0].x - s * 10 * 12));
        c.y = -Math.max(c.yMin, Math.min(c.yMax, players[0].y - s * 10 * 8));
    }
    
    return 1;}
function collideX(player, o=6.7) {
    if (o==6.7) {
        player.x+=player.vx;
    } else {
    if (player.vx>0) {
        if (player.x+player.w*s+player.vx>o.x) {
            player.x=o.x-player.w*s;player.vx=0;
        } else player.x+=player.vx;
    } else {
        if (player.x+player.vx<o.x+o.c*s) {
            player.x=o.x+o.c*s;player.vx=0;
        } else player.x+=player.vx;
    }}}
function collideY(player, o=6.7) {
    if (o==6.7) {
        player.y+=player.vy;
    } else {
    if (player.vy>0) {
        if (player.y+player.h*s+player.vy>o.y) {
            player.y=o.y-player.h*s;player.vy=0;player.jump=true;
        } else {player.y+=player.vy;}
    } else {
        if (player.y+player.vy<o.y+o.c*s) {
            player.y=o.y+o.c*s;player.vy=0;
        } else {player.y+=player.vy;}
    }}}
function getCollision(id) {//when placing in  editore
    if (editCollision==0) return 0;
    if (editCollision==1) return editSize;
    if (id==11||id==12||id==62||id==63||id==64||id==65) return editSize-2;
    if (id==10||id==13||id==14||id==25||id==26||id==51||id==52||id==53||id==57||id==59||id==60||id==66) return 0;
    return editSize;}
function getFromTileset(me) {//b= auto-tile id
    let Q,W,E,A,D,Z,X,C;
        if (!some(objects,o=>o.x+o.i*s==me.x&&o.y==me.y&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {A=true;}
        if (!some(objects,o=>o.x==me.x+me.i*s&&o.y==me.y&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {D=true;}
        if (!some(objects,o=>o.y+o.i*s==me.y&&o.x==me.x&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {W=true;} else {
            if (!A&&!some(objects,o=>o.x+o.i*s==me.x&&o.y+o.i*s==me.y&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {
                Q=true;}
            if (!D&&!some(objects,o=>o.x==me.x+me.i*s&&o.y+o.i*s==me.y&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {
                E=true;}}
        if (!some(objects,o=>o.y==me.y+me.i*s&&o.x==me.x&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {
            X=true;} else {
            if (!A&&!some(objects,o=>o.x+o.i*s==me.x&&o.y==me.y+me.i*s&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {
                Z=true;}
            if (!D&&!some(objects,o=>o.x==me.x+me.i*s&&o.y==me.y+me.i*s&&o.id==me.id&&o.i==me.i&&o.l==me.l)) {
                C=true;}}
        
    if (W) { if (A) { if (D) { if (X) {return [0,3]; } else  return [0,0]; } else { if (X) {return [1,3]; } else if (C) { return [1,0]; } else  return [8,0]; } } else if (D) { if (X) {    return [3,3]; } else if (Z) { return [3,0]; } else      return [11,0]; } else if (X) { return [2,3]; } else if (Z) { if (C) {    return [2,0]; } else      return [5,0]; } else if (C) { return [6,0]; } else          return [10,0]; } else if (X) { if (A) { if (D) {    return [0,2]; } else if (E) { return [1,2]; } else      return [8,3]; } else if (D) { if (Q) {    return [3,2]; } else      return [11,3]; } else if (Q) { if (E) {    return [2,2]; } else      return [5,3]; } else if (E) { return [6,3]; } else          return [9,3]; } else if (A) { if (D) {        return [0,1]; } else if (C) { if (E) {    return [1,1]; } else      return [4,2]; } else if (E) { return [4,1]; } else          return [8,1]; } else if (D) { if (Q) { if (Z) {    return [3,1]; } else      return [7,1]; } else if (Z) { return [7,2]; } else          return [11,2]; } else if (Q) { if (E) { if (Z) { if (C) {return [2,1]; } else  return [7,3]; } else if (C) { return [4,3]; } else      return [9,0]; } else if (Z) { if (C) {    return [7,0]; } else      return [8,2]; } else if (C) { return [9,1]; } else          return [5,1]; } else if (E) { if (C) {if (Z) {    return [4,0];} else      return [11,1];} else if (Z) { return [10,2];} else          return [6,1];} else if (Z) {if (C) {        return [10,3];} else          return [5,2];} else if (C) {     return [6,2];} else              return [9,2];}
function drawAutoTile(me,tileset,tileSize=16) {
    let place=getFromTileset(me);
    ctx.drawImage(tileset,place[0]*tileSize,place[1]*tileSize,tileSize,tileSize,me.x+c.x,me.y+c.y,me.i*s,me.i*s);}
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
    others.length=0;
    let activatedCheckpointIndex=objects.findIndex(o=>o.id==51&&o.s==1);
    if (activatedCheckpointIndex>=0) objects[activatedCheckpointIndex].s=0;
    }}
function toPlayMode() {
    mode=1;
    respawn();
    document.getElementById("Mode").innerHTML="Edit";
    document.querySelectorAll('.edit').forEach(e=>e.hidden=true);
    objects=objects.map(function(o){return {x:(o.id>=11&&o.id<=12||o.id>=62&&o.id<=65)?o.x+s:o.x,y:(o.id>=11&&o.id<=12||o.id>=62&&o.id<=65)?o.y+s:o.y,id:o.id,c:o.c,s:o.s,i:o.i,l:o.l,d:o.d};});
    c.z=1;
    zoom=16;
    c.xMin=Math.min(0,...objects.map(function(o){return o.x}));
    c.yMin=Math.min(0,...objects.map(function(o){return o.y}));
    c.xMax=-s*10*23+Math.max(0,...objects.map(function(o){return o.x}));
    c.yMax=-s*10*15+Math.max(0,...objects.map(function(o){return o.y}));}
function toSave(o) {
    return o.map(obj=>{
        return Object.entries(obj)
            .map(([key, value])=>{
            key=(key=="x"&&value<0)?"h":(key=="y"&&value<0)?"k":key;
            key=(key=="id")?"q":key
            key=(key!="d"&&value%10==0)?key.toUpperCase():key;
            value=(key=="d")?value[0]+value[1]*10+value[2]*100+value[3]*1000:(value%10==0)?Math.abs(value)/10:Math.abs(value);
                return key+value;})
            .join("");
    }).join("-");}
function toObjects(str) {
    return str.split("-").map(segment => {
        let obj={};
        let matches=segment.match(/[a-zA-Z]\d+/g);
        matches.forEach(pair => {
            let key=(pair[0].toLowerCase()=="q")?"id":pair[0].toLowerCase();
            let value=(key=="d")?[Number(pair.slice(1))%10,(Number(pair.slice(1))%100-Number(pair.slice(1))%10)/10,(Number(pair.slice(1))%1000-Number(pair.slice(1))%100)/100,(Number(pair.slice(1))%10000-Number(pair.slice(1))%1000)/1000]:(pair[0]==pair[0].toUpperCase())?(Number(pair.slice(1))*10):Number(pair.slice(1));
            if (key=='h'){key='x';value*=-1;}
            if (key=='k'){key='y';value*=-1;}
            obj[key]=value;});
        {return obj;}
    });}
function saveSettings() {
    let sS="platformMaker";
    sS+="-"+backgroundColor.match(/\d+/g).map(Number).join(",");
    sS+="-"+[p.vMax,p.jumpPower,p.w,p.h].join(",");
    return sS+"–";
    }
function loadSettings(S) {
    let lS=S.substring(14,S.indexOf("–"));
    backgroundColor="rgb("+lS.substring(0,lS.indexOf("-"))+")";
    lS=lS.substring(lS.indexOf("-")+1);
    p.vMax=Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1);
    p.jumpPower=Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1);if (S.substring(1,2)=="I") {noEditLevel=true;toPlayMode();}
    p.w=Number(lS.substring(0,lS.indexOf(",")));lS=lS.substring(lS.indexOf(",")+1);
    p.h=Number(lS);
    }
function unWin() {
    document.getElementById("win").hidden=true;
    won=false;}
function updateBD(){
    if (editBlockData[editBDId]==1) {
        document.getElementById('bDToggle').innerHTML='Yes';
    } else document.getElementById('bDToggle').innerHTML='No';
    if (editBDId==0) document.getElementById('BlockData').innerHTML='Breakable';
    if (editBDId==1) document.getElementById('BlockData').innerHTML='Pushable';
    if (editBDId==2) document.getElementById('BlockData').innerHTML='Powerup';
    if (editBDId==3) document.getElementById('BlockData').innerHTML='Unculled';}
function unSizedLevel(){
    return objects.map(function(o){return {x:o.x/s,y:o.y/s,id:o.id,c:o.c,s:o.s,i:o.i,l:o.l,d:o.d};});
}
function sizedLevel(){
    return objects.map(function(o){return {x:o.x*s,y:o.y*s,id:o.id,c:o.c,s:o.s,i:o.i,l:o.l,d:o.d};});
}           
function setStartPos() {
    cI=objects.findIndex(o=>o.id==51&&o.s%2==1);
    if(cI!=-1) {
        p.startX=objects[cI].x+objects[cI].i*s/2-p.w*s/2;
        p.startY=objects[cI].y+objects[cI].i*s/2-p.h*s/2;
    } else {
        let sPI = objects.findIndex(o=>o.id==25);
        if (sPI!=-1) {
           p.startX=objects[sPI].x+objects[sPI].i/2*s-s*p.w/2;
        p.startY=objects[sPI].y+objects[sPI].i/2*s-s*p.h/2;} else {p.startX=0;p.startY=0;}}
}    
// Player Class
class Player {
    constructor(x=0, y=0) {
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.vMax = 1.5;
        this.jumpPower = 4;
        this.w = 6;
        this.h = 8;
        this.startX = x;
        this.startY = y;
        this.jump = false;
        this.deathTimer = 0;
        this.portalCooldown = 0;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.powered = false; // second life powerup (like Super Mario)
        this.checkpoint = null; // Individual checkpoint
        this.spawnBlock = null; // Remember spawn block
    }
    
    respawnPlayer() {
        // Respawn this player at their checkpoint or spawn point
        if (this.checkpoint) {
            this.x = this.checkpoint.x + this.checkpoint.i * s / 2 - this.w * s / 2;
            this.y = this.checkpoint.y + this.checkpoint.i * s / 2 - this.h * s / 2;
        } else if (this.spawnBlock) {
            this.x = this.spawnBlock.x + this.spawnBlock.i * s / 2 - this.w * s / 2;
            this.y = this.spawnBlock.y + this.spawnBlock.i * s / 2 - this.h * s / 2;
        } else {
            this.x = this.startX;
            this.y = this.startY;
        }
        this.vx = 0;
        this.vy = 0;
        this.deathTimer = 0;
        this.invincible = false;
        this.invincibleTimer = 0;
        this.powered = false;
    }
    
    takeDamage() {
        if (this.invincible) return false;
        if (this.powered) {
            this.powered = false;
            this.invincible = true;
            this.invincibleTimer = 120; // 2 seconds of invincibility
            return false;
        }
        return true; // player dies
    }
    
    update() {
        if (this.invincibleTimer > 0) {
            this.invincibleTimer--;
            if (this.invincibleTimer <= 0) {
                this.invincible = false;
            }
        }
    }
    
    draw(ctx, c, s) {
        if (this.invincible && Math.floor(fCT / 4) % 2 === 0) {
            ctx.fillStyle = "rgba(255,0,0,0.5)";
        } else {
            ctx.fillStyle = this.powered ? "rgb(255,100,0)" : "rgb(255,0,0)";
        }
        ctx.fillRect(this.x + c.x, this.y + c.y, s * this.w, s * (this.powered ? this.h * 1.2 : this.h));
    }
}

let won=false;
let noEditLevel=false;
let mode=1;
let screenHeightBlocks=16;//blocks (10px) that fit height of canvas
let s=canvas.height/screenHeightBlocks/10;//size of one pixel
let p={x:0,y:0,vx:2,vy:0,vMax:1.5,jumpPower:4,w:6,h:8,startX:0,startY:0}; // Keep for backward compatibility
let players = []; // Array to hold all player instances
let globalCoins = 0; // Shared across all players
let globalKeys = 0; // Shared across all players
let c={x:0,y:0,xMin:0,xMax:0,yMin:0,yMax:0,vx:0,vy:0,z:1};//camera pos
let deathTimer=0;
let portalCooldown=0;
let jump=false;//if can jump
let timer=0;
let channels=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
let editObjId=0;//for level editor
let editCollision=2;//0: forced no, 1: forced yes, 2: auto (getCollision(id))
let editSize=10;
let editLayer=1;
let editGridSize=10;
let editState=0;
let editChannel=0;
let editBlockData=[0,0,0,0];
let editBDId=0;//break,move,powerup
let backgroundColor="rgb(141,255,163)";
let objects=[];
let others=[];
if (true) {
    objects=[//xpos (pixels), ypos (pixels), image id, collision size, state, image size, layer, data
    {x: 0, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 10, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 20, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 30, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 40, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 50, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 60, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 70, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 80, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 90, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 100, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 110, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 120, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 130, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 140, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 150, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 160, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 170, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 180, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 190, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 200, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 210, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 220, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 230, y: 150, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 0, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 10, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 20, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 30, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 40, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 50, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 60, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 70, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 80, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 90, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 100, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 110, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 120, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 130, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 140, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 150, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 160, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 170, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 180, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 190, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 200, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 210, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 220, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]},
    {x: 230, y: 0, id: 54, c:10, i:10, l:1, s:0, d:[0,0,0,0]}];}//if (true) so array is collabsible
objects=sizedLevel();
let previousObjects=[toSave(objects)];
let layers = Array.from({ length: 100 }, () => []);

// Initialize players on first load if mode==1
if (mode == 1 && players.length == 0) {
    let spawnBlocks = objects.filter(o => o.id == 25);
    if (spawnBlocks.length > 0) {
        spawnBlocks.forEach(spawn => {
            let player = new Player(
                spawn.x + spawn.i * s / 2 - 3 * s,
                spawn.y + spawn.i * s / 2 - 4 * s
            );
            player.spawnBlock = spawn;
            players.push(player);
        });
    } else {
        players.push(new Player(0, 0));
    }
    if (players.length > 0) p = players[0];
}


/*let url = new URL(window.location.toLocaleString()).searchParams;let urlObjs=url.get('s');
if (urlObjs) {try{loadSettings(urlObjs);objects=toObjects(urlObjs.substring(urlObjs.indexOf("–")+1));objects=sizedLevel();if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));toPlayMode();}}catch(e){alert("Error Loading Level Data");}
} else window.location.replace('https://platform-maker-17774376.codehs.me/index.html?s=platformMaker-141,255,163-1.5,4,6,8%E2%80%93H9Y11q54C1s4I1L0d0-H8Y11q54C1s4I1L0d1000-H7Y11q54C1s4I1L0d0-H6Y11q54C1s4I1L0d0-H5Y11q54C1s4I1L0d0-H4Y11q54C1s4I1L0d0-H3Y11q54C1s4I1L0d0-H2Y11q54C1s4I1L0d0-H1Y11q54C1s4I1L0d0-X0Y11q54C1s4I1L0d0-X1Y11q54C1s4I1L0d0-X2Y11q54C1s4I1L0d0-X3Y11q54C1s4I1L0d0-X4Y11q54C1s4I1L0d0-X6Y11q54C1s4I1L0d0-X7Y11q54C1s4I1L0d0-X8Y11q54C1s4I1L0d0-X9Y11q54C1s4I1L0d0-X10Y11q54C1s4I1L0d0-X11Y11q54C1s4I1L0d0-X12Y11q54C1s4I1L0d0-X13Y11q54C1s4I1L0d0-X14Y11q54C1s4I1L0d0-X15Y11q54C1s4I1L0d0-X16Y11q54C1s4I1L0d0-X17Y11q54C1s4I1L0d0-H9Y10q54C1s4I1L0d0-H9Y9q54C1s4I1L0d0-H9Y8q54C1s4I1L0d0-H9Y7q54C1s4I1L0d0-H9Y6q54C1s4I1L0d0-H9Y5q54C1s4I1L0d0-H9Y4q54C1s4I1L0d0-H9Y3q54C1s4I1L0d0-H9Y2q54C1s4I1L0d0-H9Y1q54C1s4I1L0d0-H9Y0q54C1s4I1L0d0-H9K1q54C1s4I1L0d0-H9K2q54C1s4I1L0d0-H9K3q54C1s4I1L0d0-H9K4q54C1s4I1L0d0-H9K5q54C1s4I1L0d0-H9K6q54C1s4I1L0d0-H9K7q54C1s4I1L0d0-H9K8q54C1s4I1L0d0-H9K9q54C1s8I1L0d0-X17Y10q54C1s4I1L0d0-X17Y9q54C1s4I1L0d0-X17Y8q54C1s4I1L0d0-X17Y7q54C1s4I1L0d0-X17Y6q54C1s4I1L0d0-X...7q54C1s4I1L0d0-X2Y6q54C1s4I1L0d0-X2Y5q54C1s4I1L0d0-X3Y10q53C0s4I1L0d0-H6Y7q25C0s8I1L0d0-H9K10q54C1s8I1L0d0-H9K11q54C1s8I1L0d0-H9K12q54C1s8I1L0d0-H9K13q54C1s8I1L0d0-H9K14q54C1s8I1L0d0-H9K15q54C1s8I1L0d0-H9K16q54C1s8I1L0d0-H9K17q54C1s8I1L0d0-H9K18q54C1s8I1L0d0-H9K19q54C1s8I1L0d0-H9K20q54C1s8I1L0d0-H8K20q54C1s8I1L0d0-H7K20q54C1s8I1L0d0-H6K20q54C1s8I1L0d0-H5K20q54C1s8I1L0d0-H4K20q54C1s8I1L0d0-H3K20q54C1s8I1L0d0-H2K20q54C1s8I1L0d0-H1K20q54C1s8I1L0d0-X0K20q54C1s8I1L0d0-X1K20q54C1s8I1L0d0-X2K20q54C1s8I1L0d0-X3K20q54C1s8I1L0d0-X4K20q54C1s8I1L0d0-X5K20q54C1s8I1L0d0-X6K20q54C1s8I1L0d0-X7K20q54C1s8I1L0d0-X8K20q54C1s8I1L0d0-X9K20q54C1s8I1L0d0-X10K20q54C1s8I1L0d0-X11K20q54C1s8I1L0d0-X12K20q54C1s8I1L0d0-X13K20q54C1s8I1L0d0-X14K20q54C1s8I1L0d0-X15K20q54C1s8I1L0d0-X17K12q54C1s8I1L0d0-X17K13q54C1s8I1L0d0-X17K14q54C1s8I1L0d0-X17K15q54C1s8I1L0d0-X17K16q54C1s8I1L0d0-X17K17q54C1s8I1L0d0-X17K18q54C1s8I1L0d0-X17K19q54C1s8I1L0d0-X17K20q54C1s8I1L0d0-X16K20q54C1s8I1L0d0-X17K10q54C1s8I1L0d0-X17K11q54C1s8I1L0d0');
*/


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
var objCuld=filter(objects,o=>o.d[3]==1||o.x>=-c.x-s*20&&o.x<=-c.x+canvas.width+s*10&&o.y>=-c.y-s*20&&o.y<=-c.y+canvas.height+s*30);
    
if (mode==1&&!won&&deathTimer==0) {
    if (keyRPressed) respawn();

    //camera movement
    c.vx=-Math.max(-s*20,Math.min(s*20,Math.floor((-(p.x+10*p.vx-(-c.x+s*10*12))/s/20)**3*10)/20*s));
    c.vy=-Math.max(-s*20,Math.min(s*20,Math.floor((-(p.y+Math.max(p.vy*2,0)-(-c.y+s*10*10))/s/10)**3)/4*s));
    c.x=-Math.max(c.xMin,Math.min(c.xMax,-c.x+c.vx));
    c.y=-Math.max(c.yMin+Math.min(0,(p.y-c.yMax-s*20)/1.5),Math.min(c.yMax,-c.y+c.vy));
    
    
    //Lock Detection (occurs before colision) - check all players - USES GLOBAL KEYS
    let lockeds=filter(objCuld,o=>o.id==61);
    for(let i=0;i<lockeds.length;i++) {
        let O=lockeds[i];
        for(let j=0;j<players.length;j++) {
            let pl=players[j];
            if (globalKeys>0&&(O.x==pl.x+pl.w*s&&O.y<pl.y+s*pl.h&&O.y+s*O.c>pl.y||O.x+O.c*s==pl.x&&O.y<pl.y+s*pl.h&&O.y+s*O.c>pl.y||O.y==pl.y+pl.h*s&&O.x<pl.x+s*pl.w&&O.x+s*O.c>pl.x||O.y+O.c*s==pl.y&&O.x<pl.x+s*pl.w&&O.x+s*O.c>pl.x)) {
                objects=filter(objects,o=>o!=O);
                objCuld=filter(objCuld,o=>o!=O);
                globalKeys-=1;
                break;
            }
        }
    }
    
    //pushable blocks - check all players
    let pushableObjs=filter(objCuld,o=>o.d[1]==1);
    for(let i=0;i<pushableObjs.length;i++) {
        let O=pushableObjs[i];
        if (O.s==0) {
            for(let j=0;j<players.length;j++) {
                let pl=players[j];
                if (O.x==pl.x+pl.w*s&&O.y<pl.y+s*pl.h&&O.y+s*O.c>pl.y&&!some(objCuld,o=>o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&o.x==O.x+O.c*s)) {O.x+=s;O.s=3;break;}
                if (O.x+O.c*s==pl.x&&O.y<pl.y+s*pl.h&&O.y+s*O.c>pl.y&&!some(objCuld,o=>o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&O.x==o.x+o.c*s)) {O.x-=s;O.s=3;break;}
                if (O.y==pl.y+pl.h*s&&O.x<pl.x+s*pl.w&&O.x+s*O.c>pl.x&&!some(objCuld,o=>o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&o.y==O.y+O.c*s)) {O.y+=s;O.s=3;break;}
                if (O.y+O.c*s==pl.y&&O.x<pl.x+s*pl.w&&O.x+s*O.c>pl.x&&!some(objCuld,o=>o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&O.y==o.y+o.c*s)) {O.y-=s;O.s=3;break;}
            }
        } else O.s=Math.max(0,O.s-1);}

    //moving blocks - check all players
    let movingBlocks=filter(objCuld,o=>o.id==68);
    for(let i=0;i<movingBlocks.length;i++) {
        let O=movingBlocks[i];
            let playerBelow=some(players,pl=>O.y+O.c*s==pl.y&&O.x<pl.x+s*pl.w&&O.x+s*O.c>pl.x);
            let playerAbove=some(players,pl=>O.y==pl.y+pl.h*s&&O.x<pl.x+s*pl.w&&O.x+s*O.c>pl.x);
            if (O.s%2==0){if (!some(objCuld,o=>o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&o.y==O.y+O.c*s)&&!playerBelow) {if(fCT%3==0)O.y+=s;} else {O.s+=0;}
            } else       {if (!some(objCuld,o=>o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&O.y==o.y+o.c*s)&&!playerAbove) {if(fCT%3==0)O.y-=s;} else {O.s-=1;}}}

    //enemy movement
    let movingEnemies=filter(objCuld,o=>o.id==11||o.id==12||o.id==63||o.id==64);
    for(let i=0;i<movingEnemies.length;i++) {
        let O=movingEnemies[i];
        if (O.s>3) O.s=0;
        if (O.id==64){
            if (O.s%2==0){if (!some(objCuld,o=>o.c!=0&&o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&o.y==O.y+O.c*s)) {O.y+=s;} else {O.s=1;}
            } else       {if (!some(objCuld,o=>o.c!=0&&o.x<O.x+s*O.c&&o.x+s*o.c>O.x&&O.y==o.y+o.c*s)) {O.y-=s;} else {O.s=0;}}
        } else if (O.id==63){
            if (O.s%2==0){if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&o.x==O.x+O.c*s)) {O.x+=s;} else {O.s=1;}
            } else       {if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&O.x==o.x+o.c*s)) {O.x-=s;} else {O.s=0;}}
        } else {
            if (!O.vy)O.vy=0;
            let yC=filter(objCuld,o=>o.x+o.c*s>O.x&&o.x<O.x+O.c*s&&o.y>=O.y+s*O.c&&o.y<=O.y+s*O.c+O.vy&&O!=o).sort((a,b)=>Math.sign(O.y-a.y)*(a.y-b.y))[0];
            if (yC) {
                O.y=yC.y-O.c*s;O.vy=0;
            } else O.y+=O.vy;
            O.vy+=s/4;
            if (O.s%4==2){if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&o.x==O.x+O.c*s)) {O.x+=s/2;O.s+=1;} else {O.s=1;}
            } else if (O.s%4==0){if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&O.x==o.x+o.c*s)) {O.x-=s/2;O.s+=1;} else {O.s=3;}
            } else {O.s-=1;}}
        
        //kill out of bounds enemies
        if (O.x<c.xMin-O.i*s||O.x>s*10*24+c.xMax||O.y>s*10*16+c.yMax||O.y<c.yMin-s*10*6.7){
            objects=filter(objects,o=>o!=O);
            objCuld=filter(objCuld,o=>o!=O);}}
    
    //dead goomba
    let deadGoombas=filter(objCuld,o=>o.id==1100);
    for(let i=0;i<deadGoombas.length;i++) {
        let O=deadGoombas[i];
        O.s+=.1;
        if (O.s>2.8) objects=filter(objects,o=>o!=O);}
    
    //moving powerups (id 13=star, id 14=mushroom)
    let movingPowerups=filter(objCuld,o=>o.id==13||o.id==14);
    for(let i=0;i<movingPowerups.length;i++) {
        let O=movingPowerups[i];
        // Initialize physics if not present
        if (!O.vy) O.vy=0;
        
        // Gravity
        let yC=filter(objCuld,o=>o.c>0&&o.x+o.c*s>O.x&&o.x<O.x+O.i*s&&o.y>=O.y+O.i*s&&o.y<=O.y+O.i*s+O.vy&&O!=o).sort((a,b)=>Math.sign(O.y-a.y)*(a.y-b.y))[0];
        if (yC) {
            O.y=yC.y-O.i*s;
            O.vy=0;
        } else {
            O.y+=O.vy;
        }
        O.vy+=s/4;
        
        // Horizontal movement
        if (O.s%4==2) {
            // Moving right
            if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.i&&o.y+s*o.c>O.y&&o.x==O.x+O.i*s)) {
                O.x+=s/2;
            } else {
                O.s=0; // Switch to left
            }
        } else if (O.s%4==0) {
            // Moving left
            if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.i&&o.y+s*o.c>O.y&&O.x==o.x+o.c*s)) {
                O.x-=s/2;
            } else {
                O.s=2; // Switch to right
            }
        }
        
        // Kill out of bounds powerups
        if (O.x<c.xMin-O.i*s||O.x>s*10*24+c.xMax||O.y>s*10*16+c.yMax||O.y<c.yMin-s*10*6.7){
            objects=filter(objects,o=>o!=O);
            objCuld=filter(objCuld,o=>o!=O);
        }
    }
    
    //mario shells
    let deadKTs=filter(objCuld,o=>o.id==1200);
    for(let i=0;i<deadKTs.length;i++) {
        let O=deadKTs[i];
            if (!O.vy) O.vy=0;
            let yC2=filter(objCuld,o=>o.x+o.c*s>O.x&&o.x<O.x+O.c*s&&o.y>=O.y+s*O.c&&o.y<=O.y+s*O.c+O.vy&&O!=o).sort((a,b)=>Math.sign(O.y-a.y)*(a.y-b.y))[0];
            if (yC2) {
                O.y=yC2.y-O.c*s;O.vy=0;
            } else O.y+=O.vy;
            O.vy+=s/4;
            if (O.s==1) {if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&o.x==O.x+O.c*s)) {O.x=O.x+s-O.x%s} else {O.s=2;}
            } else if (O.s==2) {if (!some(objCuld,o=>o.c!=0&&o.y<O.y+s*O.c&&o.y+s*o.c>O.y&&O.x==o.x+o.c*s)) {O.x=O.x-s-O.x%s} else {O.s=1;}
            }
            if (O.s==0){
                if (p.y+p.h*s>=O.y&&p.y<O.y+O.c*s&&p.x+p.w*s>O.x-s&&p.x<O.x+O.c*s+s){
                    if (p.x+p.w*s/2<=O.x+O.c*s/2){
                        O.s=1;
                    } else O.s=2;
                    if (p.y+p.h*s<=O.y) p.vy=-s*2;}
            } else if (O.x<p.x+p.w*s&&O.x+O.c*s>p.x&&p.y+p.h*s==O.y) {O.s=0;p.vy=-s*2;}
            if (O.x<p.x+s*p.w&&O.x+s*O.c>p.x&&O.y<p.y+p.h*s&&O.y+s*O.c>p.y)deathTimer=1;
            if (O.x<c.xMin-O.i*s||O.x>s*10*24+c.xMax||O.y>s*10*16+c.yMax||O.y<c.yMin-s*10*6.7){
                objects=filter(objects,o=>o!=O);
                objCuld=filter(objCuld,o=>o!=O);}
            }
    
    //lasers
    
    let laserSummoners=filter(objCuld,o=>o.id==69);//nice
    for(let i=0;i<laserSummoners.length;i++) {
        let O=laserSummoners[i];
        if (fCT%150==0||O.s%2==1){
        O.s=(O.s%4>=2)?O.s-O.s%4:O.s-O.s%4+2;
        others.push({x:O.x+O.i/8*s,y:O.y+O.i/8*3*s,id:69.1,vx:s*1.5,vy:0,i:O.i});
        others.push({x:O.x+O.i/8*s,y:O.y+O.i/8*3*s,id:69.1,vx:-s*1.5,vy:0,i:O.i});
        others.push({x:O.x+O.i/8*3*s,y:O.y+O.i/8*s,id:69.2,vx:0,vy:s*1.5,i:O.i});
        others.push({x:O.x+O.i/8*3*s,y:O.y+O.i/8*s,id:69.2,vx:0,vy:-s*1.5,i:O.i});
    }}
    let lasers=filter(others,o=>o.id-o.id%1==69);
        for(let i=0;i<lasers.length;i++) {
        let O=lasers[i];
        O.x+=O.vx;O.y+=O.vy;
        // Check collision with blocks
        let laserSize = O.i/8*2*s;
        if (some(objCuld,o=>o.c>0&&o.x<O.x+laserSize&&o.x+o.c*s>O.x&&o.y<O.y+laserSize&&o.y+o.c*s>O.y)) {
            others=filter(others,o=>o!=O);
            continue;
        }
        // Check collision with players
        for(let j=0;j<players.length;j++) {
            let pl=players[j];
            if (O.x<pl.x+s*pl.w&&O.x+laserSize>pl.x&&O.y<pl.y+pl.h*s&&O.y+laserSize>pl.y) {
                if (pl.takeDamage()) {
                    deathTimer=1;
                }
                others=filter(others,o=>o!=O);
                break;
            }
        }
        if (O.x<c.xMin-O.i*s||O.x>s*10*24+c.xMax||O.y>s*10*16+c.yMax||O.y<c.yMin-s*10*6.7){
            others=filter(others,o=>o!=O);}}
    
    
    // Player-to-player collisions
    for(let i=0;i<players.length;i++) {
        for(let j=i+1;j<players.length;j++) {
            let p1 = players[i];
            let p2 = players[j];
            
            // Check if players overlap
            if (p1.x < p2.x + p2.w * s && p1.x + p1.w * s > p2.x &&
                p1.y < p2.y + p2.h * s && p1.y + p1.h * s > p2.y) {
                
                // Horizontal collision
                if (Math.abs((p1.x + p1.w * s / 2) - (p2.x + p2.w * s / 2)) > Math.abs((p1.y + p1.h * s / 2) - (p2.y + p2.h * s / 2))) {
                    if (p1.x < p2.x) {
                        let overlap = p1.x + p1.w * s - p2.x;
                        p1.x -= overlap / 2;
                        p2.x += overlap / 2;
                    } else {
                        let overlap = p2.x + p2.w * s - p1.x;
                        p1.x += overlap / 2;
                        p2.x -= overlap / 2;
                    }
                    p1.vx = 0;
                    p2.vx = 0;
                } else {
                    // Vertical collision
                    if (p1.y < p2.y) {
                        let overlap = p1.y + p1.h * s - p2.y;
                        p1.y -= overlap / 2;
                        p2.y += overlap / 2;
                        p1.vy = Math.min(p1.vy, 0);
                        p2.vy = Math.max(p2.vy, 0);
                        p2.jump = true;
                    } else {
                        let overlap = p2.y + p2.h * s - p1.y;
                        p1.y += overlap / 2;
                        p2.y -= overlap / 2;
                        p1.vy = Math.max(p1.vy, 0);
                        p2.vy = Math.min(p2.vy, 0);
                        p1.jump = true;
                    }
                }
            }
        }
    }
    
    // Process each player independently
    players.forEach(player => {
        //movement input
        if (keyAPressed||keyLeftPressed){
            player.vx=Math.max(-player.vMax*s,Math.min(-s,player.vx-s));
        } else if (keyDPressed||keyRightPressed){
            player.vx=Math.min(player.vMax*s,Math.max(s,player.vx+s));
        } else player.vx=0;
        if (player.jump&&(keyWPressed||keyUpPressed||keySpacePressed)) {
            player.vy=-s*player.jumpPower;
        }
        player.jump=false;
        
        //spring
        if (some(objCuld,o=>o.id==58&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&player.y+player.h*s==o.y)) player.vy=-s*6;
        if (some(objCuld,o=>o.id==58&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&player.y==o.y+o.i*s)) player.vy=s*2;
        
        //player collisions. collidable=if within player velocities and if not overlapping with player
        let collidable=filter(objCuld,o=>o.c!=0&&o.x<player.x+s*player.w+Math.max(player.vx,0)&&o.x+o.c*s>player.x+Math.min(player.vx,0)&&o.y<player.y+s*player.h+Math.max(player.vy,0)&&o.y+o.c*s>player.y+Math.min(player.vy,0)&&!(o.x+o.c*s>player.x&&o.x<player.x+player.w*s&&o.y+o.c*s>player.y&&o.y<player.y+player.h*s));
        let yC=filter(collidable,o=>o.x+o.c*s>player.x&&o.x<player.x+player.w*s).sort((a,b)=>-(b.y-a.y))[0];
        let xC=filter(collidable,o=>o.y+o.c*s>player.y&&o.y<player.y+player.h*s).sort((a,b)=>-(b.x-a.x))[0];
        if (collidable.length>0&&!xC&&!yC) {
            player.x+=player.vx;
            yC=filter(collidable,o=>o.x+o.c*s>player.x&&o.x<player.x+player.w*s).sort((a,b)=>-(b.y-a.y))[0];
            collideY(player,yC);
        } else if (yC) {
            collideY(player,yC);
            xC=filter(collidable,o=>o.y+o.c*s>player.y&&o.y<player.y+player.h*s).sort((a,b)=>-(b.x-a.x))[0];
            collideX(player,xC);
        } else if (xC) {
            collideX(player,xC);
            yC=filter(collidable,o=>o.x+o.c*s>player.x&&o.x<player.x+player.w*s).sort((a,b)=>-(b.y-a.y))[0];
            collideY(player,yC);
        } else {
            player.x+=player.vx;
            player.y+=player.vy;}
        player.vy=Math.min(player.vy+s/4,s*10);//gravity

        //stomp on enemies
        let stompedEnemies=filter(objCuld,o=>(o.id==11||o.id==12||o.id==63||o.id==64||o.id==65)&&o.x<player.x+player.w*s+s&&o.x+o.c*s-s>player.x&&player.y+player.h*s>=o.y-s&&player.y+player.h*s<=o.y);
        for(let i=0;i<stompedEnemies.length;i++) {
            let O=stompedEnemies[i];
            if (O.id==11||O.id==12){
                var O2={...O};
                O2.id*=100;O2.c=(O.id==11)?0:O2.c/2;O2.s=0;
                if (O.id==12) {O2.x+=2*s;O2.y+=3*s;}
                objects.push(O2);
            }
            objects=filter(objects,o=>o!=O);
            objCuld=filter(objCuld,o=>o!=O);
            player.vy=-s*3;}
    });
    
    // Update p reference for backward compatibility
    if (players.length > 0) p = players[0];

    //Breakable Blocks and Powerup Spawning
    let breakableObjs=filter(objCuld,o=>o.d[0]==1)
        for(let i=0;i<breakableObjs.length;i++) {
            let O=breakableObjs[i];
            let playerBreak = some(players,pl=>O.x<pl.x+s*pl.w&&O.x+s*O.c>pl.x&&pl.y==O.y+O.c*s);
            if (playerBreak||some(objCuld,o=>o.id==1200&&O.y+s<o.y+o.c*s&&O.y+O.c*s>o.y&&(o.x==O.x+O.c*s+s&&o.s==1||o.x+o.c*s==O.x-s&&o.s==2))) {
                // Spawn powerup if d[2]==1
                if (O.d[2]==1) {
                    let powerupId = Math.random() < 0.5 ? 13 : 14; // Random star or mushroom
                    objects.push({
                        x: O.x,
                        y: O.y - O.i * s,
                        id: powerupId,
                        c: 0,
                        s: Math.random() < 0.5 ? 0 : 2, // Random direction (0=left, 2=right)
                        i: O.i,
                        l: O.l,
                        d: [0,0,0,0],
                        vx: 0,
                        vy: 0
                    });
                }
                objects=filter(objects,o=>o!=O);
                objCuld=filter(objCuld,o=>o!=O);}}
    
    //update switches
    let switches=filter(objCuld,o=>o.id==66);
    for(let i=0;i<switches.length;i++) {
        let O=switches[i];
        let canBe=objCuld.some(o=>(o.id==68||o.id==56||o.id<=12&&o.id>=11||o.id>=1000||o.id>=63&&o.id<=64)&&o.c!=0&&O.x<o.x+s*o.c&&O.x+s*O.i>o.x&&O.y<o.y+o.c*s&&O.y+s*O.i>o.y);
        let playerOn=some(players,pl=>O.x<pl.x+s*pl.w&&O.x+s*O.i>pl.x&&O.y<pl.y+pl.h*s&&O.y+s*O.i>pl.y);
        if (playerOn||canBe) {
            O.s=O.s-O.s%2+1;
        } else {O.s=O.s-O.s%2;}}
    
    
    //channels
    for (let j=0;j<channels.length;j++) {
        if (some(switches,o=>o.s%2==1&&(o.s-o.s%4)/4==j+1)) {
            channels[j]=1;
            if (j==30){objects=filter(objects,o=>!(o.id==11||o.id==12||o.id==63||o.id==64||o.id==65)).concat(filter(toObjects(previousObjects[0]),o=>o.id==11||o.id==12||o.id==63||o.id==64||o.id==65));objects=objects.map(function(o){return {x:(o.id>=11&&o.id<=12||o.id>=63&&o.id<=65)?o.x+s:o.x,y:(o.id>=11&&o.id<=12||o.id>=63&&o.id<=65)?o.y+s:o.y,id:o.id,c:o.c,s:o.s,i:o.i,l:o.l,d:o.d};});} 
        } else channels[j]=0;}
    
    //update toggleable blocks
    let toggleBlocks=filter(objCuld,o=>o.s>=4);
    for(let i=0;i<toggleBlocks.length;i++) {
        let O=toggleBlocks[i];
        if (O.s%4<2){O.s=O.s-O.s%2+channels[Math.floor(O.s/4)-1];
        } else O.s=O.s-O.s%2+1-channels[Math.floor(O.s/4)-1];
        if (O.id==67) O.c=Math.abs(O.s%2-1)*O.i;}

            //Keys - check all players - SHARED GLOBALLY
    players.forEach(player => {
        if(some(objCuld,o=>(o.id==60)&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y)) {
            let collected0=objects.length;
            objects=filter(objects,o=>!((o.id==60)&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y));
            globalKeys+=(collected0-objects.length);}
    });
    
    //coins and powerups for all players
    players.forEach(player => {
        // Update player power up timers
        player.update();
        
        // Coins - SHARED GLOBALLY
        if(some(objCuld,o=>(o.id==10||o.id==57)&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y)) {
            let collected0=objects.length;
            objects=filter(objects,o=>!((o.id==10||o.id==57)&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y));
            globalCoins+=(collected0-objects.length);}
        
        // Invincibility powerup (star - id 13)
        if(some(objCuld,o=>o.id==13&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y)) {
            objects=filter(objects,o=>!(o.id==13&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y));
            player.invincible = true;
            player.invincibleTimer = 300; // 5 seconds of invincibility
        }
        
        // Second life powerup (mushroom - id 14)
        if(some(objCuld,o=>o.id==14&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y)) {
            objects=filter(objects,o=>!(o.id==14&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y));
            player.powered = true;
        }
    });
    
    //portals - check each player
    players.forEach(player => {
        cI=objCuld.findIndex(o=>o.id==59&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y);
        if (cI>-1) {if (player.portalCooldown==0){
            cI2=objCuld.findIndex(o=>o.id==59&&objCuld[cI].s-objCuld[cI].s%4==o.s-o.s%4&&objCuld[cI]!=o);
            if (cI2>-1) {
                player.x=objCuld[cI2].x+objCuld[cI2].i*s/2-player.w*s/2;
                player.y=objCuld[cI2].y+objCuld[cI2].i*s/2-player.h*s/2;
                player.vx=0;player.vy=0;
                player.portalCooldown=100;}} else player.portalCooldown-=1;
        } else player.portalCooldown=0;
    });
    // Update camera to first player
    if (players.length > 0) {
        c.x=-Math.max(c.xMin,Math.min(c.xMax,players[0].x-s*10*12));
        c.y=-Math.max(c.yMin,Math.min(c.yMax,players[0].y-s*10*8));
    }
    
    
    //checkpoint - each player checks independently
    players.forEach(player => {
        cI=objCuld.findIndex(o=>o.id==51&&o.x<player.x+s*player.w&&o.x+s*o.i>player.x&&o.y<player.y+player.h*s&&o.y+s*o.i>player.y&&o.s%2==0);
        if(cI>-1) {
            // Mark this checkpoint as activated for THIS player
            if (!player.checkpoint) player.checkpoint = objCuld[cI];
            player.checkpoint = objCuld[cI];
            player.startX = objCuld[cI].x + objCuld[cI].i * s / 2 - player.w * s / 2;
            player.startY = objCuld[cI].y + objCuld[cI].i * s / 2 - player.h * s / 2;
            objCuld[cI].s = objCuld[cI].s - objCuld[cI].s%2 + 1; // Activate visually
        }
    });

    //win - any player can win
    if(some(players,pl=>some(objCuld,o=>o.id==53&&o.x<pl.x+s*pl.w&&o.x+s*o.i>pl.x&&o.y<pl.y+pl.h*s&&o.y+s*o.i>pl.y))) {
        won=true;
    
    //death - check all players - INDIVIDUAL RESPAWN
    } else {
        for(let i=0;i<players.length;i++) {
            let player = players[i];
            if (player.x<c.xMin-player.w*s||player.x>s*10*24+c.xMax||player.y>s*10*16+c.yMax
                ||some(objCuld,o=>(o.id==11||o.id==12||o.id==26||o.id==62||o.id==63||o.id==64||o.id==65)&&o.x-s<player.x+s*player.w&&o.x-s+s*o.i>player.x&&o.y-s<player.y+player.h*s&&o.y-s+s*o.i>player.y)) {
                if (player.takeDamage()) {
                    // Respawn just this player
                    player.respawnPlayer();
                }
            }
        }
    }

} else if (mode==0) {
    if (keyWPressed||keyUpPressed) c.y+=3*s*c.z;
    if (keyAPressed||keyLeftPressed) c.x+=3*s*c.z;
    if (keySPressed||keyDownPressed) c.y-=3*s*c.z;
    if (keyDPressed||keyRightPressed) c.x-=3*s*c.z;
    if (mouseZ==1) {
        if (mouseY<=canvas.height/screenHeightBlocks*(screenHeightBlocks-4)) {
            let X=Math.floor((mouseX-c.x)/(s*editGridSize));
            let Y=Math.floor((mouseY-c.y)/(s*editGridSize));
            if (editObjId>69||(editObjId>12&&editObjId<50)&&editObjId!=25&&editObjId!=26) {
                objects=filter(objects,o=>!(o.x==X*s*editGridSize&&o.y==Y*s*editGridSize&&o.l==editLayer));
            } else {
            let oI=objects.findIndex(o=>o.x==X*s*editGridSize&&o.y==Y*s*editGridSize&&o.l==editLayer);
            if(oI!=-1){
                objects[oI].id=editObjId;
                objects[oI].c=getCollision(editObjId);
                objects[oI].s=(editObjId==51)?0:editState*3+(editChannel+1)*4;
                objects[oI].i=editSize;
                objects[oI].d=editBlockData;
            } else {
                objects.push({
                    x:X*s*editGridSize,
                    y:Y*s*editGridSize,
                    id:editObjId,
                    c:getCollision(editObjId),
                    s:(editObjId==51)?0:editState*3+(editChannel+1)*4,
                    i:editSize,
                    l:editLayer,
                    d:editBlockData});
                    }}
            
            //save history
            if (toSave(objects)!=previousObjects[0]){previousObjects.unshift(toSave(objects));}
            
        } else if (mouseX>s*3&&mouseX<canvas.width-s*3) {
            editObjId=Math.floor((mouseY-canvas.height/screenHeightBlocks*(screenHeightBlocks-4))/(s*10*c.z))*Math.floor(screenHeightBlocks*8/5)+Math.floor((mouseX-s*3)/(s*10*c.z));
            editBlockData=[0,0,0,0];
            updateBD();
        }
    }
}

//Draw objects on screen
for (let l = 0; l < 100; l++) layers[l].length = 0;//empty layers
for (let i = 0, len = objCuld.length; i < len; i++) layers[objCuld[i].l].push(objCuld[i]);//update layers
for (let l = 0; l < 100; l++) {
    const bucket = layers[l];
    for (let j = 0, blen = bucket.length; j < blen; j++) {
        drawObj(bucket[j],mode);
    }}


//draw player and others
if (mode==1) { 
    // Draw all players
    players.forEach(player => {
        player.draw(ctx, c, s);
    });
    
    for (let i=0;i<others.length;i++){
        let O=others[i];
        if (O.id==69.1) {drawRect(O.x,O.y,O.i/8*6*s,O.i/8*2*s,"255,41,74");continue;}
        if (O.id==69.2) {drawRect(O.x,O.y,O.i/8*2*s,O.i/8*6*s,"255,41,74");continue;}
    }
    }

//edit mode overlays
if (mode==0) {
    ctx.fillStyle="rgb(0,0,0)";
    ctx.fillRect(0,canvas.height/screenHeightBlocks*(screenHeightBlocks-4.1),canvas.width,canvas.height/screenHeightBlocks*4);
    ctx.fillStyle="rgb(180,180,180)";
    ctx.fillRect(0,canvas.height/screenHeightBlocks*(screenHeightBlocks-4),canvas.width,canvas.height/screenHeightBlocks*4);
    
    let autoTile=0;
    for (let i=0;i<4;i++){
        for (let j=0;j<Math.floor(screenHeightBlocks*8/5);j++){
            if (Math.floor(screenHeightBlocks*8/5)*i+j==2){autoTile=1;} else autoTile=0;
            drawObj({x:j*s*10*c.z-c.x+s*3*c.z,y:i*s*10*c.z+s*10*c.z*(screenHeightBlocks-4)-c.y,id:Math.floor(screenHeightBlocks*8/5)*i+j+autoTile/2,i:10*c.z,s:0});
        }
    }
    (editObjId*s*10)%Math.floor(screenHeightBlocks*8/5)
    ctx.fillStyle="rgba(0,0,0,0.3)";
    ctx.fillRect(editObjId%Math.floor(screenHeightBlocks*8/5)*s*10*c.z+s*3,canvas.height/screenHeightBlocks*(screenHeightBlocks-4)+Math.floor(editObjId/Math.floor(screenHeightBlocks*8/5))*s*10*c.z,s*10*c.z,s*10*c.z)
    ctx.fillStyle="rgba(255,255,255,0.3)";
    ctx.fillRect(
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?c.z*s*10*Math.floor((mouseX-s*3)/(s*10*c.z))+s*3:s*editGridSize*Math.floor((mouseX-c.x%(s*editGridSize))/(s*editGridSize))+c.x%(s*editGridSize), 
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?canvas.height/screenHeightBlocks*Math.floor(mouseY/canvas.height*screenHeightBlocks):s*editGridSize*Math.floor((mouseY-c.y%(s*editGridSize))/(s*editGridSize))+c.y%(s*editGridSize),
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?s*10*c.z:s*editSize,
        (mouseY>canvas.height/screenHeightBlocks*(screenHeightBlocks-4))?s*10*c.z:s*editSize);}//mouse highlight


//death time
if (deathTimer>0) {deathTimer+=1;}
if (deathTimer==30) respawn();
}

//get fps
let fC=0;
let fps=0;
let fCT=0;//total frames
let last=performance.now();
let pause=false;
function f() {
    const n = performance.now();
    if (keyPPressed){keyPPressed=false;pause=!pause;}
    if (!pause) t();
    fC++;fCT++;
    if (n-last>=1000) {fps=fC;fC=0;last=n;}
requestAnimationFrame(f);
}
requestAnimationFrame(f);

/* TO DO
  - turn player into object
  - add levels menu
  - powerups (including gun)
  - better enemies (with guns?)
  - moving blocks left/right
  - 
 */
