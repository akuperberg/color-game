import { ref, type Ref } from 'vue'
import { FrameColor } from '../enums/enums'
import { correctFrameColor } from '../consts/consts'

class FrameColorService {
    private static instance: FrameColorService
    private _selectedFrameColor: Ref<FrameColor | null> = ref(null)
    private _correctFrameColor: Ref<FrameColor> = ref(correctFrameColor)

    private constructor() {}

    public static getInstance(): FrameColorService {
        if (!FrameColorService.instance) {
            FrameColorService.instance = new FrameColorService()
        }
        return FrameColorService.instance
    }

    // Getters
    public get selectedFrameColor(): Ref<FrameColor | null> {
        return this._selectedFrameColor
    }

    public get correctFrameColor(): Ref<FrameColor> {
        return this._correctFrameColor
    }

    public get allFrameColors(): FrameColor[] {
        return Object.values(FrameColor)
    }

    // Actions
    public setSelectedFrameColor(color: FrameColor | null): void {
        this._selectedFrameColor.value = color
    }

    public resetSelectedFrameColor(): void {
        this._selectedFrameColor.value = null
    }

    public setCorrectFrameColor(color: FrameColor): void {
        this._correctFrameColor.value = color
    }

    public isCorrectFrameSelected(): boolean {
        return this._selectedFrameColor.value === this._correctFrameColor.value
    }

    public getFrameColorString(color: FrameColor): string {
        return color
    }
}

// Export singleton instance
export const frameColorService = FrameColorService.getInstance()

// Export the class for testing purposes
export { FrameColorService }
