//飞机
var Plane = function(name){
    this.name = name;
}
 
Plane.prototype.takeOff = function(){ //起飞
     ControlTower.takeOff(this);
}
 
Plane.prototype.sendMsg = function(toPlane, msg){ //飞机间发消息
     ControlTower.sendMsg(this, toPlane, msg);
}
 
Plane.prototype.receive = function(fromPlane, msg){
     console.log(this.name + "-收到来自-" + fromPlane.name + "消息:" + msg);
}
 
//飞机控制塔(中介者)
var ControlTower = (function(){
     //假设只有一条跑道，跑道只能起飞一只飞机（不说降落）
     var onTrackPlaneName,
          canTrackUse = true;
    var takeOff = function(plane){
          if(!canTrackUse){
               console.log("跑道正在使用中...");
               return;
          }
          if(onTrackPlaneName == plane.name){
               console.log("您正在起飞中...");
            return;
          }
          canTrackUse = false;
          onTrackPlaneName = plane.name;
          console.log(plane.name + "正在起飞中...");
          setTimeout(function(){
               canTrackUse = true;
               onTrackPlaneName = null;
               console.log(plane.name + "已起飞...");
          }, 5000);
    }
    var sendMsg = function(from ,to , msg){
          console.log(from, to, msg);
          to.receive(from, msg);
    }
 
    return {
        takeOff : takeOff,
        sendMsg : sendMsg
    }
})();
 
var p747 = new Plane('波音747');
var p666 = new Plane('飞豹666');
 
p747.takeOff();
p666.takeOff();
p747.sendMsg(p666, '开完飞机吃个饭么');