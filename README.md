# unitwork

## 拉取qq音乐歌曲文件
#### congClass.js 封装了关于拉取qq音乐歌曲文件的公共方法
- getVKey()
```
根据songmid(可单一或多字符串join(",")拼接)获取VKey值
```
- getRandom()
```
获取随机数 得到的guid字段 必须getVKey接口与音乐文件链接相同
```
- url音乐链接
 ```
http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=${guid}&vkey=${vkey}&uin=0&fromtag=38
```