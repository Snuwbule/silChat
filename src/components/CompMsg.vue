<script setup>
    defineProps(['pfpImg','Time','roleColor','Name','message']);
</script>

<template>
    <div>
        <div class="flex flex-row m-2 rounded-xl bg-stone-800">
            <div class="m-1 w-10 h-auto flex-shrink-0">
                <img class="rounded-full object-cover" :src="pfpImg">
                <div class="flex justify-center items-center">
                    <p class="text-zinc-950 my-1 text-xs">{{ Time }}</p>
                </div>
            </div>
            <div>
                <p class="font-semibold text-white mx-2" style="color: {{ roleColor }};">{{ Name }}</p>
                <p class="text-white mx-2">{{ message }}</p>
            </div>
        </div>
    </div>
</template>