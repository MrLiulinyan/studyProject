<template>
  <canvas ref="canvasEl"></canvas>
</template>
<script setup>
import { useTemplateRef, defineProps, onMounted } from "vue";

const { src, width, height } = defineProps({
  src: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    default: 300,
  },
  height: {
    type: Number,
    default: 300,
  },
});
console.log(6666);
const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};
const canvasRef = useTemplateRef("canvasEl");
onMounted(async () => {
  const canvas = canvasRef.value;
  const ctx = canvas.getContext("2d");
  const drawImageToCanvas = (img) => {
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);
  };
  const img = await loadImage(src);
  drawImageToCanvas(img);
});
</script>

<style lang="scss"></style>
