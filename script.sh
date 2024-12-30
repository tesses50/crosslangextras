#!/bin/bash
cd Tesses.CrossLang.BuildEssentials && crossc -o ./bin-tmp -n Tesses.CrossLang.BuildEssentials -v 1.0.0.0-prod main.tcross src/*.tcross && cd ..
crossvm ./Tesses.CrossLang.BuildEssentials/bin-tmp/Tesses.CrossLang.BuildEssentials-1.0.0.0-prod.crvm Tesses.CrossLang.Shell