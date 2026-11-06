import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { DESCRIPTION_CANNOT_BE_EMPTY } from '../../src/ui/constants/articleErrorMessages';

test.beforeEach(
  async ({ page, user, homePage, viewArticlePage, articleWithoutTags }) => {
    await signUpUser(page, user);

    await homePage.clickNewArticleLink();
    await createNewArticle(page, articleWithoutTags);
    await viewArticlePage.assertArticleTitleIsVisible(articleWithoutTags.title);
  },
);

test('Remove an article description for the existing article', async ({
  viewArticlePage,
  createArticlePage,
  articleWithoutTags,
}) => {
  await viewArticlePage.clickEditArticleLink();
  await createArticlePage.assertDescriptionFieldHasValue(
    articleWithoutTags.description,
  );

  await createArticlePage.fillDescriptionField('');
  await createArticlePage.clickUpdateArticleButtonWithoutWaiting();

  await createArticlePage.assertErrorMessageContainsText(
    DESCRIPTION_CANNOT_BE_EMPTY,
  );
});
