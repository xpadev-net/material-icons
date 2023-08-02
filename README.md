# material-icons / material-symbols

[GitHub](https://github.com/xpadev-net/material-icons) [npm:@xpadev-net/material-symbols](https://www.npmjs.com/package/@xpadev-net/designsystem-icons) [npm:@xpadev-net/material-icons](https://www.npmjs.com/package/@xpadev-net/material-symbols)

Googleが提供している Material Symbols and Icons をReactコンポーネント化したライブラリです  

## インストール

```bash
npm install @xpadev-net/material-icons
npm install @xpadev-net/material-symbols
```
```bash
yarn add @xpadev-net/material-icons
yarn add @xpadev-net/material-symbols
```
```bash
pnpm add @xpadev-net/material-icons
pnpm add @xpadev-net/material-symbols
```

## 使い方
各アイコンはnamed exportされていて、 アイコン名は `<アイコン名><Style>Icon` となっています  
例: OutlinedのHomeというアイコン → `HomeOutlinedIcon`

propsはSVG標準のpropsに加え、`color`を指定でき、`color`は`style`属性の`fill`プロパティとして適用されます

## 例
```tsx
import { ArrowBackOutlinedIcon } from "@xpadev-net/material-icons";

const Component = () => {
  return (
    <div>
      <ArrowBackOutlinedIcon color={"red"}/>
    </div>
  );
};
```

## ライセンス
アイコンは ApacheLicense の元で提供されています  
このライブラリ自体はMITライセンスで公開しています  
