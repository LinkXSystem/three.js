# Geomotry [几何体]

## BoxGeometry [立方几何体]

> 文档地址：https://threejs.org/docs/#api/zh/geometries/BoxGeometry

BoxGeometry 是四边形的原始几何类，它通常使用构造函数所提供的“width”、“height”、“depth”参数来创建立方体或者不规则四边形。

## BoxBufferGeometry [立方缓冲几何体]

> 文档地址：https://threejs.org/docs/#api/zh/geometries/BoxBufferGeometry

示例代码：

```js
const geometry = new THREE.BoxBufferGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);
```
