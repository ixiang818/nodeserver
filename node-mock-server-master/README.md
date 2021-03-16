## Node Mock Server

### dependence
```bash
npm install
```

### dev
```bash
npm run dev
```

### build
```bash
npm run build
```

### format
```bash
npm run lint
```

### hot
```bash
npm run watch
```

### usage
- update routes.json data

### 配置参数
```
"baseRoute": "app",              // 路由前缀，如所有的路由都已app开头 /app/xxxx

"url": "/getName",               // 路由地址（必填）
"method": "GET",                 // 请求方法（必填）目前仅支持 GET POST
"request": {                     // 请求参数，如果在返回值中未使用可为 {}
    "name": ""
},
"response": {                    // 返回值
    "name": {                    // 返回值参数
        "isMockConfig": true,    // 如果返回值需要动态化配置，该参数需为true，如果未配置或未false，将直接返回该参数的值    "isRequest": true,       // 返回值是否来自于请求参数，该值为true时必须配置requestKey
        "requestKey": "name",    // 请求参数的key，当isRequest为true时才依赖该值
        "isRandom": true,        // 返回值是否为随机值
        "randomType": "string",  // 随机值的类型，目前可选值 ["string", "number"]
        "defaultValue": "abc"    // 默认值（未配置其他值时，该值必填）
    }
}
```
