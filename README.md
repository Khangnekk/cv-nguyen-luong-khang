# CV — Nguyen Luong Khang

Trang web CV cá nhân với 3 chế độ xem: bản **Human** (giao diện đầy màu, in ra đúng 1 trang A4), bản **PDF** raw, và bản **Agent** (markdown plain-text cho LLM/agent đọc).

**Trang live:** https://cv-nguyen-luong-khang.pages.dev
**Bản markdown cho agent:** https://cv-nguyen-luong-khang.pages.dev/cv.md

---

## Tính năng

| Tính năng | Chi tiết |
|---|---|
| 3 chế độ xem | `Human` (HTML có màu) · `PDF` (raw trong iframe) · `Agent` (markdown) |
| In 1 trang A4 | `@page size: A4`, 210×297mm, đã verify bằng Edge headless |
| Bản in monochrome | Ẩn toolbar, icon, màu; giữ link click được trong PDF |
| `cv.md` | Sinh tự động từ `src/data/cv.ts` lúc build — agent `curl` là có nội dung sạch |
| JSON-LD | `schema.org/Person` inject vào `<head>` cho ATS và crawler |
| Responsive | Desktop 3/2/4 cột → tablet 2/1/2 → mobile 1 cột, FAB 56×56px |
| Cấu hình qua `.env` | Không phải sửa code khi đổi domain, mode mặc định hay tên file |
| Nguồn dữ liệu duy nhất | `cv.ts` sinh ra cả 3 view + `cv.md` + JSON-LD, không thể lệch nhau |

## Yêu cầu

- Node.js ≥ 20 (đang dev trên v26)
- pnpm ≥ 10

## Chạy dự án

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

```bash
pnpm build      # tsc -b && vite build -> dist/
pnpm preview    # http://localhost:4173
pnpm typecheck  # tsc -b --noEmit
```

## Cấu hình

Copy `.env.example` thành `.env` rồi chỉnh. File `.env` đã nằm trong `.gitignore`, không commit giá trị thật.

| Biến | Mặc định | Ý nghĩa |
|---|---|---|
| `VITE_SITE_URL` | *(rỗng)* | URL chính của site. Dùng cho `url` + `mainEntityOfPage` trong JSON-LD. Rỗng = bỏ field `url` (tốt hơn phát domain giả) |
| `VITE_DEFAULT_VIEW` | `pdf` | Mode mở khi load: `human` \| `pdf` \| `agent`. Giá trị sai sẽ fallback về `pdf` + in cảnh báo ở console |
| `VITE_PDF_FILE` | `cv.pdf` | Tên file raw PDF trong `public/`, dùng cho iframe + nút download |
| `VITE_AGENT_FILE` | `cv.md` | Tên file markdown, dùng cho nút download + đường dẫn agent fetch |

Đọc ở cả hai nơi qua `src/config.ts` (`resolveAppConfig`): client dùng `import.meta.env`, `vite.config.ts` dùng `loadEnv`. Cùng một hàm nên hai bên không thể lệch nhau.

> Sau khi đổi `.env` phải `pnpm build` lại — giá trị được nướng vào lúc build, không đọc lúc runtime.

## Triển khai (Cloudflare Pages)

Trong dashboard Pages, kết nối repo git rồi cấu hình:

| Setting | Value |
|---|---|
| Build command | `pnpm build` |
| Build output directory | `dist` |
| Node version | `20` hoặc mới hơn (`NODE_VERSION`) |
| Environment variables | `VITE_SITE_URL`, `VITE_DEFAULT_VIEW`, … nếu muốn ghi đè |

Deploy bằng CLI:

```bash
pnpm build
pnpm dlx wrangler pages deploy dist
```

Lưu ý: không cần cấu hình SPA rewrite — site chỉ có một route.

## Cấu trúc

```
src/
  data/cv.ts          nguồn dữ liệu duy nhất (profile, skills, experience, projects, education...)
  data/agentView.ts   sinh markdown + JSON-LD Person từ cv.ts
  config.ts           resolveAppConfig đọc .env, validate VITE_DEFAULT_VIEW
  icons/skills.ts     registry icon + màu cho skill
  components/         BrandIcon, Section
  App.tsx             3 layer (CV / PDF / Agent) + toolbar switch + FAB mobile
  styles.css          layout, animation, responsive, @media print
vite.config.ts        plugin agentAssets: emit cv.md + inject JSON-LD + serve /cv.md ở dev
public/cv.pdf         raw PDF 2 trang
assets/               tài liệu nội bộ, KHÔNG deploy: PDF gốc để đối chiếu,
                      interview-prep-EN.md, interview-prep-VI.md
```

`dist/cv.md` được `emitFile` lúc build từ **chính** `buildAgentMarkdown()` mà view Agent đang hiển thị — nên file và giao diện luôn giống nhau byte-for-byte.

## Về nội dung

Nội dung bám sát PDF gốc (`assets/CV Nguyen Luong Khang - .NET Developer.pdf`), kể cả những chỗ nghe có vẻ lệch thực tế. Chỉ có 2 chỗ cố ý giữ nguyên:

- **Không thêm dòng tổng số năm kinh nghiệm** — Career Goals ghi "more than 2 years" theo PDF gốc.
- **Tag `current`** cạnh "Oct 2024 – Present" chỉ có ở giao diện web, không đưa vào markdown vì PDF ghi "Present".

Bản in HTML là 1 trang A4; raw PDF gốc vẫn là 2 trang — hai thứ khác nhau, nút `Download PDF` tải bản raw.

## Kiểm tra trước khi deploy

```bash
pnpm typecheck && pnpm build
```

- In ra 1 trang: mở trang → `Ctrl+P` → đích `Save as PDF`, margin `None`, bật `Background graphics` không bắt buộc
- Kiểm tra `curl -I <site>/cv.md` trả `200` với `Content-Type: text/markdown`
- Kiểm tra `<head>` có `application/ld+json` parse được
