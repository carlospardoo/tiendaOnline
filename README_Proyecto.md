Para el funcionamiento de la librería ‘oracledb’ desde Windows se debe instalar [Visual Studio 2017 Redistributable](https://support.microsoft.com/es-es/help/2977003/the-latest-supported-visual-c-downloads) y [Oracle Instant Client](https://www.oracle.com/database/technologies/instant-client.html) agregando de este ultimo la dirección a la variable Path del sistema. 

Ejecutar el proyecto en Windows
```console
set DEBUG=myapp:* & npm start
```
Ejecutar el proyecto en Windows en modo desarrollador
```console
set DEBUG=myapp:* & npm run dev
```