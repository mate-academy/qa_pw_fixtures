import { expect, test } from '@playwright/test';

/**
 * @typedef {import('@playwright/test').Page} Page
 * @typedef {import('@playwright/test').Locator} Locator
 */
export class ViewArticlePage {
  /**
   * @param {Page} page
   */
  constructor(page) {
    /** @type {Page} */
    this.page = page;

    /** @type {Locator} */
    this.articleTitleHeader = page.getByRole('heading');
  }

  async assertArticleTitleIsVisible(title) {
    await test.step(
      `Assert the article has correct title`,
      async () => {
        await expect(this.articleTitleHeader).toContainText(title);
      }
    );
  }

  async assertArticleTextIsVisible(text) {
    await test.step(
      `Assert the article has correct text`,
      async () => {
        await expect(this.page.getByText(text)).toBeVisible();
      }
    );
  }
}
