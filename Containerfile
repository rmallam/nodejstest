FROM registry.access.redhat.com/ubi9/nodejs-20:latest
WORKDIR /opt/app-root/src
COPY package.json server.js ./
USER 1001
ENV PORT=3000
EXPOSE 3000
CMD ["node", "server.js"]
