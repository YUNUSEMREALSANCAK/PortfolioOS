# PortfolioOS / Masaüstü Portföy Uygulaması Kuralları

Bu dosya, LLM tabanlı araçların proje içinde tutarlı ve beklendiği gibi kod üretmesini sağlamak için hazırlanmıştır. Yeni geliştirmeler yaparken buradaki ilkelere uyulmalıdır.

## 1. Genel Mimari
- Proje `Vite + React + TypeScript` üzerinde çalışır; tüm yeni bileşenler TypeScript ile yazılmalıdır.
- Uygulama, masaüstü (desktop OS) metaforuna dayalı tek sayfalık bir deneyimdir. Navigasyon, ana masaüstü sahnesi üzerindeki ikonlar ve açılır pencerelerle gerçekleştirilir.
- Bileşenler `src/` altında organize edilir. Şu an ana giriş noktası `src/App.tsx` ve `src/main.tsx` dosyalarıdır. Büyüdükçe `components/`, `hooks/`, `store/` gibi alt klasörler açılmalıdır.

## 2. UI ve UX İlkeleri
- Masaüstü hissiyatı kritik: ikonlar grid benzeri düzende konumlanır, pencereler serbest biçimde açılır/kapanır/minimize edilir.
- Pencereler OS tarzı bir başlık çubuğu, kontrol butonları (minimize, maximize, close) ve kaydırılabilir içerik alanı içermelidir.
- Animasyonlar akıcı (smooth) olmalı ve **en az 0.4-0.6s easing** kullanılarak gerçekçi davranış taklit edilmelidir. `cubic-bezier` eğrileri tercih edilir.
- Kullanıcı masaüstüne tıkladığında ikon seçimleri temizlenmelidir. Çift tıklama mantığı korunmalıdır.
- Mobil cihazlar ikinci öncelik; gerekirse özel layout veya uyarı şeklinde ele alınmalıdır.

## 3. Durum Yönetimi
- Halihazırda pencere ve ikon durumları `useState` ile `App.tsx` içinde yönetiliyor. Proje büyüdüğünde ortak durumlar için `Context`, `Zustand` veya benzeri hafif çözümler kullanılabilir.
- Pencere durumu nesneleri aşağıdaki alanları içermelidir: `id`, `title`, `content`, `iconPosition`, `isOpen`, `isMinimized`, `isAnimating`, `animationType`, `zIndex`.
- İkonlar için `DesktopIcon` arayüzü referans alınmalı; yeni ikon eklenirken aynı sözleşmeye uyulmalıdır.

## 4. Bileşen Tasarım Rehberi
- Bileşenler küçük ve tekrar kullanılabilir yapılmalıdır. Örnek: `DesktopIcon`, `Window`, `Taskbar`, `WindowManager`.
- `props` arayüzleri TypeScript ile açıkça tanımlanmalıdır. `any` kullanmaktan kaçının.
- Animasyonlar için mümkünse `framer-motion` gibi bir kütüphane yerine şu anki custom animasyon sistemiyle uyumlu CSS geçişleri tercih edin. Kütüphane eklenmesi gerekiyorsa bu dosyada karar kısa bir notla açıklanmalıdır.
- Yeni dosyalar eklenirken proje kökünde tür ayrımını koruyacak klasörler oluşturun (`components/`, `utils/`, `constants/` vb.).

## 5. Stil ve Tailwind Kullanımı
- Tailwind CSS varsayılan olarak kullanılır. Stil sınıfları bileşenlerin JSX’inde inline olarak tanımlanmalıdır.
- Uzun veya tekrar eden stil kombinasyonları için `@apply` kullanımı yerine yeniden kullanılabilir component oluşturma tercih edilmelidir.
- Tailwind config üzerinde değişiklik gerekiyorsa, değişiklikler bu dosyada kısa açıklamayla belgelenmelidir.
- Global stiller `src/index.css` içinde tanımlanır; burada kaydırma engelleme, font smoothing gibi OS hissi veren ayarlar korunmalıdır.

## 6. İçerik ve Lokalizasyon
- Şu an içerik Türkçe. Yeni metinler eklenirken Türkçe kullanılmalı, özel durumlar için `i18n` stratejisi düşünülmelidir.
- Dinamik içerik (projeler, deneyimler vb.) ileride JSON veya ayrı veri kaynaklarından okunabilir. Olası veri yapılarını şimdiden düşünerek komponentleri esnek tasarlayın.

## 7. Erişilebilirlik ve Kullanılabilirlik
- İkonların ve butonların `aria-label` değerleri olmalı. Çift tıklama davranışı klavye ile erişilebilir alternatif (ör. Enter/Space) sunmalıdır.
- Hareket hassasiyeti olan kullanıcılar için (prefers-reduced-motion) animasyon azaltımı eklenmelidir.
- Renk kontrastı yüksek tutulmalı, özellikle metinler üzerinde `text-gray-300` veya daha açık tonlar yerine gerekirse `text-white` tercih edilmelidir.

## 8. Test ve Kalite
- Yeni özellikler için en azından bileşen düzeyinde smoke test veya snapshot testleri eklenmelidir (React Testing Library + Vitest).
- Drag & drop ve pencere animasyonu gibi kritik etkileşimler için e2e testler (`Playwright`/`Cypress`) planlanmalıdır.
- Lint (`npm run lint`) ve build (`npm run build`) komutları düzenli olarak çalıştırılmalıdır.

## 9. Git ve Dağıtım
- Repo gizlidir (`private`). Branch stratejisi: `main` istikrarlı, özellikler için `feature/xyz` branch’leri kullanılmalı.
- Commit mesajları açıklayıcı, `feat:`, `fix:` gibi tip ön ekleriyle yazılmalıdır.
- Gelecekte dağıtım için tercihen statik hosting (Vercel, Netlify) ya da GitHub Pages üzerinde çalışacak yapı düşünülmelidir.

## 10. Yapılandırma Dosyaları
- `tsconfig*.json` dosyalarındaki strict ayarlar korunmalıdır.
- `eslint.config.js` uyarıları giderilmeli; yeni kurallar eklenirse burada belgelendirilmelidir.
- `vite.config.ts` içinde yeni alias veya plugin eklenirse bu dosyada duyurulmalıdır.

## 11. Gelecek Geliştirmeler İçin Öneriler
- `WindowManager` bileşeni oluşturarak pencere yönetim mantığını tek yerde toplamak.
- `Taskbar` ikonlarında sağ tıklama menüsü veya context menü eklemek.
- Tema değiştirici (dark/light veya farklı OS temaları) eklemek.
- Dosya sistemi metaforunu derinleştirmek: alt klasörler, sürükle-bırak dosya taşıma, çıkış/log-out akışı.

---

Bu kurallar yeni geliştiricilere ve LLM modellerine rehberlik etmek için yaşayacaktır. Önemli kararlar alındığında (önemli kütüphane ekleme, mimari değişiklik vb.) bu dosya güncellenmelidir.

