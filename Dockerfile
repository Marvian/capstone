FROM node:16.19.0-alpine3.17

ARG USERNAME=node

# por favor ejecute el comando "id" sin comillas y mire si usted tiene el uid en 1000 y guid en 1000 si no coloquelos aqui en los arg
ARG USER_UID=1000
ARG USER_GID=1000

RUN apk --no-cache add shadow bash 

RUN npm install -g serverless@3.27.0
#@2.72.0

RUN groupmod --gid $USER_GID $USERNAME \
    && usermod --uid $USER_UID --gid $USER_GID $USERNAME \
    && chown -R $USER_UID:$USER_GID /home/$USERNAME

WORKDIR /app

USER $USERNAME
