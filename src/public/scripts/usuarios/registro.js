
$( document ).ready(function() {
    
    $('#registrar').on('click', function(){
        event.preventDefault();
        $.post( $('form').attr( "action" ), $('form').serialize() )
            .done(function( data ) {
                $('.alert').parent().parent().remove();
                let _alert = $('<div class="row"></div>');
                _alert.prepend('<div class="col-12"></div>');
                if (data.exe.hasOwnProperty('errorNum')){
                    _alert.find('div').prepend('<div class="alert alert-danger" role="alert">'+data.exe.desc+'</div>');
                    $('form').prepend(_alert);
                    console.error(data);
                }else{
                    _alert.find('div').prepend('<div class="alert alert-success" role="alert"> Usuario registrado </div>');
                    $('form').prepend(_alert);
                    console.log(data);
                    setTimeout(function(){ location.href ="acceso"; },5000);
                }
            }).fail(function() {
                console.error( "error" );
            });
    });

});