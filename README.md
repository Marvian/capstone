To run this project locally run following command:

* `docker-compose up -d --build`
* Go to each project(template-micros and template-middleware) and run `make install` and `make run-local`
* Ejecute esta ruta en el navegador o en su cliente rest GET:`http://localhost:3030/auth/check`

Es importante que se cree el servidor de la base de datos y luego la base de datos para que pueda establecer la conexion, en este caso los dos se llaman "capstonePrueba"