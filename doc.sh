#!/bin/bash

yarn doc
git checkout gh-pages
mv -f doc/* ./       #强制替换
git add .
git commit -m 'update'
git push
git checkout -
#必须要保证当前代码是提交好的  ./doc.sh运行，也就是它的相对路径就是命令
