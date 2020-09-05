
$( document ).ready(function() {
    
    $('#acceder').on('click', function(){
        event.preventDefault();
        $.post( $('form').attr( "action" ), $('form').serialize() )
            .done(function( data ) {
                $('.alert').parent().parent().remove();
                if (data.exe.hasOwnProperty('errorNum')){
                    let _alert = $('<div class="row"></div>');
                    _alert.prepend('<div class="col-12"></div>');
                    _alert.find('div').prepend('<div class="alert alert-danger" role="alert">'+data.exe.desc+'</div>');
                    $('form').prepend(_alert);
                    console.error(data);
                }else{
                    console.log(data);
                    setTimeout(function(){ location.href ="../"; },5000);
                }
            }).fail(function() {
                console.error( "error" );
            });
    });

});