<script setup>
defineProps({
    modelValue: {
        type: Boolean,
        default: false
    }
})

const emit = defineEmits(['update:modelValue', 'close'])

function close() {
    emit('update:modelValue', false)
    emit('close')
}
</script>

<template>
    <Teleport to="body">
        <Transition name="fade">
            <div
                v-if="modelValue"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm"
                @click.self="close"
            >
                <Transition name="scale">
                    <div v-if="modelValue" class="w-full max-w-md rounded-2xl border border-white/10 bg-gray-900/95 shadow-2xl shadow-black/40 backdrop-blur-xl">
                        <div class="flex items-center justify-between border-b border-white/10 px-6 py-4">
                            <div class="text-lg font-semibold text-white">
                                <slot name="title">Title</slot>
                            </div>
                            <button
                                type="button"
                                aria-label="Close"
                                title="Close"
                                class="rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-800/60 hover:text-yellow-400"
                                @click="close"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4">
                                    <path d="M18 6 6 18M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div class="px-6 py-5 text-gray-100">
                            <slot name="body">Body content goes here.</slot>
                        </div>

                        <div class="flex justify-end gap-3 rounded-b-2xl border-t border-white/10 bg-gray-900/40 px-6 py-4">
                            <slot name="footer">
                                <button
                                    type="button"
                                    class="rounded-lg border border-white/10 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800"
                                    @click="close"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    class="rounded-lg bg-yellow-400 px-4 py-2 font-medium text-black transition-colors hover:bg-yellow-300"
                                    @click="close"
                                >
                                    Confirm
                                </button>
                            </slot>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
.scale-enter-active,
.scale-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
}
.scale-enter-from,
.scale-leave-to {
    opacity: 0;
    transform: scale(0.95) translateY(8px);
}
</style>