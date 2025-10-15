<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAudioStore } from '@/stores/appStore'

const audioStore = useAudioStore()

const volume = ref(50)

onMounted(() => {
    volume.value = audioStore.volume
})

const saveSettings = () => {
    audioStore.setVolume(volume.value)
}
</script>

<template>
    <div class="modal fade" id="soundSettingsModal" tabindex="-1" aria-labelledby="soundSettingsModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="soundSettingsModalLabel">Sound Settings</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="volumeRange" class="form-label">Volume: {{ volume }}%</label>
                        <input 
                            type="range" 
                            class="form-range" 
                            id="volumeRange" 
                            min="0" 
                            max="100" 
                            v-model="volume"
                        >
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" @click="saveSettings" data-bs-dismiss="modal">Save Settings</button>
                </div>
            </div>
        </div>
    </div>
</template>