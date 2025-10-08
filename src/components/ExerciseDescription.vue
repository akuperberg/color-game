<script setup lang="ts">
    import { ref, onMounted, onUnmounted } from 'vue'
    import { Howl } from 'howler'
    import HandPointer from './HandPointer.vue'

    interface AudioConfig {
        src: string[]
        volume: number
        preload: boolean
    }

    const AUDIO_CONFIG: AudioConfig = {
        src: ['/src/assets/sounds/instrukce.mp3'],
        volume: 1,
        preload: true
    } as const

    const emit = defineEmits<{
        instructionPlayed: []
    }>()

    const hasInstructionPlayed = ref(false)
    let instruction: Howl | null = null

    const initializeAudio = (): void => {
        instruction = new Howl(AUDIO_CONFIG)

        instruction.on('play', (): void => {
            hasInstructionPlayed.value = true
        })

        instruction.on('end', (): void => {
            emit('instructionPlayed')
        })

        instruction.on('loaderror', (error: unknown): void => {
            console.warn('Failed to load instruction audio:', error)
        })
    }

    const playInstruction = (): void => {
        if (instruction && !instruction.playing()) {
            instruction.play()
        }
    }

    const cleanupAudio = (): void => {
        if (instruction) {
            instruction.off('play')
            instruction.off('end')
            instruction.off('loaderror')
            instruction.unload()
            instruction = null
        }
    }

    onMounted((): void => {
        // initializeAudio()
    })

    onUnmounted((): void => {
        cleanupAudio()
    })
</script>

<template>
    <div class="exercise-description-container">
        <div class="icon-animation">
            <div class="speaker-icon-container" @click="playInstruction">
                <img src="../assets/icons/speaker.svg" alt="speaker" class="speaker-icon" />
            </div>

            <div class="hand-pointer-component-container" v-if="!hasInstructionPlayed">
                <HandPointer :handPulsating="true" />
            </div>
        </div>
        <p class="exercise-description-text">Přetáhni včelku do žlutého rámečku</p>
    </div>
</template>

<style scoped lang="scss">
    @use '../styles/variables' as *;

    .exercise-description-container {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 50px;
    }

    .icon-animation {
        position: relative;

        .hand-pointer-component-container {
            position: absolute;
            bottom: -2.5px;
            right: -2.5px;
            pointer-events: none;
        }
    }

    .speaker-icon-container {
        width: 35px;
        height: 35px;
        background-color: $blue-color;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;

        .speaker-icon {
            width: 20px;
            height: 20px;
            cursor: pointer;
        }
    }
</style>