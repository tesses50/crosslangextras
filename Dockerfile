FROM onedev.site.tesses.net/crosslang/crosslang:latest

RUN mkdir /src && cd /src && git clone https://onedev.site.tesses.net/crosslang/crosslangextras . && bash ./install.sh && cp Tesses.CrossLang.ShellPackage-1.0.0.0-prod.crvm /root/Tesses.CrossLang.ShellPackage-1.0.0.0-prod.crvm && cd / && rm -r /src