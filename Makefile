install:
	(cd ui && npm i)
	(cd api && npm i)
	(cd e2e && npm i)

docker:		
	docker compose up --build

test:
	(cd e2e && npm run e2e)