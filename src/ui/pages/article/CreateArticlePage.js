
import { expect, test } from '@playwright/test';

export class CreateArticlePage {
  constructor(page) {
    this.page = page;

    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder("What's this article about?");
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagsField = page.getByPlaceholder('Enter tags');

    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });

    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });

    this.errorMessage = page.getByRole('list').nth(1);
  }

  async fillTitleField(title) {
    await test.step('Fill the Title field', async () => {
      await this.titleField.fill(title);
    });
  }

  async fillDescriptionField(description) {
    await test.step('Fill the Description field', async () => {
      await this.descriptionField.fill(description);
    });
  }

  async fillTextField(text) {
    await test.step('Fill the Text field', async () => {
      await this.textField.fill(text);
    });
  }

  async fillTagsField(tag) {
    await test.step('Add an article tag', async () => {
      await this.tagsField.fill(tag);
      await this.tagsField.press('Enter');
    });
  }

  async removeTag(tag) {
    await test.step(`Remove the ${tag} tag`, async () => {
      const tagElement = this.page
        .locator('.tag-list .tag-default')
        .filter({ hasText: tag });

      await expect(tagElement).toBeVisible();
      await tagElement.locator('.ion-close-round').click();
      await expect(tagElement).toHaveCount(0);
    });
  }

  async clearTitleField() {
    await test.step('Clear the Title field', async () => {
      await this.titleField.clear();
    });
  }

  async clearDescriptionField() {
    await test.step('Clear the Description field', async () => {
      await this.descriptionField.clear();
    });
  }

  async clearTextField() {
    await test.step('Clear the Text field', async () => {
      await this.textField.clear();
    });
  }

  isEditMode() {
    const pathname = new URL(this.page.url()).pathname.replace(/\/+$/, '');
    return /^\/editor\/[^/]+$/.test(pathname);
  }

  async clickPublishArticleButton() {
    await test.step('Submit the article form', async () => {
      if (this.isEditMode()) {
        await this.updateArticleButton.waitFor({
          state: 'visible',
          timeout: 10000,
        });

        const responsePromise = this.page.waitForResponse(
          (response) => {
            const method = response.request().method();

            return (
              response.url().includes('/api/articles/') &&
              ['PUT', 'PATCH', 'POST'].includes(method)
            );
          },
          { timeout: 10000 },
        );

        await this.updateArticleButton.click();

        const response = await responsePromise;

        if (!response.ok()) {
          throw new Error(
            `Article update failed with HTTP status ${response.status()}`,
          );
        }

        await this.page.waitForURL('**/article/**', {
          timeout: 10000,
        });

        await this.page.reload({
          waitUntil: 'domcontentloaded',
        });
      } else {
        await this.publishArticleButton.waitFor({
          state: 'visible',
          timeout: 10000,
        });

        await this.publishArticleButton.click();
      }
    });
  }

  async clickPublishArticleButtonForValidation() {
    await test.step('Submit the article form for validation', async () => {
      if (this.isEditMode()) {
        await this.updateArticleButton.waitFor({
          state: 'visible',
          timeout: 10000,
        });

        await this.updateArticleButton.click();
      } else {
        await this.publishArticleButton.waitFor({
          state: 'visible',
          timeout: 10000,
        });

        await this.publishArticleButton.click();
      }
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the "${messageText}" error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
