#!/usr/bin/env bash

echo "Pack start..."

echo "clean build directory"
rm -rf output/OfficeAlarm-darwin-x64/

echo "run-script packager"
npm run-script packager

echo "copy dmp resource"
cp -rf dmg/* output/OfficeAlarm-darwin-x64/
cd output/OfficeAlarm-darwin-x64/

echo "appdmg..."
appdmg appdmg.json OfficeAlarm.dmg
cd ../../

echo "Pack finish \(^o^)/~"