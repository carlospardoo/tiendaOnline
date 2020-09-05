$(document).ready(function(){
    $.get('/direccion',{}).done(function(data){
        $('#listado').append('<li>Ejemplo</li>');
        //alert(data[0]);
        for(var i=0;i<data[0].length;i++){
            
            $('#listado').append('<ul>'+data[i].direccion+'</li>');
        }
    }).fail(function(){
        console.error('error');
        
    });
});