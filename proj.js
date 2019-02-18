
var firebase = require("firebase");

var config = {
    apiKey: "AIzaSyB-sfRn7dLv_fF2JqxFlXwM-zKZuJotEC4",
    authDomain: "light-swarm.firebaseapp.com",
    databaseURL: "https://light-swarm.firebaseio.com",
    projectId: "light-swarm",
    storageBucket: "light-swarm.appspot.com",
    messagingSenderId: "528426167514"
  };
  firebase.initializeApp(config);

database = firebase.database();

var arr1 = [];
var arr2 = [];
var max1 = 0;
var min1 = 65000;
var max2 = 0;
var min2 = 65000;
var avg1 = 0;
var avg2 = 0;


database.ref("LightData").on("child_added", function(childsnapshot,prevchildsnapshot) {
    var lightdata = childsnapshot.val();

    var mdata = lightdata.masterData;
    var mIP = lightdata.masterIP;
    var sIP = lightdata.slaveIP;
    var sdata = lightdata.slaveData;

    if(Number(mIP)>Number(sIP)){
        if(arr1.length<100){
            arr1.push(mdata);
        }
        else {
            avg1-=Number(arr1.shift());
            arr1.push(mdata);
        }

        avg1+=Number(mdata);
        
        if(arr2.length<100)arr2.push(sdata);
        else{
            avg2-=Number(arr2.shift());
            arr2.push(sdata);
        }

        avg2+=Number(sdata);

        if(max1<Number(mdata)) max1=Number(mdata);
        if(min1>Number(mdata)) min1=Number(mdata);

        if(max2<Number(sdata)) max2=Number(sdata);
        if(min2>Number(sdata)) min2=Number(sdata);
        console.log("********************************** Key: "+key+" **************************************************");
        console.log("Sliding Window of master esp: "+mIP+" is :"+arr1);
        console.log("master Max :"+max1+"      master Min: "+min1+"     master average reading: "+avg1/arr1.length);
        console.log("Sliding Window of slave esp: "+sIP+" is :"+arr2);
        console.log("slave Max :"+max2+"      slave Min: "+min2+"       slave average reading: "+avg2/arr2.length);
        console.log("********************************** Key: "+key+" **************************************************");
    }

    else{
        if(arr2.length<200)arr2.push(mdata);
        else {
            avg2-=Number(arr2.shift());
            arr2.push(mdata);
        }
        avg2+=Number(mdata);
        if(arr1.length<200)arr1.push(mdata);
        else{
            avg1-=Number(arr1.shift());
            arr1.push(sdata);
        }
        avg1+=Number(sdata);
        if(max2<Number(mdata)) max2=Number(mdata);
        if(min2>Number(mdata)) min2=Number(mdata);

        if(max1<Number(sdata)) max1=Number(sdata);
        if(min1>Number(sdata)) min1=Number(sdata);

        console.log("********************************** Key: "+key+" **************************************************");
        console.log("Sliding Window of master esp: "+mIP+" is :"+arr1);
        console.log("master Max :"+max2+"      master Min: "+min2+"       master average reading: "+avg2/arr2.length);
        console.log("Sliding Window of slave esp: "+sIP+" is :"+arr2);
        console.log("slave Max :"+max1+"      slave Min: "+min1+"         slave average reading: "+avg1/arr1.length);
        console.log("********************************** Key: "+key+" **************************************************");

    }

});