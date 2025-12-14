import { test } from '../_fixtures/fixturesArticles';
import createNewArticle from '../../src/ui/actions/article/createNewArticle';

test.describe('Edit Article Positive Tests', () => {
  test('Edit title', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    const newTitle = articleWithTwoTags.title + ' Updated';
    await editArticlePage.fillTitleField(newTitle);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTitleIsVisible(newTitle);
  });

  test('Edit description', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    const newDescription = articleWithTwoTags.description + ' Updated';
    await editArticlePage.fillDescriptionField(newDescription);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleDescriptionIsVisible(newDescription); // nowa asercja
  });

  test('Edit text', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    const newText = articleWithTwoTags.text + ' Updated';
    await editArticlePage.fillTextField(newText);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertArticleTextIsVisible(newText);
  });

  test('Add tag', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    const newTag = 'automation';
    await editArticlePage.addTag(newTag);
    await editArticlePage.clickUpdateArticleButton();
    await viewArticlePage.assertTagIsVisible(newTag);
  });

  test('Remove tag', async ({
    createArticlePage,
    viewArticlePage,
    editArticlePage,
    articleWithTwoTags,
  }) => {
    await createNewArticle(
      createArticlePage,
      viewArticlePage,
      articleWithTwoTags,
    );
    await viewArticlePage.clickEditArticleButton();

    const newTag = 'temporary';
    await editArticlePage.addTag(newTag);
    await editArticlePage.clickUpdateArticleButton();

    // wracamy do edycji, bo po update strona przechodzi do widoku artykułu
    await viewArticlePage.clickEditArticleButton();
    await editArticlePage.removeTag(newTag);
    await editArticlePage.clickUpdateArticleButton();

    await viewArticlePage.assertTagNotVisible(newTag);
  });
});
