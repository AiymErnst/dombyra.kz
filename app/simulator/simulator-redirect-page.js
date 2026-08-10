import { redirect } from "next/navigation";

// старый адрес /simulator теперь живёт на /learn — держим 301-редирект,
// чтобы не плодить дубли контента и не ронять уже проставленные ссылки
export default function SimulatorRedirect() {
  redirect("/learn");
}
