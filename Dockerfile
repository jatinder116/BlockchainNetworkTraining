# FROM instruction to set the application’s base image
FROM node:alpine

RUN mkdir -p /home/app
# RUN mkdir -p /usr/src/app

# set the working directory
WORKDIR /home/app
# WORKDIR /usr/src/app
RUN npm config set package-lock false
# RUN adduser -S app
COPY package*.json ./

# COPY ["package.json", "package-lock.json*", "./"]

# copy the package.json 
# COPY explogin/ .
COPY . .


RUN npm install --force

# RUN npm install pm2 -g
# RUN chown -R app /home/app
# USER app

# COPY --chown=node:node . .

EXPOSE 3050

# CMD [ "npm", "start" ]

CMD [ "npm", "run", "pm2" ]