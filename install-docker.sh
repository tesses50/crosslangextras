#!/bin/bash
bash ./script.sh
crossvm crosslang_shell_archive_maker/bin/crosslang_shell_archive_maker-1.0.0.0-prod.crvm install

cp Tesses.CrossLang.ShellPackage-1.0.0.0-prod.crvm /root 
cp Tesses.CrossLang.PackageServer/bin/Tesses.CrossLang.PackageServer-1.0.0.0-prod.crvm /root
cp Tesses.CrossLang.WebSite/bin/Tesses.CrossLang.WebSite-1.0.0.0-prod.crvm /root