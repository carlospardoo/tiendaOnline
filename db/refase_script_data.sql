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
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10102,'Guitarra','Gibson',4,'Unidad','https://url2.cl/hPdCb');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10103,'Lorem Ipsum','Planeta',5,'Unidad','https://url2.cl/Clp3u');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10104,'Super Mario','Nintendo',6,'Unidad','https://url2.cl/GLhxt');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10105,'Nevera','LG',7,'Unidad','https://url2.cl/RKJfa');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10106,'Mesa','Duna',8,'Unidad','https://url2.cl/xz4Ti');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10107,'Sujetador','Leonisa',9,'Unidad','https://url2.cl/l6rQX');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10108,'Durazno','Los Viotunos',10,'Kilo','https://url2.cl/bsBei');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10109,'Cebolla','Jorge Rivas SAS',11,'Kilo','https://url2.cl/p2RUD');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10110,'Queso','Manchego',12,'Libra','https://url2.cl/baSzA');
insert into producto(K_IDREFERENCIAUNICA,N_NOMBRE,N_MARCA,K_IDCATEGORIA,N_UNIDADMEDIDA,L_IMAGEN) values(10111,'Comida Perro','Dog Chow',13,'Libra','https://url2.cl/X6xLH');
COMMIT;

---Inserciones para Ciudades
insert into ciudad(N_NOMBRE) values('Bogota');
insert into ciudad(N_NOMBRE) values('Cali');
insert into ciudad(N_NOMBRE) values('Barranquilla');
insert into ciudad(N_NOMBRE) values('Medellin');
insert into ciudad(N_NOMBRE) values('Cartagena');
COMMIT;

--inserciones inventario
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(1700000,18,10105,1); --nevera
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(1850000,25,10105,2);
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(150000,4,10105,3);
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(4200,120,10110,1);--queso
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(4800,96,10110,2);
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(550000,10,10106,1);--mesa
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(620000,45,10106,2);
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(520000,4,10106,3);
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(25000,145,10107,2);--sujetador
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(18000,120,10107,3);
 
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(1200,480,10108,1);--durazno
insert into INVENTARIO(V_PRECIO,Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(800,532,10108,3);
 
insert into INVENTARIO(V_PRECIO, Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(400,295,10109,1);--cebolla
insert into INVENTARIO(V_PRECIO, Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(450,245,10109,2);
insert into INVENTARIO(V_PRECIO, Q_CANTIDAD,K_IDREFERENCIAUNICA,K_IDCIUDAD) values(500,212,10109,3);
COMMIT;

