# Blog Wiki

이 문서에서 해결하는 것: 블로그를 운영할 때 필요한 문서를 어디서부터 보면 되는지 안내합니다.

`blog`는 두 저장소로 나누어 운영합니다.

- `blog`: Next.js 블로그 앱 저장소
- `blog-posts`: 글을 작성하고 보관하는 private 저장소

`submodule pointer`는 `blog` 저장소가 어떤 `blog-posts` 커밋을 사용할지 기록한 값입니다.

## 핵심 규칙

`blog-posts`에 글을 push하는 것만으로는 production에 공개되지 않습니다.\
`blog` 저장소의 `content-source/posts` submodule pointer가 새 글 커밋을 가리키고, 그 변경이 `main`에 반영될 때 배포됩니다.

## 문서 목록

- [Local Setup](Local-Setup): 로컬에서 블로그를 실행하는 방법
- [Publishing Posts](Publishing-Posts): 글을 작성하고 production에 게시하는 방법
- [Deployment Secrets](Deployment-Secrets): GitHub Actions와 Vercel 배포에 필요한 secrets 설정
- [Troubleshooting](Troubleshooting): 자주 만나는 문제와 확인 순서

## 전체 흐름

```txt
blog-posts에서 글 작성
        ↓
blog에서 submodule pointer 갱신
        ↓
blog main에 push
        ↓
GitHub Actions 실행
        ↓
Vercel production 배포
```

주의: CI는 `blog-posts`의 최신 branch를 임의로 따라가지 않습니다. 항상 `blog` 저장소에 기록된 submodule SHA만 배포합니다.