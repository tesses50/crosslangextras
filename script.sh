#!/bin/bash
cd Tesses.CrossLang.BuildEssentials && crossc -o ./bin-tmp -n Tesses.CrossLang.BuildEssentials -v 1.0.0.0-prod main.tcross src/*.tcross && cd ..
crossvm ./Tesses.CrossLang.BuildEssentials/bin-tmp/Tesses.CrossLang.BuildEssentials-1.0.0.0-prod.crvm Tesses.CrossLang.Shell
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build Tesses.CrossLang.PackageServer
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build Tesses.CrossLang.WebSite
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build Templates/console
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build Templates/web
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build Templates/template
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build Templates/lib
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build Templates/compiletool
crossvm ./Tesses.CrossLang.Shell/bin/Tesses.CrossLang.Shell-1.0.0.0-prod.crvm build crosslang_shell_archive_maker

