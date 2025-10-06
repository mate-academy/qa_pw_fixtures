import { expect, test } from '@playwright/test';

/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').Locator} Locator
 */
export class CreateArticlePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    /** @type {Page} */
    this.page = page;

    /** @type {Locator} */
    this.titleField = page.getByPlaceholder('Article Title');

    /** @type {Locator} */
    this.descriptionField = page.getByPlaceholder(
      `What's this article about?`
    );

    /** @type {Locator} */
    this.textField = page.getByPlaceholder(
      'Write your article (in markdown)'
    );

    /** @type {Locator} */
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });

    /** @type {Locator} */
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(
      `Assert the '${messageText}' error is shown`,
      async () => {
        await expect(this.errorMessage).toContainText(messageText);
      }
    );
  }
}
