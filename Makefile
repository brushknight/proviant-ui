ifndef TAG
TAG := dev
endif

.PHONY: docker/release
docker/release:
	docker build --build-arg TAG=$(TAG) -e GITHUB_TOKEN -f Dockerfile .

