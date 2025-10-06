import { expect, test } from '@playwright/test';

/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').Locator} Locator
 */

/**
 * Page Object for editing an article.
 */
export class EditArticlePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    this.page = page;
    this.articleTitleHeader = page.getByRole('heading');
  }

  async assertArticleTitle(title) {
    await test.step('Assert the article has correct title', async () => {
      await expect(this.articleTitleHeader).toContainText(title);
    });
  }

  async assertArticleText(text) {
    await test.step('Assert the article has correct text', async () => {
      await expect(this.page.getByText(text)).toBeVisible();
    });
  }
}
