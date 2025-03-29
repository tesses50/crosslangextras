#!/bin/bash
mkdir docs
crosslang run > docs/Runtime.md
cd doc_projs/RuntimeObjects
crosslang build
cd ../..
crosslang run doc_projs/RuntimeObjects/bin/*.crvm > docs/RuntimeObjects.md