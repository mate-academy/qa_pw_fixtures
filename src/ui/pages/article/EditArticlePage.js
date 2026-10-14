import { test, expect } from '@playwright/test';
import { CreateArticlePage } from './CreateArticlePage';

export class EditArticlePage extends CreateArticlePage {
  constructor(page) {
    super(page);
    this.updateArticleButton = page.getByRole('button', 
      { name: 'Update Article' });
    this.errorMessage = page.getByRole('list').nth(1);
  }

  async removeTag(tag) {
    await test.step(`Remove the '${tag}' tag`, async () => {
      const tagItem = this.page.locator('.tag-default', { hasText: tag });
      await tagItem.locator('i').click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async clickYourProfileImage() {
    await test.step(`Click the 'Your profile image' button`, async () => {
      await this.page.getByRole('link', 
        { name: /your profile image/i }).click();
      await this.page.waitForURL(/\/profile\//);
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
