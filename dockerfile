FROM node:14.17
WORKDIR /plateforme-sifast-root-config

COPY package.json ./package.json
COPY package-lock.json ./package-lock.json

# RUN rm -rfv node_modules/* package-lock.json
# RUN npm run clean
RUN npm ci
# Expose ports
EXPOSE 9000

# Infinite loop command to keep the container running
CMD tail -f /dev/null
