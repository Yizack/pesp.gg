export default defineEventHandler(async (event) => {
  const { posts } = await $fetch("https://pesp.gg/data/actualidad.json");
  const actualidad = posts.filter(post => post.visible === "public");
  actualidad.forEach((post) => {
    post.p_es = truncate(stripTags(post.p_es), 200);
    post.p_en = truncate(stripTags(post.p_en), 200);
  });
  const query = getQuery(event);
  const props = query.props?.split(",");
  const limit = query.limit || actualidad.length;
  const filtered = props ? filterByProps(actualidad, props) : actualidad;
  return filtered.slice(0, limit);
});