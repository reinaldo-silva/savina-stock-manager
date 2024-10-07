import { Button } from "@/components/Button";
import { Coins, HandCoins, LucideIcon, PackagePlus } from "lucide-react";
import Link from "next/link";

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="mx-auto flex h-screen max-w-screen-xl flex-col px-4 pb-4">
      <header className="flex justify-between border-b p-4">
        <Link href="/" className="flex">
          <button>Savina</button>
        </Link>

        <div className="flex space-x-2">
          <Link href="/products/new">
            <Button Icon={PackagePlus}>Entrada de produtos</Button>
          </Link>
          <Button Icon={Coins}> Nova venda</Button>
        </div>
      </header>
      <div className="flex flex-wrap gap-4 py-4">
        <CardInfo Icon={HandCoins} />
        <CardInfo Icon={HandCoins} />
        <CardInfo Icon={HandCoins} />
        <CardInfo Icon={HandCoins} />
      </div>
      <div className="flex-1">{children}</div>
    </main>
  );
}

interface CardInfoProps {
  Icon: LucideIcon;
}

function CardInfo({ Icon }: CardInfoProps) {
  return (
    <div className="flex grow flex-col overflow-hidden border bg-zinc-100 p-4">
      <div className="flex items-center gap-2">
        <div className="rounded-full border bg-zinc-200 p-2">
          <Icon size={20} />
        </div>
        <span>Descriprion</span>
      </div>
      <span className="mt-10 py-2 text-3xl">R$ 2.500,00</span>
      <small className="border-t border-zinc-300 pt-2 font-light">
        alguma informacao util
      </small>
    </div>
  );
}
