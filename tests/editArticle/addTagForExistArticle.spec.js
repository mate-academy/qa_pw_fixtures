import { faker } from '@faker-js/faker';
import { test } from '../../tests/_fixtures/fixtures';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';


test.describe('Add tag for existing article', () => {
  const newArtTag = faker.lorem.word();

  test.beforeEach(async ({page, homePage, user}) => {
    await signUpUser(page, user);
    await homePage.clickNewArticleLink();
  });

  test('Add the tag for the existing article without tags', async ({
    page,
    articleWithoutTags,
    editArticlePage,
    viewArticlePage
  }) => {
  
    await createNewArticle(page, articleWithoutTags, false);
    await viewArticlePage.clickEditArticle();
    await editArticlePage.addNewTag(newArtTag);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.refreshPageForUpdateArticlePage();
    
    await viewArticlePage.assertArticleTagIsVisible(newArtTag);
  });

  test('Add the tag for the existing article with tags', async ({
    page,
    articleWithOneTag,
    editArticlePage,
    viewArticlePage
  }) => {

    await createNewArticle(page, articleWithOneTag, true);
    await viewArticlePage.clickEditArticle();
    await editArticlePage.addNewTag(newArtTag);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.refreshPageForUpdateArticlePage();

    await viewArticlePage.assertArticleTagIsVisible(newArtTag);
  });
});
