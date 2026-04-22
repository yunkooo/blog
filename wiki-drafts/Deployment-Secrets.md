# Deployment Secrets

이 문서에서 해결하는 것: GitHub Actions가 private 글 저장소를 읽고 Vercel에 배포하기 위해 필요한 secrets를 설명합니다.

Secrets는 `blog` 저장소에 등록합니다.

```txt
GitHub → blog repo → Settings → Secrets and variables → Actions
```

## 필요한 Secrets

| 이름 | 필요한 이유 |
| --- | --- |
| `GH_PAT` | GitHub Actions가 private 저장소인 `blog-posts`를 읽기 위해 필요합니다. |
| `VERCEL_TOKEN` | GitHub Actions가 Vercel CLI로 배포하기 위해 필요합니다. |
| `VERCEL_ORG_ID` | Vercel의 개인 계정 또는 팀을 식별하기 위해 필요합니다. |
| `VERCEL_PROJECT_ID` | 배포할 Vercel 프로젝트를 식별하기 위해 필요합니다. |

## GH_PAT 권장 설정

`GH_PAT`는 GitHub Fine-grained personal access token을 권장합니다.

권장 설정:

- Repository access: `Only select repositories`
- 선택할 저장소: `blog`, `blog-posts`
- Repository permissions: `Contents: Read-only`
- Metadata 권한은 기본 read 권한 유지

주의: `GH_PAT`가 `blog-posts`를 읽을 수 없으면 GitHub Actions의 posts checkout 단계에서 실패합니다.

## Vercel 값 확인

`VERCEL_ORG_ID`와 `VERCEL_PROJECT_ID`는 Vercel 프로젝트 설정 또는 로컬 `.vercel/project.json`에서 확인할 수 있습니다.

로컬에서 Vercel 프로젝트가 연결되어 있다면 아래 파일을 확인합니다.

```txt
.vercel/project.json
```

## Vercel Git 자동 배포

이 프로젝트는 GitHub Actions가 Vercel CLI로 production 배포를 수행합니다.  
Vercel Git 자동 배포는 충돌을 피하기 위해 사용하지 않습니다.

현재 `vercel.json`은 다음 의도를 가집니다.

```json
{
  "git": {
    "deploymentEnabled": false
  }
}
```

주의: Vercel 프로젝트의 Git 연결이 살아 있으면, GitHub Actions 배포와 Vercel Git 배포가 동시에 반응할 수 있습니다.
