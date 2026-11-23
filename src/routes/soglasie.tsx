import { Link, createFileRoute } from "@tanstack/react-router";
import { CONSENT_VERSION } from "@/data/catalog";

export const Route = createFileRoute("/soglasie")({
  component: ConsentPage,
  head: () => ({
    meta: [
      { title: "Согласие на обработку персональных данных — kotly.pro" },
      { name: "description", content: "Отдельное добровольное согласие посетителя при отправке запроса с kotly.pro." },
    ],
  }),
});

function ConsentPage() {
  return (
    <article className="mx-auto min-h-dvh max-w-3xl px-4 py-8 text-ink">
      <Link to="/" className="text-sm font-semibold text-accent hover:underline">← Вернуться в каталог</Link>
      <h1 className="mt-5 text-3xl font-extrabold leading-tight">Согласие на обработку персональных данных</h1>
      <p className="mt-3 text-sm text-muted">kotly.pro · версия {CONSENT_VERSION} · проект для утверждения</p>
      <div className="mt-5 rounded-xl border border-line bg-chip p-4 text-sm leading-relaxed">
        Этот документ готовится отдельно от Политики. До его утверждения Оператором и выполнения
        обязательных условий отправка заявок через формы сайта отключена.
      </div>
      <div className="mt-7 space-y-5 text-sm leading-relaxed">
        <p>При отметке отдельного поля согласия в форме я добровольно и осознанно даю согласие
          на обработку предоставленных мной персональных данных Оператору сайта kotly.pro —
          физическому лицу <strong>Малыгиной Арине Дмитриевне</strong>.</p>
        <p><strong>Контакт Оператора:</strong> <a href="mailto:info@kotly.pro" className="underline">info@kotly.pro</a>.
          Почтовый адрес для официальных обращений должен быть указан до утверждения согласия.</p>
        <p><strong>Цель:</strong> получить мой технический запрос, связаться со мной,
          уточнить параметры промышленного оборудования или котельной и дать ответ.</p>
        <p><strong>Данные:</strong> имя, телефон, необязательная электронная почта, текст запроса,
          сведения о выбранном оборудовании и расчётных параметрах, адрес страницы без параметров запроса,
          дата и время обращения и отметка о согласии.</p>
        <p><strong>Действия:</strong> сбор, запись, хранение, систематизация, использование для ответа,
          уточнение, блокирование, удаление и уничтожение. Обработка осуществляется автоматизированно
          с использованием инфраструктуры хостинга и почтовых уведомлений.</p>
        <p><strong>Срок:</strong> предполагается обработка на время рассмотрения обращения
          и не более 12 месяцев после его завершения, если не установлены иные законные основания.
          Окончательный срок и порядок уничтожения утверждаются Оператором до запуска.</p>
        <p><strong>Отзыв:</strong> я могу отозвать согласие письмом на
          <a href="mailto:info@kotly.pro" className="underline"> info@kotly.pro</a>
          с темой «Отзыв согласия». При отзыве сведения подлежат обработке в соответствии с законом.</p>
        <p>Это согласие не распространяется на рекламные рассылки, публикацию моих контактов
          и автоматическую передачу данных заводам-изготовителям.</p>
        <p>С <Link to="/politika" className="font-semibold text-accent underline">Политикой обработки персональных данных</Link> можно ознакомиться отдельно.</p>
      </div>
    </article>
  );
}
