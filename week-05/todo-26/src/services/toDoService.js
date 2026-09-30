import Parse from "parse";

const ToDoItem = Parse.Object.extend("ToDoItem");
const ItemList = Parse.Object.extend("ItemList");

// Converts a Parse object to a plain JS object.
// Pointers need to fetch their related class before they can proceed.
function toPlainObject(parseObject) {
  const owner = parseObject.get("owner");
  const list = parseObject.get("list");
  return {
    id: parseObject.id,
    text: parseObject.get("text"),
    done: parseObject.get("done"),
    owner: owner ? owner.id : null,
    list: list ? list.id : null,
  };
}

// Creates a new list for the current user
export async function createList(title) {
  const currentUser = Parse.User.current();

  const list = new ItemList();

  list.set("listName", title);
  list.set("owner", currentUser);

  list.setACL(new Parse.ACL(currentUser))

  const savedList = await list.save();

  return {
    id: savedList.id,
    name: savedList.get("listName"),
  };
}

// Fetch all lists for the current user
// and return them as an array of JS objects
export async function fetchLists() {
  const query = new Parse.Query(ItemList);
  const results = await query.find();

  return results.map((list) => ({
    id: list.id,
    name: list.get("listName"),
  }));
}

export async function shareList(listId, username) {
  const listQuery = new Parse.Query(ItemList);
  const list = await listQuery.get(listId);

  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo("username", username);

  const user = await userQuery.first();
  
  if(!user) {
    throw new Error("User not found");
  }

  const acl = list.getACL();

  acl.setReadAccess(user, true);
  acl.setWriteAccess(user, true);

  list.setACL(acl);

  await list.save();
}

// Fetches all tasks for the current logged in user which aren't done, sorted by creation date
// and returns them in an array of plain JS objects
export async function fetchToDos(list) {
  const query = new Parse.Query(ToDoItem);
  const listPointer = ItemList.createWithoutData(list.id);
  // query.equalTo("owner", Parse.User.current());
  query.equalTo("list", listPointer);
  query.equalTo("done", false);
  query.ascending("createdAt");

  const results = await query.find();
  return results.map(toPlainObject);
}

// Creates a new task for the current user
export async function createToDo(text, list) {
  const listObject = await new Parse.Query(ItemList).get(list.id);
  const item = new ToDoItem();

  item.set("text", text);
  item.set("done", false);
  item.set("list", listObject);

  const acl = listObject.getACL();
  item.setACL(acl);
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
