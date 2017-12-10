# OfficeAlarm
=======

## 软件截图
<img src="./app/assets/img/AlarmOffice001.png" width="50%" />

## 环境搭建
依赖
```
// 以mac环境为例
brew install ruby
brew install node
brew install npm
npm config set registry https://registry.npm.taobao.org
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm install electron --save-dev
```

运行
````
// 进入app目录
npm start
or
electron app
````

打包
```
// 打包前，先安装electron-packager
npm install electron-packager --save-dev
// 在pack目录，执行打包
npm run-script packager

// windows安装包依赖
brew tap caskroom/cask
brew cask install java xquartz
brew install wine

// Mac环境打包
electron-packager ../app OfficeAlarm --out ./output --platform=darwin --arch=x64 --version 1.0.0 --overwrite --icon=../app/assets/img/icon_app.icns

// 生成DMG文件
appdmg appdmg.json OfficeAlarm.dmg
````

## 参考资料
- [electron打包](https://segmentfault.com/a/1190000011908324)

- [electron-api-demos-Zh_CN](https://github.com/demopark/electron-api-demos-Zh_CN)

- [WebStorm ES6 语法支持设置](http://www.jianshu.com/p/b4390919a5b5)

