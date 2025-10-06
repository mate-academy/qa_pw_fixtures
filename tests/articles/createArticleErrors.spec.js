import { test } from '../_fixtures/fixtures';
import { TITLE_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.describe('Create Article Error Handling', () => {
  test(
    'Error shown when publishing with empty title field',
    async ({ createArticlePage, logger }) => {
      logger.warn('Trying to publish article with empty title');

      await createArticlePage.fillDescriptionField('Short description');
      await createArticlePage.fillTextField('Body content of the article');
      await createArticlePage.clickPublishArticleButton();

      await createArticlePage.assertErrorMessageContainsText(
        TITLE_CANNOT_BE_EMPTY
      );
    }
  );
});
