import { describe, it, expect } from "vitest";
import { getAllProjects, getAllBlogPosts } from "@/app/lib/projects";

describe("projects data", () => {
  it("getAllProjects returns an array", async () => {
    const projects = await getAllProjects();
    expect(Array.isArray(projects)).toBe(true);
  });

  it("each project has required fields", async () => {
    const projects = await getAllProjects();
    for (const p of projects) {
      expect(p).toHaveProperty("title");
      expect(p).toHaveProperty("slug");
    }
  });
});

describe("blog data", () => {
  it("getAllBlogPosts returns an array", async () => {
    const posts = await getAllBlogPosts();
    expect(Array.isArray(posts)).toBe(true);
  });

  it("each post has required fields", async () => {
    const posts = await getAllBlogPosts();
    for (const post of posts.slice(0, 5)) {
      expect(post).toHaveProperty("title");
      expect(post).toHaveProperty("slug");
      expect(post).toHaveProperty("categories");
    }
  });
});
