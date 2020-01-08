# Three 的基本技巧

## 调用辅助

- 基本使用

> 源码地址：http://localhost:8080/examples/#webgl_geometry_cube

```js
scene = new THREE.Scene();

scene.add( new THREE.AxesHelper( 20 ) );
```

- 任意坐标（物体）

> 源码地址：http://localhost:8080/examples/#webgl_geometry_normals

```js
const vertexNormalsHelper = new VertexNormalsHelper(mesh, 10);
mesh.add(vertexNormalsHelper);
```

## 调用贴图

> 源码地址：http://localhost:8080/examples/#webgl_geometry_cube

```js
const texture = new THREE.TextureLoader().load('...'); // load 需要指定资源地址

...

const material = new THREE.MeshBasicMaterial({ map: texture });
```

