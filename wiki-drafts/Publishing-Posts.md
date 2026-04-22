# Publishing Posts

이 문서에서 해결하는 것: `blog-posts`에서 작성한 글을 `production`에 게시하는 방법을 설명합니다.

## 핵심 개념

`blog-posts`는 글을 쓰는 공간입니다.\
`blog`는 어떤 글 버전을 production에 올릴지 결정하는 공간입니다.

즉, `blog-posts`에 push만 해서는 공개되지 않습니다. `blog` 저장소의 submodule pointer가 그 글 커밋을 가리켜야 공개됩니다.

## 1. blog-posts에서 글 작성

`content-source/posts`로 이동합니다.

```bash
cd content-source/posts
```

새 `.mdx` 글을 작성하거나 기존 글을 수정합니다.

```bash
git status
git add .
git commit -m "Add new post"
git push origin main
```

## 2. blog 저장소로 돌아오기

```bash
cd ../..
```

이제 `blog` 저장소 입장에서는 `content-source/posts` submodule pointer가 변경된 상태입니다.

확인합니다.

```bash
git status
```

## 3. submodule pointer 커밋

```bash
git add content-source/posts
git commit -m "Publish posts"
```

이 커밋은 글 파일 전체를 복사하는 커밋이 아닙니다. `blog` 저장소가 사용할 `blog-posts` 커밋 SHA를 갱신하는 커밋입니다.

## 4. main에 push

```bash
git push origin main
```

`main`에 push되면 GitHub Actions가 실행됩니다.

## 5. 배포 확인

GitHub에서 아래 경로를 확인합니다.

```txt
Actions → Deploy to Vercel
```

성공하면 Vercel production에 반영됩니다.

## 주의

CI는 `blog-posts`의 최신 main을 자동으로 따라가지 않습니다.\
항상 `blog` 저장소에 커밋된 submodule pointer가 가리키는 글 커밋만 배포합니다.

이 규칙 덕분에 private 저장소에서 초안을 자유롭게 수정해도, 명시적으로 게시하기 전까지 production이 바뀌지 않습니다.