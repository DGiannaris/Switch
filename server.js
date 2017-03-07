let app = require('http').createServer()//create http localhost
let io = require('socket.io')(app);
app.listen(8000);//8000 port on the localhost server i jst created
let result;
let result2;



	
let https=require('https');
//let http=require('http');
 let profile;
let request=function (){
	https.get("https://api.twitch.tv/kraken/streams/" + "iwilldominate?client_id=p5d4th8o23p7t21fr6hp4gu1n3d2jc"
 	,function(response)	 
  {
	 
 	//console.log(response.statusCode);//the status of the api server //200 is good xD
 	let body = ""; 
 	response.on("data",function(chunk){ //gemizei the fckin body let with the fckin chunks from the fckin api
	
	
	body +=chunk;//get the next chunk of data untill they end (2)

  
		 

 	});
	 
 	 response.on("end",function(){ //when data end (2)
 		 profile = JSON.parse(body);
		

 if ( profile.stream == null) { 
 	//if streamer is off
       result={
    'Status': 'Offline',
    'Viewers': ''
};
        clearInterval(interval);// stop the brutal management of the poor API when the streamer is offline
     } else {

     	//if streamer in on

       result=result={
    'Status': 'Live',
    'Viewers': ''+profile.stream.viewers
};
	   
      
     }


		
 	 });
  });
 	};
 let interval=setInterval(request,1000);// to be done for 300000,which is 5 mins








io.on('connection',function(socket){
socket.emit('alert',result);//send the results to client



});