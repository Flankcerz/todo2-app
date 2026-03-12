class Task {
    constructor({ id, title, description, priority, dueDate, tags = [] }) {
        this.id = id || Date.now().toString() + Math.random().toString(36).substr(2, 5);
        this.title = title;
        this.description = description;
        this.status = 'pending';
        this.priority = priority; 
        this.dueDate = new Date(dueDate);
        this.tags = new Set(tags);
    }

    markComplete() { this.status = 'completed'; }
    markIncomplete() { this.status = 'pending'; }
    
    addTag(tag) { this.tags.add(tag); }
    removeTag(tag) { this.tags.delete(tag); }

    get isOverdue() {
        return this.status !== 'completed' && new Date() > this.dueDate;
    }
}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    createTask(data) {
        const newTask = new Task(data);
        this.tasks.push(newTask);
        return newTask;
    }

    updateTask(id, data) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, data);
            if (data.dueDate) task.dueDate = new Date(data.dueDate);
        }
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
    }

    getTasksByStatus(status) {
        return this.tasks.filter(t => t.status === status);
    }

    getOverdueTasks() {
        return this.tasks.filter(t => t.isOverdue);
    }

    searchTasks(query) {
        const q = query.toLowerCase();
        return this.tasks.filter(t => 
            t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q)
        );
    }

    getStats() {
        return {
            total: this.tasks.length,
            completed: this.getTasksByStatus('completed').length,
            pending: this.getTasksByStatus('pending').length,
            overdue: this.getOverdueTasks().length
        };
    }

    getCompletionRate() {
        if (this.tasks.length === 0) return 0;
        return (this.getTasksByStatus('completed').length / this.tasks.length) * 100;
    }

    getTasksByDueDate() {
        return this.tasks.reduce((acc, task) => {
            const date = task.dueDate.toISOString().split('T')[0];
            if (!acc[date]) acc[date] = [];
            acc[date].push(task);
            return acc;
        }, {});
    }
}

const manager = new TaskManager();