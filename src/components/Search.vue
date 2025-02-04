<template>
    <section>
        <div class="my-[50px]">
            <label class="input input-bordered flex items-center gap-2 shadow-[1px_1px_2px_1px_rgba(0,0,0,0.25)] rounded-[10px] w-[400px] max-w-[400px] m-auto p-[10px_40px]" onclick="searchModal.showModal()">
                <font-awesome-icon class="-text--ge-icon-gray" :icon="['fas', 'magnifying-glass']" />
                <input type="text" class="grow" placeholder="Search User or Repository" />
                <kbd class="kbd kbd-sm">⌘</kbd>
                <kbd class="kbd kbd-sm">K</kbd>
            </label>
        </div>

        <!-- Search Modal -->
        <dialog id="searchModal" class="modal">
            <div class="modal-box">
                <div class="flex items-center gap-x-[20px]">
                    <label class="input input-bordered flex items-center gap-2 w-full">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            class="h-7 w-7 opacity-70">
                            <path
                            fill-rule="evenodd"
                            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                            clip-rule="evenodd" />
                        </svg>
                        <input type="text" class="grow" placeholder="Search User or Repository" />
                    </label>
                    <p class="ml-auto text-[0.8rem]">ESC</p>
                </div>
                <h2 class="py-4 text-[1.3rem] font-bold">User</h2>
                <div class="flex items-center -bg--ge-blue p-[10px_15px] rounded-[10px] gap-x-[10px]">
                    <span class="-bg--ge-white p-[5px_15px] rounded-[20px]">Top</span><p class="-text--ge-white">Top User Search</p>
                    <font-awesome-icon class="ml-auto -text--ge-white text-[1.5rem]" :icon="['fas', 'star']" />
                </div>
                <UserData />
                <h2 class="text-[1.3rem] font-bold">Repositories</h2>
                <RepositoryData />
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    </section>
</template>
<script setup>
    import UserData from '@/components/data/UserData.vue';
    import RepositoryData from '@/components/data/RepositoryData.vue';
</script>
