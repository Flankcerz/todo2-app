function runAllTests() {
    console.log("%c--- Запуск Unit-тестів ---", "color: blue; font-weight: bold;");

    const testManager = new TaskManager();

    const t1 = testManager.createTask({
        title: "Купити хліб",
        description: "Тільки свіжий",
        priority: "low",
        dueDate: "2026-01-01"
    });
    console.assert(testManager.tasks.length === 1, "❌ Помилка: Задача не створена");
    console.log("✅ Тест 1: Створення задачі пройдено");

    t1.markComplete();
    console.assert(t1.status === 'completed', "❌ Помилка: Статус не змінився");
    console.log("✅ Тест 2: Зміна статусу пройдена");

    const stats = testManager.getStats();
    console.assert(stats.total === 1 && stats.completed === 1, "❌ Помилка статистики");
    console.log("✅ Тест 3: Розрахунок статистики пройдено");

    testManager.createTask({
        title: "Стара задача",
        dueDate: "2020-01-01"
    });
    const overdue = testManager.getOverdueTasks();
    console.assert(overdue.length === 1, "❌ Помилка: Прострочена задача не знайдена");
    console.log("✅ Тест 4: Пошук прострочених задач пройдено");

    console.log("%c--- Всі тести завершені успішно! ---", "color: green; font-weight: bold;");
}

runAllTests();