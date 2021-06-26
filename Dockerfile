FROM node:latest

ARG TAG='dev'
ARG GH_VERSION='1.1.0'
ARG GITHUB_TOKEN=''

RUN curl -L https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.deb -o gh_${GH_VERSION}_linux_amd64.deb
RUN dpkg -i gh_${GH_VERSION}_linux_amd64.deb

WORKDIR /proviant-ui

RUN mkdir /proviant-ui/app

COPY ./app /proviant-ui/app

WORKDIR /proviant-ui/app

# install deps and build
RUN npm install
RUN npm run build

# archive release assets
RUN cd /proviant-ui/app/dist && tar -zcvf /proviant-ui/ui-release-$TAG.tar.gz .

# check what is in the archive
RUN mkdir /tmp/ui-release/
RUN tar -xvf /proviant-ui/ui-release-$TAG.tar.gz -C /tmp/ui-release/
RUN ls -la /tmp/ui-release/

# upload
RUN GITHUB_TOKEN=$GITHUB_TOKEN gh release upload $TAG /proviant-ui/ui-release-$TAG.tar.gz --repo brushknight/proviant-ui