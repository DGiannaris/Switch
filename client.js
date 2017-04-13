var socket =io('http://localhost:8000');//the node server


//Listen from server
listenStreamerId();
listenStreamersStatus();

function handleIdForm() {
	let id = $('.streamerIdForm').val()
	//sending data to server
	socket.emit('getLivestreams', {streams: id.split(',') }); 
	$('.streamersStatus').find('.input').append('<p>' + id + '</p>')
	$('.streamerIdForm').val('')

}

function handleNameForm() {
	let streamerName = $('.nameForm').val()
	socket.emit('checkStreamer', streamerName) ;
	$('.streamerId').find('.input').append('<p>' + streamerName + '</p>')
	
}

function handleAddStreamerId() {
	let streamerId = $('.nameAdd').val();
	//sendind id to server
	socket.emit('addStreamers', streamerId);
	$('.streamerAdd').find('.input').append('<p>' + streamerId + '</p>')
}


function listenStreamerId() {
    //if/when you get message from server
    // Expecting streamer ID
	
	socket.on('streamerId',function(data){
		console.log(data);
		$('.streamerId').find('.output').append('<p>' + data + '</p>')
	})
    console.log('inside responseid')
                    
}

function listenStreamersStatus() {
    //if/when you get message from server
    // Expecting online streamers object
	socket.on('streamersStatus',function(data){
	    console.log(data);
	    let now = new Date();
	    $('.streamersStatus').find('.output').append(
	    	'<p>' + now.toTimeString().slice(0,8) + '</p>' +
	    	'<pre>' + JSON.stringify(data) + '</pre>'
	    )
	})

	console.log('inside streamerstatuss')
}