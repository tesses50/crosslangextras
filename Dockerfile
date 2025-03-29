FROM onedev.site.tesses.net/crosslang/crosslang:latest

COPY ./Tesses.CrossLang.ShellPackage-1.0.0.0-prod.crvm /root/Tesses.CrossLang.ShellPackage-1.0.0.0-prod.crvm

RUN crossarchiveextract /root/Tesses.CrossLang.ShellPackage-1.0.0.0-prod.crvm /root/.config/Tesses/CrossLang