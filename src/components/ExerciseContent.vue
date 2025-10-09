<script setup lang="ts">
    import { ref, onMounted, watch, onUnmounted } from 'vue'
    import HandPointer from './HandPointer.vue'

    interface Props {
        evaluationResult?: boolean | null
    }

    type AnimationPhase = 'start' | 'moving' | 'hidden'
    type FrameColor = 'blue' | 'yellow' | 'green'
    type Position = { x: number; y: number }

    const ANIMATION_DELAYS = {
        INITIAL: 1000,
        HAND_START: 500,
        HAND_MOVING: 3500,
        HAND_RESET: 800,
        CHARACTER_DROP: 50
    }

    const CHARACTER_DATA = 'character'

    const props = withDefaults(defineProps<Props>(), {
        evaluationResult: null
    })

    const emit = defineEmits<{
        characterDropped: [frameColor: FrameColor]
        characterReset: []
    }>()

    const draggedCharacter = ref<string | null>(null)
    const characterInFrame = ref<FrameColor | null>(null)
    const animationPhase = ref<AnimationPhase>('start')
    const isHandVisible = ref(true)
    
    const isDragging = ref(false)
    const dragStartPosition = ref<Position>({ x: 0, y: 0 })
    const currentDragPosition = ref<Position>({ x: 0, y: 0 })
    const draggedElement = ref<HTMLElement | null>(null)
    const dropZone = ref<FrameColor | null>(null)

    const getFrameAtPosition = (x: number, y: number): FrameColor | null => {
        const frames = document.querySelectorAll('.frame')
        
        for (const frame of frames) {
            const rect = frame.getBoundingClientRect()
            if (isPointInRect(x, y, rect)) {
                return getFrameColor(frame)
            }
        }
        return null
    }

    const isPointInRect = (x: number, y: number, rect: DOMRect): boolean => {
        return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom
    }

    const getFrameColor = (frame: Element): FrameColor | null => {
        if (frame.classList.contains('blue')) return 'blue'
        if (frame.classList.contains('yellow')) return 'yellow'
        if (frame.classList.contains('green')) return 'green'
        return null
    }

    const resetCharacterState = (): void => {
        // characterInFrame.value = null
        // draggedCharacter.value = null
        // isHandVisible.value = false
        // animationPhase.value = 'hidden'
        // emit('characterReset')
    }

    const startHandAnimation = (): void => {
        if (characterInFrame.value) return
        
        animationPhase.value = 'start'
        isHandVisible.value = true
        
        setTimeout(() => {
            if (characterInFrame.value) return
            animationPhase.value = 'moving'
        }, ANIMATION_DELAYS.HAND_START)
        
        setTimeout(() => {
            if (characterInFrame.value) return
            isHandVisible.value = false
            animationPhase.value = 'hidden'
            
            setTimeout(() => {
                startHandAnimation()
            }, ANIMATION_DELAYS.HAND_RESET)
        }, ANIMATION_DELAYS.HAND_MOVING)
    }

    watch(() => props.evaluationResult, (newResult: boolean | null): void => {
        if (newResult !== null && !newResult) {
            resetCharacterState()
            setTimeout(() => {
                animationPhase.value = 'start'
                isHandVisible.value = true
                startHandAnimation()
            }, ANIMATION_DELAYS.HAND_RESET)
        }
    })

    watch(characterInFrame, (newValue) => {
        if (newValue) {
            isHandVisible.value = false
            animationPhase.value = 'hidden'
        }
    })

    onMounted((): void => {
        setTimeout(() => {
            startHandAnimation()
        }, ANIMATION_DELAYS.INITIAL)

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    })

    onUnmounted(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    })

    const handleDragStart = (event: DragEvent): void => {
        // if (event.dataTransfer) {
        //     event.dataTransfer.effectAllowed = 'move'
        //     event.dataTransfer.setData('text/plain', CHARACTER_DATA)
        //     draggedCharacter.value = CHARACTER_DATA
        // }
    }

    const handleDragEnd = (): void => {
        // draggedCharacter.value = null
    }

    const handleDragOver = (event: DragEvent): void => {
        // event.preventDefault()
        // if (event.dataTransfer) {
        //     event.dataTransfer.dropEffect = 'move'
        // }
    }

    const handleDrop = (event: DragEvent, frameColor: FrameColor): void => {
        // event.preventDefault()
        // if (event.dataTransfer) {
        //     const data = event.dataTransfer.getData('text/plain')
        //     if (data === CHARACTER_DATA) {
        //         setTimeout(() => {
        //             characterInFrame.value = frameColor
        //             emit('characterDropped', frameColor)
        //         }, ANIMATION_DELAYS.CHARACTER_DROP)
        //     }
        // }
    }

    const startDrag = (position: Position, element: HTMLElement): void => {
        // if (characterInFrame.value) return
        
        // dragStartPosition.value = position
        // currentDragPosition.value = position
        // isDragging.value = true
        // draggedCharacter.value = CHARACTER_DATA
        // draggedElement.value = element
        
        // isHandVisible.value = false
        // animationPhase.value = 'hidden'
    }

    const updateDragPosition = (position: Position): void => {
        // if (!isDragging.value) return
        
        // currentDragPosition.value = position
        
        // if (draggedElement.value) {
        //     const offsetX = position.x - dragStartPosition.value.x
        //     const offsetY = position.y - dragStartPosition.value.y
            
        //     draggedElement.value.style.transform = `translate(${offsetX}px, ${offsetY}px) translateY(-50%) scale(1.1)`
        // }
        
        // const frameColor = getFrameAtPosition(position.x, position.y)
        // dropZone.value = frameColor
    }

    const endDrag = (): void => {
        // if (!isDragging.value) return
        
        // if (dropZone.value) {
        //     characterInFrame.value = dropZone.value
        //     emit('characterDropped', dropZone.value)
        // }
        
        // isDragging.value = false
        // draggedCharacter.value = null
        // dropZone.value = null
        
        // if (draggedElement.value) {
        //     draggedElement.value.style.transform = 'translateY(-50%)'
        // }
        // draggedElement.value = null
    }

    const handleTouchStart = (event: TouchEvent): void => {
        // const touch = event.touches[0]
        // startDrag({ x: touch.clientX, y: touch.clientY }, event.target as HTMLElement)
        // event.preventDefault()
    }

    const handleTouchMove = (event: TouchEvent): void => {
        // const touch = event.touches[0]
        // updateDragPosition({ x: touch.clientX, y: touch.clientY })
        // event.preventDefault()
    }

    const handleTouchEnd = (event: TouchEvent): void => {
        // endDrag()
        // event.preventDefault()
    }

    const handleMouseDown = (event: MouseEvent): void => {
        // startDrag({ x: event.clientX, y: event.clientY }, event.target as HTMLElement)
        // event.preventDefault()
    }

    const handleMouseMove = (event: MouseEvent): void => {
        // updateDragPosition({ x: event.clientX, y: event.clientY })
    }

    const handleMouseUp = (): void => {
        // endDrag()
    }
