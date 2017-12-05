/* Name: Haris Sohail
* Date: 11/26/2017
*  NBA Database Project 
* 
*/

/*Uses ajax to create an update page with the specified id and populate the inputs with pre-existing data*/
function updatePlayer(id){
	
    $.ajax({
        url: '/players/' + id,
        type: 'PUT',
        data: $('#update-player').serialize(),
        success: function(result){
            window.location.replace("./");
        }
    })
    
};