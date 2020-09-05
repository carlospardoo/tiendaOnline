
/*------------------------------------------------------------------------------
     Disparador registrar la inserción de la tabla producto en el log del
     sistema.
    -------------------------------------------------------------------------------*/

CREATE OR REPLACE TRIGGER TG_REGISTRO_PRODUCTO
AFTER INSERT ON prod
FOR EACH ROW
DECLARE
    l_nnombreusuario VARCHAR(50);
BEGIN
    SELECT user INTO l_nnombreusuario FROM dual;
    INSERT INTO log (n_nombreusuario, f_fecha, i_accion, t_descripcion)
    VALUES (l_nnombreusuario, TO_DATE(sysdate), 'INSERT', ''||:new.k_idreferenciaunica||','||:new.n_nombre||','||:new.n_marca||','||:new.k_idcategoria||','||:new.n_unidadmedida||','||:new.l_imagen||'');
END TG_REGISTRO_PRODUCTO;
/