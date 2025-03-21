---
author : ['Author Name']
title: "Configure Discussion"
description: "How to configure post discussion in Hugo Brewm theme"
date: 2025-01-26
lastmod: 2025-02-10
type: post
draft: false
translationKey: discussion
coffee: 1
tags: ['configuration', 'discussion']
categories: ['configuration']
toot: "https://infosec.exchange/@foxx/113979609651534969"
bsky: "https://bsky.app/profile/foxx808.bsky.social/post/3lknem6ci2s2h"
---

## The New Method

Simply paste your toot link in `toot` or `comments` parameter in the front matter.

```yaml
---
toot: https://example.com/@example/12345678901234567890
---
```


## 'The-Long' Method

You can integrate discussions from you Fediverse instance to you article. To enable this feature, add the `fediverse` section to your front matter with the required `host`, `user`, and `post` parameters:

```yaml
---
title: "Example"
type: "post"
fediverse:
    host: fediverse.instance
    user: user-name
    post: 123456789012345678
---
```

If you are single author, you can set the `host` and `user` parameter globally in the `config.toml` file:

```toml
[params]
    [params.fediverse]
    host = "example.com"
    user = "username"
```

You might need to preview the article's permalink before sharing it on the Fediverse network to get post ID, or perform CI/CD twice.