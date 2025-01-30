// @ts-check
import { expect, test } from "@playwright/test";

function escapeCssSelector(value) {
  return value.replace(/([#.;,:+~*'"!^$[\]()=>|/@])/g, "\\$1");
}

test.afterEach(async ({ page }) => {
  await page.goto("http://localhost:3001/");
  const div = page.locator("div#allTasks");
  const spans = div.locator("span");
  const spanCount = await spans.count();
  for (let i = 0; i < spanCount; i++) {
    const span = spans.nth(i);
    const taskId = (await span.getAttribute("id")) || "";
    const escapedTaskId = escapeCssSelector(taskId);
    const deleteButton = await page.locator(
      `button[id="deleteButton${escapedTaskId}"]`
    );
    await deleteButton.click();
  }
});

test("has welcome title", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  const h1 = await page.locator("h1");

  await expect(h1).toHaveText("Welcome to the TODO list");
});

test("Create a task", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  const newTaskTitle = "Buy milk";

  const input = await page.locator("input#taskTextInput");
  const addButton = await page.locator("button#addButton");

  await input.fill(newTaskTitle);
  await addButton.click();

  const div = page.locator("div#allTasks");
  const span = div.locator(`span:has-text("${newTaskTitle}")`);

  expect(span).toHaveCount(1);
  const taskId = (await span.getAttribute("id")) || "";
  await expect(input).toHaveText("");

  const escapedTaskId = escapeCssSelector(taskId);
  const deleteButton = await page.locator(
    `button[id="deleteButton${escapedTaskId}"]`
  );
  await deleteButton.click();
});

test("Check a task", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  const newTaskTitle = "Buy Sugar";

  const input = await page.locator("input#taskTextInput");
  const addButton = await page.locator("button#addButton");

  await input.fill(newTaskTitle);
  await addButton.click();

  const div = page.locator("div#allTasks");
  const span = div.locator(`span:has-text("${newTaskTitle}")`);

  expect(span).toHaveCount(1);
  const taskId = (await span.getAttribute("id")) || "";
  const escapedTaskId = escapeCssSelector(taskId);
  const checkbox = await page.locator(
    `input[id="taskCheckbox${escapedTaskId}"]`
  );
  await checkbox.check();

  // check if the task is checked
  const checked = await checkbox.isChecked();
  expect(checked).toBe(true);

  const deleteButton = await page.locator(
    `button[id="deleteButton${escapedTaskId}"]`
  );
  await deleteButton.click();
});

test("Delete a task", async ({ page }) => {
  await page.goto("http://localhost:3001/");

  const newTaskTitle = "Buy Coca-Cola";

  const input = await page.locator("input#taskTextInput");
  const addButton = await page.locator("button#addButton");

  await input.fill(newTaskTitle);
  await addButton.click();

  const div = page.locator("div#allTasks");
  const span = div.locator(`span:has-text("${newTaskTitle}")`);

  expect(span).toHaveCount(1);
  const taskId = (await span.getAttribute("id")) || "";
  const escapedTaskId = escapeCssSelector(taskId);
  const deleteButton = await page.locator(
    `button[id="deleteButton${escapedTaskId}"]`
  );
  await deleteButton.click();

  await expect(page.locator(`span:has-text("${newTaskTitle}")`)).toHaveCount(0);
});
