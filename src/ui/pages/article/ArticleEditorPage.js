import { expect, test } from '@playwright/test';

export class ArticleEditorPage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');
    this.errorMessage = page.getByRole('list').nth(1);
  }

  getTag(tag) {
    return this.page.locator('span').filter({ hasText: tag });
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

  async fillTagsField(tags = []) {
    await test.step(`Fill the 'Tags' field`, async () => {
      for (const tag of tags) {
        await this.putOneTagIntoTagsField(tag);
      }
    });
  }

  async putOneTagIntoTagsField(tag) {
    await test.step(`Fill the 'Tags' field`, async () => {
      await this.tagsField.fill(tag);
      await this.pressEnter();
    });
  }

  async pressEnter() {
    await test.step(`Press 'Enter'`, async () => {
      await this.page.keyboard.press('Enter');
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async clickTagDeleteButton(tag) {
    await test.step(
      `Click the 'Delete' button for the tag '${tag}'`,
      async () => {
        await this.getTag(tag).locator('i').click();
      },
    );
  }
}
