"use client"

import { useTheme } from "components/ThemeProvider"
import { Transition } from "components/Transition"
import { useReducedMotion, useSpring } from "framer-motion"
import { useInViewport, useWindowSize } from "hooks"
import { startTransition, useEffect, useRef } from "react"
import * as THREE from "three"
import {
  AmbientLight,
  Color,
  DirectionalLight,
  Mesh,
  MeshPhongMaterial,
  PerspectiveCamera,
  Scene,
  SphereGeometry, // Changed from SphereBufferGeometry
  UniformsUtils,
  Vector2,
  WebGLRenderer,
  sRGBEncoding,
} from "three"
import { Points, PointsMaterial, AdditiveBlending } from "three"

// Import texture for particles
import { media, rgbToThreeColor } from "utils/style"
import { cleanRenderer, cleanScene, removeLights } from "utils/three"
import styles from "./DisplacementSphere.module.css"
import fragShader from "./displacementSphereFragment.glsl"
import vertShader from "./displacementSphereVertex.glsl"

const springConfig = {
  stiffness: 30,
  damping: 20,
  mass: 2,
}

export const DisplacementSphere = (props) => {
  const theme = useTheme()
  const { rgbBackground, themeId, colorWhite } = theme
  const start = useRef(Date.now())
  const canvasRef = useRef()
  const mouse = useRef()
  const renderer = useRef()
  const camera = useRef()
  const scene = useRef()
  const lights = useRef()
  const uniforms = useRef()
  const material = useRef()
  const geometry = useRef()
  const sphere = useRef()
  const reduceMotion = useReducedMotion()
  const isInViewport = useInViewport(canvasRef)
  const windowSize = useWindowSize()
  const rotationX = useSpring(0, springConfig)
  const rotationY = useSpring(0, springConfig)
  const particles = useRef()
  useEffect(() => {
    const { innerWidth, innerHeight } = window
    mouse.current = new Vector2(0.8, 0.5)
    renderer.current = new WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
      failIfMajorPerformanceCaveat: true,
    })
    renderer.current.setSize(innerWidth, innerHeight)
    renderer.current.setPixelRatio(1)
    renderer.current.outputEncoding = sRGBEncoding

    camera.current = new PerspectiveCamera(54, innerWidth / innerHeight, 0.1, 100)
    camera.current.position.z = 52

    scene.current = new Scene()

    material.current = new MeshPhongMaterial()
    material.current.onBeforeCompile = (shader) => {
      uniforms.current = UniformsUtils.merge([shader.uniforms, { time: { type: "f", value: 0 } }])
      shader.uniforms = uniforms.current

      const uv2ParsVertexFix = `
        #ifdef USE_UV2
          attribute vec2 uv2;
          varying vec2 vUv2;
        #endif
      `

      const uv2ParsFragmentFix = `
        #ifdef USE_UV2
          varying vec2 vUv2;
        #endif
      `

      shader.vertexShader = vertShader.replace("#include <uv2_pars_vertex>", uv2ParsVertexFix)
      shader.fragmentShader = fragShader.replace("#include <uv2_pars_fragment>", uv2ParsFragmentFix)
    }


    startTransition(() => {
      geometry.current = new SphereGeometry(32, 128, 128) // Changed from SphereBufferGeometry
      sphere.current = new Mesh(geometry.current, material.current)
      sphere.current.position.z = 0
      sphere.current.modifier = Math.random()
      scene.current.add(sphere.current)
    })
    const particleGeometry = new THREE.BufferGeometry()
    // Populate particleGeometry with vertices for particles

    const createDotTexture = () => {
      const canvas = document.createElement("canvas")
      canvas.width = 16
      canvas.height = 16

      const context = canvas.getContext("2d")
      context.beginPath()
      context.arc(8, 8, 8, 0, 2 * Math.PI)
      context.fillStyle = "#FFFFFF" // White dot
      context.fill()

      return new THREE.CanvasTexture(canvas)
    }

    const particleMat = new PointsMaterial({
      size: 0.5,
      map: createDotTexture(),
      blending: AdditiveBlending,
      transparent: true,
    })

    particles.current = new Points(particleGeometry, particleMat)
    scene.current.add(particles.current)

    return () => {
      cleanScene(scene.current)
      cleanRenderer(renderer.current)
    }
  }, [])

  useEffect(() => {
    const dirLight = new DirectionalLight(colorWhite, 0.6)
    const ambientLight = new AmbientLight(colorWhite, themeId === "light" ? 0.8 : 0.1)

    dirLight.position.z = 200
    dirLight.position.x = 100
    dirLight.position.y = 100

    lights.current = [dirLight, ambientLight]
    scene.current.background = new Color(...rgbToThreeColor(rgbBackground))
    lights.current.forEach((light) => scene.current.add(light))

    return () => {
      removeLights(lights.current)
    }
  }, [rgbBackground, colorWhite, themeId])

  useEffect(() => {
    const { width, height } = windowSize

    const adjustedHeight = height + height * 0.3
    renderer.current.setSize(width, adjustedHeight)
    camera.current.aspect = width / adjustedHeight
    camera.current.updateProjectionMatrix()

    // Render a single frame on resize when not animating
    if (reduceMotion) {
      renderer.current.render(scene.current, camera.current)
    }

    if (width <= media.mobile) {
      sphere.current.position.x = 14
      sphere.current.position.y = 10
    } else if (width <= media.tablet) {
      sphere.current.position.x = 18
      sphere.current.position.y = 14
    } else {
      sphere.current.position.x = 22
      sphere.current.position.y = 16
    }
  }, [reduceMotion, windowSize])

  useEffect(() => {
    const onMouseMove = (event) => {
      const position = {
        x: event.clientX / window.innerWidth,
        y: event.clientY / window.innerHeight,
      }

      rotationX.set(position.y / 2)
      rotationY.set(position.x / 2)
    }

    if (!reduceMotion && isInViewport) {
      window.addEventListener("mousemove", onMouseMove)
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [isInViewport, reduceMotion, rotationX, rotationY])

  useEffect(() => {
    let animation

    const animate = () => {
      animation = requestAnimationFrame(animate)

      if (uniforms.current !== undefined) {
        uniforms.current.time.value = 0.00005 * (Date.now() - start.current)
      }

      sphere.current.rotation.z += 0.001
      sphere.current.rotation.x = rotationX.get()
      sphere.current.rotation.y = rotationY.get()

      renderer.current.render(scene.current, camera.current)
    }

    if (!reduceMotion && isInViewport) {
      animate()
    } else {
      renderer.current.render(scene.current, camera.current)
    }
    if (particles.current) {
      particles.current.rotation.y += 0.001
      // Additional particle animation logic
    }
    return () => {
      cancelAnimationFrame(animation)
    }
  }, [isInViewport, reduceMotion, rotationX, rotationY])

  return (
    <Transition in timeout={3000}>
      {(visible) => <canvas aria-hidden className={styles.canvas} data-visible={visible} ref={canvasRef} {...props} />}
    </Transition>
  )
}
