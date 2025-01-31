import { getData, setData } from "nuxt-storage/local-storage"
import { driver } from "driver.js"

export default function useTour(): void {
    const LOCALSTORAGE_TOUR_KEY_APP = "INCOMEIZI_TOUR"

    function hasTourStorage(): boolean {
        return !!getData(LOCALSTORAGE_TOUR_KEY_APP)
    }

    function startTour(): void {
        const d = driver({
            nextBtnText: "Próximo",
            prevBtnText: "Anterior",
            doneBtnText: "Pronto",
            progressText: "{{current}} de {{total}}",
            showProgress: true,
            steps: [
                {
                    popover: {
                        title: "Bem-vindo ao incomeizi",
                        description: "Você está no lugar certo caso esteja buscando um gerenciador de despesas direto ao ponto, sem necessidade de criar uma conta ou fazer login. Acompanhe o seu dinheiro de forma simples e descomplicada. Cadastre a renda, as despesas e acompanhe o saldo. Apenas isso!"
                    }
                },
                {
                    element: ".diver-step-1--balance",
                    popover: {
                        title: "Saldo",
                        description: "Aqui é exibido o seu saldo, ou seja, o resultado da soma das suas despesas menos a renda cadastrada."
                    }
                },
                {
                    element: ".diver-step-2--register-expense-button",
                    popover: {
                        title: "Cadastro de despesa",
                        description: "Cadastre uma nova despesa por aqui."
                    }
                },
                {
                    element: ".diver-step-3--register-income-button",
                    popover: {
                        title: "Renda",
                        description: "Cadastre sua renda por aqui."
                    }
                },
                {
                    element: ".diver-step-4--change-theme-button",
                    popover: {
                        title: "Tema do aplicativo",
                        description: "Selecione entre os temas disponíveis para a interface do aplicativo."
                    }
                },
                {
                    element: ".diver-step-5--list-expenses-table",
                    popover: {
                        title: "Listagem das despesas",
                        description: "Aqui é feito a listagem das despesas cadastradas."
                    }
                },
                {
                    popover: {
                        title: "E isso é tudo!",
                        description: `Obrigado por usar o incomeizi. Caso tenha alguma sugestão ou problema, sinta-se livre para entrar em contato com o desenvolvedor. <nav class="mt-3"><a class="text-blue-500" href="https://github.com/felipeoli7eira" target="_blank">@felipeoli7eira</a></nav>`
                    }
                },
            ],
            onDestroyed: () => {
                setData(LOCALSTORAGE_TOUR_KEY_APP, true, 325 * 2, "d")
            },
        })

        d.drive()
    }

    function onCalled(): void {
        if (! hasTourStorage()) {
            startTour()
        }
    }

    onCalled()
}
