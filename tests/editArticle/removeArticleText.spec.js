import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { articleErrorMessages } from '../../src/ui/constants/articleErrorMessages';

test('Remove the article text for the existing article', async ({
  page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTextField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(
    articleErrorMessages.TEXT_CANNOT_BE_EMPTY,
  );
});
