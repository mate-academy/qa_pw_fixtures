import { test } from '../_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

test(
  'Add the tag for the existing article without tags',
  async ({
    page,
    user,
    articleWithoutTags,
    viewArticlePage,
    editArticlePage,
  }) => {
    const tag = 'playwright';

    await signUpUser(page, user);
    await createNewArticle(page, articleWithoutTags);

    await viewArticlePage.clickEditArticleButton();

    await editArticlePage.fillTagField(tag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertArticleTagsContainText(tag);
  },
);
