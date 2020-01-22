# Light [光线]

## AmbientLight [环境光]

> 文档地址：https://threejs.org/docs/index.html#api/zh/lights/AmbientLight

无法投影阴影，只能均匀照亮场景中的物体。使用示例如下：

```js
// 参数：颜色，光照强度
const light = new THREE.AmbientLight(0x404040, 1);
scene.add(light);
```

## DirectionalLight [平行光]

> 文档地址：https://threejs.org/docs/#api/zh/lights/DirectionalLight

用来模拟太阳光，通常由于太阳的位置是无限远的，可以认为太阳的光线是平行的。因此该光线会向指定方向发射光，平行的形式。使用代码如下：

```js
// 参数：颜色，光照强度
const light = new THREE.DirectionalLight(0x404040, 1);
scene.add(light);
```

## HemisphereLight [半球光]

> 文档地址：https://threejs.org/docs/index.html#api/zh/lights/HemisphereLight

光源直接放置于场景之上，光照颜色从天空光线颜色颜色渐变到地面光线颜色，无法投影阴影。控制渐变。使用代码如下：

```js
// 参数：颜色，光照强度
const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
```

## PointLight [点光源]

> 文档地址：https://threejs.org/docs/index.html#api/zh/lights/PointLight

从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。使用代码如下：

```js
// 参数：颜色，光照强度， 光照距离（随距离增大渐暗），光照衰退速率
const light = new THREE.PointLight(0xff0000, 1, 100);
scene.add(light);
```

## RectAreaLight [平面光光源]

> 文档地址：https://threejs.org/docs/index.html#api/zh/lights/RectAreaLight

不支持投影阴影，只支持 MeshStandardMaterial 和 MeshPhysicalMaterial 两种材质。模拟从指定平面发射光线。使用代码如下：

```js
// 参数：颜色，光照强度，光源宽度，光源高度
const light = new THREE.RectAreaLight(0xffffff, intensity, width, height);
scene.add(light);
```

## SpotLight [聚光灯]

> 文档地址：https://threejs.org/docs/index.html#api/zh/lights/SpotLight

聚光灯，随距离光照范围扩大。模拟从指定平面发射光线。使用代码如下：

```js
// 参数：颜色，光照强度，光照距离，光照散射角度，聚光锥的半影衰减百分比，光照衰减量
const light = new THREE.SpotLight(0xffffff);
scene.add(light);
```
