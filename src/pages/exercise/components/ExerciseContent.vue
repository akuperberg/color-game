<script setup lang="ts">
    import Frame from './Frame.vue'
    import { ref, nextTick, type VNodeRef } from 'vue'
    import { FrameColor } from '@/shared/enums/enums'
    import { frameColorService } from '@/shared/services/FrameColorService'

    interface Props {
        evaluationResult?: boolean | null
    }

    const props = withDefaults(defineProps<Props>(), {
        evaluationResult: null
    })

    const emit = defineEmits<{
        (e: 'frameSelected', selected: boolean): void
    }>()

    const framesContainerRef = ref<HTMLElement | null>(null)

    const frameRefs = ref<Array<InstanceType<typeof Frame> | null>>([])

    const frameColors: FrameColor[] = Object.values(FrameColor)

    const showFloatingCharacter = ref(false)
    const floatingLeft = ref(0)
    const floatingTop = ref(0)

    const onFrameClicked = async (frameColor: FrameColor, index: number): Promise<void> => {
        await nextTick()
        const containerRect = framesContainerRef.value?.getBoundingClientRect()
        const frameComponent = frameRefs.value[index]
        const frameRect = frameComponent?.getRect?.()
        if (!containerRect || !frameRect) return
        const centerX = frameRect.left + frameRect.width / 2 - containerRect.left
        const centerY = frameRect.top + frameRect.height / 2 - containerRect.top
        floatingLeft.value = centerX
        floatingTop.value = centerY
        showFloatingCharacter.value = true
        frameColorService.setSelectedFrameColor(frameColor)
        emit('frameSelected', true)
    }

    const setFrameRef = (index: number): VNodeRef => (ref, _refs) => {
        frameRefs.value[index] = ref as InstanceType<typeof Frame> | null
    }
</script>

<template>
    <div class="exercise-content-container">
        <div>
            <img
                v-if="!showFloatingCharacter"
                src="../assets/images/butterfly.png" 
                alt="character" 
                class="character character-original"
            />
        </div>
        
        <div class="frames-container" ref="framesContainerRef">
            <Frame
                v-for="(frameColor, index) in frameColors"
                :key="frameColor"
                :ref="setFrameRef(index)"
                :frameColor="frameColor"
                @click="onFrameClicked(frameColor, index)"
            />

            <img
                v-if="showFloatingCharacter"
                src="../assets/images/butterfly.png"
                alt="character"
                class="character character-floating"
                :style="{ left: `${floatingLeft}px`, top: `${floatingTop}px` }"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    @use '../styles/variables' as *;

    .exercise-content-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        margin-bottom: 50px;

        .character {
            max-width: 150px;
            height: auto;
        }

        .character-original {
            cursor: pointer;
            position: fixed;
            top: 50%;
            left: -20%;
            transform: translate(-50%, -50%);
            user-select: none;
            -webkit-user-select: none;
            -webkit-touch-callout: none;
        }

        .frames-container {
            display: flex;
            gap: 20px;
            position: relative;
            z-index: 2;
            flex-wrap: wrap;
        }
        
        .character-floating {
            position: absolute;
            width: 120px;
            height: auto;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 3;
        }
    }
</style>