<script setup lang="ts">
    import { ref, watch, onMounted, onUnmounted } from 'vue'
    import { Howl } from 'howler'
    import HandPointer from './HandPointer.vue'

    interface Props {
        frameColor: string
    }

    interface AudioConfig {
        src: string[]
        volume: number
        preload: boolean
    }

    const AUDIO_CONFIG: AudioConfig = {
        src: [],
        volume: 1,
        preload: true
    } as const

    const SOUNDS = {
        SUCCESS: '/src/assets/sounds/super.mp3',
        WRONG: '/src/assets/sounds/zkus_se_jeste_zamyslet.mp3'
    } as const

    const CORRECT_FRAME_COLOR = 'yellow' as const

    const props = defineProps<Props>()

    const emit = defineEmits<{
        evaluationResult: [success: boolean]
    }>()

    const isAnimationActive = ref(true)
    let successSound: Howl | null = null
    let wrongSound: Howl | null = null

    const initializeAudio = (): void => {
        successSound = new Howl({
            ...AUDIO_CONFIG,
            src: [SOUNDS.SUCCESS]
        })

        wrongSound = new Howl({
            ...AUDIO_CONFIG,
            src: [SOUNDS.WRONG]
        })
    }

    const playSound = (sound: Howl | null): void => {
        if (sound && !sound.playing()) {
            sound.play()
        }
    }

    const cleanupAudio = (): void => {
        if (successSound) {
            successSound.unload()
            successSound = null
        }
        if (wrongSound) {
            wrongSound.unload()
            wrongSound = null
        }
    }

    const onButtonClick = (): void => {
        isAnimationActive.value = false
        
        const isSuccess = props.frameColor === CORRECT_FRAME_COLOR
        
        if (isSuccess) {
            playSound(successSound)
        } else {
            playSound(wrongSound)
        }
        
        emit('evaluationResult', isSuccess)
    }

    watch(() => props.frameColor, (newFrameColor: string): void => {
        if (newFrameColor && newFrameColor !== '') {
            isAnimationActive.value = true
        }
    })

    onMounted((): void => {
        initializeAudio()
    })

    onUnmounted((): void => {
        cleanupAudio()
    })
</script>

<template>
    <div class="icon-animation">
        <div class="button-wrapper">
            <div class="button-container">
                <button @click="onButtonClick">
                    Vyhodnotit
                </button>
            </div>

            <div class="hand-pointer-component-container" v-if="isAnimationActive">
                <HandPointer :handPulsating="true" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '../styles/variables' as *;

    .wrapper {
        position: relative;
    }

    .button-wrapper {
        position: relative;
        display: flex;
    }

    .button-container {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        button {
            background-color: $green-color;
            color: white;
            border: none;
            border-radius: 5px;
            padding: 10px 25px;
            font-size: 16px;
            cursor: pointer;
            font-weight: 600;
        }
    }

    .hand-pointer-component-container {
        position: absolute;
        bottom: 15px;
        right: 15px;
        transform: rotate(230deg);
        pointer-events: none;
    }
</style>