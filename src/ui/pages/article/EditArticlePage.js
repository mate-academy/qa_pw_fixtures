import { expect, test } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;

    this.titleField = page.getByPlaceholder('Article Title');

    this.descriptionField = page.getByPlaceholder(
      "What's this article about?",
    );

    this.textField = page.getByPlaceholder(
      'Write your article (in markdown)',
    );

    this.tagField = page.getByPlaceholder('Enter tags');

    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });

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

  async fillTagField(tag) {
    await test.step(`Fill the 'Tag' field`, async () => {
      await this.tagField.fill(tag);
      await this.tagField.press('Enter');
    });
  }

  async clearTitleField() {
    await test.step(`Clear the 'Title' field`, async () => {
      await this.titleField.fill('');
    });
  }

  async clearDescriptionField() {
    await test.step(`Clear the 'Description' field`, async () => {
      await this.descriptionField.fill('');
    });
  }

  async clearTextField() {
    await test.step(`Clear the 'Text' field`, async () => {
      await this.textField.fill('');
    });
  }

  async assertTitleFieldContainsText(title) {
    await test.step(`Assert the Title field contains '${title}'`, async () => {
      await expect(this.titleField).toHaveValue(title);
    });
  }

  async assertDescriptionFieldContainsText(description) {
    await test.step(
      `Assert the Description field contains '${description}'`,
      async () => {
        await expect(this.descriptionField).toHaveValue(description);
      },
    );
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await expect(this.updateArticleButton).toBeVisible();
      await expect(this.updateArticleButton).toBeEnabled();

      await this.updateArticleButton.click();

      await this.page.waitForURL(/\/article\//);
    });
  }

  async clickUpdateArticleButtonWithoutNavigation() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await expect(this.updateArticleButton).toBeVisible();
      await expect(this.updateArticleButton).toBeEnabled();

      await this.updateArticleButton.click();
    });
  }
}
