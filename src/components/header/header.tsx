
// import TopMenuUser from '@/components/ikon-components/top-menu-user'
import Link from 'next/link'
import TopMenuUser from '../top-menu-user'


function Header() {
    return (
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-secondary text-secondary-foreground px-4 py-2">
            <div className='ms-auto flex items-center gap-3'>
                <Link href={"/examples"}>Examples</Link>
                <TopMenuUser />
            </div>

        </header>
    )
}

export default Header;
