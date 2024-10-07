"use client";
import { useModal } from "@/app/hooks/useModal";
import { Button } from "@/components/Button";
import { Heading } from "@/components/Heading";
import { Input } from "@/components/Input";
import { Modal } from "@/components/Modal";
import { Select } from "@/components/Select";
import { Timeline } from "@/components/Timeline";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextArea } from "@/components/TextArea";
import { useState } from "react";
import { Dropzone } from "@/components/Dropzone";

const schema = z.object({
  name: z
    .string()
    .min(1, "O nome é obrigatório")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  price: z
    .number()
    .positive("O preço deve ser um valor positivo")
    .min(0.01, "O preço mínimo é 0.01"),
  description: z
    .string()
    .max(500, "A descrição pode ter no máximo 500 caracteres"),
  cost: z
    .number()
    .positive("O custo deve ser um valor positivo")
    .min(0.01, "O custo mínimo é 0.01"),
  stock: z
    .number()
    .int()
    .nonnegative(
      "A quantidade em estoque deve ser um número inteiro não negativo",
    ),
});
type FormData = z.infer<typeof schema>;

enum STEP_NEW_PRODUCT {
  DATA,
  IMAGES,
  CATEGORIES,
  REVIEW,
}

export default function NewProductsPage() {
  const [currentStep, setCurrentStep] = useState(STEP_NEW_PRODUCT.DATA);
  const [files, setFiles] = useState<File[]>([]);

  const { isOpen, openModal, closeModal } = useModal();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    alert(JSON.stringify(data, null, 2));
  };

  function verifyStatus(
    step: STEP_NEW_PRODUCT,
  ): "completed" | "in-progress" | "upcoming" {
    if (step === currentStep) {
      return "in-progress";
    }

    if (step < currentStep) {
      return "completed";
    }

    return "upcoming";
  }

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
        <Modal.Header>
          <Heading as="h4">Criar novo Produto</Heading>
        </Modal.Header>
        <Timeline.Root>
          <Timeline.Step
            title="Dados do Produto"
            description="Insira nome, preço e descrição."
            status={verifyStatus(STEP_NEW_PRODUCT.DATA)}
          />

          <Timeline.Step
            title="Adicionar Imagens"
            description="Faça upload das imagens."
            status={verifyStatus(STEP_NEW_PRODUCT.IMAGES)}
          />

          <Timeline.Step
            title="Selecionar Categorias"
            description="Escolha as categorias."
            status={verifyStatus(STEP_NEW_PRODUCT.CATEGORIES)}
          />

          <Timeline.Step
            title="Revisão e Publicação"
            description="Revise e publique o produto."
            status={verifyStatus(STEP_NEW_PRODUCT.REVIEW)}
          />
        </Timeline.Root>

        <Modal.Content>
          {currentStep === STEP_NEW_PRODUCT.DATA && (
            <>
              <Heading as="h5">Digite os dados do novo produto</Heading>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-2 flex flex-wrap gap-2"
              >
                <Input.Root
                  errorMessage={errors.name?.message}
                  className="flex-[1_1_100%]"
                >
                  <Input.Label>Nome do produto</Input.Label>
                  <Input.Field
                    {...register("name")}
                    type="text"
                    placeholder="Digite o nome do produto"
                  />
                  <Input.ErrorMessage />
                </Input.Root>

                <Input.Root
                  errorMessage={errors.cost?.message}
                  className="grow"
                >
                  <Input.Label>Valor de custo</Input.Label>
                  <Input.Field
                    {...register("cost")}
                    type="number"
                    placeholder="Valor pago"
                  />
                  <Input.ErrorMessage />
                </Input.Root>

                <Input.Root
                  errorMessage={errors.price?.message}
                  className="grow"
                >
                  <Input.Label>Valor do produto</Input.Label>
                  <Input.Field
                    {...register("price")}
                    type="number"
                    placeholder="Valor do produto"
                  />
                  <Input.ErrorMessage />
                </Input.Root>

                <Input.Root
                  errorMessage={errors.stock?.message}
                  className="grow"
                >
                  <Input.Label>Quantidade</Input.Label>
                  <Input.Field
                    {...register("stock")}
                    type="number"
                    placeholder="Quantidade"
                  />
                  <Input.ErrorMessage />
                </Input.Root>

                <TextArea.Root
                  errorMessage={errors.description?.message}
                  className="flex-[1_1_100%]"
                >
                  <TextArea.Label>Descrição do produto</TextArea.Label>
                  <TextArea.Field
                    {...register("description")}
                    placeholder="Diga algo sobre o produto"
                    rows={4}
                  />
                  <TextArea.ErrorMessage />
                </TextArea.Root>
              </form>
            </>
          )}

          {currentStep === STEP_NEW_PRODUCT.IMAGES && (
            <>
              <Heading as="h5">Selecione as imagens do produto</Heading>
              <Dropzone images={files} setImages={setFiles} />
            </>
          )}
        </Modal.Content>
        <Modal.Footer>
          <Button
            onClick={() =>
              setCurrentStep((oldValue) => (!oldValue ? 0 : oldValue - 1))
            }
            type="button"
          >
            Voltar
          </Button>
          <Button
            onClick={() =>
              setCurrentStep((oldValue) =>
                oldValue === 3 ? oldValue : oldValue + 1,
              )
            }
            type="button"
          >
            Próximo
          </Button>
        </Modal.Footer>
      </Modal.Root>
    </div>
  );
}
