import { test, expect } from '@playwright/test';

export class EditArticlePage {
  constructor(page) {
    this.page = page;

    this.articleTitleHeader = page.getByRole('heading');

    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();

    this.titleField = page.getByPlaceholder('Article Title');

    this.descriptionField = page.getByPlaceholder(`What's this article about?`);

    this.textField = page.getByPlaceholder('Write your article (in markdown)');

    this.tagField = page.getByPlaceholder('Enter tags');

    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
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

  async clickEditArticle() {
    await test.step('Click Edit Article Button', async () => {
      await this.editArticleButton.click();
    });
  }

  async editingArticleTitle() {
    await test.step('Editing the article title', async () => {
      await this.titleField.fill('New Article Title');

      await expect(this.updateArticleButton).toBeEnabled();

      await this.updateArticleButton.click();
    });
  }

  async editingDescriptionArticle() {
    await test.step('Editing the article description', async () => {
      await this.descriptionField.fill('New Description');

      await expect(this.updateArticleButton).toBeEnabled();

      await this.updateArticleButton.click();
    });
  }

  async editingTextArticle() {
    await test.step('Editing the article text', async () => {
      await this.textField.fill('New Text');

      await expect(this.updateArticleButton).toBeEnabled();

      await this.updateArticleButton.click();
    });
  }

  async clickUpdateArticleButton() {
    await test.step('Click Update Article Button', async () => {
      await this.updateArticleButton.click();
    });
  }

  async addTagExistingArticleWithoutTags() {
    await test.step('Add tag to existing article without tags', async () => {
      await this.editArticleButton.click();

      await this.tagField.fill('New Tag');
      await this.tagField.press('Enter');

      await expect(
        this.page.locator('.tag-default').filter({ hasText: 'New Tag' }),
      ).toBeVisible();

      await expect(this.updateArticleButton).toBeEnabled();
      await this.page.waitForTimeout(2000);
      await this.updateArticleButton.click();
    });
  }
}
