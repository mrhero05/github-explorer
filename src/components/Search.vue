<template>
    <section>
        <div class="my-[50px]">
            <label class="input input-bordered flex items-center gap-2 shadow-[1px_1px_2px_1px_rgba(0,0,0,0.25)] rounded-[10px] w-fit m-auto p-[10px_40px]" onclick="searchModal.showModal()">
                <font-awesome-icon class="-text--ge-icon-gray" :icon="['fas', 'magnifying-glass']" />
                <input type="text" class="grow" placeholder="Search User or Repository" />
                <kbd class="kbd kbd-sm">⌘</kbd>
                <kbd class="kbd kbd-sm">K</kbd>
            </label>
        </div>

        <!-- Search Modal -->
        <dialog id="searchModal" class="modal">
            <div class="modal-box">
                <h3 class="text-lg font-bold">Hello!</h3>
                <p class="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </section>
</template>

<script setup>

</script>
