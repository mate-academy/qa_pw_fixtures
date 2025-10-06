import { faker } from '@faker-js/faker';

export function generateNewArticleData(logger) {
  const article = {
    title: faker.lorem.words(3),
    description: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(2),
    tagList: [faker.word.noun(), faker.word.noun()],
  };

  logger.debug(`New article generated: ${JSON.stringify(article)}`);
  return article;
}
