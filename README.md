# NodeGo: A Node.js Web Server for Go Game AI

## Introduction

The basic purpose of this project is to learn javascript, node.js and other necessary skills for web programming (frontend skills and backend skills). Since I've found that there is no repository of a node.js web server that support playing Go with AI, I decided to make one. During programming, I've also learned some topic of Go Program, like GTP and SGF. For the love of Go and deep learning, I surely wish that I can make contributions to the communities.

It's a **on-the-fly** project just for now. The server only supports some basic functions. But I will continue to make progress to this project. For now, the website looks like
![example-image](images/screenshot.png?raw=true)

## Quick Start
You need prepare [node](https://nodejs.org/zh-cn/download/) and [leela-zero](https://github.com/leela-zero/leela-zero#usage-for-playing-or-analyzing-games) following their official instructions.
For linux, you may need compile `leelaz` (a executable file of go engine) by your own. Download network weights from [here](https://zero.sjeng.org/best-network), extract it, rename it as `best-network` and move it to the build folder of leela-zero.

Run bash
```Bash
git clone https://github.com/ParadoxZW/NodeGo.git
ln -s path/to/leela-zero/build leela
```
Now you can start server
```Bash
node server.js
```

## Implementation Details

coming soon...

## Todo List
I'll make effort to let the project become fully functional, more powerful and more beautiful.
Following functions are important and need to be support:

- [ ] change color of stone
- [ ] resign
- [ ] make score function more powerfull, use it to estimate situation

Other features:
- [ ] save kifu on backend and support downloading
- [ ] apply a backend framework, like express
- [ ] apply a frontend framework, like Vue

## Appreciate

Thanks [leela-zero/leela-zero](https://github.com/leela-zero/leela-zero#usage-for-playing-or-analyzing-games), [SabakiHQ/gtp](https://github.com/SabakiHQ/gtp) and
[waltheri/wgo.js](https://github.com/waltheri/wgo.js) for their valuable work.
