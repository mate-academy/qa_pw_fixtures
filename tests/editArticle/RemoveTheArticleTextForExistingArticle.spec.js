import { test} from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { TEXT_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(async ({ page, homePage, user, articleWithoutTags }) => {
  await signUpUser(page, user);
  await homePage.clickNewArticleLink();
  await createNewArticle(page, articleWithoutTags);
});

test('Remove the text for the existing article', async ({viewArticlePage, createArticlePage}) => {
  await viewArticlePage.clickEditArticleButton();
  await createArticlePage.fillTextField('');
  await createArticlePage.clickUpdateArticleButton();
  await createArticlePage.assertErrorMessageContainsText(
    TEXT_CANNOT_BE_EMPTY
  );
});

test.afterEach(async ({ page }) => {
  await page.close();
});