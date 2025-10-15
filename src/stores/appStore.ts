import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAudioStore = defineStore('audio', () => {
  const volume = ref(50)

  const volumeAsDecimal = computed(() => volume.value / 100)

  const setVolume = (newVolume: number) => {
    volume.value = Math.max(0, Math.min(100, newVolume))
    saveToLocalStorage()
  }

  const saveToLocalStorage = () => {
    const settings = {
      volume: volume.value
    }
    
    localStorage.setItem('audioSettings', JSON.stringify(settings))
  }

  const loadFromLocalStorage = () => {
    try {
      const saved = localStorage.getItem('audioSettings')
      if (saved) {
        const settings = JSON.parse(saved)
        volume.value = settings.volume ?? 50
      }
    } catch (error) {
      console.warn('Failed to load audio settings from localStorage:', error)
    }
  }

  loadFromLocalStorage()

  return {
    volume,
    volumeAsDecimal,
    setVolume,
    saveToLocalStorage,
    loadFromLocalStorage
  }
})
