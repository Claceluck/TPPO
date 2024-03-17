import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductItemDetailComponent } from './product-item-detail.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { CartService } from '../../services/cart/cart.service';
import { ProductService } from '../../services/product/product.service';
import Item from '../../models/item';
import Product from '../../models/product';

describe('ProductItemDetailComponent', () => {
  let component: ProductItemDetailComponent;
  let fixture: ComponentFixture<ProductItemDetailComponent>;
  let mockProductService: jasmine.SpyObj<ProductService>; // Создаем фиктивный объект для ProductService
  let mockCartService: jasmine.SpyObj<CartService>; // Создаем фиктивный объект для CartService

  beforeEach(async () => {
    // Создаем фиктивный объект для ProductService с помощью Jasmine
    mockProductService = jasmine.createSpyObj('ProductService', [
      'getProducts',
    ]);
    // Создаем фиктивный объект для CartService с помощью Jasmine
    mockCartService = jasmine.createSpyObj('CartService', ['addItem']);

    // Объявляем компоненты, которые используются в этом модуле
    await TestBed.configureTestingModule({
      declarations: [ProductItemDetailComponent],
      providers: [
        // Предоставляем фиктивный объект ProductService в качестве зависимости
        { provide: ProductService, useValue: mockProductService },
        // Предоставляем фиктивный объект CartService в качестве зависимости
        { provide: CartService, useValue: mockCartService },
        // Предоставляем моковый объект ActivatedRoute в качестве зависимости
        {
          provide: ActivatedRoute,
          useValue: {
            // Задаем параметры маршрута, который мы ожидаем получить
            paramMap: of(convertToParamMap({ id: '1' })),
          },
        },
      ],
    }).compileComponents(); // Компилируем компоненты
  });

  beforeEach(() => {
    // Создаем экземпляр компонента
    fixture = TestBed.createComponent(ProductItemDetailComponent);
    // Получаем экземпляр компонента
    component = fixture.componentInstance;
  });

  it('Проверяем что компонент успешно создается', () => {
    expect(component).toBeTruthy();
  });

  it('Проверяем что продукт инициализируется с правильным id', () => {
    // Создаем фиктивный массив товаров
    const products: Product[] = [{ id: 1, name: 'Test', price: 10 }];
    // Мокируем метод getProducts и задаем его возвращаемое значение
    mockProductService.getProducts.and.returnValue(of(products));
    // Вызываем метод инициализации компонента
    component.ngOnInit();
    // Проверяем, что продукт инициализирован с правильным товаром
    expect(component.product).toEqual(products[0]);
  });

  it('Проверяем что товар добавляется в корзину при добавлении товара', () => {
    // Создаем фиктивный товар
    const product: Product = { id: 1, name: 'Test', price: 10 };
    // Мокируем вызов alert
    spyOn(window, 'alert');
    // Вызываем метод добавления товара
    component.addItem(product);
    // Проверяем, что метод addItem был вызван с правильным товаром
    expect(mockCartService.addItem).toHaveBeenCalledWith(new Item(product, 1));
    // Проверяем, что был вызван alert с правильным сообщением
    expect(window.alert).toHaveBeenCalledWith(`${product.name} added.`);
  });
});
