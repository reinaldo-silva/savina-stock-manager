"use client";
import { useModal } from "@/app/hooks/useModal";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Timeline } from "@/components/Timeline";

export default function NewProductsPage() {
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div>
      <Heading>Entrada de produtos</Heading>

      <p>entrada de produtos caso o produto exista</p>
      <Select.Root>
        <Select.Trigger placeholder="Selecione uma opção" />
        <Select.OptionList>
          <Select.Option value="option-1">Opção 1</Select.Option>
          <Select.Option value="option-2">Opção 2</Select.Option>
          <Select.Option value="option-3">Opção 3</Select.Option>
        </Select.OptionList>
      </Select.Root>

      <Button onClick={openModal}>Criar novo produto</Button>

      <Modal.Root isOpen={isOpen} onClose={closeModal}>
        <Modal.CloseButton onClose={closeModal} />
        <Modal.Header>Este é o Título do Modal</Modal.Header>
        <Modal.Content>
          <Timeline.Root>
            <Timeline.Step
              title="Criação da Conta"
              description="Crie sua conta com email e senha."
              status="completed"
            />
            <Timeline.Step
              title="Verificação de Email"
              description="Verifique seu email para confirmar o cadastro."
              status="in-progress"
            />
            <Timeline.Step
              title="Finalização do Perfil"
              description="Complete seu perfil com informações adicionais."
              status="upcoming"
            />
            <Timeline.Step
              title="Confirmação e Acesso"
              description="Aguarde a confirmação para acessar a plataforma."
              status="upcoming"
            />
          </Timeline.Root>

          <h2>Digite os dados do novo produto</h2>
          <form action="">
            <input type="text" placeholder="Nome do produto" />
            <input type="number" placeholder="Valor" />
            <input type="number" placeholder="Valor de custo" />
            <input type="number" placeholder="Qantidade de estoque" />

            <textarea placeholder="Digite uma breve descricao do produto" />
          </form>
        </Modal.Content>
        <Modal.Footer>
          <button
            className="mr-2 rounded bg-gray-500 px-4 py-2 text-white"
            onClick={closeModal}
          >
            Fechar
          </button>
          <button
            className="rounded bg-blue-500 px-4 py-2 text-white"
            onClick={() => alert("Ação realizada!")}
          >
            Confirmar
          </button>
        </Modal.Footer>
      </Modal.Root>
    </div>
  );
}
