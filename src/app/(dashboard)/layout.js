import UiList from "../components/(ui)/UiList/UiList";

export default function DashboardLayout({ children }) {

    return (
            <section>
                <div className="container mx-auto flex">
                    <UiList/>
                    <div className="pl-2"></div>
                    {children}
                </div>
            </section>
        
    )
  }