DOCKER_COMPOSE = docker-compose exec capstone-app
AWS_PROFILE_APPLIVIO_V2=
bash:
	${DOCKER_COMPOSE} /bin/bash

install:
	${DOCKER_COMPOSE} npm install

test:
	${DOCKER_COMPOSE} npm test

test_user:
	${DOCKER_COMPOSE} npm run test_user

test_respond:
	${DOCKER_COMPOSE} npm run test_respond

# run-local:
# 	${DOCKER_COMPOSE} npm run serve

run-local:
	${DOCKER_COMPOSE} sls offline start --host 0.0.0.0 --reloadHandler --stage development

deploy-staging:
	${DOCKER_COMPOSE}  sls --stage staging deploy --aws-profile ${AWS_PROFILE_APPLIVIO_V2}

remove-staging:
	${DOCKER_COMPOSE}  sls --stage staging remove --aws-profile ${AWS_PROFILE_APPLIVIO_V2}

run-rebuild:
	docker-compose down && docker-compose up -d && make run-local

prettier:
	${DOCKER_COMPOSE} npx prettier --write .