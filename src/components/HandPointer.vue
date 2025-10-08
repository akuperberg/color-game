<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

interface Props {
  handPulsating?: boolean
}

const ANIMATION_TIMINGS = {
  HAND_VISIBLE_DURATION: 3000,
  HAND_HIDDEN_DURATION: 2000
} as const

const props = withDefaults(defineProps<Props>(), {
  handPulsating: false
})

const isHandVisible = ref(true)
let animationTimeout: number | null = null

const startAnimationCycle = (): void => {
  if (!props.handPulsating) return
  
  stopAnimation()
  
  isHandVisible.value = true
  
  animationTimeout = window.setTimeout(() => {
    isHandVisible.value = false
    
    animationTimeout = window.setTimeout(() => {
      if (props.handPulsating) {
        startAnimationCycle()
      }
    }, ANIMATION_TIMINGS.HAND_HIDDEN_DURATION)
  }, ANIMATION_TIMINGS.HAND_VISIBLE_DURATION)
}

const stopAnimation = (): void => {
  if (animationTimeout) {
    clearTimeout(animationTimeout)
    animationTimeout = null
  }
}

watch(() => props.handPulsating, (newValue: boolean): void => {
  if (newValue) {
    startAnimationCycle()
  } else {
    stopAnimation()
    isHandVisible.value = true
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
    <div class="hand-pointer-container">
        <img 
            src="../assets/icons/yellow-circle.svg" 
            alt="Yellow circle" 
            class="yellow-circle" 
            :class="{ 'pulsating': handPulsating }" 
        />
        <img 
            v-if="isHandVisible"
            src="../assets/icons/hand.svg" 
            alt="Hand pointer" 
            class="hand" 
            :class="{ 'pulsating': handPulsating }" 
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

    .yellow-circle {
        width: 40px;
        height: 40px;
        
        &.pulsating {
            animation: pulse 1s ease-in-out infinite;
        }
    }

    .hand {
        width: 50px;
        height: 50px;
        position: absolute;
        top: 50%;
        left: 0;
        
        &.pulsating {
            animation: handPulse 1s ease-in-out infinite;
        }
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

    @keyframes handPulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        30% {
            transform: scale(1.2);
            opacity: 0.9;
        }
        50% {
            transform: scale(1.3);
            opacity: 0.8;
        }
        70% {
            transform: scale(1.2);
            opacity: 0.9;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>