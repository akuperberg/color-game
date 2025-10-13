<script setup lang="ts">
    import { onMounted, onUnmounted } from 'vue'
    import { Howl } from 'howler'
    import HandPointer from './HandPointer.vue'
    import { frameColorService } from '../../shared/services/FrameColorService'
    // import { SoundPaths } from '@/shared/enums/enums'

    const emit = defineEmits<{
        evaluationResult: [success: boolean]
    }>()

    let successSound: Howl | null = null
    let wrongSound: Howl | null = null

    // const initializeAudio = (): void => {
    //     successSound = new Howl({  
    //         volume: 1,
    //         preload: true,
    //         src: [SoundPaths.SUCCESS]
    //     })

    //     wrongSound = new Howl({
    //         volume: 1,
    //         preload: true,
    //         src: [SoundPaths.WRONG]
    //     })
    // }

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
        const isSuccess = frameColorService.isCorrectFrameSelected()
        
        if (isSuccess) {
            playSound(successSound)
        } else {
            playSound(wrongSound)
        }
        
        emit('evaluationResult', isSuccess)
    }

    onMounted((): void => {
        // initializeAudio()
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
                    Evaluate
                </button>
            </div>

            <div class="hand-pointer-component-container">
                <HandPointer :handPulsating="true" />
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '../../styles/variables' as *;

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