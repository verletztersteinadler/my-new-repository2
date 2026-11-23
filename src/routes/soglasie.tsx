import { Link, createFileRoute } from "@tanstack/react-router";
import { CONSENT_VERSION } from "@/data/catalog";

export const Route = createFileRoute("/soglasie")({
  component: ConsentPage,
  head: () => ({ meta: [{ title: "Согласие на обращение — KOTLY.SU" }] }),
});

function ConsentPage() {
  return (
    <article className="mx-auto min-h-dvh max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm font-semibold text-ink">
        К каталогу
      </Link>
      <h1 className="mt-4 text-3xl font-semibold text-balance">Согласие на обработку обращения</h1>
      <p className="mt-3 text-sm text-muted">Отдельный текст, версия {CONSENT_VERSION}. Требует утверждения оператором.</p>
      <div className="mt-6 grid gap-4 text-pretty">
        {import.meta.env.VITE_STATIC_EXPORT === "1" ? (
          <>
            <p className="rounded-xl border border-line bg-chip px-4 py-3 text-sm">
              На статической версии kotly.pro приём заявок отключён. Контактные и иные персональные
              данные посетителей через формы сайта не собираются и не передаются.
            </p>
            <p>Страницы производителей и инженерный подбор работают в браузере по опубликованным данным каталога.
              Для запуска приёма обращений потребуются отдельный защищённый обработчик и утверждённая политика.</p>
          </>
        ) : (
          <>
        <p>Я разрешаю обработать имя и телефон, а также почту и сообщение, если я их указал, чтобы ответить на заявку из справочника. Согласие даётся отметкой у политики конфиденциальности. Юридическое лицо не названо: проект ведётся на добровольных началах.</p>
        <p>Вместе с обращением сохраняются выбранные производитель, серия и типоразмер, адрес страницы и время согласия. Это не согласие на рекламу и не поручение заводу.</p>
        <p>Отозвать обращение можно через оператора после того, как будут опубликованы его контактные реквизиты. До этого заявка на витрине остаётся демонстрационной записью сервера.</p>
          </>
        )}
      </div>
    </article>
  );
}
