FROM node:18-alpine

WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .

EXPOSE 3000
# Migration run!!
# RUN ["yarn", "db:migrate"]
# RUN ["yarn", "db:seeds"]

CMD ["yarn", "start"]
