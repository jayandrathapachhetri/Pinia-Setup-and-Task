import { defineStore } from 'pinia'

export const useTaskStore = defineStore('taskStore', {
  state: () => ({
    tasks: [],
    Loading : false
  }),
  getters:{
    favs(){
        return this.tasks.filter(t => t.isFav)
    },
    favCount(){
      return this.tasks.reduce((p, c) =>{
        // p=present value & c=current value
        return c.isFav ? p + 1 : p
      }, 0)
    },
    totalCount: (state) => {
      return state.tasks.length
    }
  },
  actions: {
    async getTasks(){
      this.loading = true
      
       // get data from json file using json server
      const res = await fetch('http://localhost:3000/task')
      const data = await res.json()


      //Update the task
      this.tasks = data
      this.loading = false
    },

    async addTask(task) {
      this.tasks.push(task)

      const res = await fetch('http://localhost:3000/task', {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {'Content-Type': 'application/json'}
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    async deleteTask(id) {
      this.tasks = this.tasks.filter(t => {
        return t.id !== id
      })

      const res = await fetch('http://localhost:3000/task/' + id, {
        method: 'DELETE',
      })

      if (res.error) {
        console.log(res.error)
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find(t => t.id === id)
      task.isFav = !task.isFav

      const res = await fetch('http: //localhost:3000/task/' + id, {
        method: 'PATCH',
        body: JSON.stringify({ isFav: task.isFav }),
        headers: {'Content-Type': 'application/json'}
      })

      if (res.error) {
        console.log(res.error)
      }
    }

  }
})



