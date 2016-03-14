# fis-lint-html-hint

一个基于 [HTMLHint](https://github.com/yaniswang/HTMLHint) 的 fis 插件。

## 安装

```cli
npm install -g fis-lint-html-hint
```

OR

```cli
npm install fis-lint-html-lint
```

## 使用

example：

```javascript
// fis-conf.js

fis.match('*.html', {
	lint: fis.plugin('html-hint', {
		// HTMLHint Options
	})
});

```


如果不提供规则配置的话，将使用 HTMLHint 提供的默认规则：

```javascript
{
    "tagname-lowercase": true,
    "attr-lowercase": true,
    "attr-value-double-quotes": true,
    "doctype-first": true,
    "tag-pair": true,
    "spec-char-escape": true,
    "id-unique": true,
    "src-not-empty": true,
    "attr-no-duplication": true,
    "title-require": true
}

```
更多规则详细信息参见 [HTMLHint Rules](https://github.com/yaniswang/HTMLHint/wiki/Rules)。

