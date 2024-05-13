FROM 20.12.2-slim

WORKDIR /usr/src/app

COPY ./ ./

RUN npm install

CMD npx expo start

