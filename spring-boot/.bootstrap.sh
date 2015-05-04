#!/usr/bin/env bash

set -m

NAME=$2
if [ "$NAME" == "" ]; then
  NAME="temp"
fi

mv src/main/java/com/charleslavery/_replace_ src/main/java/com/charleslavery/$NAME
mv src/test/java/com/charleslavery/_replace_ src/test/java/com/charleslavery/$NAME

sed -i .bak "s/_REPLACE_/$NAME/g" build.gradle
sed -i .bak "s/_REPLACE_/$NAME/g" src/main/java/com/charleslavery/$NAME/Application.java
sed -i .bak "s/_REPLACE_/$NAME/g" src/test/java/com/charleslavery/$NAME/ApplicationTest.java

rm build.gradle.bak
rm src/main/java/com/charleslavery/$NAME/Application.java.bak
rm src/test/java/com/charleslavery/$NAME/ApplicationTest.java.bak

./gradlew idea

open $NAME.ipr

echo -n "cd $(pwd)" | pbcopy
