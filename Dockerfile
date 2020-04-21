FROM node:10-alpine

# Create server directory
RUN apk update
RUN apk add git

# Install server dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
#COPY package*.json ./
COPY . .
RUN npm install
RUN npm update
# If you are building your code for production
# RUN npm ci --only=production

# EXPOSE and BIND port
EXPOSE 8100
EXPOSE 9802

#WORKDIR /app

CMD [ "npm", "start" ]