import { PublicHeader } from '@/organisms/PublicHeader';
import { Footer } from '@/organisms/Footer';
import { NotFound as NotFoundMolecule } from '@/molecules/NotFound';
import Link from 'next/link';
import { Button } from '@/molecules/Button';

export default function NotFound() {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <PublicHeader />

            <div className="mt-5xl flex items-start justify-center animate-fadeIn300 flex-1">
                <main className="flex flex-col max-w-content-desktop w-full px-3xl py-3xl gap-3xl bg-content-bg border border-neutral-800 shadow-md rounded-sm items-center">
                    <NotFoundMolecule />

                    <Link href="/">
                        <Button variant="primary">
                            Voltar para o Início
                        </Button>
                    </Link>
                </main>
            </div>

            <Footer />
        </div>
    );
}
