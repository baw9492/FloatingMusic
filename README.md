# 此处记录 src 目录以外的修改

https://reactnavigation.org/docs/getting-started#installing-dependencies-into-a-bare-react-native-project

```
class MainActivity: ReactActivity() {
  // ...
  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(null)
  }
  // ...
}
```

功能:

- 查找歌单
- 查找歌曲
- 播放歌曲
- 歌单管理
  - 新建歌单
  - 将搜索结果添加到歌单

页面:

- 首页
- 搜索页
  - 查找历史
  - 搜索结果页
    - 歌曲结果
