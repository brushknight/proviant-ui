ifndef TAG
TAG := dev
endif

.PHONY: docker/release/ce
docker/release/ce:
	docker build --no-cache \
	--build-arg IS_SAAS=0 \
	--build-arg PACKAGE_SUFFIX='ce' \
	--build-arg TAG=$(TAG) \
	--build-arg GITHUB_TOKEN=$(GITHUB_TOKEN) \
	--target publish \
	-f ./Dockerfile .

.PHONY: docker/release/saas
docker/release/saas:
	docker build --no-cache \
	--build-arg IS_SAAS=1 \
	--build-arg PACKAGE_SUFFIX='saas' \
	--build-arg TAG=$(TAG) \
	--build-arg GITHUB_TOKEN=$(GITHUB_TOKEN) \
	--target publish \
	-f ./Dockerfile .

.PHONY: docker/build
docker/build:
	docker build --no-cache \
	--build-arg IS_SAAS=1 \
	--target container \
	-t brushknight/proviant-ui:$(TAG) \
	-t brushknight/proviant-ui:latest \
	-f ./Dockerfile .

.PHOMY: docker/publish
docker/publish: docker/build
	docker push brushknight/proviant-ui:$(TAG)
	docker push brushknight/proviant-ui:latest

.PHONY: docker/run
docker/run: docker/build
	docker rm -f proviant-ui
	docker run --rm -t \
		--name "proviant-ui" \
		-p8091:80 \
		brushknight/proviant-ui:$(TAG)