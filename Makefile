ifndef TAG
TAG := dev
endif

.PHONY: docker/release
docker/release:
	docker build --build-arg TAG=$(TAG) GITHUB_TOKEN=$(GITHUB_TOKEN) -f Dockerfile .

