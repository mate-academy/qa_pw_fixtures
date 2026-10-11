import { test } from '@playwright/test';
import { ArticleEditorPage } from './ArticleEditorPage';

export class CreateArticlePage extends ArticleEditorPage {
  constructor(page) {
    super(page);
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
  }

  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }
}
