 "use strict";
 let app = require( 'http' )
     .createServer() //create http localhost
 var io = require( 'socket.io' )( app );
 let request = require( 'request' );
 app.listen(2039); //2039 port on the localhost server i jst created
 
 var compareNew = [14] ;
 var compareOld = [-8]; // initial value so the comparison on the bottom side of the code is triggered 100% the first time,just to be sure
 var compare = [];
 let result;
 let result2;
 let existsflag;
 let channelid;
 let savedStreamers = [];
 var status;
 let gotStreamers = 1;
 let interval;
 var newStreamer = '';
 var ChannelParams;
 let removeId = '';

 io.on( 'connection', function( socket ) {
     socket.on( 'checkStreamer', function( data ) {
     	console.log('mphka')
             if ( !( data.match( /^[a-zA-Z0-9][\w]{3,24}$/ ) ) ) {
                ChannelParams = 'invalid user'
             } else {

                 let options = {
                     url: 'https://api.twitch.tv/kraken/users?login=' +data,
                     method: 'GET',
                     form: '',
                     headers: {
                         'Client-ID': 'p5d4th8o23p7t21fr6hp4gu1n3d2jc',
                         'Accept': 'application/vnd.twitchtv.v5+json',
                         'Content-Type': 'application/json',
                         'Authorization': ''
                     }
                 };
                 request( options, ( err, res, body ) => {
                     result2 = JSON.parse( body );
                     if ( result2._total != 0 ) {
                         existsflag = 1;
                         if ( data != '' ) {
                             channelid = result2.users[ 0 ]
                                 ._id; //this is going to be emitted
                             var logo = result2.users[ 0 ].logo
                             console.log( existsflag + "/" + channelid );

                             ChannelParams = {
                                 'id': channelid,
                                 'logo': logo
                             };
                         }
                     } else {
                         existsflag = 0;
                         console.log( existsflag + "/" + channelid );
                     } //else end
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
                     socket.emit( 'streamerId', existsflag ?ChannelParams :'User does not exist!' ); //send the results to client         
                 } );
             } //regex ifelse end
         } ) //socket on getname
 } ); //io on checkstreamer

 io.on( 'connection', function( socket ) {
    socket.on( 'resetAll', () => { //get new streamer id          
        clearInterval( interval );
        console.log('cleaned!')
    } )
 } )

io.on( 'connection', function( socket ) {
       socket.on( 'addStreamers', function( data ) { //get new streamer id 
			console.log( 'got new streamer' )
			compareOld=[-99]
			newStreamer = data
        } )
} )

io.on( 'connection', function( socket ) {
       socket.on( 'removeStreamer', function( data ) { //get new streamer id 
            console.log( 'removeStreamer' )
            compareOld=[-99]
            removeId = data
        } )
} )

 io.on( 'connection', function( socket ) {
        socket.on( 'getLivestreams', function( data ) {
         	
	               //  setTimeout( streamstatus, 2000 ); // twitch api is a little slow,so to make sure the variables are getting values,we have to wait a bit
	        clearInterval( interval );

		    function streamstatus() { //40336240,44741426,31989055,39548541
		        
		        if ( newStreamer != '' ) {
		            if ( !( data.streams.indexOf( newStreamer ) > -1 ) ) { //if it does not already exists in the streamers pool then proceed
		                data.streams.push( newStreamer ) //add new streamer in streamspool
		                console.log( 'added new streamer' )
		                 
		            }
		        }

                if ( removeId != '' ) {
                    let removeIndex = data.streams.indexOf(removeId)
                    if ( removeIndex > -1 ) {
                        data.streams.splice(removeIndex, 1)
                        console.log('removed streamer with ID: ' + removeId)
                    }
                }
		        
		        compare = [] //clear the array of objects so it doesnt stack up trashes
		         
		        if ( data != null ) {
		            console.log( "going for status" ) //for debugging purposes
		            console.log( data.streams.toString().replace( [ '[', ']' ], '' ) ) //for debugging purposes
		            let options = {
		                url: 'https://api.twitch.tv/kraken/streams/?channel='+data.streams.toString().replace( [ '[', ']' ], '' ),
		                method: 'GET',
		                form: '',
		                headers: {
		                    'Client-ID': 'p5d4th8o23p7t21fr6hp4gu1n3d2jc',
		                    'Accept': 'application/vnd.twitchtv.v5+json',
		                    'Content-Type': 'application/json',
		                    'Authorization': ''
		                }
		            };
		            request( options, ( err, res, body ) => {
		                result = JSON.parse( body );
		                if ( (result._total != 0) && result.streams.length ) {
		                    for ( var i = 0; i <= result.streams.length - 1; i++ ) {
		                        status = {
		                            'ChannelID': result.streams[i].channel._id,
		                            'Name': result.streams[i].channel.name,
		                            'Viewers': result.streams[i].viewers,
		                            'Game': result.streams[i].channel.game,
                                    'PreviewImg': 'https://static-cdn.jtvnw.net/previews-ttv/live_user_' + result.streams[i].channel.name + '-326x202.jpg'
                                    
		                        };
		                        compare.push( status ) //push object into the array to use it for comparison
		                    } //forend 
		                    
		                }else {
		                    socket.emit( 'streamersStatus', 'offline' );
		                } //ifexists end	
		                

		             	function compareMagic( elementOfArray, index ) {
						    var oldArrayItemString = JSON.stringify( elementOfArray );
						    var newArrayItemString = JSON.stringify( compare[index] );
						    return oldArrayItemString == newArrayItemString;
						}
		                
						var areSame = compareOld.every( compareMagic );
		                if( !areSame ) {
						     socket.emit( 'streamersStatus',compare);					  
		                     compareOld = compare // prepare the variable for the next interval
		                }


		             } ); //request end
		         }//if socket get null 
		     } //function end

	     interval = setInterval( streamstatus, 5000 ); // to be done for 300000,which is 5 mins
	     //send the results to client
             } ) //socket on streams
     } ) //io on connection streams