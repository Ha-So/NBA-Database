/* Name: Haris Sohail
* Date: 11/26/2017
*  NBA Database Project  
* 
*/

/*Uses ajax to delete a row via the id provided in the url.*/
function deletePlayer(id){
	
    $.ajax({
        url: '/players/' + id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};