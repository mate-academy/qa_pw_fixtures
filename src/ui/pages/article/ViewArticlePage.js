
import { test, expect } from '@playwright/test';

export class ViewArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitleHeader = page.getByRole('heading').first();
    this.articleTags = page.locator('.tag-list');

    this.editArticleButton = page
      .getByRole('link', { name: 'Edit Article' })
      .first();
  }

  async clickEditArticleButton() {
    await test.step('Click Edit Article', async () => {
      await this.editArticleButton.click();
    });
  }

  async assertArticleTitleIsVisible(title) {
    await test.step('Assert the article has correct title', async () => {
      await expect(this.articleTitleHeader).toHaveText(title, {
        timeout: 10000,
      });
    });
  }

  async assertArticleDescriptionIsVisible(description) {
    await test.step('Verify the saved article description', async () => {
      const currentUrl = new URL(this.page.url());
      const slug = currentUrl.pathname.split('/').filter(Boolean).pop();

      if (!slug || !currentUrl.pathname.includes('/article/')) {
        throw new Error(
          `Cannot determine article slug from URL: ${this.page.url()}`,
        );
      }

      const response = await this.page.request.get(
        `${currentUrl.origin}/api/articles/${slug}`,
      );

      expect(
        response.status(),
        'Article API request should succeed',
      ).toBe(200);

      const result = await response.json();

      expect(result.article.description).toBe(description);
    });
  }

  async assertArticleTextIsVisible(text) {
    await test.step('Assert the article has correct text', async () => {
      await expect(
        this.page.getByText(text, { exact: true }),
      ).toBeVisible();
    });
  }

  async assertArticleTagIsVisible(tag) {
    await test.step(`Assert the "${tag}" tag is visible`, async () => {
      await expect(
        this.articleTags.getByText(tag, { exact: true }),
      ).toBeVisible();
    });
  }

  async assertArticleTagIsNotVisible(tag) {
    await test.step(`Assert the "${tag}" tag is not visible`, async () => {
      await expect(
        this.articleTags.getByText(tag, { exact: true }),
      ).toHaveCount(0);
    });
  }
}
