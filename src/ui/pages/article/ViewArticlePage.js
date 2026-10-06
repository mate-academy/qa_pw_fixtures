import { expect, test } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitleHeader = page.locator('h1');

    this.articleDescription = page.locator('.article-page p').first();

    this.articleTags = page.locator('.tag-list .tag-default');

    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();

    this.deleteArticleButton = page
      .getByRole('button', { name: 'Delete Article' })
      .first();
  }

  async clickEditArticleButton() {
    await test.step(`Click Edit Article`, async () => {
      await this.editArticleButton.click();
    });
  }

  async clickDeleteArticleButton() {
    await test.step(`Click Delete Article`, async () => {
      await this.deleteArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(`Assert article title`, async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step(`Assert article description`, async () => {
      await expect(this.articleDescription).toContainText(description);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step(`Assert article text`, async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }

  async assertArticleTagsContainText(tag) {
    await test.step(`Assert article tag`, async () => {
      await expect(
        this.articleTags.filter({ hasText: tag }),
      ).toHaveCount(1);
    });
  }
}
