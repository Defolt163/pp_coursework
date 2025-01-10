import CartModule from "@/app/components/Cart/Cart";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
export default function CartPage() {
    return (
      <div className="container mx-auto">
        <Breadcrumb className="my-7">
            <BreadcrumbList>
                <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                <BreadcrumbPage>Корзина</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
        <CartModule/>
      </div>
    );
  }
  