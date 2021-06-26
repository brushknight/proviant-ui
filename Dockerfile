FROM node:latest

ARG TAG='dev'
ARG GH_VERSION='1.1.0'

RUN curl -L https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.deb -o gh_${GH_VERSION}_linux_amd64.deb
RUN dpkg -i gh_${GH_VERSION}_linux_amd64.deb

WORKDIR /proviant-ui

RUN mkdir /proviant-ui/app
RUN mkdir /proviant-ui/dist

COPY ./app /proviant-ui/app
VOLUME /proviant-ui/dist

WORKDIR /proviant-ui/app

RUN npm install

RUN npm run build

WORKDIR /proviant-ui

RUN tar -zcvf ./ui-release-$TAG.tar.gz ./dist

RUN gh release upload $TAG ./ui-release-$TAG.tar.gz