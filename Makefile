ifndef TAG
TAG := dev
endif

.PHONY: docker/release
docker/release:
	docker build --no-cache --build-arg TAG=$(TAG) --build-arg GITHUB_TOKEN=$(GITHUB_TOKEN) -f Dockerfile .