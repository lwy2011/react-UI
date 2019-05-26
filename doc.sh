#!/usr/bin/env bash

yarn doc
git checkout page
mv -f doc/* ./       #强制替换
git add .
git commit -m 'update'
git push
git checkout -
#必须要保证当前代码是提交好的
