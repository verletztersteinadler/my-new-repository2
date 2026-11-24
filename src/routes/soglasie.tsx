import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/soglasie")({
  component: ConsentPage,
  head: () => ({ meta: [{ title: "Согласие на обработку данных — kotly.pro" }] }),
});

function ConsentPage() {
  return (
    <article className="mx-auto min-h-dvh max-w-3xl px-4 py-8">
      <Link to="/" className="text-sm font-semibold text-ink">← На главную</Link>
      <h1 className="mt-5 font-display text-2xl font-extrabold sm:text-4xl">Согласие на обработку персональных данных</h1>
      <div className="mt-7 grid gap-4 text-pretty leading-relaxed">
        <p>Отмечая согласие в форме на сайте kotly.pro, я разрешаю обработку указанных мной контактных данных для ответа на обращение, консультации, подбора оборудования и уточнения технических требований.</p>
        <p>К обрабатываемым сведениям относятся имя, телефон, адрес электронной почты (если он указан), сообщение, данные о выбранном оборудовании и странице обращения, а также дата и время отправки.</p>
        <p>Я понимаю, что отправка формы не является оформлением заказа или согласием на получение рекламных сообщений. Данные не направляются автоматически сторонним производителям.</p>
        <p>Я могу обратиться по адресу <a href="mailto:info@kotly.pro" className="font-semibold text-accent underline">info@kotly.pro</a>, чтобы запросить сведения об обработке данных или отозвать согласие.</p>
        <p>Подробные условия изложены в <Link to="/politika" className="font-semibold text-accent underline">политике обработки персональных данных</Link>.</p>
      </div>
    </article>
  );
}
