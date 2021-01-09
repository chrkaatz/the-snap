FROM node:14

ENV HUSKY=0

RUN apt update && \
    apt upgrade -y && \
    apt install -y chromium && \
    mkdir -p /usr/src && \
    chown node:node -R /usr/src
USER node

RUN which chromium

COPY . /usr/src/
WORKDIR /usr/src/
RUN npm ci && npm run doc

EXPOSE 3000

ENTRYPOINT ["/sbin/tini", "--"]

CMD npm run start