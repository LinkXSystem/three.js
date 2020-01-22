# Material [材质]

## MeshBasicMaterial [基础网格材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/MeshBasicMaterial

最基本的材质，不受光照影响，无法生成阴影，可以传递 color 来设置材质的颜色。使用代码如下：

```js
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000
});
```

## MeshNormalMaterial [法线网格材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/MeshNormalMaterial

可以将法向量映射到 RGB 颜色的材质，即根据面的法线或者朝向来使用不同的颜色来渲染网格的面。使用代码如下：

```js
const material = new THREE.MeshNormalMaterial();
```

## MeshLambertMaterial [Lambert 网格材质]

该材质可以反光，并能产生阴暗的表面，常用材质。可以用来模拟一些粗糙的表面（例如未经处理的木材或石材），不适合用来模拟类金属的表面。使用代码如下：

```js
const material = new THREE.MeshLambertMaterial({ color: 0xff0000 });
```

## MeshPhongMaterial [Phong 网格材质]

该材质可以反光，并能产生阴暗的表面，常用材质。与 MeshLambertMaterial 相反，它适合模拟金属光泽的表面，反光更强。使用代码如下：

```js
// shininess 用来设置反光强度
const material = new THREE.MeshPhongMaterial({ shininess: 1 });
```

## MeshStandardMaterial [标准网格材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/MeshStandardMaterial

标准的网格材质，该材质比 MeshLambertMaterial 或 MeshPhongMaterial 更精确和逼真的结果，只是计算成本较高。在使用的时候需要指定 `environment map`，这样能更有效。使用代码如下：

```js
const material = new THREE.MeshStandardMaterial({
  // 金属度
  metalness: 0,
  // 粗糙度
  roughness: 0.5
});
```

## MeshPhysicalMaterial [物理网格材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/MeshPhysicalMaterial

MeshStandardMaterial 的扩展，能够更好地控制反射率。使用代码如下：

```js
const material = new THREE.MeshStandardMaterial({
  // 金属度
  metalness: 0,
  // 粗糙度
  roughness: 0.5
});
```

## MeshDepthMaterial [深度网格材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/MeshDepthMaterial

深度与相机距离有关，深度基于相机远近平面。白色最近，黑色最远。使用代码如下：

```js
const material = new THREE.MeshDepthMaterial();
```

## MeshDistanceMaterial [未使用]

> 文档地址：https://threejs.org/docs/#api/zh/materials/MeshDistanceMaterial

## MeshToonMaterial [Toon 网络材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/MeshToonMaterial

一种卡通式风格的网络材质。。使用代码如下：

```js
const material = new THREE.MeshToonMaterial({
  color: 0xff0000
});
```

## ShaderMaterial [着色器材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/ShaderMaterial

可以调用自定义的 shader 来渲染出自己需要的材质。

## ShadowMaterial [阴影材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/ShadowMaterial

只渲染阴影的部分，其余部分透明。使用代码如下：

```js
let PlaneGeometry = new THREE.PlaneGeometry(2000, 2000);
PlaneGeometry.rotateX(-Math.PI / 2);

let PlaneMaterial = new THREE.ShadowMaterial();
PlaneMaterial.opacity = 0.2;

let plane = new THREE.Mesh(PlaneMaterial, PlaneMaterial);
plane.position.y = -200;
plane.receiveShadow = true;
scene.add(plane);
```

## SpriteMaterial [点精灵材质]

> 文档地址： https://threejs.org/docs/#api/zh/materials/SpriteMaterial

一种使用 Sprite 的材质，可以参考此 [Sprite](https://threejs.org/docs/#api/zh/objects/Sprite) 的文档。使用代码如下：

```js
const SpriteMap = new THREE.TextureLoader().load("textures/sprite.png");

const SpriteMaterial = new THREE.SpriteMaterial({
  map: SpriteMap,
  color: 0xffffff
});

const sprite = new THREE.Sprite(SpriteMaterial);
sprite.scale.set(200, 200, 1);

scene.add(sprite);
```

## PointsMaterial [点材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/PointsMaterial

## LineBasicMaterial [基础线条材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/LineBasicMaterial

使用此线来构建三维物体。使用代码如下：

```js
const material = new THREE.LineBasicMaterial({
  color: 0xffffff,
  linewidth: 1,
  linecap: "round", //ignored by WebGLRenderer
  linejoin: "round" //ignored by WebGLRenderer
});
```

## LineDashedMaterial [虚线材质]

> 文档地址：https://threejs.org/docs/#api/zh/materials/LineDashedMaterial

LineBasicMaterial 材质的虚线版本。使用代码如下：

```js
const material = new THREE.LineDashedMaterial({
  color: 0xffffff,
  linewidth: 1,
  scale: 1,
  dashSize: 3,
  gapSize: 1
});
```
