FROM onedev.site.tesses.net/crosslang/crosslang:latest

RUN mkdir /src && cd /src && git clone https://onedev.site.tesses.net/crosslang/crosslangextras . && bash ./install-docker.sh && cd / && rm -r /src