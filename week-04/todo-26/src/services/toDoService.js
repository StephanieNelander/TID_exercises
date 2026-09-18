import Parse from "parse";

const ToDoItem = Parse.Object.extend("ToDoItem");

// Converts a Parse object to a plain JS object
function toPlainObject(parseObject) {
    return {
        id: parseObject.id,
        text: parseObject.get("text"),
        done: parseObject.get("done"),
    }
}

// Fetches all tasks for a given userId, sorted by creation date
export async function fetchToDos(userId) {
    const query = new Parse.Query(ToDoItem);
    query.equalTo("userId", userId);
    query.ascending("createdAt");
    const results = await query.find();
    return results.map(toPlainObject);
}

// Creates a new task for a given userId
export async function createToDo(text, userId) {
    const item = new ToDoItem();
    item.set("text", text);
    item.set("done", false);
    item.set("userId", userId);
    return toPlainObject(await item.save());
}

// Updates the "done" status of a task with a given id
export async function setToDoDone(id, done) {
    const item = ToDoItem.createWithoutData(id);
    item.set("done", done);
    return toPlainObject(await item.save());
}

// Deletes a task with a given id
export async function deleteToDo(id) {
    const item = ToDoItem.createWithoutData(id);
    await item.destroy();
}