FROM ubuntu:26.04

RUN apt-get update \
    && apt-get dist-upgrade -y \
    && apt-get install -y yq libxml-rss-perl libyaml-perl make
