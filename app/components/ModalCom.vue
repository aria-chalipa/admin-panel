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
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
                @click.self="close"
            >
                <div class="w-full max-w-md rounded-lg border border-gray-700 bg-gray-900 shadow-lg">
                    <div class="flex items-center justify-between border-b border-gray-700 px-6 py-4">
                        <div class="text-lg font-semibold ">
                            <slot name="title">Title</slot>
                        </div>
                        <button
                            type="button"
                            class="text-gray-400 transition-colors hover:text-yellow-400"
                            @click="close"
                        >
                            &#10005;
                        </button>
                    </div>

                    <div class="px-6 py-4 text-gray-100">
                        <slot name="body">Body content goes here.</slot>
                    </div>

                    <div class="flex justify-end gap-3 border-t border-gray-700 px-6 py-4">
                        <slot name="footer">
                            <button
                                type="button"
                                class="rounded-md border border-gray-700 px-4 py-2 text-gray-300 transition-colors hover:bg-gray-800"
                                @click="close"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                class="rounded-md bg-yellow-400 px-4 py-2 font-medium text-black transition-colors hover:bg-yellow-300"
                                @click="close"
                            >
                                Confirm
                            </button>
                        </slot>
                    </div>
                </div>
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
</style>