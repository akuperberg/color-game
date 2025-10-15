<script setup lang="ts">
    import { ref } from 'vue'

    interface Props {
        frameColor: string
    }

    const props = defineProps<Props>()
    const frameColor = props.frameColor

    const rootRef = ref<HTMLElement | null>(null)

    const getRect = (): DOMRect | null => {
        const el = rootRef.value
        return el ? el.getBoundingClientRect() : null
    }

    defineExpose({ getRect })
</script>

<template>
    <div ref="rootRef" class="frame" :style="{ 'border-color': frameColor }">
    </div>
</template>

<style scoped lang="scss">
    .frame {
        max-width: 200px;
        height: 200px;
        aspect-ratio: 1 / 1;
        border-radius: 2px;
        border-width: 3px;
        border-style: solid;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        cursor: pointer;

        @media (max-width: 768px) {
            max-width: 150px;
            height: 150px;
        }

        &:hover {
            transform: scale(1.05);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
        }
    }
</style>