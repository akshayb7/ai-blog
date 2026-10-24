const API = 'https://dev.to/api/articles';

// Creates a draft, or updates the existing article when articleId is given.
// `published` is only sent on create: Forem treats published=false on an update
// as "revert to draft", which would silently unpublish a live article.
export async function pushDraft({ article, apiKey, articleId, fetchImpl = fetch }) {
  const { tags, ...rest } = article;
  const payload = { ...rest, tags: tags.join(',') };
  if (!articleId) payload.published = false;

  const res = await fetchImpl(articleId ? `${API}/${articleId}` : API, {
    method: articleId ? 'PUT' : 'POST',
    headers: {
      'api-key': apiKey,
      'Content-Type': 'application/json',
      Accept: 'application/vnd.forem.api-v1+json',
    },
    body: JSON.stringify({ article: payload }),
  });

  if (!res.ok) {
    throw new Error(`Dev.to ${articleId ? 'update' : 'create'} failed (${res.status}): ${await res.text()}`);
  }

  const data = await res.json();
  return { id: data.id, url: data.url, published: Boolean(data.published), action: articleId ? 'updated' : 'created' };
}
