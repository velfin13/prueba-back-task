
# Pasos para crear la imagen de docker y subirla al repositorio

Ejecutamos 

```
docker login
```
Después generamos la imagen

```
docker build -t velfin13/task-ui:2.0.0 -f Dockerfile .
```
Finalmente subimos la imagen al repositorio

```
docker push velfin13/task-ui:2.0.0
```