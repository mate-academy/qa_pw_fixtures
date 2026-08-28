import { expect, test } from '@playwright/test';
import { TITLE_CANNOT_BE_EMPTY } from '../../../constants/articleErrorMessages';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../../constants/articleErrorMessages';
import { ARTICLE_BODY_CANNOT_BE_EMPTY } from '../../../constants/articleErrorMessages';
export class CreateArticleWithoutTagsPage {
  constructor(page) {
    this.page = page;
    this.titleField = page.getByPlaceholder('Article Title');
    this.descriptionField = page.getByPlaceholder(`What's this article about?`);
    this.textField = page.getByPlaceholder('Write your article (in markdown)');
    this.tagField = page.getByPlaceholder('Enter tags');
    this.publishArticleButton = page.getByRole('button', {
      name: 'Publish Article',
    });
    this.errorMessage = page.getByRole('list').nth(1);
    this.editArticleButton = page
      .getByRole('link', { name: ' Edit Article' })
      .first();
    this.updateArticleButton = page.getByRole('button', {
      name: 'Update Article',
    });
    this.tagsDelete = page.locator('span').locator('i').nth(0);
    this.ErorMesageTitleEmpty = page.getByText('Article title cannot be empty');
    this.ErorMesageDescriptionEmpty = page.getByText(
      'Article description cannot be',
    );
    this.ErorMesageBodyEmpty = page.getByText('Article body cannot be empty');
  }
  async fillTitleField(title) {
    await test.step(`Fill the 'Title' field`, async () => {
      await this.titleField.fill(title);
    });
  }
  async fillDescriptionField(description) {
    await test.step(`Fill the 'Description' field`, async () => {
      await this.descriptionField.fill(description);
    });
  }
  async fillTextField(text) {
    await test.step(`Fill the 'Text' field`, async () => {
      await this.textField.fill(text);
    });
  }
  async clickPublishArticleButton() {
    await test.step(`Click the 'Publish Article' button`, async () => {
      await this.publishArticleButton.click();
    });
  }
  async assertErrorMessageContainsText(messageText) {
    await test.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage).toContainText(messageText);
    });
  }
}
