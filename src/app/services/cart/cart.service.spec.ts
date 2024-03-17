import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import Item from '../../models/item';
import Product from '../../models/product';

describe('CartService', () => {
  let service: CartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // Предоставляем сервис CartService в качестве зависимости
      providers: [CartService],
    });
    // Получаем экземпляр сервиса
    service = TestBed.inject(CartService);
  });

  it('Проверяем что сервис успешно создается', () => {
    expect(service).toBeTruthy();
  });

  it('Проверяем что метод getItems возвращает массив товаров', () => {
    // Проверяем что возвращается пустой массив
    expect(service.getItems()).toEqual([]);
  });

  it('Проверяем что метод addItem добавляет товар в массив товаров', () => {
    // Создаем фиктивный элемент
    const item: Item = {
      product: { id: 1, name: 'Test', price: 10 },
      quantity: 1,
    };
    // Вызываем метод добавления товара
    service.addItem(item);
    // Проверяем что добавленный товар присутствует в массиве товаров
    expect(service.getItems()).toContain(item);
  });

  it('Проверяем что метод removeItem удаляет товар из массива товаров', () => {
    // Создаем фиктивный элемент
    const item: Item = {
      product: { id: 1, name: 'Test', price: 10 },
      quantity: 1,
    };
    // Добавляем товар в массив
    service.addItem(item);
    // Вызываем метод удаления товара
    service.removeItem(item);
    // Проверяем, что удаленный товар отсутствует в массиве товаров
    expect(service.getItems()).not.toContain(item);
  });

  it('Проверяем что метод getFullName возвращает полное имя', () => {
    // Создаем фиктивное полное имя
    const name = 'John Doe';
    // Устанавливаем полное имя
    service.setFullName(name);
    // Проверяем, что метод getFullName возвращает правильное полное имя
    expect(service.getFullName()).toEqual(name);
  });

  it('Проверяем, что метод setFullName устанавливает полное имя', () => {
    // Создаем фиктивное полное имя
    const name = 'John Doe';
    // Устанавливаем полное имя
    service.setFullName(name);
    // Проверяем что полное имя было установлено правильно
    expect(service.getFullName()).toEqual(name);
  });

  it('Проверяем что метод calcTotal возвращает общую стоимость', () => {
    // Создаем фиктивный товар 1
    const product1: Product = { id: 1, name: 'Test 1', price: 10 };
    // Создаем фиктивный товар 2
    const product2: Product = { id: 2, name: 'Test 2', price: 20 };
    // Создаем фиктивный элемент 1
    const item1: Item = { product: product1, quantity: 2 };
    // Создаем фиктивный элемент 2
    const item2: Item = { product: product2, quantity: 3 };
    service.addItem(item1); // Добавляем товар 1 в массив
    service.addItem(item2); // Добавляем товар 2 в массив
    // Вычисляем ожидаемую общую стоимость
    const expectedTotal =
      product1.price * item1.quantity + product2.price * item2.quantity;
    // Проверяем, что метод calcTotal возвращает правильную общую стоимость
    expect(service.calcTotal()).toEqual(expectedTotal);
  });

  it('Проверяем что метод resetCart сбрасывает массив товаров', () => {
    // Создаем фиктивный элемент
    const item: Item = {
      product: { id: 1, name: 'Test', price: 10 },
      quantity: 1,
    };
    // Добавляем товар в массив
    service.addItem(item);
    // Вызываем метод сброса массива товаров
    service.resetCart();
    // Проверяем, что массив товаров стал пустым
    expect(service.getItems()).toEqual([]);
  });
});
