import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.articleDescription = page.locator('p').first();
    this.editArticleLink = page.getByRole('link', { name: ' Edit Article' }).first();
    this.updateArticleButton = page.getByRole('button', { name: 'Update Article' });
    this.deleteArticleButton = page.getByRole('button', { name: ' Delete Article' }).first();
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title'`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async clickEditArticleLink() {
    await test.step(`Click Edit Article link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async assertArticleDescriptionIsNotVisible(description) {
    await test.step(`Assert the article description is not visible`, async () => {
      await expect(this.page.getByText(description)).not.toBeVisible();
    });
  }

  async assertArticleTextIsNotVisible(text) {
    await test.step(`Assert the article text is not visible`, async () => {
      await expect(this.page.getByText(text)).not.toBeVisible();
    });
  }
}
