<script setup>
    import axios from 'axios';
    import moment from 'moment';
    import LoadMoreBtn from '@/components/data/LoadMoreBtn.vue';
    import { defineProps, onMounted, ref, watch } from 'vue';

    const props = defineProps({
        username: String
    });

    const events = ref([]);
    const eventItemToShow = ref(4);

    const fetch = async (username) => {
        try {
            const [getUserEvents] = await Promise.all([
                // fetch user events
                axios.get(`https://api.github.com/users/${username}/events`),
            ]);

            // Format the created_at dates using moment.js
            events.value = getUserEvents.data.map(event => {
                return {
                    ...event,
                    formatted_date: moment(event.created_at).format('MMMM D, YYYY')
                };
            });

            // Reset the loadmore count
            eventItemToShow.value = 4;

        } catch (error) {
            console.log(error);
        }
    }

    watch( () => props.username, (newUsername) => {
        if(newUsername){
            fetch(newUsername);
        }
    });

    const eventsLoadMore = () =>{
        eventItemToShow.value += 4;
    }

    onMounted(() => {
        fetch(props.username);
    })
</script>

<template>
    <div class="flex items-center gap-x-[10px] mb-4">
        <font-awesome-icon class="text-[1.5rem]" :icon="['fas', 'code-commit']" />
        <p class="text-[1.5rem]">Contribution Activity</p>
    </div>
    <div v-if="!events.length == 0" v-for="event in events.slice(0, eventItemToShow)">
        <div v-if="event.type === 'PushEvent'">
            <div class="flex w-full flex-col">
                <div class="divider divider-start">{{ event.formatted_date }}</div>
            </div>
            <div class="flex w-full gap-x-[20px]">
                <div class="divider divider-horizontal"><font-awesome-icon :icon="['fas', 'code-pull-request']" /></div>
                <div v-for="commit in event.payload.commits" class="flex flex-col">
                    <p>Author: {{ event.actor.display_login }}</p>
                    <p>Commit message: <span class="font-bold">{{ commit.message }}</span></p>
                    <p>Repository: <a :href="`https://github.com/${event.repo.name}`" target="_blank" class="-text--ge-light-blue hover:underline">{{ event.repo.name }}</a></p>
                    <p>Branch: <span>{{ event.payload.ref }}</span></p>
                </div>
            </div>
        </div>
    </div>
    <div v-else>
        <p>No Recent Activity</p>
    </div>
    <LoadMoreBtn :data="events" :item-to-show="eventItemToShow" @click="eventsLoadMore" />
</template>
