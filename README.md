# SkatePark Santiago
### Desafío Latam e-camp, Módulo 8, prueba final

#### Frontend y Backend de un sistema API Rest para el manejo de usuarios con base de datos Postgres

##### v1.0.0
Sistema detallado de API REST con sistema CRUD completo basado en la base de datos ***skaters***.
Muestra los usuarios de un SkatePark, permite ingresar nuevos usarios, actualizar su información, borrarla y por supuesto,, mostrarla.
Al mostrarla, el API devuelve la información como un arreglo **HATEOAS**, desde el cual luego se lle la información detallada para mostrarla en la página de inicio.
Para que cada usuario pueda modificar sus datos, debe hacer login con la nformación de su correo y password, esto genera un token utilizando la librería *jwt* que luego es pasado a la ruta ***/datos*** para que sea renderizada la infromación que contiene.
La ruta ***/admin*** permite cambiar el estado de los skaters de manera de decir si su registro fue aprobado o no.  Esta ruta también debería estar protegida con un usuario y contraseña, pero eso aúin no se implemente en la versión actual.
Como último comentario, la fotografía que sube cada usuario fue modificada con la librería *jimp* para cambiar su tamaño y hacerla mas liviana para no ocupar espacio en el servidor.


Realizado por ***Darío Valenzuela***, noviembre 2021