</script>

<template>
    <div class="exercise-content-container">
        <div>
            <img 
                v-if="!characterInFrame"
                src="../assets/images/butterfly.png" 
                alt="character" 
                class="character character-original"
                :class="{ 
                    'dragging': draggedCharacter === 'character' || isDragging,
                    'touch-dragging': isDragging
                }"
                draggable="true"
                @dragstart="handleDragStart"
                @dragend="handleDragEnd"
                @touchstart="handleTouchStart"
                @touchmove="handleTouchMove"
                @touchend="handleTouchEnd"
                @mousedown="handleMouseDown"
            />
        </div>
        
        <div 
            class="icon-animation"
            v-show="isHandVisible"
        >
        </div>
        <div class="frames-container">
            <div 
                class="frame blue"
                :class="{ 
                    'has-character': characterInFrame === 'blue',
                    'drop-target': dropZone === 'blue'
                }"
            >
                <img 
                    v-if="characterInFrame === 'blue'"
                    src="../assets/images/butterfly.png" 
                    alt="character in blue frame" 
                    class="character character-in-frame"
                />
            </div>
            <div 
                class="frame yellow"
                :class="{ 
                    'has-character': characterInFrame === 'yellow',
                    'drop-target': dropZone === 'yellow'
                }"
            >
                <img 
                    v-if="characterInFrame === 'yellow'"
                    src="../assets/images/butterfly.png" 
                    alt="character in yellow frame" 
                    class="character character-in-frame"
                />
            </div>
            <div 
                class="frame green"
                :class="{ 
                    'has-character': characterInFrame === 'green',
                    'drop-target': dropZone === 'green'
                }"
            >
                <img 
                    v-if="characterInFrame === 'green'"
                    src="../assets/images/butterfly.png" 
                    alt="character in green frame" 
                    class="character character-in-frame"
                />
            </div>
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

        .icon-animation {
            position: absolute;
            top: 50%;
            left: clamp(-120px, -10vw, -60px);
            transform: translateY(-50%);
            transition: all 3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1;
            pointer-events: none;
            
            &.animate-to-yellow {
                left: clamp(150px, 22vw, 450px);
            }
        }

        .character {
            width: clamp(60px, 15vw, 120px);
            height: auto;
        }

        .character-original {
            cursor: pointer;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            user-select: none;
            -webkit-user-select: none;
            -webkit-touch-callout: none;

            @media (max-width: 600px) {
                left: clamp(-60px, -10vw, -60px);
            }

            @media (max-width: 400px) {
                left: clamp(-30px, -10vw, -60px);
            }
        
        }

        .character-in-frame {
            animation: characterAppear 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .frame {
            width: 80px;
            height: 80px;
            border-radius: 2px;
            border: 1px red solid;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            position: relative;
            
            &.has-character {
                background-color: rgba(255, 255, 255, 0.1);
                transform: scale(1.02);
                box-shadow: 0 clamp(1px, 0.4vw, 4px) clamp(4px, 1.2vw, 16px) rgba(0, 0, 0, 0.15);
            }
            
            &.drop-target {
                background-color: rgba(255, 255, 255, 0.2);
                transform: scale(1.05);
                box-shadow: 0 clamp(2px, 0.8vw, 8px) clamp(8px, 2.4vw, 24px) rgba(0, 0, 0, 0.2);
                border-width: clamp(2px, 1vw, 6px);
            }
        }

        .frames-container {
            display: flex;
            gap: clamp(8px, 2vw, 20px);
            position: relative;
            z-index: 2;

            .blue {
                border-color: $blue-color;
            }

            .yellow {
                border-color: $yellow-color;
            }

            .green {
                border-color: $green-color;
            }
        }
    }

    @keyframes characterAppear {
        0% {
            opacity: 0;
            transform: scale(0.3) rotate(-10deg);
        }
        50% {
            opacity: 0.8;
            transform: scale(1.1) rotate(5deg);
        }
        100% {
            opacity: 1;
            transform: scale(1) rotate(0deg);
        }
    }
</style>