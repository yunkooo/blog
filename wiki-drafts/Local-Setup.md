# Local Setup

이 문서에서 해결하는 것: 로컬에서 `yunkoo.dev` 블로그 앱을 실행하고, private 글 저장소의 글을 읽을 수 있게 설정합니다.

## 1. 저장소 내려받기

```bash
git clone https://github.com/yunkooo/blog.git
cd blog
```

이미 저장소를 clone했다면 이 단계는 건너뛰어도 됩니다.

## 2. submodule 초기화

`content-source/posts`는 `blog-posts` private 저장소를 가리키는 git submodule입니다.

```bash
git submodule update --init --recursive
```

이 명령은 `blog` 저장소에 기록된 posts 커밋을 `content-source/posts`에 checkout합니다.

주의: `blog-posts`가 private 저장소이므로, 해당 저장소를 읽을 권한이 없는 계정에서는 이 단계가 실패할 수 있습니다.

## 3. 의존성 설치

```bash
npm ci
```

`npm ci`는 `package-lock.json` 기준으로 의존성을 정확히 설치합니다.

## 4. 개발 서버 실행

```bash
npm run dev
```

기본 주소는 아래와 같습니다.

```txt
http://localhost:3000
```

## 5. 다른 글 폴더를 사용하고 싶을 때

기본 글 경로는 `content-source/posts`입니다. 다른 위치의 글을 임시로 보고 싶다면 `POSTS_DIR`을 사용할 수 있습니다.

```bash
POSTS_DIR=/absolute/path/to/posts npm run dev
```

## 글이 로컬에서 안 보일 때 확인할 것

- `content-source/posts` 폴더가 있는지 확인합니다.
- `content-source/posts` 안에 `.mdx` 파일이 있는지 확인합니다.
- 해당 글의 frontmatter에 `draft: true`가 있으면 목록에서 제외됩니다.
- `POSTS_DIR`을 설정했다면 경로가 실제 폴더인지 확인합니다.
- submodule 권한 문제가 의심되면 `git submodule update --init --recursive`를 다시 실행해 로그를 확인합니다.
