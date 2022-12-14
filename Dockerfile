FROM node:lts-alpine3.16
WORKDIR /usr/src/app
COPY . .
RUN npm ci --omit-dev
EXPOSE 3001
CMD ["npm", "start"]