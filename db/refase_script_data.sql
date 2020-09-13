---Inserciones para categoria
insert into categoria(N_NOMBRE) values('Entretenimiento');
insert into categoria(N_NOMBRE) values('Hogar');
insert into categoria(N_NOMBRE) values('Mercado');
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Musica',1);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Libros',1);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Juegos',1);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Electrodomesticos',2);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Muebles',2);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Lenceria',2);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Frutas',3);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Verduras',3);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Lacteos',3);
insert into categoria(N_NOMBRE,K_IDCATEGORIAPADRE) values('Mascotas',3);
COMMIT;

---Inserciones para Productos
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10102,'Guitarra','Gibson',4,'Unidad','https://bit.ly/3lU14op');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10103,'Lorem Ipsum','Planeta',5,'Unidad','https://bit.ly/2DD2hPw');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10104,'Super Mario','Nintendo',6,'Unidad','https://bit.ly/3icjDll');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10105,'Nevera','LG',7,'Unidad','https://bit.ly/3i7AfKY');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10106,'Mesa','Duna',8,'Unidad','https://bit.ly/3hfFfw4');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10107,'Sujetador','Leonisa',9,'Unidad','https://bit.ly/3h5eMBf');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10108,'Durazno','Los Viotunos',10,'Kilo','https://bit.ly/3jWNWwY');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10109,'Cebolla','Jorge Rivas SAS',11,'Kilo','https://bit.ly/3m0AfyQ');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10110,'Queso','Manchego',12,'Libra','https://bit.ly/328FnJb');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10111,'Comida Perro','Dog Chow',13,'Libra','https://bit.ly/3iabjm2');
COMMIT;

---Inserciones para Ciudades
insert into ciudad(N_NOMBRE) values('Bogota');
insert into ciudad(N_NOMBRE) values('Cali');
insert into ciudad(N_NOMBRE) values('Barranquilla');
insert into ciudad(N_NOMBRE) values('Medellin');
insert into ciudad(N_NOMBRE) values('Cartagena');
COMMIT;

--Inserciones para proveedores
insert into proveedor(N_NOMBRE,N_DIRECCION,N_CIUDAD) values('Andres Perez','Calle 7 No 9-16','Bogota');
insert into proveedor(N_NOMBRE,N_DIRECCION,N_CIUDAD) values('Pepito Perez','Calle 9 No 12-38','Cali');
insert into proveedor(N_NOMBRE,N_DIRECCION,N_CIUDAD) values('Gumercindo Azpilicueta','Avenida norte No 34-78','Barranquilla');
insert into proveedor(N_NOMBRE,N_DIRECCION,N_CIUDAD) values('Lee Huang Tai','Carrera 90 No 2-22','Medellin');
insert into proveedor(N_NOMBRE,N_DIRECCION,N_CIUDAD) values('Laura Garcia','Transversal 18 No 83-15h','Cartagena');

--inserciones inventario
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(1700000,18,10105,1,1,17,to_date('01/01/2020')); --nevera
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(1850000,25,10105,2,1,4,to_date('04/03/2020'));
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(150000,4,10105,3,2,4,to_date('27/06/2020'));
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(4200,120,10110,1,2,14,to_date('12/04/2020'));--queso
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(4800,96,10110,2,4,25,to_date('11/04/2020'));
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(550000,10,10106,1,5,4,to_date('10/02/2020'));--mesa
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(620000,45,10106,2,5,1,to_date('20/02/2020'));
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(520000,4,10106,3,3,1,to_date('14/05/2020'));
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(25000,145,10107,2,3,36,to_date('03/03/2020'));--sujetador
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(18000,120,10107,3,3,114,to_date('07/03/2020'));
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(1200,480,10108,1,5,2,to_date('26/01/2020'));--durazno
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(800,532,10108,3,1,35,to_date('08/02/2020'));
 
insert into INVENTARIO(V_PRECIO, Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(400,295,10109,1,3,25,to_date('12/03/2020'));--cebolla
insert into INVENTARIO(V_PRECIO, Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(450,245,10109,2,2,6,to_date('01/05/2020'));
insert into INVENTARIO(V_PRECIO, Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD,K_IDPROVEEDOR,Q_STOCK,F_FECHAINVENTARIO) values(500,212,10109,3,4,3,to_date('30/07/2020'));
COMMIT;

