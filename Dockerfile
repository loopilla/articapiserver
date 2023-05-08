FROM node:18-alpine


WORKDIR /app
# RUN npm install yarn -g
COPY --chown=node:node package.json .
RUN yarn install
COPY --chown=node:node . .
RUN yarn build

# This makes problem at migration
# USER node

EXPOSE 3000
# Migration run!!
# RUN yarn db:migrate
# RUN yarn db:seeds

# CMD ["yarn", "start"]
CMD ["node", "/app/dist/src/main.js"]
