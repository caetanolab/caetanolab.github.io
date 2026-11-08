# Hugo portfolio guidance

## Add a page

- Put project pages in `content/en/post/<slug>/index.md`. Use a short, lowercase slug and keep published slugs stable so existing links still work. Keep the homepage, project index, and footer in their existing content files.
- Set `title`, `description`, `date`, `author`, `draft`, `type: post`, `tags`, and `categories` in YAML front matter. Use the project name as the title, a short subtitle as the description, and the citation's author order. Use the publication or project release date and set `draft: false` when the page is ready.
- Use the actual publication type for the category, such as `Journal Paper`, `Conference Paper`, `Conference Demo`, or `Conference Poster`. Use the publication's keywords as tags when available. Name the venue in the page or citation if it adds context.
- Put images in the same page bundle and reference them by filename. Set `cover` and `coverAlt` for the project card when a cover is available. For a captioned lead image, use the theme's `figure` shortcode with `type="full"`, an explicit filename, descriptive `alt` text, and a short `caption`.

## Project page order

1. Lead with the project image or demo media, when available.
2. Add a short summary, then any project details. Keep videos that illustrate a specific subsection with that subsection.
3. Add clearly labeled links to the repository, publisher, and preprint where available. Distinguish a published demo from a separate research preprint.
4. List any awards under `## Awards`, using the award name and its link when available.
5. Add verified citation data under `#### BibTeX` in a fenced `latex` block. Omit the abstract from new BibTeX entries.
6. Place the paper embed last. Give the iframe a descriptive `title` and use `loading="lazy"`.

Skip sections without content. Use one blank line between Markdown blocks and retain the blank lines that separate paragraphs, lists, and embeds. Scope any page-specific CSS to explicit classes so it cannot affect site navigation or header icons.

## Verify

- Run `hugo` from the repository root, or run `preview.bat` on Windows for live preview.
- Open the generated project page and its homepage card. Check the title, category, section order, image and alt text, and publication links. Confirm any embedded paper is paired with a usable direct link.
