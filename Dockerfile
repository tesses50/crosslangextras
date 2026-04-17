FROM onedev.site.tesses.net/crosslang/crosslang:latest

RUN crosslang update-shell
RUN crossarchiveextract /root/Tesses.CrossLang.ShellPackage-1.0.0.0-prod.crvm /root/.config/Tesses/CrossLang