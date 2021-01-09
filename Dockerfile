FROM node:14-slim

ENV HUSKY=0

RUN apt-get update && \
    apt-get install -y wget gnupg && \
    wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - && \
    sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
    apt-get update && \
    apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
    --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

RUN  mkdir -p /usr/src && \
    groupadd -r nodeuser && \
    useradd -r -g nodeuser -G audio,video nodeuser && \
    mkdir -p /home/nodeuser/Downloads && \
    chown nodeuser:nodeuser -R /usr/src && \
    chown -R nodeuser:nodeuser /home/nodeuser && \
    chown -R nodeuser:nodeuser /usr/src

USER nodeuser
COPY . /usr/src/
WORKDIR /usr/src/

RUN npm ci

EXPOSE 3000

CMD npm run start