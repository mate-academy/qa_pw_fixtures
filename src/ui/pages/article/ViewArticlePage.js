import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading', { level: 1 });
    this.articleBodyText = page.locator('.article-content');
    this.articleTags = page.locator('.tag-list .tag-default, .tag-list li');
    this.editArticleButton = page.getByRole('link', { name: 'Edit Article' }).first();
  }

   async assertArticleTitleIsVisible(title) {
    await test.step(`Assert the article has correct title`, async () => {
      await expect(this.articleTitleHeader).toBeVisible(title.trim());
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert the article has correct text'`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
  async clickEditArticleButton() {
  await test.step("Click 'Update Article' button", async () => {
      await this.editArticleButton.click()
  });
}

  async assertArticleHasTag(tagName) {
    await test.step(`Assert article has tag "${tagName}"`, async () => {
      await expect(this.articleTags.filter({ hasText: new RegExp(`^${tagName}$`, 'i') })).toBeVisible();
    });
  }

  async assertArticleDoesNotHaveTag(tagName) {
    await test.step(`Assert article does not have tag "${tagName}"`, async () => {
      await expect(this.articleTags.filter({ hasText: tagName })).toHaveCount(0);
    });
  }
}
