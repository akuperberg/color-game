<script setup lang="ts">
import { useAudioStore } from '@/stores/appStore'

const audioStore = useAudioStore()

const handleSubmit = () => {
    audioStore.saveToLocalStorage()
}
</script>

<template>
    <div class="admin-settings">
        <h2>App Settings</h2>

        <form @submit.prevent="handleSubmit" class="settings-form">
            <div class="form-group">
                <label for="volume">Sound Volume: {{ audioStore.volume }}%</label>
                <input id="volume" v-model.number="audioStore.volume" type="range" min="0" max="100" step="1"
                    class="volume-slider" />
            </div>

            <button type="submit" class="save-button">
                Save Settings
            </button>
        </form>
    </div>
</template>

<style scoped>
.admin-settings {
    padding: 20px;
    max-width: 500px;
    margin: 0 auto;
}

.settings-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.form-group label {
    font-weight: 500;
    color: #333;
}

.volume-slider {
    width: 100%;
    height: 6px;
    border-radius: 3px;
    background: #ddd;
    outline: none;
    -webkit-appearance: none;
}

.volume-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
}

.volume-slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4CAF50;
    cursor: pointer;
    border: none;
}

.save-button {
    padding: 12px 24px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;
}

.save-button:hover {
    background-color: #45a049;
}
</style>