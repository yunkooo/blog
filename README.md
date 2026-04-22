# blog

Next.js 블로그 앱과 private 글 저장소를 분리해 운영하는 저장소입니다. 공개 기준은 private 글 저장소의 최신 상태가 아니라, 이 저장소에 커밋된 submodule pointer입니다.

## Architecture

- runtime/UI: 이 저장소의 Next.js 앱
- content source: `content-source/posts` 경로의 private git submodule
- production publish rule: blog repo에 기록된 submodule SHA가 바뀌고 `main`에 반영될 때만 배포

이 구조에서는 private 글 저장소에서 초안을 자유롭게 수정해도 production은 바뀌지 않습니다. 게시 시점에만 blog repo에서 submodule 포인터를 원하는 커밋으로 올린 뒤 push 또는 merge 하면 GitHub Actions가 Vercel production 배포를 실행합니다.

## Local Setup

1. private 글 저장소를 submodule로 연결합니다.

```bash
git submodule add <PRIVATE_REPOSITORY_HTTPS_URL> content-source/posts
```

2. submodule을 포함해 내려받습니다.

```bash
git submodule update --init --recursive
```

3. 의존성을 설치하고 개발 서버를 실행합니다.

```bash
npm ci
npm run dev
```

기본 콘텐츠 경로는 `content-source/posts`입니다. 다른 위치를 쓰고 싶다면 `POSTS_DIR` 환경변수로 덮어쓸 수 있습니다.

```bash
POSTS_DIR=/absolute/path/to/posts npm run dev
```

## Publish Workflow

1. private 글 저장소에서 글을 작성하거나 수정합니다.
2. blog repo에서 submodule 포인터를 원하는 커밋으로 업데이트합니다.

```bash
git submodule update --init --recursive
cd content-source/posts
git checkout <PUBLISHED_POSTS_COMMIT>
cd ../..
git add content-source/posts
git commit -m "Publish posts"
git push origin main
```

3. `main` push가 발생하면 GitHub Actions가 현재 repo에 기록된 submodule SHA를 읽고, `blog-posts` 저장소를 해당 커밋으로 checkout합니다.
4. Actions가 `vercel build`와 `vercel deploy --prebuilt --prod`로 production 배포를 실행합니다.

중요한 점은 CI가 `blog-posts`의 최신 branch를 임의로 추적하지 않는다는 것입니다. 배포 대상은 항상 blog repo 커밋에 고정된 SHA입니다.

## Required Secrets

- `GH_PAT`: `blog-posts` 저장소를 읽을 수 있는 GitHub Personal Access Token
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

## Vercel Deployment

production 배포는 `.github/workflows/deploy.yml`에서 수행합니다. `vercel.json`은 Vercel Git 자동 배포를 끄고, GitHub Actions가 공식 production 배포 경로가 되도록 맞춰둡니다.

## Notes

- 새 글 공개는 ISR이 아니라 새 배포로 반영됩니다.
- 글 목록과 상세 페이지는 정적 생성 중심으로 유지됩니다.
- `draft: true` 글은 계속 사이트에서 제외됩니다.
- 현재 `.gitmodules`는 `content-source/posts -> https://github.com/yunkooo/blog-posts.git`로 연결되어 있습니다.
