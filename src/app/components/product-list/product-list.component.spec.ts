import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductService } from '../../services/product/product.service';
import { CartService } from '../../services/cart/cart.service';
import { of } from 'rxjs';
import Item from '../../models/item';
import Product from '../../models/product';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  // Создаем фиктивный объект для ProductService
  let mockProductService: jasmine.SpyObj<ProductService>;
  // Создаем фиктивный объект для CartService
  let mockCartService: jasmine.SpyObj<CartService>;

  beforeEach(async () => {
    // Создаем фиктивный объект для ProductService с помощью Jasmine
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    // Создаем фиктивный объект для CartService с помощью Jasmine
    mockCartService = jasmine.createSpyObj('CartService', ['addItem']);

    await TestBed.configureTestingModule({
      // Объявляем компоненты, которые используются в этом модуле
      declarations: [ProductListComponent],
      providers: [
        // Предоставляем фиктивный объект ProductService в качестве зависимости
        { provide: ProductService, useValue: mockProductService },
        // Предоставляем фиктивный объект CartService в качестве зависимости
        { provide: CartService, useValue: mockCartService },
      ],
    }).compileComponents(); // Компилируем компоненты
  });

  beforeEach(() => {
    // Создаем экземпляр компонента
    fixture = TestBed.createComponent(ProductListComponent);
    // Получаем экземпляр компонента
    component = fixture.componentInstance;
  });

  it('Проверяем что компонент успешно создается', () => {
    expect(component).toBeTruthy();
  });

  it('Проверяем что товары загружаются при инициализации', () => {
    // Создаем фиктивный массив товаров
    const products: Product[] = [{ id: 1, name: 'Test', price: 10 }];
    // Мокируем метод getProducts и задаем его возвращаемое значение
    mockProductService.getProducts.and.returnValue(of(products));
    // Вызываем метод инициализации компонента
    component.ngOnInit();
    // Проверяем, что массив товаров заполнен правильно
    expect(component.products).toEqual(products);
  });

  it('Проверяем что товар добавляется в корзину при добавлении товара', () => {
    // Создаем фиктивный элемент
    const item: Item = {
      product: { id: 1, name: 'Test', price: 10 },
      quantity: 1,
    };
    // Вызываем метод добавления товара
    component.addToCart(item);
    // Проверяем что метод addItem был вызван с правильным элементом
    expect(mockCartService.addItem).toHaveBeenCalledWith(item);
  });
});
