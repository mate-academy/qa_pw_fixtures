import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test(
  'Add the tag for the existing article with tags',
  async ({
    page,
    user,
    articleWithOneTag,
    viewArticlePage,
    editArticlePage,
  }) => {
    const newTag = 'automation';

    await signUpUser(page, user);
    await createNewArticle(page, articleWithOneTag);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTagField(newTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagsContainText(newTag);
  },
);
