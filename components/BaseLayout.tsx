import {ReactNode} from 'react';
import Sidebar from './Sidebar';
import DashboardNavbar from './Dashboard-navbar';
import groupIconExample from "../public/icons/Group-240753.png";

interface Props {
    children: ReactNode | ReactNode[]
}

export default function BaseLayout({ children } : Props) {
    return (
        <>
            <main className='mainContainer flex h-screen bg-white'>
                <DashboardNavbar/>
                    <Sidebar/>
                    <section className='content__wrapper w-full relative'>
                        <div className='absolute overflow-y-auto top-16 pt-3 bottom-0 px-16 w-full flex flex-col'>
                            {children}
                        </div>
                    </section>
            </main>
        </>
    )
} 