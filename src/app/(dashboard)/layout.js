import UiList from "../components/(ui)/UiList/UiList";
import { DataProvider } from './components/DataContext'

export default function DashboardLayout({ children }) {

    return (
        <DataProvider>
            <section>
                <div className="container mx-auto flex">
                    <UiList/>
                    <div className="pl-2"></div>
                    {children}
                </div>
            </section>
        </DataProvider>
        
    )
  }