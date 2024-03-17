import { CartComponent } from './cart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartService } from '../../services/cart/cart.service';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import Item from '../../models/item';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;
  // Создаем фиктивный объект для CartService
  let mockCartService: jasmine.SpyObj<CartService>;
  let router: Router;

  // Начинаем блок, в котором настраиваем каждый тест
  beforeEach(async () => {
    // Создаем фиктивный объект для CartService с помощью Jasmine
    mockCartService = jasmine.createSpyObj('CartService', [
      'getItems',
      'resetCart',
      'calcTotal',
      'removeItem',
      'setFullName',
    ]);

    await TestBed.configureTestingModule({
      // Объявляем компоненты, которые используются в этом модуле
      declarations: [CartComponent],
      // Импортируем модуль тестирования маршрутизатора для настройки маршрутизатора
      imports: [RouterTestingModule],
      // Предоставляем фиктивный объект CartService в качестве зависимости
      providers: [{ provide: CartService, useValue: mockCartService }],
    }).compileComponents();
  });

  beforeEach(() => {
    // Создаем экземпляр компонента перед каждым тестом
    fixture = TestBed.createComponent(CartComponent);
    // Получаем экземпляр компонента
    component = fixture.componentInstance;
    // Получаем экземпляр маршрутизатора
    router = TestBed.inject(Router);
  });

  it('Проверяем, что компонент успешно создается', () => {
    expect(component).toBeTruthy();
  });

  it('Проверяем метод очистки корзины', () => {
    // Вызываем метод очистки корзины
    component.clearCart();
    // Проверяем, что метод resetCart был вызван у mockCartService
    expect(mockCartService.resetCart).toHaveBeenCalled();
    // Проверяем, что массив элементов пуст
    expect(component.items.length).toBe(0);
  });

  it('Проверяем метод вычисления общей стоимости', () => {
    // Мокируем метод calcTotal и задаем его возвращаемое значение
    mockCartService.calcTotal.and.returnValue(100);
    // Вызываем метод вычисления общей стоимости
    component.calcPrice();
    // Проверяем, что общая стоимость установлена правильно
    expect(component.totalPrice).toBe(100);
  });

  it('Проверяем метод обновления количества', () => {
    // Мокируем метод calcPrice компонента
    spyOn(component, 'calcPrice');
    // Вызываем метод обновления количества
    component.updateQuantity();
    // Проверяем, что метод calcPrice был вызван
    expect(component.calcPrice).toHaveBeenCalled();
  });

  it('Проверяем метод удаления элемента из корзины', () => {
    // Создаем фиктивный элемент
    const item: Item = {
      product: { id: 1, name: 'Test', price: 10 },
      quantity: 1,
    };
    // Мокируем вызов confirm и возвращаем true
    spyOn(window, 'confirm').and.returnValue(true);
    // Вызываем метод удаления элемента из корзины
    component.removeFromCart(item);
    // Проверяем, что метод removeItem был вызван с правильным элементом
    expect(mockCartService.removeItem).toHaveBeenCalledWith(item);
  });

  it('Проверяем метод отправки', () => {
    // Устанавливаем имя пользователя
    component.fullName = 'John Doe';
    // Мокируем метод calcPrice компонента
    spyOn(component, 'calcPrice');
    // Мокируем метод navigate маршрутизатора
    spyOn(router, 'navigate');
    // Вызываем метод отправки
    component.submit();
    // Проверяем, что метод setFullName был вызван с правильным именем
    expect(mockCartService.setFullName).toHaveBeenCalledWith('John Doe');
    // Проверяем, что метод calcPrice был вызван
    expect(component.calcPrice).toHaveBeenCalled();
    // Проверяем, что метод navigate был вызван с правильным маршрутом
    expect(router.navigate).toHaveBeenCalledWith(['confirmation']);
  });
});
