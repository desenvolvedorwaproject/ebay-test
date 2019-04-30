FROM node:11-alpine

COPY docker/dev/start.sh /usr/local/bin/

RUN set -x \
    && chmod 775 /usr/local/bin/* \
    && chmod +x /usr/local/bin/*.sh \
    && mkdir /server

WORKDIR /server

EXPOSE 3000
EXPOSE 9229

CMD start.sh