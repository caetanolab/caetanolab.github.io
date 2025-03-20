/*
MIT License

Copyright (c) 2024 Nicholas Sideras

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
const rootElement = document.querySelector("#bsky-comments");

function ToBskyUrl(uri) {
  const splitUri = uri.split('/');
  if (splitUri[0] === 'at:') {
    return 'https://bsky.app/profile/' + splitUri[2] + '/post/' + splitUri[4];
  } else {
    return uri;
  }
}

function ToAtProtoUri(url) {
  const splitUri = url.split('/');
  if (splitUri[0] === 'https:' || splitUri[0] === 'http:') {
    return 'at://' + splitUri[4] + '/app.bsky.feed.post/' + splitUri[6];
  } else {
    return url;
  }
}

function ToBskyImgUrl(did, blobLink, thumb) {
  return `https://cdn.bsky.app/img/${thumb ? "feed_thumb" : "feed_fullsize"}/plain/${did}/${blobLink}`;
}

const atProto = ToAtProtoUri(rootElement.dataset.uri);

console.log("https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=" + atProto);

fetch(
    "https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=" + atProto
  )
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error, status = ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    if (
      typeof data.thread.replies != "undefined" &&
      data.thread.replies.length > 0
    ) {
      rootElement.appendChild(DOMPurify.sanitize(renderComments(data.thread), {
        RETURN_DOM_FRAGMENT: true
      }));
    } else {
      const noReplies = document.createElement("em");
      noReplies.innerText = "No replies on bluesky.";
      rootElement.appendChild(noReplies);
    }
  })
  .catch((error) => {
    const p = document.createElement("p");
    p.appendChild(document.createTextNode(`Error: ${error.message}`));
    document.body.appendChild(p, rootElement);
  });

function renderComments(thread) {
  const commentsNode = document.createDocumentFragment();
  for (const comment of thread.replies) {
    const renderedString = renderComment(comment);
    const htmlContent = createElementFromHTML(renderedString);

    htmlContent.querySelector(".hasReplies").appendChild(renderComments(comment));

    commentsNode.appendChild(htmlContent);
  }

  return commentsNode;
}

//https://stackoverflow.com/a/494348
function createElementFromHTML(htmlString) {
  const div = document.createElement('div');
  div.innerHTML = htmlString.trim();

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild;
}

function renderComment(comment) {
  const replyDate = new Date(comment.post.record.createdAt);

  function renderRichText(record) {
    let htmlText = `<p>`

    const textEncoder = new TextEncoder();
    const utf8Decoder = new TextDecoder();
    const utf8Text = new Uint8Array(record.text.length * 3);
    textEncoder.encodeInto(record.text, utf8Text);

    var charIdx = 0;
    for (const facetIdx in record.facets) {
      const facet = record.facets[facetIdx];
      const facetFeature = facet.features[0];
      const facetType = facetFeature.$type;

      var facetLink = "#";
      if (facetType == "app.bsky.richtext.facet#tag") {
        facetLink = `https://bsky.app/hashtag/${facetFeature.tag}`;
      } else if (facetType == "app.bsky.richtext.facet#link") {
        facetLink = facetFeature.uri;
      } else if (facetType == "app.bsky.richtext.facet#mention") {
        facetLink = `https://bsky.app/profile/${facetFeature.did}`;
      }

      if (charIdx < facet.index.byteStart) {
        const preFacetText = utf8Text.slice(charIdx, facet.index.byteStart);
        htmlText += utf8Decoder.decode(preFacetText)
      }

      const facetText = utf8Text.slice(facet.index.byteStart, facet.index.byteEnd);
      htmlText += `<a href="${facetLink}" target="_blank">` + utf8Decoder.decode(facetText) + '</a>';

      charIdx = facet.index.byteEnd;
    }

    if (charIdx < utf8Text.length) {
      const postFacetText = utf8Text.slice(charIdx, utf8Text.length);
      htmlText += utf8Decoder.decode(postFacetText);
    }

    return htmlText + '</p>';
  }

  let renderAttachment = "";
  if (comment.post.embed) {
    const embedType = comment.post.embed.$type;

    if (embedType === "app.bsky.embed.external#view") {
      const {uri, title, description} = comment.post.embed.external;
      if (uri.includes(".gif?")) {
        renderAttachment = `<img src="${uri}" title="${title}" alt="${description}">`;
      }
    } else if (embedType === "app.bsky.embed.images#view") {
      const images = comment.post.record.embed.images;
      renderAttachment = images.map(image => {
        const thumb = ToBskyImgUrl(comment.post.author.did, image.image.ref.$link, true);
        const orig = ToBskyImgUrl(comment.post.author.did, image.image.ref.$link, false);
        return `<a href="${orig}" target="_blank"><img src="${thumb}" alt="${image.alt}"></a>`;
      }).join('');
    }
  }

  return `
  <li>
    <article class="mastodon-comment bluesky-comment" style="margin-bottom: 1rem">
      <header class="author">
        <img src="${comment.post.author.avatar}" width=58 height=48 alt="${comment.post.author.handle}" loading="lazy" />
        <a class="has-aria-label" href="https://bsky.app/profile/${comment.post.author.handle}" rel="ugc" aria-label="@${comment.post.author.handle}">
          <span>${comment.post.author.displayName}</span>
        </a>
      </header>
      <div class="content">
        <div class="par">${renderRichText(comment.post.record)}</div>
        <div class="attachments">${renderAttachment}</div>
      </div>
      <footer>
        <div class="stat">
          <a class="replies ${comment.post.replyCount > 0 ? 'active' : ''}" href="${ToBskyUrl(comment.post.uri)}" rel="nofollow">
            <span>${comment.post.replyCount > 0 ? comment.post.replyCount : ''}</span>
          </a>
          <a class="reblogs ${comment.post.repostCount > 0 ? 'active' : ''}" href="${ToBskyUrl(comment.post.uri)}" rel="nofollow">
            <span>${comment.post.repostCount > 0 ? comment.post.repostCount : ''}</span>
          </a>
          <a class="favourites ${comment.post.likeCount > 0 ? 'active' : ''}" href="${ToBskyUrl(comment.post.uri)}" rel="nofollow">
            <span>${comment.post.likeCount > 0 ? comment.post.likeCount : ''}</span>
          </a>
        </div>
        <a class="date" href="${ToBskyUrl(comment.post.uri)}" rel="nofollow"><time>${replyDate.toLocaleString()}</time></a>
      </footer>
    </article>
    <ul class="hasReplies" style="margin-left: var(--indent); padding: 0; list-style: none"></ul>
  </li>`;
}