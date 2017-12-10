# OfficeAlarm
=======

## Env
```
brew install ruby
brew install node
brew install
npm config set registry https://registry.npm.taobao.org
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## Install
```
npm install electron --save-dev
npm start
```

## Run
````
npm start
or
electron app
````

## Packager
```
npm install electron-packager --save-dev
npm run-script packager
```

windows环境
````
brew tap caskroom/cask
brew cask install java xquartz
brew install wine
````

## Dmg
````
electron-packager ../app OfficeAlarm --out ./output --platform=darwin --arch=x64 --version 1.0.0 --overwrite --icon=../app/assets/img/icon_app.icns
appdmg appdmg.json OfficeAlarm.dmg

````


## 参考资料
- [electron打包](https://segmentfault.com/a/1190000011908324)

- [electron-api-demos-Zh_CN](https://github.com/demopark/electron-api-demos-Zh_CN)

- [WebStorm ES6 语法支持设置](http://www.jianshu.com/p/b4390919a5b5)

