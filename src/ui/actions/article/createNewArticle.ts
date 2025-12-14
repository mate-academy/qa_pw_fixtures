import { CreateArticlePage } from '../../pages/article/CreateArticlePage';
import { ViewArticlePage } from '../../pages/article/ViewArticlePage';

export interface ArticleData {
  title: string;
  description: string;
  text: string;
  tags?: string[];
}

export default async function createNewArticle(
  createArticlePage: CreateArticlePage,
  viewArticlePage: ViewArticlePage,
  article: ArticleData
) {
  await createArticlePage.open();
  await createArticlePage.fillTitleField(article.title);
  await createArticlePage.fillDescriptionField(article.description);
  await createArticlePage.fillTextField(article.text);

  if (article.tags && article.tags.length > 0) {
    for (const tag of article.tags) {
      await createArticlePage.addTag(tag);
    }
  }

  await createArticlePage.clickPublishArticleButton();
  await viewArticlePage.assertArticleTitleIsVisible(article.title);

  return article;
}
