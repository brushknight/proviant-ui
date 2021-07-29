ifndef TAG
TAG := dev
endif

.PHONY: docker/release/ce
docker/release:
	docker build --no-cache \
	--build-arg IS_SAAS=0 \
	--build-arg PACKAGE_SUFFIX='ce' \
	--build-arg TAG=$(TAG) \
	--build-arg GITHUB_TOKEN=$(GITHUB_TOKEN) \
	-f Dockerfile .

.PHONY: docker/release/saas
docker/release:
	docker build --no-cache \
	--build-arg IS_SAAS=1 \
	--build-arg PACKAGE_SUFFIX='saas' \
	--build-arg TAG=$(TAG) \
	--build-arg GITHUB_TOKEN=$(GITHUB_TOKEN) \
	-f Dockerfile .