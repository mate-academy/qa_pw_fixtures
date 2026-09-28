import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';
import { articleErrorMessages } from '../../src/ui/constants/articleErrorMessages';

test('Remove the article title for the existing article', async ({
  page,
  user,
  viewArticlePage,
  editArticlePage,
  articleWithoutTags,
}) => {
  await signUpUser(page, user);
  await createNewArticle(page, articleWithoutTags);

  await viewArticlePage.clickEditArticleButton();

  await editArticlePage.fillTitleField('');
  await editArticlePage.clickUpdateArticleButton();

  await editArticlePage.assertErrorMessageContainsText(
    articleErrorMessages.TITLE_CANNOT_BE_EMPTY,
  );
});