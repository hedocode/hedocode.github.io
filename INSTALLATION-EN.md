# Install



##### If you are on windows Install a linux subsystem

https://docs.microsoft.com/fr-fr/windows/wsl/install-win10



##### Go on Linux 

```
bash
```



##### Install the pug command line interface

```
npm install pug-cli -g
```



##### How pug commands works ?

```
pug [sourcePath] -p [includesPath] -o [outputPath]
```



Add -w to automatically compile pug into html when you save pug files

##### Example

```
pug pug/site -p pug/includes/ -o site -w
```

