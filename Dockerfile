# FROM instruction to set the application’s base image
FROM node:alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

RUN mkdir -p /home/app
# RUN mkdir -p /usr/src/app

# set the working directory
WORKDIR /home/app
# WORKDIR /usr/src/app

# RUN adduser -S app
COPY package*.json ./
# copy the package.json 
# COPY explogin/ .
COPY . .

RUN npm install --force

# RUN chown -R app /home/app
# USER app

# COPY --chown=node:node . .

EXPOSE 3050

# CMD [ "node", "./bin/www" ]

CMD [ "npm", "run", "pm2" ]