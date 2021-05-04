# Installer


## Récupérer le sous module KUSIX

`git submodule update --init`


##### Si vous êtes sous windows installez un sous système d'exploitation linux

https://korben.info/installer-shell-bash-linux-windows-10.html



##### Passer sous Linux 

```
bash
```



##### Installez l'interface en ligne de commande pug

```
npm install pug-cli -g
```



##### Comment les commandes pugs fonctionnent ?

```
pug [chemin_entree_pug] -p [chemin_inclusions_pug] -o [chemin_sortie_html]
```



Ajoutez -w pour automatiquement compiler le pug en html lors de la sauvegarde de fichier

##### Example

```
pug pug/site -p pug/includes/ -o site -w
```

