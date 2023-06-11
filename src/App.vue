<template>
<main>
    <!-- header -->
    <header>
        <img src="./assets/pinia-logo.svg" alt="pinia logo">
        <h1>Pinia Tasks</h1>
    </header>

    <!-- task list -->
    <div class="task-list">
        <div v-for="task in taskStore.tasks">
            <!-- <p>{{ task.title }}</p> -->
            <TaskDetails :task="task" />
        </div>
    </div>

</main>
</template>

<script>
import { useTaskStore } from './stores/TaskStore';
import TaskDetails from './stores/TaskDetails.vue';

export default {
    components: {
        TaskDetails
    },

    setup() {
        const taskStore = useTaskStore()
        return {
            taskStore
        }
    }

}
</script>
