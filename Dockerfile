# build form source code to js bundle
FROM node:latest as build
LABEL maintainer="Grigorii Merkushev <brushknight@gmail.com>"

ARG GITHUB_TOKEN=''
ARG IS_SAAS=0
ARG PACKAGE_SUFFIX='ce'

WORKDIR /proviant-ui
RUN mkdir /proviant-ui/app
COPY ./app /proviant-ui/app
WORKDIR /proviant-ui/app

# install deps and build
RUN npm install
RUN IS_SAAS=${IS_SAAS} npm run build


# create nginx with compiled UI app
FROM nginx:1.21 as container
LABEL maintainer="Grigorii Merkushev <brushknight@gmail.com>"
COPY --from=build /proviant-ui/app/dist /usr/share/nginx/html
# Copy the default nginx.conf provided by tiangolo/node-frontend
COPY  ./container/index.html /usr/share/nginx/html/index.html
COPY ./container/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./container/nginx.upstream.conf /etc/nginx/conf.d/upstream.conf


# publish archives to release page
FROM node:latest as publish

ARG TAG='dev'
ARG GH_VERSION='1.1.0'

RUN curl -L https://github.com/cli/cli/releases/download/v${GH_VERSION}/gh_${GH_VERSION}_linux_amd64.deb -o gh_${GH_VERSION}_linux_amd64.deb
RUN dpkg -i gh_${GH_VERSION}_linux_amd64.deb

# archive release assets
COPY --from=build /proviant-ui/app/dist /proviant-ui/app/dist

RUN cd /proviant-ui/app/dist && tar -zcvf /proviant-ui/ui-release-$TAG-$PACKAGE_SUFFIX.tar.gz .

# check what is in the archive
RUN mkdir /tmp/ui-release/
RUN tar -xvf /proviant-ui/ui-release-$TAG-$PACKAGE_SUFFIX.tar.gz -C /tmp/ui-release/
RUN ls -la /tmp/ui-release/

# upload
RUN GITHUB_TOKEN=$GITHUB_TOKEN gh release upload $TAG /proviant-ui/ui-release-$TAG-$PACKAGE_SUFFIX.tar.gz --repo proviant-io/ui
