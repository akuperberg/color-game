<script setup lang="ts">
    import { ref } from 'vue'
    import ExerciseDescription from './ExerciseDescription.vue'
    import ExerciseContent from './ExerciseContent.vue'
    import Button from './Button.vue'

    const instructionHasPlayed = ref(false)
    const selectedFrame = ref<string | null>(null)
    const evaluationResult = ref<boolean | null>(null)

    const onInstructionPlayed = (): void => {
        instructionHasPlayed.value = true
    }

    const onBeeDropped = (frameColor: string): void => {
        selectedFrame.value = frameColor
    }

    const onBeeReset = (): void => {
        selectedFrame.value = null
    }

    const onEvaluationResult = (success: boolean): void => {
        evaluationResult.value = success
        
        setTimeout(() => {
            evaluationResult.value = null
        }, 1000)
    }
</script>

<template>
    <div class="main-container">
        <div class="exercise-container">
        <ExerciseDescription @instructionPlayed="onInstructionPlayed" />
        <div 
            class="exercise-content-wrapper"
            :class="{ 'show': instructionHasPlayed }"
        >
            <ExerciseContent 
                :evaluationResult="evaluationResult"
                @beeDropped="onBeeDropped" 
                @beeReset="onBeeReset"
            />
        </div>
        <div 
            class="button-wrapper"
            :class="{ 'show': selectedFrame }"
        >
            <Button 
                :frameColor="selectedFrame ?? ''" 
                @evaluationResult="onEvaluationResult"
            />
        </div>
    </div>
    </div>
</template>

<style scoped>
    .main-container {
        min-height: calc(100vh - 20px);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .exercise-content-wrapper {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        
        &.show {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
    }

    .button-wrapper {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        
        &.show {
            opacity: 1;
            transform: translateY(0);
            pointer-events: auto;
        }
    }
</style>