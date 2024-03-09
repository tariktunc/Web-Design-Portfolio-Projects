export default function Page({ params }: { params: { blog: string } }) {
  // Fetch the blog post data from an API or database
  const blogPost = fetchBlogPost(params.blog);

  return (
    <div>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.author}</p>
      <div dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
    </div>
  );
}

function fetchBlogPost(blogSlug: string) {
  // Implement your logic to fetch the blog post data based on the blog slug
  // This can be done using an API call or querying a database
  // Return the blog post data as an object with properties like title, author, and content
  return {
    title: "Sample Blog Post",
    author: "John Doe",
    content: "<p>This is the content of the blog post.</p>",
  };
}
