import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Head } from '../types'

export function useHeadViewerScene(canvasEl: HTMLCanvasElement | null, head: Head | null, isOpen: boolean) {
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const meshRef = useRef<THREE.Group | null>(null)
  const animationIdRef = useRef<number | null>(null)
  const spinAngleRef = useRef(0)

  useEffect(() => {
    if (!isOpen || !head || !canvasEl) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000)
    camera.position.set(0.5, 1, 3)
    camera.lookAt(0, 0, 0)

    const renderer = new THREE.WebGLRenderer({ canvas: canvasEl, alpha: true, antialias: true })
    renderer.setSize(256, 256)
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.NoToneMapping
    rendererRef.current = renderer

    const imageLoader = new THREE.ImageLoader()
    const texturePath = `/reliquary-ui/textures/${head.uuid}.png`

    const createFaceTexture = (image: HTMLImageElement, sx: number, sy: number) => {
      const canvas = document.createElement('canvas')
      canvas.width = 8
      canvas.height = 8
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(image, sx, sy, 8, 8, 0, 0, 8, 8)

      const texture = new THREE.CanvasTexture(canvas)
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.NearestFilter
      texture.colorSpace = THREE.SRGBColorSpace
      return texture
    }

    const buildMaterials = (image: HTMLImageElement, coords: number[][]) =>
      coords.map(([sx, sy]) =>
        new THREE.MeshBasicMaterial({
          map: createFaceTexture(image, sx, sy),
          transparent: true,
          alphaTest: 0.05,
          side: THREE.DoubleSide,
        })
      )

    const HEAD_COORDS = [[0, 8], [16, 8], [8, 0], [16, 0], [8, 8], [24, 8]]
    const HAT_COORDS = [[32, 8], [48, 8], [40, 0], [48, 0], [40, 8], [56, 8]]

    imageLoader.load(
      texturePath,
      (img) => {
        const headGeo = new THREE.BoxGeometry(1, 1, 1)
        const hatGeo = new THREE.BoxGeometry(1.125, 1.125, 1.125)
        const headMesh = new THREE.Mesh(headGeo, buildMaterials(img, HEAD_COORDS))
        const hatMesh = new THREE.Mesh(hatGeo, buildMaterials(img, HAT_COORDS))

        const group = new THREE.Group()
        group.add(headMesh)
        group.add(hatMesh)
        scene.add(group)
        meshRef.current = group
      },
      undefined,
      (error) => {
        console.error('Failed to load texture:', error)
      }
    )

    const WORLD_Y = new THREE.Vector3(0, 1, 0)
    const SPIN_SPEED = 0.01

    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate)

      if (meshRef.current) {
        spinAngleRef.current += SPIN_SPEED
        meshRef.current.quaternion.setFromAxisAngle(WORLD_Y, spinAngleRef.current)
      }

      renderer.render(scene, camera)
    }

    animate()

    return () => {
      if (animationIdRef.current) cancelAnimationFrame(animationIdRef.current)
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose())
          } else {
            obj.material.dispose()
          }
        }
      })
      spinAngleRef.current = 0
    }
  }, [canvasEl, head, isOpen])
}