const tasks = {
    tasks: [
        {
            text: 'Grocery shopping',
            completed: true,
        },
        {
            text: 'Clean yard',
            completed: false,
        },
        {
            text: 'Film course',
            completed: false
        }
    ],
    getTasksToDo() {
        const todo = this.tasks.filter(task => !task.completed);
        todo.forEach(task => console.log(`${task.text}\n`));
    }
}

debugger
tasks.getTasksToDo();