import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
    this.editArticleLink = page.getByRole('link', { name: 'Edit Article' }).first();
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
    await test.step(`Click the 'Edit Article' link`, async () => {
      await this.editArticleLink.click();
    });
  }

  async assertTagIsVisible(tagText) {
    await test.step(`Assert the tag '${tagText}' is visible`, async () => {
      await expect(this.page.locator('.tag-default', { hasText: tagText })).toBeVisible();
    });
  }

  async assertTagIsNotVisible(tagText) {
    await test.step(`Assert the tag '${tagText}' is not visible`, async () => {
      await expect(this.page.locator('.tag-default', { hasText: tagText })).not.toBeVisible();
    });
  }
}
