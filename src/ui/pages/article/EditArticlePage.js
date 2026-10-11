import { expect, test } from '@playwright/test';
import { ArticleEditorPage } from './ArticleEditorPage';

export class EditArticlePage extends ArticleEditorPage {
  constructor(page) {
    super(page);
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
  }

  async clickUpdateArticleButton() {
    await test.step(`Click the 'Update Article' button`, async () => {
      await this.updateArticleButton.click();
    });
  }

  async assertFormIsPrefilled(article) {
    await test.step(`Assert the article form is prefilled`, async () => {
      await expect(this.titleField).toHaveValue(article.title);
      await expect(this.descriptionField).toHaveValue(article.description);
      await expect(this.textField).toHaveValue(article.text);

      for (const tag of article.tags) {
        await expect(this.getTag(tag)).toBeVisible();
      }
    });
  }
}
