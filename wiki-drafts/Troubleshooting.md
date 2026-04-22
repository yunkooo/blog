# Troubleshooting

이 문서에서 해결하는 것: 로컬 실행, submodule, GitHub Actions, Vercel 배포에서 자주 만나는 문제를 빠르게 확인합니다.

## 글이 production에 안 보일 때

먼저 아래 순서로 확인합니다.

1. `blog-posts`에 글 커밋이 push되었는지 확인합니다.
2. `blog` 저장소의 `content-source/posts` submodule pointer가 그 커밋을 가리키는지 확인합니다.
3. `blog` 저장소의 pointer 변경 커밋이 `main`에 push되었는지 확인합니다.
4. GitHub Actions `Deploy to Vercel`이 성공했는지 확인합니다.
5. 글 frontmatter에 `draft: true`가 없는지 확인합니다.

주의: `blog-posts`에 push만 한 상태라면 production에는 반영되지 않습니다.

## submodule checkout 실패

GitHub Actions에서 posts checkout 단계가 실패하면 보통 `GH_PAT` 권한 문제입니다.

확인할 것:

- `GH_PAT`가 `blog` 저장소의 Actions secrets에 등록되어 있는지
- `GH_PAT`가 `blog-posts` 저장소를 읽을 수 있는지
- Fine-grained token이라면 `blog`, `blog-posts`가 모두 선택되어 있는지
- `Contents: Read-only` 권한이 있는지

대표 로그:

```txt
remote: Write access to repository not granted.
fatal: unable to access ...
```

이 메시지가 보여도 실제 원인은 write 권한이 아니라 private 저장소 read 권한 부족인 경우가 많습니다.

## Vercel Git 자동 배포가 켜져 있을 때

이 프로젝트의 production 배포 경로는 GitHub Actions입니다.  
Vercel Git 자동 배포가 켜져 있으면 private submodule 처리와 충돌할 수 있습니다.

확인 위치:

```txt
Vercel → Project → Settings → Git
```

Vercel Git 연결이 production 배포를 직접 만들고 있다면 연결을 끊거나 자동 배포를 비활성화합니다.

## 어느 Actions step을 봐야 할까?

| 실패 step | 먼저 의심할 것 |
| --- | --- |
| `Checkout posts repository at pinned commit` | `GH_PAT` 권한 |
| `Install dependencies` | `package-lock.json`, npm 설치 문제 |
| `Pull Vercel environment` | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |
| `Build with Vercel` | Next.js 빌드 오류, MDX/frontmatter 오류 |
| `Deploy prebuilt output` | Vercel token 또는 project 연결 문제 |
