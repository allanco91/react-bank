FROM node:12.14.0-alpine AS builder
WORKDIR /app
COPY package.json .
RUN yarn

ADD . .
RUN yarn global add gulp-cli
RUN gulp compile

FROM node:12.14.0
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app .
CMD ["serve", "-p", "80", "-s", "."]
