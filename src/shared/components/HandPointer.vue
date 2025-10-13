<script setup lang="ts">
  import { ref, onMounted, onUnmounted, watch } from 'vue'
  import { PhHandPointing } from '@phosphor-icons/vue'
  import { AnimationTimings } from '../shared/enums/enums'

  interface Props {
    handPulsating?: boolean
  }

  const props = withDefaults(defineProps<Props>(), {
    handPulsating: false
  })

  const isAnimationVisible = ref(true)

  let visibleTimeout: number | null = null
  let hiddenTimeout: number | null = null

  const startAnimationCycle = (): void => {
    if (!props.handPulsating) return
    
    stopAnimation()
    
    isAnimationVisible.value = true

    visibleTimeout = window.setTimeout(() => {
      isAnimationVisible.value = false
      
      hiddenTimeout = window.setTimeout(() => {
        if (props.handPulsating) {
          startAnimationCycle()
        }
      }, AnimationTimings.HAND_HIDDEN_DURATION)
    }, AnimationTimings.HAND_VISIBLE_DURATION)
  }

  const stopAnimation = (): void => {
    if (visibleTimeout) {
      clearTimeout(visibleTimeout)
      visibleTimeout = null
    }
    if (hiddenTimeout) {
      clearTimeout(hiddenTimeout)
      hiddenTimeout = null
    }
  }

  watch(() => props.handPulsating, (newValue: boolean): void => {
    if (newValue) {
      startAnimationCycle()
    } else {
      stopAnimation()
      isAnimationVisible.value = true
    }
  })

  onMounted((): void => {
    if (props.handPulsating) {
      startAnimationCycle()
    }
  })

  onUnmounted((): void => {
    stopAnimation()
  })
</script>

<template>
    <div class="hand-pointer-container" v-if="isAnimationVisible" :class="{ 'pulsating': handPulsating }" >
        <div
            class="circle"
        ></div>

        <PhHandPointing 
            :size="25" 
            weight="fill" 
            class="hand" 
            color="#FFD93D" 
        />
    </div>
</template>

<style scoped lang="scss">
    .hand-pointer-container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .pulsating {
        animation: pulse 1s ease-in-out infinite;
    }

    .circle {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid #FFD93D;
    }

    .hand {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 0;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 0.8;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>