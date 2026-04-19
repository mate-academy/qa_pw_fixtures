import { test } from '../_fixtures/fixtures';
import { faker } from '@faker-js/faker';
import { signUpUser } from '../../src/ui/actions/auth/signUpUser';
import { createNewArticle } from '../../src/ui/actions/article/createNewArticle';

let newTag = faker.lorem.word();

test.beforeEach(async ({ page, user, articleWithOneTag }) => {

  await signUpUser(page, user);
  await createNewArticle(page, articleWithOneTag);
});

test('Add the tag for the existing article with tags', async ({
  viewArticlePage, editArticlePage, articleWithOneTag
}) => {
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.clickEditArticleButton();
  await editArticlePage.fillArticleTagsWithNewData(newTag);
  await editArticlePage.clickUpdateArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(articleWithOneTag.title);
  await viewArticlePage.assertArticleNewTagIsVisible(newTag);
}); 