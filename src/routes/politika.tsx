import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/politika")({
  component: PolicyPage,
  head: () => ({ meta: [{ title: "Политика обработки персональных данных — kotly.pro" }] }),
});

function PolicyPage() {
  return (
    <article className="mx-auto min-h-dvh max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm font-semibold text-ink">← На главную</Link>
      <h1 className="mt-5 font-display text-2xl font-extrabold sm:text-4xl">Политика обработки персональных данных</h1>
      <p className="mt-3 text-sm text-muted">Последнее обновление: 24 ноября 2026 года</p>
      <div className="mt-7 grid gap-6 text-pretty leading-relaxed">
        <section>
          <h2 className="text-lg font-bold">1. Общие положения</h2>
          <p className="mt-2">Сайт kotly.pro предоставляет сведения о промышленном котельном оборудовании и возможность направить запрос на подбор и консультацию. Для вопросов об обработке персональных данных используйте <a href="mailto:info@kotly.pro" className="font-semibold text-accent underline">info@kotly.pro</a>.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold">2. Какие данные обрабатываются</h2>
          <p className="mt-2">При отправке формы обрабатываются имя, телефон, указанный по желанию адрес электронной почты, текст обращения, выбранное оборудование и адрес страницы, с которой направлен запрос. Также фиксируются время отправки и факт согласия.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold">3. Для чего используются данные</h2>
          <p className="mt-2">Информация используется для рассмотрения инженерного запроса, связи с заявителем, уточнения технических параметров и подготовки ответа. Отправка формы не означает заключение договора, заказ оборудования или согласие на рекламную рассылку.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold">4. Хранение и защита</h2>
          <p className="mt-2">Обращения сохраняются в закрытой части серверного хранилища; уведомления направляются на почту kotly.pro. Передача данных производителям через форму автоматически не производится. Доступ ограничивается лицами, обрабатывающими обращения. Информация хранится в течение периода, необходимого для ответа и выполнения применимых требований законодательства.</p>
        </section>
        <section>
          <h2 className="text-lg font-bold">5. Ваши обращения и права</h2>
          <p className="mt-2">Для уточнения сведений, отзыва согласия, запроса доступа или удаления персональных данных напишите на <a href="mailto:info@kotly.pro" className="font-semibold text-accent underline">info@kotly.pro</a>. Укажите контакт, использованный в заявке, чтобы мы могли найти обращение и проверить, что запрос поступил от соответствующего лица.</p>
        </section>
      </div>
      <p className="mt-8 text-sm text-muted">Используя сайт без отправки формы, вы не обязаны предоставлять контактные данные.</p>
    </article>
  );
}
