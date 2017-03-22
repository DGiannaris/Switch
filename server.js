let app = require('http').createServer()//create http localhost
var io = require('socket.io')(app);
let request = require('request');
app.listen(8000);//8000 port on the localhost server i jst created

let result;
let result2;
let existsflag;
let channelid;
let savedStreamers = [];
var status;
let channelname;
let gotStreamers=1;


io.on('connection',function(socket){

	socket.on('getname',function(data){
		let options = {
			url: 'https://api.twitch.tv/kraken/users?login='+data,
			method: 'GET',
			form: '',
			headers: {
				'Client-ID': 'p5d4th8o23p7t21fr6hp4gu1n3d2jc',
				'Accept': 'application/vnd.twitchtv.v5+json',
				'Content-Type': 'application/json',
				'Authorization': ''
			}
		};

	    request(options, (err, res, body) => {
			result2 = JSON.parse(body);
			if (result2._total != 0) {
			 	existsflag = 1;
				 if (data != '') {
				 	channelid = result2.users[0]._id;//auth thn mlkia thn stelnw stou alekou
				 }
			} else {
				 existsflag = 0;
			}

			console.log(existsflag + "/" + channelid);

			//Use ternary to check if user exists
			/* Ternary example:

				//PseudoCode
				let flag = true

				flag ? 'Do that if true' : 'Do that if false'

				//Output

				'Do that if true'
				
				------------------------------------------------

				Think of it like:

				if (flag) {
					'Do that if true'
				} else {
					'Do that if false'
				}

			*/
			socket.emit('streamerId', existsflag ? channelid : 'User does not exist!');  //send the results to client         
		});
	})//socket on getname
});//io on get name





io.on('connection',function(socket){

	socket.on('getstreams',function(data){

		setTimeout(streamstatus, 2000);// den gemizan oi vars egkaira gt to api ths twitch gamietai

		if(channelid != undefined) {
			data.streams.push(channelid)
		}

		function streamstatus() { //40336240,44741426,31989055
			if(data != null) {
				console.log("going for status")
		    	console.log(data.streams.toString().replace(['[',']'],''))
				let options =
				 {
			       url: 'https://api.twitch.tv/kraken/streams/?channel='+data.streams.toString().replace(['[',']'],''),
			         //url: 'https://api.twitch.tv/kraken/streams/codepougurnaei',// apo to onject pairneis to id kai to xtupas edw k pirneis live ktl
			       //44741426
			       //39548541
			       //31989055
			//  url: 'https://api.twitch.tv/kraken/streams/?channel=40336240',url: 'https://api.twitch.tv/kraken/users?login=summonersinnlive'

			        method: 'GET',
			        form: '',
			        headers:
			         {
			            'Client-ID': 'p5d4th8o23p7t21fr6hp4gu1n3d2jc',
			            'Accept': 'application/vnd.twitchtv.v5+json',
			            'Content-Type': 'application/json',
			            'Authorization': ''
			        }
			     };

			request(options, (err, res, body) => {

			  result = JSON.parse(body);
			 

			if(result._total != 0)
			{
				  status=result

				// for(var streams in result){
				// 	console.log("GIWTA: "+i)
				// let test=result
				console.log(result.streams.length)
				for( var i = 0; i <= result.streams.length - 1; i++ )
				{
				       
				   	status = {'ChannelID':result.streams[i].channel._id,
				   	'Name': result.streams[i].channel.name,
				   	'Viewers' : result.streams[i].viewers,
				    //'Status': '1',//psiloaxrhsto giati mono tous live stelnw...oi offline einai null kai ara den stelnw tipota,den mporw n tous kanw iterate
				    'Game': result.streams[i].channel.game
				          } ;
				         
				// // console.log(util.inspect(status, false, null)) debug
					
						socket.emit('streamersStatus', status ) ;//send the results to client
			        
				                      
				
			    }//forend 
			 }//ifend         
			});//request end
			}//ifexists end
		}//function end

		let interval=setInterval(streamstatus,1000);// to be done for 300000,which is 5 mins
		//emit otan allazw status mallon,dld offline,online h viewers


	})//socket on streams
})//io on connection streams
























